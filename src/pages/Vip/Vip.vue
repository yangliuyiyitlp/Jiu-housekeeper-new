<template>
  <div>
    <el-row class="sidebar">
      <el-col :span="3"class="sidebar">
        <vip-bar></vip-bar>
      </el-col>
      <el-col :span="21">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import VipBar from '@/components/commons/Ztree/VipBar.vue'
  import bus from '@/assets/js/eventBus.js'
  export default {
    data () {
      return {
        bar: ''
      }
    },
    components: {
      VipBar
    },
    mounted () {
      bus.$on('vipbar', (bar) => {
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
