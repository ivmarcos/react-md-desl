import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import NavLink from 'components/NavLink';
import Snackbar from 'components/Snackbar';
import Expirado from 'components/Expirado';

import { buscaUsuarioLogado, buscaAcessos } from 'store/app';
import { buscaMunicipios } from 'store/municipio';
import { buscaCompanhias } from 'store/companhia';
import { buscaTiposSolicitacao } from 'store/tipoSolicitacao';
import { buscaTiposStatus } from 'store/tipoStatus';

import Nav from 'components/Nav';

import routes from './routes';

import './App.scss';

const pages = routes.map(route => route.component);

class App extends Component {

  componentWillMount() {

    const {
      usuario,
      acessos,
      municipios,
      companhias,
      tiposSolicitacao,
      tiposStatus,
    } = this.props;

    if (!usuario) {

      this.props.buscaUsuarioLogado();

    }

    if (!acessos.length) {

      this.props.buscaAcessos();

    }

    if (!municipios.length) {

      this.props.buscaMunicipios();

    }

    if (!companhias.length) {

      this.props.buscaCompanhias();

    }

    if (!tiposSolicitacao) {

      this.props.buscaTiposSolicitacao();

    }

    if (!tiposStatus) {

      this.props.buscaTiposStatus();

    }

       // faz o preload dos componentes lazy
    pages.forEach((page) => {

      if (page.load) {

        page.load(() => { });

      }

    });

  }

  render() {

    const { usuario, baseUrl, location, mensagens, expirado } = this.props;

    if (!usuario || expirado) {

      return (
        <Expirado
          expirado
        />
      );

    }

    const navLinks = routes.map(route => <NavLink {...route} />);

    return (


      <Nav
        drawerTitle="deslocamento"
        chave={usuario.chave}
        baseUrl={baseUrl}
        navItems={navLinks}
      >
        <Snackbar
          mensagens={mensagens}
        />

        <section className="app-secao">

          <ReactCSSTransitionGroup
            // transitionName="md-cross-fade"
            transitionEnter={false}
            transitionLeave={false}
            transitionEnterTimeout={250}
            // transitionLeaveTimeout={10}
          >

            <Switch key={location.key}>
              {routes.map(route => (

                <Route {...route} location={location} className="md-cell md-cell--12" />

                ))}

            </Switch>

          </ReactCSSTransitionGroup>

        </section>


      </Nav>

    );

  }

}


App.defaultProps = {
  expirado: false,
};

App.propTypes = {
  usuario: PropTypes.object.isRequired,
  acessos: PropTypes.array.isRequired,
  location: PropTypes.object.isRequired,
  baseUrl: PropTypes.string.isRequired,
  buscaUsuarioLogado: PropTypes.func.isRequired,
  buscaAcessos: PropTypes.func.isRequired,
  mensagens: PropTypes.array.isRequired,
  buscaCompanhias: PropTypes.func.isRequired,
  buscaMunicipios: PropTypes.func.isRequired,
  buscaTiposSolicitacao: PropTypes.func.isRequired,
  buscaTiposStatus: PropTypes.func.isRequired,
  municipios: PropTypes.array.isRequired,
  companhias: PropTypes.array.isRequired,
  tiposSolicitacao: PropTypes.array.isRequired,
  tiposStatus: PropTypes.array.isRequired,
  expirado: PropTypes.bool,
};

const mapStateToProps =
  ({ app: { usuario, mensagens, expirado, acessos }, municipio: { municipios }, companhia: { companhias }, tipoSolicitacao: { tiposSolicitacao }, tipoStatus: { tiposStatus } }) =>
  ({ usuario, mensagens, expirado, acessos, municipios, companhias, tiposSolicitacao, tiposStatus });

export default withRouter(connect(mapStateToProps, { buscaUsuarioLogado, buscaAcessos, buscaCompanhias, buscaMunicipios, buscaTiposSolicitacao, buscaTiposStatus })(App));
