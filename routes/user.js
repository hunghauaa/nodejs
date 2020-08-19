const express = require('express')
const app = express()
const db = require('../db');
const controller = require('../controller/user')
const router = express.Router()

router.get('/userlist',controller.index)
router.get('/view/:id',controller.view)
router.get('/search',controller.search)
router.post('/create',controller.create)
router.get('/create', controller.getCreate)


module.exports = router
