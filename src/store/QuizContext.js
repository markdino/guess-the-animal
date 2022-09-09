import { createContext, useEffect, useState } from 'react'
import animalsJson from '../json/animals.json'
import { createQuizItem, shuffleArray } from '../Utils'

const QuizContext = createContext({
  allItems: [],
  ongoingItems: [],
  answeredItems: [],
  failedItems: [],
  current: null,
  isReveal: false,
  isEnd: false,
  answerStatus: '',
  setAnswerStatus: () => {},
  update: () => {},
  next: () => {},
})

export const QuizContextProvider = ({ children }) => {
  const animalsData = animalsJson?.map((animal) => createQuizItem(animal))

  const [quizIndex, setQuizIndex] = useState(0)
  const [quizItems, setQuizItems] = useState(shuffleArray(animalsData))
  const [revealQuiz, setRevealQuiz] = useState(false)
  const [endGame, setEndGame] = useState(false)
  const [answerStatus, setAnswerStatus] = useState('')

  const ongoingItems = quizItems.filter((item) => item.status === 'ongoing')
  const answeredItems = quizItems.filter((item) => item.status === 'answered')
  const failedItems = quizItems.filter((item) => item.status === 'failed')

  const updateQuizItem = (props) => {
    const quizItemIndex = quizItems.findIndex(
      (item) => item.id === ongoingItems[quizIndex].id
    )
    const newQuizItems = [...quizItems]
    newQuizItems[quizItemIndex] = { ...ongoingItems[quizIndex], ...props }
    setQuizItems(newQuizItems)
  }

  const handleNextQuiz = () => {
    if (ongoingItems.length - 1 === quizIndex) {
      setQuizIndex(0)
    } else {
      setQuizIndex(quizIndex + 1)
    }
    setRevealQuiz(false)
  }

  const context = {
    allItems: quizItems,
    ongoingItems,
    answeredItems,
    failedItems,
    current: ongoingItems[quizIndex],
    isReveal: revealQuiz,
    isEnd: endGame,
    answerStatus,
    setAnswerStatus,
    update: updateQuizItem,
    next: handleNextQuiz,
  }

  useEffect(() => {
    if (ongoingItems[quizIndex]?.points < 6 || answerStatus === 'Correct') {
      setRevealQuiz(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answerStatus, ongoingItems[quizIndex]?.points])

  useEffect(() => {
    if (ongoingItems?.length <= 0) {
      setEndGame(true)
    }
  }, [ongoingItems?.length])

  return <QuizContext.Provider value={context}>{children}</QuizContext.Provider>
}

export default QuizContext
