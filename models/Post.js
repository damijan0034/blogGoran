const mongoose=require("mongoose")

const PostSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String
    },
    userId:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:false
    },
    categories:{
        type:Array
    }

},{timestamps:true})

const Post=mongoose.model("Post",PostSchema)

module.exports=Post