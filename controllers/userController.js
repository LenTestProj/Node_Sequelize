const db = require("../models");
const {Sequelize,Op, QueryTypes} = require("sequelize");
const User = db.user;
const Contact = db.contact;
const Education = db.education;
const Grant = db.grant;

const addUser = async (req,res) =>{
    // const newUser = User.build({firstName:'jane'});
    // await newUser.save();
    const newUser = await User.create({firstName:"Robin",lastName:"Singh"});
    console.log(newUser.name);
    
    //using nset method after create method

    //update method
    // newUser.set({firstName:"Anuj", lastName:"Naik"});
    await newUser.update({firstName:"Alan",lastName:"Bond"});
    await newUser.save();

    console.log("New User was saved to the database");

    //delete the user
    await newUser.destroy();

    console.log(newUser.toJSON());
    res.status(200).json(newUser.toJSON());
}

const getUsers = async(req,res)=>{
    try {
        const users = await User.findAll({});
        res.status(200).json({data:users})
    } catch (error) {
        res.status(400).send({message:error.message,error:error});
    }
}

const getUser = async(req,res)=>{
    try {
        const user = await User.findOne({
            where:{
                id:req.params.id
            }
        });
        res.status(200).json({data:user})
    } catch (error) {
        res.status(400).send({message:error.message,error:error});
    }
}

const postUser = async (req,res)=>{
    try {
        const {firstName,lastName}  =req.body;
        const data = await User.build({firstName,lastName});
        const savedData = await data.save();
        res.status(200).json({data:savedData});
    } catch (error) {
        res.status(400).send({message:error.message,error:error}); 
    }
}

const postUsers = async(req,res)=>{
    try {
        const inputData = req.body;
        const data = await User.bulkCreate(inputData);
        res.status(200).json({data:data});
    } catch (error) {
        res.status(400).send({message:error.message,error:error});
    }
}

const deleteUser = async(req,res)=>{
    try {
        const data = await User.destroy({
            where:{
                id:req.params.id
            }
        });
        res.status(200).json({data:data});
    } catch (error) {
        res.status(400).send({message:error.message,error:error});   
    }
}

const patchUser = async (req,res)=>{
    try {
        const inputData = req.body;
        const data = await User.update(inputData,{
            where:{
                id:req.params.id
            }
        });
        res.status(200).json({data:data});
    } catch (error) {
        res.status(400).send({message:error.message,error:error});    
    }
}

const queryUser = async (req,res)=>{
    try {
        //COUNT function obn db direectly
        const data = await User.count({
            where:{
                id:{
                    [Op.gt]:1
                }
            }
        })

        //SORT BY DESC, GROUP BY and offset and limit
        // const data = await User.findAll({
        //     attributes:[
        //         "firstName",
        //         [Sequelize.fn("COUNT",Sequelize.col("id")),'count'],
        //         [Sequelize.fn("MAX", Sequelize.col("id")), "lastestId"]
        //     ],            
        //     group:"firstName",
        //     order:[[Sequelize.fn("MAX",Sequelize.col("id")),"DESC"]],
        //     offset:1,
        //     limit:1
        // })

        //SORT BY DESC and GROUP BY
        // const data = await User.findAll({
        //     // order:[
        //     //     ['id','DESC']
        //     // ],
        //     attributes:[
        //         "firstName",
        //         [Sequelize.fn("COUNT",Sequelize.col("id")),'count'],
        //         [Sequelize.fn("MAX", Sequelize.col("id")), "lastestId"]
        //     ],            
        //     group:"firstName",
        //     order:[[Sequelize.fn("MAX",Sequelize.col("id")),"DESC"]]
        // })

        //Operand
        // const data = await User.findAll({
        //     where:{
        //         [Op.and]:[
        //             {
        //                  id:{
        //                     [Op.eq]:1
        //                 }
        //             },
        //             {
        //                 firstName:{
        //                     [Op.eq]:"alice123"
        //                 }
        //             }    
        //         ] 
        //     }
        // })

        //----- exclude certain fieilds -----
        // const data = await User.findAll({
        //     attributes: {
        //         exclude:["lastName","id"]
        //     }
        // })

        // ----- fetch only selected feilds adn add alias name -----
        // const data = await User.findAll({
        //     attributes:["id",["firstName","fName"]]
        // })
        
        // ----- fetch only selected feilds ---------
        // const data = await User.findAll({
        //     attributes:["id","firstName"]
        // })

        //----- ONLY ADD SPECIFIC FIELDS ----------
        // const data = await User.create({
        //     firstName:"alice123",
        //     lastName:"anderson"
        // },{
        //     fields:["firstName"]
        // })
        res.status(200).json({data:data});
    } catch (error) {
        res.status(400).send({message:error.message,error:error});    
    }
}

