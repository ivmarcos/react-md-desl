const sequelize = require('bb-common/sequelize');
const Sequelize = require('sequelize');

const TipoStatus = sequelize.define('TipoStatusDeslocamento', {

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
    tableName: 'tipo_status',
  },
);

// tipos padrões
const Tipos = [
  {
    id: 1,
    nome: 'Rascunho',
  },
  {
    id: 2,
    nome: 'Solicitado',
  },
  {
    id: 3,
    nome: 'Despachado',
  },
  {
    id: 4,
    nome: 'Rejeitado',
  },
  {
    id: 5,
    nome: 'Aprovado',
  },
  {
    id: 6,
    nome: 'Cancelado',
  },
];

// registra como informação estática TipoStatus.ENVIADO = 1
//eslint-disable-next-line
Tipos.forEach(tipo => TipoStatus[tipo.nome.toUpperCase()] = tipo.id);

// insere os tipos padrões no DB
TipoStatus.afterSync(() => {

  const promises = Tipos.map(tipo => TipoStatus.upsert(tipo));

  return Promise.all(promises);

});

module.exports = TipoStatus;

