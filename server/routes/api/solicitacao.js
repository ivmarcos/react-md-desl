const sequelize = require('bb-common/sequelize');


module.exports = (router) => {

  router.post('/validacao', (req, res) => {

    res.send(req.session.usuario);

  });

  router.post('/', (req, res, next) => {

    const {
      SolicitacaoDeslocamento,
      TrechoDeslocamento,
      HistoricoStatusDeslocamento,
    } = sequelize.models;

    let { solicitacao, trechos } = req.body;
    const { usuario, acessos } = req.session;

    sequelize.transaction((transaction) => {

      const isNovaSolicitacao = !solicitacao.id;

      solicitacao = SolicitacaoDeslocamento.build(solicitacao, { isNewRecord: isNovaSolicitacao });

      if (isNovaSolicitacao) {

        solicitacao.usuarioInclusao_id = usuario.id;

      } else {

        solicitacao.usuarioAtualizacao_id = usuario.id;
        solicitacao.dataHoraAtualizacao = new Date();

      }

      trechos = trechos.map((trecho) => TrechoDeslocamento.build());


    });


  });

};

