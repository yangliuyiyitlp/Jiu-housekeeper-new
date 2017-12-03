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
  import Connector from '../../../assets/js/eventBus.js' // 引入连接对象
  export default {
    data () {
      return {
//        data: [{
//          label: '锁厂人员注册',
//          name: 'tabs'
//        }, {
//          label: '共享单车设备',
//          children: [{
//            label: '自行车信息表',
//            name: 'info'
//          }, {
//            label: '车辆注册统计',
//            name: 'count'
//          }, {
//            label: '车辆注册明细',
//            name: 'detailed'
//          }, {
//            label: '锁状态明细表',
//            name: 'state'
//          }, {
//            label: '批量操作车辆',
//            name: 'unbund'
//          }]
//        }, {
//          label: '锁厂登记表',
//          name: 'register'
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
      console.log('this.menus' + this.menus)
      for (let key in this.menus) {
        if (key === 'facility') {
          this.data = this.menus[key]
        }
      }
    },
    methods: {
      handleNodeClick (data) {
        console.log(data)
        Connector.$emit('call', data.name)
      }
    }
  }
</script>


<style scoped>
  html, body, .sidebar {
    height: 100% !important;
  }
</style>

