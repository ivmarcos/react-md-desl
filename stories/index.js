import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Compartilhamento from '../src/components/Compartilhamento';
import Input from '../src/components/forms/Input';
import MaskInput from '../src/components/forms/MaskInput';
import CustomInput from '../src/components/forms/CustomInput';
import MaskDatePicker from '../src/components/forms/MaskDatePicker';
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
  />
))
.add('React Date Picker With Mask Input', () => (
  <MaskDatePicker />
));

storiesOf('Compartilhamento', module)
  .add('Básico', () => {

    const tiposCompartilhamento = [
      {
        id: 1,
        nome: 'Administrador',
      },
      {
        id: 2,
        nome: 'Consulta',
      },
    ];


    const itensTeste = [
      {
        id: 1,
        nome: 'teste',
        tipo_id: 1,
      },
      {
        id: 2,
        nome: 'teste2',
        tipo_id: 1,
      },
      {
        id: 3,
        nome: 'teste3',
        tipo_id: 1,
      },

    ];

    const itensAutoComplete = itensTeste;


    return (
      <Compartilhamento
        itensAutoComplete={itensAutoComplete}
        itens={itensTeste}
        onAdicionaItem={item => alert(`item adicionado${item.id}`)}
        onAtualizaItem={({ item, tipo_id }) => alert(`item atualizado ${item.id}, tipo${tipo_id}`)}
        onRemoveItens={itensRemovidos => alert(`itens removidos${itensRemovidos.length}`)}
        onChangeAutoComplete={value => console.log(`change-autocomplete: ${value}`)}
        placeholderAutoComplete="Compartilhar com..."
        tiposCompartilhamento={tiposCompartilhamento}
      />
    );


  });
