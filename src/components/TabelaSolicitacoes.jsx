import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import DataTable from 'react-md/lib/DataTables/DataTable';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';

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

class TabelaSolicitacoes extends Component {

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

    const { columns } = this.state;

    return (
      <DataTable plain>
        <TableHeader>
          <TableRow>
            {columns.map(column => (
              <TableColumn
                key={column.key}
                sorted={column.sorted}
              >
                {column.label}
              </TableColumn>
            ))}
          </TableRow>
        </TableHeader>
        <TableRow>
          {columns.map(column => (
            <TableColumn
              key={column.key}
              sorted={column.sorted}
            >
              {column.label}
            </TableColumn>
          ))}
        </TableRow>
      </DataTable>

    );

  }
}

TabelaSolicitacoes.propTypes = {
  items: PropTypes.array.isRequired,
};

export default TabelaSolicitacoes;
