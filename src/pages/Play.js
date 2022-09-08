import {
  ArrowForwardIos,
  Cancel,
  Check,
  CheckCircle,
  Close,
  PhotoLibrary,
  Shuffle,
  Sort,
} from '@mui/icons-material'
import {
  Alert,
  AlertTitle,
  Badge,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { amber, brown } from '@mui/material/colors'
import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import AwardBoard from '../components/AwardBoard'
import Capsule from '../components/Capsule'
import Card from '../components/Card'
import CircleButton from '../components/CircleButton'
import HeroTitle from '../components/HeroTitle'
import Preview from '../components/Preview'
import Wrapper from '../components/Wrapper'
import animalsJson from '../json/animals.json'
import ParticipantContext from '../store/ParticipantContext'
import { createQuizItem, shuffleArray, sortTopScore } from '../Utils'
import confetti from '../assets/images/confetti.gif'

const Main = styled('section')(({ bg }) => ({
  backgroundImage: `url('${bg}')`,
  padding: '10px',
  height: 'calc(100% - 20px)',
  maxHeight: 'calc(100% - 20px)',
  overflowY: 'auto',
}))

function Play() {
  const {
    participants,
    updateParticipant,
    player,
    nextPlayer,
    addPlayerScore,
    selectPlayer,
  } = useContext(ParticipantContext)
  const animalsData = animalsJson?.map((animal) => createQuizItem(animal))

  const [quizIndex, setQuizIndex] = useState(0)
  const [quizItems, setQuizItems] = useState(shuffleArray(animalsData))
  const [revealQuiz, setRevealQuiz] = useState(false)
  const [answerStatus, setAnswerStatus] = useState('')
  const [endGame, setEndGame] = useState(false)

  const ongoingItem = quizItems.filter((item) => item.status === 'ongoing')
  const answeredItem = quizItems.filter((item) => item.status === 'answered')
  const failedItem = quizItems.filter((item) => item.status === 'failed')

  const handleAnswer = (item, index) => {
    const newQuizProps = {}
    // Mark answer as selected
    const answers = [...ongoingItem[quizIndex]?.choices]
    answers[index] = { ...item, selected: true }
    newQuizProps.choices = answers

    if (ongoingItem[quizIndex]?.name === item?.answer) {
      setAnswerStatus('Correct')
      addPlayerScore(ongoingItem[quizIndex]?.points)
    } else {
      setAnswerStatus('Wrong')
      // Reduce quiz points by 2
      newQuizProps.points = ongoingItem[quizIndex]?.points - 2
    }

    updateQuizItem(newQuizProps)
  }

  const updateQuizItem = (props) => {
    const quizItemIndex = quizItems.findIndex(
      (item) => item.id === ongoingItem[quizIndex].id
    )
    const newQuizItems = [...quizItems]
    newQuizItems[quizItemIndex] = { ...ongoingItem[quizIndex], ...props }
    setQuizItems(newQuizItems)
  }

  const handleAlertClose = () => {
    if (answerStatus === 'Correct') {
      handleNextQuiz()
      updateQuizItem({ status: 'answered' })
    } else if (answerStatus === 'Wrong' && ongoingItem[quizIndex]?.points < 6) {
      handleNextQuiz()
      updateQuizItem({ status: 'failed' })
    }

    setAnswerStatus('')
    nextPlayer()
  }

  const handleNextQuiz = () => {
    if (ongoingItem.length - 1 === quizIndex) {
      setQuizIndex(0)
    } else {
      setQuizIndex(quizIndex + 1)
    }
    setRevealQuiz(false)
  }

  useEffect(() => {
    if (ongoingItem[quizIndex]?.points < 6 || answerStatus === 'Correct') {
      setRevealQuiz(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answerStatus, ongoingItem[quizIndex]?.points])

  useEffect(() => {
    if (ongoingItem?.length <= 0) {
      setEndGame(true)
    }
  }, [ongoingItem?.length])

  return (
    <Main bg={endGame && confetti}>
      <Container maxWidth='lg'>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Stack
              direction='row'
              spacing={1}
              justifyContent='space-between'
              sx={{ color: brown[500] }}
            >
              <HeroTitle>
                <Typography fontSize='3rem'>Guess the Animal</Typography>
              </HeroTitle>
              <Stack direction='row' spacing={1} alignItems='center'>
                <CheckCircle />
                <Typography>{answeredItem?.length || 0}</Typography>
                <Divider orientation='vertical' flexItem />
                <Cancel />
                <Typography>{failedItem?.length || 0}</Typography>
                <Divider orientation='vertical' flexItem />
                <PhotoLibrary />
                <Typography>{`${ongoingItem?.length}/${quizItems?.length}`}</Typography>
              </Stack>
            </Stack>
          </Grid>
          {/* Participants */}
          <Grid item sm={3} xs={12}>
            <Paper elevation={3} sx={{ p: 2, pl: 4 }}>
              <Stack
                direction='row'
                justifyContent='space-between'
                alignItems='center'
              >
                <Typography fontWeight={700}>Participants</Typography>
                <Paper
                  elevation={1}
                  sx={{ p: 1, pb: 0.5, cursor: 'pointer' }}
                  onClick={() =>
                    updateParticipant(
                      ongoingItem.length < 1
                        ? sortTopScore(participants)
                        : shuffleArray(participants)
                    )
                  }
                >
                  {ongoingItem.length < 1 ? <Sort /> : <Shuffle />}
                </Paper>
              </Stack>
              <Wrapper
                sx={{ maxHeight: 'calc(100vh - 170px)', pr: 2, pt: 1.5 }}
              >
                <Stack spacing={1}>
                  {participants.map(({ id, name, score }) => (
                    <Badge key={id} color='success' badgeContent={score}>
                      <Card
                        variant='outlined'
                        sx={{ width: '100%' }}
                        selectable
                        active={player?.id === id}
                        onClick={() => selectPlayer(id)}
                      >
                        <Typography textAlign='center'>
                          {name.toUpperCase()}
                        </Typography>
                      </Card>
                    </Badge>
                  ))}
                </Stack>
              </Wrapper>
            </Paper>
          </Grid>
          <Grid item xs={0.5} />

          {/* Preview Quiz */}
          <Grid item sm={8.5} xs={12}>
            {endGame ? (
              <AwardBoard players={participants} />
            ) : (
              <>
                <Preview
                  image={
                    revealQuiz
                      ? ongoingItem[quizIndex]?.img
                      : ongoingItem[quizIndex]?.cover
                  }
                  elevation={3}
                  sx={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
                />
                {/* Menu Panel */}
                <Stack
                  direction='row'
                  spacing={1}
                  justifyContent='space-between'
                  alignItems='center'
                >
                  <Typography
                    fontWeight={700}
                    fontSize='1.5rem'
                    color={amber[500]}
                  >
                    {`Player: ${player?.name}`}
                  </Typography>
                  {answerStatus && (
                    <Alert
                      severity={
                        answerStatus === 'Correct' ? 'success' : 'error'
                      }
                      icon={answerStatus === 'Correct' ? <Check /> : <Close />}
                      onClose={handleAlertClose}
                      sx={{ marginTop: '-40px !important' }}
                    >
                      <AlertTitle>{`${answerStatus} answer!`}</AlertTitle>
                    </Alert>
                  )}
                  <Stack direction='row' spacing={1}>
                    <Capsule>
                      <Typography fontWeight={700}>
                        {`Points: ${ongoingItem[quizIndex]?.points || 0}`}
                      </Typography>
                    </Capsule>
                    {ongoingItem.length > 1 && (
                      <CircleButton
                        onClick={() => !answerStatus && handleNextQuiz()}
                      >
                        <ArrowForwardIos />
                      </CircleButton>
                    )}
                  </Stack>
                </Stack>
                {/* Answer choices */}
                <Paper elevation={3} sx={{ backgroundColor: brown[500], p: 3 }}>
                  <Grid container spacing={2}>
                    {ongoingItem[quizIndex]?.choices.map((item, index) => (
                      <Grid item sm={6} xs={12} key={item?.id}>
                        <Button
                          fullWidth
                          variant='contained'
                          color='success'
                          onClick={() =>
                            !answerStatus && handleAnswer(item, index)
                          }
                          disabled={item?.selected}
                        >
                          {item?.answer}
                        </Button>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              </>
            )}
          </Grid>
        </Grid>
      </Container>
    </Main>
  )
}

export default Play
