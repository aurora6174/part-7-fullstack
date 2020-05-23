const bcrypt = require("bcrypt")
const User = require("../models/user")
const helper = require("../utils/helper")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
let token
describe("when theres initially one user at database", () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash("passwithtoken", 10)
    const user = new User({ username: "paul", name: "poloski", passwordHash })
    await user.save()
  })
  test("should return a token if valid credentials", async () => {
    const user = {
      username: "paul",
      password: "passwithtoken"
    }
    await api
      .post("/api/login")
      .send(user)
      .expect(200)
      .end((err, response) => {
        token = response.body.token
      })
    const decodedToken = jwt.verify(token, process.env.SECRET)
    expect(decodedToken.username).toBe(user.username)
  })
})
afterAll(() => mongoose.connection.close())
