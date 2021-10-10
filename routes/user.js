const express = require('express');
const { signup,signin } = require('../controller/auth');

const { validateSignUpRequest, isRequestValidated,validateSignInRequest } = require('../validators/auth');
const router = express.Router();


router.post('/signup', validateSignUpRequest,isRequestValidated, signup)
router.post('/signin',validateSignInRequest,isRequestValidated, signin)


module.exports =router;




