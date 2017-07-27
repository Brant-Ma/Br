const { expect } = require('chai')
const Br = require('../utility.js')

describe('🐸  method that return a string', () => {
  it('getYMD', () => {
    const missedArgs = Br.getYMD()
    const normalYMD = Br.getYMD(new Date(2001, 0, 1))
    expect(missedArgs).to.be.a('string').and.have.lengthOf(8)
    expect(normalYMD).to.equal('20010101')
  })

  it('friendlyURL', () => {
    const missedArgs = Br.friendlyURL()
    const normalURL = Br.friendlyURL('https://apple.com/')
    expect(missedArgs).to.equal('')
    expect(normalURL).to.equal('apple.com')
  })
})

describe('🐸  method that sort an array', () => {
  const dist = [1, 2, 3, 4, 5]
  const srcCopy = [5, 4, 3, 2, 1]

  const assertion4sort = (missedArgs, src, sortedArray) => {
    expect(missedArgs).to.deep.equal([])
    expect(src).to.deep.equal(srcCopy)
    expect(sortedArray).to.deep.equal(dist)
  }

  it('bubbleSort', () => {
    const src = [5, 4, 3, 2, 1]
    const missedArgs = Br.bubbleSort()
    const sortedArray = Br.bubbleSort(src)
    assertion4sort(missedArgs, src, sortedArray)
  })

  it('selectionSort', () => {
    const src = [5, 4, 3, 2, 1]
    const missedArgs = Br.selectionSort()
    const sortedArray = Br.selectionSort(src)
    assertion4sort(missedArgs, src, sortedArray)
  })

  it('insertionSort', () => {
    const src = [5, 4, 3, 2, 1]
    const missedArgs = Br.insertionSort()
    const sortedArray = Br.insertionSort(src)
    assertion4sort(missedArgs, src, sortedArray)
  })

  it('mergeSort', () => {
    const src = [5, 4, 3, 2, 1]
    const missedArgs = Br.mergeSort()
    const sortedArray = Br.mergeSort(src)
    assertion4sort(missedArgs, src, sortedArray)
  })

  it('quickSort', () => {
    const src = [5, 4, 3, 2, 1]
    const missedArgs = Br.quickSort()
    const sortedArray = Br.quickSort(src)
    assertion4sort(missedArgs, src, sortedArray)
  })
})

describe('🐸  method that search in an array', () => {
  const arr = [5, 4, 3, 2, 1]

  const assertion4search = (missedArgs, fail, successful) => {
    expect(missedArgs).to.equal(-1)
    expect(fail).to.equal(-1)
    expect(successful).to.equal(2)
  }

  it('linearSearch', () => {
    const missedArgs = Br.linearSearch(arr)
    const fail = Br.linearSearch(arr, 6)
    const successful = Br.linearSearch(arr, 3)
    assertion4search(missedArgs, fail, successful)
  })

  it('binarySearch', () => {
    const missedArgs = Br.binarySearch(arr)
    const fail = Br.binarySearch(arr, 6)
    const successful = Br.binarySearch(arr, 3)
    assertion4search(missedArgs, fail, successful)
  })
})
