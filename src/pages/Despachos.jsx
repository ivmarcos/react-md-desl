import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TabelaDespacho from 'components/TabelaDespacho';
import Despacho from 'pages/Despacho';

import { buscaDespachos } from 'store/despacho';

import './Despachos.scss';


class Despachos extends Component {

  constructor(props) {

    super(props);

    this.state = {
      exibirDespacho: false,
      despachoSelecionado: null,
      solicitacoesSelecionadas: [],
    };


    this.handleCloseDespacho = this.handleCloseDespacho.bind(this);
    this.handleVisualizaDespacho = this.handleVisualizaDespacho.bind(this);

  }

  componentWillMount() {

    this.props.buscaDespachos();

  }

  handleCloseDespacho() {

    this.setState({
      exibirDespacho: false,
    });

  }

  handleVisualizaDespacho({ despachoSelecionado }) {

    this.setState({
      despachoSelecionado,
      exibirDespacho: true,
    });

  }

  render() {

    const {
      exibirDespacho,
    } = this.state;

    const {
      despachos,
      solicitacoes,
    } = this.props;

    return (

      <div>

        <TabelaDespacho
          despachos={despachos}
          onVisualizaDespacho={this.handleVisualizaDespacho}
        />

        <Despacho
          visivel={exibirDespacho}
          solicitacoes={solicitacoes}
          onClose={this.handleCloseDespacho}
        />

      </div>

    );

  }
}


const mapState = (
  { app: { usuario }, despacho: { despachos } }) =>
  ({ usuario, despachos });

Despachos.propTypes = {
 // usuario: PropTypes.object.isRequired,
  solicitacoes: PropTypes.func.isRequired,
  despachos: PropTypes.array.isRequired,
  buscaDespachos: PropTypes.func.isRequired,
};

export default connect(mapState, { buscaDespachos })(Despachos);
