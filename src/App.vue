<template>
  <component :is="layout">
    <router-view></router-view>
  </component>
</template>

<script>
import MainLayout from '@/layouts/MainLayout'
import EmptyLayout from '@/layouts/EmptyLayout'
export default {
  computed: {
    layout() {
      // console.log(this.$route.meta)
      return (this.$route.meta.layout || 'empty') + '-layout'
    }
  },
  components: {
    MainLayout,
    EmptyLayout
  }
}
</script>

<style lang="scss">
  
</style>
