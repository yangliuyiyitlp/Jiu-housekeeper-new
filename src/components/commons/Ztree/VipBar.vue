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
//        data: [{
//          label: '会员信息',
//          name: 'vip.info'
//        }, {
//          label: '会员邀请明细',
//          name: 'vip.invite.list'
//        }, {
//          label: '会员邀请统计',
//          name: 'vip.invite.total'
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
        if (key === 'vip') {
          this.data = this.menus[key]
        }
      }
    },
    methods: {
      handleNodeClick (data) {
        console.log(data)
        bus.$emit('vipbar', data.name)
      }
    }
  }
</script>
<style scoped>
  html,body,.sidebar{
    height:100%!important;
  }
</style>
