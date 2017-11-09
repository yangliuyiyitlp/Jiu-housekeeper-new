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
        ],
        dataSource: [
          {
            id: 1,
            parentId: 0,
            name: '测试1',
            age: 18,
            sex: '男',
            children: [
              {
                id: 2,
                parentId: 1,
                name: '测试2',
                age: 22,
                sex: '男'
              }
            ]
          },
          {
            id: 3,
            parentId: 0,
            name: '测试3',
            age: 23,
            sex: '女',
            children: [
              {
                id: 4,
                parentId: 3,
                name: '测试4',
                age: 22,
                sex: '男'
              },
              {
                id: 5,
                parentId: 3,
                name: '测试5',
                age: 25,
                sex: '男'
              },
              {
                id: 6,
                parentId: 3,
                name: '测试6',
                age: 26,
                sex: '女',
                children: [
                  {
                    id: 7,
                    parentId: 6,
                    name: '测试7',
                    age: 27,
                    sex: '男'
                  }
                ]
              }
            ]
          },
          {
            id: 18,
            parentId: 0,
            name: '测试8',
            age: 18,
            sex: '男'
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
