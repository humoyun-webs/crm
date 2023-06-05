const Joi = require("joi")
require("dotenv").config()
const Dusers = require("../models/defoultusertodo")
// const {verify} = require("../utils/jwt")
const jwt = require("jsonwebtoken")


const addplan = async(req,res) =>{
    try{
        const token = await (req.headers["authorization"]).split(' ')[1];
        const {title, desc, end} = req.body;
        
        const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY, )
       
        const id = decoded.id;
        console.log(id);

        const scheme = Joi.object({
        
         title:Joi.string().min(5).max(32).required(),
         desc:Joi.string().required(),
         end:Joi.number().required()
        })

        const {error} = scheme.validate({title, desc,end})
         
        if(error) return res.status(403).json({message:error.message})
        

        const newPlan = await Dusers.planadd(title, desc,end, id)

        return res.status(201).json({message:"Plan created",new:{newPlan}})

       
    }catch(error){

console.log(error.message);
    }
};

const getplans = async(req,res) =>{
    try{

        const token = await (req.headers["authorization"]).split(' ')[1];
        const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY, )
        const id = decoded.id
        const plans = await Dusers.allplans(id);
        
    
        //  const decodedToken = await jwt.decode(token)
        //  const user_id = decodedToken.id;
        //  console.log(user_id);
        
    return res.status(200).json(plans)
        
        
    }catch(error){
     console.log(error.message);
    }
};


const deleteplan = async(req,res) =>{
    const {id} = req.params;
    if(!id){
     return res.status(404).json({message:"Plan is not found"})
    }
    const plan = await Dusers.deleteplan(id)
    res.status(200).json({message:"successfull deleted", plan}) 
};


const editplan = async (req,res) =>{
    const {title, desc, start, end} = req.body;
    const {id} = req.params;
    const scheme = Joi.object({
        title:Joi.string().required(),
        desc:Joi.string().min(5).max(32).required(),
        start:Joi.number().required(),
        end:Joi.number().required()
       })
       const {error} = scheme.validate({title, desc, start, end})
        
       if(error) return res.status(403).json({message:error.message})
       
    const plan = await Dusers.updateplan(title, desc, start,end,id)

    return res.status(201).json({message:"edit success"})
    };


module.exports = {
    addplan,
    editplan,
    deleteplan,
    getplans
}