import './RouteTransition.scss';

import React from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const RouteTransition = ({children, type, timeout, ...props}) => (
      <ReactCSSTransitionGroup
        transitionName={type}
        transitionEnterTimeout={timeout}
        transitionLeaveTimeout={timeout}
        {...props}
      >
        {children}
      </ReactCSSTransitionGroup>
   );


//RouteTransition.shouldComponentUpdate = () => false;

RouteTransition.propTypes = {
  type: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  timeout: PropTypes.number.isRequired,
  appear: PropTypes.bool.isRequired,
};

RouteTransition.TransitionTypes = {
  FADE: 'fade',
  EXAMPLE: 'example',
};

RouteTransition.defaultProps = {
  appear: true,
  type: RouteTransition.TransitionTypes.FADE,
  timeout: 300,
};

export default RouteTransition;
