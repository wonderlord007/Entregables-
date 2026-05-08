const mongoose=require('mongoose')
const Schema=mongoose.Schema
const UserAuthSchema=new Schema({
    email:String,
    password:String
})
const userAuth=mongoose.model('UserAuth',UserAuthSchema)
module.exports=userAuth