const findersUsers = async (req,res)=>{
    try {
        //find and count
        const {count,rows} = await User.findAndCountAll({
            where:{firstName:{
                [Op.startsWith]:"alic"
            }}
        })
      

        //find or create
        // const [user,created] = await User.findOrCreate({
        //     where:{firstName:"alicia"},
        //     defaults:{
        //         lastName: 'Keys'
        //     }
        // })

        //Find by Pk
        // const data = await User.findByPk(1);
        res.status(200).json({data:rows, count:count});
    } catch (error) {
        res.status(400).send({message:error.message,error:error});    
    }
}

const getSetVirtual =async(req,res)=>{
    try {
        //find and count
        const {count,rows} = await User.findAndCountAll({
            where:{firstName:{
                [Op.startsWith]:"alic"
            }}
        })
      
        res.status(200).json({data:rows, count:count});
    } catch (error) {
        res.status(400).send({message:error.message,error:error});    
    }
}

const validateUser = async(req,res)=>{
    const data={}, messages={};
    try {
        const data = await User.create({
            firstName:"Amar12",
            lastName:"Joshi"
        });
        res.status(200).json({data:data});
    } catch (e) {
        // console.log(e.errors);
        let message;
        e.errors.forEach(error=>{
            switch(error.validatorKey){
                case 'isAlpha':
                    message = 'Only alphabets are allowed';
                    break;
                case "isLowercase":
                    message = 'Only Lower cases are allowed';
                    break;    
            }
            messages[error.path]=message;
        })
        res.status(400).send({messages:messages,error:e});       
    }
}

const rawQueries=async(req,res)=>{
    try {
        //Bind keywords
        const users = await db.sequelize.query("SELECT * from users WHERE firstName=$fName AND lastName=$lName",{
            bind:{fName:"Joel", lName:"Garner"},
            type:QueryTypes.SELECT
        })

        //fetch IN keywords
        // const users = await db.sequelize.query("SELECT * from users WHERE lastName LIKE ? AND firstName IN ('Joel','Chris')",{
        //     replacements:["Gar%"],
        //     type:QueryTypes.SELECT
        // });

        //fetch placeholders
        // const users = await db.sequelize.query("SELECT * from users WHERE lastName LIKE ? AND (firstName like ? OR firstName like ?)",{
        //     replacements:["Gar%","Jo%", "Chr%"],
        //     type:QueryTypes.SELECT
        // });

        //basic fetch operations
        // const users = await db.sequelize.query("SELECT * from users",{
        //     type:QueryTypes.SELECT,
        //     model:User, //optional
        //     mapToModel:true //optional
        // });  
        res.status(200).json({data:users});  
    } catch (error) {
        res.status(400).send({message:error.message,error:error});    
    }
}

const oneToOneUser=async(req,res)=>{
    try {
        // const data = await User.create({firstName:"Gurmeet", lastName:"singh"});
        // if(data && data.id){
        //     await Contact.create({
        //         permanant_address:"abc",
        //         current_address:"xyz",
        //         user_id:data.id
        //     })
        // }

        //fetchinig users and contacts foreign key
        // const data = await User.findAll({
        //     attributes:["firstName", "lastName"],
        //     include:[{
        //         model:Contact,
        //         as:"contactDetails",
        //         attributes:["permanant_address", "current_address"]
        //     }],
        //     where:{id:{
        //         [Op.gt]:1
        //     }}
        // });

        //fetching contacts
        const data = await Contact.findAll({
            attributes:["permanant_address", "current_address"],
            include:[{
                model:User,
                as:"userDetails",
                attributes:["firstName", "lastName"],
            }],
            where:{id:{
                [Op.gt]:1
            }}
        });
        res.status(200).json({data:data}); 
    } catch (error) {
        res.status(400).send({message:error.message,error:error});     
    }
}

