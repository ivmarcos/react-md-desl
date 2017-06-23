/* eslint-disable react/no-array-index-key */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'react-md/lib/Dialogs';
import TextField from 'react-md/lib/TextFields';
import Toolbar from 'react-md/lib/Toolbars';
import Button from 'react-md/lib/Buttons/Button';
import Stepper from 'react-stepper-horizontal';
import DatePicker from 'react-md/lib/Pickers/DatePickerContainer';
import TimePicker from 'react-md/lib/Pickers/TimePickerContainer';
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import CardText from 'react-md/lib/Cards/CardText';
import SelectField from 'react-md/lib/SelectFields';
import VirtualizedSelect from 'react-virtualized-select';
import update from 'immutability-helper';

import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';
import './Select.css';
import './Solicitacao.scss';

const NOVO_TRECHO = {
};

class Solicitacao extends Component {

  constructor(props) {

    super(props);

    this.state = {
      opcao: false,
    };

  }

  componentWillReceiveProps(nextProps) {

    if (this.props.solicitacao !== nextProps.solicitacao) {

      this.setState({
        solicitacao: nextProps.solicitacao,
      });

    }

  }


  handleChange({ field, value }) {

    const { solicitacao } = this.state;

    console.log('field', field, 'value', value);

    this.setState({
      solicitacao: { ...solicitacao, [field]: value },
    });

  }

  handleChangeTrecho({ field, value, index }) {

    const { solicitacao, solicitacao: { trechos } } = this.state;

    console.log('field', field, 'value', value, 'index', index);

    const trecho = { ...trechos[index], [field]: value };

    this.setState({
      solicitacao: { ...solicitacao, trechos: update(trechos, { [index]: { $set: trecho } }) },
    });

  }

  handleAdicionaTrecho() {

    const { solicitacao, solicitacao: { trechos } } = this.state;

    this.setState({
      solicitacao: { ...solicitacao, trechos: [...trechos, NOVO_TRECHO] },
    });

  }

