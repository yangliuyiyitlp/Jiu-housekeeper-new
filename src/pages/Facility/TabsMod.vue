<template>
  <div id="dataGrid">
    <el-form :inline="true" :model="requestParam" class="demo-form-inline">
      <el-form-item label="账户：">
        <el-input v-model="requestParam.account"></el-input>
      </el-form-item>
      <el-form-item label="厂家名称：">
        <el-input v-model="requestParam.providerName"></el-input>
      </el-form-item>
      <el-form-item label="锁厂家编号：">
        <el-input v-model="requestParam.providerNo"></el-input>
      </el-form-item>
      <el-form-item label="登录状态：">
        <el-select v-model="requestParam.loginStatus">
          <el-option label="全部" value=""></el-option>
          <el-option label="是" value="true"></el-option>
          <el-option label="否" value="false"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="query">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="exportFile">导出</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
      </el-form-item>
    </el-form>
    <!--隐藏表单用于文件导出-->
    <form action="" style="display: none"
          method=" " ref="FileForm">
      <input name="account" v-model="exportParam.account"/>
      <input name="providerName" v-model="exportParam.providerName"/>
      <input name="providerNo" v-model="exportParam.providerNo"/>
      <input name="loginStatus" v-model="exportParam.loginStatus"/>
      <input name="pageSize" v-model="exportParam.pageSize"/>
      <input name="pageNo" v-model="exportParam.pageNo"/>
    </form>
    <el-table
      :data="tableData"
      border
      fit>
      <el-table-column
        prop="id"
        v-show=false
        label="ID">
      </el-table-column>
      // 返回的客户id
      <el-table-column
        header-align="center"
        align="center"
        prop="account"
        label="账户">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="providerName"
        label="厂家名称">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="providerNo"
        label="锁厂家编号	">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        label="登录状态">
        <template slot-scope="scope">
          <div v-if="scope.row.loginStatus==='true'">是</div>
          <div v-else>否</div>
        </template>
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        label="添加时间">
        <template slot-scope="scope">
          <el-icon name="time"></el-icon>
          <span>{{ scope.row.createTime | AddDate}}</span>
        </template>
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        label="操作">
        <template slot-scope="scope">
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
    <!--弹出框-->
    <el-dialog title="添加/修改" :visible.sync="dialogFormVisible" size='tiny' :show-close="false"
               :close-on-press-escape="false"
               :close-on-click-modal="false" class="demo-ruleForm ">
      <el-form label-width="150px" :model="form" :rules="rules" ref="formA" class="tbody">
        <el-form-item label="账户：" prop="account" class="elform">
          <el-input v-model="form.account"></el-input>
        </el-form-item>
        <el-form-item label="厂家名称：" prop="providerName" class="elform ">
          <!--<el-input v-model="form.providerName"></el-input>-->
          <!--<el-select v-model="form.providerName">-->
          <!--&lt;!&ndash;动态获取锁厂登记表里面所有的厂家名称&ndash;&gt;-->
          <!--&lt;!&ndash;<el-option v-for='(PName,index)in form ' :value="PName.providerName" v-text="PName.providerName"></el-option>&ndash;&gt;-->
          <!--</el-select>-->
          <el-select filterable placeholder="请选择" v-model="form.providerNo" clearable @change="onSelected">
            <el-option
              v-for="item in providerOptions"
              :key="item.no"
              :label="item.name"
              :value="item.no">
            </el-option>
          </el-select>
        </el-form-item>
        <!--根据客户选择的厂家名称在锁厂登记表里匹配对应的锁厂编11号  -->
        <el-form-item label="锁厂家编号：" prop="providerNo" class="elform">
          <el-input v-model="form.providerNo" :disabled="true"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelOperate">取 消</el-button>
        <el-button type="primary" @click="doModify('formA')">确 定</el-button>
      </div>

    </el-dialog>
    <!--导出弹框-->
    <el-dialog size='tiny' title="导出" :visible.sync="exportFormVisible" :show-close="false"
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
  import baseUrl from '../../utils/baseUrl'

  export default {
    created: function () {
      this.query()
    },
    data: function () {
      return {
        tableData: [{ account: '发发发',
          providerName: '方法',
          providerNo: 'ff',
          id: '1'}],
        dialogFormVisible: false,  // 模态框是否显示
        exportFormVisible: false,
        form: {
          account: '',
          providerName: '',
          providerNo: '',
          id: ''
        },
        exportParam: {
          account: '',
          providerName: '',
          providerNo: '',
          loginStatus: '',
          pageSize: 30,
          pageNo: 1
        },
        formLabelWidth: '80px',
        requestParam: {account: '', providerName: '', providerNo: '', loginStatus: '', pageSize: 30, index: 1},
        rules: {
          account: [
            {required: true, message: '请输入账户名称', trigger: 'blur'}
          ],
          providerName: [
            {required: true, message: '请输入厂家名称', trigger: 'change'}
          ],
          providerNo: [
            {required: true, message: '请输入锁厂家编号', trigger: 'blur'}
          ]
        },
        pagination: {pageSizes: [30, 40, 60, 100], pageSize: 30, total: 0, index: 1},
        providerOptions: []
      }
    },
    methods: {
      query: function () {
        this.exportParam.account = this.requestParam.account
        this.exportParam.providerName = this.requestParam.providerName
        this.exportParam.providerNo = this.requestParam.providerNo
        this.exportParam.loginStatus = this.requestParam.loginStatus
        this.exportParam.pageNo = this.requestParam.pageNo
        this.exportParam.pageSize = this.requestParam.pageSize

        // 获取登录状态
        this.$ajax.get('/facility/tabs/status', {params: {type: 'inmobi_display_type'}})
          .then((res) => {
            for (let i = 0; i < res.data.length; i++) {
              this.disObj[res.data[i].value] = res.data[i].label
            }
            // 获取列表
            this.$ajax.get('/facility/tabs/list', {params: this.requestParam})
              .then((response) => {
                if (response.data.code === 0) {
                  this.tableData = response.data.page.list
                  for (let i = 0; i < response.data.page.list.length; i++) {
                    this.tableData[i].displayType = this.disObj[response.data.page.list[i].displayType]
                  }
                  this.pagination.count = response.data.page.count
                } else {
                  this.$message({
                    type: 'error',
                    message: '获取列表异常'
                  })
                }
              })
              .catch(() => {
                this.$message({
                  type: 'error',
                  message: '获取列表异常'
                })
              })
          })
          .catch(() => {
            this.$message({
              type: 'error',
              message: '获取锁厂人员注册表失败'
            })
          })
      },
      modifyRecord: function (scope) {
        console.log(scope)
        this.dialogFormVisible = true
        this.form.id = scope.row.id
        this.form.account = scope.row.account
        this.form.providerName = scope.row.providerName
        this.form.providerNo = scope.row.providerNo
      },
      deleteRecord: function (id) {
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (id !== undefined && id !== '') {
            // 调用后台服务
            // 删除元素
            this.$ajax.post('/facility/tabs/delete', {'id': id}).then(function (response) {
              if (response.data.code === '1') {
                // 删除成功
                this.$message({
                  type: 'success',
                  message: '删除成功'
                })
                // 刷新页面
                this.query()
              } else {
                this.$message({
                  type: 'error',
                  message: '删除失败:' + response.data.msg
                })
              }
            })
              .catch(() => {
                this.$message({
                  type: 'info',
                  message: '删除异常'
                })
              })
          }
          this.$message({
            type: 'success',
            message: '删除异常,没有对应id!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      doModify: function (formName) {
        if (this.form === null || this.form === '' || this.form.account === undefined) {
          this.$message({
            message: '请选择一条记录进行操作!',
            type: 'warn'
          })
          return false
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var url = ''
            if (this.form.id === undefined || this.form.id === '') {
              url = '/facility/tabs/add'
            } else {
              url = '/facility/tabs/modify'
            }
            this.dialogFormVisible = false
            this.$ajax.post(url, {params: this.form}).then(function (response) {
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
            return
          }
        })
      },
      cancelOperate: function () {
        this.dialogFormVisible = false
        this.form = {
          account: '',
          providerName: '',
          providerNo: '',
          id: ''
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
      },
      onSelected: function (val) {
//        var obj = this.providerOptions.find(item => item.no === val)
//        this.form.providerName = obj.name
      },
      exportFile: function () {
        this.exportFormVisible = true
      },
      cancelExport: function () {
        this.exportFormVisible = false
      },
      exportCurrent: function () {
        this.exportParam.pageNo = this.pagination.pageNo
        this.exportParam.pageSize = this.pagination.pageSize
        this.$refs['FileForm'].setAttribute('method', 'get')
        this.$refs['FileForm'].setAttribute('action', `${baseUrl}/activity/inmobi/tDisplayType/export`)
        this.$refs['FileForm'].submit()
        this.exportFormVisible = false
      },
      exportAll: function () {
        this.exportParam.pageSize = ''
        this.exportParam.pageNo = ''
        this.$refs['FileForm'].setAttribute('method', 'post')
        this.$refs['FileForm'].setAttribute('action', `${baseUrl}/activity/inmobi/tDisplayType/exportAll`)
        this.$refs['FileForm'].submit()
        this.exportFormVisible = false
      }
    }
  }
</script>
<style scoped>
  .demo-form-inline {
    padding-left: 10px;
  }

  .demo-ruleForm {
    font-size: 20px !important;
    text-align: center;
  }

  .tbody {
    text-align: left !important;
  }

  .common {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #bfcbd9;
    box-sizing: border-box;
    color: #1f2d3d;
    font-size: inherit;
    height: 36px;
    line-height: 1;
    outline: 0;
    padding: 3px 10px;
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
  }

  .module {
    height: 240px !important;
    width: 400px !important;
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
