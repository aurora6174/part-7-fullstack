const notReducer = (state = "", action) => {
  console.log(`action:`, action)
  switch (action.type) {
    case "SUCCESS":
      return action.payload
    case "ERROR":
      return action.payload
    case "NORMALIZE":
      return action.payload
    default:
      return state
  }
}

export const successMessage = (message, timeout) => {
  return (dispatch) => {
    dispatch({
      type: "SUCCESS",
      payload: {
        message,
        isSuccess: true,
      },
    })
    setTimeout(() => {
      dispatch({
        type: "NORMALIZE",
        payload: {
          message: null,
          isSuccess: null,
        },
      })
    }, timeout)
  }
}

export const errorMessage = (message, timeout) => {
  return (dispatch) => {
    dispatch({
      type: "ERROR",
      payload: {
        message,
        isSuccess: false,
      },
    })
    setTimeout(() => {
      dispatch({
        type: "NORMALIZE",
        payload: {
          message: null,
          isSuccess: null,
        },
      })
    }, timeout)
  }
}

export default notReducer
