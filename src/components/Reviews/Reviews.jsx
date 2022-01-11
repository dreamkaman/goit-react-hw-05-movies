import PropTypes from 'prop-types';

import { useState, useEffect } from 'react';
import moviesAPI from '../../services/api';

import styles from './Reviews.module.css';

function Reviews({ movieId }) {
  const [reviews, setReviews] = useState(null);
  useEffect(
    () =>
      moviesAPI
        .getReviews(movieId)
        .then(responce => {
          setReviews(responce.data.results);
        })
        .catch(err => {
          alert(`Something went wronge! The Error apears: "${err.message}" `);
        }),
    [movieId],
  );

  return (
    <>
      {reviews?.length ? (
        <ul>
          {reviews.map(review => (
            <li className={styles.review} key={review.id}>
              <p className={styles.author}>Author: {review.author}</p>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>We don't have any reviews for this movie.</p>
      )}
    </>
  );
}

export default Reviews;

Reviews.propTypes = {
  movieId: PropTypes.number.isRequired,
};
