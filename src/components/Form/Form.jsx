import { useState } from 'react';
import PropTypes from 'prop-types';

import styles from './Form.module.css';

function Form({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleOnChange = e => {
    setQuery(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(query);
  };
  return (
    <form className={styles.userForm} onSubmit={handleSubmit}>
      <input value={query} onChange={handleOnChange} />
      <button type="Submit">Search</button>
    </form>
  );
}

export default Form;

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
