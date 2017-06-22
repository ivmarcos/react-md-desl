// import serverConfig from '../../server/config';

/*  configurações gerais do frontend */
const env = process.env.AMBIENTE || 'desenvolvimento';

const commonConfig = {
  title: 'Arquivos',
  path: 'arquivos',
  port: 3003,
  baseUrl: '',
};

const envConfig = {
  desenvolvimento: {
    apiUrl: `http://localhost.bb.com.br:${commonConfig.port}/api`,
  },
  producao: {
    apiUrl: `https://disem.intranet.bb.com.br/${commonConfig.path}/api`,
    baseUrl: `${commonConfig.path}`,
  },
  homologacao: {
    apiUrl: `//disem6.intranet.bb.com.br/${commonConfig.path}/api`,
  },
};

export default { ...commonConfig, ...envConfig[env] };

