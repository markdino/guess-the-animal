import { Box } from '@mui/material'
import { amber, grey } from '@mui/material/colors'
import styled from 'styled-components'

const Wrapper = styled(Box)({
  overflowY: 'auto',
  /* Works on Firefox */
  scrollbarWidth: 'thin',
  scrollbarColor: `${amber[500]} ${amber[50]}`,

  /* Works on Chrome, Edge, and Safari */
  '&': {
    '::-webkit-scrollbar': {
      width: '7px',
      backgroundColor: amber[50],
    },

    '::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 5px grey',
      borderRadius: '5px',
      width: '12px',
    },

    '::-webkit-scrollbar-thumb': {
      background: grey[400],
      borderRadius: '5px',
    },

    '::-webkit-scrollbar-thumb:hover': {
      background: amber[500],
    },
  },
})

export default Wrapper
