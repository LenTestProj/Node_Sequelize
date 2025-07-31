module.exports = (sequelize, DataTypes, User, Contact)=>{
    const UserContacts = sequelize.define('User_Contacts',{
        UserId:{
            type:DataTypes.INTEGER,
            references:{
                model:User,
                key:"id"
            }
        },
        ContactId:{
            type:DataTypes.INTEGER,
            references:{
                model:Contact,
                key:"id"
            }
        },
        // user_id:{
        //     type:DataTypes.INTEGER
        // }
    },{
        //other optional options go here
    });
    return UserContacts;
}