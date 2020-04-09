import axios from "axios"
import { useState, useEffect } from "react"
export const useField = (type) => {
  const [value, setValue] = useState("")

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}

export const useCountry = (name) => {
  const url = `https://restcountries.eu/rest/v2/name/${name}?fullText=true`
  const [country, setCountry] = useState(name)
  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setCountry(response.data[0])
      })
      .catch((error) => {
        setCountry(null)
        console.log(error)
      })
  }, [url])

  return country
}

// useEffect(() => {
//   try {
//     async function fetchData() {
//       const response = await axios.get(url)
//       setCountry(response.data[0])
//     }
//     fetchData()
//   } catch (error) {
//     setCountry(null)
//     console.log(error)
//   }
// }, [url])
