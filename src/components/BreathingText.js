import { Typography } from '@mui/material'
import styled from 'styled-components'

const BreathingText = styled(Typography)({
  '-webkit-animation': 'breathing 5s ease-out infinite normal',
  animation: 'breathing 5s ease-out infinite normal',
  '@-webkit-keyframes breathing': {
    '0%': {
      '-webkit-transform': 'scale(0.9)',
      transform: 'scale(0.9)',
    },

    '25%': {
      '-webkit-transform': 'scale(1)',
      transform: 'scale(1)',
    },

    '60%': {
      '-webkit-transform': 'scale(0.9)',
      transform: 'scale(0.9)',
    },

    '100%': {
      '-webkit-transform': 'scale(0.9)',
      transform: 'scale(0.9)',
    },
  },

  '@keyframes breathing': {
    '0%': {
      '-webkit-transform': 'scale(0.9)',
      '-ms-transform': 'scale(0.9)',
      transform: 'scale(0.9)',
    },

    '25%': {
      '-webkit-transform': 'scale(1)',
      '-ms-transform': 'scale(1)',
      transform: 'scale(1)',
    },

    '60%': {
      '-webkit-transform': 'scale(0.9)',
      '-ms-transform': 'scale(0.9)',
      transform: 'scale(0.9)',
    },

    '100%': {
      '-webkit-transform': 'scale(0.9)',
      '-ms-transform': 'scale(0.9)',
      transform: 'scale(0.9)',
    },
  },
})

export default BreathingText
