const sequelize = require("../../config/lib/sequelize");
const bcrypt = require("bcrypt");
const {DataTypes} = require("sequelize");


const User = sequelize.define("users" , {
    id:{
        allowNull:false,
        primaryKey:true,
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,

    },
   
    firstName:{
        allowNull :true,
        type:DataTypes.STRING,
    },
    lastName:{
        allowNull :true,
        type:DataTypes.STRING,
    },
    email:{
        unique:true,
        allowNull:false,
        type:DataTypes.STRING,
        validate:{
            isEmail:true,
        },
        set(value){
            this.setDataValue("email" , value.toLowerCase())
        },
    },
    password:{
        allowNull:false,
        type:DataTypes.STRING,
        set(value){
            this.setDataValue("password" , bcrypt.hashSync(value, 10));
        },
    },

},{
    tableName:"users",
    timestamps:true,
    createdAt:"created_at",
    updatedAt:"updated_at",
});


User.prototype.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
};

module.exports = User;