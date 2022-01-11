import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

import styles from './List.module.css';

const List = ({ arr }) => {
  const location = useLocation();

  const elements = arr?.map(item => (
    <li className={styles.list} key={item.id}>
      <Link to={{ pathname: `/movies/${item.id}`, state: { from: location } }}>{item.title}</Link>
    </li>
  ));

  return <ul>{elements}</ul>;
};

export default List;

List.propTypes = {
  arr: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string,
    }),
  ).isRequired,
};
