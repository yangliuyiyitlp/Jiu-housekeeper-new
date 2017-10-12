<template>
  <div id="dataGrid">
    <el-form :inline="true" :model="requestParam" style="padding-left:10px;"class="demo-form-inline">
      <el-form-item label="锁厂名称">
        <el-input v-model="requestParam.factoryName" placeholder="锁厂名称" ></el-input>
      </el-form-item>
      <!--<el-form-item label="锁厂编号">-->
      <!--<el-input v-model="requestParam.factoryName" placeholder="锁厂编号"></el-input>-->
      <!--</el-form-item>-->
      <el-form-item label="锁厂编号">
        <el-input v-model="requestParam.lockFactoryNo" placeholder="锁厂编号"></el-input>
      </el-form-item>
      <el-form-item label="添加时间">
        <el-date-picker
          v-model="requestParam.addTimeStart"
          type="datetime"
          placeholder="开始时间">
        </el-date-picker>
        <el-date-picker
          v-model="requestParam.addTimeEnd"
          type="datetime"
          placeholder="结束时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="query">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" >导出</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      border
      fit
      style="width: 100%"
      @cell-click="more">
      <!-- lihaibu-->
      <el-table-column
        prop="id"
        label="id" v-if=0> // id 隐藏
      </el-table-column>
      // 返回的客户id
      <!--<el-table-column-->
        <!--v-bind:class="{active: true}"-->
        <!--prop="factoryName"-->
        <!--label="锁厂名称">-->
      <!--</el-table-column>-->
      <el-table-column
        label="锁厂名称"
        prop="factoryName">
        <template scope="scope">
          <span v-bind:class="{active: true}">{{ scope.row.factoryName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="lockFactoryNo"
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
          <span style="margin-left: 10px">{{ scope.row.addTime}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="createBy.id"
        label="操作者	"> // 返回空就是没有
      </el-table-column>
      <el-table-column
        prop="remarks"
        label="备注	">
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
      :current-page="pagination.pageNo"
      :page-sizes="pagination.pageSizes"
      :page-size="pagination.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.count">
    </el-pagination>
     <!--增加修改弹框-->
    <el-dialog title="添加/修改" :visible.sync="dialogFormVisible" :show-close="false" :close-on-press-escape="false"
               :close-on-click-modal="false" class="demo-ruleForm ">

      <el-form label-width="150px" :model="form" :rules="rules" ref="formA" class="tbody">
        <el-form-item label="厂家名称" prop="factoryName" class="elform">
          <el-input v-model="form.factoryName"></el-input>
        </el-form-item>
        <el-form-item label="锁厂家编号" prop="lockFactoryNo" class="elform">
          <el-input v-model="form.lockFactoryNo"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remarks" class="elform">
          <el-input type="textarea" :row="3" v-model="form.remarks"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelOperate">取 消</el-button>
        <el-button type="primary" @click="doModify('formA')" :loading="addLoading">确 定</el-button>
      </div>
    </el-dialog>
     <!--详情弹框-->
    <el-dialog title="详情" :visible.sync="moreFormVisible" :show-close="false" :close-on-press-escape="false"
               :close-on-click-modal="false" class="demo-ruleForm ">

      <el-form label-width="150px"  :model="form" ref="formA" class="tbody">
        <el-form-item label="锁厂名称"  class="elform">
          <el-input :value="moreinfo.factoryName":disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="锁厂家编号"  class="elform">
          <el-input :value="moreinfo.lockFactoryNo":disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="添加时间" class="elform">
          <el-input :value="moreinfo.addTime":disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="更新时间" class="elform">
          <el-input :value="moreinfo.updateDate":disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="操作者" class="elform">
          <el-input :value="moreinfo['createBy.id']":disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="备注"  class="elform">
          <el-input type="textarea" :row="3" :value="moreinfo.remarks":disabled="true"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="cancelmore">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    created: function () {
      this.query()
    },
    data: function () {
      return {
        tableData: [],
        dialogFormVisible: false,  // 增加修改是否显示
        moreFormVisible: false,   // 详情
        addLoading: false,       // 是否显示loading
        form: {
          id: '',
          factoryName: '',
          lockFactoryNo: '',
          'createBy.id': '',
          remarks: ''
        },
        moreinfo: {
          factoryName: '',
          lockFactoryNo: '',
          'createBy.id': '',
          remarks: '',
          addTime: '',
          updateDate: ''
        },
        formLabelWidth: '80px',
        requestParam: {
          addTimeStart: '',
          addTimeEnd: '',
          factoryName: '',
          lockFactoryNo: '',
          pageSize: 10,
          pageNo: 1
        },
        rules: {
          factoryName: [
            {required: true, message: '请输入厂家名称', trigger: 'blur'}
          ],
          lockFactoryNo: [
            {required: true, message: '请输入锁厂家编号', trigger: 'blur'}
          ]
        },
        pagination: {pageSizes: [10, 40, 60, 100], pageSize: 10, count: 0, pageNo: 1}
      }
    },
    methods: {
      query: function () {
//        this.requestParam.addTimeStart = this.formatDate(this.requestParam.addTimeStart, 'yyyy-MM-dd HH:mm:ss')
//        this.requestParam.addTimeEnd = this.formatDate(this.requestParam.addTimeEnd, 'yyyy-MM-dd HH:mm:ss')
        this.requestParam.addTimeStart = this.requestParam.addTimeStart.toString()
        this.requestParam.addTimeEnd = this.requestParam.addTimeEnd.toString()
        this.$http.get('http://116.231.72.55:10001/a/electric/lockfactoryinfo/interface/list', {params: this.requestParam}).then(function (response) {
          if (response.data.code === 0) {
            this.tableData = response.data.page.list
            this.pagination.count = response.data.page.count
          } else {
            this.$message({
              type: 'info',
              message: '获取列表信息失败'
            })
          }
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
        this.form.factoryName = scope.row.factoryName
        this.form.lockFactoryNo = scope.row.lockFactoryNo
        this.form['createBy.id'] = scope.row['createBy.id']
        this.form.remarks = scope.row.remarks
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
            this.$http.get('http://116.231.72.55:10001/a/electric/lockfactoryinfo/interface/delete', {params: {'id': id}}).then(function (response) {
              if (response.data.code === 0) {
                // 删除成功
                this.$message({
                  type: 'success',
                  message: '删除成功'
                })
                this.$refs['formA'].resetFields()
                // 刷新页面
                this.query()
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
      doModify: function (formName) {       // 修改确定功能
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var url = ''
            if (this.form.id === undefined || this.form.id === '') {
              url = 'http://116.231.72.55:10001/a/electric/lockfactoryinfo/interface/save' // 新增功能
            } else {
              url = 'http://116.231.72.55:10001/a/electric/lockfactoryinfo/interface/save'
            }
            this.dialogFormVisible = false
            this.$http.get(url, {params: this.form}).then(function (response) {
              if (response.data.code === 0) {
                // 更新成功
                this.$message({
                  type: 'success',
                  message: '操作成功'
                })
                this.$refs['formA'].resetFields()
                // 刷新页面
                this.query()
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
          factoryName: '',
          lockFactoryNo: '',
          id: '',
          'createBy.id': '',
          remarks: ''
        }
        this.$refs['formA'].resetFields()
      },
      more: function (row, column, cell, event) {
//        console.log(row)
//        console.log(row.id)
//        console.log(column)
//        console.log(column.property)
//        console.log(event)
        if (column.property !== 'factoryName') {
          return false
        } else {
          this.moreFormVisible = true
          this.$http.get('http://116.231.72.55:10001/a/electric/lockfactoryinfo/interface/form', {params: {id: row.id}}).then(function (res) {
            if (res.data.code === 0) {
              this.moreinfo.remarks = res.data.tLockFactoryInfo.remarks
              this.moreinfo.updateDate = res.data.tLockFactoryInfo.updateDate
              this.moreinfo.factoryName = res.data.tLockFactoryInfo.factoryName
              this.moreinfo.lockFactoryNo = res.data.tLockFactoryInfo.lockFactoryNo
              this.moreinfo.addTime = res.data.tLockFactoryInfo.addTime
            }
          }).catch(function (err) {
            this.$message({
              type: 'info',
              message: '获取详情失败' + err.status
            })
          })
        }
      },
      cancelmore: function () {
        this.moreFormVisible = false
      },
      handleSizeChange: function (val) {
        this.requestParam.pageSize = val
        this.query()
      },
      handleCurrentChange: function (val) {
        this.requestParam.pageNo = val
        this.query()
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
  .tbody[data-v-30c85a31] {
    height: 350px !important;
  }
  .active{
   color:#20a0ff;
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
