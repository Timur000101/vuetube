<template>
  <v-app id="inspire" >
    <v-navigation-drawer v-model="drawer" app clipped color="grey lighten-2">
      <v-list dense>
        <v-list-item v-for="item in items" :key="item.text" link>
          <v-list-item-action>
            <v-icon color="black">{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="black--text">
              {{ item.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- <v-subheader class="mt-4 grey--text text--darken-1">SUBSCRIPTIONS</v-subheader> -->
        <!-- <v-list>
          <v-list-item v-for="item in items2" :key="item.text" link>
            <v-list-item-title v-text="item.text" />
          </v-list-item>
        </v-list> -->
        <v-list-item
          class="mt-4"
          link
        >
          <v-list-item-action>
            <v-icon color="grey darken-1">mdi-plus-circle-outline</v-icon>
          </v-list-item-action>
          <v-list-item-title class="grey--text text--darken-1">Browse Channels</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon color="grey darken-1">mdi-settings</v-icon>
          </v-list-item-action>
          <v-list-item-title class="grey--text text--darken-1">Manage Subscriptions</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
      color="red"
      dense
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title class="mr-12 align-center">
        <span class="title">Kaztube</span>
      </v-toolbar-title>
      <v-spacer />
      <v-row
        align="center"
        style="max-width: 650px"
      >
        <v-text-field
          :append-icon-cb="() => {}"
          placeholder="Search..."
          single-line
          append-icon="search"
          color="white"
          hide-details
        />
        <div class="my-2 ma-10">
          <v-btn color="white" smal @click.prevent="logout">
            <p class="black--text pt-2">Log out</p>
          </v-btn>
        </div>
      </v-row>
    </v-app-bar>

    <v-content>
      <v-container> 
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
      </v-container>
    </v-content>

  </v-app>
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
      drawer: null,
      items: [
        { icon: 'trending_up', text: 'Most Popular' },
        { icon: 'subscriptions', text: 'Subscriptions' },
        { icon: 'history', text: 'History' },
        { icon: 'featured_play_list', text: 'Playlists' },
        { icon: 'watch_later', text: 'Watch Later' },
      ],
      items2: [
        { picture: 28, text: 'Joseph' },
        { picture: 38, text: 'Apple' },
        { picture: 48, text: 'Xbox Ahoy' },
        { picture: 58, text: 'Nokia' },
        { picture: 78, text: 'MKBHD' },
      ],
    }),
    created () {
      this.$vuetify.theme.dark = true
    },
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