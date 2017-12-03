<script src="../../main.js"></script>
<template>
  <div id="dataGrid">
    <el-form :inline="true" :model="requestParam"  class="demo-form-inline">
      <el-form-item label="账户：">
        <el-input v-model="requestParam.account" placeholder="账户"></el-input>
      </el-form-item>
      <el-form-item label="厂家名称：">
        <el-input v-model="requestParam.providerName" placeholder="厂家名称"></el-input>
      </el-form-item>
      <el-form-item label="锁厂家编号：">
        <el-input v-model="requestParam.providerNo" placeholder="锁厂家编号"></el-input>
      </el-form-item>
      <el-form-item label="登录状态：">
        <el-select v-model="requestParam.loginStatus" placeholder="登录状态">
          <el-option label="全部" value=""></el-option>
          <el-option label="是" value="true"></el-option>
          <el-option label="否" value="false"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="query('condition')">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click='export2Excel'>导出</el-button>
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
        label="ID">
      </el-table-column>
      // 返回的客户id
      <el-table-column
        prop="account"
        label="账户">
      </el-table-column>
      <el-table-column
        prop="providerName"
        label="厂家名称">
      </el-table-column>
      <el-table-column
        prop="providerNo"
        label="锁厂家编号	">
      </el-table-column>
      <el-table-column
        label="登录状态">
        <template slot-scope="scope">
          <div v-if="scope.row.loginStatus==='true'">是</div>
          <div v-else>否</div>
        </template>
      </el-table-column>
      <el-table-column
        label="添加时间">
        <template slot-scope="scope">
          <el-icon name="time"></el-icon>
          <span style="margin-left: 10px">{{ scope.row.createTime | AddDate}}</span>
        </template>
      </el-table-column>
      <el-table-column
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
        <el-button type="primary" @click="doModify('formA')" :loading="addLoading">确 定</el-button>
      </div>

    </el-dialog>

  </div>
</template>

<script>
  export default {
    created: function () {
      this.query('condition')
      this.getSelectOptions()
    },
    data: function () {
      return {
        tableData: [],
        dialogFormVisible: false,  // 模态框是否显示
        addLoading: false,       // 是否显示loading
        form: {
          account: '',
          providerName: '',
          providerNo: '',
          id: ''
        },
        formLabelWidth: '80px',
        requestParam: {account: '', providerName: '', providerNo: '', loginStatus: '', pageSize: 10, index: 1},
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
        pagination: {pageSizes: [10, 20, 50, 100], pageSize: 10, total: 0, index: 1},
        providerOptions: []
      }
    },
    methods: {
      getSelectOptions: function () {
        this.ajax.post('/provider/selectOptions').then(function (res) {
          this.providerOptions = res.data
          console.log(res.data)
        }, function (err) {
          this.$message({
            type: 'info',
            message: '获取列表信息失败' + err.status
          })
        })
      },
      query: function (condition) {
//        var param = {}
//        if (condition === 'condition') {
//          param = this.requestParam
//        } else {
//          param = condition
//        }
//        console.log(param)
//        console.log(qsqs.stringify(param))
//        this.ajax.get('http://116.231.72.55:10001/a/electric/lockfactoryinfo/interface/list', this.$qs.stringify(param), {
//          headers: {
//            'Content-Type': 'application/x-www-form-urlencoded'
//          }
//        }).then(function (response) {
//          this.tableData = response.page.list
//          this.pagination.total = response.page.pageNo
//        }, function (err) {
//          this.$message({
//            type: 'info',
//            message: '获取列表信息失败' + err.status
//          })
//        })
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
          if (id !== undefined) {
            // 调用后台服务
            // 删除元素
            this.ajax.post('/dataGrid/delete', {'id': id}).then(function (response) {
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
        if (this.form === null || this.form === '' || this.form.account === undefined) {
          this.$message({
            message: '请选择一条记录进行操作!',
            type: 'error'
          })
          return false
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var url = ''
            if (this.form.id === undefined || this.form.id === '') {
              url = '/dataGrid/add'
            } else {
              url = '/dataGrid/modify'
            }
            this.dialogFormVisible = false
            this.ajax.post(url, {params: this.form}).then(function (response) {
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
        var obj = this.providerOptions.find(item => item.no === val)
        this.form.providerName = obj.name
      },
      export2Excel: function () {
        alert('下载吗')
      }
//      export2Excel () {
//        require.ensure([], () => {
//          const { export_json_to_excel } = require('../../assets/vendor/Export2Excel')
//          const tHeader = ['序号', '账号', '厂家名称', '锁厂家编号']  // '登录状态', '添加时间'
//          const filterVal = ['ID', 'account', 'providerName', 'providerNo']
//          const list = this.tableData
//          const data = this.formatJson(filterVal, list)
//          export_json_to_excel(tHeader, data, '列表excel')
//        })
//      },
//      formatJson (filterVal, jsonData) {
//        return jsonData.map(v => filterVal.map(j => v[j]))
//      }
    }
  }
</script>
<style scoped>
  .demo-form-inline{
    padding-left:10px;
  }
  .demo-ruleForm {
    font-size: 20px !important;
    text-align: center;
  }
 .tbody{
   text-align: left!important;
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
