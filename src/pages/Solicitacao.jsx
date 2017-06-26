/* eslint-disable react/no-array-index-key */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'react-md/lib/Dialogs';
import { connect } from 'react-redux';
import TextField from 'react-md/lib/TextFields';
import Toolbar from 'react-md/lib/Toolbars';
import Button from 'react-md/lib/Buttons/Button';
import Stepper from 'react-stepper-horizontal';
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import CardText from 'react-md/lib/Cards/CardText';
import SelectField from 'react-md/lib/SelectFields';
import update from 'immutability-helper';
import MaskDatePicker from 'components/forms/MaskDatePicker';
import VirtualSelect from 'components/forms/VirtualSelect';

import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';
import './Solicitacao.scss';


function createList(size) {

  const list = [];
  for (let i = 0; i <= size; i++) {

    list.push({
      id: i,
      nome: `teste_${i}`,
    });

  }

  return list;

}

// List data as an array of strings
const list = createList(10000);

//eslint-disable-next-line
const municipioMenuItemRenderer = ({ item, index, labelKey }) => <span>{`${item.nome} - ${item.uf}`}</span>;

/*eslint-disable */
function solicitacaoValida(solicitacao) {

  let erros;

  if (solicitacao._erros) {

    return solicitacao._erros;

  }

  erros.trechos = solicitacao.trechos.map(trecho => trechoValido(trecho));

  return erros;

}
/*eslint-enable */


function validaIntervalos(inicio, fim) {

  if (!inicio) return 'Insira data e hora de início';
  if (!fim) return 'Insira data e hora de término';
  if (inicio > fim) return 'Data e hora de término não pode ser anterior à de início';
  return '';

}

function trechoValido(trecho) {

  return validaIntervalos(trecho.dataHoraInicio, trecho.dataHoraTermino);

}


const ValidacaoSolicitacao = {
  tipo_id: ({ value }) => {

    if (!value) return 'Valor obrigatório.';


  },
  dataHoraInicio: ({ value }) => {

    if (!value) return 'Valor obrigatório.';

  },
};

const ValidacaoTrecho = {
  dataHoraInicio: ({ value }) => {

    if (!value) return 'Valor obrigatório.';

    return undefined;

  },
};


