import { findSumOfApplicableGames, findValidGameNumbers, parsedLine } from './part-1'
import { calculatePowerPerGame, findMaxNumbersForEachColor } from './part-2'

const input = [
  'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green',
  'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue',
  'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red',
  'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red',
]

const input2 = [
  'Game 1: 3 green, 8 blue; 2 green, 7 blue, 9 red; 8 red, 2 blue, 4 green; 1 green, 3 red, 7 blue; 4 blue, 4 green, 2 red; 9 red, 3 blue, 3 green',
  'Game 2: 9 red, 12 green, 1 blue; 11 green, 9 red, 2 blue; 1 blue, 8 red, 4 green; 6 red, 9 green; 2 blue, 10 red, 1 green; 2 blue, 15 green, 13 red',
  'Game 3: 3 green, 11 red, 16 blue; 8 blue, 1 red, 6 green; 4 green, 1 red, 5 blue',
  'Game 4: 9 blue, 3 red, 13 green; 2 red, 9 blue; 3 blue, 17 green, 5 red; 4 green, 8 blue',
  'Game 5: 2 blue, 3 red, 9 green; 4 blue, 1 red, 6 green; 8 green, 2 blue; 4 green, 2 blue, 7 red',
  'Game 6: 5 green, 3 blue; 4 blue, 3 green, 8 red; 3 green, 4 red, 3 blue; 2 blue, 4 red; 9 blue, 5 red, 3 green',
  'Game 7: 11 green; 10 green, 5 blue, 11 red; 5 blue, 13 red, 15 green; 10 green, 1 blue, 11 red',
  'Game 8: 5 green, 6 blue, 1 red; 7 green, 1 red; 5 blue; 3 blue, 1 red',
  'Game 9: 1 blue, 5 green, 7 red; 3 red, 5 green, 1 blue; 4 blue, 8 green, 2 red; 4 green, 1 blue, 6 red',
]

const bagContents = { red: 12, green: 13, blue: 14 }

describe('Day 2', () => {
  describe('Day 2 - part 1', () => {
    it('parses a line correctly', () => {
      const line = input[0]
      expect(parsedLine(line)).toEqual({ blue: [3, 6], red: [4, 1], green: [2, 2] })
    })
    it.each([
      {
        line: input[0],
        result: { blue: [3, 6], red: [4, 1], green: [2, 2] },
      },
      {
        line: input[1],
        result: { blue: [1, 4, 1], red: [1], green: [2, 3, 1] },
      },
      {
        line: input[2],
        result: { blue: [6, 5], red: [20, 4, 1], green: [8, 13, 5] },
      },
      {
        line: input[3],
        result: { blue: [6, 15], red: [3, 6, 14], green: [1, 3, 3] },
      },
    ])('gets $result from $line', ({ line, result }) => {
      expect(parsedLine(line)).toEqual(result)
    })
    it('collects applicable game numbers', () => {
      expect(findValidGameNumbers(input, bagContents)).toEqual([1, 2])
    })
    it('collects applicable game numbers again', () => {
      expect(findValidGameNumbers(input2, bagContents)).toEqual([1, 5, 6, 8, 9])
    })
    it('totals up the applicable game numbers', () => {
      expect(findSumOfApplicableGames(input, bagContents)).toEqual(3)
    })
    it('totals up the applicable game numbers again', () => {
      expect(findSumOfApplicableGames(input2, bagContents)).toEqual(29)
    })
  })
  describe('Day 2 - part 2', () => {
    it('calculates max numbers per color per game', () => {
      const oneLineInput = { green: [3, 2, 4, 1, 4, 3], blue: [8, 7, 2, 7, 4, 3], red: [9, 8, 3, 2, 9] }
      expect(findMaxNumbersForEachColor(oneLineInput)).toEqual([4, 8, 9])
    })
    it('calculates power per game', () => {
      const oneLineInput = { green: [3, 2, 4, 1, 4, 3], blue: [8, 7, 2, 7, 4, 3], red: [9, 8, 3, 2, 9] }
      expect(calculatePowerPerGame(oneLineInput)).toEqual(288)
    })
  })
})
