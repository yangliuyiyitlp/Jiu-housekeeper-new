<template>
  　　
  <div id="div" :style="style"></div>
</template>
<script>
  import {MP} from '../../../utils/areaFencingMap.js'
  export default {
    data () {
      return {
        style: {
          width: '100%',
          height: this.height + 'px'
        }
      }
    },
    // 里面存放的也是数据，与data里面的数据不同的是，这里的数据是从其他地方得到的数据
    props: {
      height: {
        type: Number,
        default: 300
      },
      // 定义经度
      longitude: {},
      // 定义纬度
      latitude: {}
    },
    mounted () {
      this.$nextTick(function () {
        MP('IK5AlGXoZ23tDAGjldRalicbhdpsrKwE').then(BMap => {
          // 在此调用api
          let map = new BMap.Map('div')
          let point = new BMap.Point(this.longitude, this.latitude)
          map.centerAndZoom(point, 12)
          let marker = new BMap.Marker(point)// 创建标注
          map.addOverlay(marker)
        })
      })
    }
  }
</script>
