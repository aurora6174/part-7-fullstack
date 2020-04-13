import React, { useState } from "react"

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const handleAuthor = (event) => setAuthor(event.target.value)
  const handleTitle = (event) => setTitle(event.target.value)
  const handleUrl = (event) => setUrl(event.target.value)
  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url,
    })
    setTitle("")
    setAuthor("")
    setUrl("")
  }

  return (
    <div>
      <h2>Create a new Blog</h2>
      <form onSubmit={addBlog}>
        Title:{" "}
        <input id="title" type="text" value={title} onChange={handleTitle} />
        <br />
        <br />
        Author:{" "}
        <input id="author" type="text" value={author} onChange={handleAuthor} />
        <br />
        <br />
        Url: <input id="url" type="text" value={url} onChange={handleUrl} />
        <br />
        <br />
        <button id="create" type="submit">
          Create
        </button>
      </form>
    </div>
  )
}

export default BlogForm
