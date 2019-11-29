<template>
  <v-container>
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
  components: {
    VideoGridItem
  },
  props: ['videos', 'reformattedSearchString']
}
</script>