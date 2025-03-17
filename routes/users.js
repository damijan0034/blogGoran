const express=require("express")
const User = require("../models/User")
const router=express.Router()
const bcrypt=require("bcrypt")
const verifyToken=require("../middlewares/verifyToken")
const Post = require("../models/Post")

//UPDATE
router.put("/:id",verifyToken,async(req,res)=>{
    try {
     
        if(req.body.password){
            const salt=await bcrypt.genSalt(10)
            const hashedPassword= bcrypt.hashSync(req.body.password,salt)
            req.body.password=hashedPassword

          const updatedUser=  await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})

          res.status(200).json(updatedUser)
        }

    } catch (error) {
        res.status(500).json(error)
    }
})

router.delete("/:id",verifyToken,async(req,res)=>{
    try {
        
        await User.findByIdAndDelete(req.params.id)
        await Post.deleteMany({userId:req.params.id})
        await Comment.deleteMany({userId:req.params.id})
        res.status(200).json("User deleted")
    } catch (error) {
        res.status(500).json(error)
    }
})

//GET USER BY ID
router.get("/:id",async(req,res)=>{
    try {
        const user=  await User.findById(req.params.id)
        const{password,...info}=user._doc
        res.status(200).json(info)
    } catch (error) {
        res.status(500).json(error)
    }
  
})

module.exports=router



