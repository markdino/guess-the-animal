import { TextField } from '@mui/material'
import styled from 'styled-components'

const CenterTextField = styled(TextField)({
  '& input': {
    textAlign: 'center',
  },
  '& label': {
    right: 0,
  },
  '& label.Mui-focused': {
    color: '#702400',
  },
  '& label.Mui-focused, & label.MuiFormLabel-filled': {
    right: 0,
    left: '25%',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#702400',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      textAlign: 'center',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#702400',
    },
  },
})

export default CenterTextField
