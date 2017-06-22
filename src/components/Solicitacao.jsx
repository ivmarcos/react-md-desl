import React from 'react';
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

import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';
import './Solicitacao.scss';

const steps = [{ title: 'Solicitada' }, { title: 'Enviada' }, { title: 'Despachada' }, { title: 'Aprovada' }];

const municipios = [
  {
    id: 1,
    nome: 'São Paulo',
  },
  {
    id: 2,
    nome: 'Rio',
  },
  {
    id: 3,
    nome: 'Brasília',
  },
  {
    id: 4,
    nome: 'Curitiba',
  },
];

const trechos = [
  {
    id: 1,
    origem_id: null,
    destino_id: null,
    dataHora: new Date(),
  },
  {
    id: 2,
    origem_id: null,
    destino_id: null,
    dataHora: new Date(),
  },
];

const tiposSolicitacao = [
  {
    id: 1,
    nome: 'Tipo1',
  },
  {
    id: 2,
    nome: 'Tipo2',
  },
  {
    id: 3,
    nome: 'Tipo3',
  },
  {
    id: 4,
    nome: 'Tipo4',
  },
];

const Solicitacao = ({ visivel, onClose, solicitacao }) => {

  const nav = <Button icon onClick={onClose}>close</Button>;

  const action = [
    <Button flat label="fechar" onClick={onClose} />,
    <Button flat label="salvar" onClick={onClose} />,
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
        title="Nova solicitação"
        fixed
      />
      <div
        className="md-grid md-toolbar-relative"
      >

        <div
          className="md-cell md-cell--6 md-cell--3-offset md-cell--center"
        >
          {solicitacao ? solicitacao.id : 'sem solicitacao!'}

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
                  label="Tipo"
                  menuItems={tiposSolicitacao}
                  itemLabel="nome"
                  itemValue="id"
                  position={SelectField.Positions.BELOW}
                  className="md-cell md-cell--6"
                />

                <TextField
                  id="descricao"
                  label="Descrição"
                  className="md-cell md-cell--6"
                />

                <DatePicker
                  id="dataInicio"
                  label="Data início"
                  displayMode="landscape"
                  className="md-cell md-cell--6"
                  cancelLabel="Cancelar"
                />

                <TimePicker
                  id="horaInicio"
                  label="Hora início"
                  displayMode="landscape"
                  className="md-cell md-cell--6"
                  cancelLabel="Cancelar"
                />

                <DatePicker
                  id="dataTermino"
                  label="Data término"
                  displayMode="landscape"
                  className="md-cell md-cell--6"
                  cancelLabel="Cancelar"
                />

                <TimePicker
                  id="horaTermino"
                  label="Hora término"
                  displayMode="landscape"
                  className="md-cell md-cell--6"
                  cancelLabel="Cancelar"
                />

                <TextField
                  id="valor"
                  type="number"
                  label="Valor"
                  className="md-cell md-cell--6"
                />

              </div>

            </CardText>

          </Card>

          {trechos.map((trecho, i) => (

            <Card
              key={trecho.id}
              className="Solicitacao-card"
            >

              <CardTitle
                title={`Trecho #${i + 1}`}
              />

              <CardText>


                <VirtualizedSelect
                  options={municipios}
                  onChange={selectValue => this.setState({ selectValue })}
                  value={this.state.selectValue}
                />


                <DatePicker
                  id={`dataTrecho_${trecho.id}`}
                  label="Data do Vôo"
                  displayMode="landscape"
                  className="md-cell"
                  cancelLabel="Cancelar"
                />

                <TimePicker
                  id={`horaTrecho_${trecho.id}`}
                  label="Hora do Vôo"
                  displayMode="landscape"
                  className="md-cell"
                  cancelLabel="Cancelar"
                />

                <TextField
                  id="valor"
                  type="number"
                  label="Número do Vôo"
                  className="md-cell md-cell--top"
                />

              </CardText>


            </Card>

          ))}

          <Button
            label="Adicionar trecho"
            raised
          />

        </div>

      </div>
    </Dialog>
  );

};

Solicitacao.propTypes = {
  visivel: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  solicitacao: PropTypes.object,
};

Solicitacao.defaultProps = {
  solicitacao: null,
};

export default Solicitacao;
