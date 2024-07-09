const express=require('express')
const router=new express.Router()
const {verifyToken,verifyTokenAndAuthorization,verifyTokenAdmin}=require('../middleware/verifyToken')
const Order = require('../models/Order')
//USER ADD ORDER
router.post('/Order',verifyTokenAndAuthorization,async(req,res)=>{
const order=new Order(req.body)
try{
await order.save()
res.status(201).send(order)


}catch(e){ 
    res.status(400).send(e)
    console.log(e)
}

})


//USER DELETE ORDER

router.delete('/order/:id',verifyTokenAndAuthorization,async(req,res)=>{
await Order.findByIdAndDelete(req.params.id)
try{
    res.status(200).send('Deleted Successfully')

}catch(e){
     res.status(500).send(e)
     console.log(e)
}


})
//USER UPDATE ORDER

router.patch('/order/:id', verifyTokenAndAuthorization, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['products']; // Assuming 'products' is a field in the Cart model
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
  
    if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' });
    }
  
    try {
      const order = await Order.findById(req.params.id);
  
      if (!order) {
        return res.status(404).send({ error: 'Cart not found' });
      }
  
      updates.forEach((update) => {
        order[update] = req.body[update];
      });
      await cart.save();
      res.send(order);
    } catch (e) {
      res.status(400).send(e);
    }
  });
//USER GET ORDER
router.get('/order/find/:id',verifyTokenAndAuthorization,async(req,res)=>{
    try{
        const order= await Order.find({userID:req.params.userID})
        res.status(200).send(order)
    
    }catch(e){
         res.status(500).send(e)
         console.log(e)
    }
    
    
    })
      //ADMIN GET USER ORDERS

    router.get('/Orders',verifyTokenAdmin,async(req,res)=>{

         try{
        

         const order=await Order.find()
     
             res.status(200).send(order)
         
         }catch(e){
              res.status(500).send(e)
              console.log(e)
         }
         

         
         })
      
      //ADMIN GET SITE INCOMES
         router.get('/incomes', verifyTokenAdmin, async (req, res) => {
            const date = new Date();
            const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
            const prevMonth = new Date(date.setMonth(lastMonth.getMonth()-1));
            try {
                const income = await Order.aggregate([
                    {
                        $match: { createdAt: { $gte: prevMonth } }
                    },
                    {
                        $project: {
                            month: { $month: "$createdAt" },
                            sales: "$amount"
                        }
                    },
                    {
                        $group: {
                            _id: "$month",
                            total: { $sum: "$sales" }
                        }
                    }
                ]);
                res.status(200).send(income);
            } catch (e) {
                res.status(500).send(e);
                console.log(e);
            }
        });

        module.exports = router
        
     

 