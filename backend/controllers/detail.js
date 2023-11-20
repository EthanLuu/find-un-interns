const Detail = require('../models/details')
const mongoose = require('mongoose')

const { ObjectId } = mongoose.Types

const detailController = {
  getDetailById: async (ctx) => {
    try {
      const id = ctx.params.id
      const detail = await Detail.findOne({ jobId: new ObjectId(id) })
      ctx.body = detail
    } catch (error) {
      ctx.status = 500
      ctx.body = { error: 'Internal Server Error' }
    }
  },
}

module.exports = detailController
