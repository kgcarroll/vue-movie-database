<template>
  <div id="app">
    <Home />
    <Movie :movie="movieDetail"></Movie>
    <div class="movies-wrapper">
      <div class="movie" v-for="(movie, index) in movies" :index="index" :key="movie.id" @click="movieDetail = movie">
        <div class="poster">
            <img :src="'https://image.tmdb.org/t/p/original/' + movie.poster_path" />
        </div>
        <h2 class="title">{{ movie.title }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
import Home from './components/Home';
import Movie from './components/Movie';
import axios from 'axios';

export default {
  name: 'app',
  // Components (imported above)  
  components: {
    Home,
    Movie
  },
  // API call, using Axios
  created() {
    axios.get('https://api.themoviedb.org/3/movie/popular?api_key=83d3415a37a96ef11c1ae22b98c556da&language=en-US&page=1')
      .then(response => this.movies = response.data.results )
      .catch(err => console.log(err));
  },
  data() {
    return {
      movieDetail: null,
      movies: []
    }
  }
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}
html { font-size: 62.5%; }
.label { font-weight: $bold; }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: #2c3e50;
  margin-top: 60px;

  // Typography
  h1 { @include font(26); }
  h2 { @include font(22); }
  h3 { @include font(18); }
  p {
    @include font(16);
    line-height: 1.5;
    margin: 0 0 20px;
  }

  .movies-wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    max-width: 1440px;
    margin: 0 auto;
    .movie {
      width: 100%;
      @include device(sm) {
        width: 50%;
      }
      @include device(tablet) {
        width: calc(100% / 3);
      }
      @include device(desktop) {
        width: 25%;
      }
      .poster {
        padding: 10px;
        img {
          width: 100%;
          height: auto;
        }
      }
      h2.title {
        text-align: center;
      }
    }
  }
}
</style>
