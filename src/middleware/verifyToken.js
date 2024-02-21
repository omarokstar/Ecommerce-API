const jwt = require('jsonwebtoken')
const User = require('../models/User')
const verifyToken = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ','')
        const decoded = jwt.verify(token, process.env.Secure_Key)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new Error()
        }

        req.token = token
        req.user = user
        next()
    } catch (e) {
        console.log(e)
        res.status(401).send({ error: 'Please authenticate.' })
    }
}
const verifyTokenAndAuthorization = async (req, res, next) => {
    try {
        await verifyToken(req, res, () => {
            if (req.user.id === req.params.id || req.user.isAdmin) {
                next();
            } else {
                res.status(403).json("You are not allowed to do that!");
            }
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const verifyTokenAdmin = async (req, res, next) => {
    try {
        await verifyToken(req, res, () => {
            if (req.user.isAdmin) {
                next();
            } else {
                res.status(403).json("You are not allowed to do that!");
            }
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports={verifyToken,verifyTokenAndAuthorization,verifyTokenAdmin}
