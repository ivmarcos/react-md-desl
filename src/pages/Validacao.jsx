import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TabelaValidacao from 'components/TabelaValidacao';
import Solicitacao from 'pages/Solicitacao';
import SelectButton from 'components/SelectButton';
import Button from 'react-md/lib/Buttons';
import { buscaSolicitacoesValidacao } from 'store/solicitacao';
import { despacha } from 'store/despacho';

class Despacho extends Component {


  constructor(props) {

    super(props);

    this.state = {
      detalhe: false,
      filtro: {
        tipoStatus_id: 1,
      },
      solicitacaoSelecionada: null,
    };

    this.abreDetalhe = this.abreDetalhe.bind(this);
    this.fechaDetalhe = this.fechaDetalhe.bind(this);
    this.handleChangeFiltro = this.handleChangeFiltro.bind(this);
    this.handleDespachar = this.handleDespachar.bind(this);
    this.handleCancelarDespacho = this.handleCancelarDespacho.bind(this);
    this.handleSelecionaDespacho = this.handleSelecionaDespacho.bind(this);

  }

  componentWillMount() {

    this.filtra();

  }


  filtra() {

    const { filtro } = this.state;

    this.props.buscaSolicitacoesValidacao(filtro);

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

  handleSelecionaDespacho(solicitacoesSelecionadas) {

    this.setState({
      solicitacoesSelecionadas,
      exibirDespacho: true,
    });

  }

  handleDespachar(solicitacoes) {

    this.props.despacha(solicitacoes);

  }

  handleCancelarDespacho() {

    this.setState({
      exibirDespacho: false,
    });

  }


  render() {

    const {
      detalhe,
      filtro,
      solicitacaoSelecionada,
      solicitacoesSelecionadas,
      exibirDespacho,
    } = this.state;

    const {
      solicitacoes,
      tiposStatus,
    } = this.props;

    const isSolicitacoesSelecionadas = !!solicitacoesSelecionadas.length;

    return (

      <div>


        <div
          className="Solicitacoes-acoes"
        >

          <SelectButton
            id="filtroStatus"
            placeholder="Number"
            itemLabel="nome"
            itemValue="id"
            onChange={value => this.handleChangeFiltro({ tipo: 'tipoStatus_id', value })}
            value={filtro.tipoStatus_id}
            menuItems={tiposStatus}
          />


          <SelectButton
            id="selectButtonNumbers"
            placeholder="Number"
            menuItems={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
          />

        </div>

        <div>

          {solicitacoesSelecionadas.length} selecionadas.

          Comprometido:
          Realizado:
          A comprometer (estimado):

          Saldo (estimado):

          Aviso: O valor das passagens geralmente alteram no momento da contratação. Os valores aqui servem apenas em caráter informativo.

          <Button
            raised
            primary
            label="Despachar"
            onClick={this.handleDespachar}
          >check
          </Button>

          <Button
            raised
            primary
            label="Cancelar"
            onClick={this.handleCancelarDespacho}
          >close
          </Button>

        </div>

        <TabelaValidacao
          solicitacoes={solicitacoes}
          onSelecionaDespacho={this.handleSelecionaDespacho}
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

Despacho.propTypes = {
  // usuario: PropTypes.object.isRequired,
  solicitacoes: PropTypes.array.isRequired,
  tiposStatus: PropTypes.array.isRequired,
  buscaSolicitacoesValidacao: PropTypes.func.isRequired,
};

export default connect(mapState, { buscaSolicitacoesValidacao, despacha })(Despacho);
