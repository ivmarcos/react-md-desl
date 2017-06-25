import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import CardActions from 'react-md/lib/Cards/CardActions';
import CardText from 'react-md/lib/Cards/CardText';
import Button from 'react-md/lib/Buttons';
import TabelaValores from 'components/TabelaValores';

import './Despacha.scss';

const Despacha = ({ solicitacoes, onCancela, onDespacha }) => {

  const totalAComprometer = solicitacoes.map(selecionada => selecionada.valorEstimado).reduce((s1, s2) => s1 + s2, 0);

  return (

    <Card
      className="Despacha-card"
    >

      <CardTitle
        title={`${solicitacoes.length} selecionada${solicitacoes.length > 1 ? 's' : ''}.`}
        className="Despacha-card-title"
      />

      <CardText
        className="Despacha-card-text"
      >

        <p>Aviso: O valor das passagens geralmente alteram no momento da contratação. Os valores aqui servem apenas em caráter informativo.</p>

        <div className="md-grid">

          <div className="md-cell md-cell--4">
            <TabelaValores
              aComprometer={totalAComprometer}
              orcado={1000}
              realizado={1000}
              comprometido={1000}
            />
          </div>

        </div>

      </CardText>

      <CardActions >
        <Button
          flat
          label="Cancela"
          onClick={onCancela}
        >
        close
        </Button>
        <Button
          flat
          label="Despacha"
          onClick={onDespacha}
        >
        check
        </Button>
      </CardActions>
    </Card>
  );

};

Despacha.propTypes = {
  solicitacoes: PropTypes.array.isRequired,
  onDespacha: PropTypes.func.isRequired,
  onCancela: PropTypes.func.isRequired,
};

export default Despacha;
