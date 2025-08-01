module.exports = (sequelize, DataTypes)=>{
    const Education = sequelize.define('Educations',{
        class_name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        grade:{
            type:DataTypes.STRING,
            // allowNull:false defaults to true
        },
        passing_year:{
            type:DataTypes.STRING
        }
        // user_Id:{
        //     type:DataTypes.INTEGER
        // }
    },{
        //other optional options go here
    });
    return Education;
} 

