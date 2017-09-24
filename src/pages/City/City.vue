<template>
  <div>
    <city-bar></city-bar>
    <router-view></router-view>
  </div>
</template>

<script>
  import CityBar from '@/components/commons/Ztree/CityBar.vue'
  import bus from '@/assets/js/eventBus.js'
  export default {
    data () {
      return {
        bar: ''
      }
    },
    components: {
      CityBar
    },
    mounted () {
      bus.$on('citybar', (bar) => {
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
