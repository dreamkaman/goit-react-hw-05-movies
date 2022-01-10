import { useState, useEffect } from 'react';
import moviesAPI from '../../services/api';
import image from '../../images/no-image-new.png';

const PATH = 'https://www.themoviedb.org/t/p/original';

function Cast({ movieId }) {
  const [actors, setActors] = useState(null);

  useEffect(() => {
    moviesAPI.getCast(movieId).then(responce => {
      console.log(responce.data);
      setActors(responce.data.cast);
    });
  }, []);

  return (
    <>
      {actors && (
        <ul>
          {actors.map(actor => (
            <li key={actor.id}>
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
