import dateformat from 'lib/dateformat';

const Momento = ({ data, formato }) => dateformat(data, formato);

export default Momento;
