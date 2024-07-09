const express= require('express')
const userRouter=require('./routers/user')
const authRouter=require("./routers/auth")
const ProductRouter = require("./routers/product")
const OrderRouter=require('./routers/order')
const CartRouter=require('./routers/cart')
require('dotenv').config();
const port=process.env.PORT
require('./db/mongoose')

const app=express()

app.use(express.json())
app.use(userRouter)
app.use(authRouter)
app.use(ProductRouter)
app.use(OrderRouter)
app.use(CartRouter)
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})