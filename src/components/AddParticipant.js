import { AccountCircle } from '@mui/icons-material'
import { Box } from '@mui/material'
import { useState } from 'react'
import CenterTextField from './CenterTextField'

const AddParticipant = ({ label, onSubmit = () => null }) => {
  const [value, setValue] = useState('')

  const handleSubmit = (event) => {
    event?.preventDefault()
    if (value) {
      onSubmit(value)
      setValue('')
    }
  }

  return (
    <Box sx={{ '& > :not(style)': { mx: 2, my: 3 } }}>
      <Box
        component='form'
        noValidate
        autoComplete='off'
        sx={{ display: 'flex', alignItems: 'flex-end' }}
        onSubmit={(e) => handleSubmit(e)}
      >
        <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <CenterTextField
          id='input-with-sx'
          label={label}
          variant='standard'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </Box>
    </Box>
  )
}

export default AddParticipant