const NOVO_TRECHO = {
  id: null,
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

    let { solicitacao } = this.state;

    console.log('field', field, 'value', value);

    const erro = ValidacaoSolicitacao[field]({ solicitacao, value });

    //eslint-disable-next-line
    solicitacao = { [field]: value, _erro: { [field]: erro } };

    this.setState({
      solicitacao,
    });

  }

  handleChangeTrecho({ field, value, index }) {

    const { solicitacao, solicitacao: { trechos } } = this.state;

    console.log('field', field, 'value', value, 'index', index);

    let trecho = { ...trechos[index], [field]: value };

    const erro = ValidacaoTrecho[field]({ trecho, value });

    //eslint-disable-next-line
    trecho = { [field]: value, _erro: { [field]: erro } };

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

        <div className="md-cell md-cell--6 md-cell--3-offset">

          <Stepper steps={steps} activeStep={0} />

          <Card
            className="Solicitacao-card"
          >

            <CardTitle
              title="Solicitação"
              className="Solicitacao-card-title"
            />

            <CardText
              className="Solicitacao-card-text"
            >

              <div className="md-grid">

                <VirtualSelect
                  options={tiposSolicitacao}
                  className="md-cell md-cell--6 Solicitacao-field"
                  label="Tipo de deslocamento"
                  itemLabel="nome"
                  onSelect={value => this.handleChange({ field: 'tipo_id', value: value.id })}
                  value={solicitacao.tipo_id}
                  items={tiposSolicitacao}
                  labelKey="nome"
                  valueKey="id"
                />

                <TextField
                  id="valor"
                  type="number"
                  label="Valor cotado da passagem"
                  onChange={value => this.handleChange({ field: 'valorEstimado', value })}
                  value={solicitacao.valorEstimado}
                  className="md-cell md-cell--6 Solicitacao-field"
                />

                <MaskDatePicker
                  id="dataInicio"
                  label="Data e hora do início da missão"
                  displayMode="landscape"
                  className="md-cell md-cell--6 Solicitacao-field"
                  onChange={value => this.handleChange({ field: 'dataHoraInicio', value })}
                  defaultValue={solicitacao.dataHoraInicio}
                  selectsStart
                  startDate={solicitacao.dataHoraInicio}
                  endDate={solicitacao.dataHoraTermino}
                  cancelLabel="Cancelar"
                />

                <MaskDatePicker
                  id="dataTermino"
                  label="Data e hora do término da missão"
                  displayMode="landscape"
                  className="md-cell md-cell--6 Solicitacao-field"
                  onChange={value => this.handleChange({ field: 'dataHoraTermino', value })}
                  defaultValue={solicitacao.dataHoraTermino}
                  selectsEnd
                  startDate={solicitacao.dataHoraInicio}
                  endDate={solicitacao.dataHoraTermino}
                  cancelLabel="Cancelar"
                />


                <TextField
                  id="descricao"
                  rows={2}
                  onChange={value => this.handleChange({ field: 'descricao', value })}
                  label="Descrição da missão"
                  value={solicitacao.descricao}
                  className="md-cell md-cell--12 Solicitacao-field"
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
                className="Solicitacao-card-title"
              />

              <CardText>

                <div className="md-grid">

                  <VirtualSelect
                    options={municipios}
                    className="md-cell md-cell--6 Solicitacao-field"
                    label="Origem"
                    itemLabel="nome"
                    onSelect={value => this.handleChangeTrecho({ field: 'origem_id', value, index })}
                    menuItemRenderer={municipioMenuItemRenderer}
                    value={trecho.origem_id}
                    labelKey="nome"
                    valueKey="id"
                  />

                  <VirtualSelect
                    options={municipios}
                    className="md-cell md-cell--6 Solicitacao-field"
                    label="Destino"
                    itemLabel="nome"
                    onSelect={value => this.handleChangeTrecho({ field: 'destino_id', value, index })}
                    menuItemRenderer={municipioMenuItemRenderer}
                    value={trecho.destino_id}
                    labelKey="nome"
                    valueKey="id"
                  />

                  <VirtualSelect
                    options={companhias}
                    className="md-cell md-cell--6 Solicitacao-field"
                    label="Companhia"
                    itemLabel="nome"
                    onSelect={value => this.handleChangeTrecho({ field: 'companhia_id', value, index })}
                    value={trecho.companhia_id}
                    labelKey="nome"
                    valueKey="id"
                  />

                  <MaskDatePicker
                    id={`dataTrecho_${trecho.id}`}
                    label="Data e hora do Vôo"
                    displayMode="landscape"
                    onChange={value => this.handleChangeTrecho({ field: 'dataHoraVoo', value, index })}
                    value={trecho.dataHoraVoo}
                    className="md-cell md-cell--6 Solicitacao-field"
                    cancelLabel="Cancelar"
                  />

                  <TextField
                    id="valor"
                    type="number"
                    onChange={value => this.handleChangeTrecho({ field: 'numeroVoo', value, index })}
                    value={trecho.numeroVoo}
                    label="Número do Vôo"
                    className="md-cell md-cell--6 Solicitacao-field"
                  />

                </div>

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

    //eslint-disable-next-line
    const erros = solicitacao ? (solicitacao._erro || {}) : {};

    const hasError = solicitacao ? false : Object.keys(erros).length > 0;

    const nav = <Button icon onClick={onClose}>close</Button>;

    const action = [
      <Button flat label="fechar" onClick={onClose}>close</Button>,
      <Button
        flat
        label="salvar"
        disabled={hasError}
        onClick={() => onSave(solicitacao)}
      >check</Button>,
    ];

    return (
      <Dialog
        id="editandoSolicitacao"
        visible={visivel}
        onHide={onClose}
        fullPage
        aria-label="Nova solicitação"
        dialogClassName="Solicitacao-dialog"
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


const mapState = (
  { app: { usuario }, tipoStatus: { tiposStatus }, tipoSolicitacao: { tiposSolicitacao }, municipio: { municipios }, companhia: { companhias } }) =>
  ({ usuario, tiposStatus, tiposSolicitacao, municipios, companhias });

export default connect(mapState)(Solicitacao);

