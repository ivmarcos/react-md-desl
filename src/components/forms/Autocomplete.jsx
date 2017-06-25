import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import List from 'react-virtualized/dist/commonjs/List';

import './Autocomplete.scss';

const CONTAINER_CLASS = 'md-text-field-container md-full-width md-text-field-container--input';
const HR_CLASS = 'md-divider md-divider--text-field md-divider--expand-from-left';
const HR_CLASS_HAS_FOCUS = 'md-divider md-divider--text-field md-divider--expand-from-left md-divider--text-field-expanded md-divider--text-field-active';
const LABEL_CLASS_HAS_FOCUS = 'md-floating-label md-floating-label--floating md-floating-label--active md-floating-label--floating';
const LABEL_CLASS = 'md-floating-label md-floating-label--inactive md-floating-label--inactive-sized';
const LABEL_CLASS_HAS_VALUE = 'md-floating-label md-floating-label--floating';
const INPUT_CLASS = 'md-text-field md-text md-text-field--inline-indicator md-full-width md-text-field--floating-margin';
const MENU_ITEM_CLASS = 'Autocomplete-menu-item';
const MENU_CLASS = 'md-paper md-paper--1 Autocomplete-menu';

function safeGet(object, prop) {

  return object ? object[prop] : object;

}

//eslint-disable-next-line
const defaultMenuItemRenderer = ({ item, index, labelKey }) => <span>{safeGet(item, labelKey) || ''}</span>;

//eslint-disable-next-line
const defaultGetSelectedLabel = ({ item, labelKey }) => labelKey ? (safeGet(item, labelKey) || '') : item;


class Autocomplete extends PureComponent {

  constructor(props) {

    super(props);

    const {
        items,
        defaultValue,
        labelKey,
        getSelectedLabel,
    } = props;

    this.state = {
      hasFocus: false,
      openMenu: false,
      value: getSelectedLabel({ item: defaultValue, labelKey }),
      items,
    };

    this.blur = this.blur.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.setInputRef = this.setInputRef.bind(this);
    this.rowRenderer = this.rowRenderer.bind(this);


  }


  componentWillReceiveProps(nextProps) {

    let state;

    if (this.props.items !== nextProps.items) {

      state.items = nextProps.items;

    }

    if (this.props.defaultValue !== nextProps.defaultValue) {

      const {
        getSelectedLabel,
        labelKey,
      } = this.props;

      state.value = getSelectedLabel({ item: nextProps.defaultValue, labelKey });

    }

    if (state) this.setState(state);

  }

  setInputRef(element) {

    if (element) this.input = element;

  }


  handleFocus(e) {

    this.setState({
      hasFocus: true,
      openMenu: true,
    });

    const { onFocus } = this.props;

    if (onFocus) onFocus(e);


  }

  handleSelect({ item }) {

    const {
      onSelect,
      getSelectedLabel,
      labelKey,
    } = this.props;

    console.log('item selecionado', item);

    this.setState({
      value: getSelectedLabel({ item, labelKey }),
      hasFocus: false,
      openMenu: false,
    },
    () => {

      if (onSelect) {

        onSelect(item);

      }

      this.input.blur();

    });

  }

  handleKeyDown(e) {

    const { items } = this.state;

    console.log('e.key', e.key);

    //eslint-disable-next-line
    switch (e.key) {
      case 'Enter':
        if (items.length) {

          this.handleSelect({ item: items[0] });

        }
        break;
      case 'Tab':
        this.input.blur();
        break;

    }

  }

  closeMenu() {

    this.setState({
      openMenu: false,
    });

  }


  handleChange(e) {

    const value = e.target.value;

    const {
      items,
      labelKey,
      getSelectedLabel,
    } = this.props;

    const regex = new RegExp(value, 'ig');

    this.setState({
      items: items.filter(l => getSelectedLabel({ item: l, labelKey }).match(regex)),
      value,
      openMenu: true,
    });

  }

