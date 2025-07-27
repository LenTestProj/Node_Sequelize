const db = require("../models")
const User = db.user;

const addUser = async (req,res) =>{
    // const newUser = User.build({firstName:'jane'});
    // await newUser.save();
    const newUser = await User.create({firstName:"Robin",lastName:"Singh"});
    console.log(newUser.name);
    
    //using nset method after create method

    //update method
    // newUser.set({firstName:"Anuj", lastName:"Naik"});
    await newUser.update({firstName:"Alan",lastName:"Bond"});
    await newUser.save();

    console.log("New User was saved to the database");

    //delete the user
    await newUser.destroy();

    console.log(newUser.toJSON());
    res.status(200).json(newUser.toJSON());
}

const getUsers = async(req,res)=>{
    try {
        const users = await User.findAll({});
        res.status(200).json({data:users})
    } catch (error) {
        res.status(400).send({message:error.message,error:error});
    }
}

const getUser = async(req,res)=>{
    try {
        const user = await User.findOne({
            where:{
                id:req.params.id
            }
        });
        res.status(200).json({data:user})
    } catch (error) {
        res.status(400).send({message:error.message,error:error});
    }
}

const postUser = async (req,res)=>{
    try {
        const {firstName,lastName}  =req.body;
        const data = await User.build({firstName,lastName});
        const savedData = await data.save();
        res.status(200).json({data:savedData});
    } catch (error) {
        res.status(400).send({message:error.message,error:error}); 
    }
}

const postUsers = async(req,res)=>{
    try {
        const inputData = req.body;
        const data = await User.bulkCreate(inputData);
        res.status(200).json({data:data});
    } catch (error) {
        res.status(400).send({message:error.message,error:error});
    }
}

const deleteUser = async(req,res)=>{
    try {
        const data = await User.destroy({
            where:{
                id:req.params.id
            }
        });
        res.status(200).json({data:data});
    } catch (error) {
        res.status(400).send({message:error.message,error:error});   
    }
}

const patchUser = async (req,res)=>{
    try {
        const inputData = req.body;
        const data = await User.update(inputData,{
            where:{
                id:req.params.id
            }
        });
        res.status(200).json({data:data});
    } catch (error) {
        res.status(400).send({message:error.message,error:error});    
    }
}

module.exports={
    addUser,
    getUsers,
    getUser,
    postUser,
    postUsers,
    deleteUser,
    patchUser
}