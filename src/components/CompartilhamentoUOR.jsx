import React from 'react';
import DataTable from 'react-md/lib/DataTables/DataTable';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableColumn from 'react-md/lib/DataTables/TableColumn';
import TableBody from 'react-md/lib/DataTables/TableBody';
import TableRow from 'react-md/lib/DataTables/TableRow';
import Autocomplete from 'react-md/lib/Autocompletes';

const colunas = [
  'id',
  'nome',
];

const itens = [
  {
    id: 1,
    nome: 'teste',
  },
];

function onBuscaItens() {

}

function onRowToggle() {

  console.log('onRowToggle');

}

const CompartilhamentoUOR = () => (

  <div>
    <Autocomplete
      id="spotify-search"
      type="search"
      label="Type an artist name"
      className="md-cell"
      placeholder="Artist"
      data={colunas}
      dataLabel="name"
      dataValue="id"
      filter={null}
      // onChange={this._throttledSearch}
      clearOnAutocomplete
      onAutocomplete={onBuscaItens}
    />
    <DataTable
      onRowToggle={onRowToggle}
    >
      <TableHeader>
        <TableRow>
          {colunas.map(coluna => (
            <TableColumn>{coluna}</TableColumn>
        ))}
        </TableRow>
      </TableHeader>

      {itens.map(item => (
        <TableBody>
          <TableColumn selectColumnHeader>{item.id}</TableColumn>
          <TableColumn selectColumnHeader>{item.nome}</TableColumn>
        </TableBody>
      ))}
    </DataTable>
  </div>

);


export default CompartilhamentoUOR;
