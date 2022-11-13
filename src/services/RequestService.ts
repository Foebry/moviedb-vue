import axios from 'axios';
const APIKEY = process.env.VUE_APP_APIKEY;

const apiClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default {
  async getPopularMovies(obj: Partial<{ page: number }>) {
    try {
      const { data } = await apiClient.get(
        `/movie/popular?api_key=${APIKEY}&language=en-US&page=${obj.page ?? 1}`
      );
      return data.results;
    } catch (e) {
      return [];
    }
  },
  async getGenres() {
    try {
      const { data } = await apiClient.get(
        `/genre/movie/list?api_key=${APIKEY}&language=en-US&page=1`
      );
      return data.genres;
    } catch (e) {
      console.log(e);
      return [];
    }
  },
};
