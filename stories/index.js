import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Input from '../src/components/forms/Input';
import MaskInput from '../src/components/forms/MaskInput';
import CustomInput from '../src/components/forms/CustomInput';
import MaskDatePicker from '../src/components/forms/MaskDatePicker';
import Autocomplete from '../src/components/forms/Autocomplete';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import '../src/App.scss';

storiesOf('Input', module)
.add('Básico', () => <Input />);


storiesOf('MaskInput', module)
.add('Básico', () => (<MaskInput
  mask="99/99/9999 99:99"
  maskChar="_"
  label="teste"
  onChange={e => console.log('value', e.target.value)}
/>));

const CustomInputDate = ({ onClick, value, onChange, onBlur, onFocus }) => (<MaskInput
  mask="99/99/9999 99:99"
  maskChar=" "
  onFocus={onFocus}
  onClick={onClick}
  onBlur={e => onBlur(e)}
  value={value}
  onChange={onChange}
/>);


storiesOf('DatePicker', module)
.add('React Date Picker With Custom Input', () => (
  <DatePicker
    customInput={<CustomInput
      mask="99/99/9999 99:99"
      maskChar=" "
      label="Data hora início"
      placeholder="ola"
    />}
    className="md-text-field md-text md-text-field--inline-indicator md-full-width md-text-field--floating-margin"
    dateFormat="DD/MM/YYYY HH:mm"
    onEnterKeyDown={e => console.log('enter')}
  />
))

.add('React Date Picker With Mask Input', () => {


  class Wrapper extends Component {

    state = {
      date: null,
    }

    handleChange = (date) => {

      console.log('date selected', date);

    }

    render() {

      const { date } = this.state;

      return (
        <MaskDatePicker
          defaultValue={date}
          onChange={this.handleChange}
        />
      );

    }

  }

  return (<Wrapper />);

});

/*
.add('React Date Picker With Mask Input and Range', () => {


  class Wrapper extends Component {

    state = {
      date: null,
      endDate: moment(),
      startDate: moment(),
    }

    handleChange = (date) => {

      console.log('date selected', date);

    }

    render() {

      const {
        date,
        endDate,
        startDate,
      } = this.state;

      return (
        <div>
        <MaskDatePicker
          defaultValue={date}
          selectsStart
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onChange={this.handleChange}
        />
         <MaskDatePicker
          defaultValue={date}
           selectsEnd
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onChange={this.handleChange}
        />
        </div>
      );

    }

  }

  return (<Wrapper />);

});
*/
storiesOf('Autocomplete', module)
.add('Básico', () => (
  <Autocomplete />
));
