const sequelize = require('bb-common/sequelize');
const Service = require('services');

async function salvaDespacho({ dados, usuario, transaction }) {

  const isNovoDespacho = !dados.id;

  const despachoAnterior = isNovoDespacho ? null : await Despacho.findById(dados.id);

  const despacho = Despacho.build(dados, { isNewRecord: isNovoDespacho });

  if (isNovoDespacho) {

    despacho.usuarioInclusao_id = usuario.id;
    despacho.funcionario_id = despacho.funcionario_id || usuario.id;

  } else {

    despacho.usuarioAtualizacao_id = usuario.id;
    despacho.dataHoraAtualizacao = new Date();

  }

  const despachoAtual = await despacho.save({ transaction });

    // await Service.salvaHistoricoStatus({ solicitacaoAnterior, solicitacaoAtual, usuario, transaction });

  return despachoAtual;

}

module.exports = (router) => {

  router.post('/', async (req, res, next) => {

    const { despacho, solicitacoes } = req.body;
    const { usuario } = req.session;

    const { TipoStatus, Despacho } = sequelize.schemas.deslocamento;

    try {

      const transaction = sequelize.transaction();

      const salvaSolicitacoes = solicitacoes.map((despacho) => {

        despacho.tipoStatus_id = TipoStatus.DESPACHADO;
        return Service.salvaSolicitacao({ dados: despacho, usuario, transaction });

      });

      const solicitacoesSalvas = await salvaSolicitacoes();

      const despachoSalvo = await salvaDespacho({ dados: despacho, usuario, transaction });

      res.send({ despacho: despachoSalvo, solicitacoes: solicitacoesSalvas });

    } catch (err) {

      next(err);

    }

  });


};

