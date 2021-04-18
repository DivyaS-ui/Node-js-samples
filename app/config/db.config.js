const env = require('./env.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,

  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('../model/user.model.js')(sequelize, Sequelize);
// db.order = require('../model/orders.model.js')(sequelize, Sequelize);

// // Here we can connect users and orders base on company'id
// db.user.hasMany(db.order, {foreignKey: 'fk_userid', sourceKey: 'uuid'});
// db.order.belongsTo(db.user, {foreignKey: 'fk_userid', targetKey: 'uuid'});

module.exports = db;