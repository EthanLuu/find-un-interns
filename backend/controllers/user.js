const User = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userController = {
  // 用户注册
  register: async (ctx) => {
    try {
      const { username, password, email } = ctx.request.body

      // 检查用户名是否已存在
      const existingUser = await User.findOne({ username })
      if (existingUser) {
        return (ctx.body = { message: '用户名已存在' })
      }

      // 使用 User 模型创建新用户
      const newUser = new User({
        username,
        password, // 此时密码是明文
        email,
      })

      // 保存新用户到数据库
      await newUser.save()
      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_TOKEN_KEY, { expiresIn: '72h' })

      ctx.body = { message: '用户注册成功', resultCode: 'success', token }
    } catch (error) {
      ctx.status = 500
      ctx.body = { message: 'Internal Server Error' }
    }
  },

  // 用户登录
  login: async (ctx) => {
    try {
      const { username, password } = ctx.request.body

      // 查找用户
      const user = await User.findOne({ username })
      if (!user) {
        return (ctx.body = { message: '用户不存在' })
      }

      // 验证密码
      const passwordMatch = await bcrypt.compare(password, user.password)
      if (!passwordMatch) {
        return (ctx.body = { message: '密码错误' })
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_TOKEN_KEY, { expiresIn: '72h' })

      ctx.body = { message: '登录成功', resultCode: 'success', token }
    } catch (error) {
      ctx.status = 500
      ctx.body = { message: 'Internal Server Error' }
    }
  },

  // 获取用户信息
  getUserInfo: async (ctx) => {
    try {
      const token = ctx.request.header.authorization
      if (!token) {
        ctx.body = { message: '未提供身份验证令牌' }
        return
      }
      // 验证 token
      await jwt.verify(token, process.env.JWT_TOKEN_KEY, async (err, decoded) => {
        if (err) {
          ctx.status = 403
          ctx.body = { message: '身份验证失败' }
          return
        }

        try {
          const user = await User.findById(decoded.userId).select('-password')

          if (!user) {
            ctx.status = 404
            ctx.body = { message: '用户不存在' }
            return
          }

          // 返回用户信息
          ctx.body = { message: '获取用户信息成功', user }
        } catch (error) {
          ctx.status = 500
          ctx.body = { message: 'Internal Server Error' }
        }
      })
    } catch (error) {
      ctx.status = 500
      ctx.body = { message: 'Internal Server Error' }
    }
  },
}

module.exports = userController
