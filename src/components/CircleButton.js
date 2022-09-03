import { amber } from '@mui/material/colors'
import styled from 'styled-components'

const CircleButton = styled('button')(
  ({ size = '50px', color = amber[500] }) => ({
    border: 'none',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: size,
    height: size,
    backgroundColor: color,
    cursor: 'pointer',
    transform: 'scale(0.8)',
    p: {
      color: 'white',
    },
    svg: {
      fill: 'white',
    },
    transition: 'transform .25s ease-in-out',
    '&:hover': {
      transform: 'scale(1)',
    },
  })
)

export default CircleButton
