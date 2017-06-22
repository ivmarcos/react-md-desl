const sequelize = require('bb-common/sequelize');
const util = require('util/diretorio');
const logger = require('bb-common/logger');


module.exports = (router) => {

  // busca o conteúdo raiz para o usuário
  router.post('/', (req, res, next) => {

    const { diretorio, compartilhamento, compartilhamentoId } = req.body;

    const { CompartilhamentoUOR } = sequelize.models;

    CompartilhamentoUOR.findOrCreate({ where: { diretorio_id: compartilhamento.diretorio_id }, defaults: compartilhamento }).spread(criado);


  });

  router.get('/detalhes/:diretorioId', (req, res, next) => {

    const {
      Diretorio,
      CompartilhamentoUOR,
      CompartilhamentoUsuario,
      CompartilhamentoPrefixo,
      CompartilhamentoTransacao,
      Transacao,
      UOR,
      Usuario,
    } = sequelize.models;

    Diretorio.findById(req.params.diretorioId, {
      include: [
        {
          model: Usuario,
          as: 'usuarioInclusao',
          attributes: ['id', 'chave', 'nome'],
        },
        {
          model: CompartilhamentoUOR,
          as: 'compartilhamentosUOR',
          include: [
            {
              model: UOR,
              as: 'uor',
              attributes: ['id', 'nome'],
            },
          ],
        },
        {
          model: CompartilhamentoPrefixo,
          as: 'compartilhamentosPrefixo',
        },
        {
          model: CompartilhamentoUsuario,
          as: 'compartilhamentosUsuario',
          include: [
            {
              model: Usuario,
              as: 'usuario',
              attributes: ['id', 'chave', 'nome'],
            },
          ],
        },
        {
          model: CompartilhamentoTransacao,
          as: 'compartilhamentosTransacao',
          include: [
            {
              model: Transacao,
              as: 'transacao',
              attributes: ['id', 'nome', 'sigla'],
            },
          ],
        },
      ],
    })
      .then(diretorio => res.send(diretorio))
      .catch(next);

  });


};