  renderForm() {

    const { solicitacao } = this.state;

    const {
      municipios,
      tiposSolicitacao,
      tiposStatus,
      companhias,
    } = this.props;

    if (!solicitacao) return null;

    const steps = tiposStatus.length ? tiposStatus.map(tipo => ({ title: tipo.nome })) : [];

    return (

      <div className="md-grid md-toolbar-relative">

        <div className="md-cell md-cell--6 md-cell--3-offset md-cell--center">

          <Stepper steps={steps} activeStep={1} />

          <Card
            className="Solicitacao-card"
          >

            <CardTitle
              title="Solicitação"
            />

            <CardText>

              <div className="md-grid">

                <SelectField
                  id="tipo_id"
                  placeholder="Tipo"
                  menuItems={tiposSolicitacao}
                  itemLabel="nome"
                  itemValue="id"
                  onChange={value => this.handleChange({ field: 'tipo_id', value })}
                  position={SelectField.Positions.BELOW}
                  value={solicitacao.tipo_id}
                  className="md-cell md-cell--6"
                />

                <TextField
                  id="descricao"
                  onChange={value => this.handleChange({ field: 'descricao', value })}
                  label="Descrição"
                  value={solicitacao.descricao}
                  className="md-cell md-cell--6"
                />

                {solicitacao.descricao}

                <DatePicker
                  id="dataInicio"
                  label="Data início"
                  displayMode="landscape"
                  className="md-cell md-cell--6"
                  onChange={value => this.handleChange({ field: 'dataHoraInicio', value })}
                  defaultValue={solicitacao.dataHoraInicio}
                  cancelLabel="Cancelar"
                />

                <TimePicker
                  id="horaInicio"
                  label="Hora início"
                  displayMode="landscape"
                  className="md-cell md-cell--6"
                  onChange={value => this.handleChange({ field: 'dataHoraInicio', value })}
                  defaultValue={solicitacao.dataHoraInicio}
                  cancelLabel="Cancelar"
                />

                <DatePicker
                  id="dataTermino"
                  label="Data término"
                  displayMode="landscape"
                  className="md-cell md-cell--6"
                  onChange={value => this.handleChange({ field: 'dataHoraTermino', value })}
                  defaultValue={solicitacao.dataHoraTermino}
                  cancelLabel="Cancelar"
                />

                <TimePicker
                  id="horaTermino"
                  label="Hora término"
                  displayMode="landscape"
                  className="md-cell md-cell--6"
                  onChange={value => this.handleChange({ field: 'dataHoraTermino', value })}
                  defaultValue={solicitacao.dataHoraTermino}
                  cancelLabel="Cancelar"
                />

                <TextField
                  id="valor"
                  type="number"
                  label="Valor"
                  onChange={value => this.handleChange({ field: 'valorEstimado', value })}
                  value={solicitacao.valorEstimado}
                  className="md-cell md-cell--6"
                />

              </div>

            </CardText>

          </Card>

          {solicitacao.trechos.map((trecho, index) => (

            <Card
              key={`a${index}`}
              className="Solicitacao-card"
            >

              <CardTitle
                title={`Trecho #${index + 1}`}
              />

              <CardText>


                <VirtualizedSelect
                  options={municipios}
                  itemLabel="nome"
                  onChange={value => this.handleChangeTrecho({ field: 'origem_id', value, index })}
                  value={trecho.origem_id}
                  labelKey="nome"
                  valueKey="id"
                />

                <VirtualizedSelect
                  options={companhias}
                  itemLabel="nome"
                  onChange={value => this.handleChangeTrecho({ field: 'companhia_id', value, index })}
                  value={trecho.companhia_id}
                  labelKey="nome"
                  valueKey="id"
                />

                <DatePicker
                  id={`dataTrecho_${trecho.id}`}
                  label="Data do Vôo"
                  displayMode="landscape"
                  onChange={value => this.handleChangeTrecho({ field: 'dataHoraVoo', value, index })}
                  value={trecho.dataHoraVoo}
                  className="md-cell"
                  cancelLabel="Cancelar"
                />

                <TimePicker
                  id={`horaTrecho_${trecho.id}`}
                  label="Hora do Vôo"
                  displayMode="landscape"
                  onChange={value => this.handleChangeTrecho({ field: 'dataHoraVoo', value, index })}
                  value={trecho.dataHoraVoo}
                  className="md-cell"
                  cancelLabel="Cancelar"
                />

                <TextField
                  id="valor"
                  type="number"
                  onChange={value => this.handleChangeTrecho({ field: 'numeroVoo', value, index })}
                  value={trecho.numeroVoo}
                  label="Número do Vôo"
                  className="md-cell md-cell--top"
                />

              </CardText>


            </Card>

        ))}

          <Button
            label="Adicionar trecho"
            raised
            onClick={this.handleAdicionaTrecho}
          />

        </div>

      </div>

    );


  }

  render() {

    const {
      visivel,
      onClose,
      onSave,
    } = this.props;

    const { solicitacao } = this.state;


    const nav = <Button icon onClick={onClose}>close</Button>;

    const action = [
      <Button flat label="fechar" onClick={onClose}>close</Button>,
      <Button flat label="salvar" onClick={() => onSave(solicitacao)}>check</Button>,
    ];

    return (
      <Dialog
        id="editandoSolicitacao"
        visible={visivel}
        onHide={onClose}
        fullPage
        aria-label="Nova solicitação"
      >
        <Toolbar
          colored
          nav={nav}
          actions={action}
          title={solicitacao && solicitacao.id ? `Solicitação #${solicitacao.id}` : 'Nova solicitação'}
          fixed
        />

        {this.renderForm()}

      </Dialog>
    );

  }

}

Solicitacao.propTypes = {
  visivel: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  municipios: PropTypes.array.isRequired,
  tiposSolicitacao: PropTypes.array.isRequired,
  tiposStatus: PropTypes.array.isRequired,
  companhias: PropTypes.array.isRequired,
  solicitacao: PropTypes.object,
};

Solicitacao.defaultProps = {
  solicitacao: null,
};

export default Solicitacao;
