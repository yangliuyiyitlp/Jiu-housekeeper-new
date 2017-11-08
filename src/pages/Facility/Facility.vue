<template>
  <div>
    <el-row class="sidebar">
      <el-col :span="3" class="sidebar">
        <facility-bar></facility-bar>
      </el-col>
      <el-col :span="21">
        <router-view></router-view>
      </el-col>
    </el-row>
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
  html,body,.sidebar{
    height:100%!important;
  }
</style>
