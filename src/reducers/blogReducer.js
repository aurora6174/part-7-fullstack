import blogService from "../services/blog"

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "INITIALIZE_BLOGS":
      return action.data
    case "NEW_BLOG":
      return [...state, action.data]
    case "UPDATE_LIKES":
      return state.map((blog) =>
        blog.id === action.updatedBlog.id ? action.updatedBlog : blog
      )
    case "REMOVE_BLOG":
      return action.data
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: "INITIALIZE_BLOGS",
      data: blogs,
    })
  }
}
export const newBlog = (newBlogToAdd) => {
  return async (dispatch) => {
    const addedBlog = await blogService.create(newBlogToAdd)
    dispatch({
      type: "NEW_BLOG",
      data: addedBlog,
    })
  }
}
export const updateLikes = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(blog)
    dispatch({
      type: "UPDATE_LIKES",
      updatedBlog,
    })
  }
}
export const removeABlog = (blog) => {
  return async (dispatch) => {
    await blogService.deleteBlog(blog)
    const remaningBlogs = await blogService.getAll()
    dispatch({
      type: "REMOVE_BLOG",
      data: remaningBlogs,
    })
  }
}
export default blogReducer