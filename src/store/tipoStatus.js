import { api } from 'lib/api';
import createAction from 'lib/createAction';

const BUSCA_TIPOS_STATUS = 'BUSCA_TIPOS_STATUS';
const BUSCA_TIPOS_STATUS_SUCCESS = 'BUSCA_TIPOS_STATUS_SUCCESS';

export const buscaTiposStatus = () => createAction(BUSCA_TIPOS_STATUS, api.get('/tipoStatus'));

const INITIAL_STATE = {
  tiposStatus: [],
};


export const TIPOS = {
  SOLICITADO: 1,
  DESPACHADO: 2,
  REJEITADO: 3,
  APROVADO: 4,
  CANCELADO: 5,
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
