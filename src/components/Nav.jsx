import React from 'react';
import PropTypes from 'prop-types';
import NavigationDrawer from 'react-md/lib/NavigationDrawers';
import Button from 'react-md/lib/Buttons';
import Avatar from 'react-md/lib/Avatars';
import FontIcon from 'react-md/lib/FontIcons';
import ListItem from 'react-md/lib/Lists/ListItem';
import MenuButton from 'react-md/lib/Menus/MenuButton';
import { PROFILE_URL, CORREIO_URL, LOGOFF_URL, AVATAR_URL } from 'lib/constants';
import './Nav.scss';

const Nav = ({ chave, baseUrl, children, ...props }) => {

  const actions = [
    <Button key="search" icon>view_module</Button>,
    <Button key="assistente" icon>record_voice_over</Button>,
    <Button href={CORREIO_URL} key="mail" icon>mail</Button>,
    <Avatar
      key="avatar"
      src={`${AVATAR_URL}${chave}`}
      href={`${PROFILE_URL}${chave}`}
    />,
    <MenuButton
      id="vert-menu"
      icon
      buttonChildren="more_vert"
      className="menu-example"
    >
      <a href={`${PROFILE_URL}${chave}`} target="_blank" rel="noopener noreferrer">
        <ListItem
          leftIcon={<FontIcon>account_box</FontIcon>}
          primaryText="Meu Perfil"
        />
      </a>
      <a href={CORREIO_URL} target="blank">
        <ListItem
          leftIcon={<FontIcon className="md-icon">mail</FontIcon>}
          primaryText="Correio"
        />
      </a>
      <a href={`${baseUrl}${LOGOFF_URL}${location.href}`}>
        <ListItem
          leftIcon={<FontIcon>exit_to_app</FontIcon>}
          primaryText="Sair"
        />
      </a>
    </MenuButton >,
  ];

  return (
    <NavigationDrawer
      desktopMinWidth={800}
      toolbarTitle="DISEM"
      desktopDrawerType={NavigationDrawer.DrawerTypes.FLOATING}
      toolbarActions={actions}
      contentClassName="nav-content"
      defaultVisible
      {...props}
    >
      {children}
    </NavigationDrawer>
  );

};

Nav.propTypes = {
  chave: PropTypes.string.isRequired,
  baseUrl: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Nav;
