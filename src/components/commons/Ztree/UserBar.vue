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
          label: '个人信息',
          name: 'user.info'
        }, {
          label: '修改密码',
          name: 'user.pwd'
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
        bus.$emit('userbar', data.name)
      }
    }
  }
</script>


<style scoped>

</style>

