const sequelize = require('bb-common/sequelize');
const Sequelize = require('sequelize');
const TipoStatus = require('./tipoStatus');

module.exports = sequelize.define('Solicitacao', {

  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },

  uor_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    associate: {
      model: 'UOR',
    },
  },

  funcionario_id: {
    type: Sequelize.BIGINT,
    allowNull: false,
    associate: {
      model: 'Usuario',
    },
  },

  dataHoraInclusao: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },

  usuarioInclusao_id: {
    type: Sequelize.BIGINT,
    allowNull: false,
    associate: {
      model: 'Usuario',
    },
  },

  dataHoraAtualizacao: {
    type: Sequelize.DATE,
    allowNull: true,
  },

  usuarioAtualizacao_id: {
    type: Sequelize.BIGINT,
    allowNull: true,
    associate: {
      model: 'Usuario',
    },
  },

  descricao: {
    type: Sequelize.TEXT,
    allowNull: false,
  },

  dataHoraInicio: {
    type: Sequelize.DATE,
    allowNull: false,
  },

  dataHoraTermino: {
    type: Sequelize.DATE,
    allowNull: false,
  },

  valorEstimado: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },

  tipo_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    associate: {
      model: 'TipoSolicitacao',
    },
  },

  tipoStatus_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    associate: {
      model: TipoStatus,
    },
    defaultValue: TipoStatus.SOLICITADO,
  },

},
  {
    schema: 'deslocamento',
    tableName: 'solicitacao',
    restify: {
      restrict: ['post'],
    },
  });

