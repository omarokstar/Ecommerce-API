const express=require('express')
const router=new express.Router()
const stripe=require('stripe')(process.env.Payment)
//Payment method route
router.post("/payment",async(req,res)=>{

    stripe.charges.create({
        source:req.body.tokenId,
        amount:req.body.amount,
        currancy:"usd"
    }),(stripeErr,stripeRes)=>{
    if(stripeErr){
       res.status(500).send(stripeErr) 
    }
    else{
        res.status(200).send(stripeRes)
    }

    }
})



module.exports = router