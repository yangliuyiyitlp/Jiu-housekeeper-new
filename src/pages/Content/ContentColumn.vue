<template>
  <div>
    <!--栏目树组件-->
    <tree-grid
      :defaultExpandAll="true"
      :columns="columns"
      :tree-structure="true"
      :data-source="select_organization">

    </tree-grid>
  </div>
</template>

<script>
  import TreeGrid from '../../components/commons/Ztree/TreeGrid.vue'
  // arr2tree引入
  import arr2tree from '../../utils/arr2tree.js'

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
            text: '归属机构',
            dataIndex: 'officeId'
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
        ]
      }
    },
    created () {
      this.query()
    },
    methods: {
//       请求数据
      query () {
        // 请求栏目列表
        this.$ajax.get('http://localhost:3000/content/column/getcategorys')
          .then(res => {
            console.log(res.data)
            if (res.data.code === 200) {
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
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  }
</script>

<style scoped>

</style>
