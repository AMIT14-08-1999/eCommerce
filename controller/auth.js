const User = require('../models/userModel')
const jwt=require('jsonwebtoken')
exports.signup = (req, res) => {
    User.findOne({
        email: req.body.email,
    }).exec((error, user) => {
        if (user) return res.status(400).json({
            message: 'Email already registered'
        });
        const {firstname, lastname, email,password,phoneNumber} = req.body;
        const _user = new User({
            firstname,
            lastname,
            email,
            password,
            phoneNumber,
          username: Math.random().toString(),
            role:'user'
        });
        _user.save((error, data) => {
            if (error) {
                return res.status({
                    message: 'Something went wrong'
                })
            }
            if (data) {
                return res.status(201).json({
                    message:"user created successfully.."
                })
            }
        });
    })
}
exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (error) return res.status(400).json({ error });
    if (user) {
      if (user.authenticate(req.body.password)) {
        const token = jwt.sign(
          { _id: user._id,role:user.role},
          process.env.JWT_SECRET,
          { expiresIn: "5d" }
        );
        const { _id, firstName, lastName, email, role, fullName } = user;
        res.status(200).json({
          token,
          user: {  _id,firstName, lastName, email, role, fullName },
        });
      } else {
        return res.status(400).json({
          message: "Something went wrong",
        });
      }
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  });
};

