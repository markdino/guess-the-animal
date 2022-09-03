import { Stack, Typography } from '@mui/material'
import firstAward from '../assets/images/1st gold.png'
import secondAward from '../assets/images/2nd silver.png'
import thirdAward from '../assets/images/3rd bronze.png'
import { sortTopScore } from '../Utils'
import HeroTitle from './HeroTitle'

const AwardBoard = ({ players }) => {
  const topPlayers = sortTopScore(players)
  return (
    <Stack spacing={3} justifyContent='center' alignItems='center'>
      <Stack alignItems='center'>
        <Typography fontSize='2rem' fontFamily='Paytone One'>
          {topPlayers[0]?.name}
        </Typography>

        <img height={200} src={firstAward} alt='1st award' />
      </Stack>
      <Stack
        direction='row'
        justifyContent='space-around'
        sx={{ width: '100%' }}
      >
        <Stack alignItems='center'>
          <Typography fontSize='2rem' fontFamily='Paytone One'>
            {topPlayers[1]?.name}
          </Typography>

          <img height={200} src={secondAward} alt='2ns award' />
        </Stack>
        <Stack alignItems='center'>
          <Typography fontSize='2rem' fontFamily='Paytone One'>
            {topPlayers[2]?.name}
          </Typography>

          <img height={200} src={thirdAward} alt='third award' />
        </Stack>
      </Stack>
      <HeroTitle>
        <Typography fontSize='3rem' textAlign='center'>
          Congratulations!
        </Typography>
      </HeroTitle>
    </Stack>
  )
}

export default AwardBoard
