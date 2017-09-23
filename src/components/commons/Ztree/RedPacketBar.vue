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
        label: '红包点击记录明细',
        name: 'redpacket.click'
      }, {
        label: '红包参数配置',
        name: 'redpacket.config'
      }, {
        label: '红包提现明细',
        name: 'redpacket.cash'

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

