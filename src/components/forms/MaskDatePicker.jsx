import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';

import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import './MaskDatePicker.scss';

import MaskInput from './MaskInput';

class MaskDatePicker extends Component {

  constructor(props) {

    super(props);

    this.state = {
      selected: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeRaw = this.handleChangeRaw.bind(this);

  }

  handleChangeRaw(e) {


    const value = e.target.value;

    console.log('RAW', value);

    const {
      dateFormat,
    } = this.props;

    const selected = moment(value, dateFormat);

    if (selected.isValid()) this.handleChange(selected);

  }

  handleChange(selected) {

    console.log('selected', selected);

    const {
      onChange,
    } = this.props;

    this.setState({
      selected,
    });

    let date = selected;

    if (date) {

      date = selected._i ? moment(selected._i, selected._f).toDate() : selected._d;

    }

    if (onChange) onChange(date);

  }

  render() {

    const {
      selected,
    } = this.state;

    const {
      mask,
      maskChar,
      label,
      placeholder,
    } = this.props;

    return (
      <div className="md-cell md-cell--6">
        <DatePicker
          allowSameDay
          customInput={<MaskInput
            mask={mask}
            maskChar={maskChar}
            label={label}
            placeholder={placeholder}
            // onChange={e => console.log('inner!', e.target.value)}
          />}
          selected={selected}
          className="md-text-field md-text md-text-field--inline-indicator md-full-width md-text-field--floating-margin"
          dateFormat="DD/MM/YYYY HH:mm"
          onChange={this.handleChange}
          onChangeRaw={this.handleChangeRaw}
          // onKeyDown={e => console.log('e', e)}
        />
      </div>
    );

  }

}

MaskDatePicker.propTypes = {
  mask: PropTypes.string,
  onChange: PropTypes.func,
  maskChar: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
};

MaskDatePicker.defaultProps = {
  onChange: undefined,
  mask: '99/99/9999 99:99',
  maskChar: ' ',
  label: undefined,
  placeholder: undefined,
};
export default MaskDatePicker;
