<template>
  <div class="mypanel">
    <div class="side">
      <el-tree
        :data="getdata"
        :props="defaultProps"
        accordion
        @node-click="handleNodeClick">
      </el-tree>
    </div>
    <mypanel-content></mypanel-content>
  </div>
</template>
<script>
  import MypanelContent from '@/components/Mypanel/Mypanel_content.vue'

  export default {
    data () {
      return {
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    methods: {
      handleNodeClick (data) {
        console.log(data)
      }
    },
    computed: {
      getdata () {
        if (this.$route.query.module === 'userinfo') {
          return [{
            label: '个人信息'
          }, {
            label: '修改密码'
          }]
        } else if (this.$route.query.module === 'mypanel') {
          return [{
            label: '一级 1',
            children: [{
              label: '二级 1-1',
              children: [{
                label: '三级 1-1-1'
              }]
            }]
          }, {
            label: '一级 2',
            children: [{
              label: '二级 2-1',
              children: [{
                label: '三级 2-1-1'
              }]
            }, {
              label: '二级 2-2',
              children: [{
                label: '三级 2-2-1'
              }]
            }]
          }, {
            label: '一级 3',
            children: [{
              label: '二级 3-1',
              children: [{
                label: '三级 3-1-1'
              }]
            }, {
              label: '二级 3-2',
              children: [{
                label: '三级 3-2-1'
              }]
            }]
          }]
        }
      }
    },
    components: {
      MypanelContent: MypanelContent
    }
  }
</script>
<style scoped>
  .mypanel {
    height: 100%;
  }

  .side {
    width: 200px;
    height: 100% !important;
    float: left;
  }


</style>
