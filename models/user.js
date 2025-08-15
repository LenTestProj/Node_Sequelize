const { logger } = require("sequelize/lib/utils/logger");

module.exports = (sequelize, DataTypes) =>{
    const User = sequelize.define("User",{
        //Models attributions are defined here
        firstName:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true,
            validate:{
                isAlpha:true,
            },
            get(){
                const rawValue = this.getDataValue("firstName");
                return rawValue ? rawValue.toUpperCase():null
            },
            set(value){
               this.setDataValue("firstName", value.toLowerCase()) 
            }
        },
        lastName:{
            type: DataTypes.STRING,
            defaultValue:'Jones',
            get(){
                const rawValue = this.getDataValue("lastName");
                return rawValue ? rawValue.toUpperCase():null
            },
            validate:{
                isLowercase:true
            }
        },
        fullName:{
            type:DataTypes.VIRTUAL,
            get(){
                return `${this.firstName} ${this.lastName}`
            }
        },
        status:DataTypes.INTEGER
    },{
        //other model options go here
        // modelName:"User"
        tableName:"users",
        // timestamps:false,
        // createdAt:false,
        // updatedAt:true
        paranoid:true,
        deletedAt:"soft_delete",
    });
    return User;
}
