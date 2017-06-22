import React from 'react';
import PropTypes from 'prop-types';
import routes from 'routes';

const Header = ({ location }) => {

  console.debug('location pathname', location.pathname);

  const route = routes.find(r => r.path === location.pathname);

  if (!route || route.noheader) return null;

  console.log('route', route);

  return (

    <div>
      <h4 className=" md-display-1 app-secao-titulo">
        {route.label}
      </h4>
    </div>
  );

};

Header.propTypes = {
  location: PropTypes.string.isRequired,
};

export default Header;
