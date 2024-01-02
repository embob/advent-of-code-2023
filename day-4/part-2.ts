import { readInputAsArray } from '../parser'

const input = readInputAsArray('./day-4/input.txt')

const formatNumbers = (numberString: string): number[] => {
  return numberString.match(/(\d+)/g)?.map((stringNumber) => parseInt(stringNumber)) || []
}

const formatMatches = (numberString: string) => {
  return numberString.split('|').map((group) => formatNumbers(group) || [])
}
export const findMatchesPerLine = (line: number[][]) => {
  return line[0].filter((number) => line[1].includes(number))
}

export const formatInputByLine = (line: string) => {
  const [n, matches] = line.split(':')
  const gameNumber = Number(formatNumbers(n)[0])
  const matchCount = findMatchesPerLine(formatMatches(matches)).length
  return {
    gameNumber,
    matchCount,
  }
}
const processCardWins = (gameNumber: number, matchCount: number) => {
  return Array.from({ length: matchCount }, (_, i) => gameNumber + 1 + i)
}

export const formatInput = (input: string[]) => {
  return input.map((line) => formatInputByLine(line))
}

const formattedInput = formatInput(input)

const processAllCardsPerGame = (
  games: { gameNumber: number; matchCount: number }[],
  game: { gameNumber: number; matchCount: number },
  cardsCount: number[],
) => {
  const { gameNumber, matchCount } = game
  if (matchCount === 0) return
  for (let index = gameNumber + 1; index <= gameNumber + matchCount; index++) {
    cardsCount.push(index)
    processAllCardsPerGame(games, games[index - 1], cardsCount)
  }
}

export const allCardsPerGame = (
  games: { gameNumber: number; matchCount: number }[],
  game: { gameNumber: number; matchCount: number },
) => {
  const cardsCount: number[] = []
  cardsCount.push(game.gameNumber)
  processAllCardsPerGame(games, game, cardsCount)
  return cardsCount.sort()
}

export const processAllCardsForAllGames = (games: { gameNumber: number; matchCount: number }[]) => {
  const allGames = [...games]
  return allGames.map((game) => allCardsPerGame(games, game))
}

export const countAllCardsForAllGames = (games: { gameNumber: number; matchCount: number }[]) => {
  const allCardsForAllGames = processAllCardsForAllGames(games)
  return allCardsForAllGames.reduce((acc, curr) => {
    return acc + curr.length
  }, 0)
}

console.log(countAllCardsForAllGames(formattedInput))
