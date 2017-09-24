<template>
  <div>
    <service-bar></service-bar>
    <router-view></router-view>
  </div>
</template>

<script>
  import ServiceBar from '@/components/commons/Ztree/ServiceBar.vue'
  import bus from '@/assets/js/eventBus.js'
  export default {
    data () {
      return {
        bar: ''
      }
    },
    components: {
      ServiceBar
    },
    mounted () {
      bus.$on('servicebar', (bar) => {
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
