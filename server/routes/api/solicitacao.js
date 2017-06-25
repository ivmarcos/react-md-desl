const sequelize = require('bb-common/sequelize');
const Service = require('services');

module.exports = (router) => {

  router.post('/', async (req, res, next) => {

    const { solicitacao, trechos } = req.body;
    const { usuario } = req.session;

    try {

      const transaction = sequelize.transaction();

      const solicitacaoSalva = await Service.salvaSolicitacao({ dados: solicitacao, usuario, transaction });

      const salvaTrechos = trechos.map(trecho => Service.salvaTrecho({ dados: trecho, usuario, transaction }));

      await salvaTrechos();

      res.send(solicitacaoSalva);

    } catch (err) {

      next(err);

    }

  });

  router.post('/alteraStatus', async (req, res, next) => {

    const { solicitacoes, tipoStatus_id } = req.body;

    const { usuario, acessos } = req.session;

    // faz a checagem dos acessos de acordo com o tipo informado

    try {

      const transaction = sequelize.transaction();

      const salvaSolicitacoes = solicitacoes.map((solicitacao) => {

        solicitacao.tipoStatus_id = tipoStatus_id;

        return Service.salvaSolicitacao({ dados: solicitacao, usuario, transaction });

      });

      const solicitacoesSalvas = await Promise.all(salvaSolicitacoes());

      res.send(solicitacoesSalvas);

    } catch (err) {

      next(err);

    }

  });


};

