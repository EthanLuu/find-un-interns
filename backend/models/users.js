const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  avatar: String,
})

// 在保存用户之前，对密码进行哈希和加盐
userSchema.pre('save', async function (next) {
  // 只有在密码被修改时才进行哈希，避免多次哈希相同的密码
  if (!this.isModified('password')) return next()

  try {
    // 生成盐，加盐哈希密码
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, salt)

    // 用哈希后的密码替换原始密码
    this.password = hashedPassword
    next()
  } catch (error) {
    return next(error)
  }
})

module.exports = mongoose.model('users', userSchema)