const oneToManyUser = async(req,res)=>{
    try {
        // const data = await Contact.create({permanant_address:"Gurugram", current_address:"Meerut", user_id:1});
        // fetching users and contacts foreign key
        // const data = await User.findAll({
        //     attributes:["firstName", "lastName"],
        //     include:[{
        //         model:Contact,
        //         as:"contactDetails",
        //         attributes:["permanant_address", "current_address"]
        //     }],
        //     where:{id:{
        //         [Op.gt]:1
        //     }}
        // });

        //fetching contacts 
        const data = await Contact.findAll({
            attributes:["permanant_address", "current_address"],
            include:[{
                model:User,
                as:"userDetails",
                attributes:["firstName", "lastName"],
            }],
            where:{id:{
                [Op.gt]:1
            }}
        });
        res.status(200).json({data:data}); 
    } catch (error) {
        res.status(400).send({message:error.message,error:error});    
    }
}

const manyToManyUser = async(req,res)=>{
    try {
        // const data = await User.create({firstName:"arun", lastName:"gupta"});
        // if(data && data.id){
        //     await Contact.create({
        //         permanant_address:"noida",
        //         current_address:"hapur",
        //     })
        // }  

        //fetching contacts
        // const data = await Contact.findAll({
        //     attributes:["permanant_address", "current_address"],
        //     include:[{
        //         model:User,
        //         attributes:["firstName", "lastName"],
        //     }],
        //     where:{id:{
        //         [Op.gt]:1
        //     }}
        // }); 

        //fetching users
        const data = await User.findAll({
            attributes:["firstName", "lastName"],
            include:[{
                model:Contact,
                attributes:["permanant_address", "current_address"]
            }],
            where:{id:{
                [Op.gt]:1
            }}
        });
        res.status(200).json({data:data}); 
    } catch (error) {
        res.status(400).send({message:error.message,error:error});    
    }
} 

const paranoidUser = async(req,res)=>{
    try {
        // const data = await User.create({firstName:"shyam", lastName:"kumar"});

        //soft delete for paranoid table User
        // const data = await User.destroy({
        //     where:{
        //         id:3
        //     },
        //     // force:true //hard delete
        // });

        //restore the soft deleted entry
        // const data  = await User.restore({
        //     where:{
        //         id:3
        //     }
        // })

        //fetch the paranoid records
        const data = await User.findAll({paranoid:false})
        // const data = await User.findAll({})
        res.status(200).json({data:data});     
    } catch (error) {
        res.status(400).send({message:error.message,error:error});        
    }
}

const loadingUser = async(req,res)=>{
    try {
        // const data = await User.create({firstName:"Arun", lastName:"kumar"});
        // if(data && data.id){
        //     await Contact.create({
        //         permanant_address:"noida",
        //         current_address:"hapur",
        //         UserId:data.id
        //     })
        // }

        //EAGER LOADING
        // const data = await User.findOne({
        //     where:{
        //         id:2
        //     },
        //     include:Contact
        // });

        //LAZY LOADING
        const data = await User.findAll({
            where:{
                id:{
                    [Op.gte]:1
                }
            }
        });
        let contactDataArray=[];
        for(const userData of data){
            const _contactData = await userData.getContacts();
            contactDataArray.push(_contactData);
        }
        
        // const contactData = await data.getContacts()
        res.status(200).json({data:data, contactData:contactDataArray});
    } catch (error) {
        res.status(400).send({message:error.message,error:error});     
    }
}

const eagerUser = async(req,res)=>{
    try {
        const data = await User.findAll({
            include:{
                model:Contact,
                include:{
                    model:Education,
                    where:{
                        id:1
                    }
                },
                where:{
                    id:2
                }
            },
            where:{
                id:{
                    [Op.gt]:1
                }
            }     
        });
        // const data = await User.findAll({
        //     include:[{
        //         model:Contact,
        //         required:false, //left inner joiin bu default left outer join
        //         right:true
        //     },{
        //         model:Education
        //     }],
        //     where:{
        //         id:{
        //             [Op.gt]:1
        //         }
        //     }     
        // });
        res.status(200).json({data:data})    
    } catch (error) {
        res.status(400).send({message:error.message,error:error});         
    }
}

