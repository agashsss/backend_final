const Router = require('express');
const router = new Router();
const controller= require ('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const ADMIN = ['ADMIN']

    router.get('/users',roleMiddleware(['ADMIN']) , controller.getUsers)
    router.get('/users/:id',authMiddleware , controller.getUser)
    router.delete('/users/:id',authMiddleware ,controller.delete)

module.exports = router;