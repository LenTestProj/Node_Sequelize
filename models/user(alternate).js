const {DataTypes,Model} = require("sequelize");
const sequelize = require("./index");

class User extends Model{}

User.init({
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
    sequelize,
    tableName:"users",
    // timestamps:false,
    // createdAt:false,
    // updatedAt:true
});

module.exports = User;