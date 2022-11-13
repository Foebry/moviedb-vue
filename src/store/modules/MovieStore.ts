import RequestService from '@/services/RequestService';
import store from '..';

export const namespaced = 'movie';

export interface IMovieListItem {
  original_title: string;
  id: string;
  genre_ids: number[];
  overview: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
}

export interface IGenre {
  id: number;
  name: string;
}

interface MovieStore {
  state: {
    movieList: IMovieListItem[];
    genreList: IGenre[];
  };
  actions: {
    getPopularMovies: () => Promise<IMovieListItem[]>;
    getGenres: () => Promise<IGenre[]>;
    getStateGenres: () => IGenre[];
  };
  mutations: {
    SET_MOVIE_LIST: (
      state: MovieStore['state'],
      movieList: IMovieListItem[]
    ) => void;
    SET_GENRES: (state: MovieStore['state'], genres: IGenre[]) => void;
  };
}

const MovieModule: MovieStore = {
  state: {
    movieList: [],
    genreList: [],
  },
  actions: {
    getPopularMovies: async () => {
      if (state.movieList.length > 0) return state.movieList;
      const movies = await RequestService.getPopularMovies({});
      store.commit('SET_MOVIE_LIST', movies);
      return state.movieList;
    },
    getGenres: async (): Promise<IGenre[]> => {
      if (state.genreList.length > 0) return state.genreList;
      const genres = await RequestService.getGenres();
      store.commit('SET_GENRES', genres);
      console.log(state);
      return state.genreList;
    },
    getStateGenres: () => {
      return state.genreList;
    },
  },
  mutations: {
    SET_MOVIE_LIST: (state, movieList) => {
      state.movieList = movieList;
    },
    SET_GENRES: (state, genres) => {
      state.genreList = genres;
    },
  },
};

export default MovieModule;
export const { state, actions, mutations } = MovieModule;
