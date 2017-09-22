<template>
  <div>
    <el-tree
      :data="data"
      :props="defaultProps"
      accordion
      highlight-current
      node-key="id"
      :default-expanded-keys="[5]"
      :default-checked-keys="[6]"
      @node-click="handleNodeClick">
    </el-tree>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        data: [{
          id: 1,
          label: '消息推送组'
        }, {
          id: 2,
          label: '消息推送计划'
        }, {
          id: 3,
          label: '赳赳乐享'
        }, {
          id: 4,
          label: 'APP展示页配置'
        }, {
          id: 5,
          label: '家乐福活动',
          children: [{
            id: 6,
            label: '优惠券明细'
          }, {
            id: 7,
            label: '活动邀请明细'
          }, {
            id: 8,
            label: '优惠券领取明细'
          }, {
            id: 9,
            label: '活动邀请统计'
          }]
        }, {
          id: 10,
          label: '僵尸车活动',
          children: [{
            id: 11,
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

