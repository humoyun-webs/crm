const Joi = require("joi")
const Users = require("../models/users.js")
const bcrypt = require("bcrypt")

const addUser = async (req, res) =>{
    const {email,password,name,role} = req.body;
    const scheme = Joi.object({
       name:Joi.string().min(1).max(32).required(),
       email:Joi.string().email().required(),
       password:Joi.string().required(),
       role:Joi.string().valid("superadmin","director","teamlead", "user").required()
    })
    
    const{error} = scheme.validate({email,password,name,role})

    if(error){
        return res.status(400).json({message:error.message})
    }
    const user = await Users.findbyemail(email)
    if(user){
        return res.status(400).json({message:"User already exists"})
    }
    const hashpassword = await  bcrypt.hash(password, 12)

    const newUser = await Users.create(email,hashpassword,role,name)
    res.status(200).json({message:"success",newUser});
}
const getAllUser = async (req, res) =>{
    try{
        const users = await Users.allusers()
        
        return res.status(200).json(users);
    
    }catch(error){
    console.log(error.message);
    }
}

const deleteUsers = async (req,res) =>{
    const {id} = req.params;
    if(!id){
     return res.status(404).json({message:"user is not found"})
    }
    const user = await Users.deleteUser(id)
    res.status(200).json({message:"successfull deleted", user})
 }
module.exports = {
    addUser,
    deleteUsers,
    getAllUser
}