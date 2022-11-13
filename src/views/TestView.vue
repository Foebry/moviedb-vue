<!-- <template>
  <ul>
    <li v-for="movie in popularMovies" :key="movie.id">
      {{ movie.original_title }}
    </li>
  </ul>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent, onMounted, ref } from 'vue';
export default defineComponent({
  name: 'HomeView',
  props: {},
  setup() {
    const popularMovies = ref([]);
    const getPopularMovies = async () => {
      const { data } = await axios.get(
        'https://api.themoviedb.org/3/movie/popular?api_key=70be0b65c33ddd00078c95d76b93861c&language=en-US&page=1'
      );
      if (data) {
        popularMovies.value = data.results;
      }
    };
    onMounted(() => {
      getPopularMovies();
    });
    return { popularMovies };
  },
});
</script>

<style></style> -->
