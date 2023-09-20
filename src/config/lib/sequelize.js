const {Sequelize} = require("sequelize");

const sequelize = new Sequelize(
    process.env.DB_NAME ,
    process.env.DB_USER,
    process.env.PASSWORD,
    
    {
    host:process.env.DB_HOST,
    dialect:"mysql",
    logging:true,
    sync:true,
     }

);

module.exports = sequelize;