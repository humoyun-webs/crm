require("dotenv").config()
const Joi = require("joi")
const Users = require("../models/users")
const bcrypt = require("bcrypt");
const { sign } = require("../utils/jwt");



const loginC = async (req, res) =>{
    try{
        const {email, password} = req.body;
        const scheme = Joi.object({
            email:Joi.string().email().required(),
            password:Joi.string().required()
        })
        const { error} = scheme.validate({email,password})
        if(error){
            return res.status(400).json({message:error.message})
        }
        const user = await Users.findbyemail(email)

        if(!user){
            return res.status(404).json({message:"Incorrect email or password"});
        }
        
        const verify = await bcrypt.compare(password, user.user_password)

        if(!verify){
            return res.status(403).json({message:"Incorrect email or password"})
        }
      console.log(user);
        const token = sign({id:user.user_id, role:user.user_role});
          
        res.status(200).json({message:"Success" , token} )
    }catch(error){
        return res.status(401).json({message:"Permission denied"})
    }
}

const Registratisya = async (req, res) =>{
   try{
    const {name, email, password} = req.body;

    const scheme = Joi.object({
     name:Joi.string().required(),
     email:Joi.string().email().required(),
     password:Joi.string().required()
    })
   
    const {error} = scheme.validate({name, email, password})
     
    if(error) return res.status(403).json({message:error.message})

    const user = await Users.findbyemail(email)
    console.log(user);
    if(user){
        return res.status(400).json({message:"User already exists"})
    }
    // const role = user.user_role = "defaultUser";
    const hashedpass = await bcrypt.hash(password, 12);
    const newUser = await Users.register(name, email, hashedpass)

    const token = sign({id:newUser.user_id, role:newUser.user_role});
        
     return res.status(201).json({message:"Successfull registration", token,newUser})
   }catch(error){
    return res.status(401).json({message:"Permision denied"})
    // console.log(error.message);
   }
}

const getAllUser = async (req, res) =>{
    try{
        const users = await Users.allusers()

        res.status(200).json(users)
    
        
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
   res.status(200).json({message:"successfull updated", user})
}
module.exports = {
    loginC,
    Registratisya,
    getAllUser,
    deleteUsers
}