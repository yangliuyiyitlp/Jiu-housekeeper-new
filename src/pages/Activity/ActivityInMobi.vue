<template>
  <div id="dataGrid">
    <el-form :inline="true" :model="requestParam" style="padding-left:10px;" class="demo-form-inline">
      <el-form-item label="展示设置:">
        <el-select v-model="formInline.type"  clearable>
          <el-option label="活动二级弹窗" value="1"></el-option>
          <el-option label="启动页" value="1"></el-option>
          <el-option label="确认换车后" value="1"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="展示类型:">
        <el-select v-model="formInline.displayType"  clearable>
          <el-option label="app" value="1"></el-option>
          <el-option label="广告" value="2"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="城市名称:">
        <el-input v-model="formInline.cityName" placeholder="城市名称">
        </el-input>
      </el-form-item>
      <el-form-item label="安卓:">
        <el-input v-model="formInline.androidInmobiId">
        </el-input>
      </el-form-item>
      <el-form-item label="ios:">
        <el-input v-model="formInline.iosInmobiId">
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="query">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="exportFile">导出</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addNewRecord">新增</el-button>
      </el-form-item>
    </el-form>
    <!--隐藏表单用于文件导出-->
    <form action = "http://116.231.72.55:10001/a/electric/lockfactoryinfo/interface/export" style="display: none"  method="post" ref="FileForm">
      <input name="type" v-model="exportParam.type"/>
      <input name="displayType" v-model="exportParam.displayType"/>
      <input name="cityName" v-model="exportParam.cityName"/>
      <input name="androidInmobiId" v-model="exportParam.androidInmobiId"/>
      <input name="iosInmobiId" v-model="exportParam.iosInmobiId"/>
    </form>
    <form action = "http://116.231.72.55:10001/a/electric/lockfactoryinfo/interface/exportAll"  style="display: none"  method="post" ref="FileFormAll">
      <input name="type" v-model="exportParam.type"/>
      <input name="displayType" v-model="exportParam.displayType"/>
      <input name="cityName" v-model="exportParam.cityName"/>
      <input name="androidInmobiId" v-model="exportParam.androidInmobiId"/>
      <input name="iosInmobiId" v-model="exportParam.iosInmobiId"/>
    </form>
    <div v-html="downloadFile"></div>
    <el-table
      :data="tableData"
      border
      show-header
      style="width: 100%">
      <!-- lihaibu-->
      <el-table-column
        prop="id"
        label="id" v-if=0> // id 隐藏
      </el-table-column>
      <el-table-column
        prop="cityName"
        show-overflow-tooltip
        label="城市名称">
      </el-table-column>
      <el-table-column
        prop="rank"
        label="显示顺序	">
      </el-table-column>
      <el-table-column
        prop="createBy.id"
        show-overflow-tooltip
        label="操作者">
      </el-table-column>
      <el-table-column
        label="创建时间">
        <template scope="scope">
          <el-icon name="time"></el-icon>
          <span style="margin-left: 10px">{{ scope.row.createDate}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="remarks"
        show-overflow-tooltip
        label="备注">
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
        <el-form-item label="厂家名称" prop="type" class="elform">
          <el-input v-model="formInline.type"></el-input>
        </el-form-item>
        <el-form-item label="锁厂家编号" prop="displayType" class="elform">
          <el-input v-model="formInline.displayType"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="cityName" class="elform">
          <el-input type="textarea" :row="3" v-model="formInline.cityName"></el-input>
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

      <el-form label-width="150px" :model="moreinfo" ref="formA" class="tbody">
        <el-form-item label="锁厂名称" class="elform">
          <el-input :value="moreinfo.type" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="锁厂家编号" class="elform">
          <el-input :value="moreinfo.displayType" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="添加时间" class="elform">
          <el-input :value="moreinfo.cityName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="更新时间" class="elform">
          <el-input :value="moreinfo.androidInmobiId" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="操作者" class="elform">
          <el-input :value="moreinfo.iosInmobiId" :disabled="true"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="cancelmore">关 闭</el-button>
      </div>
    </el-dialog>
    <!--导出弹框-->
    <el-dialog title="导出" :visible.sync="exportFormVisible" :show-close="false" :close-on-press-escape="false"
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
  export default {
    created: function () {
      this.query()
    },
    data: function () {
      return {
        tableData: [],
        dialogFormVisible: false,  // 增加修改是否显示
        moreFormVisible: false,   // 详情
        exportFormVisible: false,
        addLoading: false,       // 是否显示loading
        formInline: {
          type: '',
          displayType: '',
          cityName: '',
          androidInmobiId: '',
          iosInmobiId: ''
        },
        moreinfo: {
          type: '',
          displayType: '',
          cityName: '',
          androidInmobiId: '',
          iosInmobiId: ''
        },
        formLabelWidth: '80px',
        requestParam: {
          type: '',
          displayType: '',
          cityName: '',
          androidInmobiId: '',
          iosInmobiId: '',
          pageSize: 30,
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
        pagination: {pageSizes: [30, 40, 60, 100], pageSize: 30, count: 0, pageNo: 1},
        exportParam: {
          type: '',
          displayType: '',
          cityName: '',
          androidInmobiId: '',
          iosInmobiId: ''
        },
        downloadFile: ''
      }
    },
    methods: {
      query: function () {
        this.exportParam.type = this.requestParam.type
        this.exportParam.displayType = this.requestParam.displayType
        this.exportParam.cityName = this.requestParam.cityName
        this.exportParam.androidInmobiId = this.requestParam.androidInmobiId
        this.exportParam.iosInmobiId = this.requestParam.iosInmobiId
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
        this.formInline.type = scope.row.type
        this.formInline.displayType = scope.row.displayType
        this.formInline.cityName = scope.row.cityName
        this.formInline.androidInmobiId = scope.row.androidInmobiId
        this.formInline.iosInmobiId = scope.row.iosInmobiId
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
            if (this.formInline.id === undefined || this.formInline.id === '') {
              url = 'http://116.231.72.55:10001/a/electric/lockfactoryinfo/interface/save' // 新增功能
            } else {
              url = 'http://116.231.72.55:10001/a/electric/lockfactoryinfo/interface/save'
            }
            this.dialogFormVisible = false
            this.$http.get(url, {params: this.formInline}).then(function (response) {
              if (response.data.code === 0) {
                // 更新成功
                this.$message({
                  type: 'success',
                  message: '操作成功'
                })
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
        this.formInline = {
          type: '',
          displayType: '',
          cityName: '',
          androidInmobiId: '',
          iosInmobiId: ''
        }
        this.$refs['formA'].resetFields()
      },
      more: function (row, column, cell, event) {
        if (column.property !== 'factoryName') {
          return false
        } else {
          this.moreFormVisible = true
          this.$http.get('http://116.231.72.55:10001/a/electric/lockfactoryinfo/interface/form', {params: {id: row.id}}).then(function (res) {
            if (res.data.code === 0) {
              this.moreinfo.type = res.data.tLockFactoryInfo.type
              this.moreinfo.displayType = res.data.tLockFactoryInfo.displayType
              this.moreinfo.cityName = res.data.tLockFactoryInfo.cityName
              this.moreinfo.androidInmobiId = res.data.tLockFactoryInfo.androidInmobiId
              this.moreinfo.iosInmobiId = res.data.tLockFactoryInfo.iosInmobiId
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
      },
      addNewRecord: function () {
        this.formInline = {
          type: '',
          displayType: '',
          cityName: '',
          androidInmobiId: '',
          iosInmobiId: ''
        }
        this.dialogFormVisible = true
      },
      exportFile: function () {
        this.exportFormVisible = true
      },
      cancelExport: function () {
        this.exportFormVisible = false
      },
      exportCurrent: function () {
        this.$refs['FileForm'].submit()
      },
      exportAll: function () {
        this.$refs['FileFormAll'].submit()
      }
    }
  }
</script>
<style scoped>
  #dataGrid {

  }

  /*form {*/
    /*padding-top: 20px;*/
    /*height: 75px;*/
  /*}*/

  .demo-ruleForm {
    font-size: 20px !important;
    text-align: center;
  }
  .el-dialog--small{

  }
  .tbody[data-v-30c85a31] {
    height: 350px !important;
  }

  .active {
    color: #20a0ff;
  }

  .module {
    height: 240px !important;
    width: 400px !important;
  }

  .tbody {
    height: 400px !important;
  }
  .addUp{
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
