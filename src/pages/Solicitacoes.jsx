import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from 'react-md/lib/Buttons/Button';
import TabelaSolicitacoes from 'components/TabelaSolicitacoes';
import SelectButton from 'components/SelectButton';
import Solicitacao from 'pages/Solicitacao';
import ConfirmacaoDialog from 'components/ConfirmacaoDialog';

import { buscaMinhasSolicitacoes, novaSolicitacao } from 'store/solicitacao';
import { TIPOS } from 'store/tipoStatus';

import './Solicitacoes.scss';


class Solicitacoes extends Component {


  constructor(props) {

    super(props);

    this.state = {
      exibirSolicitacao: false,
      solicitacao: null,
      filtro: {
        tipoStatus_id: TIPOS.SOLICITADO,
        usuarioInclusao_id: props.usuario.id,
      },
      tituloConfirmacao: 'Algo para confirmar',
      textoConfirmacao: 'texto para confirmacao',
    };

    this.handleNovaSolicitacao = this.handleNovaSolicitacao.bind(this);
    this.handleCloseSolicitacao = this.handleCloseSolicitacao.bind(this);
    this.handleChangeFiltro = this.handleChangeFiltro.bind(this);
    this.handleVisualizaSolicitacao = this.handleVisualizaSolicitacao.bind(this);
    this.handleCloseConfirmacao = this.handleCloseConfirmacao.bind(this);
    this.handleConfirma = this.handleConfirma.bind(this);

  }

  componentWillMount() {

    this.filtra();

  }

  filtra() {

    const { filtro } = this.state;

    this.props.buscaMinhasSolicitacoes(filtro);

  }

  handleNovaSolicitacao() {

    const { usuario } = this.props;

    this.setState({
      exibirSolicitacao: true,
      solicitacaoSelecionada: novaSolicitacao({ usuario }),
    });

  }

  handleCloseSolicitacao() {

    this.setState({
      exibirSolicitacao: false,
    });

  }

  handleVisualizaSolicitacao({ solicitacaoSelecionada }) {


    this.setState({
      solicitacaoSelecionada,
      exibirSolicitacao: true,
    });

  }


  handleChangeFiltro({ tipo, value }) {

    this.setState(prevState => ({
      filtro: { ...prevState.filtro, [tipo]: value },
    }),
      this.filtra,
    );

  }

  render() {

    const {
      exibirSolicitacao,
      solicitacaoSelecionada,
      filtro,
    } = this.state;

    const {
      solicitacoes,
      tiposStatus,
    } = this.props;

    return (

      <div>

        <div
          className="Solicitacoes-acoes"
        >

          <SelectButton
            id="filtroTipoStatus"
            placeholder="tipoStatus"
            itemLabel="nome"
            itemValue="id"
            onChange={value => this.handleChangeFiltro({ tipo: 'tipoStatus_id', value })}
            value={filtro.tipoStatus_id}
            menuItems={tiposStatus}
          />

          <Button
            raised
            label="Nova solicitação"
            onClick={this.handleNovaSolicitacao}
          />

        </div>

        <TabelaSolicitacoes
          solicitacoes={solicitacoes}
          onVisualizaSolicitacao={this.handleVisualizaSolicitacao}
        />

        <Solicitacao
          visivel={exibirSolicitacao}
          solicitacao={solicitacaoSelecionada}
          onClose={this.handleCloseSolicitacao}
        />

        <ConfirmacaoDialog
          visivel={exibirConfirmacao}
          onCancel={this.handleCloseConfirmacao}
          onClose={this.handleCloseConfirmacao}
          onConfirm={this.handleConfirma}
          titulo={tituloConfirmacao}
          texto={textoConfirmacao}
        />


      </div>

    );

  }
}


const mapState = (
  { app: { usuario }, solicitacao: { minhas }, tipoStatus: { tiposStatus } }) =>
  ({ usuario, solicitacoes: minhas, tiposStatus });

Solicitacoes.propTypes = {
  usuario: PropTypes.object.isRequired,
  solicitacoes: PropTypes.array.isRequired,
  tiposStatus: PropTypes.array.isRequired,
  buscaMinhasSolicitacoes: PropTypes.func.isRequired,
};

export default connect(mapState, { buscaMinhasSolicitacoes })(Solicitacoes);
