<template>
  <div class="info">
    <el-form :inline="true" :model="requestParam"  class="demo-form-inline">
      <el-form-item label="车辆编号：">
        <el-input v-model="requestParam.user"></el-input>
      </el-form-item>
      <el-form-item label="车辆状态：">
        <el-select v-model="requestParam.region">
          <el-option label="正常" value="nomal"></el-option>
          <el-option label="使用中" value="useing"></el-option>
          <el-option label="离线" value="offline"></el-option>
          <el-option label="报废" value="scrap"></el-option>
          <el-option label="故障" value="breakdown"></el-option>
          <el-option label="电量低" value="powerlow"></el-option>
          <el-option label="僵尸车" value="zombie"></el-option>
          <el-option label="不可充电" value="notcharge"></el-option>
          <el-option label="维修中" value="repair"></el-option>
          <el-option label="未绑定" value="nobound"></el-option>
          <el-option label="电子围栏外" value="outline"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="城市代码：">
        <!--数模型-->
        <el-input
        icon="search"
        v-model="requestParam.search"
        :on-icon-click="handleIconClick" @click="dialogVisible = true">
      </el-input>
      </el-form-item>
      <el-form-item label="车锁电压：">
        <el-input v-model="requestParam.pressure" placeholder="电压小于XXX"></el-input>
      </el-form-item>
      <el-form-item label="车锁状态：">
        <el-select v-model="requestParam.status">
          <el-option label="锁开" value="open"></el-option>
          <el-option label="锁关" value="closed"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="硬件版本：">
        <el-input v-model="requestParam.edition"></el-input>
      </el-form-item>
      <el-form-item label="软件版本：">
        <el-input v-model="requestParam.versions"></el-input>
      </el-form-item>
      <el-button type="primary" @click="query">查询</el-button>
      <el-button type="primary" @click="exportFile">导出</el-button>
    </el-form>
    <el-table
      :data="tableData"
      border
      stripe
      style="width: 100%">
      <el-table-column
        header-align="center"
        align="center"
        prop="number"
        label="车辆编号">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="status"
        label="车辆状态">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="code"
        label="城市代码">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="pressure"
        label="车锁电压">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="state"
        label="车锁状态">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="edition"
        label="车锁硬件版本">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="version"
        label="车锁软件版本">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="line"
        label="最近连接">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="addtime"
        label="添加时间">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="person"
        label="操作者">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="date"
        label="操作时间">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="remark"
        label="备注">
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
    <!--弹框-->
    <el-dialog
      title="选择区域"
      :visible.sync="dialogVisible"
      size="tiny">
      <el-form ref="formInline" :model="formInline" label-width="80px">
        <el-form-item label="关键字:">
          <el-input v-model="formInline.key" style="width:150px;"></el-input>
        </el-form-item>
        <el-button @click="onsearch">搜索</el-button>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
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
  import Moment from 'moment'
  import baseUrl from '../../../utils/baseUrl'
  export default {
    created: function () {
      this.query()
    },
    data: function () {
      return {
        dialogVisible: false,
        exportFormVisible: false,
        tableData: [],
        formInline: {},
        requestParam: {
          beginAddTime: '',
          endAddTime: '',
          factoryName: '',
          lockFactoryNo: '',
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
          beginAddTime: '',
          endAddTime: '',
          factoryName: '',
          lockFactoryNo: '',
          pageSize: '',
          pageNo: ''
        }
      }
    },
    methods: {
      query () {
        this.exportParam.factoryName = this.requestParam.factoryName
        this.exportParam.lockFactoryNo = this.requestParam.lockFactoryNo
        this.requestParam.beginAddTime = Moment(new Date(this.requestParam.beginAddTime)).format('YYYY-MM-DD HH:mm:ss')
        this.requestParam.endAddTime = Moment(new Date(this.requestParam.endAddTime)).format('YYYY-MM-DD HH:mm:ss')
        this.exportParam.beginAddTime = this.requestParam.beginAddTime
        this.exportParam.endAddTime = this.requestParam.endAddTime
        this.exportParam.pageNo = this.requestParam.pageNo
        this.exportParam.pageSize = this.requestParam.pageSize
        this.$ajax.get('/facility/register', {params: this.requestParam})
          .then(response => {
            if (response.data.code === 0) {
              this.tableData = response.data.page.list
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
          this.exportParam.pageNo = this.pagination.pageNo
          this.exportParam.pageSize = this.pagination.pageSize
          this.$refs['FileForm'].setAttribute('action', `${baseUrl}/facility/register/export`)
          this.$refs['FileForm'].submit()
          this.exportFormVisible = false
        } else {
          return
        }
      },
      exportAll () {
        var r = confirm('确定导出么')
        if (r === true) {
          this.$refs['FileForm'].setAttribute('action', `${baseUrl}/facility/register/exportAll`)
          this.exportParam.pageSize = ''
          this.exportParam.pageNo = ''
          this.$refs['FileForm'].submit()
          this.exportFormVisible = false
        } else {
          return
        }
      },
      // 城市代码
      handleIconClick () {},
      onsearch () {}
//      handleClose () {
//        this.dialogVisible = false
//      }
    }
  }
</script>
<style scoped>

  .demo-form-inline{
    padding-left:10px;
  }
</style>

