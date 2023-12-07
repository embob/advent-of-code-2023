import { readInputAsArray } from '../parser'

const input = readInputAsArray('./day-2/input.txt')

const bagContents = { red: 12, green: 13, blue: 14 }

export const parsedLine = (line: string) => {
  const splitUpLine = line
    .split(': ')[1]
    .split('; ')
    .map((round) => round.split(', ').map((color) => color.split(' ')))

  return splitUpLine.reduce(
    (acc, curr) => {
      curr.forEach((color) => {
        acc[color[1]].push(parseInt(color[0]))
      })
      return acc
    },
    { blue: [], red: [], green: [] } as { [key: string]: number[] },
  )
}

export const parseInput = (input: string[]) => {
  return input.map((line) => parsedLine(line))
}

export const findValidGameNumbers = (input: string[], bagContents: { [key: string]: number }): number[] => {
  const games: { [key: string]: number[] }[] = parseInput(input)
  // adds all game numbers as valid to start with
  const validGames = Array.from({ length: games.length }, (_, i) => i + 1)

  const invalidGames = [
    ...new Set(
      games.reduce((acc: number[], curr: { [key: string]: number[] }, currentIndex: number) => {
        const gameNumber = currentIndex + 1
        for (const color in curr) {
          const hasGreaterAmount = curr[color as keyof typeof curr].some((amount) => amount > bagContents[color])
          if (hasGreaterAmount) acc.push(gameNumber)
        }
        return acc
      }, []),
    ),
  ]
  return validGames.filter((gameNumber) => !invalidGames.includes(gameNumber))
}

export const findSumOfApplicableGames = (input: string[], bagContents: { [key: string]: number }): number => {
  const validGameNumbers = findValidGameNumbers(input, bagContents)
  return validGameNumbers.reduce((acc: number, curr: number) => {
    return acc + curr
  }, 0)
}

console.log('Day 2 part 1', findSumOfApplicableGames(input, bagContents))
