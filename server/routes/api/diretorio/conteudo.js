const sequelize = require('bb-common/sequelize');
const util = require('util/diretorio');
const logger = require('bb-common/logger');


module.exports = (router) => {

  // busca o conteúdo raiz para o usuário
  router.get('/raiz', (req, res, next) => {

    const { Diretorio, TipoStatusArquivo } = sequelize.models;

    const { usuario, acessos } = req.session;

    const include = util.getIncludesAcessoDiretorio();

    const paramsAcesso = util.getParamsAcesso({ usuario, acessos });

    Diretorio.findAll({
      include,
      where: {
        id: {
          $notIn: sequelize.literal('(select subordinado_id from "arquivo"."vinculacao_diretorio" where subordinado_id = "Diretorio"."id")'),
        },
        tipoStatus_id: TipoStatusArquivo.ATIVO,
        $or: paramsAcesso,
      },
    }).then((diretorios) => {

      const conteudo = diretorios.map(diretorio => Object.assign(util.clona(diretorio), { diretorio: true }));

      res.send({
        diretorio: null,
        conteudo,
      });

    }).catch(next);

  });


  // busca todo o conteúdo relacionado ao diretorio (diretorio e arquivos), pesquisa os dois e converte o formato em item
  router.get('/:id', (req, res, next) => {

    const { Diretorio, VinculacaoDiretorio, Arquivo, Usuario, TipoStatusArquivo, TipoRestricaoArquivo } = sequelize.models;

    const diretorioId = req.params.id;

    const include = util.getIncludesAcessoDiretorio();

    const { usuario, acessos } = req.session;

    // parametros de visualização do diretório
    const paramsAcesso = [
      sequelize.literal(`"subordinado"."usuario_inclusao_id" = ${usuario.id}`),
      sequelize.literal(`"subordinado"."tipo_restricao_id" = ${TipoRestricaoArquivo.PUBLICO}`),
      sequelize.literal(`"subordinado.compartilhamentosUOR"."uor_id" = ${usuario.uor_id}`),
      sequelize.literal(`"subordinado.compartilhamentosPrefixo"."prefixo" = ${usuario.prefixo}`),
      sequelize.literal(`"subordinado.compartilhamentosUsuario"."usuario_id" = ${usuario.id}`),
    ];

    if (acessos.length) {

      paramsAcesso.push(sequelize.literal(`"subordinado.compartilhamentosTransacao.transacao"."sigla" in ('${acessos.join("','")}')`));

    }

    // busca informações do próprio diretorio, para verificar se está autorizado a enviar o conteúdo
    const promiseDiretorio = Diretorio.findById(diretorioId, {
      include,
    });

    // busca os diretorios subordinados diretamente (nivel 1), somente aos quais ele tem acesso
    const promiseDiretorios = Promise.resolve(VinculacaoDiretorio.findAll({
      include: [
        {
          model: Diretorio,
          as: 'subordinado',
          include,
          where: {
            tipoStatus_id: TipoStatusArquivo.ATIVO,
          },
        },
      ],
      where: {
        nivel: 1,
        superior_id: diretorioId,
        $or: paramsAcesso,
      },
    })
      .then(vinculacoes => Promise.resolve(vinculacoes.map(vinculacao => Object.assign(util.clona(vinculacao.subordinado), { diretorio: true })))));

    // busca os arquivos vinculados
    const promiseArquivos = Arquivo.findAll({
      where: {
        diretorio_id: diretorioId,
        tipoStatus_id: TipoStatusArquivo.ATIVO,
      },
      include: [
        {
          model: Usuario,
          as: 'usuarioInclusao',
          attributes: ['id', 'chave', 'nome', 'nomeExibicao'],
        },
      ],
    });

    // une as duas respostas no envio para o cliente
    Promise.all([promiseDiretorio, promiseDiretorios, promiseArquivos])
      .then(([diretorio, diretorios, arquivos]) => {

        const isAutorizado = util.temAcesso({ diretorio, usuario, acessos });

        if (isAutorizado) {

          res.send({
            diretorio,
            conteudo: diretorios.concat(arquivos),
          });

        } else {

          res.status(403).send({ msg: `Acesso restrito ao diretório "${diretorio.nome}".` });

        }

      })
      .catch(next);


  });


};
