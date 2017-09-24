<template>
  <div>
    <facility-bar></facility-bar>
    <!--<table-info></table-info>-->
    <!--<tabs></tabs>-->
    <router-view></router-view>
  </div>
</template>

<script>
  import FacilityBar from '@/components/commons/Ztree/FacilityBar.vue'
//  import Tabs from '@/pages/Facility/Tabs.vue'
  import Connector from '../../assets/js/connector.js' // 引入连接对象
  export default {
    data () {
      return {
        bar: ''
      }
    },
    components: {
      FacilityBar
//      Tabs
    },
    mounted () {
      Connector.$on('call', (bar) => {
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
