import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import moviesAPI from '../../services/api';
import image from '../../images/no-image-new.png';

import { styles } from './Cast.module.css';

const PATH = 'https://www.themoviedb.org/t/p/original';

function Cast({ movieId }) {
  const [actors, setActors] = useState(null);

  useEffect(() => {
    moviesAPI
      .getCast(movieId)
      .then(responce => {
        // console.log(responce.data);
        setActors(responce.data.cast);
      })
      .catch(err => alert(`Something went wronge! The Error apear: ${err} `));
  }, []);

  return (
    <>
      {actors && (
        <ul>
          {actors.map(actor => (
            <li key={actor.credit_id}>
              {actor.profile_path ? (
                <img src={`${PATH}${actor.profile_path}`} alt={actor.name} width="150" />
              ) : (
                <img src={image} alt={actor.name} width="150" />
              )}
              <p>{actor.name}</p>
              <p>Character: {actor.character}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default Cast;

Cast.protoType = {
  movieId: PropTypes.number.isRequired,
};
