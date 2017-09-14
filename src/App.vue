<template>
  <div id="app">
    <main-nav></main-nav>
    <router-view></router-view>
  </div>
</template>

<script>
  import MainNav from '@/components/MainNav.vue'

  export default {
    name: 'app',
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
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
