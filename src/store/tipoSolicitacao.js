import { api } from 'lib/api';
import createAction from 'lib/createAction';

const BUSCA_TIPOS_SOLICITACAO = 'BUSCA_TIPOS_SOLICITACAO';
const BUSCA_TIPOS_SOLICITACAO_SUCCESS = 'BUSCA_TIPOS_SOLICITACAO_SUCCESS';

export const buscaTiposSolicitacao = () => createAction(BUSCA_TIPOS_SOLICITACAO, api.get('/tipoSolicitacao'));

const tiposSolicitacao = [
  {
    id: 1,
    nome: 'Tipo1',
  },
  {
    id: 2,
    nome: 'Tipo2',
  },
  {
    id: 3,
    nome: 'Tipo3',
  },
  {
    id: 4,
    nome: 'Tipo4',
  },
];

const INITIAL_STATE = {
  tiposSolicitacao,
};

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

    case BUSCA_TIPOS_SOLICITACAO_SUCCESS:

      return { ...state, tiposSolicitacao: action.payload };

    default:

      return state;
  }

};

export default reducer;
