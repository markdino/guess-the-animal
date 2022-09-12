import { Stack, Typography } from '@mui/material'
import firstAward from '../assets/images/1st gold.png'
import secondAward from '../assets/images/2nd silver.png'
import thirdAward from '../assets/images/3rd bronze.png'
import { sortTopScore } from '../Utils'
import HeroTitle from './HeroTitle'

const AwardBoard = ({ players }) => {
  const [first, second, third] = sortTopScore(players)
  return (
    <Stack spacing={3} justifyContent='center' alignItems='center'>
      <Stack alignItems='center'>
        {first?.score && (
          <>
            <Typography fontSize='2rem' fontFamily='Paytone One'>
              {first.name}
            </Typography>
            <img height={190} src={firstAward} alt='1st award' />
          </>
        )}
      </Stack>
      <Stack
        direction='row'
        justifyContent='space-around'
        sx={{ width: '100%' }}
      >
        <Stack alignItems='center'>
          {second?.score && (
            <>
              <Typography fontSize='2rem' fontFamily='Paytone One'>
                {second.name}
              </Typography>
              <img height={190} src={secondAward} alt='2ns award' />
            </>
          )}
        </Stack>
        <Stack alignItems='center'>
          {third?.score && (
            <>
              <Typography fontSize='2rem' fontFamily='Paytone One'>
                {third.name}
              </Typography>
              <img height={190} src={thirdAward} alt='third award' />
            </>
          )}
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
