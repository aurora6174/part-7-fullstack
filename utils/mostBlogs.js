const mostBlogs = blogs => {
  let count = 0
  let ans
  let details = {}
  const list = blogs.map(blog => blog.author)

  list.forEach(author => (details[author] = (details[author] || 0) + 1))
  const res = Object.entries(details)

  for (let item of res) {
    if (item[1] > count) {
      ans = item
    }
  }
  return {
    author: ans[0],
    blogs: ans[1]
  }
}
module.exports = mostBlogs
