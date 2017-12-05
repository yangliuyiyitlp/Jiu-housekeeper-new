<template>
  <div id="dataGrid">
    <el-form :inline="true" :model="requestParam" class="demo-form-inline left">
      <el-form-item label="车辆编号：">
        <el-input v-model.trim="requestParam.bikeid"></el-input>
      </el-form-item>
      <el-form-item label="gprs编号：">
        <el-input v-model.trim="requestParam.gpsNo"></el-input>
      </el-form-item>
      <el-form-item label="操作标志：">
        <el-select v-model="requestParam.operateFlag" clearable>
          <el-option v-for="(val,key) in opFlag" v-bind:key=key :label=opFlag[key] :value=key></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="imei编号：">
        <el-input v-model.trim="requestParam.imei"></el-input>
      </el-form-item>
      <el-form-item label="设备ID：">
        <el-input v-model.trim="requestParam.deviceid"></el-input>
      </el-form-item>
      <el-form-item label="MAC地址：">
        <el-input v-model.trim="requestParam.blemac"></el-input>
      </el-form-item>
      <el-form-item label="iccid：">
        <el-input v-model.trim="requestParam.iccid"></el-input>
      </el-form-item>
      <el-form-item v-if="hasPermission('view')">
        <el-button type="primary" @click="query" >查询</el-button>
      </el-form-item>
      <el-form-item v-if="hasPermission('outPort')">
        <el-button type="primary" @click="exportFile" >导出</el-button>
      </el-form-item>
      <el-form-item v-if="hasPermission('downFile')">
        <!--/facility/unbund/import/template-->
        <!--http://172.16.20.235:10001/a/electric/tUnbangdingFail/interface/import/template-->
        <el-button type="primary" @click="downFile">下载模板</el-button>
      </el-form-item>
    </el-form>
    <el-form class='importForm' v-if="hasPermission('inPort')">
      <el-form-item label="点击上传：">
        <input ref='upload' type="file" @change="getFile">
        <button @click="importFile">导入</button>
      </el-form-item>
    </el-form>
    <div v-if="message" class='errorMsg'>
      <button @click='errorClose' class="errorIcon">关闭</button>
      <div v-html="msg"></div>
    </div>
    <!--隐藏表单用于文件导出-->
    <form style="display: none" action="" method="post" ref="FileForm">
      <input name="bikeid" v-model="exportParam.bikeid"/>
      <input name="gpsNo" v-model="exportParam.gpsNo"/>
      <input name="operateFlag" v-model="exportParam.operateFlag"/>
      <input name="imei" v-model="exportParam.imei"/>
      <input name="deviceid" v-model="exportParam.deviceid"/>
      <input name="blemac" v-model="exportParam.blemac"/>
      <input name="iccid" v-model="exportParam.iccid"/>
      <input name="pageSize" v-model="exportParam.pageSize"/>
      <input name="pageNo" v-model="exportParam.pageNo"/>
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
        header-align="center"
        align="center"
        label="车辆编号"
        prop="bikeid">
        <template slot-scope="scope">
          <span v-bind:class="{active: true}">{{ scope.row.bikeid}}</span>
        </template>
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="gpsNo"
        show-overflow-tooltip
        label="gprs编号">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="operateFlag"
        label="操作标志">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="imei"
        label="imei编号">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="deviceid"
        label="设备ID">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="blemac"
        label="MAC地址">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="iccid"
        label="iccid">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        label="update_date">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.updateDate}}</span>
        </template>
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
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

      <el-form label-width="150px" :model="moreInfo" ref="formA" class="tbody">
        <el-form-item label="车辆编号：" class="elform">
          <el-input :value="moreInfo.bikeid" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="imei编号：" class="elform">
          <el-input :value="moreInfo.imei" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="设备ID：" class="elform">
          <el-input :value="moreInfo.deviceid" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="MAC地址：" class="elform">
          <el-input :value="moreInfo.blemac" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="iccid：" class="elform">
          <el-input :value="moreInfo.iccid" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="updateDate：" class="elform">
          <el-input :value="moreInfo.updateDate" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="备注：" class="elform">
          <el-input type="textarea" :row="3" :value="moreInfo.remarks" :disabled="true" style="resize:none"></el-input>
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
        <el-button type="primary" @click="cancelExport">取 消</el-button>
      </div>
    </el-dialog>
    <!--导入批量操作-->
    <el-dialog title="批量操作" custom-class="dialogClass" size="tiny" :visible.sync="exportAction" :show-close="false"
               :close-on-press-escape="false" :close-on-click-modal="false" class="demo-ruleForm ">
      <p class="title">小主，你想干啥？</p>
      <div>
        <el-button v-for="(val,key) in opFlag" :key="key" @click="importActionType(key)">{{val}}</el-button>
      </div>
      <el-button type="primary" class="button" @click="cancelImport">取 消</el-button>
    </el-dialog>
  </div>
