import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from 'react-md/lib/Buttons/Button';
import TabelaSolicitacoes from 'components/TabelaSolicitacoes';
import SelectButton from 'components/SelectButton';
import Solicitacao from 'components/Solicitacao';

import { buscaMinhasSolicitacoes } from 'store/solicitacao';

import './Solicitacoes.scss';

class Solicitacoes extends Component {


  constructor(props) {

    super(props);

    this.state = {
      detalhe: false,
      solicitacaoSelecionada: null,
      filtro: {
        tipoStatus_id: 1,
        usuarioInclusao_id: props.usuario.id,
      },
    };

    this.abreDetalhe = this.abreDetalhe.bind(this);
    this.fechaDetalhe = this.fechaDetalhe.bind(this);
    this.handleChangeFiltro = this.handleChangeFiltro.bind(this);

  }

  componentWillMount() {

    this.filtra();

  }

  filtra() {

    const { filtro } = this.state;

    this.props.buscaMinhasSolicitacoes(filtro);

  }

  abreDetalhe() {

    this.setState({
      detalhe: true,
    });

  }

  fechaDetalhe() {

    this.setState({
      detalhe: false,
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
      detalhe,
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
            onClick={this.abreDetalhe}
          />

        </div>

        <TabelaSolicitacoes
          solicitacoes={solicitacoes}
        />

        <Solicitacao
          visivel={detalhe}
          solicitacao={solicitacaoSelecionada}
          municipios={municipios}
          companhias={companhias}
          tiposSolicitacao={tiposSolicitacao}
          onClose={this.fechaDetalhe}
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
