const timeTableModel = require("../models/timetable.model");
const userModel = require("../models/user.model");

exports.createTimeTable = async (req,res) =>{
    try{
        const newTimeTable = new timeTableModel(req.body);
        await newTimeTable.save();
        res.status(200).json(newTimeTable)
    }catch(err){
        res.status(200).json(err)
    }
}

exports.updateTimeTable = async (req,res) =>{
    try{
        const timeTable = await timeTableModel.findById(req.params.id)
        const user = await userModel.findById(req.body.userId)
        if(timeTable.teacherId === user._id || user.isPrincipal){
            const updatedTimeTable = await timeTableModel.findByIdAndUpdate(req.params.id, {
                $set : req.body
            },{
                new: true
            })
            res.status(200).json(updatedTimeTable)
        }else{
        res.status(400).json({message:"unauthorized !"}) 
        }
    }catch(err){
        res.status(400).json(err)
    }
}

exports.deleteTimeTable = async (req,res) =>{
    // console.log(req.headers['user-id'])
    try{
        const timeTable = await timeTableModel.findById(req.params.id)
        const user = await userModel.findById(req.headers['user-id'])
        if(timeTable.teacherId === user._id || user.isPrincipal){
            await timeTableModel.findByIdAndDelete(req.params.id)
            res.status(200).json({message:"timetable deleted !"})
        }else{
        res.status(400).json({message:"unauthorized !"}) 
        }
    }catch(err){
        res.status(400).json(err)
    }
}

exports.geTimeTable = async (req,res) =>{
    try{
        const timeTable = await timeTableModel.find({classRoomId:req.params.classId})
        res.status(200).json(timeTable)  
    }catch (err){
        res.status(400).json(err)
    }
}