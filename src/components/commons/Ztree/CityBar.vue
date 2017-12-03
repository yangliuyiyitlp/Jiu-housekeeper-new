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
//          label: '运维车辆干涉明细',
//          name: 'city.bike.intervene.list'
//        }, {
//          label: '公司信息管理',
//          name: 'city.company.info'
//        }, {
//          label: '运营人员管理',
//          name: 'city.operator'
//        }, {
//          label: '远程升级',
//          name: 'city.remote'
//        }, {
//          label: '小区域管理',
//          name: 'city.range'
//        }, {
//          label: '点位管理',
//          name: 'city.point'
//        }, {
//          label: '区域统计报表',
//          name: 'city.area.total'
//        }, {
//          label: '城市黑名单',
//          name: 'city.blacklist'
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
        if (key === 'city') {
          this.data = this.menus[key]
        }
      }
    },
    methods: {
      handleNodeClick (data) {
        console.log(data)
        bus.$emit('citybar', data.name)
      }
    }
  }
</script>


<style scoped>
  html,body,.sidebar{
    height:100%!important;
  }
</style>
