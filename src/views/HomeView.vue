<template>
  <div class="flex mx-auto">
    <MovieListItem
      v-for="movie in popularMovies"
      :key="movie.id"
      v-bind="movie"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import { IMovieListItem } from '@/store/modules/MovieStore';
import store from '@/store';
import MovieListItem from '@/components/MovieListItem.vue';
import { mapGetters } from 'vuex';

export default defineComponent({
  name: 'HomeView',
  props: {},
  setup() {
    const popularMovies = ref<IMovieListItem[]>();

    const getMovieList = async () => {
      const movieList = await store.dispatch('getPopularMovies', {});
      popularMovies.value = movieList;
    };
    const getGenreList = async () => {
      await store.dispatch('getGenres');
    };
    computed(() => ({
      ...mapGetters(['/movie/getGenresByIds']),
    }));
    onMounted(async () => {
      await getGenreList();
      await getMovieList();
    });
    return { popularMovies };
  },
  components: { MovieListItem },
});
</script>

<style scoped>
div {
  max-width: 1400px;
  margin-bottom: 20px;
}
.flex {
  display: flex;
  gap: 10px;
  justify-content: space-between;
  flex-wrap: wrap;
}
.mx-auto {
  margin: 0 auto;
}
</style>
