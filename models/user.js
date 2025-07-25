const {Sequelize, DataTypes} = require("sequelize");
const sequelize = require("./index");

const User = sequelize.define("User",{
    //Models attributions are defined here
    firstName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    lastName:{
        type: DataTypes.STRING,
        defaultValue:'Jones'
    }
},{
    //other model options go here
    // modelName:"User"
    tableName:"users",
    // timestamps:false,
    // createdAt:false,
    // updatedAt:true
});

module.exports = User