<template>
  <v-item-group>
    <v-container grid-list-md text-xs-center>
      <SearchForm v-on:search="search"/>
      <SearchResults
        v-if="videos.length > 0"
        v-bind:videos="videos"
        v-bind:reformattedSearchString="reformattedSearchString"
      />
      <Pagination
        v-if="videos.length > 0"
        v-bind:prevPageToken="api.prevPageToken"
        v-bind:nextPageToken="api.nextPageToken"
        v-on:prev-page="prevPage"
        v-on:next-page="nextPage"
      />
    </v-container>
  </v-item-group>
</template>



<script>
import SearchForm from '../components/SearchForm';
import SearchResults from '../components/SearchResults';
import Pagination from '../components/Pagination';

  export default {
    props: {
      source: String,
    },
    components: {
      SearchForm,
      SearchResults,
      Pagination
    },
    data: () => ({
      serchTerm: '',
      videos: [],
      reformattedSearchString: '',
      api: {
        baseUrl: 'https://www.googleapis.com/youtube/v3/search?',
        part: 'snippet',
        type: 'video',
        order: 'viewCount',
        maxResults: 12,
        q: '',
        key: 'AIzaSyAibuqCPE9Y5O_FlyGSEqxl1iXa8vUl9U4',
        prevPageToken: '',
        nextPageToken: ''
      },
      // key: "AIzaSyAibuqCPE9Y5O_FlyGSEqxl1iXa8vUl9U4",
    }),
    methods: {
      logout () {
        this.$router.push('/')
      },
      search(searchParams) {
        this.reformattedSearchString = searchParams.join(' ');
        this.api.q = searchParams.join('+');
        const { baseUrl, part, type, order, maxResults, q, key } = this.api;
        const apiUrl = `${baseUrl}part=${part}&type=${type}&order=${order}&q=${q}&maxResults=${maxResults}&key=${key}`;
        this.getData(apiUrl);
      },
      prevPage() {
        const { baseUrl, part, type, order, maxResults, q, key, prevPageToken } = this.api;
        const apiUrl = `${baseUrl}part=${part}&type=${type}&order=${order}&q=${q}&maxResults=${maxResults}&key=${key}&pageToken=${prevPageToken}`;
        this.getData(apiUrl);
      },

      nextPage() {
        const { baseUrl, part, type, order, maxResults, q, key, nextPageToken } = this.api;
        const apiUrl = `${baseUrl}part=${part}&type=${type}&order=${order}&q=${q}&maxResults=${maxResults}&key=${key}&pageToken=${nextPageToken}`;
        this.getData(apiUrl);
      },
      getData(apiUrl) {
        axios
          .get(apiUrl)
          .then(res => {
            this.videos = res.data.items;
            this.api.prevPageToken = res.data.prevPageToken;
            this.api.nextPageToken = res.data.nextPageToken;
          })
          .catch(error => console.log(error));
      }

    },
    

  }
</script>


<style lang="css">
  
</style>



// mounted() {
//       // this.$axios.get('http://localhost:8000/videoapi/videos/')
//       // .then((r) => {
//       //   r.data.results[0].thumbnail = 'https://i.ytimg.com/vi/jn9mHzXJIV0/hqdefault.jpg?sqp=-oaymwEZCNACELwBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAvJvk4k_UNB9nst4pFP-txM1TLZA'
//       //   r.data.results[1].thumbnail = 'https://i.ytimg.com/vi/UIwdCN4dV6w/hqdefault.jpg?sqp=-oaymwEZCNACELwBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLDhlan32jHSvicGZezDFPjAOdXGUA'
//       //   this.videosData = r.data.results
//       //   // console.log(r.data.results)
//       // })
//       // axios.get('https://www.googleapis.com/youtube/v3/search?key=' + this.key, {
//       //     params: {
//       //       part: 'snippet',
//       //       type: 'video',
//       //       maxResults: 5,
//       //       q: '',
//       //     }
//       //   }) 
//       //   .then((r) => {
//       //     this.videosData = r.data.items
//       //     // console.log(this.videosData[index].snippet.thumbnails.high.url)
//       //     console.log(this.videosData[0].snippet)
//       //   })
//     }