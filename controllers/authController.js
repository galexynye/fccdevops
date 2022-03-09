const User = require("../models/userModel")

const bcrypt = require("bcryptjs")

exports.signUp = async (req, res) => {
    const {username, password} = req.body     
    try {
        const hashpassword = await bcrypt.hash(password, 12)
        const newUser = await User.create({
            username, 
            password: hashpassword
        })

        req.session.user = newUser 
        res.status(201).json({
            status: "success",
            data: {
                user: newUser
            }
        })
    } catch(e) {
        console.log(e)
        res.status(400).json({
            status: "fail"
        })
    }
}

exports.login = async (req, res) => {
    const {username, password} = req.body     
    try {
        const user = await User.findOne({username})
        if(!user){
            return res.status(404).json({
                status: "failed",
                message: "user not found"
            })
        }

        const isCorrect = await bcrypt.compare(password, user.password) // checks password inputed matched the hashed password on the database

        if(isCorrect){
            req.session.user = user // session object is attatched to request object. (inside the request we have the cookie and automagically get it with the middleware) https://www.npmjs.com/package/express-session/v/1.17.2
            res.status(200).json({
                status: 'success'
            })
        } else{
            res.status(400).json({
                status: 'fail',
                message: "incorrect username or password"
            })
        }

    } catch(e) {
        res.status(400).json({
            status: "fail"
        })
    }
}