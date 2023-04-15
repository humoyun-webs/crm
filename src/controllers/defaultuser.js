const Joi = require("joi")
const Users = require("../models/users")

const addplan = async(req,res) =>{
const {title,desc} = req.body

const scheme  = Joi.object({
    title:Joi.string().required(),
    desc:Joi.string().required()
})

const {error} = scheme.validate({title,desc})


if(error){
return res.status(404).json({message:"title or description incorrect"})
}
}

module.exports = {
    addplan
}