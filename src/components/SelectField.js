import { FormControl, InputLabel, Select } from '@mui/material'

const SelectField = ({ children, className, variant, ...props }) => {
  return (
    <FormControl variant={variant} className={className}>
      <InputLabel id={props.labelId}>{props.label}</InputLabel>
      <Select {...props}>{children}</Select>
    </FormControl>
  )
}

export default SelectField
