const mongoose = require("mongoose");


const classRoomSchema = new mongoose.Schema({
    className:{
        type:Number,
        required:true
    },
    teacherAssigned:{
        type:String,
        required:true
    },
    inSessionDays:{
        type:[String],
        enum:['Monday', "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    },
    schedule:[
        {
            day:{
                type:String,
            enum:['Monday', "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
            },
            startTime:{
                type:String,
                required:true
            },
            endTime:{
                type:String,
                required:true
            }
        },
    ],
},
{
    timestamps:true
})

module.exports = mongoose.model('classroom',classRoomSchema)