import React, { useState } from "react"

const CommentsForm = ({ postComment, blogToComment }) => {
  const [comment, setComment] = useState("")
  const handleComments = (event) => setComment(event.target.value)
  const addCommentToBlog = (event) => {
    event.preventDefault()
    postComment({
      blogToComment,
      comment,
    })
    setComment("")
  }
  return (
    <div>
      <h3>Comments</h3>
      <form onSubmit={addCommentToBlog}>
        Comment: <input type="text" value={comment} onChange={handleComments} />
        <button type="submit">Post Comment</button>
      </form>
    </div>
  )
}

export default CommentsForm
