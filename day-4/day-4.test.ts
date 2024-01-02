import { calculateScorePerLine, findMatchesPerLine, formatInputByLine } from '../day-4/part-1'

const formattedInput = [
  [
    [41, 48, 83, 86, 17],
    [83, 86, 6, 31, 17, 9, 48, 53],
  ],
  [
    [13, 32, 20, 16, 61],
    [61, 30, 68, 82, 17, 32, 24, 19],
  ],
  [
    [1, 21, 53, 59, 44],
    [69, 82, 63, 72, 16, 21, 14, 1],
  ],
  [
    [41, 92, 73, 84, 69],
    [59, 84, 76, 51, 58, 5, 54, 83],
  ],
  [
    [87, 83, 26, 28, 32],
    [88, 30, 70, 12, 93, 22, 82, 36],
  ],
  [
    [31, 18, 13, 56, 72],
    [74, 77, 10, 23, 35, 67, 36, 11],
  ],
]
describe('Day 4', () => {
  describe('Day 4 - part 1', () => {
    it('formats the input correctly', () => {
      const line = 'Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53'
      expect(formatInputByLine(line)).toEqual([
        [41, 48, 83, 86, 17],
        [83, 86, 6, 31, 17, 9, 48, 53],
      ])
    })
    it.each([
      {
        line: [
          [41, 48, 83, 86, 17],
          [83, 86, 6, 31, 17, 9, 48, 53],
        ],
        result: [48, 83, 86, 17],
      },
      {
        line: [
          [13, 32, 20, 16, 61],
          [61, 30, 68, 82, 17, 32, 24, 19],
        ],

        result: [32, 61],
      },
      {
        line: [
          [87, 83, 26, 28, 32],
          [88, 30, 70, 12, 93, 22, 82, 36],
        ],
        result: [],
      },
    ])('gets $result from $line', ({ line, result }) => {
      expect(findMatchesPerLine(line)).toEqual(result)
    })
    it.each([
      {
        line: [48, 83, 86, 17],
        result: 8,
      },
      {
        line: [32, 61],

        result: 2,
      },
      {
        line: [],
        result: 0,
      },
    ])('gets $result from $line', ({ line, result }) => {
      expect(calculateScorePerLine(line)).toEqual(result)
    })
  })
})
