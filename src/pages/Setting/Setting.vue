<script src="../../../../../ximige-sniper-v5-master/sniper-v5/config/index.js"></script>
<template>
  <div>
    <!--<el-row :gutter="5">-->
      <!--<el-col :span="3">-->
        <!--<system-bar></system-bar>-->
      <!--</el-col>-->
      <!--<el-col :span="21">-->
        <router-view></router-view>
      <!--</el-col>-->
    <!--</el-row>-->
  </div>
</template>

<script>
  import SystemBar from '@/components/commons/Ztree/SystemBar.vue'
  import bus from '@/assets/js/eventBus.js'

  export default {
    data () {
      return {
        bar: ''
      }
    },
    components: {
      SystemBar
    },
    mounted () {
      bus.$on('settingbar', (bar) => {
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
