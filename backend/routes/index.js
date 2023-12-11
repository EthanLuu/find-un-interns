const Router = require('koa-router')
const jobController = require('../controllers/job')
const detailController = require('../controllers/detail')
const userController = require('../controllers/user')
const gptController = require('../controllers/gpt')
const personinfoController = require('../controllers/personinfo')
const authMiddleware = require('../middlewares/auth')

const router = new Router()

router.get('/jobs', jobController.getJobs)
router.get('/jobs/:id', jobController.getJobById)
router.get('/statistics', jobController.getStatistics)
router.get('/latest', jobController.getLatestJobs)
router.get('/details/:id', detailController.getDetailById)
router.post('/login', userController.login)
router.post('/register', userController.register)
router.post('/user/userinfo', userController.getUserInfo)

router.post('/gpt/motivation', gptController.generateMotivationLetter)
router.get('/user/personinfo', authMiddleware, personinfoController.getPersoninfo)
router.post('/user/personinfo', authMiddleware, personinfoController.updatePersoninfo)

module.exports = router
