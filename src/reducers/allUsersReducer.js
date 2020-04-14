import usersService from "../services/users"
const allUserReducer = (state = [], action) => {
  switch (action.type) {
    case "INITIALIZE_USERS":
      return action.data
    default:
      return state
  }
}
export const initializeUsers = () => {
  return async (dispatch) => {
    const allUsers = await usersService.getAllUsers()
    dispatch({
      type: "INITIALIZE_USERS",
      data: allUsers,
    })
  }
}
export default allUserReducer
