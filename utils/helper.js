const blogModel = require("../models/blog")
const userModel = require("../models/user")
const initialBlogList = require("../blogList")
const blogsInDatabase = async () => {
  const blogs = await blogModel.find({})
  return blogs.map(blog => blog.toJSON())
}
const usersInDb = async () => {
  const users = await userModel.find({})
  return users.map(user => user.toJSON())
}
module.exports = {
  blogsInDatabase,
  initialBlogList,
  usersInDb
}
