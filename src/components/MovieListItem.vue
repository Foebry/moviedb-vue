<template>
  <div class="movie-item">
    <div class="heading">
      <h2>{{ original_title }}</h2>
      <h3>{{ release_date }}</h3>
      <h4>
        score:
        <span :data-score="score">{{ vote_average }}</span
        >/10
      </h4>
    </div>
    <div class="poster">
      <img :src="src" />
      <div class="overview">{{ overview }}</div>
    </div>
    <div class="genres">
      <span>{{ genreNames }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, onMounted, ref } from 'vue';
import { IGenre } from '@/store/modules/MovieStore';
import store from '@/store';
export default {
  props: {
    id: { type: String, required: true },
    original_title: { type: String, required: true },
    genre_ids: { type: Array, required: true },
    overview: { type: String, required: true },
    poster_path: { type: String, required: true },
    vote_average: { type: Number, required: true },
    release_date: { type: String, required: true },
  },
  setup(props) {
    const src = ref(`https://image.tmdb.org/t/p/w500/${props.poster_path}`);
    const genreNames = ref<string>();

    const setGenreNames = async () => {
      const genres: IGenre[] = await store.dispatch('getGenres');
      genreNames.value = genres
        .filter((genre) => props.genre_ids.includes(genre.id))
        .map((genre) => genre.name)
        .join(', ');
    };
    onMounted(() => {
      setGenreNames();
    });

    const score = computed(() => {
      return Math.floor(props.vote_average).toString();
    });

    return {
      src,
      genreNames,
      score,
    };
  },
  inheritAttrs: false,
};
</script>

<style scoped>
.movie-item {
  max-width: 400px;
  cursor: pointer;
}
.poster {
  position: relative;
  box-sizing: border-box;
  margin: 0;
}
.poster img {
  width: 100%;
}
.poster:hover:after {
  position: absolute;
  left: 0;
  top: 0;
  content: '';
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.6;
}
.poster:hover > .overview {
  display: block;
  color: white;
  z-index: 2;
}
.overview {
  position: absolute;
  top: 100px;
  padding: 0 20px;
  display: none;
  font-size: 16px;
  line-height: 24px;
}
.genres {
  color: white;
}
.heading h2 {
  font-size: 30px;
  color: white;
}
.heading h3 {
  font-size: 20px;
  color: white;
}
.heading h4 {
  font-size: 16px;
  color: white;
}
.heading h4 span[data-score='10'],
.heading h4 span[data-score='9'] {
  color: green;
}
.heading h4 span[data-score='8'],
.heading h4 span[data-score='7'] {
  color: lightgreen;
}
.heading h4 span[data-score='6'],
.heading h4 span[data-score='5'] {
  color: orange;
}
.heading h4 span[data-score='4'],
.heading h4 span[data-score='3'] {
  color: red;
}
.heading h4 span[data-score='2'],
.heading h4 span[data-score='1'],
.heading h4 span[data-score='0'] {
  color: darkred;
}
.genres {
  font-size: 12px;
  margin-top: 5px;
}
</style>
