import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { Value } from 'react-phone-number-input'

const PhoneNumberInput = ({
    value,
    setValue
}:{
    value: string,
    setValue: (value:string) => void
}) => {
  const handleChange = (value?: Value) => {
    setValue(value ? value.toString() : '')
  }

  return (
    <>
    <PhoneInput
  international
  defaultCountry="NG"
  value={value}
  onChange={handleChange}
  withCountryCallingCode

/>
  
  
    </>
  )
}

export default PhoneNumberInput