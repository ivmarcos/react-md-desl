import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Bundle extends Component {
  state = {
    // short for "module" but that's a keyword in js, so "mod"
    mod: null
  }

  componentWillMount() {
    console.debug('vai montar');
    this.load(this.props)
  }

  componentWillReceiveProps(nextProps) {
      console.debug('RCPROPS', nextProps);
    if (nextProps.load !== this.props.load) {
      this.load(nextProps);
    }
  }

  load(props) {
    /*this.setState({
      mod: null
    })*/
    props.load((mod) => {
      this.setState({
        // handle both es imports and cjs
        mod: mod.default ? mod.default : mod
      })
    })
  }

  render() {
    const {mod} = this.state;
    console.debug('render', mod);
    return mod ? this.props.children(mod) : null;
  }
}

Bundle.propTypes = {
  load: PropTypes.func.isRequired
}

export default Bundle;