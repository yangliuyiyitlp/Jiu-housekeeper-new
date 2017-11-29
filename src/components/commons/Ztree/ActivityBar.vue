<template>
  <div class="sidebar">
    <el-tree
      class="sidebar"
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
        data: [
          {
            label: '消息推送组',
            name: 'activity.message'
          }, {
            label: '短信推送',
            name: 'activity.message.push'
          }, {
            label: '消息推送计划',
            name: 'activity.message.plan'
          }, {
            label: '每月活动',
            children: [{
              label: '名流健康',
              name: 'activity.health'
            }, {
              label: '红包雨',
              name: 'activity.red.rain'
            }]
          }, {
            label: '赳赳乐享',
            name: 'activity.enjoy'
          }, {
            label: 'APP展示页配置',
            name: 'activity.config'
          }, {
            label: '家乐福活动',
            children: [{
              label: '优惠券明细',
              name: 'activity.coupon'
            }, {
              label: '活动邀请明细',
              name: 'activity.invite.detail'
            }, {
              label: '优惠券领取明细',
              name: 'activity.coupon.receive'
            }, {
              label: '活动邀请统计',
              name: 'activity.invite.list'
            }]
          }, {
            label: '僵尸车活动',
            children: [{
              label: '车辆图标配置',
              name: 'activity.config.icon'
            }]
          }, {
            label: '广告中心',
            children: [{
              label: 'inmobi广告配置',
              name: 'activity.inmobi'
            }]
          }, {
            label: '优惠券配置',
            children: [{
              label: '优惠券获取明细',
              name: 'activity.coupon.details'
            }]
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
        bus.$emit('activitybar', data.name)
      }
    }
  }
</script>


<style scoped>
  html, body, .sidebar {
    height: 100% !important;
  }
</style>

