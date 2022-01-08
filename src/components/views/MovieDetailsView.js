import { useParams } from 'react-router-dom';

function MovieDetailsView() {
  const { movieId } = useParams;

  return (
    <div>
      <h2>Here will be a Bookname!</h2>
    </div>
  );
}

export default MovieDetailsView;
