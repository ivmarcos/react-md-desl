import { api } from 'lib/api';
import createAction from 'lib/createAction';

const BUSCA_COMPANHIAS = 'BUSCA_COMPANHIAS';
const BUSCA_COMPANHIAS_SUCCESS = 'BUSCA_COMPANHIAS_SUCCESS';

const CACHE = 0;// 1000 * 60 * 60 * 24 * 5;

export const buscaCompanhias = () => createAction(BUSCA_COMPANHIAS, api.get(`/companhia?cache=${CACHE}`));

const companhias = [
  {
    id: 1,
    nome: 'Latam',
  },
  {
    id: 2,
    nome: 'Gol',
  },
  {
    id: 3,
    nome: 'Avianca',
  },
];


const INITIAL_STATE = {
  companhias,
};

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

    case BUSCA_COMPANHIAS_SUCCESS:

      return { ...state, companhias: action.payload };

    default:

      return state;
  }

};

export default reducer;
