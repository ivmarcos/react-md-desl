import { api } from 'lib/api';
import createAction from 'lib/createAction';

// const BUSCA_USUARIO = 'BUSCA_USUARIO';
const BUSCA_USUARIO_SUCCESS = 'BUSCA_USUARIO_SUCCESS';

const BUSCA_ACESSOS = 'BUSCA_ACESSOS';
const BUSCA_ACESSOS_SUCCESS = 'BUSCA_ACESSOS_SUCCESS';

const ENVIA_MENSAGEM = 'ENVIA_MENSAGEM';

// export const buscaUsuarioLogado = () => createAction(BUSCA_USUARIO, api.get('/usuario/logado'));

export const buscaUsuarioLogado = () => dispatch => dispatch({
  type: BUSCA_USUARIO_SUCCESS,
  payload: {
    id: 56805293,
    nome: 'Marcos Andrei',
  },
});

export const buscaAcessos = () => createAction(BUSCA_ACESSOS, api.get('/usuario/acessos'));

export const enviaMensagem = mensagem => dispatch => dispatch({ type: ENVIA_MENSAGEM, msg: mensagem });

// dados injetados pelo server quando em produção
const serverState = window.INITIAL_STATE ? window.INITIAL_STATE.app : {};

const initialState = {
  erros: [],
  loading: 0,
  usuario: null,
  acessos: [],
  mensagens: [],
  error: null,
  expirado: null,
  ...serverState, // dados injetados pelo server quando em produção
};

const mensagemReducer = (state, action) => {

  if (/SUCCESS$/.test(action.type)) {

    // verifica se existem mensagens na action e em caso afirmativo insere no state
    const mensagens = action.msg ? [...state.mensagens, action.msg] : state.mensagens;

    return { ...state, mensagens, loading: state.loading - 1 };

  } else if (/FAILURE$/.test(action.type)) {

    const erro = action.error;

    const expirado = action.error && action.error.code === 1;

    const mensagem = action.msg || erro.msg || 'Houve um erro ao tentar consultar os dados.';

    console.log('mensagem', mensagem);

    const erros = [...state.erros, erro];

    const mensagens = [...state.mensagens, mensagem];

    console.log('mensagens', mensagens);

    return { ...state, erros, mensagens, loading: state.loading - 1, expirado };

  } else if (/PENDING$/.test(action.type)) {

    return { ...state, loading: state.loading + 1 };

  }

  return state;

};

const appReducer = (state, action) => {

  console.log('state', state);

  switch (action.type) {

    case BUSCA_USUARIO_SUCCESS:
      return { ...state, usuario: action.payload };

    case BUSCA_ACESSOS_SUCCESS:
      return { ...state, acessos: action.payload };

    case ENVIA_MENSAGEM:
      return { ...state, mensagens: [...state.mensagens, action.msg] };

    default:
      return state;

  }


};

const reducer = (state = initialState, action) => {

  const resultado = mensagemReducer(state, action);

  return appReducer(resultado, action);

};
export default reducer;
