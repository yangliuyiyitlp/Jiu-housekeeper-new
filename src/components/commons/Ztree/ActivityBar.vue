<template>
  <div>
    <el-tree :data="data" :props="defaultProps" accordion highlight-current node-key="id" :default-expanded-keys="[5]" :default-checked-keys="[6]" @node-click="handleNodeClick">
    </el-tree>
  </div>
</template>
<script>
export default {
  data () {
    return {
      data: [{
        id: 1,
        label: '消息推送组',
        name: 'activity.message'
      }, {
        id: 2,
        label: '消息推送计划',
        name: 'activity.message.plan'

      }, {
        id: 3,
        label: '赳赳乐享',
        name: 'activity.enjoy'
      }, {
        id: 4,
        label: 'APP展示页配置',
        name: 'activity.config'
      }, {
        id: 5,
        label: '家乐福活动',
        children: [{
          id: 6,
          label: '优惠券明细',
          name: 'activity.coupon'
        }, {
          id: 7,
          label: '活动邀请明细',
          name: 'activity.invite.detail'
        }, {
          id: 8,
          label: '优惠券领取明细',
          name: 'activity.coupon.receive'
        }, {
          id: 9,
          label: '活动邀请统计',
          name: 'activity.invite.list'
        }]
      }, {
        id: 10,
        label: '僵尸车活动',
        children: [{
          id: 11,
          label: '车辆图标配置',
          name: 'activity.config.icon'
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

