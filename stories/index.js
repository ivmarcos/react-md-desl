import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Compartilhamento from '../src/components/Compartilhamento';
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

.add('React Date Picker With Mask Input', () => (
  <MaskDatePicker />
));


storiesOf('Autocomplete', module)
.add('Básico', () => (
  <Autocomplete />
));
