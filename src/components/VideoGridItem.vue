<template>
  <v-container>
    <v-row> 
      <v-card class="d-flex">
        <a @click="play(video.id.videoId)" target="_blank">
        <img class="card-img-top" :src="video.snippet.thumbnails.medium.url" alt="YouTube thumbnail">
        </a>
        <div class="card-body" style="margin-left: 20px; padding-top: 30px;">
          <h5 class="card-title">{{ video.snippet.title }}</h5>
          <h6 class="card-subtitle mb-2 text-muted">{{ video.snippet.channelTitle }} 
            | {{ video.snippet.publishedAt}}</h6>
          <p class="card-text">{{ video.snippet.description }}</p>
        </div>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'VideoGridItem',
  props: ['video'],
  data: () => {
    
  },
  methods: {
    play(id) {
      this.$router.push({name: 'videoDetail', params: {id: id}})
    }
  },
};
</script>