import React, { useState } from "react"
import jwt from "jsonwebtoken"
//import PropTypes from "prop-types"
const Blog = ({ blog, updateLikes, deleteBlog, user }) => {
  const [visible, setVisible] = useState(false)
  const showComponent = { display: visible ? "" : "none" }
  const token = user.token
  const decoded = jwt.verify(token, "secretword")
  console.log(decoded)
  const toggleVisiblity = () => setVisible(!visible)
  return (
    <React.Fragment>
      <div id="blogsarray" className="blogStyle">
        <div id="blog">
          {`${blog.title} by ${blog.author}`}
          <br />
          <button
            id="revealbutton"
            onClick={() => toggleVisiblity()}
            style={{ cursor: `pointer` }}
          >
            {visible ? "Hide" : "View"}
          </button>
        </div>
        <div id="hidden" style={showComponent}>
          <div>{blog.url}</div>
          <div>
            Likes: {blog.likes}{" "}
            <button
              id="like"
              style={{ cursor: `pointer` }}
              onClick={() => updateLikes(blog.id)}
            >
              Like
            </button>
          </div>
          <div>{blog.author}</div>
          <div>
            {blog.user === decoded.id && (
              <div>
                <button
                  id="remove"
                  onClick={() => deleteBlog(blog.id)}
                  style={{ cursor: `pointer` }}
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
export default Blog
