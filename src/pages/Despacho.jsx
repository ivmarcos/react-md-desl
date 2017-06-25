import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'react-md/lib/Dialogs';
import TabelaSolicitacoes from 'components/TabelaSolicitacoes';

class Despacho extends Component {

  state = {
    teste: false,
  }

  render() {

    const {
      visivel,
      solicitacoes,
      despacho,
      onClose,
    } = this.props;

    return (
      <Dialog
        id="dialogDespacho"
        visible={visivel}
        title={`Despacho #${despacho ? despacho.id : ''}`}
        onHide={onClose}
      >
        <TabelaSolicitacoes
          solicitacoes={solicitacoes}
        />
      </Dialog>
    );

  }

}

Despacho.propTypes = {
  despacho: PropTypes.object.isRequired,
  solicitacoes: PropTypes.array.isRequired,
  visivel: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};


export default Despacho;
