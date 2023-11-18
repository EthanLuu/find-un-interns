const mongoose = require('mongoose')

const DetailSchema = new mongoose.Schema({
  jobId: ObjectId,
  raw: String,
  summary: String,
  tags: [String],
})

export const Detail = mongoose.model('details', DetailSchema)
