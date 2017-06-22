import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DataTable from 'react-md/lib/DataTables/DataTable';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableColumn from 'react-md/lib/DataTables/TableColumn';
import Button from 'react-md/lib/Buttons/Button';
import TableBody from 'react-md/lib/DataTables/TableBody';
import TableRow from 'react-md/lib/DataTables/TableRow';
import Autocomplete from 'react-md/lib/Autocompletes';
import throttle from 'lodash/throttle';
import SelectFieldColumn from 'react-md/lib/DataTables/SelectFieldColumn';

import './Compartilhamento.scss';

class Compartilhamento extends Component {


  constructor(props) {

    super(props);
    this.handleAutoComplete = this.handleAutoComplete.bind(this);
    this.handleRowToggle = this.handleRowToggle.bind(this);
    this.handleRemoveItens = this.handleRemoveItens.bind(this);
    this.handleChangeAutoComplete = this.handleChangeAutoComplete.bind(this);
    this.handleKeyDownAutoComplete = this.handleKeyDownAutoComplete.bind(this);
    this.throttleAutoComplete = throttle(this.handleChangeAutoComplete, 300);

  }

  state = {
    itensSelecionados: [],
    isTodosSelecionados: false,
  }


  // funcao que controla a seleção das linhas
  handleRowToggle(row) {

    // se estão todos selecionados
    const isTodos = row === -1;

    const { itensSelecionados, isTodosSelecionados } = this.state;

    const { itens } = this.props;

    if (isTodos) {

      this.setState({
        itensSelecionados: !isTodosSelecionados ? itens : [],
        isTodosSelecionados: !isTodosSelecionados,
      });

    } else {

      const item = itens[row];

      const index = itensSelecionados.indexOf(item);

      if (index > -1) {

        itensSelecionados.splice(index, 1);

      } else {

        itensSelecionados.push(item);

      }

      this.setState({
        itensSelecionados,
      });

    }


  }


  handleAutoComplete(item) {

    console.log('item', item);
    const { onAdicionaItem } = this.props;
    const { itens } = this.props;
    const itemSelecionado = itens.find(i => i.nome === item);
    onAdicionaItem(itemSelecionado);

  }

  handleKeyDownAutoComplete(e) {

    // verifica se teclou enter
    if (e.keyCode === 13) {

      const { itensAutoComplete, onAdicionaItem } = this.props;
      if (itensAutoComplete.length) onAdicionaItem(itensAutoComplete[0]);

    }

  }

  handleRemoveItens() {

    const { itensSelecionados } = this.state;
    const { onRemoveItens } = this.props;
    onRemoveItens(itensSelecionados);

  }

  handleChangeAutoComplete(value) {

    const { onChangeAutoComplete } = this.props;
    onChangeAutoComplete(value);

  }

  render() {

    const {
      itens,
      itensAutoComplete,
      onAtualizaItem,
      tiposCompartilhamento,
      placeholderAutoComplete,
    } = this.props;

    const { itensSelecionados } = this.state;

    return (
      <div className="md-grid">

        <Button
          raised
          label="Remover selecionadas"
          disabled={!itensSelecionados.length}
          onClick={this.handleRemoveItens}
        />

        {itensSelecionados.length}

        <div>
          <Autocomplete
            id="spotify-search"
            type="search"
            label=""
            className="md-cell md-cell--12"
            placeholder={placeholderAutoComplete}
            data={itensAutoComplete}
            dataLabel="nome"
            dataValue="id"
            onChange={this.throttleAutoComplete}
            clearOnAutocomplete
            onAutocomplete={this.handleAutoComplete}
            onKeyDown={this.handleKeyDownAutoComplete}
          />
        </div>

        <div className="compartilhamento-tabela">

          <DataTable
            onRowToggle={this.handleRowToggle}
          >
            <TableHeader>
              <TableRow>
                <TableColumn>id</TableColumn>
                <TableColumn>Nome</TableColumn>
                <TableColumn>Tipo</TableColumn>
              </TableRow>
            </TableHeader>

            <TableBody>
              {itens.map(item => (
                <TableRow key={item.id}>
                  <TableColumn>{item.id}</TableColumn>
                  <TableColumn>{item.nome}</TableColumn>
                  <SelectFieldColumn
                    menuItems={tiposCompartilhamento}
                    itemLabel="nome"
                    itemValue="id"
                    defaultValue={item.tipo_id}
                    onChange={tipo_id => onAtualizaItem({ item, tipo_id })}
                  />
                </TableRow>
              ))}
            </TableBody>

          </DataTable >

        </div>

      </div>

    );

  }

}


Compartilhamento.propTypes = {
  onAdicionaItem: PropTypes.func.isRequired,
  onAtualizaItem: PropTypes.func.isRequired,
  onRemoveItens: PropTypes.func.isRequired,
  tiposCompartilhamento: PropTypes.array.isRequired,
  placeholderAutoComplete: PropTypes.string,
  onChangeAutoComplete: PropTypes.func.isRequired,
  itensAutoComplete: PropTypes.array.isRequired,
  itens: PropTypes.array.isRequired,
};

Compartilhamento.defaultProps = {
  placeholderAutoComplete: '',
};

export default Compartilhamento;
