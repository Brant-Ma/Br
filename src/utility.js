(function (root) {
  // namespace & shortcuts
  const Br = {}
  const has = Object.prototype.hasOwnProperty
  const label = Object.prototype.toString

  /**
   * 识别宿主环境
   * @return: {String}
   */
  const whichContext = () => {
    if (typeof require === 'undefined') {
      return 'browser'
    }
    return 'node'
  }

  Br.whichContext = whichContext

  // export module
  if (whichContext() === 'node') {
    module.exports = Br
  } else {
    root.Br = Br
  }

  /**
   * 合并数组
   * @param: left {Array}
   * @param: right {Array}
   * @return: {Array}
   */
  const merge = (left, right) => {
    const ret = []
    while (left.length && right.length) {
      ret.push(left[0] < right[0] ? left.shift() : right.shift())
    }
    return ret.concat(left.length ? left : right)
  }

  /**
   * 归并排序
   * @param: arr {Array}
   * @return: {Array}
   */
  Br.mergeSort = (arr = []) => {
    // 拆分数组
    if (arr.length < 2) return arr.slice()
    const mid = Math.floor(arr.length / 2)
    const left = Br.mergeSort(arr.slice(0, mid))
    const right = Br.mergeSort(arr.slice(mid))
    // 合并数组
    return merge(left, right)
  }

  /**
   * 快速排序
   * @param: arr {Array}
   * @return: {Array}
   */
  Br.quickSort = (arr = []) => {
    if (arr.length < 2) return arr.slice()
    const one = arr[0]
    const left = arr.slice(1).filter(item => item < one)
    const right = arr.slice(1).filter(item => item >= one)
    return Br.quickSort(left).concat(one, Br.quickSort(right))
  }

  /**
   * 二分搜索
   * @param: arr {Array}
   * @return: {Array}
   */
  Br.binarySearch = (arr = [], item) => {
    if (item === undefined) return -1
    const sort = Br.quickSort(arr)
    let low = 0
    let high = sort.length - 1
    while (low <= high) {
      const mid = Math.floor((low + high) / 2)
      if (sort[mid] < item) {
        low = mid + 1
      } else if (sort[mid] > item) {
        high = mid - 1
      } else {
        return mid
      }
    }
    return -1
  }

  /**
   * 判断对象是否是某个具体类型
   * @param: obj {Object}
   * @param: type {String}
   * @return: {Boolean}
   */
  Br.isType = (obj, type) => {
    const fragment = label.call(obj).slice(8, -1)
    return Br.strEqual(type, fragment, false)
  }

  /**
   * 获取对象的具体类型
   * @param: obj {Object}
   * @return: {String}
   */
  Br.type = (obj) => {
    const fragment = label.call(obj).slice(8, -1)
    return fragment.toLowerCase()
  }

  /**
   * 忽略大小写的字符串比较
   * @param: str1 {String}
   * @param: str2 {String}
   * @param: sensitive {Boolean}
   * @return: {Boolean}
   */
  Br.strEqual = (str1, str2, sensitive = true) => {
    if (sensitive) {
      return str1 === str2
    }
    return str1.toLowerCase() === str2.toLowerCase()
  }

  /**
   * 字符串反转
   * @param: str {String}
   * @return: {String}
   */
  Br.strReverse = str => str.split('').reverse().join('')

  /**
   * 判断数值是否为素数
   * @param: n {Number}
   * @return: {Boolean}
   */
  Br.isPrime = (n) => {
    if (n === undefined) return false
    for (let a = 2; a < Math.sqrt(n); a += 1) {
      if (n % a < 1) return false
    }
    return n > 1
  }

  /**
   * 判断对象是否为空引用
   * @param: obj {Object}
   * @return: {Boolean}
   */
  Br.isNull = obj => typeof obj === 'object' && !obj

  /**
   * 判断对象是否为 Promise 实例
   * @param: obj {Object}
   * @return: {Boolean}
   */
  Br.isPromise = (obj) => {
    if (Promise) return Br.isType(obj, 'promise')
    return Br.isType(obj, 'object') && Br.isType(obj.then, 'function')
  }

  /**
   * 封装 Ajax 操作为 Promise 实例
   * @param: url {String}
   * @return: {Promise}
   */
  Br.fetch = (url) => {
    if (typeof url !== 'string') throw Error('`url` should be a string')
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open('GET', url, true)
      xhr.onload = () => {
        const code = xhr.status
        if ((code >= 200 && code < 300) || code === 304) {
          resolve(xhr.responseText)
        } else {
          reject(xhr.statusText)
        }
      }
      xhr.onerror = () => {
        reject(Error(xhr.statusText))
      }
      xhr.send()
    })
  }

  /**
   * 封装含超时抛错的异步操作为 Promise 实例
   * @param: task {Promise}
   * @param: time {Number}
   * @return: {Promise}
   */
  Br.timeoutPromise = (task, time = 1000) => {
    if (!Br.isPromise(task)) throw Error('`task` should be a promise')
    if (typeof time !== 'number') throw Error('`time` should be a number')
    const timer = new Promise((resolve) => {
      setTimeout(resolve, time)
    })
    timer.then(() => {
      throw Error('timeout')
    })
    return Promise.race([task, timer])
  }

  /**
   * 数组的随机排序
   * @param: arr {Array}
   * @return: {Array}
   */
  Br.shuffle = (arr) => {
    arr.sort(() => Math.random() - 0.5)
  }

  /**
   * 对象或数组的拷贝
   * @param: obj {Object}
   * @return: {Object}
   */
  Br.copy = (obj, isDeep = false) => {
    // 对象 or 数组的深拷贝
    if (isDeep) {
      return JSON.parse(JSON.stringify(obj))
    }
    // 对象的浅拷贝
    if (Br.type(obj) === 'object') {
      const result = {}
      for (p in obj) {
        if (has.call(obj, p)) result[p] = obj[p]
      }
      return result
    }
    // 数组的浅拷贝
    return obj.slice()
  }

  /**
   * 生成范围内的随机数
   * @param: lowerValue {Number}
   * @param: upperValue {Number}
   * @return: {Number}
   */
  Br.selectFrom = (lowerValue, upperValue) => {
    if (upperValue === undefined) return lowerValue
    const choices = (upperValue - lowerValue) + 1
    return Math.floor((Math.random() * choices) + lowerValue)
  }

  /**
   * 判断对象的属性是否来自原型
   * @param: obj {Object}
   * @param: key {String}
   * @return: {Boolean}
   */
  Br.hasProtoProp = (obj, key) => (key in obj) && !has.call(obj, key)

  /**
   * 获取查询字符串的键值对形式
   * @param: query {String}
   * @return: {Object}
   */
  Br.queryStr2keyValue = (query) => {
    const str = query ? query.slice(1) : location.search.slice(1)
    const arr = str.length ? str.split('&') : []
    const result = {}
    let keyValue = []
    arr.forEach((item) => {
      keyValue = item.split('=')
      result[decodeURIComponent(keyValue[0])] = decodeURIComponent(keyValue[1])
    })
    return result
  }

  /**
   * 添加键值对到 url 字符串中
   * @param: url {String}
   * @param: key {String}
   * @param: value {String}
   * @return: {String}
   */
  Br.addParam2URL = (url, key, value) => {
    let str = url
    str += (str.indexOf('?') === -1 ? '?' : '&')
    const k = encodeURIComponent(key)
    const v = encodeURIComponent(value)
    str = `${str}${k}=${v}`
    return str
  }

  /**
   * 识别用户代理
   * @return: {String}
   */
  Br.whichBrowser = () => {
    if (Br.whichContext() === 'node') {
      return 'the current environment is node, not browser'
    }
    const str = navigator.userAgent
    // QQ 包含以下字串：chrome safari qqbrowser
    if (/qqbrowser/i.test(str)) return 'QQ Browser'
    // Opera 包含以下字串：chrome safari opr
    if (/opr/i.test(str)) return 'Opera Browser'
    // Chrome 包含以下字串：chrome safari
    if (/chrome/i.test(str)) return 'Google Chrome'
    // Safari 包含 safari
    if (/safari/i.test(str)) return 'Apple Safari'
    // Firefox 包含 firefox
    if (/firefox/i.test(str)) return 'Mizilla Firefox'
    // 剩下的 ua 不想关心...
    return 'Unknown UA, maybe some kind of M$\'s'
  }

  /**
   * 识别操作系统
   * @return: {String}
   */
  Br.whichSystem = () => {
    if (Br.whichContext() === 'node') {
      return os.platform()
    }
    const str = navigator.platform
    if (/mac/i.test(str)) return 'macOS'
    if (/win/i.test(str)) return 'Windows'
    return 'maybe Linux'
  }

  /**
   * 设置对象权限
   * @param: obj {Object}
   * @param: limit {Number}
   * @return: {Object}
   */
  Br.permit = (obj, limit) => {
    switch (limit) {
      case '0111':
        return Object.preventExtensions(obj)
      case '0011':
        return Object.seal(obj)
      case '0001':
        return Object.freeze(obj)
      default:
        return false
    }
  }

  /**
   * 数组分块处理
   * @param: arr {Array}
   * @param: process {Function}
   * @param: interval {Number}
   * @return: {Undefined}
   */
  Br.chunk = (arr, process, interval) => {
    const data = arr.slice()

    setTimeout(function p() {
      const item = data.shift()
      process(item)
      if (data.length) {
        setTimeout(p, interval)
      }
    }, interval)
  }

  /**
   * 超时函数的终止化
   * @param: fn {Function}
   * @param: delay {Number}
   * @return: {Function}
   */
  Br.timeoutify = (fn, delay) => {
    let timer = setTimeout(() => {
      timer = null
      throw Error('timeout')
    }, delay)

    return (...args) => {
      if (timer) {
        clearTimeout(timer)
        fn.apply(this, args)
      }
    }
  }

  /**
   * 同步函数的异步化
   * @param: fn {Function}
   * @return: {Function}
   */
  Br.asyncify = (fn) => {
    let curTick = true
    setTimeout(() => {
      curTick = false
    }, 0)

    return (...args) => {
      if (curTick) {
        setTimeout(() => {
          fn.apply(this, args)
        }, 0)
      } else {
        fn.apply(this, args)
      }
    }
  }

  /**
   * 将 callback 风格转为 promise 风格
   * @param: fn {Function}
   * @return: {Function}
   */
  Br.promisify = function (fn) {
    return function (...args) {
      return new Promise((resolve, reject) => {
        arr = [...args].concat((err, data) => {
          if (err) {
            reject(err)
          } else {
            resolve(data)
          }
        })
        fn(...arr)
      })
    }
  }

  /**
   * 防抖：高频事件结束后 delay 毫秒执行一次
   * @param: fn {Function}
   * @param: delay {Number}
   * @return: {Undefined}
   */
  Br.debounce = (fn, delay = 100) => {
    let timer

    return function d(...args) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        fn.apply(this, args)
      }, delay)
    }
  }

  /**
   * 节流：高频事件每 interval 毫秒执行一次
   * @param: fn {Function}
   * @param: interval {Number}
   * @return: {Undefined}
   */
  Br.throttle = (fn, interval = 100) => {
    let timer
    let last

    return function t(...args) {
      const now = new Date().getTime()
      if (last && now - last < interval) {
        clearTimeout(timer)
        timer = setTimeout(() => {
          last = now
          fn.apply(this, args)
        }, interval)
      } else {
        last = now
        fn.apply(this, args)
      }
    }
  }

  /**
   * 获取八位日期戳
   * @param: date {Date}
   * @return: {String}
   */
  Br.getYMD = (date = new Date()) => {
    const y = date.getYear() + 1900
    let m = date.getMonth() + 1
    let d = date.getDate()
    m = m < 10 ? `0${m}` : m
    d = d < 10 ? `0${d}` : d
    return y + m + d
  }

  /**
   * 获取可读的 URL
   * @param: url {String}
   * @return: {String}
   */
  Br.friendlyURL = (url = '') => {
    const noHead = url.replace(/^https?:\/\//, '')
    return noHead.replace(/\/$/, '')
  }

  /**
   * 函数部分传参
   * @param: fn {Function}
   * @param: args {Array}
   * @return: {Function}
   */
  Br.curry = (fn, ...args) => fn.bind(fn, ...args)

  /**
   * 记录操作耗时
   * @param: func {Function}
   * @return: {String}
   */
  Br.timeRecord = (func, times = 1) => {
    const start = new Date().getTime()
    for (let i = 0; i < times; i += 1) {
      func()
    }
    const end = new Date().getTime()
    return `It costs ${end - start}ms`
  }

  /**
   * 判断对象是否可迭代
   * @param: obj {Object}
   * @return: {Boolean}
   */
  Br.isIterable = (obj) => {
    const prop = obj[Symbol.iterator]
    return typeof prop === 'function'
  }

  /**
   * 对象构造器
   * @param: obj {Object}
   * @return: {Object}
   */
  Br.create = (obj) => {
    const F = function f() {}
    F.prototype = obj
    return new F()
  }

  /**
   * 混入构造器
   * @param: mixins {Array}
   * @return: {Object}
   */
  Br.mixin = (...mixins) => {
    const base = function f() {}
    Object.assign(base.prototype, ...mixins)
    return base
  }
}(this))
