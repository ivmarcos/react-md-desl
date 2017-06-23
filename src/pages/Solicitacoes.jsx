import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from 'react-md/lib/Buttons/Button';
import TabelaSolicitacoes from 'components/TabelaSolicitacoes';
import SelectButton from 'components/SelectButton';
import Solicitacao from 'components/Solicitacao';

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
    };

    this.handleNovaSolicitacao = this.handleNovaSolicitacao.bind(this);
    this.handleCloseSolicitacao = this.handleCloseSolicitacao.bind(this);
    this.handleChangeFiltro = this.handleChangeFiltro.bind(this);
    this.handleVisualizaSolicitacao = this.handleVisualizaSolicitacao.bind(this);

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
      municipios,
      companhias,
      tiposStatus,
      tiposSolicitacao,
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
          municipios={municipios}
          companhias={companhias}
          tiposStatus={tiposStatus}
          tiposSolicitacao={tiposSolicitacao}
          onClose={this.handleCloseSolicitacao}
        />

      </div>

    );

  }
}


const mapState = (
  { app: { usuario }, solicitacao: { minhas }, municipio: { municipios }, companhia: { companhias }, tipoSolicitacao: { tiposSolicitacao }, tipoStatus: { tiposStatus } }) =>
  ({ usuario, solicitacoes: minhas, companhias, tiposSolicitacao, tiposStatus, municipios });

Solicitacoes.propTypes = {
  usuario: PropTypes.object.isRequired,
  solicitacoes: PropTypes.array.isRequired,
  municipios: PropTypes.array.isRequired,
  companhias: PropTypes.array.isRequired,
  tiposSolicitacao: PropTypes.array.isRequired,
  tiposStatus: PropTypes.array.isRequired,
  buscaMinhasSolicitacoes: PropTypes.func.isRequired,
};

export default connect(mapState, { buscaMinhasSolicitacoes })(Solicitacoes);
