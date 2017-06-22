
import React from 'react';

/* eslint-disable */
import loadHome from 'bundle-loader?lazy!./pages/Home';
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
    path: '/', // link criado para restringir a visualização somente a pasta raiz informada na url
    label: 'Home',
    component: asyncComponent(loadHome),
  },
];

export default routes;
