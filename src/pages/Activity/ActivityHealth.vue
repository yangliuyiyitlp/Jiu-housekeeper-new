<template>
  <div class="right">
    <el-tabs v-model="activeName2" type="card">

      <!--报名表-->
      <el-tab-pane label="名流健康报名表" name="first">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" style="padding-left:10px;">
          <el-form-item label="姓名：">
            <el-input v-model.trim="formInline.realName"></el-input>
          </el-form-item>
          <el-form-item label="手机号：">
            <el-input v-model.trim="formInline.phone"></el-input>
          </el-form-item>
          <el-form-item label="ID：" v-if=false>
            <el-input v-model.trim="formInline.id"></el-input>
          </el-form-item>
          <el-form-item label="骑行次数：">
            <el-input v-model.trim="formInline.count"></el-input>
          </el-form-item>
          <el-form-item label="报名时间：">
            <el-date-picker
              v-model="formInline.beginTime"
              type="datetime"
              @change="onBeginTimeChange"
              placeholder="开始时间">
            </el-date-picker>
            <el-date-picker
              v-model="formInline.endTime"
              type="datetime"
              @change="onEndTimeChange"
              placeholder="结束时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getList">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="inlineExport">导出</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="list" class="color">生成中奖名单</el-button>
          </el-form-item>
        </el-form>
        <!--隐藏表单用于文件导出-->
        <form style="display: none" action="" method="get" ref="FileForm">
          <input name="realName" v-model="inlineExportParam.realName"/>
          <input name="phone" v-model="inlineExportParam.phone"/>
          <input name="id" v-model="inlineExportParam.id"/>
          <input name="count" v-model="inlineExportParam.count"/>
          <input name="beginTime" v-model="inlineExportParam.beginTime"/>
          <input name="endTime" v-model="inlineExportParam.endTime"/>
          <input name="pageSize" v-model="inlineExportParam.pageSize"/>
          <input name="pageNum" v-model="inlineExportParam.pageNum"/>
        </form>
        <!--表格-->
        <el-table
          :data="tableData1"
          border
          stripe>
          <el-table-column
            header-align="center"
            align="center"
            prop="realName"
            label="姓名"
            width="300">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="phone"
            label="手机号">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="id"
            v-if=false
            label="ID">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="count"
            label="骑行次数">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="addTime"
            label="报名时间">
          </el-table-column>
        </el-table>
        <!--分页-->
        <el-pagination
          @size-change="inlineSizeChange"
          @current-change="inlineCurrentChange"
          :current-page="inlinePagination.pageNum"
          :page-sizes="inlinePagination.pageSizes"
          :page-size="inlinePagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="inlinePagination.count">
        </el-pagination>
      </el-tab-pane>

      <!--中奖表-->
      <el-tab-pane label="名流健康中奖表" name="second">
        <el-form :inline="true" :model="formPrize" class="demo-form-inline" style="padding-left:10px;">
          <el-form-item label="姓名：">
            <el-input v-model.trim="formPrize.name"></el-input>
          </el-form-item>
          <el-form-item label="手机号：">
            <el-input v-model.trim="formPrize.phone"></el-input>
          </el-form-item>
          <el-form-item label="劵码：">
            <el-input v-model.trim="formPrize.prizeTicket"></el-input>
          </el-form-item>
          <el-form-item label="劵的类型：">
            <el-input v-model.trim="formPrize.prizeName"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="prizeExport">导出</el-button>
          </el-form-item>
        </el-form>
        <!--隐藏表单用于文件导出-->
        <form style="display: none" action="" method="get" ref="Form">
          <input name="name" v-model="exportParam.name"/>
          <input name="phone" v-model="exportParam.phone"/>
          <input name="prizeTicket" v-model="exportParam.prizeTicket"/>
          <input name="prizeName" v-model="exportParam.prizeName"/>
          <input name="pageSize" v-model="exportParam.pageSize"/>
          <input name="pageNum" v-model="exportParam.pageNum"/>
        </form>
        <!--表格-->
        <el-table
          :data="tableData2"
          border
          stripe>
          <el-table-column
            header-align="center"
            align="center"
            prop="name"
            label="姓名"
            width="300">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="phone"
            label="手机号">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="prizeTicket"
            label="劵码">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="prizeName"
            label="劵的类型">
          </el-table-column>
        </el-table>
        <!--分页-->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.pageNum"
          :page-sizes="pagination.pageSizes"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.count">
        </el-pagination>
      </el-tab-pane>
    </el-tabs>
    <!--导出弹框-->
    <el-dialog title="导出" custom-class="dialogClass" center size="tiny" :visible.sync="exportForm"
               :close-on-press-escape="false"
               :close-on-click-modal="false" class="demo-ruleForm ">
      <el-button @click="inlineCurrent">导出当前页</el-button>
      <el-button @click="inlineAll">导出所有</el-button>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <!--导出弹框-->
    <el-dialog title="导出" custom-class="dialogClass" center size="tiny" :visible.sync="exportFormVisible"
               :close-on-press-escape="false"
               :close-on-click-modal="false" class="demo-ruleForm ">
      <el-button @click="prizeCurrent">导出当前页</el-button>
      <el-button @click="prizeAll">导出所有</el-button>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelExport">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import { convertDate2String } from '../../assets/js/convert'
  import baseUrl from '../../utils/baseUrl'

  export default {
    created: function () {
      this.getList()
      this.search()
    },
    data () {
      return {
        activeName2: 'first',
        formInline: {},
        formPrize: {},
        tableData1: [],
        tableData2: [],
        inlinePagination: {pageSizes: [30, 40, 60, 100], pageSize: 30, count: 0, pageNum: 1},
        inlineExportParam: {
          realName: '',
          phone: '',
          id: '',
          count: '',
          beginTime: '',
          endTime: '',
          pageSize: 30,
          pageNum: 1
        },
        pagination: {pageSizes: [30, 40, 60, 100], pageSize: 30, count: 0, pageNum: 1},
        exportParam: {
          name: '',
          phone: '',
          prizeTicket: '',
          prizeName: '',
          pageSize: 30,
          pageNum: 1
        },
        exportForm: false,
        exportFormVisible: false
      }
    },
    methods: {
      onBeginTimeChange (val) {
        this.formInline.beginTime = new Date(val).getTime()
//        this.formInline.beginTime = new Date(val)
      },
      onEndTimeChange (val) {
        this.formInline.endTime = new Date(val).getTime()
      },
      getList () {
        this.inlineExportParam.realName = this.formInline.realName
        this.inlineExportParam.phone = this.formInline.phone
        this.inlineExportParam.id = this.formInline.id
        this.inlineExportParam.count = this.formInline.count
        this.inlineExportParam.beginTime = this.formInline.beginTime
        this.inlineExportParam.endTime = this.formInline.endTime
        this.$ajax.get('/activity/health', {params: this.formInline})
          .then(response => {
            if (response.data.code === 200) {
              this.tableData1 = response.data.data.result
              for (let i = 0; i < response.data.data.result.length; i++) {
                this.tableData1[i].addTime = convertDate2String(response.data.data.result[i].addTime)
              }
              this.inlinePagination.count = response.data.data.total
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
      inlineSizeChange (val) {
        this.formInline.pageSize = val
        this.inlinePagination.pageSize = val
        this.getList()
      },
      inlineCurrentChange (val) {
        this.formInline.pageNum = val
        this.inlinePagination.pageNum = val
        this.getList()
      },
      inlineExport () {
        this.exportForm = true
      },
      inlineCurrent () {
        var r = confirm('确定导出么')
        if (r === true) {
          this.inlineExportParam.pageNum = this.inlinePagination.pageNum
          this.inlineExportParam.pageSize = this.inlinePagination.pageSize
          this.$refs['FileForm'].setAttribute('action', `${baseUrl}/activity/health/export`)
          this.$refs['FileForm'].submit()
          this.exportForm = false
        } else {
          return
        }
      },
      inlineAll () {
        var r = confirm('确定导出么')
        if (r === true) {
          this.inlineExportParam.pageSize = ''
          this.inlineExportParam.pageNum = ''
          this.$refs['FileForm'].setAttribute('action', `${baseUrl}/activity/health/exportAll`)
          this.$refs['FileForm'].submit()
          this.exportForm = false
        } else {
          return
        }
      },
      cancel () {
        this.exportForm = false
      },
//      中奖表
      search () {
        this.exportParam.name = this.formPrize.name
        this.exportParam.phone = this.formPrize.phone
        this.exportParam.prizeTicket = this.formPrize.prizeTicket
        this.exportParam.prizeName = this.formPrize.prizeName
        this.$ajax.get('/activity/health/prize', {params: this.formPrize})
          .then(response => {
            if (response.data.code === 200) {
              this.tableData2 = response.data.data.result
              this.pagination.count = response.data.data.total
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
      handleSizeChange (val) {
        this.formPrize.pageSize = val
        this.pagination.pageSize = val
        this.search()
      },
      handleCurrentChange (val) {
        this.formPrize.pageNum = val
        this.pagination.pageNum = val
        this.search()
      },
      prizeExport () {
        this.exportFormVisible = true
      },
      prizeCurrent () {
        var r = confirm('确定导出么')
        if (r === true) {
          this.exportParam.pageNum = this.pagination.pageNum
          this.exportParam.pageSize = this.pagination.pageSize
          this.$refs['Form'].setAttribute('action', `${baseUrl}/activity/health/prize/export`)
          this.$refs['Form'].submit()
          this.exportFormVisible = false
        } else {
          return
        }
      },
      prizeAll () {
        var r = confirm('确定导出么')
        if (r === true) {
          this.exportParam.pageSize = ''
          this.exportParam.pageNum = ''
          this.$refs['Form'].setAttribute('action', `${baseUrl}/activity/health/prize/exportAll`)
          this.$refs['Form'].submit()
          this.exportFormVisible = false
        } else {
          return
        }
      },
      cancelExport () {
        this.exportFormVisible = false
      },
      list () {
        this.$ajax.get('/activity/health/raffle')
          .then(response => {
            console.log(response)
            if (response.data.code === 200) {
              this.$message({
                type: 'success',
                message: response.data.msg
              })
              this.activeName2 = 'second'
              this.search()
            } else {
              this.$message({
                type: 'error',
                message: response.data.msg
              })
              this.activeName2 = 'first'
            }
          })
          .catch(err => {
            this.$message({
              type: 'error',
              message: err.data.msg
            })
            this.activeName2 = 'first'
          })
      }
    }
  }
</script>
<style scoped>
  .demo-ruleForm {
    font-size: 20px !important;
    text-align: center;
  }

  .color {
    background-color: hotpink;
    border: none;
    color: #fff;
  }
</style>
