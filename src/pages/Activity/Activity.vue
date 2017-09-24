<template>
  <div>
    <!-- <router-link :to='{name:bar}'></router-link> -->
    <activity-bar></activity-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import ActivityBar from '@/components/commons/Ztree/ActivityBar.vue'
import bus from '@/assets/js/eventBus.js'
export default {
  data () {
    return {
      bar: ''
    }
  },
  components: {
    ActivityBar
  },
  mounted () {
    bus.$on('activitybar', (bar) => {
      this.bar = bar
      console.log(this.bar)
      this.$router.push({
        name: this.bar
      })
    })
  }
}
</script>

<style scoped>

</style>
