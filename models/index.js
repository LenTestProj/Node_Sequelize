const {Sequelize} = require("sequelize");

const sequelize = new Sequelize("employee_db","root","root",{
    host:"localhost",
    dialect:'mysql'
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
db.Sequelize = sequelize;
db.

module.exports = sequelize;

