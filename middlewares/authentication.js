// const jwt = require('jsonwebtoken')

// exports.validateLogin = (req, res, next) => {
//     if (!req.headers.authorization) {
//         return res.status(401).json({ error: "You need to login first." })
//     }
//     next()
// }

// exports.requireAdmin = (req, res, next) => {
//     let user = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
//     if (user.role == 1) {
//         next()
//     }
//     else {
//         return res.status(403).json({ error: "Authorization failure" })
//     }
// }

const { expressjwt } = require('express-jwt')

exports.validateLogin = (req, res, next) => {
    expressjwt({
        algorithms: ['HS256'],
        secret: process.env.JWT_SECRET
    })(req, res, (error) => {
        if (error) {
            return res.status(401).json({ error: "You need to Login first" })
        }
        next()
    })
}

exports.requireAdmin = (req, res, next) => {
    expressjwt({
        algorithms: ['HS256'],
        secret: process.env.JWT_SECRET,
        userProperty: 'auth'
    })(req, res, (error)=>{
        if(error){
            return res.status(401).json({ error: "You need to Login first" })
        }
        else if(req.auth.role != 1){
            return res.status(403).json({error:"Authorization failure"})
        }
        else{
            next()
        }
    })
}