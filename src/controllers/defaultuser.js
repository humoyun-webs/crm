const Joi = require("joi")
const Dusers = require("../models/defoultusertodo")

const addplan = async(req,res) =>{
    const {title, desc, start, end} = req.body;

    const scheme = Joi.object({
     title:Joi.string().min(5).max(32).required(),
     desc:Joi.string().required(),
     start:Joi.number().required(),
     end:Joi.number().required()
    })
    const {error} = scheme.validate({title, desc,start,end})
     
    if(error) return res.status(403).json({message:error.message})

    const newProduct = await Dusers.planadd(title, desc)
     return res.status(201).json({message:"User created"})
}


const getplans = async(req,res) =>{
    try{

        // const {} = req.body
        const products = await Dusers.allplans()
             
        
        return res.status(200).json(products)
    
        
    }catch(error){
     console.log(error.message);
    }
}


const deleteplan = async(req,res) =>{
    const {id} = req.params;
    if(!id){
     return res.status(404).json({message:"Plan is not found"})
    }
    const plan = await Dusers.deleteplan(id)
    res.status(200).json({message:"successfull deleted", plan})
  
}

const editplan = async (req,res) =>{
    const {title, desc, start, end} = req.body;
    const {id} = req.params;
    const scheme = Joi.object({
        title:Joi.string().required(),
        desc:Joi.string().min(5).max(32).required(),
        start:Joi.number().required(),
        end:Joi.number().required()
       })
       const {error} = scheme.validate({title, desc, name, status})
        
       if(error) return res.status(403).json({message:error.message})
       
    const plan = await (title, desc, start,end,id)

    res.status(201).json({message:"edit success"})
}

module.exports = {
    addplan,
    editplan,
    deleteplan,
    getplans
}