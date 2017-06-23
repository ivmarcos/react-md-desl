import { api } from 'lib/api';
import createAction from 'lib/createAction';

const BUSCA_MUNICIPIOS = 'BUSCA_MUNICIPIOS';
const BUSCA_MUNICIPIOS_SUCCESS = 'BUSCA_MUNICIPIOS_SUCCESS';

const CACHE = 0;// 1000 * 60 * 60 * 24 * 5;

export const buscaMunicipios = () => createAction(BUSCA_MUNICIPIOS, api.get(`/arg/municipio?cache=${CACHE}`));


const municipios = [
  {
    id: 1,
    nome: 'São Paulo',
  },
  {
    id: 2,
    nome: 'Rio',
  },
  {
    id: 3,
    nome: 'Brasília',
  },
  {
    id: 4,
    nome: 'Curitiba',
  },
];

const INITIAL_STATE = {
  municipios,
};

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

    case BUSCA_MUNICIPIOS_SUCCESS:

      return { ...state, municipios: action.payload };

    default:

      return state;
  }

};

export default reducer;
