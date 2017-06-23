import React from 'react';
import SelectField from 'react-md/lib/SelectFields';

import './SelectButton.scss';

const SelectButton = props => (

  <SelectField
    position={SelectField.Positions.BELOW}
    className="SelectButton md-btn md-btn--raised md-text "
    {...props}
  />

);

export default SelectButton;
