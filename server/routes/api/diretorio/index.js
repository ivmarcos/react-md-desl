const sequelize = require('bb-common/sequelize');
const util = require('util/diretorio');
const logger = require('bb-common/logger');


module.exports = (router) => {

  router.post('/', (req, res, next) => {

    const dados = req.body.diretorio;
    const diretorioSuperior = req.body.superior;
    const { usuario, acessos } = req.session;
    const { Diretorio, VinculacaoDiretorio, TipoCompartilhamentoArquivo } = sequelize.models;
    const isRaiz = !diretorioSuperior; // é raiz se não houver diretório superior

    // se for a raiz (sem diretórios vinculados) o acesso tem que ser de admin (ARQ1)
    if (isRaiz && acessos.indexOf('ARQ1') === -1) {

      return res.status(403).send({ msg: 'Acesso negado para criar diretórios na raiz.' });

    }

    sequelize.transaction((transaction) => {

      const diretorio = Diretorio.build(dados, { isNewRecord: !dados.id });

      if (!diretorio.id) {

        diretorio.usuarioInclusao_id = usuario.id;
        // herda o tipo de restricao do diretório superior (se houver)
        diretorio.tipoRestricao_id = diretorioSuperior ? (diretorioSuperior.tipoRestricao_id || diretorio.tipoRestricao_id) : diretorio.tipoRestricao_id;

      } else {

        diretorio.dataHoraAtualizacao = new Date();
        diretorio.usuarioAtualizacao = usuario.id;

      }

      const promiseDiretorio = diretorio.save({ transaction });

      if (isRaiz) {

        return promiseDiretorio.then(diretorioSalvo => res.send(diretorioSalvo)).catch(next);

      }

      const promises = [
        promiseDiretorio,
        VinculacaoDiretorio.findAll({ where: { subordinado_id: diretorioSuperior.id }, transaction }),
      ];

      const include = util.getIncludesAcessoDiretorio();

      promises.push(Diretorio.findById(diretorioSuperior.id, { include }));

      return Promise.all(promises).then(([diretorioSalvo, vinculacoesSuperior, diretorioSuperior]) => {

        if (!util.temAcesso({ diretorio: diretorioSuperior, usuario, acessos, tipo_id: TipoCompartilhamentoArquivo.ADMINISTRADOR })) {

          return Promise.reject(`Acesso negado para uploads no diretorio ${diretorioSuperior.nome}`);

        }

        if (!vinculacoesSuperior) return Promise.resolve(diretorioSalvo);

        const vinculacoesSubordinado = vinculacoesSuperior.map(vinculacaoSuperior => ({
          superior_id: vinculacaoSuperior.superior_id,
          subordinado_id: diretorioSalvo.id,
          nivel: vinculacaoSuperior.nivel + 1,
        }));

        // adicionando a subordinacao ao proprio superior
        vinculacoesSubordinado.push({
          superior_id: diretorioSuperior.id,
          subordinado_id: diretorioSalvo.id,
          nivel: 1,
        });

        const promisesVinculacoes = vinculacoesSubordinado.map(vinculacaoSubordinado => VinculacaoDiretorio.upsert(vinculacaoSubordinado, { transaction }));

        return Promise.all(promisesVinculacoes).then(() => Promise.resolve(diretorioSalvo));

      });

    })
      .then(diretorioSalvo => res.send(diretorioSalvo))
      .catch(next);


  });

};
