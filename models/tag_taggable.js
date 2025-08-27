module.exports=(sequelize, DataTypes,Model) => {
    class Tag_Taggable extends Model {};
    Tag_Taggable.init({
        tagId:{
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true
            // unique:'tt_unique_constraint'
        },
        taggableId: {
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            // unique:'tt_unique_constraint',
            references:null
        },
        taggableType:{
            type:DataTypes.STRING,
            allowNull:false,
            primaryKey:true
            // unique:'tt_unique_constraint',
        }
    },{
        sequelize, 
        modelName: 'tag_taggable',
        timestamps:true,
        indexes:[
            {
                unique:true,
                fields:["tagId","taggableId","taggableType"]
            }
        ]
    });
    return Tag_Taggable;
}