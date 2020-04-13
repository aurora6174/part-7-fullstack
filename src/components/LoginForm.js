import React, { useState } from "react"

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
    <React.Fragment>
      <h2>Log in to application</h2>
      <form onSubmit={login}>
        <div>
          Username:
          <br />
          <input
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
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={handlePassword}
          />
        </div>
        <br />
        <button id="login-button" type="submit" style={{ cursor: `pointer` }}>
          Login
        </button>
      </form>
    </React.Fragment>
  )
}

export default LoginForm
