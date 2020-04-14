//import loginService from "../services/login"
import blogService from "../services/blog"
const userReducer = (state = [], action) => {
  switch (action.type) {
    case "LOGIN":
      return action.data
    case "LOGOUT":
      return action.data
    default:
      return state
  }
}

export const loggedInUser = () => {
  return (dispatch) => {
    const loggedInUser = window.localStorage.getItem("loggedInUser")
    let user
    if (loggedInUser) {
      user = JSON.parse(loggedInUser)
      blogService.setToken(user.token)
    } else {
      user = null
    }
    dispatch({
      type: "LOGIN",
      data: user,
    })
  }
}
export const loggedOutUser = () => {
  return (dispatch) => {
    window.localStorage.clear()
    dispatch({
      type: "LOGOUT",
      data: null,
    })
  }
}

export default userReducer
