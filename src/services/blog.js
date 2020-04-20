import axios from "axios"
const baseUrl = "/api/blogs"
//const commentsUrl = "/api/blogs/:id/comments"
let token = null
const setToken = (newToken) => {
  token = `bearer ${newToken}`
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const postComment = async (targetBlog, comment) => {
  console.log(targetBlog)
  const commentedBlog = {
    ...targetBlog,
    comments: targetBlog.blogToComment.comments.concat(comment),
  }
  const commentsUrl = `${baseUrl}/${targetBlog.blogToComment.id}/comments`
  const response = await axios.post(commentsUrl, commentedBlog)
  console.log(response.data)
  return response.data
}
const create = async (newBlog) => {
  const config = { headers: { Authorization: token } }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}
const update = async (blog) => {
  const blogToUpdate = { ...blog, likes: blog.likes + 1 }
  const blogUrl = `${baseUrl}/${blog.id}`
  const response = await axios.put(blogUrl, blogToUpdate)
  return response.data
}
const deleteBlog = async (blog) => {
  const config = { headers: { Authorization: token } }
  const response = await axios.delete(`${baseUrl}/${blog.id}`, config)
  return response.data
}

export default { getAll, postComment, create, setToken, update, deleteBlog }
