<template>
  <div class="container" color="white">
    <v-form :lazy-validation="lazy">
      <div class="input-group">
        <v-row>
          <v-text-field
            v-model="searchString"
            @keydown.13.prevent="parseSearchString"
            label="Search ..."
            dark="false"
          ></v-text-field>
          <v-btn @click="parseSearchString" class="red ml-10" label="Search">Search</v-btn>
        </v-row>
      </div>
    </v-form>
  </div>
</template>

<script>
export default {
  name: 'SearchForm',
  data() {
    return {
      searchString: ''
    };
  },
  methods: {
    parseSearchString() {
      // Trim search string
      const trimmedSearchString = this.searchString.trim();

      if (trimmedSearchString !== '') {
        // Split search string
        const searchParams = trimmedSearchString.split(/\s+/);
        // Emit event
        this.$emit('search', searchParams);
        // Reset input field
        this.searchString = '';
      }
    }
  }
};
</script>

<style scoped>
input,
button {
  box-shadow: none !important;
}

.form-control {
  border-color: #6c757d;
}
</style>