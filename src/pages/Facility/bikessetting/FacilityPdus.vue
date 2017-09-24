<template>
  <div>
    <tabs></tabs>
    <el-table
      :data="tableData4"
      border
      style="width: 100%">
      <el-table-column
        prop="countname"
        label="账号"
        width="120">
      </el-table-column>
      <el-table-column
        prop="name"
        label="厂家名称"
        width="120">
      </el-table-column>
      <el-table-column
        prop="number"
        label="锁厂家编号"
        width="120">
      </el-table-column>
      <el-table-column
        prop="state"
        label="登录状态"
        width="120">
      </el-table-column>
      <el-table-column
        prop="date"
        label="添加时间"
        width="300">
      </el-table-column>
      <el-table-column
        label="操作"
        width="100">
        <template scope="scope">
          <el-button @click="updateClick" type="text" size="small">编辑</el-button>
          <el-button @click.native.prevent="deleteRow(scope.$index, tableData4)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <model :list='selectedlist' :isactive="isActive" v-cloak @change="changeOverlay" @modify="modify"></model>
  </div>
</template>

<script>
  import Tabs from '../Tabs.vue'
  export default {
    methods: {
      updateClick () {
        console.log(1)
      },
      deleteRow (index, rows) {
        rows.splice(index, 1)
      }
    },
    components: {
      Tabs
    },
    data () {
      return {
        tableData4: [{
          countname: '张宇',
          name: '无连锁',
          number: 'w2233',
          state: '是',
          date: '2016-05-03'
        }, {
          countname: '张三',
          name: '无连锁',
          number: 'w2233',
          state: '是',
          date: '2016-05-03'
        }, {
          countname: '李四',
          name: '无连锁',
          number: 'w2233',
          state: '是',
          date: '2016-05-03'
        }, {
          countname: '王五',
          name: '无连锁',
          number: 'w2233',
          state: '是',
          date: '2016-05-03'
        }]
      }
    }
  }
</script>
