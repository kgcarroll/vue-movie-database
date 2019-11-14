<template>
    <div class="movie-detail" :style="{ backgroundImage: 'url(https://image.tmdb.org/t/p/original/' + movie.backdrop_path + ')' }">
        <div class="detail-wrap">
            <div class="poster">
                <img :src="'https://image.tmdb.org/t/p/original/' + movie.poster_path" height="300" width="200">
            </div>
            <div class="details-container">
                <h2 class="title">{{ movie.title }}</h2>
                <div class="release"><span class="label">Released:</span> {{ formatDate(movie.release_date) }}</div>
                <div class="rating"><span class="label">Rating:</span> {{ movie.vote_average }}</div>
                <div class="runtime"><span class="label">Runtime:</span> {{ details.runtime }} minutes</div>
                <div class="synopsis">
                    <p>{{ movie.overview }}</p>
                </div>
                <div class="cast">
                    <span class="label">Cast:</span>
                    <span class="cast-members">{{ credits.cast.slice(0, 20).map(c => c.name).join(", ") }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import axios from 'axios';

export default {
    name: 'Movie',
    props: ['movie'],
    watch: {
        movie: function(movie) {
            axios.get('https://api.themoviedb.org/3/movie/'+ movie.id +'/credits?api_key=83d3415a37a96ef11c1ae22b98c556da')
            .then(response => this.credits = response.data )
            .catch(err => console.log(err))

            axios.get('https://api.themoviedb.org/3/movie/'+ movie.id +'?api_key=83d3415a37a96ef11c1ae22b98c556da&language=en-US')
            .then(response => this.details = response.data )
            .catch(err => console.log(err))
        }
    },
    data() {
        return {
            details: [],
            credits: []
        }
    },
    methods: {
        formatDate(value){
            if (value) {
                return moment(String(value)).format('MMMM Do, YYYY')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.movie-detail {
    max-width: 1024px;
    max-height: 576px;
    margin: 0 auto 85px;
    position: relative;
    background-size: cover;
    .detail-wrap {
        padding: 50px;
        background: rgba($black, .8);
        display: flex;
        flex-direction: row;
        .poster {

        }
        .details-container {
            color: $white;
            padding: 0 0 0 50px;
            .release,
            .rating,
            .runtime,
            .synopsis {
                @include font(16);
            }
            .synopsis {
                margin: 15px 0 0;
            }
        }
    }
}
</style>