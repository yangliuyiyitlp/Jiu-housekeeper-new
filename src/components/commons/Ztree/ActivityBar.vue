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
//        data: [{
//          id: 1,
//          label: '消息推送组',
//          name: 'activity.message'
//        }, {
//          id: 2,
//          label: '短信推送',
//          name: 'activity.message.push'
//        }, {
//          id: 3,
//          label: '消息推送计划',
//          name: 'activity.message.plan'
//        }, {
//          id: 17,
//          label: '每月活动',
//          children: [{
//            id: 18,
//            label: '名流健康',
//            name: 'activity.health'
//          }, {
//            id: 19,
//            label: '红包雨',
//            name: 'activity.red.rain'
//          }]
//        }, {
//          id: 4,
//          label: '赳赳乐享',
//          name: 'activity.enjoy'
//        }, {
//          id: 5,
//          label: 'APP展示页配置',
//          name: 'activity.config'
//        }, {
//          id: 6,
//          label: '家乐福活动',
//          children: [{
//            id: 7,
//            label: '优惠券明细',
//            name: 'activity.coupon'
//          }, {
//            id: 8,
//            label: '活动邀请明细',
//            name: 'activity.invite.detail'
//          }, {
//            id: 9,
//            label: '优惠券领取明细',
//            name: 'activity.coupon.receive'
//          }, {
//            id: 10,
//            label: '活动邀请统计',
//            name: 'activity.invite.list'
//          }]
//        }, {
//          id: 11,
//          label: '僵尸车活动',
//          children: [{
//            id: 12,
//            label: '车辆图标配置',
//            name: 'activity.config.icon'
//          }]
//        }, {
//          id: 13,
//          label: '广告中心',
//          children: [{
//            id: 14,
//            label: 'inmobi广告配置',
//            name: 'activity.inmobi'
//          }]
//        }, {
//          id: 15,
//          label: '优惠券配置',
//          children: [{
//            id: 16,
//            label: '优惠券获取明细',
//            name: 'activity.coupon.details'
//          }]
//        }],
        data: [],
        defaultProps: {
          children: 'children',
          label:
            'label'
        }
      }
    },
    mounted () {
      let menu = sessionStorage.getItem('menus')
      this.menus = JSON.parse(menu)
      for (let key in this.menus) {
        if (key === 'activity') {
          this.data = this.menus[key]
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
html,body,.sidebar{
  height:100%!important;
}
</style>

