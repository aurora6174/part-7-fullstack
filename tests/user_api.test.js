const bcrypt = require("bcrypt")
const User = require("../models/user")
const helper = require("../utils/helper")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const mongoose = require("mongoose")

describe("when there is initially one user at db", () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash("mypassword", 10)
    const user = new User({ username: "jack10", name: "Jackie", passwordHash })
    await user.save()
  })
  test("creation succeeds with valid details", async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: "christoph",
      name: "christopher",
      password: "secret"
    }
    await api
      .post("/api/users")
      .expect(200)
      .send(newUser)
      .expect("Content-Type", /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)
    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })
  test("creation fails with invalid details", async () => {
    const usersAtStart = await helper.usersInDb()
    const invalidUser = {
      username: "invalidUser",
      name: "invalidName",
      password: "kj"
    }
    await api
      .post("/api/users")
      .send(invalidUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })
  test("creation fails if username already taken", async () => {
    const usersAtStart = await helper.usersInDb()
    const invalidUser = {
      username: "jack10",
      name: "invalidusername",
      password: "tiuety"
    }
    await api
      .post("/api/users")
      .send(invalidUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })
})
afterAll(() => mongoose.connection.close())
