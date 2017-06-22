import { api } from 'lib/api';
import createAction from 'lib/createAction';

const BUSCA_ARQUIVOS_DIRETORIO = 'BUSCA_ARQUIVOS_DIRETORIO';

const ADICIONA_ARQUIVO = 'ADICIONA_ARQUIVO';
export const ADICIONA_ARQUIVO_SUCCESS = 'ADICIONA_ARQUIVO_SUCCESS';

export const adicionaArquivo = (data, arquivo) => createAction(
    ADICIONA_ARQUIVO,
    api.post('/arquivo', data),
    { msg: `Upload do arquivo ${arquivo.nome || arquivo.name} feito com sucesso.` },
    { msg: 'Houve um erro ao tentar fazer o upload do arquivo.' },
    { msg: `Adicionando arquivo ${arquivo.nome || arquivo.name}...` },
  );

export const buscaArquivosDiretorio = diretorioId => createAction(BUSCA_ARQUIVOS_DIRETORIO, api.get(`/arquivo/diretorio/${diretorioId}`));

const initialState = {
  arquivos: null,
};

const reducer = (state = initialState, action) => {

  if (action.type === BUSCA_ARQUIVOS_DIRETORIO) {

    return { ...state, arquivos: action.payload };

  }

  return state;

};

export default reducer;
