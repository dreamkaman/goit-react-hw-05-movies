import axios from 'axios';

const API_KEY = 'c5d38a7be9bd3b66714f62495d2f9344';
const BASE_URL = 'https://api.themoviedb.org/3/movie/';
// const baseParams = { api_key: API_KEY };

function getPopular() {
  return axios.get('https://api.themoviedb.org/3/movie/popular', { params: { api_key: API_KEY } });
}

function getDetails(id) {
  return axios.get(BASE_URL & `movie/${id}`, { params: { api_key: API_KEY } });
}

const moviesAPI = {
  getPopular,
  getDetails,
};

// export default getPopular;
export default moviesAPI;
