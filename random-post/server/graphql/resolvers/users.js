const User = require('../../models/User.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
  Mutation: {
    register: async (
      _,
      { registerInput: { username, email, password, confirmPassword } },
      context,
      info
    ) => {
      //TODO: Validate user data
      //TODO: Make sure user doesnt already exists
      //TODO: hash password and create an auth token
      password = await bcrypt.hash(password, 12)
      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString()
      })

      const res = await newUser.save()

      const token = jwt.sign(
        {
          id: res._id,
          email: res.email,
          username: res.username
        },
        'abc1234',
        { expiresIn: '1h' }
      )

      return {
        ...res._doc,
        id: res._id,
        token
      }
    }
  }
}
