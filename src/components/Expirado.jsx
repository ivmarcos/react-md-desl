import React, { Component } from 'react';
import Dialog from 'react-md/lib/Dialogs';
import PropTypes from 'prop-types';
import Button from 'react-md/lib/Buttons/Button';

class Expirado extends Component {

//eslint-disable-next-line  
  logoff() {

    window.location.reload();

  }

  render() {

    const { expirado } = this.props;

    return (

      <Dialog
        id="expirado"
        visible={expirado}
        onHide={this.logoff}
        title="Sessão encerrada"
      >


        <div className="md-grid">
          <div className="md-cell md-cell--middle md-center md-cell--12">
            <p>Sua sessão foi encerrada. Clique no botão abaixo para continuar.</p>

            <Button
              raised
              primary
              label="fazer login"
              onClick={this.logoff}
            />
          </div>
        </div>
      </Dialog>
    );

  }
}

Expirado.propTypes = {
  expirado: PropTypes.bool.isRequired,
};

export default Expirado;
