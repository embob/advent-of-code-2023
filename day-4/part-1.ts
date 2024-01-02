import { readInputAsArray } from '../parser'

const input = readInputAsArray('./day-4/input.txt')

export const formatInputByLine = (line: string) => {
  const i = line.search(/\:/g)
  return line
    .slice(i + 1)
    .split('|')
    .map((items) => [...items.matchAll(/(\d+)/g)].map((match) => parseInt(match[0])).flat())
}

export const formatInput = (input: string[]) => {
  return input.map((line) => formatInputByLine(line))
}

export const findMatchesPerLine = (line: number[][]) => {
  return line[0].filter((number) => line[1].includes(number))
}

export const calculateScorePerLine = (lineMatches: number[]) => {
  if (lineMatches.length === 0) return 0
  const numberOfTimesToDouble = lineMatches.length - 1
  return 1 * Math.pow(2, numberOfTimesToDouble)
}

export const sumOfAllScores = (input: string[]) => {
  const formattedInput = formatInput(input)
  return formattedInput
    .map((line) => {
      return calculateScorePerLine(findMatchesPerLine(line))
    })
    .reduce((acc, curr) => acc + curr, 0)
}

console.log(sumOfAllScores(input))
