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
//          label: '内容管理',
//          children: [{
//            label: '内容发布',
//            name: 'content.release'
//          }, {
//            label: '评论管理',
//            name: 'content.comment'
//          }, {
//            label: '公共留言',
//            name: 'content.public.message'
//          }]
//        }, {
//          label: '统计分析',
//          children: [{
//            label: '信息量统计',
//            name: 'content.information.total'
//          }]
//        }, {
//          label: '栏目设置',
//          children: [{
//            label: '栏目管理',
//            name: 'content.column'
//          }, {
//            label: '站点设置',
//            name: 'content.site.setting'
//          }, {
//            label: '切换站点',
//            name: 'content.site.switch'
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
        if (key === 'content') {
          this.data = this.menus[key]
        }
      }
    },
    methods: {
      handleNodeClick (data) {
        console.log(data)
        bus.$emit('contentbar', data.name)
      }
    }
  }
</script>

<style scoped>
  html,body,.sidebar{
    height:100%!important;
  }
</style>

