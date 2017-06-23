import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TabelaDespacho from 'components/TabelaDespacho';
import Solicitacao from 'components/Solicitacao';
import SelectButton from 'components/SelectButton';
import { buscaSolicitacoesValidacao } from 'store/solicitacao';

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


  render() {

    const {
      detalhe,
      filtro,
      solicitacaoSelecionada,
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


const mapState = ({ app: { usuario }, solicitacao: { validacao }, tipoStatus: { tiposStatus } }) => ({ usuario, solicitacoes: validacao, tiposStatus });

Despacho.propTypes = {
  // usuario: PropTypes.object.isRequired,
  solicitacoes: PropTypes.array.isRequired,
  tiposStatus: PropTypes.array.isRequired,
  buscaSolicitacoesValidacao: PropTypes.func.isRequired,
};

export default connect(mapState, { buscaSolicitacoesValidacao })(Despacho);
