const sequelize = require('bb-common/sequelize');
const Sequelize = require('sequelize');

module.exports = sequelize.define('Despacho', {

  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  usuarioInclusao_id: {
    type: Sequelize.BIGINT,
    allowNull: false,
    associate: {
      model: 'Usuario',
    },
  },

  dataHoraInclusao: {
    type: Sequelize.DATE,
    allowNull: false,
  },

},
  {
    schema: 'deslocamento',
    tableName: 'despacho',
  });