</template>

<script>
  import baseUrl from '../../../../static/utils/baseUrl'
//  import isPermission from '../../../components/platformCom/hasPermission/index'

  export default {
    created: function () {
      this.list()
    },
    data: function () {
      return {
        message: false,
        msg: '',
        opFlag: {},
        tableData: [],
        moreFormVisible: false,   // 详情
        exportFormVisible: false,
        exportAction: false,
        form: {
          id: '',
          bikeid: '',
          imei: '',
          deviceid: '',
          blemac: '',
          iccid: '',
          gpsNo: '',
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
          operateFlag: '',
          pageSize: 30,
          pageNo: 1
        },
        moreInfo: {},
        ruleForm: {
          avatarTwo: ''
        },
        action: '',
        pagination: {pageSizes: [30, 40, 60, 100], pageSize: 30, count: 0, pageNo: 1},
        exportParam: {
          bikeid: '',
          gpsNo: '',
          imei: '',
          deviceid: '',
          blemac: '',
          iccid: '',
          operateFlag: '',
          pageSize: 30,
          pageNo: 1
        }
      }
    },
    methods: {
      hasPermission (data) {
//        isPermission(data)
        let permissionList = this.$route.meta.permission
        if (permissionList && permissionList.length && permissionList.includes(data)) {
          return true
        }
        return false
      },
      list: function () {
//        this.message = false
        this.$ajax.get('/facility/unbund', {params: {type: 'bike_batch_operate_flag'}})
          .then((res) => {
            for (let i = 0; i < res.data.length; i++) {
              this.opFlag[res.data[i].value] = res.data[i].label
            }
            this.query()
          }).catch(() => {
            this.$message({
              type: 'error',
              message: '获取列表信息失败'
            })
          })
      },
      query () {
        this.exportParam.bikeid = this.requestParam.bikeid
        this.exportParam.imei = this.requestParam.imei
        this.exportParam.deviceid = this.requestParam.deviceid
        this.exportParam.blemac = this.requestParam.blemac
        this.exportParam.iccid = this.requestParam.iccid
        this.exportParam.gpsNo = this.requestParam.gpsNo
        this.exportParam.operateFlag = this.requestParam.operateFlag
        this.exportParam.pageNo = this.requestParam.pageNo
        this.exportParam.pageSize = this.requestParam.pageSize
        this.$ajax.get('/facility/unbund/list', {params: this.requestParam}).then(response => {
          if (response.data.code === 0) {
            this.tableData = response.data.page.list
            this.pagination.count = response.data.page.count
            for (let i = 0; i < response.data.page.list.length; i++) {
              this.tableData[i].operateFlag = this.opFlag[response.data.page.list[i].operateFlag]
            }
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
      more (row, column, cell, event) {
        if (column.property !== 'bikeid') {
          return false
        } else {
          this.moreFormVisible = true
          this.$ajax.get('/facility/unbund/view/form', {params: {id: row.id}}).then(res => {
            if (res.data.code === 0) {
              this.moreInfo.bikeid = res.data.tUnbangdingFail.bikeid
              this.moreInfo.imei = res.data.tUnbangdingFail.imei
              this.moreInfo.deviceid = res.data.tUnbangdingFail.deviceid
              this.moreInfo.blemac = res.data.tUnbangdingFail.blemac
              this.moreInfo.iccid = res.data.tUnbangdingFail.iccid
              this.moreInfo.updateDate = res.data.tUnbangdingFail.updateDate
              this.moreInfo.remarks = res.data.tUnbangdingFail.remarks
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
        let r = confirm('确定导出么')
        if (r === true) {
          this.exportParam.pageSize = this.pagination.pageNo
          this.exportParam.pageSize = this.pagination.pageSize
          this.$refs['FileForm'].setAttribute('action', `${baseUrl}/facility/unbund/export`)
          this.$refs['FileForm'].submit()
          this.exportFormVisible = false
        } else {
          return
        }
      },
      exportAll () {
        let r = confirm('确定导出么')
        if (r === true) {
          this.exportParam.pageSize = ''
          this.exportParam.pageNo = ''
          this.$refs['FileForm'].setAttribute('action', `${baseUrl}/facility/unbund/exportAll`)
          this.$refs['FileForm'].submit()
          this.exportFormVisible = false
        } else {
          return
        }
      },
      getFile: function ($event) {
        this.ruleForm.avatarTwo = $event.target.files[0]
      },
      importFile ($event) {
        this.exportAction = true
        $event.preventDefault()
      },
      importActionType (actionType) {
        this.action = actionType
        let r = confirm('确定导入' + this.opFlag[actionType] + '?')
        if (r === true) {
          this.actionForm()
        } else {
          return false
        }
      },
      actionForm () {
        let formData = new FormData() // 一个form表单的对象 然后可以设置表单的值模拟 multipart/form-data请求头
        formData.append('file', this.ruleForm.avatarTwo) // 其他的一些参数
        formData.append('operateFlag', this.action)
        // 'http://172.16.20.235:10001/a/electric/tUnbangdingFail/interface/import'  '/facility/unbund/import/file'
//        this.$ajax(
//          {
//            method: 'post',
//            url: '/facility/unbund/import/file',
//            data: formData,
//            headers: {
//              'Content-Type': 'multipart/form-data'
//            }
//          }
//        )
        this.$ajax.post('/facility/unbund/import/file', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then((response) => {
            if (response.data.msg) {
              this.msg = response.data.msg
              this.message = true
            }
//          this.$message({
//            message: response.data.msg,
//            type: 'info'
//          })
            this.query()
          }).catch((error) => {
            this.$message({
              message: error.data.msg,
              type: 'error'
            })
          })
        this.exportAction = false
      },
      //        以上是文件上传功能
      cancelImport () {
        this.exportAction = false
      },
      errorClose () {
        this.message = false
      },
      downFile () {
        this.exportParam.pageSize = this.pagination.pageNo
        this.exportParam.pageSize = this.pagination.pageSize
        this.$refs['FileForm'].setAttribute('action', `${baseUrl}/facility/unbund/import/template`)
        this.$refs['FileForm'].submit()
      }
    }
  }
</script>
<style scoped>
  .errorMsg {
    margin-top: 40px;
    padding-left: 10px;
    background-color: #ccc;
  }

  .errorIcon {
    top: 0px;
  }

  .left {
    padding-left: 10px;
  }

  .button {
    float: right;
    margin-top: 20px;
  }

  a {
    color: #fff;
    text-decoration: none;
  }

  p.title {
    color: #317eac;
    font-size: 20px;
    margin-bottom: 20px;
  }

  .importForm {
    height: 0px;
    padding-left: 10px;
    padding-top: 0px !important;
    margin-bottom: 20px !important;
  }

  .demo-ruleForm {
    font-size: 20px !important;
    text-align: center;
  }

  .demo-form-inline {
    padding-left: 10px;
  }

  .active {
    color: #20a0ff;
  }

  .elform {
    text-align: left !important;
  }

  .tbody {
    height: 400px;
  }

  .el-form-item__content {
    margin-left: 100px !important;
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
