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
    label: 'Despachado em',
    key: 'dataHoraInclusao',
    size: 10,
  },
  {
    label: 'Responsável ',
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
    };

    this.handleSort = this.handleSort.bind(this);
    this.handleOpenMenu = this.handleOpenMenu.bind(this);
    this.handleCloseMenu = this.handleCloseMenu.bind(this);

  }


  componentWillMount() {

    const { despachos } = this.props;

    this.setState({
      despachos,
    });

  }

  componentWillReceiveProps(nextProps) {

    if (this.props.despachos !== nextProps.despachos) {

      this.setState({
        despachos: nextProps.despachos,
      });

    }

  }

  handleSort(columnClicked) {

    const { columns, despachos } = this.state;
    const column = columnClicked;

    column.sorted = !column.sorted;

    columns.forEach((col) => {

      if (col !== column) {

        //eslint-disable-next-line        
        col.sorted = undefined;

      }

    });

    this.setState({
      despachos: sort(despachos, column.key, column.sorted),
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

  render() {

    const { columns, listStyle, exibirMenu } = this.state;

    const { despachos } = this.props;

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
                } = despacho;

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
                        onClick={event => this.handleOpenMenu({ event, despacho })}
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
            primaryText="Visualizar"
          />
          <ListItem
            primaryText="Aprovar"
          />
          <ListItem
            primaryText="Rejeitar"
          />
        </Menu>


      </div>

    );

  }
}

TabelaDespacho.propTypes = {
  despachos: PropTypes.array.isRequired,
};

export default TabelaDespacho;
