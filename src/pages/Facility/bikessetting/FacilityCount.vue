<template>
  <div class="count">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="管理员：">
        <el-input v-model="formInline.user"></el-input>
      </el-form-item>
      <el-form-item label="管理员手机：">
        <el-input v-model="formInline.photo"></el-input>
      </el-form-item>
      <el-form-item label="注册总数：">
        <el-input v-model="formInline.sum"></el-input>
      </el-form-item>
      <el-form-item label="注册日期">
        <el-date-picker
          v-model="formInline.beginAddTime"
          type="datetime"
          placeholder="开始时间">
        </el-date-picker>
        <el-date-picker
          v-model="formInline.endAddTime"
          type="datetime"
          placeholder="结束时间">
        </el-date-picker>
      </el-form-item>
      <el-button v-if="hasPermission('view')" type="primary" @click="query">查询</el-button>
      <el-button v-if="hasPermission('outPort')" type="primary" @click="exportFile">导出</el-button>
    </el-form>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="id">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="admin"
        label="管理人员">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="phone"
        label="管理员手机">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="sum"
        label="注册总数">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
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
    <!--导出弹框-->
    <el-dialog title="导出" custom-class="dialogClass" size="tiny" :visible.sync="exportFormVisible" :show-close="false"
               :close-on-press-escape="false"
               :close-on-click-modal="false" class="demo-ruleForm ">
      <el-button @click="exportCurrent">导出当前页</el-button>
      <el-button @click="exportAll">导出所有</el-button>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelExport">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import baseUrl from '../../../utils/baseUrl'
  export default {
    created: function () {
      this.query()
    },
    data () {
      return {
        value6: '',
        exportFormVisible: false,
        formInline: {
          user: '',
          photo: '',
          sum: '',
          beginAddTime: '',
          endAddTime: ''
        },
        exportParam: {
          user: '',
          photo: '',
          sum: '',
          beginAddTime: '',
          endAddTime: '',
          pageSize: 30,
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
        pagination: {pageSizes: [30, 40, 60, 100], pageSize: 30, total: 0, index: 1}
      }
    },
    methods: {
      hasPermission (data) {
        let permissionList = this.$route.meta.permission
        if (permissionList && permissionList.length && permissionList.includes(data)) {
          return true
        }
        return false
      },
      query () {
        this.exportParam.user = this.formInline.user
        this.exportParam.photo = this.formInline.photo
        this.exportParam.sum = this.formInline.sum
        this.exportParam.beginAddTime = this.formInline.beginAddTime
        this.exportParam.endAddTime = this.formInline.endAddTime
        this.exportParam.pageNo = this.formInline.pageNo
        this.exportParam.pageSize = this.formInline.pageSize
        this.$ajax.get('/facility/register', {params: this.requestParam})
          .then(response => {
            if (response.data.code === 0) {
              this.tableData = response.data.page.list
              this.pagination.count = response.data.page.count
            } else {
              this.$message({
                type: 'error',
                message: '获取列表信息失败'
              })
            }
          }).catch(() => {
            this.$message({
              type: 'error',
              message: '获取列表信息失败'
            })
          })
      },
      handleSizeChange: function (val) {
        this.formInline.pageSize = val
        this.query()
      },
      handleCurrentChange: function (val) {
        this.formInline.index = val
        this.query()
      },
      exportFile () {
        this.exportFormVisible = true
      },
      cancelExport () {
        this.exportFormVisible = false
      },
      exportCurrent () {
        var r = confirm('确定导出么')
        if (r === true) {
          this.exportParam.pageNo = this.pagination.pageNo
          this.exportParam.pageSize = this.pagination.pageSize
          this.$refs['FileForm'].setAttribute('action', `${baseUrl}/facility/register/export`)
          this.$refs['FileForm'].submit()
          this.exportFormVisible = false
        } else {
          return
        }
      },
      exportAll () {
        var r = confirm('确定导出么')
        if (r === true) {
          this.$refs['FileForm'].setAttribute('action', `${baseUrl}/facility/register/exportAll`)
          this.exportParam.pageSize = ''
          this.exportParam.pageNo = ''
          this.$refs['FileForm'].submit()
          this.exportFormVisible = false
        } else {
          return
        }
      }
    }
  }
</script>
<style scoped>
  .demo-form-inline {
    padding-left: 10px;
  }


</style>
