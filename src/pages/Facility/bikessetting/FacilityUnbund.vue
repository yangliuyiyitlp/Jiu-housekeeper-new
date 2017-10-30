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
        <el-button type="primary" @click="downLoad">下载模板</el-button>
      </el-form-item>
    </el-form>
    <el-form class='importForm'>
      <el-form-item label="点击上传：">
        <input ref='upload' type="file" @change="getFile">
        <button @click="importFile">导入</button>
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
        moreFormVisible: false,   // 详情
        exportFormVisible: false,
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
        moreInfo: {},
        ruleForm: {
          avatarTwo: ''
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
      more (row, column, cell, event) {
        if (column.property !== 'bikeid') {
          return false
        } else {
          this.moreFormVisible = true
          this.$ajax.get('electric/tUnbangdingFail/interface/view_form', {params: {id: row.id}}).then(res => {
            if (res.data.code === 0) {
              this.moreInfo.bikeid = res.data.tUnbangdingFail.bikeid
              this.moreInfo.imei = res.data.tUnbangdingFail.imei
              this.moreInfo.deviceid = res.data.tUnbangdingFail.deviceid
              this.moreInfo.blemac = res.data.tUnbangdingFail.blemac
              this.moreInfo.iccid = res.data.tUnbangdingFail.iccid
              this.moreInfo.updateDate = res.data.tUnbangdingFail.updateDate
              this.moreInfo.remarks = res.data.tUnbangdingFail.remarks
            }
            console.log(this.moreInfo)
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
          this.$refs['FileForm'].setAttribute('action', 'http://116.231.72.55:10001/a/electric/tUnbangdingFail/interface/export')
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
          this.$refs['FileForm'].setAttribute('action', 'http://116.231.72.55:10001/a/electric/tUnbangdingFail/interface/exportAll')
          this.$refs['FileForm'].submit()
        } else {
          return
        }
      },
      downLoad () {
        var r = confirm('确定下载么')
        if (r === true) {
          this.$ajax.get('electric/tUnbangdingFail/interface/import/template').then((res) => {
            console.log(res)
          })
        } else {
          return
        }
      },
      getFile: function ($event) {
        this.ruleForm.avatarTwo = $event.target.files[0]
      },
      importFile ($event) {
        $event.preventDefault()
        let formData = new FormData() // 一个form表单的对象 然后可以设置表单的值模拟 multipart/form-data这种请求头的请求
        console.log(111, this.ruleForm.avatarTwo)
        formData.append('file', this.ruleForm.avatarTwo) // 其他的一些参数
        console.log(JSON.stringify(formData))
        this.$ajax(
          {
            method: 'post',
            url: 'electric/tUnbangdingFail/interface/import',
            data: formData,
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        ).then((response) => {
          this.$message({
            message: response.data.msg,
            type: 'success'
          })
          console.log(2222222)
          this.query()
          console.log(response.data)
        }).catch((error) => {
          console.log(error)
          this.$message({
            message: error.data.msg,
            type: 'error'
          })
        })
//        以上是文件上传功能
      }
    }
  }
</script>
<style scoped>
  .left {
    padding-left: 10px;
  }

  form {
    padding-top: 20px;
    height: 75px;
  }

  .importForm {
    height: 0px;
    padding-left: 10px;
    padding-top: 0px !important;
  }

  .demo-ruleForm {
    font-size: 20px !important;
    text-align: center;
  }

  /*.demo-form-inline{*/
  /*height:100px!important;*/
  /*}*/
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
