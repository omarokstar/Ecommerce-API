const mongoose=require('mongoose')

const OrderSchema=new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    products:[{
productId:{
    type:String,
    required:true
},
quantity:{
    type:Number,
    default:1
}

    }],amount:{
        type:Number,
    },address:{
        type:Object,
    }
    ,status:{
        type:String,
        default:"Pending"
    }

},{timestamps:true})


const Order=mongoose.model('Order',OrderSchema)

module.exports=Order