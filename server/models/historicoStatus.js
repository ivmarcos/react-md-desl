const sequelize = require('bb-common/sequelize');
const Sequelize = require('sequelize');

module.exports = sequelize.define('HistoricoStatusSolicitacaoDeslocamento', {

  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },

  solicitacao_id: {
    type: Sequelize.BIGINT,
    associate: {
      model: 'TipoStatusDeslocamento',
    },
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
    tableName: 'historico_status_solicitacao',
  },
);

