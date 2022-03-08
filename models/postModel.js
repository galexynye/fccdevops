const mongoose = require("mongoose") // schema for database (used in controllers so we know how to interact with DB)

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        require: [true, "Post must have title"]
    },
    body: {
        type: String,
        required: [true, "post must have body"]
    }
})

const Post = mongoose.model("Post", postSchema)
module.exports = Post 

