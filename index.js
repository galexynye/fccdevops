const express = require("express")
const mongoose = require("mongoose"); 
const session = require("express-session")
const redis = require("redis")
let RedisStore = require("connect-redis")(session)


const postRouter = require("./routes/postRoutes")
const userRouter = require("./routes/userRoutes")

const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, REDIS_URL, REDIS_PORT, SESSION_SECRET } = require("./config/config");

let redisClient = redis.createClient({
    legacyMode: true,
    socket: {
        port: REDIS_PORT,
        host: REDIS_URL
    }
})
redisClient.connect().catch(console.error)



const app = express()
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`

const connectWithRetry = () =>{
    mongoose
    .connect(mongoURL, {
        useNewURLParser: true,
        useUnifiedTopology: true
    })
    .then(()=> console.log("Successfully connect to DB"))
    .catch((e)=> {
        console.log(e)
        setTimeout(connectWithRetry, 5000)
    })
}

connectWithRetry()

app.use(session({ // configure express session 
    store: new RedisStore({client: redisClient}), // adds Redis middle ware, to store session info
    secret: SESSION_SECRET, // random secret on our express server (as environment variable). lets us connect to session data   
    saveUninitialized: false,
    resave: false,
    cookie: { // defined in express-session npm
        secure: false, // in development false and production true. means only works with HTTPs
        httpOnly: true,
        maxAge: 3000000,// we will use for how long user stays logged on
    }
}))


app.use(express.json()) // MIDDLEWARE: this makes sure json body of post will be attatched to express object 


app.get("/", (req, res) => {
    res.send("<h2>Hi There Guy!!</h2>")
})

//localhost:3000/api/v1/posts -- this will send to our post router and we will be left with / (as in our postRoutes.js)
app.use("/api/v1/posts", postRouter)
app.use("/api/v1/users", userRouter)
const port = process.env.PORT || 3000; 

app.listen(port, () => console.log(`listening on port ${port}`))