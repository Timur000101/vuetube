<template>
  <v-container >
    <div class="d-flex mb-3">
      <div class="mr-auto">
        <h3>Search Results for "{{ reformattedSearchString }}"</h3>
      </div>
    </div>

    <div class="card-columns">
      <div class="card" v-bind:key="video.id.videoId" v-for="video in videos">
        <VideoGridItem v-bind:video="video"/>
      </div>
    </div>
  </v-container>
</template>

<script>
import VideoGridItem from './VideoGridItem';

export default {  
  name: 'SearchResults',
  components: {
    VideoGridItem
  },
  data() {
    return {
      title: 'Search Results',
      displayMode: 'grid'
    };
  },
  methods: {
    changeDisplayMode(displayMode) {
      this.displayMode = displayMode;
    }
  },
  props: ['videos', 'reformattedSearchString']
};
</script>

<style scoped>
button:focus {
  box-shadow: none !important;
}
</style>