const creatorUser=async(req,res)=>{
    try {
        // const data = await User.create({firstName:"arun", lastName:"gumar"});
        // if(data && data.id){
        //     await Contact.create({
        //         permanant_address:"noida",
        //         current_address:"hapur",
        //         UserId:data.id
        //     })
        // }

        //BULK CREATE EXAMPLE
        // await Contact.bulkCreate([{
        //     permanant_address:"abc",
        //     current_address:"def",
        //     users:{
        //         firstName:"shayam",
        //         lastName:"kumar"
        //     }
        // },{
        //     permanant_address:"mno",
        //     current_address:"xyz",
        //     users:{
        //         firstName:"mohan",
        //         lastName:"kumar"
        //     } 
        // }],{
        //     include:[db.contactUser]
        // })

        //CREATE EXAMPLE
        await Contact.create({
            permanant_address:"abc",
            current_address:"def",
            users:{
                firstName:"suraj",
                lastName:"kumar"
            }
        },{
            include:[db.contactUser]
        })
        const data = await User.findAll({
            include:{
                model:Contact
            }
        })
        res.status(200).json({data:data});
    } catch (error) {
        res.status(400).send({message:error.message,error:error});    
    }    
}

const mnAssociationsUser=async(req,res)=>{
    try {
        //EAGER LOADING
        // const customer = await db.customer.create({
        //     username:"p4dm4",
        //     points:500,
        //     Profiles:[{
        //         name:"King",
        //         User_Profile:{
        //             selfGranted:true
        //         }
        //     }]
        // },{
        //     include:db.profile
        // })

        // LAZY LOADING
        // const customer = await db.customer.create({username:"p4dm3", points:1000});
        // const profile = await db.profile.create({name:"Queen"});
        // await customer.addProfile(profile, {through: {selfGranted:false}});

        const result = await db.customer.findOne({
            where:{username:"p4dm4"},
            include:db.profile
        });
        res.status(200).json({data:result});
    } catch (error) {
        res.status(400).send({message:error.message,error:error});
    }
}

const mnAssociationsUser2=async(req,res)=>{
    try {
        //EAGER LOADING
        // const customer = await db.customer.create({
        //     username:"p4dm3",
        //     points:1000,
        //     Profiles:[{
        //         name:"Queen",
        //         User_Profile:{
        //             selfGranted:true
        //         }
        //     }]
        // },{
        //     include:db.profile
        // })

        // LAZY LOADING
        // const customer = await db.customer.create({username:"p4dm3", points:1000});
        // const profile = await db.profile.create({name:"Queen"});
        // await customer.addProfile(profile, {through: {selfGranted:false}});

        // const result = await db.customer.findAll({
        //     include:{
        //         model:Grant,
        //         include:db.profile
        //     }
        // });
        const result = await db.customer.findOne({
            where:{username:"p4dm3"},
            include:{
                model:db.profile,
                through:{
                    // attributes: { exclude: ["selfGranted"] }
                    // attributes:["selfGranted"]
                    attributes:[]
                }
            }
        });
        res.status(200).json({data:result});
    } catch (error) {
        res.status(400).send({message:error.message,error:error});
    }
}

