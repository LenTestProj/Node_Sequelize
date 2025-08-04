module.exports = (sequelize, DataTypes)=>{
    const Profile = sequelize.define('Profiles',{
        name:DataTypes.STRING,
    },{
       timestamps:true
    });
    return Profile;
} 