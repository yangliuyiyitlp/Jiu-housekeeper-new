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
          label: '操作明细',
          children: [{
            label: '会员审核明细'
          }, {
            label: '手工还车明细'
          }]
        }, {
          label: '借还车明细',
          children: [{
            label: '交易记录'
          }, {
            label: '当日交易记录'
          }, {
            label: '换电池明细'
          }, {
            label: '充值提现明细'
          }]
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

