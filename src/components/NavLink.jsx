import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink, Route } from 'react-router-dom';
// import Button from 'react-md/lib/Buttons/Button';
import FontIcon from 'react-md/lib/FontIcons';
import ListItem from 'react-md/lib/Lists/ListItem';

const NavLink = ({ label, path, exact, icon, to }) => (
  <Route path={path} exact={exact}>
    {({ match }) => {

      let leftIcon;

      if (icon) {

        leftIcon = <FontIcon>{icon}</FontIcon>;

      }

      return (

        <div>


          <ListItem
            component={RouterLink}
            active={!!match}
            to={to || path}
            primaryText={label}
            leftIcon={leftIcon}
          />

        </div>
      );

    }}

  </Route>
);

NavLink.defaultProps = {
  path: null,
  exact: false,
  icon: null,
  to: null,
};

NavLink.propTypes = {
  label: PropTypes.string.isRequired,
  path: PropTypes.string,
  exact: PropTypes.bool,
  icon: PropTypes.node,
  to: PropTypes.string,
};

export default NavLink;

