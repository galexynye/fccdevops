const protect = (req, res, next) => {
    const {user} = req.session 

    if(!user){
        return res.status(401).json({status: 'fail', message: 'unauthorized'})
    }

    req.user = user // this line is just to give us a short cut. instead of going to req.session.user we can do req.user
    next() // next() sends control flow of program to next controller or next middleware in the stack 
}

module.exports = protect