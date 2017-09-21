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
          label: '机构用户',
          children: [{
            label: '用户管理'
          }, {
            label: '机构管理'
          }, {
            label: '区域管理'
          }]
        }, {
          label: '系统设置',
          children: [{
            label: '菜单管理'
          }, {
            label: '角色管理'
          }, {
            label: '字典管理'
          }]
        }, {
          label: '日志查询',
          children: [{
            label: '日志查询'
          }, {
            label: '连接池监视'
          }]
        }, {
          label: '关于帮助'
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

