<template>
  <div>
    <el-row class="sidebar">
      <el-col :span="3" class="sidebar" >
        <report-bar></report-bar>
      </el-col>
      <el-col :span="21">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import ReportBar from '@/components/commons/Ztree/ReportBar.vue'
  import bus from '@/assets/js/eventBus.js'

  export default {
    data () {
      return {}
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
  html,body,.sidebar{
    height:100%!important;
  }
</style>
