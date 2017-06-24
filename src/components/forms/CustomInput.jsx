/*eslint-disable*/
import React, { Component } from 'react';
import MaskInput from './MaskInput';

import 'react-datepicker/dist/react-datepicker.css';

class CustomInput extends Component {

  render() {

    console.log('props', this.props)

    return (
      <MaskInput
        {...this.props}
        >
      </MaskInput>
    );

  }
}

export default CustomInput;

