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
    };

    this.abreDetalhe = this.abreDetalhe.bind(this);
    this.fechaDetalhe = this.fechaDetalhe.bind(this);

  }

  componentWillMount() {

    // this.props.buscaMinhasSolicitacoes();

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

  render() {

    const { detalhe, solicitacaoSelecionada } = this.state;

    const {
      solicitacoes,
      municipios,
      companhias,
      tiposSolicitacao,
    } = this.props;

    return (

      <div>

        <div
          className="Solicitacoes-acoes"
        >

          <SelectButton
            id="selectButtonNumbers"
            placeholder="Number"

            menuItems={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
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
  { app: { usuario }, solicitacao: { minhas }, municipio: { municipios }, companhia: { companhias }, tipoSolicitacao: { tipos } }) =>
  ({ usuario, solicitacoes: minhas, companhias, tiposSolicitacao: tipos, municipios });

Solicitacoes.propTypes = {
  // usuario: PropTypes.object.isRequired,
  solicitacoes: PropTypes.array.isRequired,
  municipios: PropTypes.array.isRequired,
  companhias: PropTypes.array.isRequired,
  tiposSolicitacao: PropTypes.array.isRequired,
  //buscaMinhasSolicitacoes: PropTypes.func.isRequired,
};

export default connect(mapState, { buscaMinhasSolicitacoes })(Solicitacoes);
