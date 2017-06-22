import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from 'react-md/lib/Cards/Card';
import Button from 'react-md/lib/Buttons/Button';
import TabelaSolicitacoes from 'components/TabelaSolicitacoes';
import Solicitacao from 'components/Solicitacao';

class Solicitacoes extends Component {


  constructor(props) {

    super(props);

    this.state = {
      detalhe: true,
      solicitacaoSelecionada: null,
    };

    this.abreDetalhe = this.abreDetalhe.bind(this);
    this.fechaDetalhe = this.fechaDetalhe.bind(this);

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

    return (

      <div>

        <Button
          raised
          primary
          label="Nova solicitação"
          onClick={this.abreDetalhe}
        />

        <Card>
          <TabelaSolicitacoes />
        </Card>

        <Solicitacao
          visivel={detalhe}
          solicitacao={solicitacaoSelecionada}
          onClose={this.fechaDetalhe}
        />

      </div>

    );

  }
}


const mapState = ({ app: { usuario } }) => ({ usuario });

Solicitacoes.propTypes = {
  usuario: PropTypes.object.isRequired,
};

export default connect(mapState)(Solicitacoes);
