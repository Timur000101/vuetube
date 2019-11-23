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

    <v-content class="white">
      <v-container>
        <v-item-group>
          <v-container>
            <v-row>
              <v-col cols="12" md="3">
                <iframe height="180"  src="https://www.youtube.com/embed/v3n1uIrWmCI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              </v-col>
              <v-col cols="12" md="3">
                <iframe  src="https://www.youtube.com/embed/v3n1uIrWmCI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              </v-col>
              <v-col cols="12" md="3">
                <iframe  src="https://www.youtube.com/embed/v3n1uIrWmCI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              </v-col>
            </v-row>
          </v-container>
        </v-item-group>
      </v-container>
    </v-content>

  </v-app>
</template>

<script>
const API_KEY = 'AIzaSyANCZDnpF1TwcwuFv0E0yRPR3q3n2-eO3A'; 
  export default {
    props: {
      source: String,
    },
    data: () => ({
      serchTerm: '',
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
      }
    },
    methods: {
      search(searchTerm) {
        axios.get('https://www.googleapis.com/youtube/v3/search', {
          params: {
            key: API_KEY,
            type: 'video',
            part: 'snippet',
            q: serchTerm,
          },
        }).then((r) => {
          console.log(r)
        })
      }
    }

  }
</script>


<style lang="css">
  
</style>
