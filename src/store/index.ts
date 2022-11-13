import { createStore } from 'vuex';
import MovieModule, { IGenre, IMovieListItem } from './modules/MovieStore';

interface Store {
  movieList: IMovieListItem[];
  genreList: IGenre[];
}

const store = createStore<Store>({
  modules: {
    movie: MovieModule,
  },
});

export default store;
