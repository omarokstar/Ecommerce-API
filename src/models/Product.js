const mongoose=require('mongoose')

const ProductSchema=new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    categories: {
        type: Array,
    },
    size: {
        type: String,
    },
    color: {
        type: String,
    },
    Price:{
        type:Number,
        required:true

    },

},{timestamps:true})
const Product= mongoose.model('Product',ProductSchema)
module.exports=Product