<template>
  <div>
    <facility-bar></facility-bar>
    <router-view></router-view>
  </div>
</template>

<script>
  import FacilityBar from '@/components/commons/Ztree/FacilityBar.vue'
  import Connector from '../../assets/js/eventBus.js' // 引入连接对象
  export default {
    data () {
      return {
        bar: ''
      }
    },
    components: {
      FacilityBar
    },
    mounted () {
      Connector.$on('call', (bar) => {
        this.bar = bar
        this.$router.push({
          name: this.bar
        })
      })
    }
  }
</script>

<style scoped>

</style>
