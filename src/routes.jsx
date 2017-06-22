
import React from 'react';

/* eslint-disable */
import loadHome from 'bundle-loader?lazy!./pages/Home';
import loadItems from 'bundle-loader?lazy!./pages/Items';
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
    //eslint-disable-next-line
    label: ({ diretorioRaiz }) => {

      return diretorioRaiz ? diretorioRaiz.nome : 'Meus arquivos';

    },
    path: '/items/:id?',
    icon: 'inbox',
    //eslint-disable-next-line
    to: ({ diretorioRaiz }) => {

      return diretorioRaiz ? `/raiz/${diretorioRaiz.id}` : '/items/';

    },
    component: asyncComponent(loadItems),
  },
  {
    path: '/raiz/:id?', // link criado para restringir a visualização somente a pasta raiz informada na url
    link: false, // impede de gerar link neste caso para o menu
    component: asyncComponent(loadItems),
  },
];

export default routes;
