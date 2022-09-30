import { Alert, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

const Progressbar = styled('div')(({ color, progress }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: '4px',
  width: progress + '%',
  backgroundColor: color,
}))

const CustomAlert = ({
  children,
  autoClose,
  closeInterval = 5,
  sx,
  ...props
}) => {
  const [progress, setProgress] = useState(0)
  const theme = useTheme()
  const color =
    props.severity === 'success'
      ? theme.palette.success.dark
      : theme.palette.warning.dark

  useEffect(() => {
    const sec = 1000
    const tick = (sec * closeInterval) / 100

    if (autoClose && progress < 100) {
      const timerId = setTimeout(() => {
        setProgress(progress + 1)
      }, tick)

      return () => clearInterval(timerId)
    }

    if (progress === 100) {
      props.onClose()
    }
  }, [progress, closeInterval, autoClose])

  return (
    <Alert sx={{ position: 'relative', overflow: 'hidden', ...sx }} {...props}>
      {children}
      <Progressbar color={color} progress={progress} />
    </Alert>
  )
}

export default CustomAlert
