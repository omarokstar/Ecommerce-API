const mongoose=require('mongoose')
const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken')
const validator = require('validator')
const userSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }, 
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
<<<<<<< HEAD
      
=======
    
            }
        }
>>>>>>> e577055a64ac8333e9afad960ce1fc3a81ef4170
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
<<<<<<< HEAD
            }
        },
=======
>>>>>>> e577055a64ac8333e9afad960ce1fc3a81ef4170
    },
    isAdmin:{
        type:Boolean,
        default:false

    },
    verified:{
        type:Boolean,
        default:false
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],

},{timestamps:true})
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.Secure_Key)

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password

    return userObject
}

userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

const User = mongoose.model('User', userSchema)

module.exports=User
