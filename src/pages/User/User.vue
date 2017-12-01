<template>
  <div>
    <el-row class="sidebar">
      <el-col :span="3" class="sidebar">
        <user-bar></user-bar>
      </el-col>
      <el-col :span="21">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import UserBar from '@/components/commons/Ztree/UserBar.vue'
  import bus from '@/assets/js/eventBus.js'
  export default {
    data () {
      return {
        bar: ''
      }
    },
    components: {
      UserBar
    },
    mounted () {
      bus.$on('userbar', (bar) => {
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

