import { api } from 'lib/api';
import createAction from 'lib/createAction';

const BUSCA_MINHAS_SOLICITACOES = 'BUSCA_MINHAS_SOLICITACOES';
const BUSCA_MINHAS_SOLICITACOES_SUCCESS = 'BUSCA_MINHAS_SOLICITACOES_SUCCESS';

const BUSCA_SOLICITACOES_VALIDACAO = 'BUSCA_SOLICITACOES_VALIDACAO';
const BUSCA_SOLICITACOES_VALIDACAO_SUCCESS = 'BUSCA_SOLICITACOES_VALIDACAO_SUCCESS';

export const buscaMinhasSolicitacoes = params => createAction(BUSCA_MINHAS_SOLICITACOES, api.get('/solicitacao', { params: { ...params, include: ['funcionario', 'usuarioInclusao', 'tipoStatus', 'trechos'] } }));

export const buscaSolicitacoesValidacao = params => createAction(BUSCA_SOLICITACOES_VALIDACAO, api.get('/solicitacao', { params: { ...params, include: ['funcionario', 'usuarioInclusao', 'tipoStatus', 'trechos'] } }));

export function novaSolicitacao({ usuario }) {

  return {
    funcionario_id: usuario,
    trechos: [
      {
        id: null,
      },
      {
        id: null,
      },
    ],
  };

}

const solicitacoes = [
  {
    id: 1,
    dataHoraInclusao: new Date(),

    funcionario: {
      id: 1,
      chave: 'F6805293',
      nome: 'Marcos Andrei Ivanechtchuk',
    },
    tipoStatus: {
      id: 1,
      nome: 'Solicitada',
    },
  },
  {
    id: 2,
    dataHoraInclusao: new Date(),
    funcionario: {
      id: 1,
      chave: 'F6805293',
      nome: 'Marcos Andrei Ivanechtchuk',
    },
    tipoStatus: {
      id: 1,
      nome: 'Solicitada',
    },
  },
];


const INITIAL_STATE = {
  minhas: solicitacoes,
  validacao: solicitacoes,
};

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

    case BUSCA_MINHAS_SOLICITACOES_SUCCESS:

      return { ...state, minhas: action.payload };

    case BUSCA_SOLICITACOES_VALIDACAO_SUCCESS:

      return { ...state, validacao: action.payload };

    default:

      return state;
  }

};

export default reducer;
