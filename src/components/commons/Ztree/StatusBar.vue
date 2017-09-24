<template>
  <div>
    <el-tree
      :data="data"
      :props="defaultProps"
      accordion
      highlight-current
      @node-click="handleNodeClick">
    </el-tree>
  </div>
</template>
<script>
  import bus from '@/assets/js/eventBus.js'
  
  export default {
    data () {
      return {
        data: [{
          label: '自行车地图监控',
          name: 'status.bike.map'
        }, {
          label: '热力图',
          name: 'status.heatchart'
        }, {
          label: '行政区状态监控',
          name: 'status.government'
        }, {
          label: '城市状态监控',
          name: 'status.city'
        }, {
          label: '车辆区域热力图',
          name: 'status.bike.area'
        }],
        defaultProps: {
          children: 'children',
          label:
            'label'
        }
      }
    },
    methods: {
      handleNodeClick (data) {
        console.log(data)
        bus.$emit('statusbar', data.name)
      }
    }
  }
</script>


<style scoped>
  div {
    width: 250px;
    float: left;
  }
</style>

