import React, { Component } from 'react';
import dateformat from 'lib/dateformat';
import PropTypes from 'prop-types';
import DataTable from 'react-md/lib/DataTables/DataTable';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableBody from 'react-md/lib/DataTables/TableBody';
import Button from 'react-md/lib/Buttons';
import Card from 'react-md/lib/Cards/Card';
import TableColumn from 'react-md/lib/DataTables/TableColumn';
import Menu from 'react-md/lib/Menus/Menu';
import Currency from 'components/Currency';
import ListItem from 'react-md/lib/Lists/ListItem';

import { sort, getOffset } from 'lib/util/react';

import './TabelaSolicitacoes.scss';


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
    label: 'Início em',
    key: 'dataHoraInicio',
    size: 10,
  },
  {
    label: 'Término em',
    key: 'dataHoraTermino',
    size: 10,
  },
  {
    label: 'Valor estimado',
    key: 'valorEstimado',
    size: 10,
  },
  {
    label: 'Status',
    key: 'tipoStatus.nome',
    size: 10,
  },
  {
    label: '',
    size: 2,
  },
];


const CANCELAMENTO = {
  id: 1,
  label: 'Cancelar',
};

const VISUALIZAR = {
  id: 1,
  label: 'Visualizar',
};

const ACOES = [CANCELAMENTO, VISUALIZAR];


class TabelaSolicitacoes extends Component {

  constructor(props) {

    super(props);

    const { solicitacoes } = props;

    this.state = {
      columns: defaultColumns,
      listStyle: {
        top: 0,
        left: 0,
      },
      solicitacoes,
      exibirMenu: false,
    };

    this.handleSort = this.handleSort.bind(this);
    this.handleOpenMenu = this.handleOpenMenu.bind(this);
    this.handleCloseMenu = this.handleCloseMenu.bind(this);

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

  handleOpenMenu({ event }) {

    const element = event.target;

    const offset = getOffset(element);

    console.log('offset', offset);

    const left = offset.left - 300;

    const top = offset.top - 300;

    this.setState({
      listStyle: {
        top,
        left,
      },
      exibirMenu: true,
    });

  }

  handleCloseMenu(e) {

    const isContextMenuClicked = !!e.persist;
    const isOutsideClicked = !(e.target && e.target.className.indexOf('TabelaDespacho-trigger-contextMenu') > -1);

    if (isContextMenuClicked || isOutsideClicked) {

      this.setState({
        exibirMenu: false,
      });

    }


  }

  render() {

    const { columns, exibirMenu, listStyle } = this.state;
    const { solicitacoes } = this.props;

    return (

      <div>

        <Card>

          <DataTable
            baseId="tabelaSolicitacoes"
            plain
          >
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

              {solicitacoes.map((solicitacao) => {

                const {
                  id,
                  dataHoraInclusao,
                  dataHoraInicio,
                  dataHoraTermino,
                  valorEstimado,
                  tipoStatus,
                  } = solicitacao;

                return (

                  <TableRow
                    className="TabelaSolicitacoes-linha"
                    key={id}
                  >

                    <TableColumn>
                      {id}
                    </TableColumn>

                    <TableColumn>
                      {dateformat(dataHoraInclusao, 'mediumDate')}
                    </TableColumn>

                    <TableColumn>
                      {dateformat(dataHoraInicio, 'mediumDate')}
                    </TableColumn>

                    <TableColumn>
                      {dateformat(dataHoraTermino, 'mediumDate')}
                    </TableColumn>

                    <TableColumn>
                      <Currency
                        value={valorEstimado}
                      />
                    </TableColumn>

                    <TableColumn>
                      {tipoStatus.nome}
                    </TableColumn>

                    <TableColumn>
                      <Button
                        icon
                        onClick={event => this.handleOpenMenu({ event, solicitacao })}
                        className="TabelaDespacho-trigger-contextMenu"
                        iconClassName="material-icons TabelaDespacho-trigger-contextMenu"
                      >more_vert
                        </Button>
                    </TableColumn>


                  </TableRow>


                );

              })}
            </TableBody>
          </DataTable>

        </Card>

        <Menu
          isOpen={exibirMenu}
          listStyle={listStyle}
          onClose={this.handleCloseMenu}
          position={Menu.Positions.CONTEXT}
        >
          {ACOES.map(acao => (
            <ListItem
              primaryText={acao.label}
              onClick={() => this.handleMenuClick(acao)}
            />
          ))}
        </Menu>

      </div>

    );

  }
}

TabelaSolicitacoes.propTypes = {
  solicitacoes: PropTypes.array.isRequired,
};

export default TabelaSolicitacoes;
