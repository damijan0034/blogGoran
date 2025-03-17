const express=require("express")
const Comment = require("../models/Comment")

const router=express.Router()

//CREATE COMMENT
router.post("/create",async(req,res)=>{
    try {
       const comment= await Comment.create(req.body)
       res.status(201).json(comment)
    } catch (error) {
        res.status(500).json(error)
    }
})

//EDIT COMMENT
router.put("/:id",async(req,res)=>{
    try {
      const updatedComment=  await Comment.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
      res.status(200).json(updatedComment)
    } catch (error) {
        res.status(500).json(error) 
    }
})

//DELETE COMMENT
router.delete("/:id",async(req,res)=>{
    try {
        await Comment.findByIdAndDelete(req.params.id)
        res.status(200).json("Comment successfully deleted")
    } catch (error) {
        res.status(500).json(error)
    }
})

//ALL COMMENTS
router.get("/",async(req,res)=>{
    try {
        const comments=await Comment.find()
        res.status(200).json(comments)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports=router