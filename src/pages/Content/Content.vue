<template>
  <div>
    <content-bar></content-bar>
    <router-view></router-view>
  </div>
</template>

<script>
  import ContentBar from '../../components/commons/Ztree/ContentBar.vue'
  import bus from '../../assets/js/eventBus.js'
  export default {
    data () {
      return {
        bar: ''
      }
    },
    components: {
      ContentBar
    },
    mounted () {
      bus.$on('contentbar', (bar) => {
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
