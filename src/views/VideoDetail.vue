<template>
  <div class="d-flex">
    <div style="width: 700px;">
      <iframe width="700" height="450" :src="'https://www.youtube.com/embed/' + id">
      </iframe>
      <div id="videoDetail">
        <div>
          <h2 id="videoTitle">{{ this.title }}</h2>
          <div id="videoStatistics" class="d-flex align-start justify-space-between mt-2">
            <div id="videoViewCount" class="d-flex align-start">
              <p class="mr-4"><v-icon color="gray" class="pr-3">mdi-eye</v-icon>{{this.viewCount}}</p>
              <h5>{{ new Date(this.date) | dateFormat('DD MMM. YYYY' + ' y.') }}</h5>
            </div>
            <div id="videoLikes" class="d-flex align-start">
              <v-btn color="white" class="mr-2" @click="like()"><v-icon color="gray" class="mr-1">mdi-thumb-up-outline</v-icon> {{ this.likeCount }}</v-btn>
              <v-btn color="white" @click="dislike()"><v-icon color="gray" class="mr-1">mdi-thumb-down-outline</v-icon> {{ this.dislikeCount }}</v-btn>
            </div>
          </div>
          <hr class="mb-2 mt-2">
          <div class="d-flex flex-column align-start mb-5">
            <div id="channelTitle" class="d-flex align-center mb-3">
              <img :src="this.channelIcon" style="width: 50px; height: 50px; border-radius: 50%;" class="mr-5" alt="">
              <h4>{{ this.chanelTitle }}</h4>
            </div>
            <v-expansion-panels style="width: 700px;">
              <v-expansion-panel>
                <v-expansion-panel-header>Item</v-expansion-panel-header>
                <v-expansion-panel-content>
                  {{ this.description }}
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>
        </div>
      </div>
    </div>

    <div>
      <SearchResults
        v-if="videos.length > 0"
        v-bind:videos="videos"
        v-bind:reformattedSearchString="reformattedSearchString"
      />
    </div>
    
    <!-- <div class="card-columns">
      <div class="card" v-bind:key="video.id.videoId" v-for="video in videos">
        <VideoGridItem v-bind:video="video"/>
      </div>
    </div> -->
  </div>
</template>


<script>
import VideoGridItem from '@/components/VideoGridItem';
import SearchResults from '../components/SearchResults';
export default {
  props: ['video', 'reformattedSearchString'],
  data (){
    return{
      videos: [],
      key: 'AIzaSyAibuqCPE9Y5O_FlyGSEqxl1iXa8vUl9U4',
      id: this.$route.params.id,
      title: '',
      chanelTitle: '',
      date: '', 
      channelId: '', channelIcon: '', viewCount: '', likeCount: '', dislikeCount: '', description: ''
    }
  },
  components: {
    VideoGridItem,
    SearchResults
  },
  mounted(){
    axios.get("https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" + this.id + "&key=" + this.key)
    .then((r) => {
      this.title = r.data.items[0].snippet.title
      this.chanelTitle = r.data.items[0].snippet.channelTitle
      this.date = r.data.items[0].snippet.publishedAt
      this.channelId = r.data.items[0].snippet.channelId
      this.description = r.data.items[0].snippet.description
      
      axios.get("https://www.googleapis.com/youtube/v3/channels?part=snippet&id=" + this.channelId + "&key=" + this.key )
      .then((r) => {
        this.channelIcon = r.data.items[0].snippet.thumbnails.medium.url
      })

      axios.get("https://www.googleapis.com/youtube/v3/videos/?key=" + this.key + "&part=statistics&snippet&id=" + this.id)
      .then((r) => {
        this.viewCount = r.data.items[0].statistics.viewCount
        this.likeCount = r.data.items[0].statistics.likeCount
        this.dislikeCount = r.data.items[0].statistics.dislikeCount
      })
    })
  },
  methods: {
    like() {       
      this.likeCount = Number(this.likeCount) + 1 
    },
    dislike() {
      this.dislikeCount = Number(this.dislikeCount) + 1 
    },
  }
}
</script>