import PropTypes from 'prop-types';
import { styles } from './List.module.css';

const List = ({ elements }) => {
  // const elements = null;
  return <ul>{elements}</ul>;
};

export default List;

List.propTypes = {
  elements: PropTypes.array.isRequired,
};
