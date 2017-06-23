import React from 'react';
import PropTypes from 'prop-types';
import formatMoney from 'lib/util/formatMoney';

import './Currency.scss';

const Currency = ({ value, negativeClassName, positiveClassName, decimals }) => (
  <span
    className={value >= 0 ? positiveClassName : negativeClassName}
  >
    {formatMoney(value, decimals, ',', '.')}
  </span>
);

Currency.defaultProps = {
  negativeClassName: 'currency-negative',
  positiveClassName: 'currency-positive',
  decimals: 2,
};

Currency.propTypes = {
  negativeClassName: PropTypes.string,
  positiveClassName: PropTypes.string,
  decimals: PropTypes.number,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default Currency;
