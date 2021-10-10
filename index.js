const express = require('express');
const app = express();
const env = require('dotenv');
env.config();
const cors=require('cors');
const path = require('path')
const mongoose=require('mongoose');
app.use(express.json());


app.get('/', (req, res,next) => {
    res.status(200).json({
        message: 'Hello world'
    });
})

app.use(cors());
//routes
const userRoutes= require('./routes/user')
const adminRoutes= require('./routes/admin/auth')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')
const cartRoutes = require('./routes/cart')

app.use(express.static(path.join(__dirname,'uploads/')));
app.use('/api', userRoutes);
app.use('/api', adminRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);



mongoose.connect(`${process.env.MONGO_URL}`).then(() => {
    console.log("Database connected")
})

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
})
//14-38.00
