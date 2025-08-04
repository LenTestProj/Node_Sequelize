const {Sequelize, DataTypes, Model} = require("sequelize");
const sequelize = new Sequelize("employee_db","root","root",{
    host:"localhost",
    dialect:'mysql',
    logging:false
});

const connectDB=async()=>{
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully")
    } catch (error) {
        console.log("Unable to connect to database: ",error);
    }
}

connectDB();

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user")(sequelize,DataTypes);
db.contact = require("./contact")(sequelize, DataTypes);
db.education = require("./education")(sequelize, DataTypes);
db.userContacts = require("./userContacts")(sequelize, DataTypes, db.user, db.contact)
db.customer = require("./customer")(sequelize, DataTypes);
db.profile = require("./profile")(sequelize, DataTypes);
// const User_Profile = sequelize.define("User_Profile",{
//     id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//     },
//     selfGranted:{type:DataTypes.BOOLEAN}
// }, {timestamps:false})

//GRANT
const Grant = sequelize.define("grant",{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    selfGranted:{type:DataTypes.BOOLEAN, defaultValue:false}
}, {timestamps:false});
db.grant = Grant;

db.customer.belongsToMany(db.profile,{through: Grant, uniqueKey:"my_custom_unique"} );
db.profile.belongsToMany(db.customer,{through:Grant} );


// db.customer.belongsToMany(db.profile,{through: Grant, uniqueKey:"my_custom_unique"} );
// db.profile.belongsToMany(db.customer,{through:Grant} );

//many to many alternative
// db.customer.hasMany(Grant);
// Grant.belongsTo(db.customer);

// db.profile.hasMany(Grant);
// Grant.belongsTo(db.profile);

// ---- ONE-TO-ONE ----------
// db.user.hasOne(db.contact, {
//     foreignKey:"user_id",
//     as:"contactDetails"
// });
// db.contact.belongsTo(db.user, {
//     foreignKey:"user_id",
//     as:"userDetails"
// });

//ONE-TO-MANY
// db.user.hasMany(db.contact, {
//     foreignKey:"user_id",
//     as:"contactDetails"
// })
//  db.contact.belongsTo(db.user, {
//     foreignKey:"user_id",
//     as:"userDetails"
// }); 
db.user.hasMany(db.contact,{foreignKey: "userId"});
db.contactUser = db.contact.belongsTo(db.user,{foreignKey: "userId" ,as:"users"});

db.contact.hasMany(db.education);
db.education.belongsTo(db.contact);

//MANY-TO-MANY
// db.user.belongsToMany(db.contact, {through:"user_contacts"});
// db.contact.belongsToMany(db.user, {through:"user_contacts"})

// db.user.belongsToMany(db.contact, {through:db.userContacts});
// db.contact.belongsToMany(db.user, {through:db.userContacts})

const syncDatabse=async()=>{
    try {
         await db.sequelize.sync(); 
        // await db.sequelize.sync({force:true}); 
    } catch (error) {
        console.log("Error occured while syncing database: ",error);
    }
}

syncDatabse()

module.exports = db;

