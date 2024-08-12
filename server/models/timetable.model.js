const mongoose = require("mongoose");


const timeTableSchema = new mongoose.Schema({
    teacherId:{
        type:String,
    },
    classRoomId:{
        type:String,
        required:true
    },
    day:{
        type:String,
        required:true
    },
    lectures:[
        {
                name:{
                    type:String,
                    required:true
                },
                timing:{
                    type:String,
                    required:true,
                }
        }
    ]
},{
    timestamps:true
})

module.exports = mongoose.model('timeTable',timeTableSchema)