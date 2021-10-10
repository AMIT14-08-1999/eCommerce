const { check, validationResult }= require('express-validator');
exports.validateSignUpRequest = [
    check('firstname')
        .notEmpty()
        .withMessage('firstName is required'),
    check('lastname')
        .notEmpty()
        .withMessage('last name is required'),
    check('email')
        .isEmail()
        .withMessage('valid email is required'),
    check('password')
        .isLength({ min: 6 })
        .withMessage('password must be at least 6 character long'),
    check('phoneNumber')
        .isLength({ min: 10 })
        .withMessage('please give your valid phone number'),
];
exports.validateSignInRequest = [
    check('email')
        .isEmail()
        .withMessage('valid email is required'),
    check('password')
        .isLength({ min: 6 })
        .withMessage('password must be at least 6 character long'),
];


exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.array().length>0) {
        return res.status(400).json({error:errors.array()[0].msg})
    }
    next();
}
