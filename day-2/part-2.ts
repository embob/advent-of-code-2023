import { readInputAsArray } from '../parser'

const input = readInputAsArray('./day-2/input.txt')

import { parseInput } from './part-1'

export const findMaxNumbersForEachColor = (game: { [key: string]: number[] }) => {
  const maxNumbers = []
  for (const color in game) {
    maxNumbers.push(Math.max(...game[color]))
  }
  return maxNumbers
}

export const calculatePowerPerGame = (game: { [key: string]: number[] }): number => {
  const maxNumbers = findMaxNumbersForEachColor(game)
  return maxNumbers.reduce((acc, curr) => acc * curr, 1)
}

export const calculatePowerSum = (input: string[]): number => {
  const parsedInput = parseInput(input)
  return parsedInput.reduce((acc, curr) => {
    const power = calculatePowerPerGame(curr)
    return acc + power
  }, 0)
}

console.log('day 2 part 2', calculatePowerSum(input))
