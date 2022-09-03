import { v4 as uuid } from 'uuid'

export const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5)

export const sortTopScore = (arr) => arr.sort((a, b) => b.score - a.score)

export const createQuizItem = (obj) => ({
  ...obj,
  id: uuid(),
  status: 'ongoing',
  points: 10,
  choices: obj?.choices?.map((answer) => ({
    id: uuid(),
    answer,
    selected: false,
  })),
})
