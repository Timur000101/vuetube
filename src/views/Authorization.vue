<template>
  <v-app>
    <v-app-bar
      app
      color="red"
      dense 
      class="d-flex justify-space-around"
    >
      <v-toolbar-title class="mr-12 align-center">
        <h2 >KazTube</h2>
      </v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container class="fill-height">
        <v-row justify="center" align="center" color="red">
          <v-card max-width="800" min-width="400" class="mx-auto text-center" >
            <v-card-title class="red">
              Authorization
            </v-card-title>
            <v-form
              ref="form"
              v-model="valid"
              class="pa-10"
            >
              <v-text-field
                v-model="name"
                :counter="10"
                :rules="nameRules"
                label="Name"
                required
              ></v-text-field>

              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
              ></v-text-field>

              <v-text-field
                v-model="password"
                :append-icon="show1 ? 'visibility' : 'visibility_off'"
                :rules="[rules.required, rules.min]"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                label="Password"
                hint="At least 8 characters"
                counter
                @click:append="show1 = !show1"
              ></v-text-field>

              <v-text-field
                v-model="password2"
                :append-icon="show1 ? 'visibility' : 'visibility_off'"
                :rules="[rules.required, rules.min, coincidence]"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                label="Confirm password"
                hint="At least 8 characters"
                counter
                @click:append="show1 = !show1"
              ></v-text-field>

              <v-checkbox
                v-model="checkbox"
                :rules="[v => !!v || 'You must agree to continue!']"
                label="You agree to the processing of personal data"
                required
              ></v-checkbox>

              <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="register()"
              >
                Register
              </v-btn>
            </v-form>
          </v-card>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>


<script>
export default {
  data: () => ({
      show1: false,
      password: '',
      password2: '',
      checkbox: '',
      valid: true,
      name: '',
      rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => ('The email and password you entered don\'t match'),          
          // coincidence: v => (v.password === v.password2) || 'Passwords don`t match'
      },
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      select: null,
    }),
    methods: {
      register() {
        axios.post('http://localhost:8000/userapi/users/', {
          email: this.email,
          name: this.name,
          password: this.password
        })
        .then((r) => {
          console.log(r)
        })
        this.$router.push('/')
      }
    },
    computed: {
      coincidence() {
        return () => (this.password === this.password2) || 'Passwords don`t match'
      }
    }
}
</script>