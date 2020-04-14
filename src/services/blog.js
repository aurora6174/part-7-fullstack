import axios from "axios"
const baseUrl = "/api/blogs"

let token = null
const setToken = (newToken) => {
  token = `bearer ${newToken}`
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
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

export default { getAll, create, setToken, update, deleteBlog }
