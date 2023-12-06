import { readInputAsArray } from '../parser'

export const input = readInputAsArray('./day-1/input.txt')

export const parseNumberFromNumberWords = (line: string): number => {
  const numberWords: { [key: string]: string } = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9',
    zero: '0',
  }

  const regex = /(?=(one|two|three|four|five|six|seven|eight|nine|[0-9]))/g
  const matches = Array.from(line.matchAll(regex)).map((match) => match[1])

  const processNumberWords = (numberWord: string) => {
    if (isNaN(parseInt(numberWord))) return numberWords[numberWord]
    return numberWord
  }

  return parseInt(processNumberWords(matches[0]) + processNumberWords(matches[matches.length - 1]))
}

export const sumOfAllLinesPart2 = (lines: string[]) =>
  lines.reduce((acc: number, curr: string) => {
    return acc + parseNumberFromNumberWords(curr)
  }, 0)

console.log('part 2', sumOfAllLinesPart2(input))
