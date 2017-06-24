import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Despacho extends Component {

  state = {
    teste: false,
  }

  render() {

    return (
      <div> despacho</div>
    );

  }

}

Despacho.propTypes = {
  despacho: PropTypes.object.isRequired,
  solicitacoes: PropTypes.array.isRequired,
};
