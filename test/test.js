const { expect } = require('chai')
const t = require('../src/utility.js')

describe('🐸  methods that return a boolean: ', () => {
  it('hasProtoProp', () => {
    const obj = {}
    obj.someProperty = 'something'
    expect(t.hasProtoProp(obj, 'toString')).to.equal(true)
    expect(t.hasProtoProp(obj, 'someProperty')).to.equal(false)
  })

  it('strEqual', () => {
    expect(t.strEqual('hello', 'hello')).to.equal(true)
    expect(t.strEqual('hello', 'Hello')).to.equal(false)
    expect(t.strEqual('hello', 'hello', false)).to.equal(true)
    expect(t.strEqual('hello', 'Hello', false)).to.equal(true)
  })

  it('isPrime', () => {
    expect(t.isPrime()).to.equal(false)
    expect(t.isPrime(1)).to.equal(false)
    expect(t.isPrime(17)).to.equal(true)
  })

  it('isType', () => {
    expect(t.isType([], 'array')).to.equal(true)
    expect(t.isType({}, 'object')).to.equal(true)
    expect(t.isType(/^\/$/, 'regexp')).to.equal(true)
    expect(t.isType(new Date(), 'date')).to.equal(true)
  })

  it('isNull', () => {
    expect(t.isNull(null)).to.equal(true)
    expect(t.isNull({})).to.equal(false)
  })

  it('isIterable', () => {
    const types = ['', [], new Set(), new Map(), {}]
    expect(t.isIterable(types[0])).to.equal(true)
    expect(t.isIterable(types[1])).to.equal(true)
    expect(t.isIterable(types[2])).to.equal(true)
    expect(t.isIterable(types[3])).to.equal(true)
    expect(t.isIterable(types[4])).to.equal(false)
  })
})

describe('🐸  methods that return a number: ', () => {
  it('selectFrom', () => {
    const oneArg = t.selectFrom(10)
    const normalChoice = t.selectFrom(10, 20)
    expect(oneArg).to.equal(10)
    expect(normalChoice).to.be.at.least(10).and.at.most(20)
  })

  it('addParam2URL', () => {
    const url = 'http://brant.cc?name=es'
    const result = t.addParam2URL(url, 'age', '6')
    expect(result).to.equal('http://brant.cc?name=es&age=6')
  })

  it('binarySearch', () => {
    const arr = [5, 4, 3, 2, 1]
    expect(t.binarySearch(arr)).to.equal(-1)
    expect(t.binarySearch(arr, 6)).to.equal(-1)
    expect(t.binarySearch(arr, 3)).to.equal(2)
  })
})

describe('🐸  methods that return a string: ', () => {
  it('getYMD', () => {
    const noArg = t.getYMD()
    const normalYMD = t.getYMD(new Date(2001, 0, 1))
    expect(noArg).to.be.a('string').and.have.lengthOf(8)
    expect(normalYMD).to.equal('20010101')
  })

  it('friendlyURL', () => {
    const noArg = t.friendlyURL()
    const normalURL = t.friendlyURL('https://apple.com/')
    expect(noArg).to.equal('')
    expect(normalURL).to.equal('apple.com')
  })

  it('timeRecord', () => {
    const plus = (ret, one, two) => { ret = one * two }
    expect(t.timeRecord(plus)).to.be.a('string')
    expect(t.timeRecord(plus, 100)).to.be.a('string')
  })

  it('type', () => {
    expect(t.type([])).to.equal('array')
    expect(t.type({})).to.equal('object')
    expect(t.type(/^\/$/)).to.equal('regexp')
    expect(t.type(new Date())).to.equal('date')
  })

  it('strReverse', () => {
    expect(t.strReverse('')).to.equal('')
    expect(t.strReverse('abc')).to.equal('cba')
  })
})

describe('🐸  methods that return an array: ', () => {
  const dist = [1, 2, 3, 4, 5]
  const srcCopy = [5, 4, 3, 2, 1]

  const assertion4sort = (noArg, src, sortedArray) => {
    expect(noArg).to.deep.equal([])
    expect(src).to.deep.equal(srcCopy)
    expect(sortedArray).to.deep.equal(dist)
  }

  it('bubbleSort', () => {
    const src = [5, 4, 3, 2, 1]
    const noArg = t.bubbleSort()
    const sortedArray = t.bubbleSort(src)
    assertion4sort(noArg, src, sortedArray)
  })

  it('selectionSort', () => {
    const src = [5, 4, 3, 2, 1]
    const noArg = t.selectionSort()
    const sortedArray = t.selectionSort(src)
    assertion4sort(noArg, src, sortedArray)
  })

  it('insertionSort', () => {
    const src = [5, 4, 3, 2, 1]
    const noArg = t.insertionSort()
    const sortedArray = t.insertionSort(src)
    assertion4sort(noArg, src, sortedArray)
  })

  it('mergeSort', () => {
    const src = [5, 4, 3, 2, 1]
    const noArg = t.mergeSort()
    const sortedArray = t.mergeSort(src)
    assertion4sort(noArg, src, sortedArray)
  })

  it('quickSort', () => {
    const src = [5, 4, 3, 2, 1]
    const noArg = t.quickSort()
    const sortedArray = t.quickSort(src)
    assertion4sort(noArg, src, sortedArray)
  })
})

describe('🐸  methods that return an object: ', () => {
  it('copy', () => {
    const obj = {
      name: 'es6',
      items: [1, 2, 3],
    }
    t.copy(obj).items[2] = 0
    expect(obj.items[2]).to.equal(0)
    t.copy(obj, true).items[1] = 0
    expect(obj.items[1]).to.equal(2)
  })

  it('queryStr2keyValue', () => {
    const str = '?name=es&age=6'
    const obj = t.queryStr2keyValue(str)
    expect(obj.name).to.equal('es')
    expect(obj.age).to.equal('6')
  })
})

describe('🐸  methods that return a function: ', () => {
  it('curry', () => {
    const func = (one, two, three) => one + two + three
    expect(t.curry(func)('a', 'b', 'c')).to.equal('abc')
    expect(t.curry(func, 'a')('b', 'c')).to.equal('abc')
    expect(t.curry(func, 'a', 'b')('c')).to.equal('abc')
    expect(t.curry(func, 'a', 'b', 'c')()).to.equal('abc')
  })
})
