const sequelize = require('bb-common/sequelize');

function salvaSolicitacao({ dados, usuario, transaction }) {

  const { Solicitacao } = sequelize.schemas.deslocamento;

  const isNovaSolicitacao = !dados.id;

  const solicitacao = Solicitacao.build(dados, { isNewRecord: isNovaSolicitacao });

  if (isNovaSolicitacao) {

    solicitacao.usuarioInclusao_id = usuario.id;
    solicitacao.funcionario_id = solicitacao.funcionario_id || usuario.id;

  } else {

    solicitacao.usuarioAtualizacao_id = usuario.id;
    solicitacao.dataHoraAtualizacao = new Date();

  }

  return solicitacao.save({ transaction });

}

function salvaTrecho({ dados, transaction }) {

  const { Trecho } = sequelize.schemas.deslocamento;

  const isNovoTrecho = !dados.id;

  return Trecho.build(dados, { isNewRecord: isNovoTrecho }).save({ transaction });

}

// salva o historico de status de acordo com a informação anterior
function salvaHistoricoStatus({ solicitacaoAnterior, solicitacaoAtual, usuario, transaction }) {

  const { HistoricoStatus, Solicitacao, TipoStatus } = sequelize.schemas.deslocamento;

  const isNovaSolicitacao = !solicitacaoAtual.id;

  const alteracaoAnteriorDB = () => Solicitacao.findById(solicitacaoAtual.id).then(solicitacaoAnterior => Promise.resolve(solicitacaoAnterior.tipoStatus_id != solicitacaoAtual.tipoStatus_id));

  const checaAlteracaoStatus = isNovaSolicitacao ? Promise.resolve(true) : alteracaoAnteriorDB();

  return checaAlteracaoStatus.then((alterado) => {

    if (alterado) {

      return HistoricoStatus.build({
        solicitacao_id: solicitacaoAtual.id,
        tipoStatus_id: solicitacaoAtual.tipoStatus_id || TipoStatus.SOLICITADO,
        usuarioInclusao_id: usuario.id,
        dataHoraInclusao: new Date(),
      }).save({ transaction });

    }

    return Promise.resolve();

  });


}


module.exports = (router) => {

  router.post('/validacao', (req, res) => {

    res.send(req.session.usuario);

  });

  router.post('/', (req, res, next) => {

    const { solicitacao, trechos } = req.body;
    const { usuario } = req.session;

    sequelize
      .transaction(transaction => salvaSolicitacao({ dados: solicitacao, usuario, transaction }))
        .then(solicitacaoSalva => salvaHistoricoStatus({ solicitacaoAnterior: dados, solicitacaoAtual: solicitacaoSalva, usuario, transaction })
        .then(() => {

          const promisesTrechos = trechos.map((trecho) => {

            const dados = Object.assign({}, trecho, { solicitacao_id: solicitacaoSalva.id });

            return salvaTrecho({ dados, usuario, transaction });

          });

          return Promise
            .all(promisesTrechos)
            .then(() => Promise.resolve(solicitacaoSalva));

        }))
      .then(solicitacaoSalva => res.send(solicitacaoSalva))
      .catch(next);

  });

  router.post('/valida', (req, res, next) => {

    const { solicitacoes, tipoStatus_id } = req.body;

    const { usuario } = req.session;

    sequelize
      .transaction((transaction) => {

        const promisesAlteracaoStatus = solicitacoes.map(solicitacao => salvaHistoricoStatus({ solicitacao, usuario, transaction }));

        const promisesSolicitacoes = solicitacoes.map((solicitacao) => {

          const dados = Object.assign({}, solicitacao, { tipoStatus_id });

          return salvaSolicitacao({ dados, usuario, transaction });

        });

        return Promise
        .all(promisesAlteracaoStatus)
        .then(() => promisesSolicitacoes);

      })
      .then(solicitacoesSalvas => res.send(solicitacoesSalvas))
      .catch(next);

  });

};

