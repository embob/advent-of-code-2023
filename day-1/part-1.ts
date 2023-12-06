import { readInputAsArray } from '../parser'

export const input = readInputAsArray('./day-1/input.txt')

const findFirstNumber = (line: string): string => {
  const letters = line.split('')
  const firstNumber = letters.find((letter) => !isNaN(parseInt(letter)))
  return firstNumber || '0'
}

const findLastNumber = (line: string): string => {
  const letters = line.split('')
  const lastNum = letters.reverse().find((letter) => !isNaN(parseInt(letter)))
  return lastNum || '0'
}

export const parseNumberFromLine = (line: string): number => {
  return parseInt(findFirstNumber(line) + findLastNumber(line))
}

export const sumOfAllLinesPart1 = (lines: string[]) =>
  lines.reduce((acc: number, curr: string) => {
    return acc + parseNumberFromLine(curr)
  }, 0)

console.log('part 1', sumOfAllLinesPart1(input))
