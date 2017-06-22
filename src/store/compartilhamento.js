import { api } from 'lib/api';
import createAction from 'lib/createAction';

const initialState = {
  tipos: [],
};

const BUSCA_TIPOS = 'BUSCA_TIPOS';
const BUSCA_TIPOS_SUCCESS = 'BUSCA_TIPOS_SUCCESS';

export const COMPARTILHAMENTO_ADMINISTRADOR = 1;
export const COMPARTILHAMENTO_CONSULTA = 2;

export const buscaTipos = () => createAction(
  BUSCA_TIPOS,
  api.get('/arquivo/tipoCompartilhamento'),
);

const reducer = (state = initialState, action) => {

  switch (action.type) {
    case BUSCA_TIPOS_SUCCESS:
      return { ...state, tipos: action.payload };
    default:
      return state;
  }

};

export default reducer;
