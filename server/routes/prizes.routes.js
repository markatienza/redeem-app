const router = require('express').Router();
const controller = require('../controllers');
const verifyRequest = require('../middleware/verify-request.mw')


router.get('/', controller.prizes.getAllPrizes);
router.get('/:name', controller.prizes.getPrizes);

router.post('/', controller.prizes.createPrizes);
router.post('/deductQuantity', verifyRequest, controller.prizes.deductQuantity);
router.post('/updateQuantity', controller.prizes.updateQuantity);

module.exports = router;