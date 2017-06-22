import React, { Component } from 'react';
import dateformat from 'lib/dateformat';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import DataTable from 'react-md/lib/DataTables/DataTable';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableBody from 'react-md/lib/DataTables/TableBody';
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

    return valueA > valueB ? superior : inferior;

  });

  return array;

}


const defaultColumns = [
  {
    label: '#',
    key: 'id',
    size: 25,
  },
  {
    label: 'Criado em',
    key: 'dataHoraInclusao',
    size: 10,
  },
  {
    label: 'Status',
    key: 'tipoStatus.nome',
    size: 10,
  },
];


class TabelaSolicitacoes extends Component {

  state = {
    columns: defaultColumns,
  }

  componentWillMount() {

    const { solicitacoes } = this.props;

    this.setState({
      solicitacoes,
    });

  }

  componentWillReceiveProps(nextProps) {

    if (this.props.solicitacoes !== nextProps.solicitacoes) {

      this.setState({
        solicitacoes: nextProps.solicitacoes,
      });

    }

  }


  handleSort = (columnClicked) => {

    console.log('column clicked', columnClicked);

    const { columns, solicitacoes } = this.state;
    const column = columnClicked;

    column.sorted = !column.sorted;

    columns.forEach((col) => {

      if (col !== column) {

        //eslint-disable-next-line        
        col.sorted = undefined;

      }

    });

    this.setState({
      solicitacoes: sort(solicitacoes, column.key, column.sorted),
    });

  }

  render() {

    const { columns } = this.state;
    const { solicitacoes } = this.props;

    return (
      <DataTable plain>
        <TableHeader>
          <TableRow>
            {columns.map(column => (
              <TableColumn
                key={column.key}
                onClick={() => this.handleSort(column)}
                sorted={column.sorted}
              >
                {column.label}
              </TableColumn>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>

          {solicitacoes.map(({ id, dataHoraInclusao, tipoStatus }) => (
            <TableRow>

              <TableColumn>
                {id}
              </TableColumn>

              <TableColumn>
                {dateformat(dataHoraInclusao, 'mediumDate')}
              </TableColumn>

              <TableColumn>
                {tipoStatus.nome}
              </TableColumn>

            </TableRow>
          ))}

        </TableBody>
      </DataTable>

    );

  }
}

TabelaSolicitacoes.propTypes = {
  solicitacoes: PropTypes.array.isRequired,
};

export default TabelaSolicitacoes;
