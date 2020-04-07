import { useState, useRef } from "react"

export const useField = (type) => {
  const [value, setValue] = useState("")
  const onChange = (event) => setValue(event.target.value)
  const ref = useRef(null)

  return {
    type,
    value,
    onChange,
    ref,
  }
}
