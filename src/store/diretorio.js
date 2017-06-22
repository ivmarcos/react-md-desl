import { api } from 'lib/api';
import createAction from 'lib/createAction';
import update from 'immutability-helper';
import store from 'store';

import { ADICIONA_ARQUIVO_SUCCESS } from './arquivo';

const ADICIONA_DIRETORIO = 'ADICIONA_DIRETORIO';
const ADICIONA_DIRETORIO_SUCCESS = 'ADICIONA_DIRETORIO_SUCCESS';

const BUSCA_CONTEUDO_DIRETORIO = 'BUSCA_CONTEUDO_DIRETORIO';
const BUSCA_CONTEUDO_DIRETORIO_PENDING = 'BUSCA_CONTEUDO_DIRETORIO_PENDING';
const BUSCA_CONTEUDO_DIRETORIO_SUCCESS = 'BUSCA_CONTEUDO_DIRETORIO_SUCCESS';
const BUSCA_CONTEUDO_DIRETORIO_FAILURE = 'BUSCA_CONTEUDO_DIRETORIO_FAILURE';

const ADICIONA_COMPARTILHAMENTO = 'ADICIONA_COMPARTILHAMENTO';
const ADICIONA_COMPARTILHAMENTO_SUCCESS = 'ADICIONA_COMPARTILHAMENTO_SUCCESS';

const BUSCA_DETALHES_COMPARTILHAMENTO_DIRETORIO = 'BUSCA_DETALHES_COMPARTILHAMENTO_DIRETORIO';
const BUSCA_DETALHES_COMPARTILHAMENTO_DIRETORIO_SUCCESS = 'BUSCA_DETALHES_COMPARTILHAMENTO_DIRETORIO_SUCCESS';


export const adicionaDiretorio = data => createAction(
  ADICIONA_DIRETORIO,
  api.post('/diretorio', data),
  { msg: `Pasta "${data.diretorio.nome}" adicionada com sucesso.` },
  { msg: 'Houve um erro ao tentar adicionar a pasta.' },
  { msg: `Adicionando pasta ${data.diretorio.nome}...` },
  );

export const adicionaCompartilhamento = data => createAction(
  ADICIONA_COMPARTILHAMENTO,
  api.post('diretorio/compartilhamento', data),
  { msg: `Pasta "${data.diretorio.nome}" compartilhada com sucesso.` },
  { msg: 'Houve um erro ao tentar compartilhar a pasta.' },
  { msg: `Compartilhando pasta ${data.diretorio.nome}...` },
);

export const buscaConteudoDiretorioRaiz = () => createAction(
  BUSCA_CONTEUDO_DIRETORIO,
  api.get('/diretorio/conteudo/raiz'),
);

export const buscaConteudoDiretorio = ({ id, raiz }) => createAction(
  BUSCA_CONTEUDO_DIRETORIO,
  api.get(`/diretorio/conteudo/${id}`),
  { raiz },
);

export const selecionaDiretorio = diretorio => createAction(
  BUSCA_DETALHES_COMPARTILHAMENTO_DIRETORIO,
  api.get(`diretorio/compartilhamento/detalhes/${diretorio.id}`),
);

const initialState = {
  conteudo: [],
  buscando: false,
  selecionado: null,
  diretorioAtual: null,
  diretorioRaiz: null,
};

const reducer = (state = initialState, action) => {

  switch (action.type) {

    case BUSCA_CONTEUDO_DIRETORIO_SUCCESS: {

      const { raiz, payload: { conteudo, diretorio } } = action;

      const diretorioRaiz = state.diretorioRaiz || (raiz ? diretorio : null);

      const diretorioAtual = diretorio;

      return { ...state, conteudo, diretorioAtual, diretorioRaiz, buscando: false };

    }

    case BUSCA_CONTEUDO_DIRETORIO_PENDING:
      return { ...state, conteudo: [], buscando: true };

    case BUSCA_CONTEUDO_DIRETORIO_FAILURE:
      return { ...state, buscando: false };

    case BUSCA_DETALHES_COMPARTILHAMENTO_DIRETORIO_SUCCESS:
      return { ...state, selecionado: action.payload };

    case ADICIONA_COMPARTILHAMENTO_SUCCESS: {

      const diretorioSalvo = action.payload;

      let { conteudo } = state.conteudo;

      const diretorioAnterior = conteudo.find(item => item.id === diretorioSalvo.id && item.diretorio);

      const indexDiretorioAnterior = conteudo.indexOf(diretorioAnterior);

      conteudo = update(conteudo, { $set: { [indexDiretorioAnterior]: diretorioSalvo } });

      return { ...state, selecionado: action.payload, conteudo };

    }

    case ADICIONA_ARQUIVO_SUCCESS: {

      const usuario = store.getState().app.usuario;

      const data = { ...action.payload, usuarioInclusao: usuario };

      return { ...state, conteudo: [...state.conteudo, data] };

    }

    case ADICIONA_DIRETORIO_SUCCESS: {

      const usuario = store.getState().app.usuario;

      const data = { ...action.payload, usuarioInclusao: usuario, diretorio: true };

      return { ...state, conteudo: [...state.conteudo, data] };

    }

    default:
      return state;
  }

};

export default reducer;
