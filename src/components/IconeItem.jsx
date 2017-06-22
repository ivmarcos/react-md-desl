import React from 'react';
import PropTypes from 'prop-types';
import { RESTRICAO_PUBLICO } from 'lib/constants';

import './IconeItem.scss';

const Tipo = {
  PDF: {
    iconClassName: 'material-icons',
    children: 'picture_as_pdf',
  },
  PNG: {
    iconClassName: 'material-icons',
    children: 'photo',
  },
  JPEG: {
    iconClassName: 'material-icons',
    children: 'photo',
  },
  DIR: {
    iconClassName: 'material-icons',
    children: 'folder',
  },
  DIR_PUB: {
    iconClassName: 'material-icons',
    children: 'folder_shared',
  },
  FILE: {
    iconClassName: 'material-icons icone-file',
    children: 'insert_drive_file',
  },
};

const IconeItem = ({ item, className, ...props }) => {

  const { extensao, diretorio, tipoRestricao_id } = item;

  const isPublico = tipoRestricao_id === RESTRICAO_PUBLICO;

  const isDir = diretorio;

  const sigla = isDir ? 'DIR' : extensao.toUpperCase();

  const siglaFinal = isPublico && isDir ? `${sigla}_PUB` : sigla;

  const { iconClassName, children } = Tipo[siglaFinal] || Tipo.FILE;

  const title = `Item ${isPublico ? 'sem' : 'com'} restrição de visualização`;

  return (
    <i className={[iconClassName, className, `icone-${sigla.toLowerCase()}`].join(' ')} title={title} {...props}>{children}</i>
  );

};

IconeItem.propTypes = {
  item: PropTypes.object.isRequired,
  className: PropTypes.string,
};

IconeItem.defaultProps = {
  className: null,
};


export default IconeItem;
