import {
  Cancel,
  CheckCircle,
  PhotoLibrary,
  Shuffle,
  Sort,
} from '@mui/icons-material'
import {
  Badge,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { brown } from '@mui/material/colors'
import { useContext } from 'react'
import styled from 'styled-components'
import AwardBoard from '../components/AwardBoard'
import Card from '../components/Card'
import HeroTitle from '../components/HeroTitle'
import QuizBoard from '../components/QuizBoard'
import Wrapper from '../components/Wrapper'
import ParticipantContext from '../store/ParticipantContext'
import { shuffleArray, sortTopScore } from '../Utils'
import confetti from '../assets/images/confetti.gif'
import QuizContext from '../store/QuizContext'

const Main = styled('section')(({ bg }) => ({
  backgroundImage: `url('${bg}')`,
  padding: '10px',
  height: 'calc(100% - 20px)',
  maxHeight: 'calc(100% - 20px)',
  overflowY: 'auto',
}))

function Play() {
  const participants = useContext(ParticipantContext)
  const quiz = useContext(QuizContext)

  return (
    <Main bg={quiz.isEnd && confetti}>
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
                <Typography>{quiz.answeredItems?.length || 0}</Typography>
                <Divider orientation='vertical' flexItem />
                <Cancel />
                <Typography>{quiz.failedItems?.length || 0}</Typography>
                <Divider orientation='vertical' flexItem />
                <PhotoLibrary />
                <Typography>{`${quiz.ongoingItems?.length}/${quiz.allItems?.length}`}</Typography>
              </Stack>
            </Stack>
          </Grid>

          {/* Participants Panel */}
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
                    participants.update(
                      quiz.ongoingItems?.length < 1
                        ? sortTopScore(participants.all)
                        : shuffleArray(participants.all)
                    )
                  }
                >
                  {quiz.ongoingItems?.length < 1 ? <Sort /> : <Shuffle />}
                </Paper>
              </Stack>
              <Wrapper
                sx={{ maxHeight: 'calc(100vh - 170px)', pr: 2, pt: 1.5 }}
              >
                <Stack spacing={1}>
                  {participants.all.map(({ id, name, score }) => (
                    <Badge key={id} color='success' badgeContent={score}>
                      <Card
                        variant='outlined'
                        sx={{ width: '100%' }}
                        selectable
                        active={participants.player?.id === id}
                        onClick={() => participants.selectPlayer(id)}
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

          {/* Main panel */}
          <Grid item sm={8.5} xs={12}>
            {quiz.isEnd ? (
              <AwardBoard players={participants.all} />
            ) : (
              <QuizBoard />
            )}
          </Grid>
        </Grid>
      </Container>
    </Main>
  )
}

export default Play
