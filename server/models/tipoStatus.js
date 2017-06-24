const sequelize = require('bb-common/sequelize');
const Sequelize = require('sequelize');

const TipoStatus = sequelize.define('TipoStatus', {

  id: {
    type: Sequelize.INTEGER,
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
  });

// tipos padrões
const Tipos = [
  {
    id: 1,
    nome: 'Solicitado',
  },
  {
    id: 3,
    nome: 'Rejeitado',
  },
  {
    id: 4,
    nome: 'Cancelado',
  },
  {
    id: 5,
    nome: 'Validado',
  },
  {
    id: 6,
    nome: 'Despachado',
  },
  {
    id: 7,
    nome: 'Aprovado',
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

