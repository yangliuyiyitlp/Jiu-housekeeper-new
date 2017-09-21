<template>
  <div>
    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        data: [{
          label: '会员信息'
        }, {
          label: '会员邀请明细'
        }, {
          label: '会员邀请统计'
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
