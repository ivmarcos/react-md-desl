import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import get from 'lodash/get';
import DataTable from 'react-md/lib/DataTables/DataTable';
import Header from './Header';
import Body from './Body';
import './TabelaItems.scss';


function sort(array, key, direction) {

  const ajuste = direction ? 1 : -1;
  const superior = 1 * ajuste;
  const inferior = -1 * ajuste;

  //eslint-disable-next-line
  array.sort((a, b) => {

    const valueA = get(a, key);
    const valueB = get(b, key);

    if (valueA === undefined) return inferior;
    if (valueB === undefined) return inferior;

    return valueA.toLowerCase() > valueB.toLowerCase() ? superior : inferior;

  });

  return array;

}

const defaultColumns = [
  {
    label: 'Nome',
    key: 'nome',
    size: 25,
  },
  {
    label: 'Proprietário',
    key: 'usuarioInclusao.nome',
    size: 15,
  },
  {
    label: 'Criado em',
    key: 'dataHoraInclusao',
    size: 10,
  },
  {
    label: 'Tamanho',
    key: 'tamanho',
    size: 10,
  },
];

class TabelaItems extends Component {

  state = {
    columns: defaultColumns,
  }

  componentWillMount() {

    const { items } = this.props;

    this.setState({
      items,
    });

  }

  componentWillReceiveProps(nextProps) {

    if (this.props.items !== nextProps.items) {

      this.setState({
        items: nextProps.items,
      });

    }

  }


  handleSort = (columnClicked) => {

    const { columns, items } = this.state;
    const column = columnClicked;

    column.sorted = !column.sorted;

    columns.forEach((col) => {

      if (col !== column) {

        //eslint-disable-next-line        
        col.sorted = undefined;

      }

    });

    this.setState({
      items: sort(items, column.key, column.sorted),
    });

  }

  render() {

    const { usuario, onClickItem, onCompartilharItem } = this.props;

    const { columns, items } = this.state;

    return (
      <DataTable plain>
        <Header
          columns={columns}
          onClick={this.handleSort}
        />
        <Body
          items={items}
          usuario={usuario}
          onClick={onClickItem}
          onCompartilharItem={onCompartilharItem}
        />
      </DataTable>

    );

  }
}

TabelaItems.propTypes = {
  usuario: PropTypes.object.isRequired,
  onClickItem: PropTypes.func.isRequired,
  onCompartilharItem: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
};

export default TabelaItems;
