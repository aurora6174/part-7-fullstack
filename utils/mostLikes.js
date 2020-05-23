const mostLikes = blogs => {
  const likes = blogs.map(blog => blog.likes)
  const maxLikes = Math.max(...likes)
  const target = blogs.filter(blog => blog.likes === maxLikes)
  return {
    author: target[0].author,
    likes: target[0].likes
  }
}
module.exports = mostLikes
