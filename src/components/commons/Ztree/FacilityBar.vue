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
  export default {
    data () {
      return {
        data: [{
          label: '锁厂人员注册'
        }, {
          label: '共享单车设备',
          children: [{
            label: '自行车信息表'
          }, {
            label: '车辆注册统计'
          }, {
            label: '车辆注册明细'
          }, {
            label: '锁状态明细表'
          }]
        }, {
          label: '锁厂登记表'
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
      }
    }
  }
</script>



<style scoped>
  div {
    width: 150px;
    float: left;
  }
</style>

