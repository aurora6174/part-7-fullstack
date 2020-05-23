const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const mongoose = require("mongoose")
const Blogs = require("../models/blog")

const helper = require("../utils/helper")

beforeEach(async () => {
  await Blogs.deleteMany({})
  const blogToSave = helper.initialBlogList.map(blog => new Blogs(blog))
  const promiseArray = blogToSave.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe("when there are initially some blogs saved", () => {
  test("should return the right amount of blogposts in json format", async () => {
    const response = await api.get("/api/blogs")
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/)
    expect(helper.initialBlogList.length).toBe(response.body.length)
  })

  test("should verify the unique property of returned blogs exist", async () => {
    const response = await api.get("/api/blogs")
    for (let blog of response.body) {
      expect(blog.id).toBeDefined()
    }
  })
})
describe("creation of a new or new blogs", () => {
  test("should verify that a valid blog can be created", async () => {
    const newBlog = {
      title: "testTitle1",
      author: "testAuthor1",
      url: "testurl",
      likes: 7
    }
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/)
    const response = await api.get("/api/blogs")
    const blogsInDB = await helper.blogsInDatabase()
    const authors = blogsInDB.map(blog => blog.author)
    expect(response.body.length).toBe(helper.initialBlogList.length + 1)
    expect(authors).toContain("testAuthor1")
  })
  test("should verify that a blog without likes property default to 0", async () => {
    const blogWithoutLikes = {
      title: "testAuthor2",
      author: "testAuthor2",
      url: "testurl2"
    }
    await api
      .post("/api/blogs")
      .send(blogWithoutLikes)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const initialBlogList = await helper.initialBlogList
    const blogsInDatabase = await helper.blogsInDatabase()
    const response = await api.get("/api/blogs")
    expect(response.body.length).toBe(initialBlogList.length + 1)
    expect(blogsInDatabase[blogsInDatabase.length - 1]).toEqual({
      title: "testAuthor2",
      id: blogsInDatabase[blogsInDatabase.length - 1].id,
      author: "testAuthor2",
      url: "testurl2",
      likes: 0
    })
  })
  test("should return a 400 status code if title and url are missing", async () => {
    const blogWOutTitleUrl = {
      author: "invalidBlogAuthor",
      likes: 12
    }
    await api
      .post("/api/blogs")
      .send(blogWOutTitleUrl)
      .expect(400)
    const blogsInDatabase = await helper.blogsInDatabase()
    expect(blogsInDatabase.length).toBe(helper.initialBlogList.length)
  })
})
describe("deletion of a blog post", () => {
  test("should succesfully delete a blog post", async () => {
    const blogsInDatabase = await helper.blogsInDatabase()
    const blogTODel = blogsInDatabase[0]
    await api.delete(`/api/blogs/${blogTODel.id}`).expect(204)
    const blogsAfterDeletion = await helper.blogsInDatabase()
    expect(blogsAfterDeletion.length).toBe(helper.initialBlogList.length - 1)
    const blogTitles = blogsAfterDeletion.map(blog => blog.title)
    expect(blogTitles).not.toContain(blogTODel.title)
  })
})
describe("updating a blog post", () => {
  test("should successfully update likes in a blog post", async () => {
    const blogsInDatabase = await helper.blogsInDatabase()
    const blogToUpdate = blogsInDatabase[1]
    const changedBlog = { ...blogToUpdate, likes: 3 }
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(changedBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/)
    const blogsAtEnd = await helper.blogsInDatabase()
    expect(blogsAtEnd.length).toBe(helper.initialBlogList.length)
    expect(blogsAtEnd[1].likes).toEqual(3)
  })
})
afterAll(() => mongoose.connection.close())
