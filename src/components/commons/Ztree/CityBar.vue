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
          label: '公司信息管理'
        }, {
          label: '运营人员管理'
        }, {
          label: '远程升级'
        }, {
          label: '小区域管理'
        }, {
          label: '点位管理'
        }, {
          label: '区域统计报表'
        }, {
          label: '城市黑名单'
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
