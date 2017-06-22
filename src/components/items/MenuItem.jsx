import React from 'react';
import PropTypes from 'prop-types';
import ListItem from 'react-md/lib/Lists/ListItem';
import MenuButton from 'react-md/lib/Menus/MenuButton';
import FontIcon from 'react-md/lib/FontIcons';
import config from 'config';

const DOWNLOAD_URL = `${config.apiUrl}/arquivo/download/`;

const MenuItem = ({ item, onCompartilharItem }) => (
  <MenuButton
    id="vert-menu"
    icon
    buttonChildren="more_vert"
    className="menu-example"
  >
    <a href={`${DOWNLOAD_URL}${item.id}`}>
      <ListItem
        disabled={item.diretorio}
        leftIcon={<FontIcon disabled={item.diretorio}>file_download</FontIcon>}
        primaryText="Download"
      />
    </a>
    <ListItem
      disabled
      leftIcon={<FontIcon disabled>share</FontIcon>}
      onClick={() => onCompartilharItem(item)}
      primaryText="Compartilhar..."
    />
    <ListItem
      disabled
      leftIcon={<FontIcon disabled>delete</FontIcon>}
      primaryText="Excluir"
    />
  </MenuButton>
);

MenuItem.propTypes = {
  item: PropTypes.object.isRequired,
  onCompartilharItem: PropTypes.func.isRequired,
};

export default MenuItem;
