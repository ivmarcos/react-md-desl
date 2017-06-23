import { api } from 'lib/api';
import createAction from 'lib/createAction';

const BUSCA_TIPOS_STATUS = 'BUSCA_TIPOS_STATUS';
const BUSCA_TIPOS_STATUS_SUCCESS = 'BUSCA_TIPOS_STATUS_SUCCESS';

const CACHE = 0;// 1000 * 60 * 60 * 24 * 5;

export const buscaTiposStatus = () => createAction(BUSCA_TIPOS_STATUS, api.get(`/tipoStatus?cache=${CACHE}`));

const tiposStatus = [
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
  tiposStatus,
};

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

    case BUSCA_TIPOS_STATUS_SUCCESS:

      return { ...state, tiposStatus: action.payload };

    default:

      return state;
  }

};

export default reducer;
