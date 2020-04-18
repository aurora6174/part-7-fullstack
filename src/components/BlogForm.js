import React, { useState } from "react"
import { Input, CreateButton, FormComponent } from "../component-styles/index"
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
    <FormComponent>
      <h2>Create a new Blog</h2>
      <form onSubmit={addBlog}>
        Title:{" "}
        <Input id="title" type="text" value={title} onChange={handleTitle} />
        <br />
        <br />
        Author:{" "}
        <Input id="author" type="text" value={author} onChange={handleAuthor} />
        <br />
        <br />
        Url: <Input id="url" type="text" value={url} onChange={handleUrl} />
        <br />
        <br />
        <CreateButton id="create" type="submit">
          Create
        </CreateButton>
      </form>
    </FormComponent>
  )
}

export default BlogForm
