import get from 'lodash/get';

export function getOffset(element) {

  let x = 0;
  let y = 0;
  let el = element;

  while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {

    x += el.offsetLeft - el.scrollLeft;
    y += el.offsetTop - el.scrollTop;
    el = el.offsetParent;

  }
  return { top: y, left: x };

}


export function sort(array, key, direction) {

  const ajuste = direction ? 1 : -1;
  const superior = 1 * ajuste;
  const inferior = -1 * ajuste;

  //eslint-disable-next-line
  array.sort((a, b) => {

    const valueA = get(a, key);
    const valueB = get(b, key);

    if (valueA === undefined) return inferior;
    if (valueB === undefined) return inferior;

    return valueA > valueB ? superior : inferior;

  });

  return array;

}
