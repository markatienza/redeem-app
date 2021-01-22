const router = require('express').Router();
const controller = require('../controllers');


router.post('/', controller.user.createUser)


module.exports = router;