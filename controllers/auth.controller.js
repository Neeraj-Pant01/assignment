const userModel = require("../models/user.model");

exports.Register = async (req, res, next) => {
    try {
        const admin = await userModel.findById(req.body.userId)
        if (admin.isPrincipal) {
            const user = await userModel.findOne({ email: req.body.email })
            if (user) return res.status(400).json({ message: "user already exists with this email !" })
            const newUser = new userModel(req.body)
            await newUser.save()
            res.status(200).json(newUser)
        } else {
            return res.status(400).json({ message: "only principal can create the accounts !" })
        }
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

exports.login = async (req, res, next) => {
    try {
        const user = await userModel.findOne({ email: req.body.email })
        if (!user) return res.status(400).json({ message: "no user found with this email !" })
        if (req.body.password === user.password) {
            const { password, ...others } = user._doc;
            res.status(200).json(others)
        } else {
            res.status(400).json({ message: err.message })
        }
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}