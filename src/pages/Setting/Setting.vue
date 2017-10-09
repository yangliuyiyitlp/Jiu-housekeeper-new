<template>
  <div>
    <system-bar></system-bar>
    <router-view></router-view>
  </div>
</template>

<script>
  import SystemBar from '@/components/commons/Ztree/SystemBar.vue'
  import bus from '@/assets/js/eventBus.js'

  export default {
    data () {
      return {
        bar: ''
      }
    },
    components: {
      SystemBar
    },
    mounted () {
      bus.$on('settingbar', (bar) => {
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
