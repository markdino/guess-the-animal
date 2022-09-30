import { ArrowForwardIos, Check, Close } from '@mui/icons-material'
import {
  AlertTitle,
  Button,
  Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { amber, brown } from '@mui/material/colors'
import { useContext } from 'react'
import ParticipantContext from '../store/ParticipantContext'
import QuizContext from '../store/QuizContext'
import Capsule from './Capsule'
import CircleButton from './CircleButton'
import CustomAlert from './CustomAlert'
import Preview from './Preview'

const QuizBoard = () => {
  const quiz = useContext(QuizContext)
  const participants = useContext(ParticipantContext)

  const handleAnswer = (item, index) => {
    const newQuizProps = {}
    // Mark answer as selected
    const answers = [...quiz.current?.choices]
    answers[index] = { ...item, selected: true }
    newQuizProps.choices = answers

    if (quiz.current?.name === item?.answer) {
      quiz.setAnswerStatus('Correct')
      participants.addPlayerScore(quiz.current?.points)
    } else {
      quiz.setAnswerStatus('Wrong')
      // Reduce quiz points by 2
      newQuizProps.points = quiz.current?.points - 2
    }

    quiz.update(newQuizProps)
  }

  const handleAlertClose = () => {
    if (quiz.answerStatus === 'Correct') {
      quiz.update({ status: 'answered' })
    } else if (quiz.answerStatus === 'Wrong' && quiz.current?.points < 6) {
      quiz.update({ status: 'failed' })
    }

    quiz.setAnswerStatus('')
    participants.nextPlayer()
  }

  return (
    <>
      {/* Image Preview Panel */}
      <Preview
        image={quiz.isReveal ? quiz.current?.img : quiz.current?.cover}
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
        <Typography fontWeight={700} fontSize='1.5rem' color={amber[500]}>
          {`Player: ${participants.player?.name}`}
        </Typography>
        {quiz.answerStatus && (
          <CustomAlert
            severity={quiz.answerStatus === 'Correct' ? 'success' : 'error'}
            icon={quiz.answerStatus === 'Correct' ? <Check /> : <Close />}
            onClose={handleAlertClose}
            autoClose
            sx={{ marginTop: '-40px !important' }}
          >
            <AlertTitle>{`${quiz.answerStatus} answer!`}</AlertTitle>
          </CustomAlert>
        )}
        <Stack direction='row' spacing={1}>
          <Capsule>
            <Typography fontWeight={700}>
              {`Points: ${quiz.current?.points || 0}`}
            </Typography>
          </Capsule>
          {quiz.ongoingItems.length > 1 && (
            <CircleButton onClick={() => !quiz.answerStatus && quiz.next()}>
              <ArrowForwardIos />
            </CircleButton>
          )}
        </Stack>
      </Stack>

      {/* Answers  Panel */}
      <Paper elevation={3} sx={{ backgroundColor: brown[500], p: 3 }}>
        <Grid container spacing={2}>
          {quiz.current?.choices.map((item, index) => (
            <Grid item sm={6} xs={12} key={item?.id}>
              <Button
                fullWidth
                variant='contained'
                color='success'
                onClick={() => !quiz.answerStatus && handleAnswer(item, index)}
                disabled={item?.selected}
              >
                {item?.answer}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </>
  )
}

export default QuizBoard
