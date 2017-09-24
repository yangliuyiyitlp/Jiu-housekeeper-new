<template>
  <div>
    <vip-bar></vip-bar>
    <router-view></router-view>
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
        console.log(this.bar)
        this.$router.push({
          name: this.bar
        })
      })
    }
  }
</script>

<style scoped>
  .right {
    margin-left: 270px;
  }
</style>
