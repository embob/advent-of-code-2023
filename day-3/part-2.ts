import { calcStartIndex } from './part-1'

import { readInputAsArray } from '../parser'
const input = readInputAsArray('./day-3/input.txt')

export const findAllGearsPerLine = (line: string, rowIndex: number) => {
  return [...line.matchAll(/\*/g)].map((match) => {
    return {
      index: match.index || 0,
      rowIndex,
    }
  })
}

export const findAllGears = (input: string[]) => {
  return input.map((line, index) => findAllGearsPerLine(line, index)).flat()
}

const findRestOfNumbersBefore = (
  startIndex: number,
  rowAboveIndex: number,
  input: string[],
  completeNeighbours: string[],
) => {
  if (startIndex - 1 === -1) return
  let i = startIndex - 1
  const numbersCollected: string[] = []
  while (!isNaN(parseInt(input[rowAboveIndex][i]))) {
    numbersCollected.unshift(input[rowAboveIndex][i])
    i--
  }
  completeNeighbours.unshift(numbersCollected.join(''))
}

const findRestOfNumbersAfter = (
  rowAboveIndex: number,
  input: string[],
  completeNeighbours: string[],
  index: number,
) => {
  const endIndex = index + 1
  if (endIndex + 1 >= input[rowAboveIndex].length) return
  let i = endIndex + 1
  const numbersCollected: string[] = []
  while (!isNaN(parseInt(input[rowAboveIndex][i]))) {
    numbersCollected.push(input[rowAboveIndex][i])
    i++
  }
  completeNeighbours.push(numbersCollected.join(''))
}

const formatNumberMatches = (neighbours: string[]) =>
  [...neighbours.join('').matchAll(/\d+/g)].flat().map((n) => parseInt(n))

export const findNeighboursBelow2 = ({ rowIndex, index }: { rowIndex: number; index: number }, input: string[]) => {
  const rowBelowIndex = rowIndex + 1
  const isBelow = rowBelowIndex < input.length
  if (!isBelow) return ''
  const startIndex = calcStartIndex(index)
  const neighboursBelow = input[rowBelowIndex].slice(calcStartIndex(index), index + 2)
  const isFirstCharANumber = !isNaN(parseInt(neighboursBelow[0]))
  const isLastCharANumber = !isNaN(parseInt(neighboursBelow[neighboursBelow.length - 1]))
  if (!isFirstCharANumber && !isLastCharANumber) return formatNumberMatches([neighboursBelow])
  const completeNeighboursBelow = [...neighboursBelow]
  if (isFirstCharANumber) {
    findRestOfNumbersBefore(startIndex, rowBelowIndex, input, completeNeighboursBelow)
  }
  if (isLastCharANumber) {
    findRestOfNumbersAfter(rowBelowIndex, input, completeNeighboursBelow, index)
  }
  return formatNumberMatches(completeNeighboursBelow)
  // [...line.matchAll(/(\d*)/g)]]
}

export const findNeighboursAbove2 = ({ rowIndex, index }: { rowIndex: number; index: number }, input: string[]) => {
  const rowAboveIndex = rowIndex - 1
  const isAbove = rowAboveIndex > -1
  if (!isAbove) return ''
  const startIndex = calcStartIndex(index)
  const neighboursAbove = input[rowAboveIndex].slice(calcStartIndex(index), index + 2)
  const completeNeighboursAbove = [...neighboursAbove]
  const isFirstCharANumber = !isNaN(parseInt(neighboursAbove[0]))
  const isLastCharANumber = !isNaN(parseInt(neighboursAbove[neighboursAbove.length - 1]))
  if (!isFirstCharANumber && !isLastCharANumber) return formatNumberMatches([neighboursAbove])
  if (isFirstCharANumber) {
    findRestOfNumbersBefore(startIndex, rowAboveIndex, input, completeNeighboursAbove)
  }
  if (isLastCharANumber) {
    findRestOfNumbersAfter(rowAboveIndex, input, completeNeighboursAbove, index)
  }
  return formatNumberMatches(completeNeighboursAbove)
}

export const findNeighboursBefore2 = ({ rowIndex, index }: { rowIndex: number; index: number }, input: string[]) => {
  const startIndex = calcStartIndex(index)
  if (startIndex === index) return ''
  const neighboursBefore = input[rowIndex][startIndex]
  const isFirstCharANumber = !isNaN(parseInt(neighboursBefore[0]))
  if (!isFirstCharANumber) return formatNumberMatches([neighboursBefore])
  const completeNeighboursBefore = [...neighboursBefore]
  findRestOfNumbersBefore(startIndex, rowIndex, input, completeNeighboursBefore)
  return formatNumberMatches(completeNeighboursBefore)
}

export const findNeighboursAfter2 = ({ rowIndex, index }: { rowIndex: number; index: number }, input: string[]) => {
  const endIndex = index + 1
  if (endIndex + 1 >= input[rowIndex].length) return
  const neighboursAfter = input[rowIndex][endIndex]
  const isLastCharANumber = !isNaN(parseInt(neighboursAfter[neighboursAfter.length - 1]))
  if (!isLastCharANumber) return formatNumberMatches([neighboursAfter])
  const completeNeighboursAfter = [...neighboursAfter]
  findRestOfNumbersAfter(rowIndex, input, completeNeighboursAfter, index)
  return formatNumberMatches(completeNeighboursAfter)
}

export const findAllGearsAndNumberNeighbours = (input: string[]) => {
  const allGears = findAllGears(input)
  return allGears.map((gear) => {
    return {
      ...gear,
      numberNeighbours: [
        ...findNeighboursAbove2(gear, input),
        ...findNeighboursBelow2(gear, input),
        ...findNeighboursBefore2(gear, input),
        ...(findNeighboursAfter2(gear, input) || []),
      ],
    }
  })
}

const shortInput = [
  '467..114..',
  '...*......',
  '..35..633.',
  '......#...',
  '617*......',
  '.....+.58.',
  '..592.....',
  '......755.',
  '...$.*....',
  '.664.598..',
]

const filterGearsWithTwoConnectedNumbers = (input: string[]) => {
  return findAllGearsAndNumberNeighbours(input).filter((gear) => gear.numberNeighbours.length === 2)
}

export const calculateGearRatio = (numbers: any[]): number => {
  return numbers.reduce((acc: number, curr: number) => acc * curr, 1)
}

export const calculateTotalSumOfTwoNumberGears = (input: string[]) => {
  return filterGearsWithTwoConnectedNumbers(input).reduce((acc, curr) => {
    const gearRatio = calculateGearRatio(curr.numberNeighbours)
    return acc + gearRatio
  }, 0)
}

console.log('Day 3 part 2', calculateTotalSumOfTwoNumberGears(input))
