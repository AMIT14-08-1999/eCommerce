const Product = require('../models/product')
const slugify = require('slugify')
const shortId=require('shortid')



exports.createProduct = (req, res) => {
    const {
        name,price,description,category,quantity,createBy
    } = req.body;
    // res.status(200).json({
    //     file: req.files,
    //     body: req.body
    // })
    let productPictures = [];
    if (req.files.length > 0) {
       productPictures= req.files.map(file => {
            return {img:file.filename}
        })
    }
    const product = new Product({
        name:name,
        slug: slugify(name),
        price,
        quantity,
        description,
        productPictures,
        category,
        createBy:req.user._id
    })
    product.save(((error, product) => {
        if (error) return res.status(400).json({ error });
        if (product) {
            res.status(201).json({product})
        }
    }))
}