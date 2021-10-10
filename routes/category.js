const express = require('express');
const { reqSignIn, adminMiddleware } = require('../common-middleware');
const { addCategory, getCategory } = require('../controller/category');
const router = express.Router();
const multer=require('multer')
const shortId = require('shortid')
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname),'uploads'))
  },
  filename: function (req, file, cb) {
    cb(null, shortId.generate()+'-'+file.originalname)
  }
})
const upload = multer({storage});
router.post('/category/create', reqSignIn,adminMiddleware,upload.single('categoryImage'),addCategory)
router.get('/category/getCategory',getCategory)



module.exports=router;