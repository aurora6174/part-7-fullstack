import React, { useState } from "react"
import {
  LoginButton,
  Input,
  Title,
  FormComponent,
} from "../component-styles/index"
const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const handleUsername = ({ target }) => setUsername(target.value)
  const handlePassword = ({ target }) => setPassword(target.value)

  const login = (event) => {
    event.preventDefault()
    handleLogin({
      username,
      password,
    })
    setUsername("")
    setPassword("")
  }
  return (
    <FormComponent>
      <Title>Log in to application</Title>
      <form onSubmit={login}>
        <div>
          Username:
          <br />
          <Input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={handleUsername}
          />
        </div>
        <br />
        <div>
          Password:
          <br />
          <Input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={handlePassword}
          />
        </div>
        <br />
        <LoginButton type="submit" style={{ cursor: `pointer` }}>
          Login
        </LoginButton>
      </form>
    </FormComponent>
  )
}

export default LoginForm
