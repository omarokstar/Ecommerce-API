const express=require('express')
const router=new express.Router()
const Product=require('../models/Product')
const {verifyTokenAndAuthorization,verifyTokenAdmin}=require('../middleware/verifyToken')

//ADMIN ADD PRODUCT

router.post('/products',verifyTokenAdmin,async(req,res)=>{
const product=new Product(req.body)
try{
await product.save()
res.status(201).send(product)


}catch(e){
    res.status(400).send(e)
    console.log(e)
}

})




//ADMIN DELETE PRODUCT

router.delete('/products/:id',verifyTokenAndAuthorization,async(req,res)=>{
await Product.findByIdAndDelete(req.params.id)
try{
    res.status(200).send('Deleted Successfully')

}catch(e){
     res.status(500).send(e)
     console.log(e)
}


})
//ADMIN UPDATE PRODUCT

router.patch('/products/:id',verifyTokenAdmin, async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'desc', 'categories','size','color','Price']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try 
    {
        const product=await Product.findById(req.params.id)
        updates.forEach((update) => product[update] = req.body[update])
        await product.save()
        res.send(product)
    } catch (e) {
        res.status(400).send(e)
    }
})
//GET PRODUCT BY ID
router.get('/product/find/:id',async(req,res)=>{
   const Products= await Product.findById(req.params.id)
    try{
        res.status(200).send(Products)
    
    }catch(e){
         res.status(500).send(e)
         console.log(e)
    }
    
    
    })

        //GET ALL PRODUCTS 
    router.get('/products',async(req,res)=>{
        const qNew=req.query.new
        const Qcategory=req.query.category
let products;
         try{
            if(qNew){
         products=await Product.find().sort({createdAt:-1}).limit(5)
         console.log("new")
        }
        else if(Qcategory){
            products=await Product.find({
                categories:{
                    $in:[Qcategory]
                }
                
            })

        }
        else{
          products=await Product.find()
        }
             res.status(200).send(products)
         
         }catch(e){
              res.status(500).send(e)
              console.log(e)
         }
         

         
         })

     

module.exports = router