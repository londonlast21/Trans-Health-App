const { Sequelize } = require("sequelize/types");

let sequelize;

if (process.env.JAWSDB_YELLOW) {
    sequelize = new Sequelize(proccess.env.JAWSDB_YELLOW);

} else {
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    });


} 
