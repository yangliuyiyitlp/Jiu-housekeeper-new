<template>
  <div class="sidebar">
    <el-tree
      class="sidebar"
      :data="data"
      :props="defaultProps"
      default-expand-all
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
        data: [
          {
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
          }
        ],
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
        bus.$emit('servicebar', data.name)
      }
    }
  }
</script>


<style scoped>
  html, body, .sidebar {
    height: 100% !important;
  }
</style>

