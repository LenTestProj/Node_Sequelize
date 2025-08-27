const {Sequelize, DataTypes, Model} = require("sequelize");
const tag_taggable = require("./tag_taggable");
const sequelize = new Sequelize("employee_db","root","root",{
    host:"localhost",
    dialect:'mysql',
    logging:false,
    pool:{
        min:0,
        max:5,
        acquire:30000,
        idle:10000
    }
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
// db.user.hasMany(db.contact,{foreignKey: "userId"});
// db.contactUser = db.contact.belongsTo(db.user,{foreignKey: "userId" ,as:"users"});

db.user.hasMany(db.contact);
db.contactUser = db.contact.belongsTo(db.user);

db.contact.hasMany(db.education);
db.education.belongsTo(db.contact);

//MANY-TO-MANY 
// db.user.belongsToMany(db.contact, {through:"user_contacts"});
// db.contact.belongsToMany(db.user, {through:"user_contacts"})

// db.user.belongsToMany(db.contact, {through:db.userContacts});
// db.contact.belongsToMany(db.user, {through:db.userContacts})

//MANY-TO-MANY-TO-MANY
db.player = sequelize.define("Player", {username: DataTypes.STRING});
db.team = sequelize.define("Team", {name: DataTypes.STRING});
db.game = sequelize.define("Game", {name: DataTypes.STRING});

db.gameTeam = sequelize.define("GameTeam",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    }
});
db.team.belongsToMany(db.game, {through: db.gameTeam});
db.game.belongsToMany(db.team, {through: db.gameTeam});
//alternative
db.gameTeam.belongsTo(db.game);
db.gameTeam.belongsTo(db.team);
db.game.hasMany(db.gameTeam);
db.team.hasMany(db.gameTeam);

db.playerGameTeam = sequelize.define("PlayerGameTeam", {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    }
});
db.player.belongsToMany(db.gameTeam, {through:db.playerGameTeam});
db.gameTeam.belongsToMany(db.player, {through:db.playerGameTeam});
//alternative
db.playerGameTeam.belongsTo(db.player);
db.playerGameTeam.belongsTo(db.gameTeam);
db.player.hasMany(db.playerGameTeam);
db.gameTeam.hasMany(db.playerGameTeam);

//polymorphic associations
db.image = require("./image")(sequelize, DataTypes,Model);
db.video = require("./video")(sequelize, DataTypes,Model);
db.comment = require("./comment")(sequelize, DataTypes,Model);
db.tag = require("./tag.js")(sequelize, DataTypes,Model);
db.tagTaggable = require("./tag_taggable")(sequelize, DataTypes,Model);

db.image.hasMany(db.comment, {
    foreignKey: 'commentableId',
    constraints:false,
    scope:{
        commentableType:'image'
    }
});
db.comment.belongsTo(db.image, {foreignKey:'commentableId', constraints:false});

db.video.hasMany(db.comment, {
    foreignKey: 'commentableId',
    constraints:false,
    scope:{
        commentableType:'video'
    }
});
db.comment.belongsTo(db.video, {foreignKey:'commentableId', constraints:false});



//many to many polymorphic associations
db.image.belongsToMany(db.tag, {
    through:{
        model:db.tagTaggable,
        unique:false,
        scope:{
            taggableType:'image'
        },
    },
    foreignKey:'taggableId',
    constraints:false
});
db.video.belongsToMany(db.tag, {
    through:{
        model:db.tagTaggable,
        unique:false,
        scope:{
            taggableType:'video'
        },
    },
    foreignKey:'taggableId',
    constraints:false
});
db.tag.belongsToMany(db.image,{
    through:{
        model:db.tagTaggable,
        unique:false
    },
    foreignKey:'tagId',
    constraints: false
})
db.tag.belongsToMany(db.video,{
    through:{
        model:db.tagTaggable,
        unique:false
    },
    foreignKey:'tagId',
    constraints: false
})

const syncDatabse=async()=>{
    try {
        await db.sequelize.sync();  
        // await sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
        // await sequelize.sync({ force: true });
        // await sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
    } catch (error) {
        console.log("Error occured while syncing database: ",error);
    }
}

syncDatabse()

module.exports = db;

