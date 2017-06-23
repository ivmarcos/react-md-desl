import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import app from './app';
import municipio from './municipio';
import solicitacao from './solicitacao';
import companhia from './companhia';
import tipoSolicitacao from './tipoSolicitacao';

export default combineReducers({
  app,
  municipio,
  companhia,
  tipoSolicitacao,
  solicitacao,
  router,
});

