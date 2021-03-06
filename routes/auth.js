const Router = require('express')
const router = new Router();
const controller= require ('../controllers/authController')
const roleMiddleware = require('../middleware/roleMiddleware');
const authorization = require('../middleware/authorization');

router.post('/registration', controller.registration)
    router.post('/login', controller.login)
    router.get('/logout', authorization ,controller.logout)
    router.patch('/edit', controller.edit)

module.exports = router;