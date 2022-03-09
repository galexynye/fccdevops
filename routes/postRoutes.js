const express = require("express")

const postController = require("../controllers/postController")
const protect = require("../middleware/authMiddleware")

const router = express.Router()

// localhost:3000/
router
    .route("/")
    .get(protect, postController.getAllPosts)
    .post(protect, postController.createPost) // protect is our middle ware function 

router
    .route("/:id")
    .get(protect, postController.getOnePost)
    .patch(protect, postController.updatePost)
    .delete(protect, postController.deletepost)



module.exports = router 