const express = require('express');
const { reqSignIn } = require('../../common-middleware');
const { signup,signin, signOut } = require('../../controller/admin/auth');
const { validateSignUpRequest, isRequestValidated, validateSignInRequest } = require('../../validators/auth');
const router = express.Router();


router.post('/admin/signup', validateSignUpRequest,isRequestValidated, signup)
router.post('/admin/signin', validateSignInRequest, isRequestValidated, signin)
router.post('/admin/signout',reqSignIn,signOut)


module.exports =router;
