<template>
  <div>
    <!--栏目树组件-->
    <tree-grid
      :defaultExpandAll="true"
      :columns="columns"
      :tree-structure="true"
      :requestUrl="requestUrl"
      :data-source="select_organization">

    </tree-grid>
  </div>
</template>

<script>
  import TreeGrid from '../../components/commons/Ztree/TreeGrid.vue'
  // arr2tree引入
  import arr2tree from '../../utils/arr2tree.js'
  //  import baseUrl from '../../utils/baseUrl'
  import bus from '@/assets/js/eventBus.js'

  export default {
    components: {
      TreeGrid
    },
    data () {
      return {
        // 栏目树组件
        select_organization: [],
        // 所需要展示的条目
        columns: [
          {
            text: '栏目名称',
            dataIndex: 'name'
          },
          {
            text: '栏目模型',
            dataIndex: 'module'
          },
          {
            text: '排序',
            dataIndex: 'sort'
          },
          {
            text: '导航菜单',
            dataIndex: 'inMenuName'
          },
          {
            text: '栏目列表',
            dataIndex: 'inListName'
          },
          {
            text: '展示方式',
            dataIndex: 'showModes'
          }
        ],
        // 增删改查请求地址
        requestUrl: `column`
      }
    },
    created () {
      this.query()
    },
    mounted () {
      // 编辑
      bus.$on('updateBtn', (id) => {
        this.$router.push({
          name: 'content.column.update', query: {id: id}
        })
      })
      // 删除
      bus.$on('delBtn', (id) => {
//        console.log(id)
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        })
          .then(() => {
            this.$ajax.get(`content/column/deleteColumn/${id}`)
              .then(res => {
                if (res.status === 200) {
                  console.log(1)
                  // 删除成功
                  this.open('success', res.data.msg)
                  // 刷新页面
                  this.query()
                } else {
                  // 删除失败
                  this.open('info', res.data.msg)
                }
              })
          })
          .catch(() => {
            this.open('info', '已取消删除')
          })
      })
      // 添加下一级
      bus.$on('addBtn', (parentIds, id) => {
        console.log(parentIds, id)
        this.$router.push({
          name: 'content.column.new', query: {parentIds: parentIds, id: id}
        })
      })
    },
    methods: {
//       请求数据
      query () {
        // 请求栏目列表
        this.$ajax.get('content/column/getcategorys')
          .then(res => {
            console.log(res.data)
            if (res.data.code === 200) {
              open('success', res.data.msg)
              console.log(res.data.data)
              let arr = res.data.data
              for (let i = 0; i < arr.length; i++) {
                // 是否在导航中显示
                if (arr[i].inMenu === '1') {
                  arr[i].inMenuName = '显示'
                } else {
                  arr[i].inMenuName = '隐藏'
                }
                // 是否在分类页中显示列表
                if (arr[i].inList === '1') {
                  arr[i].inListName = '显示'
                } else {
                  arr[i].inListName = '隐藏'
                }
              }
              this.select_organization = arr2tree.getTree(arr, '1')
            } else {
              open('info', res.data.msg)
            }
          })
          .catch(err => {
            console.error(err)
          })
      },
      // 显示的提示设置
      open (type, msg) {
        // 提示信息
        this.$message({
          type: type,
          message: msg
        })
      }
    }
  }
</script>

<style scoped>

</style>
