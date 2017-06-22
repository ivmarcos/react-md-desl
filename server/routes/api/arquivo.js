const path = require('path');
const sequelize = require('bb-common/sequelize');
const logger = require('bb-common/logger');
const upload = require('bb-common/upload');
const defaultConfig = require('bb-common/config');
const util = require('util/diretorio');
const fs = require('fs');
const config = require('config');

function getContentType(arquivo) {

  switch (arquivo.extensao.toUpperCase()) {
    case 'PDF':
      return 'application/pdf';
    default:
      return arquivo.tipo;
  }

}

function enviaArquivo(req, res, next, download) {

  const maxAge = config.maxAge || defaultConfig.app.maxAge;
  const id = req.params.id;

  const { usuario, acessos } = req.session;
  const { Arquivo, Diretorio, TipoRestricaoArquivo } = sequelize.models;

  const include = util.getIncludesAcessoDiretorio();

  Arquivo.findById(req.params.id, {
    include: [
      {
        model: Diretorio,
        as: 'diretorio',
        include,
      },
    ],
  }).then((arquivo) => {

    if (!arquivo) throw new Error(`Arquivo não localizado pelo id ${id}.`);

    const { diretorio } = arquivo;

    if (diretorio.tipoRestricao_id === TipoRestricaoArquivo.DELEGADO) {

      logger.warn(`Utilização incorreta do serviço para baixar esse arquivo #${arquivo.id}, tipo de restrição DELEGADO no diretório #${diretorio.id} - ${diretorio.nome}. Tipo de restrição DELEGADO deve ser usada quando o acesso do arquivo é controlado por sistemas externos.`);
      return res.status(403).send('Acesso negado ao arquivo por este serviço.');

    }

    if (!util.temAcesso({ diretorio, usuario, acessos })) {

      return res.status(403).send(`Acesso negado ao diretório #${diretorio.id} - ${diretorio.nome}.`);

    }

    // apesar de no db o mimetype já ser gravado, as vezes pode haver diferença quando o usuário faz o upload
    const mimetype = getContentType(arquivo);

    res.set({
      'Content-Type': mimetype,
      'Content-Length': arquivo.tamanho,
      'Cache-Control': `public, max-age=${maxAge}`,
      'Content-Disposition': `${download ? 'attachment;' : ''} filename="${arquivo.nome}.${arquivo.extensao}"`,
    });

    const folder = path.join(path.join(defaultConfig.app.upload.path, `${diretorio.id}`));

    const file = path.join(folder, `${arquivo.id}.${arquivo.extensao}`);

    const data = fs.readFileSync(file);

    res.send(data);

  }).catch(next);

}

module.exports = (router) => {

  router.get('/:id', (req, res, next) => {

    enviaArquivo(req, res, next);

  });

  router.get('/download/:id', (req, res, next) => {

    enviaArquivo(req, res, next, true);

  });

  router.get('/:id/:nome', (req, res, next) => {

    enviaArquivo(req, res, next);

  });

  router.post('/', (req, res, next) => {


    const dados = req.body;
    const usuario = req.session.usuario;
    const [arquivo] = req.files.file;


    /* eslint-disable */
    const diretorio_id = dados.diretorio_id;
    const nome = dados.nome;

   if (nome) arquivo.nome = nome;

    /* eslint-enable */

    upload({ arquivos: [arquivo], usuario, diretorio_id })
    .then(([arquivoSalvoEGravado]) => res.send(arquivoSalvoEGravado))
    .catch(next);


  });


};

