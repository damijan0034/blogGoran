const mongoose=require("mongoose")

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
},{
    timestamps:true
})

const User=mongoose.model("UserModel",UserSchema)

module.exports=User