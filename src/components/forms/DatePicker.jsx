import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-md/lib/Pickers/DatePickerContainer';


const DatePickerWrapper = ({ input, label, ...custom }) => {

  console.debug('RENDER DP');

  return (
    <DatePicker
      id={`dt${input.name}`}
      label={label}
      {...input}
      {...custom}
    />
  );

};

DatePickerWrapper.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
};

export default DatePicker;
