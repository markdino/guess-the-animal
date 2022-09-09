import { Box, Stack, Typography } from '@mui/material'
import { useContext } from 'react'
import styled from 'styled-components'
import AddParticipant from '../components/AddParticipant'
import Card from '../components/Card'
import HeroTitle from '../components/HeroTitle'
import ParticipantContext from '../store/ParticipantContext'
import { Cancel } from '@mui/icons-material'
import BreathingText from '../components/BreathingText'
import PlayButton from '../components/PlayButton'

const Main = styled('section')({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  textAlign: 'center',
  padding: '30px 10px 10px',
  height: 'calc(100% - 40px)',
  maxHeight: 'calc(100% - 40px)',
  overflowY: 'auto',
})

function Home() {
  const participants = useContext(ParticipantContext)

  return (
    <Main>
      <HeroTitle>
        <Typography fontSize='7rem'>Guess</Typography>
        <Typography fontSize='2.5rem'>The</Typography>
        <Typography fontSize='4rem'>Animal</Typography>
      </HeroTitle>
      <AddParticipant
        label='Name of Participant'
        onSubmit={(name) => participants.add(name)}
      />
      <Box sx={{ height: '100%' }}>
        {participants.all?.length > 0 ? (
          <>
            <PlayButton sx={{ mb: 4 }} to='/play' />
            <Stack
              justifyContent='center'
              sx={{ height: 'calc(100% - 110px)' }}
            >
              <Stack
                direction='row'
                justifyContent='center'
                sx={{
                  flexWrap: 'wrap',
                  maxWidth: '800px',
                }}
              >
                {participants.all.map(({ id, name }) => (
                  <Card key={id} elevation={2} sx={{ mx: 2, mb: 2 }}>
                    <Cancel
                      fontSize='small'
                      color='error'
                      className='closeButton'
                      onClick={() => participants.remove(id)}
                    />
                    <Typography>{name}</Typography>
                  </Card>
                ))}
              </Stack>
            </Stack>
          </>
        ) : (
          <Stack justifyContent='center' sx={{ height: '100%' }}>
            <BreathingText
              fontFamily='Paytone One'
              color='white'
              fontSize='1.2rem'
            >
              Add Participant to play!!!
            </BreathingText>
          </Stack>
        )}
      </Box>
    </Main>
  )
}

export default Home
