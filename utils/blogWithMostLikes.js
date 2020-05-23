const blogWithMostLikes = blogs => {
  let likes = 0
  for (let blog of blogs) {
    if (blog.likes > likes) {
      likes = blog.likes
    }
  }
  return blogs.filter(blog => blog.likes === likes)[0]
}
module.exports = blogWithMostLikes
