import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
const API_KEY = "31ed552ad8adf82ad10d0cb8693a980a";
const API_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMWVkNTUyYWQ4YWRmODJhZDEwZDBjYjg2OTNhOTgwYSIsInN1YiI6IjY1MGEwYzA4ZDZjMzAwMDBjY2UwY2FmMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._4ZwisLpBSssgSnhHEoPoJKNWX4qsAFu92ln256v688";

const options = {
  headers: {
    Authorization: API_TOKEN,
    include_adult: false,
    language: "en",
  },
};

export const fetchTrendMovies = async () => {
  const response = await axios.get("/trending/movie/day", {
    params: {
      api_key: API_KEY,
      options,
    },
  });
  return response.data.results;
};

export const fetchSearchMovie = async (query) => {
  const response = await axios.get(`/search/movie`, {
    params: {
      api_key: API_KEY,
      ...options,
      query: query,
    },
  });
  return response.data.results;
};

export const fetchDetailsMovie = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}`, {
    params: {
      ...options,
      api_key: API_KEY,
    },
  });
  return response.data;
};

export const fetchReviews = async (movieId) => {
  const response = await axios.get(`movie/${movieId}/reviews`, {
    params: {
      ...options,
      api_key: API_KEY,
    },
  });
  return response.data.results;
};

export const fetchCast = async (movieId) => {
  const response = await axios.get(`movie/${movieId}/credits`, {
    params: {
      ...options,
      api_key: API_KEY,
    },
  });
  return response.data.cast;
};
