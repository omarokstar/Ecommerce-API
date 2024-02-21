const express=require('express')
const router=new express.Router()
const User=require('../models/User')
const {verifyToken}=require('../middleware/verifyToken')
const{sendWelcomeEmail}=require('../mail/email')
router.post("/users/register",async(req,res)=>{
    const user=new User(req.body)
    
try{
await user.save()
const token = await user.generateAuthToken()
const link=`http://localhost:3000/users/stats/confirm:${user.tokens.token}`
console.log(token)
sendWelcomeEmail(user.email,user.name,link)
res.status(201).send({user,token})
}
catch(e){
res.status(400).send(e)

}

})
router.get('/confirm/:token', async (req, res) => {
    try {
        const token =await User.findOne({token:req.params.token})
        console.log(token)
        await User.updateOne({_id:token.userId},{$set:{verified:true}})
    } catch (e) {
        res.status(400).send(e)
        console.log(e)
    }
})


router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user,token})
    } catch (e) {
        res.status(400).send(e)
        console.log(e)
    }
})




module.exports = router