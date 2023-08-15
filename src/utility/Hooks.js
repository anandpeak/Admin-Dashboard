import { useState } from 'react'

export const useForm = (callback, InitialState = {}) => {
  const [values, setValues] = useState(InitialState)
  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value })
    console.log(values)
  }
  const onSubmit = (event) => {
    event.preventDefault()
    callback()
  }

  return {
    onChange,
    onSubmit,
    values,
  }
}
