import { readInputAsArray } from '../parser'

const input = readInputAsArray('./day-3/input.txt')

export const findAllNumbersPerLine = (line: string, rowIndex: number) => {
  return [...line.matchAll(/(\d*)/g)]
    .filter((match) => match[0].length > 0)
    .map((match) => {
      return {
        value: parseInt(match[0]),
        valueIndex: match.index || 0,
        rowIndex,
      }
    })
}

export const findAllNumbers = (input: string[]) => {
  return input.map((line, index) => findAllNumbersPerLine(line, index)).flat()
}

export const calcStartIndex = (valueIndex: number) => (valueIndex - 1 > -1 ? valueIndex - 1 : valueIndex)
const calcEndIndex = (value: number, valueIndex: number) => valueIndex + value.toString().length

export const findNeighboursAbove = (
  {
    rowIndex,
    valueIndex,
    value,
  }: {
    rowIndex: number
    valueIndex: number
    value: number
  },
  input: string[],
) => {
  const rowAboveIndex = rowIndex - 1
  const isAbove = rowAboveIndex > -1
  if (!isAbove) return ''
  const start = calcStartIndex(valueIndex)

  const end = calcEndIndex(value, valueIndex)
  return input[rowAboveIndex].slice(calcStartIndex(valueIndex), calcEndIndex(value, valueIndex) + 1)
}

export const findNeighboursBelow = (
  {
    rowIndex,
    valueIndex,
    value,
  }: {
    rowIndex: number
    valueIndex: number
    value: number
  },
  input: string[],
) => {
  const rowBelowIndex = rowIndex + 1
  const isBelow = rowBelowIndex < input.length
  if (!isBelow) return ''
  return input[rowBelowIndex].slice(calcStartIndex(valueIndex), calcEndIndex(value, valueIndex) + 1)
}
export const findNeighboursBefore = (
  {
    rowIndex,
    valueIndex,
    value,
  }: {
    rowIndex: number
    valueIndex: number
    value: number
  },
  input: string[],
) => {
  const startIndex = calcStartIndex(valueIndex)
  if (startIndex === valueIndex) return ''
  return input[rowIndex][startIndex]
}

export const findNeighboursAfter = (
  {
    rowIndex,
    valueIndex,
    value,
  }: {
    rowIndex: number
    valueIndex: number
    value: number
  },
  input: string[],
) => {
  const endIndex = calcEndIndex(value, valueIndex)
  if (endIndex === valueIndex) return ''
  return input[rowIndex][endIndex] || ''
}

export const containsSymbols = (neighbours: string) => {
  return neighbours.search(/[^a-zA-Z0-9.]/g) > -1
}

const hasSymbolsAdjacent = (
  value: {
    rowIndex: number
    valueIndex: number
    value: number
  },
  input: string[],
) => {
  if (containsSymbols(findNeighboursAbove(value, input))) {
    return true
  }
  if (containsSymbols(findNeighboursBelow(value, input))) {
    return true
  }
  if (containsSymbols(findNeighboursBefore(value, input))) {
    return true
  }
  if (containsSymbols(findNeighboursAfter(value, input))) {
    return true
  }
  return false
}

export const findNumbersAdjacentToSymbols = (input: string[]) => {
  return findAllNumbers(input).reduce((acc, curr) => {
    if (hasSymbolsAdjacent(curr, input)) {
      acc.push(curr.value)
    }
    return acc
  }, [] as number[])
}

export const totalAllNumbersAdjacentToSymbols = (input: string[]) => {
  return findNumbersAdjacentToSymbols(input).reduce((acc, curr) => {
    return acc + curr
  }, 0)
}

console.log(totalAllNumbersAdjacentToSymbols(input))
