import React, { useEffect } from "react"
import Blog from "./components/Blog"
import loginService from "./services/login"
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import ToggleTool from "./components/ToggleTool"
import {
  initializeBlogs,
  newBlog,
  updateLikes,
  removeABlog,
} from "./reducers/blogReducer"
import { loggedInUser, loggedOutUser } from "./reducers/userReducer"
import { successMessage, errorMessage } from "./reducers/notificationReducer"
import { useSelector, useDispatch } from "react-redux"

//App Component
const App = () => {
  const dispatch = useDispatch()
  const message = useSelector((state) => state.notReducer.message)
  const isSuccess = useSelector((state) => state.notReducer.isSuccess)
  const blogsInState = useSelector((state) => state.blogReducer)
  const userInState = useSelector((state) => state.userReducer)
  console.log(userInState)

  //Get all blogs
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  //Get token from response and set in localStorage
  useEffect(() => {
    dispatch(loggedInUser())
  }, [dispatch])

  //Create blog function
  const addBlog = (newBlogObject) => {
    try {
      dispatch(newBlog(newBlogObject))
      dispatch(
        successMessage(
          `A new blog "${newBlogObject.title}" by ${newBlogObject.author} added!`,
          5000
        )
      )
    } catch (error) {
      dispatch(errorMessage(`Err, something went wrong!`, 5000))
    }
  }

  //Update likes blog function
  const updateBlogLikes = (blogToUpdate) => {
    try {
      dispatch(updateLikes(blogToUpdate))
    } catch (error) {
      dispatch(errorMessage(`Err something went wrong!`, 5000))
    }
  }

  //Remove blog
  const removeBlog = (blogToRemove) => {
    try {
      if (
        window.confirm(
          `Delete ${blogToRemove.title} by ${blogToRemove.author}?`
        )
      ) {
        dispatch(removeABlog(blogToRemove))
        dispatch(successMessage(`Deletion Successful!`, 5000))
      }
    } catch (error) {
      dispatch(errorMessage(`Unauthorized user!`, 5000))
    }
  }
  //Login function
  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem("loggedInUser", JSON.stringify(user))
      dispatch(loggedInUser())
    } catch (exception) {
      dispatch(errorMessage("Invalid username and/or password!", 5000))
    }
  }

  //Login form
  const loginForm = () => {
    return (
      <ToggleTool buttonLabel="Login">
        <LoginForm handleLogin={handleLogin} />
      </ToggleTool>
    )
  }

  //Blog form
  const blogForm = () => {
    return (
      <ToggleTool buttonLabel="New Blog">
        <BlogForm createBlog={addBlog} />
      </ToggleTool>
    )
  }

  //List of blogs to view
  const blogsList = (storedBlogs) => {
    return storedBlogs
      .sort((a, b) => b.likes - a.likes)
      .map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateLikes={() => updateBlogLikes(blog)}
          deleteBlog={() => removeBlog(blog)}
          user={userInState}
        />
      ))
  }

  //Logout function
  const logout = () => {
    dispatch(loggedOutUser())
  }

  return (
    <React.Fragment>
      <Notification message={message} messageSuccess={isSuccess} />

      {userInState === null ? (
        loginForm()
      ) : userInState ? (
        <div>
          <p>{userInState.name} logged in</p>
          {blogForm()}
          <h2>Blogs</h2>
          <div id="bloglist">{blogsList(blogsInState)}</div>
          <button
            id="logout"
            onClick={() => logout()}
            style={{ cursor: `pointer` }}
          >
            Logout
          </button>
        </div>
      ) : (
        loginForm()
      )}
    </React.Fragment>
  )
}

export default App
