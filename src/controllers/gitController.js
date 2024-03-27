const gitServices = require('../services/gitServices')

const getOrSaveUser = async(req,res)=>{
    try{
        // console.log("called cntrl")
        const userName = req.params.username
    
        const response = await gitServices.getOrSaveUser(userName)
        res.status(response.statusCode).json(response.user)

    }catch(e){
        res.status(500).json({message:e.message})

    }

}
const findMutualFollowers= async(req,res)=>{
    try{
        
        const userName = req.params.username
        const response = await gitServices.findMutualFollowers(userName)
        if(!response){
            res.status(404).json({message:"User Not Found"})
        }
        res.status(200).json(response.friends)

    }catch(e){
        res.status(500).json({message:e.message})
        
    }

}
const searchByParameters= async(req,res)=>{
    try{
        const {userName,location}= req.query
        const query ={}
        if(userName) query.userName = userName
        if(location) query.location = location

        const users = await gitServices.searchByParameters(query)
        console.log(users)
        if(users.length ===0){
            return res.status(404).json({ message: "No users found matching the provided criteria." });
        }
        res.status(200).json(users)


    }catch(e){
        res.status(500).json({message:e.message})
        
    }

}
const softDeleted= async(req,res)=>{
    try{
        const userName = req.params.username
        const deleted = await gitServices.softDeleted(userName)
        if(!deleted) res.status(404).json({message:'User not found'})
        res.status(200).json({message:"User record deleted(soft) successfully !"})
    }catch(e){
        res.status(500).json({message:e.message})
        
    }

}
const updateUser= async(req,res)=>{
    try{
        const data = req.body
        const userName = req.params.username

        const updated = await gitServices.updateUser(data,userName)
        if(!updated) res.status(404).json({message:'User not found'})
        res.status(200).json({ message: "User details updated successfully.", user: updated })

    }catch(e){
        res.status(500).json({message:e.message})
        
    }

}
const getListOfUsers= async(req,res)=>{
    try{
        const sortBy = req.query.sortBy || 'userName'; 
        const sortOrder = req.query.sortOrder || 'asc'; 
        const validFields = ['userName', 'numberOfPublicRepos', 'followers']; 
        if (!validFields.includes(sortBy)) {
            return res.status(400).json({ message: 'Invalid sorting field' });
        }
        if (sortOrder !== 'asc' && sortOrder !== 'desc') {
            return res.status(400).json({ message: 'Invalid sorting order' });
        }
        console.log(sortBy,sortOrder)
        const list = await gitServices.getListOfUsers(sortBy,sortOrder)
        if(list.length ===0){
            res.status(404).json({message:"Not Found"})
        }
        res.status(200).json(list)
    }catch(e){
        res.status(500).json({message:e.message})
        
    }

}
module.exports={getOrSaveUser,findMutualFollowers,searchByParameters,softDeleted,updateUser,getListOfUsers}