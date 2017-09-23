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
        label: '会员信息',
        name: 'vip.info'
      }, {
        label: '会员邀请明细',
        name: 'vip.invite.list'
      }, {
        label: '会员邀请统计',
        name: 'vip.invite.total'
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
