const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/user")
const loginRouter = require("express").Router()

loginRouter.post("/", async (request, response, next) => {
  const body = request.body
  const user = await User.findOne({ username: body.username })
  console.log(user)
  const passwordCorrect =
    user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash)
  if (!(user && passwordCorrect)) {
    return response
      .status(401)
      .json({ error: "invalid username and/or password" })
  }
  const userToken = {
    username: user.username,
    id: user._id
  }
  const token = jwt.sign(userToken, process.env.SECRET)
  response.status(200).send({ token, username: user.username, name: user.name })
})
module.exports = loginRouter
