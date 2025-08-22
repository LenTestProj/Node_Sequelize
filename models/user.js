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
        underscored:true,
        //other model options go here
        // modelName:"User"
        tableName:"users",
        // timestamps:false,
        // createdAt:false,
        // updatedAt:true
        paranoid:true,
        deletedAt:"soft_delete",
        hooks:{
            // beforeValidate:(user,options)=>{
            //     user.firstName="Happy"
            //     console.log("before validate ", user.firstName);
            // },
            // afterValidate:(user,options)=>{
            //     user.status=1;
            //     console.log("after validate ",user.firstName);
            // }
        }
    });

    // User.addHook("beforeValidate",(user,options)=>{
    //     user.lastName="Singha";
    // })

    // User.addHook("afterValidate", (user,options)=>{
    //     user.status=1;
    // })

    User.beforeValidate(async(user,options)=>{
        user.lastName="singha";
    })

    User.afterValidate(async(user,options)=>{
        user.status=1;
    })

    return User;
}
