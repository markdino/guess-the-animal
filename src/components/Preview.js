import { Paper } from '@mui/material'
import styled from 'styled-components'

const Wrapper = styled('section')(({ image }) => ({
  backgroundImage: `url('/images/animals/${image}')`,
  backgroundSize: 'contain',
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
  borderRadius: '4px',
  borderWidth: '32px',
  borderColor: '#fff',
  borderStyle: 'solid',
  height: '50vh',
  width: 'calc(100% - 64px)',
}))

const Preview = ({ image, ...props }) => {
  return (
    <Paper {...props}>
      <Wrapper image={image} />
    </Paper>
  )
}

export default Preview
