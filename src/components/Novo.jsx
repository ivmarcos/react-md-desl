import React, { Component } from 'react';
import Dialog from 'react-md/lib/Dialogs';
import PropTypes from 'prop-types';
import FileInput from 'react-md/lib/FileInputs';
import TextField from 'react-md/lib/TextFields';
import Button from 'react-md/lib/Buttons/Button';
import Aviso from 'components/Aviso';
import { temAcesso } from 'lib/util/diretorio';

import { COMPARTILHAMENTO_ADMINISTRADOR } from 'store/compartilhamento';

import './Novo.scss';

const initialState = {
  arquivos: null,
  arquivoSelecionado: {},
  label: '',
  valor: '',
  diretorio: false,
  arquivo: false,
  exibirAcoes: true,
};

class Novo extends Component {

  state = initialState;

  componentWillReceiveProps(nextProps) {

    if (this.props.visivel !== nextProps.visivel) {

      console.debug('resetando!!');

      this.setState(initialState);

    }

  }

  componentDidUpdate(prevProps, prevState) {

    if (!this.state.exibirAcoes && prevState.exibirAcoes) {


      setTimeout(() => this.input.getField().focus());

    }

  }

  handleKeyDown = (e) => {

    // se pressionou enter, salva
    if (e.keyCode === 13) {

      if (this.state.valor) this.handleSave();


    }

  }

  handleChangeValor = (valor) => {

    this.setState({ valor });

  }


  handleSave = () => {

    const { onSave } = this.props;
    const { diretorio, arquivo, arquivoSelecionado } = this.state;

    const valor = this.state.valor;

    const dados = {
      diretorio: diretorio ? { nome: valor } : null,
      arquivo: arquivo ? { file: arquivoSelecionado, nome: valor } : null,
    };

    onSave(dados);

  }

  handleClickNovaPasta = () => {

    this.setState({
      label: 'Nome da pasta',
      valor: '',
      diretorio: true,
      exibirAcoes: false,
    });

  }

  handleFileSelect = (file) => {

    if (file) {


      this.setState({
        arquivoSelecionado: file,
        label: 'Nome do arquivo para exibição',
        valor: file.name.substr(0, file.name.lastIndexOf('.')) || file.name, // remove a extensao
        arquivo: true,
        exibirAcoes: false,
      });

    }

  }

  render() {

    const { visivel, onHide, diretorioAtual, acessos, usuario } = this.props;

    const { valor, label, exibirAcoes } = this.state;

    const isRaiz = !diretorioAtual;

    const isAdmin = acessos.indexOf('ARQ1') > -1;

    const isPermitidoUploadDiretorioAtual = temAcesso(diretorioAtual, usuario, acessos, COMPARTILHAMENTO_ADMINISTRADOR);

    // diretorio raiz pode ser criado somente se o usuário tiver acesso de admin (ARQ1)
    const isPermitidoUploadDiretorio = isRaiz ? isAdmin : isPermitidoUploadDiretorioAtual;

    // se for raiz nao permite o upload de arquivos, pois diretorio é obrigatorio para se vincular o arquivo
    const isPermitidoUploadArquivo = isRaiz ? false : isPermitidoUploadDiretorioAtual;

    // usado para notificar o pobre usuário que ele não possui nenhum acesso para upload na pasta atual
    const isNegadoTodosUploads = !isPermitidoUploadDiretorio && !isPermitidoUploadArquivo;

    return (

      <Dialog
        id="cadastro"
        visible={visivel}
        onHide={onHide}
        className="novo-dialogo"
        title="Novo"
        actions={[
          {
            onClick: onHide,
            label: 'Cancelar',
          },
          {
            onClick: this.handleSave,
            primary: true,
            disabled: !valor,
            label: 'Salvar',
          }]}
      >
        <div className="novo-container md-grid">

          {isNegadoTodosUploads &&
            <div
              className="md-grid"
            >
              <Aviso
                className="md-cell md-cell--12"
              >
                {`Você não possui acesso para fazer upload nesse ${isRaiz ? 'contexto raiz' : 'diretório'}.`}
              </Aviso>
            </div>
          }

          {exibirAcoes &&
            <div className="md-grid novo-acoes">
              <Button
                raised
                secondary
                label="Criar uma pasta"
                onClick={this.handleClickNovaPasta}
                disabled={!isPermitidoUploadDiretorio}
              />

              <FileInput
                id="novoArquivo"
                onChange={this.handleFileSelect}
                label="Selecionar um arquivo"
                disabled={!isPermitidoUploadArquivo}
                accept="*"
                primary
                name="images-1"
              />
            </div>}

          {!exibirAcoes &&
            <TextField
              ref={(node) => {

                this.input = node;

              }}
              value={valor}
              onChange={this.handleChangeValor}
              onKeyDown={this.handleKeyDown}
              id="novoItem"
              label={label}
              lineDirection="center"
              className="md-cell md-cell--12 novo-campo"
            />}


        </div>
      </Dialog>
    );

  }
}

Novo.propTypes = {
  visivel: PropTypes.bool,
  onHide: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  diretorioAtual: PropTypes.object,
  usuario: PropTypes.object.isRequired,
  acessos: PropTypes.array.isRequired,
};

Novo.defaultProps = {
  diretorioAtual: null,
};

Novo.defaultProps = {
  visivel: false,
};

export default Novo;
