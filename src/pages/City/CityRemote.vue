<template>
  <div class="count">
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <el-tab-pane label="远程升级明细表" name="first">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="版本号：">
            <el-input v-model="formInline.user" ></el-input>
          </el-form-item>
          <el-form-item label="所属区域：">
            <!--数模型-->
            <el-input
              icon="search"
              v-model="formInline.search"
              :on-icon-click="handleIconClick" @click="dialogVisible = true">
            </el-input>
          </el-form-item>
          <el-form-item label="操作员：">
            <el-input v-model="formInline.nub" ></el-input>
          </el-form-item>
          <el-button type="primary" @click="onSubmit('condition')">查询</el-button>
          <el-button type="primary" @click="onExport">导出</el-button>
        </el-form>
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="admin"
            label="版本号">
          </el-table-column>
          <el-table-column
            prop="adminphone"
            label="所属区域">
          </el-table-column>
          <el-table-column
            prop="adminphone"
            label="更新类型">
          </el-table-column>
          <el-table-column
            prop="city"
            label="操作员">
          </el-table-column>
          <el-table-column
            prop="city"
            label="操作时间">
          </el-table-column>
          <el-table-column
            prop="city"
            label="备注">
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

      </el-tab-pane>
      <el-tab-pane label="远程升级明细表添加" name="second">配置管理</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        activeName2: 'first',
        value6: '',
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
    created: function () {
      this.onSubmit('condition')
    },
    methods: {
      handleClick (tab, event) {
        console.log(tab, event)
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
  }
</script>
<style scoped>
  .count {
    margin-left: 250px;
  }

</style>
