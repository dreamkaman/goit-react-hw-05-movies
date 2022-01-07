import axios from 'axios';

const API_KEY = 'c5d38a7be9bd3b66714f62495d2f9344';
const BASE_URL = 'https://api.themoviedb.org/3/movie/';

function getTrend() {
  console.dir(axios(BASE_URL));
}

export default getTrend;
