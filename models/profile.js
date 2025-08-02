module.exports = (sequelize, DataTypes)=>{
    const Profile = sequelize.define('Profiles',{
        username:DataTypes.STRING,
        points:DataTypes.INTEGER
    },{
       timestamps:true
    });
    return Profile;
} 