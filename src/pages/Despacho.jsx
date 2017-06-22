import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from 'react-md/lib/Cards/Card';
import TabelaSolicitacoes from 'components/TabelaSolicitacoes';
import Button from 'react-md/lib/Buttons/Button';

const Despacho = () => (
  <Card>
    <Button
      floating
      secondary
      fixed
    >
      add
    </Button>
    <TabelaSolicitacoes />
  </Card>
);

const mapState = ({ app: { usuario } }) => ({ usuario });

Despacho.propTypes = {
  usuario: PropTypes.object.isRequired,
};
export default connect(mapState)(Despacho);
