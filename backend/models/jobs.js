const mongoose = require('mongoose')
const jobSchema = new mongoose.Schema({
  link: String,
  title: String,
  city: String,
  organization: String,
  start_date: Date,
  end_date: Date,
})

module.exports = mongoose.model('jobs', jobSchema)
