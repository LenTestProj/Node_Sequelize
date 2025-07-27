const {Sequelize, DataTypes} = require("sequelize");
const sequelize = require("./index");

const Contact = sequelize.define('Contacts',{
    permanant_address:{
        type:DataTypes.STRING,
        allowNull:false
    },
    current_address:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    //other optional options go here
});

module.exports = Contact