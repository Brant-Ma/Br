const { expect } = require('chai')
const Br = require('../utility.js')

describe('🐸  method that return a boolean', () => {
  it('isPrime', () => {
    expect(Br.isPrime()).to.equal(false)
    expect(Br.isPrime(1)).to.equal(false)
    expect(Br.isPrime(17)).to.equal(true)
  })

  it('strEqual', () => {
    expect(Br.strEqual('hello', 'hello')).to.equal(true)
    expect(Br.strEqual('hello', 'Hello')).to.equal(false)
    expect(Br.strEqual('hello', 'hello', false)).to.equal(true)
    expect(Br.strEqual('hello', 'Hello', false)).to.equal(true)
  })

  it('isType', () => {
    expect(Br.isType([], 'array')).to.equal(true)
    expect(Br.isType({}, 'object')).to.equal(true)
    expect(Br.isType(/^\/$/, 'regexp')).to.equal(true)
    expect(Br.isType(new Date(), 'date')).to.equal(true)
  })
})

describe('🐸  method that return a number', () => {
  it('selectFrom', () => {
    const noArg = Br.selectFrom()
    const oneArg = Br.selectFrom(10)
    const normalChoice = Br.selectFrom(10, 20)
    expect(noArg).to.equal(0)
    expect(oneArg).to.equal(10)
    expect(normalChoice).to.be.at.least(10).and.at.most(20)
  })

  const arr = [5, 4, 3, 2, 1]

  const assertion4search = (oneArg, fail, successful) => {
    expect(oneArg).to.equal(-1)
    expect(fail).to.equal(-1)
    expect(successful).to.equal(2)
  }

  it('linearSearch', () => {
    const oneArg = Br.linearSearch(arr)
    const fail = Br.linearSearch(arr, 6)
    const successful = Br.linearSearch(arr, 3)
    assertion4search(oneArg, fail, successful)
  })

  it('binarySearch', () => {
    const oneArg = Br.binarySearch(arr)
    const fail = Br.binarySearch(arr, 6)
    const successful = Br.binarySearch(arr, 3)
    assertion4search(oneArg, fail, successful)
  })
})

describe('🐸  method that return a string', () => {
  it('getYMD', () => {
    const noArg = Br.getYMD()
    const normalYMD = Br.getYMD(new Date(2001, 0, 1))
    expect(noArg).to.be.a('string').and.have.lengthOf(8)
    expect(normalYMD).to.equal('20010101')
  })

  it('friendlyURL', () => {
    const noArg = Br.friendlyURL()
    const normalURL = Br.friendlyURL('https://apple.com/')
    expect(noArg).to.equal('')
    expect(normalURL).to.equal('apple.com')
  })
})

describe('🐸  method that return an array', () => {
  const dist = [1, 2, 3, 4, 5]
  const srcCopy = [5, 4, 3, 2, 1]

  const assertion4sort = (noArg, src, sortedArray) => {
    expect(noArg).to.deep.equal([])
    expect(src).to.deep.equal(srcCopy)
    expect(sortedArray).to.deep.equal(dist)
  }

  it('bubbleSort', () => {
    const src = [5, 4, 3, 2, 1]
    const noArg = Br.bubbleSort()
    const sortedArray = Br.bubbleSort(src)
    assertion4sort(noArg, src, sortedArray)
  })

  it('selectionSort', () => {
    const src = [5, 4, 3, 2, 1]
    const noArg = Br.selectionSort()
    const sortedArray = Br.selectionSort(src)
    assertion4sort(noArg, src, sortedArray)
  })

  it('insertionSort', () => {
    const src = [5, 4, 3, 2, 1]
    const noArg = Br.insertionSort()
    const sortedArray = Br.insertionSort(src)
    assertion4sort(noArg, src, sortedArray)
  })

  it('mergeSort', () => {
    const src = [5, 4, 3, 2, 1]
    const noArg = Br.mergeSort()
    const sortedArray = Br.mergeSort(src)
    assertion4sort(noArg, src, sortedArray)
  })

  it('quickSort', () => {
    const src = [5, 4, 3, 2, 1]
    const noArg = Br.quickSort()
    const sortedArray = Br.quickSort(src)
    assertion4sort(noArg, src, sortedArray)
  })
})

describe('🐸  method that return a function', () => {
  it('curry', () => {
    const func = (one, two, three) => one + two + three
    expect(Br.curry(func)('a', 'b', 'c')).to.equal('abc')
    expect(Br.curry(func, 'a')('b', 'c')).to.equal('abc')
    expect(Br.curry(func, 'a', 'b')('c')).to.equal('abc')
    expect(Br.curry(func, 'a', 'b', 'c')()).to.equal('abc')
  })
})
