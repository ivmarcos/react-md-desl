import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TabelaValidacao from 'components/TabelaValidacao';
import Solicitacao from 'pages/Solicitacao';


import { buscaSolicitacoesValidacao, alteraStatusSolicitacao } from 'store/solicitacao';
import Despacha from 'components/Despacha';

class Validacao extends Component {


  constructor(props) {

    super(props);

    this.state = {
      detalhe: false,
      solicitacaoSelecionada: null,
      solicitacoesSelecionadas: [],
    };

    this.abreDetalhe = this.abreDetalhe.bind(this);
    this.fechaDetalhe = this.fechaDetalhe.bind(this);
    this.handleDespachar = this.handleDespachar.bind(this);
    this.handleCancelarValidacao = this.handleCancelarValidacao.bind(this);
    this.handleSelecionaSolicitacoes = this.handleSelecionaSolicitacoes.bind(this);
    this.handleAlteraStatusSolicitacao = this.handleAlteraStatusSolicitacao.bind(this);

  }

  componentWillMount() {

    this.props.buscaSolicitacoesValidacao();

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

  handleSelecionaSolicitacoes(solicitacoesSelecionadas) {

    this.setState({
      solicitacoesSelecionadas,
      exibirValidacao: !!solicitacoesSelecionadas.length,
    });

  }

  handleCancelarValidacao() {

    this.setState({
      exibirValidacao: false,
    });

  }

  handleAlteraStatusSolicitacao({ solicitacao, tipoStatus_id }) {

    this.props.alteraStatusSolicitacao({ solicitacao, tipoStatus_id });

  }


  render() {

    const {
      detalhe,
      solicitacaoSelecionada,
      solicitacoesSelecionadas,
      exibirValidacao,
    } = this.state;

    const {
      solicitacoes,
    } = this.props;


    return (

      <div>

        {exibirValidacao &&

        <Despacha
          solicitacoes={solicitacoesSelecionadas}
          onCancela={this.handleCancelarValidacao}
          onDespacha={() => console.log('despacha')}
        />

        }

        <TabelaValidacao
          solicitacoes={solicitacoes}
          onSelecionaSolicitacoes={this.handleSelecionaSolicitacoes}
          onAlteraStatusSolicitacao={this.handleAlteraStatusSolicitacao}
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


const mapState = ({ app: { usuario }, solicitacao: { validacao }, tipoStatus: { tiposStatus } }) => ({ usuario, solicitacoes: validacao, tiposStatus });

Validacao.propTypes = {
  // usuario: PropTypes.object.isRequired,
  alteraStatusSolicitacao: PropTypes.func.isRequired,
  solicitacoes: PropTypes.array.isRequired,
  buscaSolicitacoesValidacao: PropTypes.func.isRequired,
};

export default connect(mapState, { buscaSolicitacoesValidacao, alteraStatusSolicitacao })(Validacao);
