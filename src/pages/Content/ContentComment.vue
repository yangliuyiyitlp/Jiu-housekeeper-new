<template>
  <div class="detailed">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="文档标题：">
        <el-input v-model="formInline.nub" ></el-input>
      </el-form-item>
      <el-button type="primary" @click="onSubmit('condition')">查询</el-button>
      <el-form-item label="状态：">
        <el-radio-group v-model="radio2">
          <el-radio :label="3">发布</el-radio>
          <el-radio :label="6">审核</el-radio>
          <el-radio :label="9">删除</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="admin"
        label="评论内容">
      </el-table-column>
      <el-table-column
        prop="adminphone"
        label="文档标题">
      </el-table-column>
      <el-table-column
        prop="number"
        label="评论人">
      </el-table-column>
      <el-table-column
        prop="city"
        label="评论IP">
      </el-table-column>
      <el-table-column
        prop="city"
        label="评论时间">
      </el-table-column>
      <el-table-column
        prop="date"
        label="操作">
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagination.index"
      :page-sizes="pagination.pageSizes"
      :page-size="pagination.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total">
    </el-pagination>
  </div>
</template>
<script>
  export default {
    created: function () {
      this.onSubmit('condition')
    },
    data () {
      return {
        value6: '',
        radio2: 3,
        formInline: {
          user: '',
          photo: '',
          nub: '',
          pageSize: 10,
          index: 1
        },
        tableData: [{
          admin: '0008',
          adminphone: '12345678999',
          number: '0',
          city: '上海',
          date: '2017-09-12 10:28:35'
        }, {
          admin: '0008',
          adminphone: '12345678999',
          number: '0',
          city: '北京',
          date: '2017-09-12 10:28:35'
        }],
        pagination: {pageSizes: [10, 20, 50, 100], pageSize: 10, total: 0, index: 1}
      }
    },
    methods: {
      onSubmit: function (condition) {
        var param = {}
        if (condition === 'condition') {
          param = this.formInline
        } else {
          param = condition
        }
        console.log(param)
        this.$http.post('/dataGrid/query', JSON.stringify(param)).then(function (response) {
          this.tableData = response.data.list
          this.pagination.total = response.data.total
        }, function (err) {
          this.$message({
            type: 'info',
            message: '获取列表信息失败' + err.status
          })
        })
      },
      handleSizeChange: function (val) {
        this.formInline.pageSize = val
        this.onSubmit('condition')
      },
      handleCurrentChange: function (val) {
        this.formInline.index = val
        this.onSubmit('condition')
      },
      handleIconClick () {}
    }
  }
</script>
<style scoped>
  .demo-form-inline{
    padding-left:10px;
  }

</style>
