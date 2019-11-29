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
      <!-- <v-spacer /> -->
      <!-- <v-row>
        <div class="my-2">
          <v-btn small fab dark>
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>  
        </div>
      </v-row> -->
    </v-app-bar>

    <v-content>
      <v-container class="fill-height">
        <v-row justify="center" align="center" color="red">
          <v-card max-width="800" min-width="400" class="mx-auto text-center" >
            <v-card-title class="red">
              Login
            </v-card-title>
            <v-form
              ref="form"
              v-model="valid"
              class="pa-10"
            >
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
              <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="validate"
              >
                Log in
              </v-btn>

              <v-btn
                color="error"
                class="mr-4"
                @click="reset"
              >
                Reset Form
              </v-btn>

              <v-btn
                text="true"
                color="primary"
                @click="author"
              >
                Authorization
              </v-btn>
            </v-form>
          </v-card>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>


<script>
export default{
  data: () => ({
      show1: false,
      password: '',
      valid: true,
      name: '',
      rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => ('The email and password you entered don\'t match'),
      },
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      select: null,
    }),
    methods: {
      validate () {
        if (this.$refs.form.validate()) {
          this.snackbar = true
          this.$router.push('/home')
        }
      },
      reset () {
        this.$refs.form.reset()
      },
      author () {
        this.$router.push('/authorization')
      }
    },
}
</script>

<style lang="css">

</style>