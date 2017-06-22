export function getMaxValueChartData(chartData) {

  let value = 0;

  chartData.datasets.forEach((serie) => {

    serie.data.forEach((d) => {

      if (d > value) value = d;

    });

  });

  return value;

}

export function getMaxScaleChart(maxValue) {

  let scale = '1';

  for (let i = 0; i < maxValue.toString().length - 1; i++) {

    scale += '0';

  }

  return parseInt(scale, 1);

}
