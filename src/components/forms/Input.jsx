import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const CONTAINER_CLASS = 'md-text-field-container md-full-width md-text-field-container--input md-cell md-cell--bottom';
const HR_CLASS = 'md-divider md-divider--text-field md-divider--expand-from-left';
const HR_CLASS_FOCUS = 'md-divider md-divider--text-field md-divider--expand-from-left md-divider--text-field-expanded md-divider--text-field-active';
const LABEL_CLASS_FOCUS = 'md-floating-label md-floating-label--floating md-floating-label--active md-floating-label--floating';
const LABEL_CLASS = 'md-floating-label md-floating-label--inactive md-floating-label--inactive-sized';
const LABEL_CLASS_HAS_VALUE = 'md-floating-label md-floating-label--floating';
const INPUT_CLASS = 'md-text-field md-text md-text-field--inline-indicator md-full-width md-text-field--floating-margin';

class Input extends PureComponent {

  constructor(props) {

    super(props);

    this.state = {
      focus: false,
      hasValue: false,
    };

    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);

  }

  handleFocus(e) {

    this.setState({
      focus: true,
    });

    const { onFocus } = this.props;

    if (onFocus) onFocus(e);


  }

  handleBlur(e) {

    this.setState({
      focus: false,
      hasValue: !!e.target.value,
    });

    const { onBlur } = this.props;

    if (onBlur) onBlur(e);

  }


  render() {

    const { focus, hasValue } = this.state;


    const {
      id,
      onFocus,
      onBlur,
      label,
      value,
      ...props
    } = this.props;

    console.log('value', value);

    return (
      <div className={CONTAINER_CLASS}>
        <label
          htmlFor={id}
          className={focus ? LABEL_CLASS_FOCUS : (hasValue && !value ? LABEL_CLASS_HAS_VALUE : LABEL_CLASS)}
        >{label}
        </label>
        <input
          id
          className={INPUT_CLASS}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          {...props}
        />
        <hr
          className={focus ? HR_CLASS_FOCUS : HR_CLASS}
        />
      </div>
    );

  }
}

Input.propTypes = {
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  label: PropTypes.string,
  id: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
};

Input.defaultProps = {
  onFocus: null,
  onBlur: null,
  label: null,
  id: null,
};

export default Input;
