const bcrypt = require("bcrypt")
const userRouter = require("express").Router()
const User = require("../models/user")

userRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    author: 1,
    title: 1,
    url: 1
  })
  response.json(users.map(user => user.toJSON()))
})
userRouter.post("/", async (request, response) => {
  const body = request.body
  const saltRounds = 10
  if (!body.username || !body.password) {
    return response
      .status(400)
      .json({ error: "username and/or password must be provided!" })
  }
  if (body.password.length < 3) {
    return response
      .status(400)
      .json({ error: "password length must be at least 3 letters" })
  }
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const newUser = new User({
    name: body.name,
    username: body.username,
    passwordHash
  })

  const savedUser = await newUser.save()
  response.json(savedUser.toJSON())
})
module.exports = userRouter
