import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Button from 'react-md/lib/Buttons/Button';

import NavLink from 'components/NavLink';
import Snackbar from 'components/Snackbar';
import Expirado from 'components/Expirado';

import { temAcesso } from 'lib/util/diretorio';
import { buscaUsuarioLogado, buscaAcessos } from 'store/app';
import { adicionaDiretorio } from 'store/diretorio';
import { adicionaArquivo } from 'store/arquivo';

import Novo from 'components/Novo';
import Nav from 'components/Nav';

import { COMPARTILHAMENTO_ADMINISTRADOR } from 'store/compartilhamento';

import routes from './routes';

import './App.scss';

const pages = routes.map(route => route.component);

class App extends Component {

  state = {
    novo: false,
  }

  componentWillMount() {

    const { usuario, acessos } = this.props;

    if (!usuario) {

      this.props.buscaUsuarioLogado();

    }

    if (!acessos.length) {

      this.props.buscaAcessos();

    }

       // faz o preload dos componentes lazy
    pages.forEach((page) => {

      if (page.load) {

        page.load(() => { });

      }

    });

  }

  handleClickNovo = () => {

    this.setState({
      novo: true,
    });

  }

  handleCloseNovo = () => {

    this.setState({
      novo: false,
    });

  }

  // eslint-disable-next-line
  handleSave = ({ diretorio, arquivo }) => {

    if (diretorio) {

      this.props.adicionaDiretorio({ diretorio, superior: this.props.diretorioAtual });

    } else if (arquivo) {

      // precisa criar um formData para enviar arquivos (binário) no payload
      const formData = new FormData();
      const { diretorioAtual } = this.props;

      formData.append('file', arquivo.file);
      formData.append('nome', arquivo.nome);
      formData.append('diretorio_id', diretorioAtual.id);

      this.props.adicionaArquivo(formData, arquivo);

    }

    this.setState({
      novo: false,
    });

  }

  render() {

    const { usuario, baseUrl, location, mensagens, expirado, acessos, diretorioAtual } = this.props;
    const { novo } = this.state;

    const isRaiz = !diretorioAtual;

    const isAdmin = acessos.indexOf('ARQ1') > -1;

    const isPermitidoUploadDiretorioAtual = temAcesso(diretorioAtual, usuario, acessos, COMPARTILHAMENTO_ADMINISTRADOR);

    // diretorio raiz pode ser criado somente se o usuário tiver acesso de admin (ARQ1)
    const isPermitidoUploadDiretorio = isRaiz ? isAdmin : isPermitidoUploadDiretorioAtual;

    // se for raiz nao permite o upload de arquivos, pois diretorio é obrigatorio para se vincular o arquivo
    const isPermitidoUploadArquivo = isRaiz ? false : isPermitidoUploadDiretorioAtual;

    // usado para notificar o pobre usuário que ele não possui nenhum acesso para upload na pasta atual
    const isNegadoTodosUploads = !isPermitidoUploadDiretorio && !isPermitidoUploadArquivo;

    const temAcessoNovo = !isNegadoTodosUploads;

    if (!usuario || expirado) {

      return (
        <Expirado
          expirado
        />
      );

    }

    const navLinks = routes.filter(r => r.link !== false).map((route) => {

      let { to, label } = route;

      if (to && typeof to === 'function') {

        to = to({ ...this.props });

      }

      if (label && typeof label === 'function') {

        label = label({ ...this.props });

        console.log('final label', label, diretorioAtual);

      }

      //eslint-disable-next-line      
      return (<NavLink {...route} key={route.path} to={to} label={label} />);

    });


    const navItems = [
      <div className="app-menu-novo">
        <Button
          raised
          secondary
          label="Novo"
          disabled={!temAcessoNovo}
          onClick={this.handleClickNovo}
        />
      </div>,
      ...navLinks,
    ];

    return (


      <Nav
        drawerTitle="arquivos"
        chave={usuario.chave}
        baseUrl={baseUrl}
        navItems={navItems}
      >

        <Novo
          visivel={novo}
          onHide={this.handleCloseNovo}
          onSave={this.handleSave}
          usuario={usuario}
          acessos={acessos}
          diretorioAtual={diretorioAtual}
        />


        <Snackbar
          mensagens={mensagens}
        />

        <section className="app-secao">

          <ReactCSSTransitionGroup
            transitionName="md-cross-fade"
            transitionAppear={false}
            transitionEnterTimeout={250}
            transitionLeaveTimeout={10}
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
  adicionaArquivo: PropTypes.func.isRequired,
  adicionaDiretorio: PropTypes.func.isRequired,
  mensagens: PropTypes.array.isRequired,
  diretorioAtual: PropTypes.object.isRequired,
  expirado: PropTypes.bool,
};

const mapStateToProps = ({ app: { usuario, mensagens, expirado, acessos }, diretorio: { diretorioAtual, diretorioRaiz } }) => ({ usuario, mensagens, expirado, acessos, diretorioAtual, diretorioRaiz });

export default withRouter(connect(mapStateToProps, { buscaUsuarioLogado, buscaAcessos, adicionaArquivo, adicionaDiretorio })(App));
