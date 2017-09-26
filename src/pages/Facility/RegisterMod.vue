<template>
  <div id="dataGrid">
    <el-form :inline="true" :model="requestParam" class="demo-form-inline">
      <el-form-item label="锁厂名称">
        <el-input v-model="requestParam.providerName" placeholder="锁厂名称"></el-input>
      </el-form-item>
      <!--<el-form-item label="锁厂编号">-->
      <!--<el-input v-model="requestParam.providerName" placeholder="锁厂编号"></el-input>-->
      <!--</el-form-item>-->
      <el-form-item label="锁厂编号">
        <el-input v-model="requestParam.providerNo" placeholder="锁厂编号"></el-input>
      </el-form-item>
      <el-form-item label="添加时间">
        <el-date-picker
          v-model="requestParam.selectedDate"
          type="daterange"
          clearable
          placeholder="选择日期范围">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="query('condition')">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">导出</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      border
      fit
      style="width: 100%">
      <el-table-column
        prop="id"
        label="序号">
      </el-table-column>
      // 返回的客户id
      <el-table-column
        prop="providerName"
        label="锁厂名称">
      </el-table-column>
      <el-table-column
        prop="providerNo"
        label="锁厂家编号	">
      </el-table-column>
      <!--<el-table-column-->
      <!--label="登录状态">-->
      <!--<template scope="scope">-->
      <!--<div v-if="scope.row.loginStatus==='true'">是</div>-->
      <!--<div v-else>否</div>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column
        label="添加时间">
        <template scope="scope">
          <el-icon name="time"></el-icon>
          <span style="margin-left: 10px">{{ scope.row.createTime |AddDate}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="operator"
        label="操作者	"> // 后台暂无数据
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注	"> // 后台暂无数据
      </el-table-column>
      <el-table-column
        label="操作">
        <template scope="scope">
          <el-button @click="modifyRecord(scope)" type="text" size="small">修改</el-button>
          <el-button @click="deleteRecord(scope.row.id)" type="text" size="small">删除</el-button>
        </template>
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
    <el-dialog title="添加/修改" :visible.sync="dialogFormVisible" :show-close="false" :close-on-press-escape="false"
               :close-on-click-modal="false" class="demo-ruleForm ">

      <el-form label-width="150px" :model="form" :rules="rules" ref="formA" class="tbody">
        <el-form-item label="厂家名称" prop="providerName" class="elform">
          <el-input v-model="form.providerName"></el-input>
        </el-form-item>
        <el-form-item label="锁厂家编号" prop="providerNo" class="elform" >
          <el-input v-model="form.providerNo" ></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark" class="elform">
          <el-input type="textarea" :row="3" v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelOperate">取 消</el-button>
        <el-button type="primary" @click="doModify('formA')" :loading="addLoading">确 定</el-button>
      </div>

    </el-dialog>
  </div>
</template>

<script>
  export default {
    created: function () {
      this.query('condition')
    },
    data: function () {
      return {
        tableData: [],
        dialogFormVisible: false,  // 模态框是否显示
        addLoading: false,       // 是否显示loading
        form: {
          providerName: '',
          providerNo: '',
          id: '',
          providerInfo: ''
        },
        formLabelWidth: '80px',
        requestParam: {selectedDate: null, providerName: '', providerNo: '', pageSize: 10, index: 1},
        rules: {
          providerName: [
            {required: true, message: '请输入厂家名称', trigger: 'blur'}
          ],
          providerNo: [
            {required: true, message: '请输入锁厂家编号', trigger: 'blur'}
          ]
        },
        pagination: {pageSizes: [10, 20, 50, 100], pageSize: 10, total: 0, index: 1}
      }
    },
    methods: {
      query: function (condition) {
        var param = {}
        if (condition === 'condition') {
          param = this.requestParam
        } else {
          param = condition
        }
        console.log(param)
        this.$http.post('/provider/query', JSON.stringify(param)).then(function (response) {
          this.tableData = response.data.list
          this.pagination.total = response.data.total
        }, function (err) {
          this.$message({
            type: 'info',
            message: '获取列表信息失败' + err.status
          })
        })
      },
      modifyRecord: function (scope) {
        this.dialogFormVisible = true
        this.form.id = scope.row.id
        this.form.providerName = scope.row.providerName
        this.form.providerNo = scope.row.providerNo
        this.form.operator = scope.row.operator
        this.form.remark = scope.row.remark
        console.log(this.form)
      },
      deleteRecord: function (id) {
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (id !== undefined) {
            // 调用后台服务
            // 删除元素
            this.$http.post('/provider/delete', {'id': id}).then(function (response) {
              if (response.data.code === '1') {
                // 删除成功
                this.$message({
                  type: 'success',
                  message: '删除成功'
                })
                // 刷新页面
                this.query(this.requestParam)
              } else {
                this.$message({
                  type: 'error',
                  message: '删除记录失败:' + response.data.msg
                })
              }
            }, function (err) {
              this.$message({
                type: 'info',
                message: '操作失败' + err.status
              })
            })
          }
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      doModify: function (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var url = ''
            if (this.form.id === undefined || this.form.id === '') {
              url = '/provider/add'
            } else {
              url = '/provider/modify'
            }
            this.dialogFormVisible = false
            this.$http.post(url, JSON.stringify(this.form)).then(function (response) {
              if (response.data.code === '1') {
                // 更新成功
                this.$message({
                  type: 'success',
                  message: '操作成功'
                })
                this.$refs['formA'].resetFields()
                // 刷新页面
                this.query(this.requestParam)
              } else {
                this.$message({
                  type: 'error',
                  message: '操作失败:' + response.data.msg
                })
              }
            }, function (err) {
              this.$message({
                type: 'info',
                message: '操作失败' + err.status
              })
            })
          } else {
            console.log('error submit!!')
            return
          }
        })
      },
      cancelOperate: function () {
        this.dialogFormVisible = false
        this.form = {
          providerName: '',
          providerNo: '',
          id: '',
          operator: '',
          remark: ''
        }
        this.$refs['formA'].resetFields()
      },
      handleSizeChange: function (val) {
        this.requestParam.pageSize = val
        this.query('condition')
      },
      handleCurrentChange: function (val) {
        this.requestParam.index = val
        this.query('condition')
      }
    }
  }
</script>
<style scoped>
  #dataGrid {
    margin-left: 250px;
  }

  form {
    padding-top: 20px;
    height: 75px;
  }

  .demo-ruleForm {
    font-size: 20px !important;
    text-align: center;
  }

  .module {
    height: 240px !important;
    width: 400px !important;
  }

  .tbody {
    height: 240px !important;
  }

  .elform {
    text-align: left !important;
  }

  .el-form-item__content {
    margin-left: 100px !important;
  }

  .el-dialog {
    width: 500px !important;
    height: 350px;
  }

  .cell {
    text-align: center;
  }

  .el-dialog {
    width: 20%;
  }

  .el-dialog__title {
    text-align: left;
    margin-left: 0%;
  }
</style>
