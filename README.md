[![Build Status](https://travis-ci.org/Brant-Ma/Br.svg?branch=master)](https://travis-ci.org/Brant-Ma/Br)

![Br](./logo.png)

Br is a JavaScript library, which provides 35 useful or basic methods.

> **Notice**: Br is just a toy at present, so be careful if you want to try it.

## About the repo name

Why the repo is called "Br"？ The reason is as follows：

- Br is the abbreviation of my English name
- Recently I watched "The breaking bad", this is also the reason why the repo contains 35 methods...

## Methods

So, that's the methods below:
- **whichContext**

  ```javascript
  // in browser environment
  Br.whichContext()  // 'browser'

  // in node.js environment
  Br.whichContext()  // 'node'
  ```
- **whichSystem**

  ```javascript
  // in mac
  Br.whichSystem()  // 'macOS'

  // in win
  Br.whichSystem()  // 'Windows'

  // in others
  Br.whichSystem()  // 'maybe Linux'
  ```
- **whichBrowser**

  ```javascript
  // in node.js environment
  Br.whichBrowser()  // 'the current environment is node, not browser'

  // in chrome
  Br.whichBrowser()  // 'Google Chrome'

  // in safari
  Br.whichBrowser()  // 'Apple Safari'

  // in firefox
  Br.whichBrowser()  // 'Mizilla Firefox'

  // in opera
  Br.whichBrowser()  // 'Opera Browser'

  // in qq
  Br.whichBrowser()  // 'QQ Browser'

  // in others
  Br.whichBrowser()  // 'Unknown UA, maybe some kind of M$\'s'
  ```

- **permit**

  ```javascript
  let obj = { name: 'es' }

  // can't create property
  Br.permit(obj, '0111')

  // can't create or delete property
  Br.permit(obj, '0011')

  // can't create, delete or update property
  Br.permit(obj, '0001')
  ```

- **fetch**

  ```javascript
  const url = 'http://httpbin.org/get'

  Br.fetch(url).then((res) => {
    console.log(res)
  }).catch((err) => {
    console.log(err)
  })
  ```

- **timeoutPromise**

  ```javascript
  const task = Br.getURL('http://httpbin.org/get')

  // set a 1000ms timeout
  Br.timeoutPromise(task, 1000).then((value) => {
    console.log(value)
  }).catch((reason) => {
    if (reason.message === 'timeout') {
      console.log('Fetch data failed')
    }
  })
  ```

- **isType**

  ```javascript
  Br.isType([], 'array')          // true
  Br.isType({}, 'object')         // true
  Br.isType(/^\/$/, 'regexp')     // true
  Br.isType(new Date(), 'date')   // true
  ```

- **type**

  ```javascript
  Br.type([])          // 'array'
  Br.type({})          // 'object'
  Br.type(/^\/$/)      // 'regexp'
  Br.type(new Date())  // 'date'
  ```

- **chunk**

  ```javascript
  // divide array into chunks,
  // and process them every several millisecond
  const arr = [ /* large array */ ]
  const process = function() { /* array handler */ }
  const interval = 100
  Br.chunk(arr, process, interval)
  ```

- **timeoutify**

  ```javascript
  // terminate a function call if time is out
  const foo = function() { /* some logic */ }
  const delay = 3000
  const bar = Br.timeoutify(foo, delay)
  ```

- **asyncify**

  ```javascript
  // make a function asynchronous
  const foo = function() { /* some logic */ }
  const bar = Br.asyncify(foo)
  ```

- **promisify**

  ```javascript
  // change callback style to promise style
  const req = Br.promisify(ajax)
  req(url).then(/* ... */)
  ```

- **debounce**

  ```javascript
  // debounce a function
  const foo = function() { /* some logic */ }
  const delay = 200

  // the delay default to 100
  const debounced = Br.debounce(foo, delay)
  ```

- **throttle**

  ```javascript
  // throttle a function
  const foo = function() { /* some logic */ }
  const interval = 200

  // the interval default to 100
  const throttled = Br.throttle(foo, interval)
  ```

- **getYMD**

  ```javascript
  // default date
  // suppose today is Jan 1 2017
  Br.getYMD()                      // 20170101

  // given date
  Br.getYMD(new Date(2017, 0, 1))  // 20170101
  ```

- **friendlyURL**

  ```javascript
  // beautify the url for reading
  Br.friendlyURL('https://apple.com/')  // 'apple.com'
  ```

- **curry**

  ```javascript
  // function currying
  const foo = (one, two) => one + two
  const bar = Br.curry(foo, 1)

  bar(2)  // 3
  ```

- **mergeSort**

  ```javascript
  const src = [5, 4, 3, 2, 1]

  Br.mergeSort(src)  // [1, 2, 3, 4, 5]
  ```

- **quickSort**

  ```javascript
  const src = [5, 4, 3, 2, 1]

  Br.quickSort(src)  // [1, 2, 3, 4, 5]
  ```

- **mixin**

  ```javascript
  const serializeMixin = {
    serialize() {
      return JSON.stringify(this)
    }
  }
  const anotherMixin = { /* ... */ }
  const mixins = Br.mixin(serializeMixin, anotherMixin)

  class target extends mixins {
    // ...
  }
  ```

- **binarySearch**

  ```javascript
  const src = [5, 4, 3, 2, 1]

  Br.binarySearch(3)  // 2
  Br.binarySearch(0)  // -1
  ```

- **strEqual**

  ```javascript
  const str = 'hello'

  // sensitive mode (default)
  Br.strEqual(str, 'Hello')         // false

  // insensitive mode
  Br.strEqual(str, 'Hello', false)  // true
  ```

- **strReverse**

  ```javascript
  Br.strReverse('abc')  // 'bca'
  ```

- **isIterable**

  ```javascript
  let items = document.querySelectorAll('.warn')
  Br.isIterable(items)  // false

  items = Array.from(items)
  Br.isIterable(items)  // true
  ```

- **isPrime**

  ```javascript
  Br.isPrime(1)   // false
  Br.isPrime(17)  // true
  ```

- **isNull**

  ```javascript
  Br.isNull(null)  // true
  Br.isNull({})    // false
  ```

- **isPromise**

  ```javascript
  Br.isPromise(Promise.resolve(42))  // true
  Br.isPromise(42)                   // false
  ```

- **shuffle**

  ```javascript
  const arr = [1, 2, 3, 4, 5]

  // shuffle array items
  Br.shuffle(arr)  // [2, 4, 1, 5, 3]
  Br.shuffle(arr)  // [4, 3, 5, 1, 2]
  ```

- **copy**

  ```javascript
  const obj = {
    name: 'es6',
    items: [1, 2, 3]
  }

  // shallow copy (default)
  const shallow = Br.copy(obj)
  shallow.items[2] = 0
  console.log(obj.items)  // [1, 2, 0]

  // deep copy
  const deep = Br.copy(obj, true)
  deep.items[1] = 0
  console.log(obj.items)  // [1, 2, 0]
  ```

- **selectFrom**

  ```javascript
  // given one number
  Br.selectFrom(10)  // 10

  // given two number
  Br.selectFrom(10, 20)  // 10
  Br.selectFrom(10, 20)  // 20
  Br.selectFrom(10, 20)  // 17
  ```

- **hasProtoProp**

  ```javascript
  const obj = {}
  obj.someProperty = 'something'

  Br.hasProtoProp(obj, 'toString')      // true
  Br.hasProtoProp(obj, 'someProperty')  // false
  ```

- **queryStr2keyValue**

  ```javascript
  const str = '?name=es&age=6'

  Br.queryStr2keyValue(str)  // { name: 'es', age: '6' }
  ```

- **addParam2URL**

   ```javascript
   const url = 'http://brant.cc?name=es'

   Br.addParam2URL(url, 'age', '6')  // 'http://brant.cc?name=es&age=6'
   ```

- **timeRecord**

  ```javascript
  // Record time consumption
  const process = function() { /* ... */ }
  const times = 100

  // the times default to 1
  Br.timeRecord(process)         // It costs 5ms
  Br.timeRecord(process, times)  // It costs 500ms
  ```

- **create**

  ```javascript
  // just like Object.create()
  const parent = {}
  const child = Br.create(parent)
  ```

## License

The project is under MIT license.
