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
          label: '消息推送组'
        }, {
          label: '消息推送计划'
        }, {
          label: '赳赳乐享'
        }, {
          label: 'APP展示页配置'
        }, {
          label: '家乐福活动',
          children: [{
            label: '优惠券明细'
          }, {
            label: '活动邀请明细'
          }, {
            label: '优惠券领取明细'
          }, {
            label: '活动邀请统计'
          }]
        }, {
          label: '僵尸车活动',
          children: [{
            label: '车辆图标配置'
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

