
import React from 'react';

/* eslint-disable */
import loadHome from 'bundle-loader?lazy!./pages/Home';
import loadSolicitacoes from 'bundle-loader?lazy!./pages/Solicitacoes';
import loadDespacho from 'bundle-loader?lazy!./pages/Despacho';
/* eslint-enable */


function asyncComponent(getComponent) {

  return class AsyncComponent extends React.Component {

    state = { Component: AsyncComponent.Component };

    static load(cb) {

      getComponent((Component) => {

        AsyncComponent.Component = Component.default || Component;
        cb(AsyncComponent.Component);

      });

    }

    componentWillMount() {

      if (!this.state.Component) {

        AsyncComponent.load(Component => this.setState({ Component }));

      }

    }

    render() {

      const { Component } = this.state;
      return Component ? <Component {...this.props} /> : null;

    }
  };

}


const routes = [
  {
    path: '/',
    label: 'Home',
    icon: 'bookmark',
    component: asyncComponent(loadHome),
  },
  {
    path: '/solicitacoes',
    label: 'Solicitações',
    icon: 'card_travel',
    component: asyncComponent(loadSolicitacoes),
  },
  {
    path: '/despacho',
    label: 'Despacho',
    icon: 'check_circle',
    component: asyncComponent(loadDespacho),
  },
];

export default routes;
