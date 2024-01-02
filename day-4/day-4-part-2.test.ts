import { processAllCardsForAllGames, allCardsPerGame, countAllCardsForAllGames } from './part-2'

const formattedTestInput = [
  { gameNumber: 1, matchCount: 4 },
  { gameNumber: 2, matchCount: 2 },
  { gameNumber: 3, matchCount: 2 },
  { gameNumber: 4, matchCount: 1 },
  { gameNumber: 5, matchCount: 0 },
  { gameNumber: 6, matchCount: 0 },
]

describe('Day 4', () => {
  describe('Day 4 - part 2', () => {
    it.each([
      {
        game: formattedTestInput[0],
        result: [1, 2, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5],
      },
      {
        game: formattedTestInput[1],
        result: [2, 3, 4, 4, 5, 5, 5],
      },
      {
        game: formattedTestInput[2],
        result: [3, 4, 5, 5],
      },
      {
        game: formattedTestInput[3],
        result: [4, 5],
      },
      {
        game: formattedTestInput[4],
        result: [5],
      },
      {
        game: formattedTestInput[5],
        result: [6],
      },
    ])('gets $result from $game', ({ game, result }) => {
      expect(allCardsPerGame(formattedTestInput, game)).toEqual(result)
    })
    it('returns all cards for all games', () => {
      expect(processAllCardsForAllGames(formattedTestInput)).toEqual([
        [1, 2, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5],
        [2, 3, 4, 4, 5, 5, 5],
        [3, 4, 5, 5],
        [4, 5],
        [5],
        [6],
      ])
    })
    it('returns 30 for the count of scratchcards for all games', () => {
      expect(countAllCardsForAllGames(formattedTestInput)).toEqual(30)
    })
  })
})
