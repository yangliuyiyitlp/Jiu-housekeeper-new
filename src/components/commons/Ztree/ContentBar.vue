<template>
  <div>
    <el-tree :data="data" :props="defaultProps" accordion highlight-current @node-click="handleNodeClick">
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
          label: '内容发布',
          name: 'content.release'
        }, {
          label: '评论管理',
          name: 'content.comment'
        }, {
          label: '公共留言',
          name: 'content.public.message'
        }]
      }, {
        label: '统计分析',
        children: [{
          label: '信息量统计',
          name: 'content.information.total'
        }]
      }, {
        label: '栏目设置',
        children: [{
          label: '栏目管理',
          name: 'content.column'
        }, {
          label: '站点设置',
          name: 'content.site.setting'
        }, {
          label: '切换站点',
          name: 'content.site.switch'
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

