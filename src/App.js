import React, { useState } from "react"
import { useCountry, useField } from "./hooks/index"

const Country = ({ country, input }) => {
  if (!country && input === "") {
    return <div>Please Enter a valid country</div>
  }
  if (country === null) {
    return <div>Not Found. Please enter a valid country name</div>
  }
  if (country instanceof Object) {
    return (
      <div>
        <h2>{country.name} </h2>
        <div>
          Capital: <em>{country.capital}</em>
        </div>
        <br />
        <div>
          Population: <em>{country.population}</em>
        </div>
        <br />
        <img src={country.flag} height="100" alt={`flag of ${country.name}`} />
      </div>
    )
  }
}

const App = () => {
  const nameInput = useField("text")
  const [name, setName] = useState("")
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} input={nameInput.value} />
    </div>
  )
}

export default App
