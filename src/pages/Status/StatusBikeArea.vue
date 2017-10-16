<template>
  <div>
    <h1>bike</h1>
    <baidu-map class="bm-view" :center="center" :zoom="zoom" @ready="handler"></baidu-map>
    <!--<baidu-map class="bm-view">-->
    <!--</baidu-map>-->
  </div>
</template>

<script>
  export default {
    data () {
      return {
        center: {lng: 0, lat: 0},
        zoom: 3
      }
    },
    methods: {
      handler ({BMap, map}) {
        console.log(BMap, map)
        this.center.lng = 116.404
        this.center.lat = 39.915
        this.zoom = 15
      }
    }
  }
</script>

<style scoped>
  .bm-view {
    width: 100%;
    height: 800px;
  }
</style>
