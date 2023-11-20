const Job = require('../models/jobs')

const jobController = {
  getJobs: async (ctx) => {
    try {
      const searchKey = ctx.query.searchKey || ''
      const page = parseInt(ctx.query.page) || 1 // 当前页数，默认为第一页
      const limit = parseInt(ctx.query.limit) || 20 // 每页数据量，默认为 20
      const skip = (page - 1) * limit // 跳过的数据量
      const query = {
        $or: [
          { title: { $regex: searchKey, $options: 'i' } },
          { country: { $regex: searchKey, $options: 'i' } },
          { city: { $regex: searchKey, $options: 'i' } },
        ],
      }
      let jobs
      if (ctx.query.all) {
        jobs = await Job.find(query).sort({ start_date: 'desc' })
      } else {
        jobs = await Job.find(query).sort({ start_date: 'desc' }).skip(skip).limit(limit)
      }
      ctx.body = jobs
    } catch (error) {
      ctx.status = 500
      ctx.body = { error: 'Internal Server Error' }
    }
  },
  getJobById: async (ctx) => {
    try {
      const id = ctx.params.id
      const job = await Job.findById(id)
      ctx.body = job
    } catch (error) {
      ctx.status = 500
      ctx.body = { error: 'Internal Server Error' }
    }
  },
  getStatistics: async (ctx) => {
    try {
      const availableJobs = await Job.find({ end_date: { $gte: new Date() } })
      const yesterDay = new Date()
      yesterDay.setDate(yesterDay.getDate() - 2)
      yesterDay.setHours(0, 0, 0, 0)
      const yesterJobs = await Job.find({ start_date: { $gte: yesterDay, $lt: new Date() } })
      const hotOrganization = await Job.aggregate([
        {
          $group: {
            _id: '$orgnization',
            count: { $sum: 1 },
          },
        },
        {
          $sort: { count: -1 },
        },
        {
          $limit: 1,
        },
      ])

      const hotJob = await Job.aggregate([
        {
          $group: {
            _id: '$title',
            count: { $sum: 1 },
          },
        },
        {
          $sort: { count: -1 },
        },
        {
          $limit: 1,
        },
      ])

      ctx.body = {
        availableJobs: availableJobs.length,
        yesterJobs: yesterJobs.length,
        hotOrganization: {
          name: hotOrganization[0]._id,
          count: hotOrganization[0].count,
        },
        hotJob: {
          name: hotJob[0]._id,
          count: hotJob[0].count,
        },
      }
    } catch (error) {
      ctx.status = 500
      ctx.body = { error: 'Internal Server Error' }
    }
  },
  getLatestJobs: async (ctx) => {
    try {
      const jobs = await Job.find().sort({ start_date: 'desc' }).limit(6)
      ctx.body = jobs
    } catch (error) {
      ctx.status = 500
      ctx.body = { error: 'Internal Server Error' }
    }
  },
}

module.exports = jobController
