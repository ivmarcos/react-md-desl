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
import Button from 'react-md/lib/Buttons';
import Menu from 'react-md/lib/Menus/Menu';
import ListItem from 'react-md/lib/Lists/ListItem';

import { AVATAR_URL, PROFILE_URL } from 'lib/constants';

import './TabelaDespacho.scss';

function getOffset(element) {

  let x = 0;
  let y = 0;
  let el = element;
  while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {

    x += el.offsetLeft - el.scrollLeft;
    y += el.offsetTop - el.scrollTop;
    el = el.offsetParent;

  }
  return { top: y, left: x };

}


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
  {
    label: '',
    size: 5,
  },
];

const DESPACHO = {
  id: 1,
  label: 'Despachar',
};

const CANCELAMENTO = {
  id: 1,
  label: 'Cancelar',
};

const ACOES = [DESPACHO, CANCELAMENTO];

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

  setMenuRef = (el) => {

    if (el) this.menu = el;

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

    const top = offset.top - 100;

    this.setState({
      listStyle: {
        top,
        left,
      },
      exibirMenu: true,
    });

  }

  handleMenuClick = (acao) => {

    console.log('acao', acao);
    alert('stopped');

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

        <Menu
          isOpen={exibirMenu}
          listStyle={listStyle}
          ref={this.setMenuRef}
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

        <DataTable >

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

                  <TableColumn>
                    <Button
                      icon
                      onClick={event => this.handleOpenMenu({ event, solicitacao })}
                      className="TabelaDespacho-trigger-contextMenu"
                      iconClassName="TabelaDespacho-trigger-contextMenu"
                    >more_vert
                      </Button>
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

TabelaDespacho.propTypes = {
  solicitacoes: PropTypes.array.isRequired,
};

export default TabelaDespacho;
