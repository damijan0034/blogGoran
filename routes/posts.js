const express=require("express")
const Post = require("../models/Post")
const verifyToken = require("../middlewares/verifyToken")
const Comment = require("../models/Comment")

const router=express.Router()

//CREATE POST
router.post("/create",async(req,res)=>{
    try {
       const newPost= await Post.create(req.body)
       res.status(201).json(newPost)
    } catch (error) {
        res.status(500).json(error)
    }
})

//UPDATE POST
router.put("/:id",verifyToken,async(req,res)=>{
    try {
      const updatedPost=  await Post.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedPost)
    } catch (error) {
        res.status(500).json(error)
    }
    
})

//DELETE POST
router.delete("/:id",verifyToken,async(req,res)=>{
    try {
        await Post.findByIdAndDelete(req.params.id)
        await Comment.deleteMany({postId:req.params.id})
        res.status(200).json("Post deleted")
    } catch (error) {
        res.status(500).json(error)
    }
})

//ALL POSTS
// router.get("/",async(req,res)=>{
//     try {
//       const posts = await Post.find()

//       res.status(200).json(posts)
//     } catch (error) {
//         res.status(500).json(error)
//     }
// })

//SINGLE POST 
router.get("/:id",async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error) 
    }
})

//SEARCH POST
router.get("/",async(req,res)=>{
    
    try {
        const query=req.query
        const searchFilter={title:{$regex:query.search ,$options:"i"}}
        const posts=await Post.find(query.search?searchFilter:null)
       res.status(200).json(posts)
    } catch (error) {
        res.status(500).json(error)
    }
})

//POSTS BY USERID
router.get("/post/:userId",async(req,res)=>{
    try {
        const post=await Post.find({userId:req.params.userId})
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
})
module.exports=router