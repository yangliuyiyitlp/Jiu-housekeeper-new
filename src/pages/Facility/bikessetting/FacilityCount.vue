<template>
  <div class="count">
    <el-form :inline="true" :model="formInline"style="padding-left:10px;" class="demo-form-inline">
      <el-form-item label="管理员：">
        <el-input v-model="formInline.user" ></el-input>
      </el-form-item>
      <el-form-item label="管理员手机：">
        <el-input v-model="formInline.photo" ></el-input>
      </el-form-item>
      <el-form-item label="注册总数：">
        <el-input v-model="formInline.sum" ></el-input>
      </el-form-item>
      <el-form-item label="注册日期：">
            <el-date-picker
              v-model="value6"
              type="daterange">
            </el-date-picker>
      </el-form-item>
      <el-button type="primary"  @click="onSubmit('condition')">查询</el-button>
      <el-button type="primary" @click="onExport">导出</el-button>
    </el-form>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="admin"
        label="管理人员">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="管理员手机">
      </el-table-column>
      <el-table-column
        prop="sum"
        label="注册总数">
      </el-table-column>
      <el-table-column
        prop="date"
        label="注册日期">
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
        formInline: {
          user: '',
          photo: '',
          sum: '',
          pageSize: 10,
          index: 1
        },
        tableData: [{
          admin: '0008',
          photo: '12345678999',
          date: '01',
          sum: '0'
        }, {
          admin: '0008',
          photo: '123456666678',
          date: '01',
          sum: '0'
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
      onExport () {
        console.log('onexport!')
      }
    }
  }
</script>
<style scoped>
  .count {
    margin-left: 250px;
  }


</style>
