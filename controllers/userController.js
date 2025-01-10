const UserModel = require('../models/UserModel')
const TokenModel = require('../models/tokenModel')
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const emailSender = require('../middlewares/emailSender')
const saltRounds = 10

const jwt = require('jsonwebtoken')

// register user
exports.register = async (req, res) => {
    // destructuring object to get values
    let { username, email, password } = req.body

    // check if username is available or not
    let usernameExists = await UserModel.findOne({ username })
    if (usernameExists) {
        return res.status(400).json({ error: "Username not available." })
    }

    // check if email is already registered
    let emailExists = await UserModel.findOne({ email })
    if (emailExists) {
        return res.status(400).json({ error: "Email already registered." })
    }

    // encrypt password
    let salt = await bcrypt.genSalt(saltRounds)
    let hashed_password = await bcrypt.hash(password, salt)

    // create user
    let user = await UserModel.create({
        username,
        email,
        password: hashed_password
    })
    if (!user) {
        return res.status(400).json({ error: "Something went wrong" })
    }

    // generate verification token
    let token = await TokenModel.create({
        token: crypto.randomBytes(16).toString('hex'),
        user: user._id
    })

    if (!token) {
        return res.status(400).json({ error: "Something went wrong" })
    }

    // send verification token/link in email
    const URL = `http://localhost:5000/api/verifyEmail/${token.token}`
    emailSender({
        from: 'noreply@something.com',
        to: email,
        subject: "Verify your Account.",
        text: `Click on the following link to verify your account. ${URL}`,
        html: `<a href='${URL}'><button>Verify Now</button></a>`
    })

    // send message to user
    res.send(user)
}

// verify email
exports.verifyEmail = async (req, res) => {
    // check if token is valid or not
    let token = await TokenModel.findOne({ token: req.params.token })
    if (!token) {
        return res.status(400).json({ error: "Invalid token or token may have expired" })
    }
    // find user
    let user = await UserModel.findById(token.user)
    if (!user) {
        return res.status(400).json({ error: "User associated with token not found" })
    }
    // check if already verified
    if (user.isVerified) {
        return res.status(400).json({ error: "User already verified" })
    }
    // verify
    user.isVerified = true
    // save user
    user = await user.save()
    if (!user) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    // send message to user
    res.send({ message: "User verified successfully" })
}

// forget password
exports.forgetPassword = async (req, res) => {
    // check email if registered or not
    let user = await UserModel.findOne({ email: req.body.email })
    if (!user) {
        return res.status(400).json({ error: "Email not registered." })
    }
    // generate token
    let token = await TokenModel.create({
        token: crypto.randomBytes(16).toString('hex'),
        user: user._id
    })
    if (!token) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    // send password reset link in email
    const URL = `http://localhost:5000/api/resetpassword/${token.token}`
    emailSender({
        from: 'noreply@something.com',
        to: req.body.email,
        subject: `Password reset email`,
        text: `Click on the following link to reset your password. ${URL}`,
        html: `<a href='${URL}'><button>Reset Password</button></a>`
    })
    // send message to user
    res.send({ message: "Password reset link has been sent to your email" })
}

// reset password
exports.resetPassword = async (req, res) => {
    // check token if valid or not
    let token = await TokenModel.findOne({ token: req.params.token })
    if (!token) {
        return res.status(400).json({ error: "Invalid token or token may have expired" })
    }
    // find user
    let user = await UserModel.findById(token.user)
    if (!user) {
        return res.status(400).json({ error: "User not found." })
    }
    // encrypt password
    let salt = await bcrypt.genSalt(saltRounds)
    let hashed_password = await bcrypt.hash(req.body.password, salt)

    // update password and save user
    user.password = hashed_password
    user = await user.save()
    if (!user) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    // send message to user
    res.send({ message: "Password reset successful" })
}

// login
exports.signin = async (req, res) => {
    // get email and password from user
    let { email, password } = req.body
    // check if email is registered
    let user = await UserModel.findOne({ email })
    if (!user) {
        return res.status(400).json({ error: "Email not registered" })
    }
    // check if password matches or not
    let passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
        return res.status(400).json({ error: "Email and password do not match." })
    }
    // check if user is verified or not
    if (!user.isVerified) {
        return res.status(400).json({ error: "User not verified" })
    }
    // generate login token
    let token = jwt.sign({
        _id: user._id,
        email: user.email,
        username: user.username,
        role: user.role
    }, process.env.JWT_SECRET)

    // send token to frontend
    // set token in cookies
    res.cookie('myCookie', token)
    res.send({
        token, 
        user: {_id: user._id, email, username: user.username, role: user.role}})
}