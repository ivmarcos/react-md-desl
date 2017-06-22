import React, { Component } from 'react';
import dateformat from 'lib/dateformat';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import DataTable from 'react-md/lib/DataTables/DataTable';
import Avatar from 'react-md/lib/Avatars';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableBody from 'react-md/lib/DataTables/TableBody';
import TableColumn from 'react-md/lib/DataTables/TableColumn';
import Menu from 'react-md/lib/Menus/Menu';
import ListItem from 'react-md/lib/Lists/ListItem';

import { AVATAR_URL, PROFILE_URL } from 'lib/constants';

import './TabelaDespacho.scss';


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
    label: 'Funcionário',
    key: 'funcionario.nome',
    size: 10,
  },
];


class TabelaSolicitacoes extends Component {

  constructor(props) {

    super(props);

    this.state = {
      columns: defaultColumns,
      listStyle: {
        top: 0,
        left: 0,
      },
    };

    this.handleSort = this.handleSort.bind(this);
    this.handleContextMenu = this.handleContextMenu.bind(this);

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


  handleSort(columnClicked) {

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

  handleContextMenu({ event, solicitacao }) {

    console.log('event,', event, solicitacao);

    console.log('event.offsetx', event.clientX);

    const left = event.clientX;

    const top = event.clientX + event.target.offsetTop;

    this.setState({
      listStyle: {
        top,
        left,
      },
    });

  }

  render() {

    const { columns, listStyle } = this.state;

    const { solicitacoes } = this.props;


    return (

      <div>

        <Menu
          isOpen
          listStyle={listStyle}
          position={Menu.Positions.CONTEXT}
        >
          <ListItem disabled primaryText="Redo" />
          <ListItem disabled primaryText="Cut" />
          <ListItem disabled primaryText="Paste" />
        </Menu>

        <DataTable plain>

          <TableHeader>
            <TableRow >
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

            {solicitacoes.map((solicitacao) => {

              const { id, dataHoraInclusao, funcionario } = solicitacao;

              return (
                <TableRow
                  className="TabelaDespacho-linha"
                  onContextMenu={event => this.handleContextMenu({ event, solicitacao })}
                >

                  <TableColumn>
                    {id}
                  </TableColumn>

                  <TableColumn>
                    {dateformat(dataHoraInclusao, 'mediumDate')}
                  </TableColumn>

                  <TableColumn>
                    <div className="md-grid md-cell--middle">
                      <Avatar
                        iconSized
                        key="avatar"
                        src={`${AVATAR_URL}${funcionario.chave}`}
                        href={`${PROFILE_URL}${funcionario.chave}`}
                        className="TabelaDespacho-avatar"
                      />
                      <span
                        className="md-cell--middle"
                      >
                        {funcionario.nomeExibicao || funcionario.nome}
                      </span>
                    </div>
                  </TableColumn>

                </TableRow>
              );

            })}

          </TableBody>
        </DataTable>

      </div>

    );

  }
}

TabelaSolicitacoes.propTypes = {
  solicitacoes: PropTypes.array.isRequired,
};

export default TabelaSolicitacoes;
