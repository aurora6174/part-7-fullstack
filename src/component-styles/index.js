import styled from "styled-components"
//import { Link } from "react-router-dom"
const Button = styled.button`
  background: blue;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid blue;
  border-radius: 3px;
`

export const Input = styled.input`
  margin: 0.25em;
  padding: 0.5em;
`
export const Title = styled.h2`
  color: green;
  font-size: 1em;
`
export const LogoutButton = styled(Button)`
  color: grey;
  border-color: grey;
  background: grey;
  cursor: pointer;
`
export const CreateButton = styled(Button)`
  color: white;
  border-color: green;
  border-radius: 3px;
  background: green;
`

export const CancelButton = styled(Button)`
  color: white;
  border-color: grey;
  background: grey;
`
export const LoginButton = styled(Button)`
  color: white;
  border-color: green;
  border-radius: 3px;
  background: green;
  padding: 0.25em 1em;
`
export const Page = styled.div`
  background: #333333;
  padding: 1em;
`
export const Navigation = styled.div`
  background: #777777;
  margin: 1em;
  padding: 1em;
`

export const FormComponent = styled.section`
padding: 1em;
border: 2px solid green
border-radius: 4px
`
export default Button
