(function iife() {
  const Br = {}

  // private identifier
  const has = Object.prototype.hasOwnProperty

  /* 判断对象的具体类型
   * @param: obj {Object}
   * @param: type {String}
   * @return: {Boolean}
   */
  Br.isType = (obj, type) => {
    const fragment = Object.prototype.toString.call(obj).slice(8, -1)
    return Br.strEqual(type, fragment, false)
  }

  /* 忽略大小写的字符串比较
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

  /* 判断数值是否为素数
   * @param: n {Number}
   * @return: {Boolean}
   */
  Br.isPrime = (n) => {
    for (let a = 2; a < Math.sqrt(n); a += 1) {
      if (n % a < 1) return false
    }
    return n > 1
  }

  /* 数组的随机排序
   * @param: arr {Array}
   * @return: {Array}
   */
  Br.shuffle = (arr) => {
    arr.sort(() => Math.random() - 0.5)
  }

  /* 对象的拷贝
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

  /* 生成范围内的随机数
   * @param: lowerValue {Number}
   * @param: upperValue {Number}
   * @return: {Number}
   */
  Br.selectFrom = (lowerValue, upperValue) => {
    const choices = (upperValue - lowerValue) + 1
    return Math.floor((Math.random() * choices) + lowerValue)
  }

  /* 判断对象的属性是否来自原型
   * @param: obj {Object}
   * @param: key {String}
   * @return: {Boolean}
   */
  Br.hasPrototypeProperty = (obj, key) => (
    (key in obj) && !has.call(obj, key)
  )

  /* 获取查询字符串的键值对形式
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

  /* 添加键值对到 url 字符串中
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

  /* 识别用户代理
   * @return: {String}
   */
  Br.whichBrowser = () => {
    const str = navigator.userAgent
    if (/qqbrowser/i.test(str)) return 'QQ Browser' // 含子串 chrome safari qqbrowser
    if (/opr/i.test(str)) return 'Opera Browser' // 含子串 chrome safari opr
    if (/chrome/i.test(str)) return 'Google Chrome' // 含子串 chrome safari
    if (/safari/i.test(str)) return 'Apple Safari' // 含子串 safari
    if (/firefox/i.test(str)) return 'Mizilla Firefox' // 含子串 firefox
    return 'Unknown UA, maybe some kind of M$\'s'
  }

  /* 识别操作系统
   * @return: {String}
   */
  Br.whichSystem = () => {
    const str = navigator.platform
    if (/mac/i.test(str)) return 'macOS'
    if (/win/i.test(str)) return 'Windows'
    return 'Linux'
  }

  /* 基本断言
   * @param: val {Boolean}
   * @param: msg {String}
   * @return: {Error}
   */
  Br.assert = (val, msg) => {
    if (!val) {
      throw (msg || `${val} does not equal true`)
    }
  }

  /* 上下文代理
   * @param: fn {Function}
   * @param: ctx {Object}
   * @return: {Function}
   */
  Br.proxy = (fn, ctx, ...args) => (
    function f() {
      return fn.apply(ctx, ...args)
    }
  )

  /* 对象构造器
   * @param: obj {Object}
   * @return: {Object}
   */
  Br.create = (obj) => {
    const F = function f() {}
    F.prototype = obj
    return new F()
  }

  /* 设置对象权限
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

  /* 数组分块处理
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

  /* 函数节流执行
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
