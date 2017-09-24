<template>
  <div>
    <packet-bar></packet-bar>
    <router-view></router-view>
  </div>
</template>

<script>
  import PacketBar from '@/components/commons/Ztree/RedPacketBar.vue'
  import bus from '@/assets/js/eventBus.js'
  export default {
    data () {
      return {
        bar: ''
      }
    },
    components: {
      PacketBar
    },
    mounted () {
      bus.$on('redpacketbar', (bar) => {
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
