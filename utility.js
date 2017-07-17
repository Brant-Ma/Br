(function iife() {
  // shortcuts
  const has = Object.prototype.hasOwnProperty
  // private namespace
  const Pr = {}
  // public namespace
  const Br = {}

  /**
   * 交换两个元素
   * @param: former {Primitive}
   * @param: latter {Primitive}
   * @return: {Array}
   */
  Pr.swap = (former, latter) => {
    const temp = former
    former = latter
    latter = temp
  }

  /**
   * 冒泡排序
   * @param: arr {Array}
   * @return: {Array}
   */
  Br.bubbleSort = (arr) => {
    const len = arr.length
    // 共 len - 1 轮
    for (let i = 0; i < len - 1; i += 1) {
      // 已冒泡出 i 个最大值，本轮从第 1 个开始，到第 len - i 个
      for (let j = 0; j < len - i - 1; j += 1) {
        if (arr[j] > arr[j + 1]) {
          Pr.swap(arr[j], arr[j + 1])
        }
      }
    }
    return arr
  }

  /**
   * 选择排序
   * @param: arr {Array}
   * @return: {Array}
   */
  Br.selectionSort = (arr) => {
    const len = arr.length
    // 共 len - 1 轮
    for (let i = 0; i < len - 1; i += 1) {
      // 假设第 1 + i 个是最小值
      let min = i
      // 已选择出 i 个最小值，本轮从第 1 + i + 1 个开始，到最后一个
      for (let j = i + 1; j < len; j += 1) {
        if (arr[min] > arr[j]) {
          min = j
        }
      }
      Pr.swap(arr[i], arr[min])
    }
    return arr
  }

  /**
   * 插入排序
   * @param: arr {Array}
   * @return: {Array}
   */
  Br.insertionSort = (arr) => {
    const len = arr.length
    // 共 len - 1 轮
    for (let i = 1; i < len; i += 1) {
      // 对于第 i + 1 个待插入的元素，遍历已排好序的前 i 个
      for (let j = 0; j < i; j += 1) {
        if (arr[j] > arr[i]) {
          arr.splice(j, 0, arr[i])
          arr.splice(i + 1, 1)
        }
      }
    }
    return arr
  }

  /**
   * 合并数组
   * @param: left {Array}
   * @param: right {Array}
   * @return: {Array}
   */
  Pr.merge = (left, right) => {
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
  Br.mergeSort = (arr) => {
    // 拆分数组
    if (arr.length < 2) return arr.slice()
    const mid = Math.floor(arr.length / 2)
    const left = Br.mergeSort(arr.slice(0, mid))
    const right = Br.mergeSort(arr.slice(mid))
    // 合并数组
    return Pr.merge(left, right)
  }

  /**
   * 快速排序
   * @param: arr {Array}
   * @return: {Array}
   */
  Br.quickSort = (arr) => {
    if (arr.length < 2) return arr.slice()
    const mid = arr[0]
    const left = arr.slice(1).filter(item => item < mid)
    const right = arr.slice(1).filter(item => item >= mid)
    return Br.quickSort(left).concat(mid, Br.quickSort(right))
  }


  /**
   * 判断对象的具体类型
   * @param: obj {Object}
   * @param: type {String}
   * @return: {Boolean}
   */
  Br.isType = (obj, type) => {
    const fragment = Object.prototype.toString.call(obj).slice(8, -1)
    return Br.strEqual(type, fragment, false)
  }

  /**
   * 忽略大小写的字符串比较
   * @param: str1 {String}
   * @param: str2 {String}
   * @param: sensitive {Boolean}
   * @return: {Boolean}
   */
  Br.strEqual = (str1, str2, sensitive) => {
    if (sensitive) {
      return str1 === str2
    }
    return str1.toLowerCase() === str2.toLowerCase()
  }

  /**
   * 判断数值是否为素数
   * @param: n {Number}
   * @return: {Boolean}
   */
  Br.isPrime = (n) => {
    for (let a = 2; a < Math.sqrt(n); a += 1) {
      if (n % a < 1) return false
    }
    return n > 1
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
   * 对象的拷贝
   * @param: obj {Object}
   * @param: deep {Boolean}
   * @return: {Object}
   */
  Br.copy = (obj, deep = false) => {
    const result = obj.slice ? [] : {}
    if (Br.isType(obj, 'Array') && !deep) {
      return obj.slice()
    }
    Object.keys(obj).forEach((p) => {
      if (!Br.isType(obj[p], 'Array') && !Br.isType(obj[p], 'Object')) {
        result[p] = obj[p]
      } else {
        result[p] = Br.copy(obj[p], deep)
      }
    })
    return result
  }

  /**
   * 生成范围内的随机数
   * @param: lowerValue {Number}
   * @param: upperValue {Number}
   * @return: {Number}
   */
  Br.selectFrom = (lowerValue, upperValue) => {
    const choices = (upperValue - lowerValue) + 1
    return Math.floor((Math.random() * choices) + lowerValue)
  }

  /**
   * 判断对象的属性是否来自原型
   * @param: obj {Object}
   * @param: key {String}
   * @return: {Boolean}
   */
  Br.hasPrototypeProperty = (obj, key) => (
    (key in obj) && !has.call(obj, key)
  )

  /**
   * 获取查询字符串的键值对形式
   * @return: {Object}
   */
  Br.queryString2keyValue = () => {
    const str = location.search.length ? location.search.slice(1) : ''
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
    str = `str${k}=${v}`
    return str
  }

  /**
   * 识别用户代理
   * @return: {String}
   */
  Br.whichBrowser = () => {
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
    const str = navigator.platform
    if (/mac/i.test(str)) return 'macOS'
    if (/win/i.test(str)) return 'Windows'
    return 'maybe Linux'
  }

  /**
   * 基本断言
   * @param: val {Boolean}
   * @param: msg {String}
   * @return: {Error}
   */
  Br.assert = (val, msg) => {
    if (!val) {
      throw (msg || `${val} does not equal true`)
    }
  }

  /**
   * 上下文代理
   * @param: fn {Function}
   * @param: ctx {Object}
   * @return: {Function}
   */
  Br.proxy = (fn, ctx, ...args) => (
    function f() {
      return fn.apply(ctx, ...args)
    }
  )

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
   * 函数节流执行
   * @param: fn {Function}
   * @param: interval {Number}
   * @return: {Undefined}
   */
  Br.throttle = (fn, interval) => {
    const f = fn
    clearTimeout(f.timer)
    f.timer = setTimeout(() => {
      f()
    }, interval)
  }

  this.Br = Br
}())