import { api } from 'lib/api';
import createAction from 'lib/createAction';

const BUSCA_DESPACHOS = 'BUSCA_DESPACHOS';
const BUSCA_DESPACHOS_SUCCESS = 'BUSCA_DESPACHOS_SUCCESS';

export const DESPACHA = 'DESPACHA';
export const DESPACHA_SUCCESS = 'DESPACHA_SUCCESS';

export const buscaDespachos = () => createAction(BUSCA_DESPACHOS, api.get('/despacho'));

export const despacha = ([solicitacoes]) => createAction(DESPACHA, api.post('/despacho/solicitacoes', { solicitacoes }));

const despachos = [
  {
    id: 1,
    usuarioInclusao: {
      id: 1,
      chave: 'f6805293',
      nome: 'Marcos Andrei Ivanechtchuk',
    },
    solicitacoes: [],
  },
];


const INITIAL_STATE = {
  despachos,
};

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

    case BUSCA_DESPACHOS_SUCCESS:

      return { ...state, despachos: action.payload };

    default:

      return state;
  }

};

export default reducer;
