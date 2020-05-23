const list_helper = require("../utils/list_helper")
const blogs = require("../blogList")
const totalLikes = require("../utils/totalLikes")
const blogWithMostLikes = require("../utils/blogWithMostLikes")
const mostBlogs = require("../utils/mostBlogs")
const mostLikes = require("../utils/mostLikes")
test("should return one", () => {
  const blogs = []
  const result = list_helper.dummy(blogs)
  expect(result).toBe(1)
})

describe("the following tests", () => {
  test("should return total number of likes", () => {
    expect(totalLikes(blogs)).toBe(36)
  })
  test("should return blog with highest number of likes", () => {
    expect(blogWithMostLikes(blogs)).toEqual({
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    })
  })
  test("should return author with most blogs", () => {
    expect(mostBlogs(blogs)).toEqual({ author: "Robert C. Martin", blogs: 3 })
  })
  test("should return author with most likes", () => {
    expect(mostLikes(blogs)).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 12
    })
  })
})
