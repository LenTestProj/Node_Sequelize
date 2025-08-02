module.exports = (sequelize, DataTypes)=>{
    const Customer = sequelize.define('Customers',{
        username:DataTypes.STRING,
        points:DataTypes.INTEGER
    });
    return Customer;
} 
