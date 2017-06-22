const path = require('path');

/* configurações gerais do backend*/
module.exports = {

  port: 3007,

  name: 'deslocamento',

  path: 'deslocamento',

  public: path.join(__dirname, '../public'),

  routes: path.join(__dirname, 'routes'),

  maxAge: 1000 * 60 * 60 * 24 * 15,

  models: {
    restify: true,
    sync: false,
  },

  injectState: ({ req }) => ({
    app: {
      usuario: req.session.usuario,
      acessos: req.session.acessos,
    },
  }),

  //webpack: path.join(__dirname, '../../webpack.config.js')

};
