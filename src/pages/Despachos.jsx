import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TabelaDespacho from 'components/TabelaDespacho';

import { buscaDespachoss } from 'store/despacho';
import { TIPOS } from 'store/tipoStatus';

import './Despachos.scss';


class Despachos extends Component {


  constructor(props) {

    super(props);

    this.state = {
      exibirDespacho: false,
      despachoSelecionado: null,
    };


    this.handleCloseDespacho = this.handleCloseDespacho.bind(this);
   // this.handleChangeFiltro = this.handleChangeFiltro.bind(this);
    this.handleVisualizaDespacho = this.handleVisualizaDespacho.bind(this);

  }

  componentWillMount() {

  this.props.buscaDespachos(filtro);

  }

 /* filtra() {

    const { filtro } = this.state;

    this.props.buscaDespachos(filtro);

  }*/

  
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


  /*handleChangeFiltro({ tipo, value }) {

    this.setState(({filtro}) => ({
      filtro: { ...filtro, [tipo]: value },
    }),
      this.filtra,
    );

  }*/

  render() {

    const {
      exibirSolicitacao,
      despachoSelecionado,
      solicitacaoSelecionada,
      filtro,
    } = this.state;

    const {
      solicitacoes,
    } = this.props;

    return (

      <div>

        <TabelaDespacho
          despachos={despachos}
          onVisualizaDespacho={this.handleVisualizaDespacho}
        />


      </div>

    );

  }
}


const mapState = (
  { app: { usuario }, despacho: { despachos }}) =>
  ({ usuario, despachos });

Despachos.propTypes = {
  usuario: PropTypes.object.isRequired,
  despachos: PropTypes.array.isRequired,
  buscaDespachos: PropTypes.func.isRequired,
};

export default connect(mapState, { buscaDespachos })(Despachos);
