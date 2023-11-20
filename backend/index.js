require('dotenv').config()

const Koa = require('koa')
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const mongoose = require('mongoose')
const router = require('./routes/index')

const app = new Koa()

// 连接 MongoDB 数据库
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB 连接成功')
  })
  .catch((error) => {
    console.error('MongoDB 连接失败', error)
  })

app.use(cors())

// 使用中间件解析请求体
app.use(bodyParser())

// 注册路由
app.use(router.routes())
app.use(router.allowedMethods())

// 启动服务器
app.listen(9934, () => {
  console.log('Server started on port 9934')
})
