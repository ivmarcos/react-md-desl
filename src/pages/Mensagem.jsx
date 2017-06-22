import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Snackbar from 'react-md/lib/Snackbars';
import { connect } from 'react-redux';

class Mensagem extends Component {

  state = {
    autoHide: true,
    toasts: [],
  }

  componentWillReceiveProps(nextProps) {


    //        let toasts = this.state.toasts.slice();

    if (nextProps.mensagens != this.props.mensagens) {

      const mensagens = nextProps.mensagens.slice(this.props.mensagens.length);
      const toasts = mensagens.map(text => ({ text }));
      this.setState({ toasts });

    }

    if (nextProps.erros != this.props.erros) {

      const erros = nextProps.erros.slice(this.props.erros.length);
      const toasts = erros.map(text => ({ text }));
      this.setState({ toasts });

    }

  }


  shouldComponentUpdate(nextProps, nextState) {

    return nextState.toasts != this.state.toasts || nextState.autoHide != this.state.autoHide;

  }

  render() {


    return (
      <Snackbar
        {...this.state}
      />
    );

  }

}

Mensagem.propTypes = {
  mensagens: PropTypes.array,
  erros: PropTypes.array,
};

Mensagem.defaultProps = {
  mensagens: [],
  erros: [],
};

const mapStateToProps = ({ app: { mensagens, erros } }) => ({ mensagens, erros });

export default connect(mapStateToProps)(Mensagem);
