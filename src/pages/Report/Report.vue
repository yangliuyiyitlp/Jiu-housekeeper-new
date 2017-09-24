<template>
  <div>
    <report-bar></report-bar>
    <router-view></router-view>
  </div>
</template>

<script>
  import ReportBar from '@/components/commons/Ztree/ReportBar.vue'
  import bus from '@/assets/js/eventBus.js'
  export default {
    data () {
      return {
      }
    },
    components: {
      ReportBar
    },
    mounted () {
      bus.$on('reportbar', (bar) => {
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
