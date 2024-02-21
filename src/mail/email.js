const nodemailer=require('nodemailer')
const trasporter= nodemailer.createTransport({
    service: 'Gmail',
    port:465,
    secure:true,
    auth:{
        user:process.env.email,
        pass:process.env.PASS
        
                                
    }, tls: {
        // This is set to false to avoid self-signed certificate issues
        rejectUnauthorized: false
    }
})


const sendWelcomeEmail= (email,name,link)=>{

 trasporter.sendMail({
    from:'"Shofonera"'+process.env.email,
    to:email,
    subject:'Thanks for joining in!',
    text:`welcome to the app,${name}.Let me know how you go along with the app 
    ${link} Click Here To successfully complete the creation of your account on our portal.`,
    html:`<div>
    <a href=${link} Click Here To successfully complete the creation of your account on our portal.></a>
    <div/>`

})}


module.exports={
    sendWelcomeEmail,
    
}
