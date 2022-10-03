import { Box, MenuItem, Stack, Tooltip, Typography } from '@mui/material'
import { useContext } from 'react'
import styled from 'styled-components'
import AddParticipant from '../components/AddParticipant'
import Card from '../components/Card'
import HeroTitle from '../components/HeroTitle'
import ParticipantContext from '../store/ParticipantContext'
import { Cancel, PeopleAlt } from '@mui/icons-material'
import BreathingText from '../components/BreathingText'
import PlayButton from '../components/PlayButton'
import SelectField from '../components/SelectField'
import { brown } from '@mui/material/colors'

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
  const selectItem = []

  for (let i = 1; i <= 10; i++) {
    selectItem.push(i)
  }
  return (
    <Main>
      <Stack
        direction='row'
        spacing={2}
        alignItems='center'
        justifyContent='flex-end'
        sx={{ alignSelf: 'flex-end', color: brown[500] }}
      >
        <PeopleAlt />
        <Tooltip title='Required Participants' placement='bottom' arrow>
          <SelectField
            labelId='minimum-participants-label'
            id='minimum-participants'
            value={participants.minimumRequired}
            onChange={participants.setMinimuRequired}
            label='Required Participants'
          >
            {selectItem.map((item) => (
              <MenuItem key={item} value={item}>
                {item + '+'}
              </MenuItem>
            ))}
          </SelectField>
        </Tooltip>
      </Stack>
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
            <Tooltip
              title={`Required participants are ${participants.minimumRequired} or more`}
              open={!participants.isQualified}
            >
              <PlayButton
                sx={{ mb: 4 }}
                to={participants.isQualified ? '/play' : '/'}
              />
            </Tooltip>
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
