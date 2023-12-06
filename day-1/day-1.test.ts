import { describe } from 'node:test'
import { parseNumberFromLine, sumOfAllLinesPart1 } from './part-1'
import { parseNumberFromNumberWords, sumOfAllLinesPart2 } from './part-2'

describe('Day 1', () => {
  describe('Day 1 - part 1', () => {
    it.each([
      { line: '1abc2', result: 12 },
      { line: 'pqr3stu8vwx', result: 38 },
      { line: 'a1b2c3d4e5f', result: 15 },
      { line: 'treb7uchet', result: 77 },
      { line: '', result: 0 },
    ])('gets $result from $line', ({ line, result }) => {
      expect(parseNumberFromLine(line)).toEqual(result)
    })

    it('parses all lines and sums it up', () => {
      const lines = ['1abc2', 'pqr3stu8vwx', 'a1b2c3d4e5f', 'treb7uchet']
      expect(sumOfAllLinesPart1(lines)).toEqual(142)
    })
  })

  describe('Day 1 - part 2', () => {
    it.each([
      { line: 'two1nine', result: 29 },
      { line: 'eightwothreethree', result: 83 },
      { line: 'abcone2threexyz', result: 13 },
      { line: 'xtwone3four', result: 24 },
      { line: '4nineeightseven2', result: 42 },
      { line: 'zoneight234', result: 14 },
      { line: 'abczoneight', result: 18 },
      { line: '7pqrstsixteen', result: 76 },
      { line: '7pqrst', result: 77 },
    ])('gets $result from $line', ({ line, result }) => {
      expect(parseNumberFromNumberWords(line)).toEqual(result)
    })

    it('parses all lines and sums it up', () => {
      const lines = [
        'two1nine',
        'eightwothree',
        'abcone2threexyz',
        'xtwone3four',
        '4nineeightseven2',
        'zoneight234',
        '7pqrstsixteen',
      ]
      expect(sumOfAllLinesPart2(lines)).toEqual(281)
    })
  })
})
