const express = require('express')
const userController = require('../controllers/userController');
const router = express.Router();

router.get('/', userController.getAllUsers)
router.get('/:id', userController.getUser)
router.post('/', userController.create)
router.patch('/:id', userController.update)
router.delete('/:id', userController.delete)

module.exports = router