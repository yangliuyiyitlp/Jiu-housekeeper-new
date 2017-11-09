<template>
  <div id="app" class="sidebar">
    <div v-if="this.$route.path === '/' || this.$route.path === '/login'">

    </div>
    <div v-else>
      <main-nav></main-nav>
    </div>
    <!--<router-view class="sidebar"></router-view>-->
    <router-view v-if="this.$route.path === '/' || this.$route.path === '/login'"></router-view>
    <router-view v-else class="sidebar"></router-view>

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
  html,body,.sidebar{
    height:100%!important;
  }
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
