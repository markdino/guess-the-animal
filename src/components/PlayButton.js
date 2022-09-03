import { PlayArrow } from '@mui/icons-material'
import { Button, Stack, Typography } from '@mui/material'
import { amber } from '@mui/material/colors'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const CustomButton = styled(Button)(({ customcolor }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  borderColor: customcolor,
  borderRadius: '16px',
  borderWidth: '5px',
  transition: 'all .25s ease-in-out',
  p: {
    color: customcolor,
    textDecoration: 'none',
  },
  svg: {
    fill: customcolor,
  },
  '&:hover': {
    backgroundColor: customcolor,
    borderColor: customcolor,
    borderWidth: '5px',
    transform: 'scale(1.2)',
    p: {
      color: 'white',
    },
    svg: {
      fill: 'white',
    },
  },
}))

const CustomLink = styled(Link)({
  textDecoration: 'none',
})

const PlayButton = ({ customcolor = amber[500], text, to = '/', ...props }) => {
  return (
    <CustomLink to={to}>
      <CustomButton
        variant='outlined'
        size='large'
        customcolor={customcolor}
        {...props}
      >
        <Stack>
          <PlayArrow fontSize='large' />
          <Typography fontFamily='Paytone One' color={customcolor}>
            {text || 'Play'}
          </Typography>
        </Stack>
      </CustomButton>
    </CustomLink>
  )
}

export default PlayButton
