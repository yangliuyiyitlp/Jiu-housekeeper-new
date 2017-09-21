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
          label: '内容管理',
          children: [{
            label: '内容发布'
          }, {
            label: '评论管理'
          }, {
            label: '公共留言'
          }]
        }, {
          label: '统计分析',
          children: [{
            label: '信息量统计'
          }]
        }, {
          label: '栏目设置',
          children: [{
            label: '栏目管理'
          }, {
            label: '站点设置'
          }, {
            label: '切换站点'
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

