import React, { useEffect } from "react"
//import Blog from "./components/Blog"
import loginService from "./services/login"
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
//import BlogForm from "./components/BlogForm"
import ToggleTool from "./components/ToggleTool"
import Users from "./components/Users"
import { initializeBlogs } from "./reducers/blogReducer"
import { initializeUsers } from "./reducers/allUsersReducer"
import { loggedInUser, loggedOutUser } from "./reducers/userReducer"
import { successMessage, errorMessage } from "./reducers/notificationReducer"
import { useSelector, useDispatch } from "react-redux"
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  useParams,
  useHistory,
} from "react-router-dom"
//App Component
const App = () => {
  const dispatch = useDispatch()
  const message = useSelector((state) => state.notReducer.message)
  const isSuccess = useSelector((state) => state.notReducer.isSuccess)
  // const blogsInState = useSelector((state) => state.blogReducer)
  const userInState = useSelector((state) => state.userReducer)
  const allUsers = useSelector((state) => state.allUsersReducer)
  const history = useHistory()
  //Get all blogs
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])
  //Get all users
  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])
  //Get token from response and set in localStorage
  useEffect(() => {
    dispatch(loggedInUser())
  }, [dispatch])

  //Create blog function
  // const addBlog = (newBlogObject) => {
  //   try {
  //     dispatch(newBlog(newBlogObject))
  //     dispatch(
  //       successMessage(
  //         `A new blog "${newBlogObject.title}" by ${newBlogObject.author} added!`,
  //         5000
  //       )
  //     )
  //   } catch (error) {
  //     dispatch(errorMessage(`Err, something went wrong!`, 5000))
  //   }
  // }

  //Update likes blog function
  // const updateBlogLikes = (blogToUpdate) => {
  //   try {
  //     dispatch(updateLikes(blogToUpdate))
  //   } catch (error) {
  //     dispatch(errorMessage(`Err something went wrong!`, 5000))
  //   }
  // }

  //Remove blog
  // const removeBlog = (blogToRemove) => {
  //   try {
  //     if (
  //       window.confirm(
  //         `Delete ${blogToRemove.title} by ${blogToRemove.author}?`
  //       )
  //     ) {
  //       dispatch(removeABlog(blogToRemove))
  //       dispatch(successMessage(`Deletion Successful!`, 5000))
  //     }
  //   } catch (error) {
  //     dispatch(errorMessage(`Unauthorized user!`, 5000))
  //   }
  // }
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
  // const blogForm = () => {
  //   return (
  //     <ToggleTool buttonLabel="New Blog">
  //       <BlogForm createBlog={addBlog} />
  //     </ToggleTool>
  //   )
  // }

  //List of blogs to view
  // const blogsList = (storedBlogs) => {
  //   return storedBlogs
  //     .sort((a, b) => b.likes - a.likes)
  //     .map((blog) => (
  //       <Blog
  //         key={blog.id}
  //         blog={blog}
  //         updateLikes={() => updateBlogLikes(blog)}
  //         deleteBlog={() => removeBlog(blog)}
  //         user={userInState}
  //       />
  //     ))
  // }

  //Logout function
  const logout = () => {
    history.push("/")
    dispatch(loggedOutUser())
  }

  const UserBlog = ({ allUsersInState }) => {
    const id = useParams().id
    const user = allUsersInState.find((user) => user.id === id)

    if (!user) {
      return null
    }

    return (
      <div>
        <h2>{user.name}</h2>
        <h3>Added Blogs</h3>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </div>
    )
  }
  return (
    <Router>
      <Notification message={message} messageSuccess={isSuccess} />

      {userInState === null ? (
        loginForm()
      ) : userInState ? (
        <div>
          <h2>Blogs</h2>
          <p>{userInState.name} logged in</p>

          <button
            id="logout"
            onClick={() => logout()}
            style={{ cursor: `pointer` }}
          >
            Logout
          </button>
          <h2>Users</h2>
          <Switch>
            <Route path="/:id">
              <UserBlog allUsersInState={allUsers} />
            </Route>
            <Route path="/">
              <Users users={allUsers} />
            </Route>
          </Switch>
        </div>
      ) : (
        loginForm()
      )}
    </Router>
  )
}

export default App

//<div id="bloglist">{blogsList(blogsInState)}</div>
//  {blogForm()}