  handleRowClick({ item, event }) {

    event.preventDefault();
    event.stopPropagation();
    console.log('item selecionado', item);

    this.handleSelect({ item });

  }

  blur(e) {

    this.setState({
      hasFocus: false,
    });

    const { onBlur } = this.props;

    if (onBlur) onBlur(e);

  }

  handleBlur(e) {

    e.persist();

    const isRelatedToMenu = e.relatedTarget && e.relatedTarget.className.indexOf(MENU_CLASS) > -1;

    if (!isRelatedToMenu) {

      this.setState({
        hasFocus: false,
      });

    }

  }

  rowRenderer({
    key,
    index,
    style,
    ...props
    }) {

    const { items } = this.state;

    const {
        menuItemRenderer,
        menuItemClassName,
        labelKey,
    } = this.props;

    const item = items[index];

    return (
      <div
        key={key}
        onClick={event => this.handleRowClick({ event, item, index, ...props })}
        className={menuItemClassName}
        style={style}
      >
        {menuItemRenderer({ item, index, labelKey, ...props })}
      </div>
    );

  }

  renderMenu() {

    const {
        items,
        hasFocus,
        openMenu,
    } = this.state;

    console.log('items', items);

    if (!hasFocus || !openMenu) return null;

    const {
      menuWidth,
      menuRowHeight,
      menuClassName,
      menuMaxItems,
    } = this.props;

    const lengthToRender = items.length > menuMaxItems ? menuMaxItems : items.length;
    const menuHeight = lengthToRender * menuRowHeight;

    return (
      <List
        tabIndex={-1} // makes unfocusable
        width={menuWidth}
        height={menuHeight}
        rowCount={items.length}
        rowHeight={menuRowHeight}
        rowRenderer={this.rowRenderer}
        className={menuClassName}
      />);

  }


  render() {

    const {
        hasFocus,
        value,
    } = this.state;

    const {
      id,
      label,
      className,
    } = this.props;

    console.log('value', value);

    return (
      <div className={[CONTAINER_CLASS, className].join(' ')}>
        <label
          htmlFor={id}
          className={hasFocus ? LABEL_CLASS_HAS_FOCUS : (value ? LABEL_CLASS_HAS_VALUE : LABEL_CLASS)}
        >{label}
        </label>
        <input
          id
          ref={this.setInputRef}
          className={INPUT_CLASS}
          onFocus={this.handleFocus}
          onKeyDown={this.handleKeyDown}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          value={value}
        />
        <hr
          className={hasFocus ? HR_CLASS_HAS_FOCUS : HR_CLASS}
        />
        {this.renderMenu()}
      </div>
    );

  }
}

Autocomplete.propTypes = {
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  label: PropTypes.string,
  id: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
  menuHeight: PropTypes.number,
  menuWidth: PropTypes.number,
  menuRowHeight: PropTypes.number,
  menuClassName: PropTypes.string,
  menuMaxItems: PropTypes.number,
  className: PropTypes.string,
  value: PropTypes.any,
  items: PropTypes.array.isRequired,
  getSelectedLabel: PropTypes.func.isRequired,
  menuItemRenderer: PropTypes.func.isRequired,
  menuItemClassName: PropTypes.string.isRequired,
  defaultValue: PropTypes.any,
  onSelect: PropTypes.func,
  labelKey: PropTypes.string,
  valueKey: PropTypes.string,
};

Autocomplete.defaultProps = {
  onFocus: null,
  onBlur: null,
  label: null,
  id: null,
  menuHeight: 300,
  menuWidth: 300,
  menuRowHeight: 20,
  menuClassName: MENU_CLASS,
  menuItemClassName: MENU_ITEM_CLASS,
  getSelectedLabel: defaultGetSelectedLabel,
  menuItemRenderer: defaultMenuItemRenderer,
  menuMaxItems: 15,
  defaultValue: undefined,
  items: [],
  className: null,
  onSelect: null,
  labelKey: null,
  valueKey: null,
};

export default Autocomplete;
