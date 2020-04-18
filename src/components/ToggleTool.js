import React, { useState } from "react"
import Button, { CancelButton } from "../component-styles/index"
const ToggleTool = (props) => {
  const [visible, setVisible] = useState(false)
  const hideComponent = { display: visible ? "none" : "" }
  const showComponent = { display: visible ? "" : "none" }

  const toggleVisiblity = () => {
    setVisible(!visible)
  }
  return (
    <div>
      <div style={hideComponent}>
        <Button onClick={toggleVisiblity} style={{ cursor: `pointer` }}>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showComponent}>
        {props.children}
        <br />
        <CancelButton onClick={toggleVisiblity}>Cancel</CancelButton>
      </div>
    </div>
  )
}
export default ToggleTool
