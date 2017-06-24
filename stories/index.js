import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Compartilhamento from '../src/components/Compartilhamento';
import VirtualSelect from '../src/components/forms/Input';


import '../src/App.scss';

storiesOf('Virtual Select', module)
.add('Básico', () => <VirtualSelect />);

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
