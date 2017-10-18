<template>
  <div id="app">
    <div v-if="this.$route.path === '/' || this.$route.path === '/login'">

    </div>
    <div v-else>
      <main-nav></main-nav>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import MainNav from '@/components/commons/MainNav.vue'

  export default {
    name: 'app',
    data () {
      return {male: false}
    },
    components: {
      MainNav
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    /*width:1300px;*/
    margin: 0 auto;
  }

  * {
    margin: 0px;
    padding: 0px;
  }
</style>
