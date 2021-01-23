const router = require('express').Router();
const controller = require('../controllers');


router.get('/', controller.user.getUser);
router.post('/', controller.user.createUser);
router.post('/auth', controller.user.authUser);
router.post('/verify', controller.user.verifyToken);


module.exports = router;