/* Header.jsx */
import React from 'react';
import PropTypes from 'prop-types';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';
// import FontIcon from 'react-md/lib/FontIcons';
// import IconSeparator from 'react-md/lib/Helpers/IconSeparator';


const Header = ({ onClick, columns }) => (
  <TableHeader>
    <TableRow>
      {columns.map(column => (
        <TableColumn
          key={column.key}
          style={{ width: `${column.size}%` }}
          onClick={() => onClick(column)}
          sorted={column.sorted}
        >
          {column.label}
        </TableColumn>
      ))}
    </TableRow>
  </TableHeader>
);

Header.propTypes = {
  onClick: PropTypes.func.isRequired,
  columns: PropTypes.array.isRequired,
};


export default Header;
