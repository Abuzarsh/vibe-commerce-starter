const express = require('express');
const router = express.Router();
const controller = require('../controllers/cartController');
5
router.post('/', controller.addToCart);
router.delete('/:id', controller.removeFromCart);
router.get('/', controller.getCart);
router.post('/checkout', controller.checkout);
module.exports = router;