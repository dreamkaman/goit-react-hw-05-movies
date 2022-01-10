import axios from 'axios';

const API_KEY = 'c5d38a7be9bd3b66714f62495d2f9344';
const BASE_URL = 'https://api.themoviedb.org/3/movie/';
const params = { api_key: API_KEY };

function getPopular() {
  return axios.get(`${BASE_URL}popular`, { params });
}

function getDetails(movieId) {
  return axios.get(`${BASE_URL}${movieId}`, { params });
}

function getCast(movieId) {
  return axios.get(`${BASE_URL}${movieId}/credits`, { params });
}

function getReviews(movieId) {
  return axios.get(`${BASE_URL}${movieId}/reviews`, { params });
}

const moviesAPI = {
  getPopular,
  getDetails,
  getCast,
  getReviews,
};

export default moviesAPI;
