const express = require('express');
const { reqSignIn, userMiddleware } = require('../common-middleware');
const { addItemToCart } = require('../controller/cart');
const router = express.Router();


router.post('/user/cart/addtocart', reqSignIn,userMiddleware,addItemToCart)




module.exports=router;