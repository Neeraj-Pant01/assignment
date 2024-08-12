const userModel = require("../models/user.model");

exports.updateUSer = async (req,res) =>{
    try{
        const user = await userModel.findById(req.body.userId)
        if(user.status === "teacher" || user.isPrincipal){
            const updatedUser = await userModel.findByIdAndUpdate(req.params.id,{
                $set : req.body
            },{
                new : true
            })
            res.status(200).json(updatedUser)
        }
    }catch(err){
        res.status(400).json({message:err.message})
    }
}


exports.deleteUser = async (req,res) =>{
    try{
        const user = await userModel.findById(req.headers['user-id'])
        if(user.status === "teacher" || user.isPrincipal){
            const updatedUser = await userModel.findByIdAndDelete(req.params.id)
            res.status(200).json({message:"user has been deleted !"})
        }
    }catch(err){
        res.status(400).json({message:err.message})
    }
}

exports.getUsers = async (req,res) =>{
    try{
        const user = await userModel.findById(req.body.userId);
        const users = user.isPrincipal && await userModel.find({$or : [{status : "teacher"},{status: "student"}],class: req.body.class}) || user.status === "teacher" && await userModel.find({status:"student",class:req.body.class}) || user.status === "student" && await userModel.find({status:"student",class:req.body.class})
        res.status(200).json(users)
    }catch(err){
        res.status(400).json({message:err.message})
    }
}

exports.AllTeachersAndStudents = async (req,res) =>{
    try{
        const user = await userModel.findById(req.params.id);
        if(user.isPrincipal){
            const users = user.isPrincipal && await userModel.find({$or : [{status : "teacher"},{status: "student"}]})
            res.status(200).json(users)
        }else{
        res.status(400).json({message:"you are unauthorized for this action"})
        }
    }catch(err){
        res.status(400).json({message:err.message})
    }
}

exports.getClassStudents = async (req,res) =>{
    try{
            const users = await userModel.find({classAt:req.params.classNo})
        res.status(200).json(users)
    }catch(err){
        res.status(400).json({message:err.message})
    }
}

