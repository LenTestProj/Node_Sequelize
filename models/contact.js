module.exports = (sequelize, DataTypes)=>{
    const Contact = sequelize.define('Contacts',{
        permanant_address:{
            type:DataTypes.STRING,
            allowNull:false
        },
        current_address:{
            type:DataTypes.STRING,
            allowNull:false
        },
        userId:{
            type:DataTypes.INTEGER,
            allowNull:false
        }
    },{
        //other optional options go here
    });
    return Contact;
} 

