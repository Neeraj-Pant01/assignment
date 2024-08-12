const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
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
        required:false
    },
    classAt:{
        type:String,
    },
    isPrincipal:{
        type:Boolean,
        default:false
    },
    status:{
        type:String,
        enum:["teacher", "student"]
    }
},{
    timestamps:true
})

module.exports = mongoose.model('users',userSchema)