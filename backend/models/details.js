const mongoose = require('mongoose')

const { ObjectId } = mongoose.Types
const DetailSchema = new mongoose.Schema({
  jobId: ObjectId,
  raw: String,
  summary: String,
  tags: [String],
})

module.exports = mongoose.model('details', DetailSchema)
