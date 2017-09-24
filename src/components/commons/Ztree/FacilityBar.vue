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
  import Connector from '../../../assets/js/connector.js' // 引入连接对象
  export default {
    data () {
      return {
        data: [{
          label: '锁厂人员注册',
          name: 'tabs'
        }, {
          label: '共享单车设备',
          children: [{
            label: '自行车信息表',
            name: 'info'
          }, {
            label: '车辆注册统计',
            name: 'count'
          }, {
            label: '车辆注册明细',
            name: 'detailed'
          }, {
            label: '锁状态明细表',
            name: 'state'
          }]
        }, {
          label: '锁厂登记表',
          name: 'register'
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
        Connector.$emit('call', data.name)
      }
    }
  }
</script>



<style scoped>
  div {
    width: 200px;
    float: left;
  }
</style>

