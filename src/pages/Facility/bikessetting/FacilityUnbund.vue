<template>
  <div id="dataGrid">
    <el-form :inline="true" :model="requestParam" class="demo-form-inline left">
      <el-form-item label="车辆编号：">
        <el-input v-model="requestParam.bikeid"></el-input>
      </el-form-item>
      <el-form-item label="imei编号：">
        <el-input v-model="requestParam.imei"></el-input>
      </el-form-item>
      <el-form-item label="设备ID：">
        <el-input v-model="requestParam.deviceid"></el-input>
      </el-form-item>
      <el-form-item label="MAC地址：">
        <el-input v-model="requestParam.blemac"></el-input>
      </el-form-item>
      <el-form-item label="iccid：">
        <el-input v-model="requestParam.iccid"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="query">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="exportFile">导出</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="exportFile">下载模板</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="exportFile">点击上传</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="exportFile">导入</el-button>
      </el-form-item>
    </el-form>
    <!--隐藏表单用于文件导出-->
    <form action="http://116.231.72.55:10001/a/electric/lockfactoryinfo/interface/export" style="display: none"
          method="post" ref="FileForm">
      <input name="bikeid" v-model="exportParam.bikeid"/>
      <input name="imei" v-model="exportParam.imei"/>
      <input name="deviceid" v-model="exportParam.deviceid"/>
      <input name="blemac" v-model="exportParam.blemac"/>
      <input name="iccid" v-model="exportParam.iccid"/>
    </form>
    <el-table
      :data="tableData"
      border
      show-header
      style="width: 100%"
      stripe
      @cell-click="more">
      <el-table-column
        prop="id"
        label="id" v-if=0> // id 隐藏
      </el-table-column>
      <el-table-column
        label="车辆编号"
        prop="bikeid">
        <template scope="scope">
          <span v-bind:class="{active: true}">{{ scope.row.bikeid}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="imei"
        label="imei编号">
      </el-table-column>
      <el-table-column
        prop="deviceid"
        label="设备ID">
      </el-table-column>
      <el-table-column
        prop="blemac"
        label="MAC地址">
      </el-table-column>
      <el-table-column
        prop="iccid"
        label="iccid">
      </el-table-column>
      <el-table-column
        label="update_date">
        <template scope="scope">
          <el-icon name="time"></el-icon>
          <span style="margin-left: 10px">{{ scope.row.updateDate}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="remarks"
        show-overflow-tooltip
        label="备注">
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
    <!--详情弹框-->
    <el-dialog title="详情" :visible.sync="moreFormVisible" :show-close="false" :close-on-press-escape="false"
               :close-on-click-modal="false" class="demo-ruleForm ">

      <el-form label-width="150px" :model="moreinfo" ref="formA" class="tbody">
        <el-form-item label="锁厂名称" class="elform">
          <el-input :value="moreinfo.factoryName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="锁厂家编号" class="elform">
          <el-input :value="moreinfo.lockFactoryNo" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="添加时间" class="elform">
          <el-input :value="moreinfo.addTime" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="更新时间" class="elform">
          <el-input :value="moreinfo.updateDate" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="操作者" class="elform">
          <el-input :value="moreinfo['createBy.id']" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="备注" class="elform">
          <el-input type="textarea" :row="3" :value="moreinfo.remarks" :disabled="true" style="resize:none"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="cancelMore">关 闭</el-button>
      </div>
    </el-dialog>
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
        form: {
          id: '',
          bikeid: '',
          imei: '',
          deviceid: '',
          blemac: '',
          iccid: '',
          remarks: ''
        },
        formLabelWidth: '80px',
        requestParam: {
          id: '',
          bikeid: '',
          imei: '',
          deviceid: '',
          blemac: '',
          iccid: '',
          pageSize: 30,
          pageNo: 1
        },
        moreinfo: {},
        rules: {
          bikeid: [
            {required: true, message: '请输入厂家名称', trigger: 'blur'}
          ],
          imei: [
            {required: true, message: '请输入锁厂家编号', trigger: 'blur'}
          ]
        },
        pagination: {pageSizes: [30, 40, 60, 100], pageSize: 30, count: 0, pageNo: 1},
        exportParam: {
          bikeid: '',
          imei: '',
          deviceid: '',
          blemac: '',
          iccid: '',
          pageSize: 30,
          pageNo: 1
        }
      }
    },
    methods: {
      query () {
        this.requestParam.bikeid = this.requestParam.bikeid.trim()
        this.requestParam.imei = this.requestParam.imei.trim()
        this.requestParam.deviceid = this.requestParam.deviceid.trim()
        this.requestParam.blemac = this.requestParam.blemac.trim()
        this.requestParam.iccid = this.requestParam.iccid.trim()
        this.exportParam.bikeid = this.requestParam.bikeid
        this.exportParam.imei = this.requestParam.imei
        this.exportParam.deviceid = this.requestParam.deviceid
        this.exportParam.blemac = this.requestParam.blemac
        this.exportParam.iccid = this.requestParam.iccid
        this.exportParam.pageNo = this.requestParam.pageNo
        this.exportParam.pageSize = this.requestParam.pageSize
        this.$ajax.get('electric/tUnbangdingFail/interface/list', {params: this.requestParam}).then(response => {
          console.log(response)
          if (response.data.code === 0) {
            this.tableData = response.data.page.list
            this.pagination.count = response.data.page.count
          } else {
            this.$message({
              type: 'error',
              message: response.data.msg
            })
          }
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '获取列表信息失败'
          })
        })
      },
      modifyRecord (scope) {
//        this.$ajax.get('electric/lockfactoryinfo/interface/form', {params: {id: scope.row.id}})
//          .then(res => {
//            if (res.data.code === 0) {
//              this.dialogFormVisible = true
//              this.form.id = res.data.tLockFactoryInfo.id
//              this.form.factoryName = res.data.tLockFactoryInfo.factoryName
//              this.form.lockFactoryNo = res.data.tLockFactoryInfo.lockFactoryNo
//              this.form.remarks = res.data.tLockFactoryInfo.remarks
//            }
//          })
      },
      doModify (formName) {       // 修改确定功能
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var url = ''
            if (this.form.id === undefined || this.form.id === '') {
              url = 'electric/lockfactoryinfo/interface/save' // 新增功能
            } else {
              url = 'electric/lockfactoryinfo/interface/save'
            }
            this.dialogFormVisible = false
            this.$ajax.get(url, {params: this.form}).then(response => {
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
                  message: response.data.msg
                })
              }
            }, () => {
              this.$message({
                type: 'error',
                message: '操作失败'
              })
            })
          } else {
            return
          }
        })
      },
      more (row, column, cell, event) {
        if (column.property !== 'factoryName') {
          return false
        } else {
          this.moreFormVisible = true
          this.$ajax.get('electric/lockfactoryinfo/interface/view_form', {params: {id: row.id}}).then(res => {
            if (res.data.code === 0) {
              this.moreinfo.remarks = res.data.tLockFactoryInfo.remarks
              this.moreinfo.updateDate = res.data.tLockFactoryInfo.updateDate
              this.moreinfo.factoryName = res.data.tLockFactoryInfo.factoryName
              this.moreinfo.lockFactoryNo = res.data.tLockFactoryInfo.lockFactoryNo
              this.moreinfo.addTime = res.data.tLockFactoryInfo.addTime
            }
          }).catch((err) => {
            this.$message({
              type: 'error',
              message: err.data.msg
            })
          })
        }
      },
      cancelMore () {
        this.moreFormVisible = false
      },
      handleSizeChange (val) {
        this.requestParam.pageSize = val
        this.pagination.pageSize = val
        this.query()
      },
      handleCurrentChange (val) {
        this.requestParam.pageNo = val
        this.pagination.pageNo = val
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
          this.exportParam.pageSize = this.pagination.pageNo
          this.exportParam.pageSize = this.pagination.pageSize
          this.$refs['FileForm'].setAttribute('action', 'http://116.231.72.55:10001/a/electric/lockfactoryinfo/interface/export')
          this.$refs['FileForm'].submit()
        } else {
          return
        }
      },
      exportAll () {
        var r = confirm('确定导出么')
        if (r === true) {
          this.exportParam.pageSize = ''
          this.exportParam.pageNo = ''
          this.$refs['FileForm'].setAttribute('action', 'http://116.231.72.55:10001/a/electric/lockfactoryinfo/interface/exportAll')
          this.$refs['FileForm'].submit()
        } else {
          return
        }
      }
    }
  }
</script>
<style scoped>
  .left{
    padding-left:10px;
  }

  form {
    padding-top: 20px;
    height: 75px;
  }

  .demo-ruleForm {
    font-size: 20px !important;
    text-align: center;
  }

  .el-dialog--small {

  }

  .tbody[data-v-30c85a31] {
    height: 400px !important;
  }

  .active {
    color: #20a0ff;
  }

  .module {
    height: 240px !important;
    width: 400px !important;
  }

  .addBody {
    height: 200px !important;
  }

  .addUp {
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

  .dialogClass {
    background-color: #5cb85c;
  }
</style>
