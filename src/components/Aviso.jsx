import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-md/lib/Cards';
import CardText from 'react-md/lib/Cards/CardText';
import './Aviso.scss';

const Aviso = ({ children, className }) => (

  <Card
    className={['aviso', className].join(' ')}
  >
    <CardText>
      {children}
    </CardText>
  </Card>
);

Aviso.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Aviso.defaultProps = {
  className: '',
};

export default Aviso;
