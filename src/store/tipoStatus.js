import { api } from 'lib/api';
import createAction from 'lib/createAction';

const BUSCA_TIPOS_STATUS = 'BUSCA_TIPOS_STATUS';
const BUSCA_TIPOS_STATUS_SUCCESS = 'BUSCA_TIPOS_STATUS_SUCCESS';

export const buscaTiposStatus = () => createAction(BUSCA_TIPOS_STATUS, api.get('/tipoStatus'));


export const Tipos = [
  {
    id: 1,
    nome: 'Solicitado',
  },
  {
    id: 3,
    nome: 'Rejeitado',
  },
  {
    id: 4,
    nome: 'Cancelado',
  },
  {
    id: 5,
    nome: 'Validado',
  },
  {
    id: 6,
    nome: 'Despachado',
  },
  {
    id: 7,
    nome: 'Aprovado',
  },
];


export const TIPOS = {
  SOLICITADO: 1,
  VALIDADO: 2,
  DESPACHADO: 2,
  REJEITADO: 3,
  APROVADO: 4,
  CANCELADO: 5,
};

export const TipoStatusSolicitacao = {
  SOLICITADO: 1,
  VALIDADO: 2,
  DESPACHADO: 2,
  REJEITADO: 3,
  APROVADO: 4,
  CANCELADO: 5,
};


const INITIAL_STATE = {
  tiposStatus: Tipos,
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
