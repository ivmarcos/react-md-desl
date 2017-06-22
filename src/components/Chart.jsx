import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChartJS from 'chart.js';
import { fromJS } from 'immutable';
import merge from 'lodash/merge';

class Chart extends Component {

  componentDidMount() {

    this.initializeChart(this.props);

  }

  /* eslint-disable */
  componentShouldComponentUpdate() {

    return false;

  }
  /* eslint-enable */


  componentWillReceiveProps(nextProps) {

    const nextData = fromJS(nextProps.data);
    // const nextOptions = fromJS(nextProps.options);

    if (!this.currentData || !nextData.equals(this.currentData)) {

      this.chart.data.datasets = nextProps.data.datasets;
      this.chart.data.labels = nextProps.data.labels;
      this.chart.options = merge(this.chart.options, nextProps.options);

      console.log('options', this.chart);
      this.currentData = nextData;
      this.currentOptions = nextProps.options;

      this.chart.update();

    }

  }


  componentWillUnmount() {

    if (!this.chart) {

      console.warn('Chart not exists, there is nothing to destroy!. ');

    } else {

      this.chart.destroy();

    }

  }


  initializeChart(props) {

    const { type, data, options } = props;
    this.chart = new ChartJS(this.element, { type, data, options });
    this.currentData = fromJS(data);

  }

  render() {

    return (
      <canvas
        {...this.props}
        ref={(node) => {

          this.element = node;

        }}
      />
    );

  }

}


Chart.propTypes = {
  options: PropTypes.object,
  data: PropTypes.object.isRequired,
};

Chart.ChartTypes = {
  LINE: 'line',
};

Chart.defaultProps = {
  type: Chart.ChartTypes.LINE,
  options: null,
};

export default Chart;
