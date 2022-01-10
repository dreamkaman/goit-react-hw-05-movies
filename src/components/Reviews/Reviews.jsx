import { useState, useEffect } from 'react';
import moviesAPI from '../../services/api';

function Reviews({ movieId }) {
  const [reviews, setReviews] = useState(null);
  useEffect(
    () =>
      moviesAPI.getReviews(movieId).then(responce => {
        setReviews(responce.data.results);
      }),
    [],
  );

  return (
    <>
      {reviews?.length ? (
        <ul>
          {reviews.map(review => (
            <li key={review.id}>
              <p>Author: {review.author}</p>
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
