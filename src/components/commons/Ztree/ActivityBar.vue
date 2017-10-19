<template>
  <div>
    <el-tree
      :data="data"
      :props="defaultProps"
      highlight-current
      default-expand-all
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
        }, {
          id: 12,
          label: '广告中心',
          children: [{
            id: 13,
            label: 'inmobi广告配置',
            name: 'activity.inmobi'
          }]
        }, {
          id: 14,
          label: '饿了么活动',
          children: [{
            id: 15,
            label: '饿了么活动',
            name: 'activity.ele.manage.coupon'
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
        bus.$emit('activitybar', data.name)
      }
    }
  }
</script>


<style scoped>

</style>

