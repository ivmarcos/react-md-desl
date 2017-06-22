const sequelize = require('bb-common/sequelize');
const Sequelize = require('sequelize');

module.exports = sequelize.define('CompanhiaAerea', {

  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },

  nome: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },

},
  {
    schema: 'deslocamento',
    tableName: 'companhia_aerea',
  },
);

