const totalLikes = blogs => {
  const reducer = (acc, currVal) => acc + currVal
  return blogs.map(blog => blog.likes).reduce(reducer)
}

module.exports = totalLikes
