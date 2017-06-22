import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './Home.scss';

const Home = ({ usuario }) => (
  <div>
    {usuario.nome}
  </div>
  );

Home.propTypes = {
  usuario: PropTypes.object.isRequired,
};

const mapState = ({ app: { usuario } }) => ({ usuario });

export default connect(mapState)(Home);
