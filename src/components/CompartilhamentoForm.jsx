import React, { Component } from 'react';
import Dialog from 'react-md/lib/Dialogs';
import PropTypes from 'prop-types';
import Tabs from 'react-md/lib/Tabs/Tabs';
import Tab from 'react-md/lib/Tabs/Tab';
import TabsContainer from 'react-md/lib/Tabs/TabsContainer';


import './Compartilhamento.scss';

class CompartilhamentoForm extends Component {

  state = {
    activeTabIndex: 0,
  }

  handleTabChange = (activeTabIndex) => {

    this.setState({
      activeTabIndex,
    });

  }


  render() {

    const { visivel, onHide } = this.props;

    const { activeTabIndex } = this.state;


    return (

      <Dialog
        id="cadastro"
        visible={visivel}
        onHide={onHide}
        className="compartilhamento-dialogo"
        title="Compartilhamento"
        actions={[
          {
            onClick: onHide,
            label: 'Cancelar',
          },
          {
            onClick: onHide,
            primary: true,
            label: 'OK',
          }]}
      >

        <div className="compartilhamento-container">

          <TabsContainer onTabChange={this.handleTabChange} activeTabIndex={activeTabIndex} panelClassName="md-grid" colored>
            <Tabs tabId="tab">
              <Tab label="Tab One">
                <h3 className="md-cell md-cell--12">Hello, World!</h3>
              </Tab>
              <Tab label="Tab Two">
                <h1>oie</h1>
              </Tab>
            </Tabs>
          </TabsContainer>

        </div>
      </Dialog>
    );

  }
}

CompartilhamentoForm.propTypes = {
  visivel: PropTypes.bool,
  onHide: PropTypes.func.isRequired,
  //diretorioAtual: PropTypes.object,
};

CompartilhamentoForm.defaultProps = {
  diretorioAtual: null,
};

CompartilhamentoForm.defaultProps = {
  visivel: false,
};

export default CompartilhamentoForm;
