import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { reducer as form } from 'redux-form';

import app from './app';
import arquivo from './arquivo';
import diretorio from './diretorio';
import compartilhamento from './compartilhamento';

export default combineReducers({
  app,
  arquivo,
  diretorio,
  compartilhamento,
  router,
  form,
});

