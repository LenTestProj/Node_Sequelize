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
db.userContacts = require("./userContacts")(sequelize, DataTypes, db.user, db.contact)

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
db.user.hasMany(db.contact)
db.contact.belongsTo(db.user);

//MANY-TO-MANY
// db.user.belongsToMany(db.contact, {through:"user_contacts"});
// db.contact.belongsToMany(db.user, {through:"user_contacts"})

// db.user.belongsToMany(db.contact, {through:db.userContacts});
// db.contact.belongsToMany(db.user, {through:db.userContacts})

const syncDatabse=async()=>{
    try {
        await db.sequelize.sync(); 
    } catch (error) {
        console.log("Error occured while syncing database: ",error);
    }
}

syncDatabse()

module.exports = db;

