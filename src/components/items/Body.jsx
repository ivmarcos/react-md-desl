import React, { PropTypes } from 'react';
import TableBody from 'react-md/lib/DataTables/TableBody';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';
import Avatar from 'react-md/lib/Avatars';
import IconeItem from 'components/IconeItem';
import { AVATAR_URL, PROFILE_URL } from 'lib/constants';
import Momento from './Momento';
import Tamanho from './Tamanho';
// import MenuItem from './MenuItem';
// import EditDialogColumn from 'react-md/lib/DataTables/EditDialogColumn';

import './Body.scss';

const Seguro = () => <i className="material-icons body-icone-info" title="Pasta com restrição de acesso.">lock</i>;

const Body = ({ items, usuario, onClick }) => {

  const rows = items.map((item) => {

    const { id, nome, dataHoraInclusao, usuarioInclusao, tamanho, extensao, transacoes } = item;

    return (
      <TableRow key={`${extensao}_${id}`} className="body-linha" >
        <TableColumn onClick={() => onClick(item)} >
          <div className="body-coluna-icone link">
            <IconeItem item={item} />
            <span>{nome}</span>
            {transacoes && transacoes.length > 0 && <Seguro /> }
          </div>
        </TableColumn >
        {/* eslint-disable */}
        <TableColumn>
          <div className="md-grid md-cell--middle">
          <Avatar
            iconSized  
            key="avatar"
            src={`${AVATAR_URL}${usuarioInclusao.chave}`}
            href={`${PROFILE_URL}${usuarioInclusao.chave}`}
            className="body-avatar"  
            />
          <span
            className="md-cell--middle">  
              {usuarioInclusao.id == usuario.id ? 'eu' : (usuarioInclusao.nomeExibicao || usuarioInclusao.nome)}
          </span>    
          </div>  
        </TableColumn>
      {/* eslint-enable */}
        <TableColumn>{Momento({ data: dataHoraInclusao, formato: 'mediumDate' })}</TableColumn>
        <TableColumn>{tamanho ? Tamanho(tamanho) : '-'}</TableColumn>
        {/* <MenuItem item={item} onCompartilharItem={onCompartilharItem} />
         <TableColumn><MenuItem item={item} /></TableColumn>*/}
      </TableRow>
    );

  });

  return <TableBody>{rows}</TableBody>;

};

Body.propTypes = {
  // large: PropTypes.bool.isRequired,
  // inline: PropTypes.bool.isRequired,
// okOnOutsideClick: PropTypes.bool.isRequired,
 // onCompartilharItem: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  usuario: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
};

export default Body;
