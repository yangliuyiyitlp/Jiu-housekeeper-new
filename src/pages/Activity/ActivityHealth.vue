<template>
  <div class="right">
    <el-tabs v-model="activeName2" type="card">

      <!--报名表-->
      <el-tab-pane label="名流健康报名表" name="first">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" style="padding-left:10px;">
          <el-form-item label="姓名：">
            <el-input v-model="formInline.name"></el-input>
          </el-form-item>
          <el-form-item label="手机号：">
            <el-input v-model="formInline.php"></el-input>
          </el-form-item>
          <el-form-item label="ID：">
            <el-input v-model="formInline.id"></el-input>
          </el-form-item>
          <el-form-item label="骑行次数：">
            <el-input v-model="formInline.count"></el-input>
          </el-form-item>
          <el-form-item label="报名时间：">
            <el-date-picker
              v-model="formInline.beginTime"
              type="datetime"
              placeholder="开始时间">
            </el-date-picker>
            <el-date-picker
              v-model="formInline.endTime"
              type="datetime"
              placeholder="结束时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="query">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="inlineExport">导出</el-button>
          </el-form-item>
        </el-form>
        <!--隐藏表单用于文件导出-->
        <form style="display: none" action="" method="post" ref="FileForm">
          <input name="name" v-model="inlineExportParam.name"/>
          <input name="php" v-model="inlineExportParam.php"/>
          <input name="id" v-model="inlineExportParam.id"/>
          <input name="count" v-model="inlineExportParam.count"/>
          <input name="beginTime" v-model="inlineExportParam.beginTime"/>
          <input name="endTime" v-model="inlineExportParam.endTime"/>
        </form>
        <!--表格-->
        <el-table
          :data="tableData1"
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
            prop="php"
            label="手机号">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="id"
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
            prop="date"
            label="报名时间">
          </el-table-column>
        </el-table>
        <!--分页-->
        <el-pagination
          @size-change="inlineSizeChange"
          @current-change="inlineCurrentChange"
          :current-page="inlinePagination.pageNo"
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
            <el-input v-model="formPrize.name"></el-input>
          </el-form-item>
          <el-form-item label="手机号：">
            <el-input v-model="formPrize.php"></el-input>
          </el-form-item>
          <el-form-item label="劵码：">
            <el-input v-model="formPrize.num"></el-input>
          </el-form-item>
          <el-form-item label="劵的类型：">
            <el-input v-model="formPrize.type"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="prizeExport">导出</el-button>
          </el-form-item>
        </el-form>
        <!--隐藏表单用于文件导出-->
        <form style="display: none" action="" method="post" ref="Form">
          <input name="name" v-model="exportParam.name"/>
          <input name="php" v-model="exportParam.php"/>
          <input name="num" v-model="exportParam.num"/>
          <input name="type" v-model="exportParam.type"/>
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
            prop="php"
            label="手机号">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="num"
            label="劵码">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="type"
            label="劵的类型">
          </el-table-column>
        </el-table>
        <!--分页-->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.pageNo"
          :page-sizes="pagination.pageSizes"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.count">
        </el-pagination>
      </el-tab-pane>
    </el-tabs>
    <!--导出弹框-->
    <el-dialog title="导出" custom-class="dialogClass" size="tiny" :visible.sync="exportForm" :show-close="false"
               :close-on-press-escape="false"
               :close-on-click-modal="false" class="demo-ruleForm ">
      <el-button @click="inlineCurrent">导出当前页</el-button>
      <el-button @click="inlineAll">导出所有</el-button>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <!--导出弹框-->
    <el-dialog title="导出" custom-class="dialogClass" size="tiny" :visible.sync="exportFormVisible" :show-close="false"
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
  import Moment from 'moment'

  export default {
    created: function () {
      this.query()
      this.search()
    },
    data () {
      return {
        activeName2: 'first',
        formInline: {},
        formPrize: {},
        tableData1: [{name: '展示干', php: 222}, {name: '展示干', php: 222}, {name: '展示干', php: 222}],
        tableData2: [{name: '展示干', php: 222}],
        inlinePagination: {pageSizes: [30, 40, 60, 100], pageSize: 30, count: 0, pageNo: 1},
        inlineExportParam: {
          name: '',
          php: '',
          id: '',
          count: '',
          beginTime: '',
          endTime: '',
          pageSize: 30,
          pageNo: 1
        },
        pagination: {pageSizes: [30, 40, 60, 100], pageSize: 30, count: 0, pageNo: 1},
        exportParam: {
          name: '',
          php: '',
          num: '',
          type: '',
          pageSize: 30,
          pageNo: 1
        },
        exportForm: false,
        exportFormVisible: false
      }
    },
    methods: {
      query () {
//        this.formInline.name = this.formInline.name.trim()
//        this.formInline.php = this.formInline.php.trim()
//        this.formInline.id = this.formInline.id.trim()
//        this.formInline.count = this.formInline.count.trim()
        this.inlineExportParam.name = this.formInline.name
        this.inlineExportParam.php = this.formInline.php
        this.inlineExportParam.id = this.formInline.id
        this.inlineExportParam.count = this.formInline.count
        this.inlineExportParam.beginTime = Moment(new Date(this.formInline.beginTime)).format('YYYY-MM-DD HH:mm:ss')
        this.inlineExportParam.endTime = Moment(new Date(this.formInline.endTime)).format('YYYY-MM-DD HH:mm:ss')
//        for (let key in this.formInline) {
//          this.formInline[key] = this.formInline[key].trim()
//          this.inlineExportParam[key] = this.formInline[key]
//        }
        this.$ajax.get('http://localhost:3000/activity/health', {params: this.formInline})
          .then(response => {
            if (response.data.code === 0) {
              this.tableData1 = response.data.page.list
              this.inlinePagination.count = response.data.page.count
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
        this.query()
      },
      inlineCurrentChange (val) {
        this.formInline.pageNo = val
        this.inlinePagination.pageNo = val
        this.query()
      },
      inlineExport () {
        this.exportForm = true
      },
      inlineCurrent () {
        var r = confirm('确定导出么')
        if (r === true) {
          this.inlineExportParam.pageSize = this.inlinePagination.pageNo
          this.inlineExportParam.pageSize = this.inlinePagination.pageSize
          this.$refs['FileForm'].setAttribute('action', 'http://localhost:3000/activity/health/export')
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
          this.inlineExportParam.pageNo = ''
          this.$refs['FileForm'].setAttribute('action', 'http://localhost:3000/activity/health/exportAll')
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
//        this.formPrize.name = this.formPrize.name.trim()
//        this.formPrize.php = this.formPrize.php.trim()
//        this.formPrize.num = this.formPrize.num.trim()
//        this.formPrize.type = this.formPrize.type.trim()
        this.exportParam.name = this.formPrize.name
        this.exportParam.php = this.formPrize.php
        this.exportParam.num = this.formPrize.num
        this.exportParam.type = this.formPrize.type
        this.$ajax.get('http://localhost:3000/activity/health/prize', {params: this.formPrize})
          .then(response => {
            if (response.data.code === 0) {
              this.tableData2 = response.data.page.list
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
      handleSizeChange (val) {
        this.formPrize.pageSize = val
        this.pagination.pageSize = val
        this.search()
      },
      handleCurrentChange (val) {
        this.formPrize.pageNo = val
        this.pagination.pageNo = val
        this.search()
      },
      prizeExport () {
        this.exportFormVisible = true
      },
      prizeCurrent () {
        var r = confirm('确定导出么')
        if (r === true) {
          this.exportParam.pageSize = this.pagination.pageNo
          this.exportParam.pageSize = this.pagination.pageSize
          this.$refs['Form'].setAttribute('action', 'http://localhost:3000/activity/health/prize/export')
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
          this.exportParam.pageNo = ''
          this.$refs['Form'].setAttribute('action', 'http://localhost:3000/activity/health/prize/exportAll')
          this.$refs['Form'].submit()
          this.exportFormVisible = false
        } else {
          return
        }
      },
      cancelExport () {
        this.exportFormVisible = false
      }
    }
  }
</script>
<style scoped>

</style>
