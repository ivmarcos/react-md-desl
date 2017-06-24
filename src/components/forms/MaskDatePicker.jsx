import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import CustomInput from './MaskInput';
import moment from 'moment';

class MaskDatePicker extends Component {

  state = {
    selected: null,
  }


  handleChange = (selected) => {

    this.setState({
      selected,
    });

  }

  render() {

    return (
      <DatePicker
        allowSameDay
        customInput={<CustomInput
          mask="99/99/9999 99:99"
          maskChar=" "
          label="Data hora início"
          placeholder="ola"
        />}
        selected={this.state.selected}
        className="md-text-field md-text md-text-field--inline-indicator md-full-width md-text-field--floating-margin"
        dateFormat="DD/MM/YYYY HH:mm"
        onChange={this.handleChange}
        onKeyDown={e => console.log('e', e)}
      />

    );

  }

}

export default MaskDatePicker;
