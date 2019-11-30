<template>
  <v-app id="inspire" >
    <v-navigation-drawer v-model="drawer" app clipped color="grey lighten-2">
      <v-list dense>
        <v-list-item v-for="item in items" :to="item.url" :key="item.url" :exact="item.exact"  link>
          <v-list-item-action>
            <v-icon color="black">{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="black--text">
              {{ item.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        
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
      <span>{{date | date('datetime')}}</span>
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
        <h4 class="ml-5">Welcome {{this.user}}!</h4>
        <div class="my-2 ma-10">
          <v-btn color="white" smal @click.prevent="logout">
            <p class="black--text pt-2">Log out</p>
          </v-btn>
        </div>
      </v-row>
    </v-app-bar>

    <v-content>
      <v-container > 
        <router-view />
      </v-container>
    </v-content>

  </v-app>
</template>


<script>
export default {
  props: {
    sourse: String,
  },
  data: () => ({
    user: '',
    date: new Date(),
    interval: null,
    drawer: null,
      items: [
        { icon: 'home', text: 'Home', url: '/home', exact: true},
        { icon: 'history', text: 'History' },
        { icon: 'watch_later', text: 'Watch Later' },
        { icon: 'person', text: 'Account', url: '/account'}
      ],
      items2: [
        { picture: 28, text: 'Joseph' },
        { picture: 38, text: 'Apple' },
        { picture: 48, text: 'Xbox Ahoy' },
        { picture: 58, text: 'Nokia' },
        { picture: 78, text: 'MKBHD' },
      ],
  }),
  mounted() {
    this.interval = setInterval(() => {
      this.date = new Date();
    }, 1000 )

    axios.get('http://localhost:8000/userapi/users/')
    .then((r) => {
      this.user = r.data.results[r.data.results.length - 1].name
    })
    
  },
  methods: {
    logout () {
      this.$router.push('/')
    },
  }

}
</script>