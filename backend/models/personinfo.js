const mongoose = require('mongoose')
const personinfoSchema = new mongoose.Schema({
  username: String,
  content: String,
})

module.exports = mongoose.model('personinfo', personinfoSchema)