const m2m2mUser=async(req,res)=>{
    try {
        await db.player.bulkCreate([
            { username: 's0me0ne' },
            { username: 'empty' },
            { username: 'greenhead' },
            { username: 'not_spock' },
            { username: 'bowl_of_petunias' },
        ]);
        await db.game.bulkCreate([
            { name: 'The Big Clash' },
            { name: 'Winter Showdown' },
            { name: 'Summer Beatdown' },
        ]);
        await db.team.bulkCreate([
            { name: 'The Martians' },
            { name: 'The Earthlings' },
            { name: 'The Plutonians' },
        ]);

        await db.gameTeam.bulkCreate([
            { GameId: 1, TeamId: 1 }, // this GameTeam will get id 1
            { GameId: 1, TeamId: 2 }, // this GameTeam will get id 2
            { GameId: 2, TeamId: 1 }, // this GameTeam will get id 3
            { GameId: 2, TeamId: 3 }, // this GameTeam will get id 4
            { GameId: 3, TeamId: 2 }, // this GameTeam will get id 5
            { GameId: 3, TeamId: 3 }, // this GameTeam will get id 6
        ]);

        await db.playerGameTeam.bulkCreate([
            // In 'Winter Showdown' (i.e. GameTeamIds 3 and 4):
            { PlayerId: 1, GameTeamId: 3 }, // s0me0ne played for The Martians
            { PlayerId: 3, GameTeamId: 3 }, // greenhead played for The Martians
            { PlayerId: 4, GameTeamId: 4 }, // not_spock played for The Plutonians
            { PlayerId: 5, GameTeamId: 4 }, // bowl_of_petunias played for The Plutonians
        ]);

        const game = await db.game.findOne({
            where: {
                name: 'Winter Showdown',
            },
            include: {
                model: db.gameTeam,
                include: [
                    {
                        model: db.player,
                        through: { attributes: [] }, // Hide unwanted `PlayerGameTeam` nested object from results
                    },
                    db.team,
                ],
            },
        });

        res.status(200).json({data:game});
    } catch (error) {
        res.status(400).send({message:error.message,error:error});    
    }
}

const transactionsUser=async(req,res)=>{
    const t = await db.sequelize.transaction();
    let data={};
    try {
        data = await User.create({firstName:"arun", lastName:"gupta"},{transaction:t});
        if(data && data.id){
            // throw new Error();
            await Contact.create({
                permanant_address:"noida",
                current_address:"hapur",
                user_id:data.id
            },{transaction:t});
            await t.commit();
        }
        res.status(200).json({data:data})
    } catch (error) {
        data["transaction_status"]="rollback"
        res.status(400).send({message:error.message,error:error,data});     
        await t.rollback();
    }
}

const withTransactionsUser=async(req,res)=>{
    const t = await db.sequelize.transaction();
    let data={};
    try {
        data = await User.create({firstName:"arun", lastName:"gupta"},{transaction:t});
        if(data && data.id){
            // throw new Error();
            await Contact.create({
                permanant_address:"noida",
                current_address:"hapur",
                user_id:data.id
            },{transaction:t});
            await t.commit();
        }
        res.status(200).json({data:data})
    } catch (error) {
        data["transaction_status"]="rollback"
        res.status(400).send({message:error.message,error:error,data});     
        await t.rollback();
    }
}

const scopesUser = async(req,res)=>{
    try {
        // const data = await User.create({firstName:"mohit", lastName:"kumar",status:1});
        // if(data && data.id){
        //     await Contact.create({
        //         permanant_address:"noida",
        //         current_address:"hapur",
        //         userId:data.id
        //     })
        // }

        // User.addScope("checkStatus",{
        //     where:{
        //         status:0
        //     }
        // });
        // User.addScope("firstNameCheck",{
        //     where:{
        //         lastName:{
        //             [Op.like]:"%kumar%"
        //         }
        //     }
        // });

        // delete User.options.scopes['checkStatus'];
        // delete User.options.scopes['firstNameCheck'];

        User.addScope("includeContact",{
            include:({
                model:Contact,
                attributes:["current_address"]
            })
        }
        );

        User.addScope("userAttributes",{
            attributes:["firstName"]
        })

        User.addScope("limitApply",{
            limit:1
        })

        const data = await User.scope(["includeContact","userAttributes","limitApply"]).findAll();

        console.log(JSON.stringify(User.options.scopes, null, 2));
        res.status(200).json({data:data});
    } catch (error) {
        res.status(400).send({message:error.message,error:error});    
    }
}

module.exports={
    addUser,
    getUsers,
    getUser,
    postUser,
    postUsers,
    deleteUser,
    patchUser,
    queryUser,
    findersUsers,
    getSetVirtual,
    validateUser,
    rawQueries,
    oneToOneUser,
    oneToManyUser,
    manyToManyUser,
    paranoidUser,
    loadingUser,
    eagerUser,
    creatorUser,
    mnAssociationsUser,
    mnAssociationsUser2,
    m2m2mUser,
    transactionsUser,
    scopesUser
}