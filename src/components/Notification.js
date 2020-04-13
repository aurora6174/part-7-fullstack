import React from "react"

const Notification = ({ message, messageSuccess }) => {
  console.log(messageSuccess)
  if (!messageSuccess) {
    return null
  }
  return <div className={messageSuccess ? "success" : "error"}>{message}</div>
}

export default Notification
