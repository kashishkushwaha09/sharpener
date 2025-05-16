const db=require('../utils/db-connection');
const User=require('../models/userModel')
// Retrieve all users from the database.
const retrieveEntries=async (req,res)=>{
 try {
    const users=await User.findAll();
    if(!users){
        res.status(404).send("student not found"); 
    }
     res.status(200).json({users});
 } catch (error) {
     console.log(error);
         res.status(500).json({
            message:"server error:-unable to retrieve data"
         });
 }
}
// Add a new user.
const addEntries=async (req,res)=>{
try {
    const {name,email,phone}=req.body;
     const user=await User.create({
        name,email,phone
     }) 
     res.status(201).send(`User with name ${name} successfully created`);
    } catch (error) {
        console.log(error);
         res.status(500).send("Server error:-unable to make an entry");
        
    }
}
const updateEntries=async (req,res)=>{
    try {
    const {id}=req.params;
    const {name,email,phone}=req.body;
    const user=await User.findByPk(id);
    if(!user){
        res.status(404).send("user not found");
    }
    if(name){
    user.name=name;
    }
    if(email){
        user.email=email;
    }
    if(phone){
        user.phone=phone;
    }
    await user.save();
    res.status(200).send("user has been updated");
 } catch (error) {
             console.log(err);
        res.status(500).send(err.message);
 }
}
const deleteEntry=async (req,res)=>{
     try {
        const {id}=req.params; 
        const user=await User.destroy({
            where:{
                id:id
            }
        })
        if(!user){
            res.status(404).send('User not found');
        }
        res.status(200).send(`user with id ${id} is deleted`);
    } catch (err) {
            console.log(err);
        res.status(500).send(err.message);
    }

}

module.exports={retrieveEntries,addEntries,updateEntries,deleteEntry};