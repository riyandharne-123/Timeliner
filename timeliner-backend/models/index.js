const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: false,
    ssl: true, 
    dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
    },
})

sequelize.authenticate().then(() => {
    console.log('connected to mysql db')
}).catch(err => {
    console.warn(err)
})

const db = {};
db.sequelize = Sequelize;
db.sequelize = sequelize

db.users = require('./users')(sequelize, DataTypes);
db.tasks = require('./tasks')(sequelize, DataTypes);

db.users.hasMany(db.tasks, { as: 'tasks' })
db.tasks.belongsTo(db.users, {
    foreignKey: "userId",
    as: "user",
})

db.sequelize.sync({ force: false }).then(() =>{
    console.log('migrated')
}).catch(err =>{
    console.warn(err)
})

module.exports = db;