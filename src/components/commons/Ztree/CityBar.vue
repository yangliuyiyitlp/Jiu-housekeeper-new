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
  import bus from '@/assets/js/eventBus.js'
  
  export default {
    data () {
      return {
        data: [{
          label: '公司信息管理',
          name: 'city.company.info'
        }, {
          label: '运营人员管理',
          name: 'city.operator'
        }, {
          label: '远程升级',
          name: 'city.remote'
        }, {
          label: '小区域管理',
          name: 'city.range'
        }, {
          label: '点位管理',
          name: 'city.point'
        }, {
          label: '区域统计报表',
          name: 'city.area.total'
        }, {
          label: '城市黑名单',
          name: 'city.blacklist'
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
        bus.$emit('citybar', data.name)
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
