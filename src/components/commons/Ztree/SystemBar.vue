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
        label: '机构用户',
        children: [{
          label: '用户管理',
          name: 'setting.user'
        }, {
          label: '机构管理',
          name: 'setting.mechanism'
        }, {
          label: '区域管理',
          name: 'setting.area'
        }]
      }, {
        label: '系统设置',
        children: [{
          label: '菜单管理',
          name: 'setting.menu'
        }, {
          label: '角色管理',
          name: 'setting.role'
        }, {
          label: '字典管理',
          name: 'setting.dictionary'
        }]
      }, {
        label: '日志查询',
        children: [{
          label: '日志查询',
          name: 'setting.daily'
        }, {
          label: '连接池监视',
          name: 'setting.connect.control'
        }]
      }, {
        label: '关于帮助',
        name: 'setting.about'
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
  width: 250px;
  float: left;
}
</style>

