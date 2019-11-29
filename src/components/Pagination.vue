<template>
  <div class="container">
      <ul class="d-flex justify-end" style="list-style: none;">
        <li class="page-item" v-bind:class="{ disabled: prevPageToken === undefined }">
          <v-btn @click="prevPage" class="page-link primary" href="#">Previous</v-btn>
        </li>
        <li class="page-item ml-2" v-bind:class="{ disabled: nextPageToken === undefined }">
          <v-btn @click="nextPage" class="page-link red" href="#">Next</v-btn>
        </li>
      </ul>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['prevPageToken', 'nextPageToken'],
  methods: {
    prevPage() {
      this.$emit('prev-page');
    },
    nextPage() {
      this.$emit('next-page');
    }
  }
};
</script>

<style scoped>
.page-link {
  box-shadow: none !important;
}
</style>