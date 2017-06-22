import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AutoComplete from 'react-autocomplete';
import { debounce } from 'lodash';

import List from 'react-md/lib/Lists/List';
import ListItem from 'react-md/lib/Lists/ListItem';

import './AutoComplete.scss';

class AutoCompleteWrapper extends Component {

  static defaultProps = {
    getItemValue: item => item,
    autoHighlight: false,
    onKeyDown: (e => console.debug(e.keyCode)),
    inputClassName: null,
    onEnter: null,
    allowNullValue: false,
    nullLabel: 'Selecione...',
    notFoundLabel: 'Nenhum registro localizado.',
    maxItems: 20,
    timeout: 100,
  }

  static propTypes = {
    getItemValue: PropTypes.func,
    allowNullValue: PropTypes.bool,
    nullLabel: PropTypes.string,
    itemLabel: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
    onChange: PropTypes.func.isRequired,
    inputProps: PropTypes.object,
    onSelect: PropTypes.func,
    renderMenu: PropTypes.func,
    renderItem: PropTypes.func,
    onEnter: PropTypes.func,
    items: PropTypes.array.isRequired,
    inputClassName: PropTypes.string,
    className: PropTypes.string,
    maxItems: PropTypes.number.isRequired,
    placeholder: PropTypes.string,
    timeout: PropTypes.number.isRequired,
    menuClassName: PropTypes.string,
    defaultValue: PropTypes.string,
    notFoundLabel: PropTypes.string,
  }

  static defaultProps = {
    inputProps: null,
    onSelect: null,
    renderMenu: null,
    renderItem: null,
    className: null,
    menuClassName: null,
    defaultValue: null,
    placeholder: null,
  }

  state = {
    value: '',
  }

  componentWillMount() {

    this.onDebounceChange = debounce((e, value) => this.props.onChange(e, value), this.props.timeout);

  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.defaultValue !== this.props.defaultValue) {

      console.debug('alterou o valor');

      this.setState({
        value: nextProps.defaultValue,
      });

    }

  }


  onChange = (e) => {

    const value = e.target.value;

    this.onDebounceChange(e, value);

    console.debug('alterando', value);

    this.setState({
      value,
    });

  }

  onKeyDown = (e) => {

    if (e.keyCode === 13) {

      if (this.props.onEnter) this.props.onEnter(this.state.value);

      setTimeout(() => this.input.blur(), 100);

    }

  }

  /* onSelect = (e, item) => {

    console.debug('selecionou', item);

    this.setState({
      value: this.getItemLabel(item),
    });

  }*/

  getItemLabel(item) {

    const { itemLabel, allowNullValue, nullLabel } = this.props;

    if (item == null && allowNullValue) return nullLabel;

    return typeof itemLabel === 'function' ? itemLabel(item) : item[itemLabel];

  }

  renderItem = (item) => {

    const label = this.getItemLabel(item);

    return (

      <ListItem
        key={label}
        primaryText={label}
      />

    );

  }

  renderMenu = (items) => {

    const { menuClassName, notFoundLabel } = this.props;

    const nenhum = <ListItem key={0} primaryText={notFoundLabel} />;

    return (
      <div className={menuClassName}>
        <List className={['md-paper md-paper--1 cmp-autocomplete-menu', menuClassName].join(' ')}>
          {items.length ? items : nenhum}
        </List>
      </div>
    );

  }

  // componentWillReceiveProps = ()

  render() {

    const { value } = this.state;

    const { inputClassName, inputProps, className, nullLabel, placeholder, items, maxItems, ...props } = this.props;

    const defaultInputProps = {
      className: ['cmp-autocomplete-input', inputClassName].join(' '),
      onKeyDown: this.onKeyDown,
      placeholder: nullLabel || placeholder,
    };

    let itemsToRender = !value && items.length ? [null, ...items] : items;

    itemsToRender = itemsToRender.length > maxItems ? itemsToRender.slice(0, maxItems) : itemsToRender;

    return (

      <div className={['cmp-autocomplete-wrapper', className].join(' ')}>
        <AutoComplete
          {...props}
          value={value}
          items={itemsToRender}
          inputProps={{ ...defaultInputProps, ...inputProps }}
          onChange={this.onChange}
          ref={(el) => {

            this.input = el;

          }}
          renderItem={this.renderItem}
          renderMenu={this.renderMenu}
        />
        <hr className="md-divider md-divider--expand-from-left md-divider--select-field cmp-autocomplete-divider" />
        <i className="md-icon material-icons cmp-autocomplete-arrow" onClick={() => this.input.focus()} role="presentation">arrow_drop_down</i>
      </div >
    );

  }
}


export default AutoCompleteWrapper;
