require('dotenv').config();

const Koa = require('koa');
const cors = require('koa2-cors');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');

const app = new Koa();
const router = new Router();

// 连接 MongoDB 数据库
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('MongoDB 连接成功');
    })
    .catch((error) => {
        console.error('MongoDB 连接失败', error);
    });

const jobSchema = new mongoose.Schema({
    link: String,
    title: String,
    city: String,
    organization: String,
    start_date: Date,
    end_date: Date
});

const Job = mongoose.model('jobs', jobSchema);

// 定义路由
router.get('/jobs', async (ctx) => {
    try {
        const searchKey = ctx.query.searchKey || '';
        const jobs = await Job.find({
            $or: [
                { title: { $regex: searchKey, $options: 'i' } },
                { city: { $regex: searchKey, $options: 'i' } },
            ]
        })
        ctx.body = jobs;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: 'Internal Server Error' };
    }
});

app.use(cors());

// 使用中间件解析请求体
app.use(bodyParser());

// 注册路由
app.use(router.routes());
app.use(router.allowedMethods());

// 启动服务器
app.listen(3003, () => {
    console.log('Server started on port 3003');
});
