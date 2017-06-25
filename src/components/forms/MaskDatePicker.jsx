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

    const { defaultValue } = props;

    this.state = {
      selected: defaultValue ? moment(defaultValue) : null,
    };

    this.handleChange = this.handleChange.bind(this);

  }

  componentWillReceiveProps(nextProps) {

    if (this.props.defaultValue !== nextProps.defaultValue) {

      console.log('novoooo valor', nextProps.defaultValue);
      this.setState({
        selected: nextProps.defaultValue ? moment(nextProps.defaultValue) : null,
      });

    }

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

    if (selected) {

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
      className,
      selectsEnd,
      selectsStart,
      startDate,
      endDate,
    } = this.props;

    return (
      <div className={className}>
        <DatePicker
          allowSameDay
          customInput={<MaskInput
            mask={mask}
            maskChar={maskChar}
            label={label}
            placeholder={placeholder}
          />}
          selected={selected}
          className="md-text-field md-text md-text-field--inline-indicator md-full-width md-text-field--floating-margin"
          dateFormat="DD/MM/YYYY HH:mm"
          onChange={this.handleChange}
          onKeyDown={e => console.log('e', e)}
          selectsEnd={selectsEnd}
          selectsStart={selectsStart}
          startDate={startDate}
          endDate={endDate}
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
  className: PropTypes.string,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.any,
  selectsEnd: PropTypes.any,
  selectsStart: PropTypes.any,
  startDate: PropTypes.any,
  endDate: PropTypes.any,
};

MaskDatePicker.defaultProps = {
  className: undefined,
  onChange: undefined,
  mask: '99/99/9999 99:99',
  maskChar: ' ',
  label: undefined,
  placeholder: undefined,
  defaultValue: null,
  selectsEnd: undefined,
  selectsStart: undefined,
  startDate: undefined,
  endDate: undefined,

};
export default MaskDatePicker;
