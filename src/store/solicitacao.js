import { api } from 'lib/api';
import createAction from 'lib/createAction';

import { DESPACHA_SUCCESS } from 'store/despacho';

const BUSCA_MINHAS_SOLICITACOES = 'BUSCA_MINHAS_SOLICITACOES';
const BUSCA_MINHAS_SOLICITACOES_SUCCESS = 'BUSCA_MINHAS_SOLICITACOES_SUCCESS';

const BUSCA_SOLICITACOES_VALIDACAO = 'BUSCA_SOLICITACOES_VALIDACAO';
const BUSCA_SOLICITACOES_VALIDACAO_SUCCESS = 'BUSCA_SOLICITACOES_VALIDACAO_SUCCESS';

const MODIFICA_STATUS_SOLICITACOES = 'MODIFICA_STATUS_SOLICITACOES';
const MODIFICA_STATUS_SOLICITACOES_SUCCESS = 'MODIFICA_STATUS_SOLICITACOES_SUCCESS';

export const buscaMinhasSolicitacoes = params => createAction(BUSCA_MINHAS_SOLICITACOES, api.get('/solicitacao', { params: { ...params, include: ['funcionario', 'usuarioInclusao', 'tipoStatus', 'trechos'] } }));

export const buscaSolicitacoesValidacao = params => createAction(BUSCA_SOLICITACOES_VALIDACAO, api.get('/solicitacao', { params: { ...params, include: ['funcionario', 'usuarioInclusao', 'tipoStatus', 'trechos'] } }));

export const modificaStatusSolicitacao = data => createAction(MODIFICA_STATUS_SOLICITACOES, api.post('/solicitacao/alteraStatus', { data }));

export function novaSolicitacao({ usuario }) {

  return {
    funcionario_id: usuario,
    dataHoraInicio: null,
    dataHoraTermino: null,
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
    trechos: [
      {
        id: null,
      },
      {
        id: null,
      },
    ],
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
    trechos: [
      {
        id: null,
      },
      {
        id: null,
      },
    ],
  },
];


const INITIAL_STATE = {
  minhas: solicitacoes,
  validacao: solicitacoes,
};

function atualizaSolicitacoes({ solicitacoesAtualizadas, solicitacoesAnteriores }) {

  let novasSolicitacoes;

  solicitacoesAtualizadas.forEach((solicitacaoAtualizada) => {

    const solicitacao = solicitacoesAnteriores.find(s => s.id == solicitacaoAtualizada.id);

    const index = solicitacoesAnteriores.indexOf(solicitacao);

    solicitacoes = update(solicitacoesAnteriores, { [index]: { $set: solicitacaoAtualizada } });

  });

  return novasSolicitacoes;

}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

    case BUSCA_MINHAS_SOLICITACOES_SUCCESS:

      return { ...state, minhas: action.payload };

    case BUSCA_SOLICITACOES_VALIDACAO_SUCCESS:

      return { ...state, validacao: action.payload };

    case DESPACHA_SUCCESS: case MODIFICA_STATUS_SOLICITACOES_SUCCESS: {

      const solicitacoesAtualizadas = action.payload;

      const validacao = atualizaSolicitacoes({ solicitacoesAtualizadas, solicitacoesAnteriores: state.validacao });

      const minhas = atualizaSolicitacoes({ solicitacoesAtualizadas, solicitacoesAnteriores: state.minhas });

      return { ...state, validacao, minhas };

    }

    default:

      return state;
  }

};

export default reducer;
