const jwt = require('jsonwebtoken')
const User = require('../models/users')

async function authenticateToken(ctx, next) {
  const { request: req, response: res } = ctx
  const token = req.header['authorization'] // 从请求头中获取 token
  if (!token) {
    return res.status(401).json({ message: '未提供身份验证令牌' })
  }

  jwt.verify(token, process.env.JWT_TOKEN_KEY, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: '身份验证失败' })
    }

    // 在这里你可以根据需要检查用户信息，比如检查用户是否存在于数据库中
    try {
      const user = await User.findById(decoded.userId)
      if (!user) {
        return res.status(404).json({ message: '用户不存在' })
      }

      // 将解码后的用户信息放入请求对象，以便后续中间件或路由使用
      req.user = user
      console.log(user)
      await next()
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  })
}

module.exports = authenticateToken
