import React from 'react';
import PropTypes from 'prop-types';
import DataTable from 'react-md/lib/DataTables/DataTable';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableBody from 'react-md/lib/DataTables/TableBody';
import TableColumn from 'react-md/lib/DataTables/TableColumn';
import Currency from 'components/Currency';

const colunas = ['Item', 'Valor'];

import './TabelaValores.scss';

const TabelaValores = ({ orcado, comprometido, realizado, aComprometer }) => {

  const linhas = [
    {
      nome: 'Orçado',
      valor: orcado,
    },
    {
      nome: 'Realizado',
      valor: realizado,
    },
    {
      nome: 'Comprometido (estimado)',
      valor: comprometido,
    },
    {
      nome: 'A comprometer (estimado)',
      valor: aComprometer,
    },
    {
      nome: <strong className="bold">Saldo (estimado)</strong>,
      valor: orcado - realizado - comprometido - aComprometer,
    },
  ];

  return (

    <DataTable
      baseId="TabelaValores"
      plain
    >

      <TableHeader>
        <TableRow
          className="TabelaValores-linha"
        >
          {colunas.map(coluna => (
            <TableColumn>
              {coluna}
            </TableColumn>
        ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {linhas.map(({ nome, valor }) => (
          <TableRow
            className="TabelaValores-linha"
          >
            <TableColumn>
              {nome}
            </TableColumn>
            <TableColumn>
              <Currency
                value={valor}
              />
            </TableColumn>
          </TableRow>
      ))}
      </TableBody>

    </DataTable>

  );

};

TabelaValores.propTypes = {
  orcado: PropTypes.number.isRequired,
  comprometido: PropTypes.number.isRequired,
  realizado: PropTypes.number.isRequired,
  aComprometer: PropTypes.number.isRequired,
};
export default TabelaValores;
