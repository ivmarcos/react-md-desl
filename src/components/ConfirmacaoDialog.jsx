import React, { Component } from 'react';
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
          visible={visible}
          title={titulo}
          onHide={onClose}
          aria-labelledby="conteudoDialogo"
          modal
          actions={[{
              onClick: onConfirm,
              primary: true,
              label: 'Confirmar',
            }, {
              onClick: onConfirm,
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
