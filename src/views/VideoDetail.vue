<template>
  <div>
    <div>
      <iframe width="700" height="450" :src="'https://www.youtube.com/embed/' + id">
      </iframe>
      <div>
        <h2>{{ this.title }}</h2>
        <h4>{{ this.chanelTitle }}</h4>
        <h5>{{ this.date }}</h5>
      </div>
    </div>
    <!-- <div class="card-columns">
      <div class="card" v-bind:key="video.id.videoId" v-for="video in videos">
        <VideoGridItem v-bind:video="video"/>
      </div>
    </div> -->
  </div>
</template>


<script>
// import VideoGridItem from '@/components/VideoGridItem';
export default {
  props: ['video'],
  data (){
    return{
      key: 'AIzaSyAibuqCPE9Y5O_FlyGSEqxl1iXa8vUl9U4',
      id: this.$route.params.id,
      title: '',
      chanelTitle: '',
      date: ''
    }
  },
  components: {
    // VideoGridItem
  },
  created() {
    axios.get("https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" + this.id + "&key=" + this.key)
    .then((r) => {
      console.log(r)
      this.title = r.data.items[0].snippet.title
      this.chanelTitle = r.data.items[0].snippet.channelTitle
      this.date = r.data.items[0].snippet.publishedAt
    })

  }
}
</script>