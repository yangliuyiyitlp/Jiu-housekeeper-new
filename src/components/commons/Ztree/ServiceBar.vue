<template>
  <div>
    <el-tree :data="data" :props="defaultProps" accordion highlight-current @node-click="handleNodeClick">
    </el-tree>
  </div>
</template>
<script>
export default {
  data () {
    return {
      data: [{
        label: '信用积分变更明细',
        name: 'service.change.credit'
      }, {
        label: '会员手机变更工单',
        name: 'service.change.phone'
      }, {
        label: '用户反馈管理',
        name: 'service.feedback'
      }, {
        label: '用户违规工单',
        name: 'service.violation'
      }, {
        label: '运维反馈工单',
        name: 'service.operation'

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
      this.$router.push({
        name: data.name
      })
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

