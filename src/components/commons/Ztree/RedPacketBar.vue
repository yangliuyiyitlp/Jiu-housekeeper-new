<template>
  <div>
    <el-tree
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
        bus.$emit('redpacketbar', data.name)
      }
    }
  }
</script>


<style scoped>

</style>

