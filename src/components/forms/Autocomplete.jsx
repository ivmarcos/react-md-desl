import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import List from 'react-virtualized/dist/commonjs/List';

function createList(size) {

  const list = [];
  for (let i = 0; i <= size; i++) {

    list.push(`teste_${i}`);

  }

  return list;

}

// List data as an array of strings
const list = createList(10000);

const CONTAINER_CLASS = 'md-text-field-container md-full-width md-text-field-container--input';
const HR_CLASS = 'md-divider md-divider--text-field md-divider--expand-from-left';
const HR_CLASS_HAS_FOCUS = 'md-divider md-divider--text-field md-divider--expand-from-left md-divider--text-field-expanded md-divider--text-field-active';
const LABEL_CLASS_HAS_FOCUS = 'md-floating-label md-floating-label--floating md-floating-label--active md-floating-label--floating';
const LABEL_CLASS = 'md-floating-label md-floating-label--inactive md-floating-label--inactive-sized';
const LABEL_CLASS_HAS_VALUE = 'md-floating-label md-floating-label--floating';
const INPUT_CLASS = 'md-text-field md-text md-text-field--inline-indicator md-full-width md-text-field--floating-margin';
const MENU_CLASS = 'md-paper md-paper--1';


//eslint-disable-next-line
const defaultMenuItemRenderer = ({ item, index }) => <span>{item}</span>;


class Autocomplete extends PureComponent {

  constructor(props) {

    super(props);

    const {
        items,
    } = props;

    this.state = {
      hasFocus: false,
      openMenu: false,
      value: null,
      items,
    };

    this.blur = this.blur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.rowRenderer = this.rowRenderer.bind(this);


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

    const { onSelect, getSelectedValue } = this.props;

    console.log('item selecionado', item);

    this.setState({
      value: getSelectedValue({ item }),
      openMenu: false,
    },
    () => {

      if (onSelect) onSelect(item);

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
        this.blur(e);
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

    const { items } = this.props;

    const regex = new RegExp(value, 'ig');

    this.setState({
      items: items.filter(l => l.match(regex)),
      value,
      openMenu: true,
    });

  }

  handleRowClick({ item }) {

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


  rowRenderer({
    key,
    index,
    style,
    ...props
    }) {

    const { items } = this.state;

    const {
        menuItemRenderer,
    } = this.props;

    const item = items[index];

    return (
      <div
        key={key}
        onClick={() => this.handleRowClick({ item, index, ...props })}
        style={style}
      >
        {menuItemRenderer({ item, index, ...props })}
      </div>
    );

  }

  renderList() {

    const {
        items,
        hasFocus,
        openMenu,
    } = this.state;

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
      onFocus,
      onBlur,
      label,
      ...props
    } = this.props;

    console.log('value', value);

    return (
      <div className={CONTAINER_CLASS}>
        <label
          htmlFor={id}
          className={hasFocus ? LABEL_CLASS_HAS_FOCUS : (value ? LABEL_CLASS_HAS_VALUE : LABEL_CLASS)}
        >{label}
        </label>
        <input
          {...props}
          id
          className={INPUT_CLASS}
          onFocus={this.handleFocus}
          onKeyDown={this.handleKeyDown}
          // onBlur={this.handleBlur}
          onChange={this.handleChange}
          value={value}
        />
        <hr
          className={hasFocus ? HR_CLASS_HAS_FOCUS : HR_CLASS}
        />
        {this.renderList()}
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
  value: PropTypes.any,
  items: PropTypes.array.isRequired,
  getSelectedValue: PropTypes.func.isRequired,
  menuItemRenderer: PropTypes.func.isRequired,
  onSelect: PropTypes.func,
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
  getSelectedValue: ({ item }) => item,
  menuItemRenderer: defaultMenuItemRenderer,
  menuMaxItems: 15,
  value: <undefined />,
  items: list,
  onSelect: null,
};

export default Autocomplete;
