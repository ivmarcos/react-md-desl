import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TabelaDespacho from 'components/TabelaDespacho';
import Solicitacao from 'components/Solicitacao';

import { buscaSolicitacoesValidacao } from 'store/solicitacao';

class Despacho extends Component {


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

    // this.props.buscaSolicitacoesValidacao();

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

    const { solicitacoes } = this.props;


    return (

      <div>

        <TabelaDespacho
          solicitacoes={solicitacoes}
        />

        <Solicitacao
          visivel={detalhe}
          solicitacao={solicitacaoSelecionada}
          onClose={this.fechaDetalhe}
        />

      </div>

    );

  }
}


const mapState = ({ app: { usuario }, solicitacao: { validacao } }) => ({ usuario, solicitacoes: validacao });

Despacho.propTypes = {
  // usuario: PropTypes.object.isRequired,
  solicitacoes: PropTypes.array.isRequired,
  ///buscaSolicitacoesValidacao: PropTypes.func.isRequired,
};

export default connect(mapState, { buscaSolicitacoesValidacao })(Despacho);
