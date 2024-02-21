const express=require('express')
const router=new express.Router()
const User=require('../models/User')
const {verifyToken,verifyTokenAndAuthorization,verifyTokenAdmin}=require('../middleware/verifyToken')

router.delete('/users/:id',verifyTokenAndAuthorization,async(req,res)=>{
await User.findByIdAndDelete(req.params.id)
try{
    res.status(200).send('Deleted Successfully')

}catch(e){
     res.status(500).send(e)
     console.log(e)
}


})

router.get('/users/find/:id',verifyTokenAdmin,async(req,res)=>{
   const user= await User.findById(req.params.id)
    try{
        res.status(200).send(user)
    
    }catch(e){
         res.status(500).send(e)
         console.log(e)
    }
    
    
    })
    router.get('/users',verifyTokenAdmin,async(req,res)=>{
        const query=req.query.new
         try{
            const users=query
            ?await User.find().sort({_id:-1}).limit(5):await User.find()
             res.status(200).send(users)
         
         }catch(e){
              res.status(500).send(e)
              console.log(e)
         }
         

         
         })
router.get('/users/stats',verifyTokenAdmin,async(req,res)=>{
const date=new Date()
const lastyear=new Date(date.setFullYear(date.getFullYear()-1));
try{
const data= await User.aggregate([{
$match:{createdAt:{$gte:lastyear}}},{
$project: {
    month: { $month: { $toDate: "$createdAt" } }
},
},{$group:{
    _id:"$month",
    total:{$sum:1}
}}])

res.status(200).send(data)
}
catch(e){
res.status(500).send(e)
console.log(e)
}
         })

         
  router.patch('/users/me', verifyToken, async (req, res) => {
            const updates = Object.keys(req.body)
            const allowedUpdates = ['name', 'email', 'password']
            const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
        
            if (!isValidOperation) {
                return res.status(400).send({ error: 'Invalid updates!' })
            }
        
            try {
                updates.forEach((update) => req.user[update] = req.body[update])
                await req.user.save()
                res.send(req.user)
            } catch (e) {
                res.status(400).send(e)
            }
        })
     

module.exports = router