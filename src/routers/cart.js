const express=require('express')
const router=new express.Router()
const Cart=require('../models/Cart')
const {verifyToken,verifyTokenAndAuthorization,verifyTokenAdmin}=require('../middleware/verifyToken')

router.post('/Cart',verifyTokenAndAuthorization,async(req,res)=>{
const cart=new Cart(req.body)
try{
await cart.save()
res.status(201).send(cart)


}catch(e){ 
    res.status(400).send(e)
    console.log(e)
}

})






router.delete('/cart/:id',verifyTokenAndAuthorization,async(req,res)=>{
await Cart.findByIdAndDelete(req.params.id)
try{
    res.status(200).send('Deleted Successfully')

}catch(e){
     res.status(500).send(e)
     console.log(e)
}


})
router.patch('/cart/:id',verifyTokenAndAuthorization, async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'desc', 'categories','size','color','Price']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try 
    {
        const cart=await Cart.findById(req.params.id)
        updates.forEach((update) => product[update] = req.body[update])
        await cart.save()
        res.send(cart)
    } catch (e) {
        res.status(400).send(e)
    }
})
router.get('/cart/find/:id',verifyTokenAndAuthorization,async(req,res)=>{
    try{
        const Cart= await Cart.findOne({userID:req.params.userID})
        res.status(200).send(Cart)
    
    }catch(e){
         res.status(500).send(e)
         console.log(e)
    }
    
    
    })

    router.get('/Carts',verifyTokenAdmin,async(req,res)=>{

         try{
        

         const Cart=await Cart.find()
     
             res.status(200).send(Cart)
         
         }catch(e){
              res.status(500).send(e)
              console.log(e)
         }
         

         
         })

     

module.exports = router