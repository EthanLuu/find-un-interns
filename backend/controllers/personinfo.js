const Personinfo = require('../models/personinfo')

const personInfoController = {
  getPersoninfo: async (ctx) => {
    try {
      const user = ctx.request.user
      const username = user.username
      const info = await Personinfo.findOne({ username })
      if (!info) {
        ctx.response.body = { message: '暂无信息', resultCode: 'success' }
      } else {
        ctx.response.body = { message: '获取信息成功', info, resultCode: 'success' }
      }
    } catch (error) {
      console.log(error)
      ctx.status = 500
      ctx.response.body = { message: 'Internal Server Error' }
    }
  },
  updatePersoninfo: async (ctx) => {
    try {
      const user = ctx.request.user
      const username = user.username
      const info = await Personinfo.findOne({ username })
      if (!info) {
        const newPersoninfo = new Personinfo({
          username,
          content: ctx.request.body.content,
        })
        newPersoninfo.save()
      } else {
        info.content = ctx.request.body.content
        info.save()
      }

      ctx.response.body = { message: '更新用户信息成功', resultCode: 'success' }
      return ctx.response.body
    } catch (error) {
      ctx.status = 500
      ctx.response.body = { message: 'Internal Server Error' }
    }
  },
}

module.exports = personInfoController
