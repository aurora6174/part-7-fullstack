import React from "react"
import { Link } from "react-router-dom"
const AllBlogs = ({ data }) => {
  return data.map((blog) => (
    <div id="related_links" key={blog.id}>
      <li key={blog.id} style={{ listStyleType: `none` }}>
        <Link to={`/${blog.id}`}>{blog.title}</Link>
      </li>
    </div>
  ))
}

export default AllBlogs
