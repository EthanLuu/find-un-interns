require('dotenv').config();

const Koa = require('koa');
const cors = require('koa2-cors');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');

const app = new Koa();
const router = new Router();
const { ObjectId } = mongoose.Types;

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

router.get('/jobs', async (ctx) => {
    try {
        const searchKey = ctx.query.searchKey || '';
        const page = parseInt(ctx.query.page) || 1; // 当前页数，默认为第一页
        const limit = parseInt(ctx.query.limit) || 20; // 每页数据量，默认为 20
        const skip = (page - 1) * limit; // 跳过的数据量
        const query = {
            $or: [
                { title: { $regex: searchKey, $options: 'i' } },
                { country: { $regex: searchKey, $options: 'i' } },
                { city: { $regex: searchKey, $options: 'i' } },
            ]
        }
        let jobs;
        if (ctx.query.all) {
            jobs = await Job.find(query).sort({ start_date: 'desc' });
        } else {
            jobs = await Job.find(query).sort({ start_date: 'desc' }).skip(skip).limit(limit);
        }
        ctx.body = jobs;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: 'Internal Server Error' };
    }
});

router.get('/jobs/:id', async (ctx) => {
    try {
        const id = ctx.params.id;
        const job = await Job.findById(id);
        ctx.body = job;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: 'Internal Server Error' };
    }
});

router.get('/statistics', async (ctx) => {
    try {
        const availableJobs = await Job.find({ end_date: { $gte: new Date() } });
        const yesterDay = new Date();
        yesterDay.setDate(yesterDay.getDate() - 2);
        yesterDay.setHours(0, 0, 0, 0);
        const yesterJobs = await Job.find({ start_date: { $gte: yesterDay, $lt: new Date() } });
        const hotOrganization = await Job.aggregate([
            {
                $group: {
                    _id: '$orgnization',
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { count: -1 }
            },
            {
                $limit: 1
            }
        ]);

        const hotJob = await Job.aggregate([
            {
                $group: {
                    _id: '$title',
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { count: -1 }
            },
            {
                $limit: 1
            }
        ]);

        ctx.body = {
            availableJobs: availableJobs.length,
            yesterJobs: yesterJobs.length,
            hotOrganization: {
                name: hotOrganization[0]._id,
                count: hotOrganization[0].count
            },
            hotJob: {
                name: hotJob[0]._id,
                count: hotJob[0].count
            }
        };
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: 'Internal Server Error' };
    }
});

router.get('/latest', async (ctx) => {
    try {
        const jobs = await Job.find().sort({ start_date: 'desc' }).limit(6);
        ctx.body = jobs;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: 'Internal Server Error' };
    }
});


const DetailSchema = new mongoose.Schema({
    jobId: ObjectId,
    raw: String,
    summary: String,
    tags: [String]
})

const Detail = mongoose.model('details', DetailSchema);

router.get('/details/:id', async (ctx) => {
    try {
        const id = ctx.params.id;
        const detail = await Detail.findOne({ jobId: new ObjectId(id) })
        ctx.body = detail;
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
app.listen(9934, () => {
    console.log('Server started on port 9934');
});
