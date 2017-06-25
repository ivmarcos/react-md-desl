import React, { Component } from 'react';
import Dialog from 'react-md/lib/Dialogs';
import PropTypes from 'prop-types';

class ConfirmacaoDialog extends Component {

  render() {

    const {
        visivel,
        onCancel,
        onConfirm,
        onClose,
        titulo,
        texto,
    } = this.props;

    return (

      <Dialog
        id="confirmacaoDialogo"
        visible={visivel}
        title={titulo}
        onHide={onClose}
        aria-labelledby="conteudoDialogo"
        modal
        actions={[{
          onClick: onConfirm,
          primary: true,
          label: 'Confirmar',
        }, {
          onClick: onCancel,
          primary: true,
          label: 'Cancelar',
        }]}
      >
        <p id="conteudoDialogo" className="md-color--secondary-text">
          {texto}
        </p>
      </Dialog>
    );

  }
}

ConfirmacaoDialog.propTypes = {
  visivel: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  titulo: PropTypes.string.isRequired,
  texto: PropTypes.string.isRequired,
};

export default ConfirmacaoDialog;
