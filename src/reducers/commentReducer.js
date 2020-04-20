import blogService from "../services/blog"
const commentReducer = (state = [], action) => {
  switch (action.type) {
    case "INITIALIZE_COMMENTS":
      return action.data
    case "NEW_COMMENT":
      return state.map((blog) =>
        blog.id === action.commentedBlog.id ? action.commentedBlog : blog
      )
    case "UPDATE_LIKES":
      return state.map((blog) =>
        blog.id === action.updatedBlog.id ? action.updatedBlog : blog
      )
    default:
      return state
  }
}

export const initializeComments = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: "INITIALIZE_COMMENTS",
      data: blogs,
    })
  }
}

export const commentOnBlog = (blog, comment) => {
  return async (dispatch) => {
    const commentedBlog = await blogService.postComment(blog, comment)
    dispatch({
      type: "NEW_COMMENT",
      commentedBlog,
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

export default commentReducer
