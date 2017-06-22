import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TabelaItems from 'components/items/TabelaItems';
import Card from 'react-md/lib/Cards/Card';
import config from 'config';
import CircularProgress from 'react-md/lib/Progress/CircularProgress';
import { temAcesso } from 'lib/util/diretorio';
import { RAIZ_REGEX_URL } from 'lib/constants';

import CompartilhamentoForm from 'components/CompartilhamentoForm';

import { buscaConteudoDiretorio, buscaConteudoDiretorioRaiz, selecionaDiretorio } from 'store/diretorio';
import { enviaMensagem } from 'store/app';

class Items extends Component {

  state = {
    compartilhando: false,
  }

  componentWillMount() {

    console.log('props', this.props);

    const { match, location } = this.props;

    const id = match.params.id;

    if (!id) {

      console.log('não tem diretorio raiz!!!');

      this.props.buscaConteudoDiretorioRaiz();

    } else {

      console.log('é diretorio raiz');
      const raiz = RAIZ_REGEX_URL.test(location.pathname);

      this.props.buscaConteudoDiretorio({ id: match.params.id, raiz });

    }

  }

  handleClickItem = (item) => {

    const { history, acessos, usuario } = this.props;

    console.log('this.props', this.props);

    if (item.diretorio) {

      const isAutorizado = temAcesso(item, usuario, acessos);

      if (isAutorizado) {

        history.push(`/items/${item.id}`);

      } else {

        this.props.enviaMensagem(`Você não possui acesso à pasta "${item.nome}".`);

      }

    } else {

      // verifica se possui extensao associada ao nome e insere caso negativo
      const nomeArquivo = /\./.test(item.nome) ? item.nome : `${item.nome}.${item.extensao}`;

      window.open(`${config.apiUrl}/arquivo/${item.id}/${nomeArquivo}`);

    }

  }

  handleCompartilharItem = (item) => {

    this.setState({
      compartilhando: true,
    });

    this.props.selecionaDiretorio(item);

  }

  renderItems() {

    const { usuario, conteudo, selecionado } = this.props;

    const { compartilhando } = this.state;

    return (
      <Card>

        <TabelaItems
          usuario={usuario}
          items={conteudo}
          onClickItem={this.handleClickItem}
          onCompartilharItem={this.handleCompartilharItem}
        />

        <CompartilhamentoForm
          diretorio={selecionado}
          visivel={compartilhando && !!selecionado}

        />

      </Card>
    );

  }

  /*eslint-disable */
  renderPendente() {

    return <CircularProgress id="buscando-items" key="loading" />;

  }
  /*eslint-enable */

  render() {

    const { buscando } = this.props;

    return buscando ? this.renderPendente() : this.renderItems();


  }


}

Items.propTypes = {
  usuario: PropTypes.object.isRequired,
  enviaMensagem: PropTypes.func.isRequired,
  acessos: PropTypes.array.isRequired,
  conteudo: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired,
  buscaConteudoDiretorio: PropTypes.func.isRequired,
  buscaConteudoDiretorioRaiz: PropTypes.func.isRequired,
  selecionado: PropTypes.object,
  selecionaDiretorio: PropTypes.func.isRequired,
  // atual: PropTypes.object.isRequired,
  buscando: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

Items.defaultProps = {
  selecionado: null,
};

export default withRouter(
  connect(({ app: { usuario, acessos }, diretorio: { conteudo, atual, buscando, selecionado } }) => ({ usuario, acessos, conteudo, buscando, atual, selecionado }),
    { buscaConteudoDiretorio, buscaConteudoDiretorioRaiz, enviaMensagem, selecionaDiretorio })(Items));
