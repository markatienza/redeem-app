const router = require('express').Router();
const controller = require('../controllers');


router.post('/', controller.user.createUser)
router.get('/', controller.user.getUser)


module.exports = router;