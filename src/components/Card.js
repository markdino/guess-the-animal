import { Paper } from '@mui/material'
import { amber } from '@mui/material/colors'
import styled from 'styled-components'

const CustomPaper = styled(Paper)(({ selectable, color = amber[500] }) => ({
  padding: '10px 20px',
  position: 'relative',
  '.closeButton': {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    right: 0,
    opacity: 0,
    transition: 'opacity .25s ease-in-out',
    '-moz-transition': 'opacity .25s ease-in-out',
    '-webkit-transition': 'opacity .25s  ease-in-out',
  },
  '&:hover .closeButton': {
    opacity: 1,
  },
  '&.active': {
    backgroundColor: color,
  },
  ...(selectable && {
    '&:hover': { backgroundColor: color, cursor: 'pointer' },
  }),
}))

const Card = ({ active, children, selectable = false, ...props }) => (
  <CustomPaper
    className={active ? 'active' : ''}
    selectable={selectable}
    {...props}
  >
    {children}
  </CustomPaper>
)

export default Card
