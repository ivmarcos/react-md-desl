const sequelize = require('bb-common/sequelize');
const Sequelize = require('sequelize');

module.exports = sequelize.define('DespachoSolicitacao', {

  despacho_id: {
    type: Sequelize.INTEGER,
   allowNull: false,
   associate: {
     model: 'Despacho'
   }
  },

  solicitacao_id: {
    type: Sequelize.INTEGER,
   allowNull: false,
   associate: {
     model: 'Despacho'
   }
  },

},
  {
    schema: 'deslocamento',
    tableName: 'despacho_solicitacao',
  });

