import React, { Component } from 'react';
import dateformat from 'lib/dateformat';
import PropTypes from 'prop-types';
import DataTable from 'react-md/lib/DataTables/DataTable';
import Avatar from 'react-md/lib/Avatars';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableBody from 'react-md/lib/DataTables/TableBody';
import TableColumn from 'react-md/lib/DataTables/TableColumn';
import Card from 'react-md/lib/Cards/Card';
import Button from 'react-md/lib/Buttons';
import Menu from 'react-md/lib/Menus/Menu';
import ListItem from 'react-md/lib/Lists/ListItem';

import Currency from 'components/Currency';

import { sort, getOffset } from 'lib/util/react';

import { AVATAR_URL, PROFILE_URL } from 'lib/constants';

import './TabelaDespacho.scss';

const defaultColumns = [
  {
    label: '#',
    key: 'id',
    size: 10,
  },
  {
    label: 'Em',
    key: 'dataHoraInclusao',
    size: 10,
  },
  {
    label: 'Por ',
    key: 'usuarioInclusao.nome',
    size: 25,
  },
  {
    label: '',
    key: 'action',
    size: 2,
  },
];


class TabelaDespacho extends Component {

  constructor(props) {

    super(props);

    this.state = {
      columns: defaultColumns,
      exibirMenu: false,
      listStyle: {
        top: 0,
        left: 0,
      },
      selectedRows: [],
      count: 0,
    };

    this.handleSort = this.handleSort.bind(this);
    this.handleOpenMenu = this.handleOpenMenu.bind(this);
    this.handleCloseMenu = this.handleCloseMenu.bind(this);

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

  handleMenuClick = (acao) => {

    console.log('acao', acao);
    alert('stopped');

  }


  handleRowToggle = (row, toggled, count) => {

    const { solicitacoes } = this.props;

    let selectedRows = [];

    if (row === -1) {

      selectedRows = solicitacoes.map(() => toggled);

    } else {

      selectedRows[row] = toggled;

    }

    this.setState({ count, selectedRows });

  };


  render() {

    const { columns, listStyle, exibirMenu } = this.state;

    const { solicitacoes } = this.props;

    return (

      <div>


        <Card>


          <DataTable
            baseId="TabelaDespacho"
            plain
          >

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

              {despachos.map((despacho) => {

                const {
                  id,
                  dataHoraInclusao,
                  usuarioInclusao,
                } = solicitacao;

                return (
                  <TableRow
                    className="TabelaDespacho-linha"
                    key={id}
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
                          src={`${AVATAR_URL}${usuarioInclusao.chave}`}
                          href={`${PROFILE_URL}${usuarioInclusao.chave}`}
                          className="TabelaDespacho-avatar"
                        />
                        <span
                          className="md-cell--middle"
                        >
                          {usuarioInclusao.nomeExibicao || usuarioInclusao.nome}
                        </span>
                      </div>
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
          <ListItem
              primaryText="Aprovar"
              onClick={() => this.handleMenuClick(acao)}
            />
          <ListItem
              primaryText="Rejeitar"
              onClick={() => this.handleMenuClick(acao)}
            />
        </Menu>


      </div>

    );

  }
}

TabelaDespacho.propTypes = {
  solicitacoes: PropTypes.array.isRequired,
};

export default TabelaDespacho;
