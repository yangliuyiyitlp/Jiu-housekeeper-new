<template>
  <div>
    <status-bar></status-bar>
    <router-view></router-view>
  </div>
</template>

<script>
  import StatusBar from '@/components/commons/Ztree/StatusBar.vue'
  import bus from '@/assets/js/eventBus.js'
  export default {
    data () {
      return {
        bar: ''
      }
    },
    components: {
      StatusBar
    },
    mounted () {
      bus.$on('statusbar', (bar) => {
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
