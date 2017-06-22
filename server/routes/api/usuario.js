module.exports = (router) => {

  router.get('/logado', (req, res) => {

    res.send(req.session.usuario);

  });

  router.get('/acessos', (req, res) => {

    res.send(req.session.acessos);

  });

  router.get('/logoff', (req, res) => {

    const BBAutenticador = require('bb-common/autenticacao/bbAutenticador');
    const Sessao = require('bb-common/sessao');
    const usuario = req.session.usuario;
    const url = req.query.url;

    Sessao.logoff(usuario);

    BBAutenticador.logoff(req, res, url);

  });


};

