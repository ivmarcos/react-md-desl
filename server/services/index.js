const sequelize = require('bb-common/sequelize');

const Service = {

// salva o historico de status de acordo com a informação anterior
  salvaHistoricoStatus({ solicitacaoAnterior, solicitacaoAtual, usuario, transaction }) {

    const { HistoricoStatus, TipoStatus } = sequelize.schemas.deslocamento;

    const isNovaSolicitacao = !solicitacaoAtual;

    const isStatusAlterado = isNovaSolicitacao ? true : solicitacaoAnterior.tipoStatus_id != solicitacaoAtual.tipoStatus_id;

    if (isStatusAlterado) {

      const historico = HistoricoStatus.build({
        solicitacao_id: solicitacaoAtual.id,
        tipoStatus_id: solicitacaoAtual.tipoStatus_id || TipoStatus.SOLICITADO,
        usuarioInclusao_id: usuario.id,
        dataHoraInclusao: new Date(),
      });

      return historico.save({ transaction });

    }

    return Promise.resolve();


  },

  async salvaSolicitacao({ dados, usuario, transaction }) {

    const { Solicitacao } = sequelize.schemas.deslocamento;

    const isNovaSolicitacao = !dados.id;

    const solicitacaoAnterior = isNovaSolicitacao ? null : await Solicitacao.findById(dados.id);

    const solicitacao = Solicitacao.build(dados, { isNewRecord: isNovaSolicitacao });

    if (isNovaSolicitacao) {

      solicitacao.usuarioInclusao_id = usuario.id;
      solicitacao.funcionario_id = solicitacao.funcionario_id || usuario.id;

    } else {

      solicitacao.usuarioAtualizacao_id = usuario.id;
      solicitacao.dataHoraAtualizacao = new Date();

    }

    const solicitacaoAtual = await solicitacao.save({ transaction });

    await Service.salvaHistoricoStatus({ solicitacaoAnterior, solicitacaoAtual, usuario, transaction });

    return solicitacaoAtual;

  },

  salvaTrecho({ dados, transaction }) {

    const { Trecho } = sequelize.schemas.deslocamento;

    const isNovoTrecho = !dados.id;

    return Trecho.build(dados, { isNewRecord: isNovoTrecho }).save({ transaction });

  },
};

module.exports = Service;
