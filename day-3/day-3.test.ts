import {
  containsSymbols,
  findAllNumbers,
  findAllNumbersPerLine,
  findNeighboursAbove,
  findNeighboursAfter,
  findNeighboursBefore,
  findNeighboursBelow,
  findNumbersAdjacentToSymbols,
  totalAllNumbersAdjacentToSymbols,
} from './part-1'
import {
  findAllGears,
  findAllGearsPerLine,
  findNeighboursAbove2,
  findNeighboursAfter2,
  findNeighboursBefore2,
  findNeighboursBelow2,
} from './part-2'

const input = [
  '467..114..',
  '...*......',
  '..35..633.',
  '......#...',
  '617*......',
  '.....+.58.',
  '..592.....',
  '......755.',
  '...$..*...',
  '.664...598',
]

export const input2 = [
  '467.114...',
  '...*......',
  '.35.633...',
  '......#...',
  '617*456...',
  '.....+.58.',
  '*.592.....',
  '.......755',
  '...$.....*',
  '.664....98',
]

describe('Day 3', () => {
  describe('Day 3 - part 1', () => {
    it('find all numbers and their starting indexes in a string line', () => {
      expect(findAllNumbersPerLine(input[0], 0)).toEqual([
        { value: 467, valueIndex: 0, rowIndex: 0 },
        { value: 114, valueIndex: 5, rowIndex: 0 },
      ])
    })
    it.each([
      {
        line: input[1],
        index: 1,
        result: [],
      },
      {
        line: input[2],
        index: 2,
        result: [
          { value: 35, valueIndex: 2, rowIndex: 2 },
          { value: 633, valueIndex: 6, rowIndex: 2 },
        ],
      },
      {
        line: input[4],
        index: 4,
        result: [{ value: 617, valueIndex: 0, rowIndex: 4 }],
      },
      {
        line: input[9],
        index: 9,
        result: [
          { value: 664, valueIndex: 1, rowIndex: 9 },
          { value: 598, valueIndex: 7, rowIndex: 9 },
        ],
      },
    ])('gets $result from $line', ({ line, index, result }) => {
      expect(findAllNumbersPerLine(line, index)).toEqual(result)
    })
    it('find all numbers in the input', () => {
      const inputSlice = input.slice(0, 5)
      expect(findAllNumbers(inputSlice)).toEqual([
        { value: 467, valueIndex: 0, rowIndex: 0 },
        { value: 114, valueIndex: 5, rowIndex: 0 },
        { value: 35, valueIndex: 2, rowIndex: 2 },
        { value: 633, valueIndex: 6, rowIndex: 2 },
        { value: 617, valueIndex: 0, rowIndex: 4 },
      ])
    })
    const value1 = { value: 617, valueIndex: 0, rowIndex: 4 }
    it('returns correct above neighbours', () => {
      expect(findNeighboursAbove(value1, input)).toEqual('....')
    })
    it('returns correct below neighbours', () => {
      expect(findNeighboursBelow(value1, input)).toEqual('....')
    })
    it('returns correct before neighbour', () => {
      expect(findNeighboursBefore(value1, input)).toEqual('')
    })
    it('returns correct after neighbour', () => {
      expect(findNeighboursAfter(value1, input)).toEqual('*')
    })
    const value2 = { value: 467, valueIndex: 0, rowIndex: 0 }
    it('returns correct above neighbours', () => {
      expect(findNeighboursAbove(value2, input)).toEqual('')
    })
    it('returns correct below neighbours', () => {
      expect(findNeighboursBelow(value2, input)).toEqual('...*')
    })
    it('returns correct before neighbour', () => {
      expect(findNeighboursBefore(value2, input)).toEqual('')
    })
    it('returns correct after neighbour', () => {
      expect(findNeighboursAfter(value2, input)).toEqual('.')
    })
    const value3 = { value: 598, valueIndex: 7, rowIndex: 9 }
    it('returns correct above neighbours', () => {
      expect(findNeighboursAbove(value3, input)).toEqual('*...')
    })
    it('returns correct below neighbours', () => {
      expect(findNeighboursBelow(value3, input)).toEqual('')
    })
    it('returns correct before neighbour', () => {
      expect(findNeighboursBefore(value3, input)).toEqual('.')
    })
    it('returns correct after neighbour', () => {
      expect(findNeighboursAfter(value3, input)).toEqual('')
    })
    it.each([
      {
        line: '',
        result: false,
      },
      {
        line: '$....',
        result: true,
      },
      {
        line: '....54!',
        result: true,
      },
    ])('gets $result from $line', ({ line, result }) => {
      expect(containsSymbols(line)).toEqual(result)
    })
    it('returns all numbers with neighbours', () => {
      expect(findNumbersAdjacentToSymbols(input)).toEqual([467, 35, 633, 617, 592, 755, 664, 598])
    })
    it('returns correct sums of all numbers with neighbours', () => {
      expect(totalAllNumbersAdjacentToSymbols(input)).toEqual(4361)
    })
  })
  describe('Day 3 - part 2', () => {
    it('finds all * in one input line and stores their indexes', () => {
      expect(findAllGearsPerLine(input[4], 4)).toEqual([{ index: 3, rowIndex: 4 }])
    })
    it('finds all * in the input and stores their indexes', () => {
      expect(findAllGears(input)).toEqual([
        { index: 3, rowIndex: 1 },
        { index: 3, rowIndex: 4 },
        { index: 6, rowIndex: 8 },
      ])
    })
    it('finds all complete numbers neighbours in the line above a gear', () => {
      const gear = { index: 3, rowIndex: 1 }
      expect(findNeighboursAbove2(gear, input)).toEqual([467])
    })
    it('finds all neighbours + complete numbers in the line below a gear', () => {
      const gear = { index: 3, rowIndex: 1 }
      expect(findNeighboursBelow2(gear, input)).toEqual([35])
    })
    it('finds all neighbours + complete numbers in the line before a gear', () => {
      const gear = { index: 3, rowIndex: 4 }
      expect(findNeighboursBefore2(gear, input)).toEqual([617])
    })
    it('finds all neighbours + complete numbers in the line after a gear', () => {
      const gear = { index: 3, rowIndex: 4 }
      expect(findNeighboursAfter2(gear, input)).toEqual([])
    })

    it('finds all complete numbers neighbours in the line above a gear', () => {
      const gear = { index: 3, rowIndex: 1 }
      expect(findNeighboursAbove2(gear, input2)).toEqual([467, 114])
    })
    it('finds all neighbours + complete numbers in the line below a gear', () => {
      const gear = { index: 3, rowIndex: 1 }
      expect(findNeighboursBelow2(gear, input2)).toEqual([35, 633])
    })
    it('finds all neighbours + complete numbers in the line before a gear', () => {
      const gear = { index: 3, rowIndex: 4 }
      expect(findNeighboursBefore2(gear, input2)).toEqual([617])
    })
    it('finds all neighbours + complete numbers in the line after a gear', () => {
      const gear = { index: 3, rowIndex: 4 }
      expect(findNeighboursAfter2(gear, input2)).toEqual([456])
    })
    it('finds all neighbours + complete numbers in the line above a gear', () => {
      const gear = { index: 9, rowIndex: 8 }
      expect(findNeighboursAbove2(gear, input2)).toEqual([755])
    })
    it('finds all neighbours + complete numbers in the line below a gear', () => {
      const gear = { index: 9, rowIndex: 8 }
      expect(findNeighboursBelow2(gear, input2)).toEqual([98])
    })
  })
})
