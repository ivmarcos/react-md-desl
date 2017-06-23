const sequelize = require('bb-common/sequelize');
const Sequelize = require('sequelize');

module.exports = sequelize.define('Trecho', {

  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },

  dataHoraVoo: {
    type: Sequelize.DATE,
    allowNull: false,
  },

  numeroVoo: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  origem_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    associate: {
      model: 'Municipio',
    },
  },

  destino_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    associate: {
      model: 'Municipio',
    },
  },

  companhia_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    associate: {
      model: 'CompanhiaAerea',
    },
  },

  solicitacao_id: {
    type: Sequelize.BIGINT,
    allowNull: false,
    associate: {
      model: 'Solicitacao',
    },
  },

},
  {
    schema: 'deslocamento',
    tableName: 'trecho',
  });

