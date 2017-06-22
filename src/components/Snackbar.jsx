import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Snackbar from 'react-md/lib/Snackbars';

class SnackbarWrapper extends Component {

  state = {
    autoHide: true,
    toasts: [],
  }

  componentWillReceiveProps(nextProps) {


    if (nextProps.mensagens !== this.props.mensagens) {


      const mensagens = nextProps.mensagens.slice(this.props.mensagens.length);
      // eslint-disable-next-line
      const toasts = mensagens.map(mensagem => ({ text: mensagem }));

      console.log('toasts', toasts);

      this.setState({ toasts });

    }


  }


  shouldComponentUpdate(nextProps, nextState) {

    return nextState.toasts !== this.state.toasts;// || nextState.autoHide !== this.state.autoHide;

  }

  //eslint-disable-next-line  
  onDismiss = () => {

    console.log('ok');

    const [, ...toasts] = this.state.toasts;
    this.setState({ toasts });

  }


  render() {

    const { toasts, autoHide } = this.state;

    return (
      <Snackbar
        onDismiss={this.onDismiss}
        toasts={toasts}
        autoHide={autoHide}
      />
    );

  }

}

SnackbarWrapper.propTypes = {
  /*eslint-disable */
  mensagens: PropTypes.array,
  /*eslint-enable*/
};


export default SnackbarWrapper;
