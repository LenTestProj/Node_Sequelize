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

db.contact = require("./contact")(sequelize, DataTypes);
db.user = require("./user")(sequelize,DataTypes);
db.sequelize.sync();

module.exports = db;

