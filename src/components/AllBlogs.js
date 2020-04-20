import React from "react"
import { Link } from "react-router-dom"
const AllBlogs = ({ data }) => {
  return (
    <div>
      <h2>Blogs</h2>
      {data.map((blog) => (
        <div id="related_links" key={blog.id}>
          <li key={blog.id} style={{ listStyleType: `none` }}>
            <Link style={{ textDecoration: `none` }} to={`/blogs/${blog.id}`}>
              {blog.title}
            </Link>
          </li>
        </div>
      ))}
    </div>
  )
}

export default AllBlogs
