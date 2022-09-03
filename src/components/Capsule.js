import { amber } from '@mui/material/colors'
import styled from 'styled-components'

const Capsule = styled('section')(({ size = '20px', color = amber[500] }) => ({
  border: 'none',
  borderRadius: `calc(${size} * 1.5)`,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: `calc(${size} / 2) ${size}`,
  backgroundColor: color,
  transform: 'scale(0.8)',
  p: {
    color: 'white',
  },
  svg: {
    fill: 'white',
  },
}))

export default Capsule
