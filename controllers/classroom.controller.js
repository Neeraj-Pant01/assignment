const classRoomModel = require("../models/classRoom.model");
const userModel = require("../models/user.model");


exports.createClassRoom = async (req, res) => {
    const classRoom = new classRoomModel(req.body)
    try {
        const user = await userModel.findById(req.body.userId)
        if(user.isPrincipal){
        const savedClassRoom = await classRoom.save();
        res.status(200).json(savedClassRoom)
        }else{
        res.status(400).json({message:"you can't create the classroom !"})
        }
    } catch (err) {
        res.status(400).json(err)
    }
}

exports.updateClassRoom = async (req, res) => {
    try {
        const user = await userModel.findById(req.body.userId);
        if (user.isPrincipal){
            const updatedClassRoom = await classRoomModel.findByIdAndUpdate(req.prams.id, {
                $set : req.body
            },{
                new : true
            })
            res.status(200).json(updatedClassRoom)
        }else{
            res.status(400).json({message:"you can't create the classroom !"})
        }
    } catch (err) {
        res.status(400).json(err)
    }
}

exports.deleteClassRoom = async (req,res) =>{
    try {
        const user = await userModel.findById(req.body.userId);
        if (user.isPrincipal){
            await classRoomModel.findByIdAndDelete(req.prams.id)
            res.status(200).json({message:"classroomDeleted !"})
        }else{
            res.status(400).json({message:"you can't delete the classroom !"})
        }
    } catch (err) {
        res.status(400).json(err)
    }
}

exports.getClassRooms = async (req, res) => {
    try {
        const classRooms = await classRoomModel.find()
        res.status(200).json(classRooms)
    } catch (err) {
        res.status(400).json(err)
    }
}

exports.getClassRoom = async (req,res) =>{
    try{
        const classRoom = await classRoomModel.findById(req.params.id)
        res.status(200).json(classRoom)  
    }catch (err){
        res.status(400).json(err)
    }
}