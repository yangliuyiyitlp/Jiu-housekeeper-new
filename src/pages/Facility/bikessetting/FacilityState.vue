<template>
  <div class="detailed">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="车辆编号：">
        <el-input v-model="formInline.num" placeholder="模糊查询"></el-input>
      </el-form-item>
      <el-form-item label="锁状态：">
        <el-input v-model="formInline.state" ></el-input>
      </el-form-item>
      <el-form-item label="在线标志：">
        <el-select v-model="formInline.code">
          <el-option label="锁开" value="open" ></el-option>
          <el-option label="锁关" value="closed"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="电量值%：" >
        <el-col :span="11" >
          <el-input v-model="formInline.electricstart" ></el-input>
        </el-col>
        <el-col class="line" :span="1" style="text-align: center">-</el-col>
        <el-col :span="11">
          <el-input v-model="formInline.electricend"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="电池电压：">
        <el-col :span="11">
          <el-input v-model="formInline.voltagestart" ></el-input>
        </el-col>
        <el-col class="line" :span="1" style="text-align: center">-</el-col>
        <el-col :span="11">
          <el-input v-model="formInline.voltageend"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="充电电压：">
        <el-col :span="11">
          <el-input v-model="formInline.chargestart" ></el-input>
        </el-col>
        <el-col class="line" :span="1" style="text-align: center">-</el-col>
        <el-col :span="11">
          <el-input v-model="formInline.chargeend"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="锁开次数：">
        <el-col :span="11">
          <el-input v-model="formInline.countstart" ></el-input>
        </el-col>
        <el-col class="line" :span="1" style="text-align: center">-</el-col>
        <el-col :span="11">
          <el-input v-model="formInline.countend"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="卫星数：">
        <el-col :span="11">
          <el-input v-model="formInline.moonstart" ></el-input>
        </el-col>
        <el-col class="line" :span="1" style="text-align: center">-</el-col>
        <el-col :span="11">
          <el-input v-model="formInline.moonend"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="信号强度：">
        <el-col :span="11">
          <el-input v-model="formInline.strongstart" ></el-input>
        </el-col>
        <el-col class="line" :span="1" style="text-align: center">-</el-col>
        <el-col :span="11">
          <el-input v-model="formInline.strongend"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="添加时间：">
        <el-date-picker
          v-model="value6"
          type="daterange">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="定位时间：">
        <el-date-picker
          v-model="value7"
          type="daterange">
        </el-date-picker>
      </el-form-item>
      <el-button type="primary" @click="query">查询</el-button>
      <el-button type="primary" @click="exportFile">导出</el-button>
    </el-form>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="num"
        label="车辆编号">
      </el-table-column>
      <el-table-column
        prop="city"
        label="所属城市">
      </el-table-column>
      <el-table-column
        prop="electric"
        label="电量值%">
      </el-table-column>
      <el-table-column
        prop="voltage"
        label="电池电压">
      </el-table-column>
      <el-table-column
        prop="charge"
        label="充电电压">
      </el-table-column>
      <el-table-column
        prop="strong"
        label="信号强度">
      </el-table-column>
      <el-table-column
        prop="state"
        label="锁状态">
      </el-table-column>
      <el-table-column
        prop="code"
        label="在线标志">
      </el-table-column>
      <el-table-column
        prop="count"
        label="锁开次数">
      </el-table-column>
      <el-table-column
        prop="moon"
        label="卫星数">
      </el-table-column>
      <el-table-column
        prop="sin"
        label="SIM编号">
      </el-table-column>
      <el-table-column
        prop="speed"
        label="速度">
      </el-table-column>
      <el-table-column
        prop="adddate"
        label="添加时间">
      </el-table-column>
      <el-table-column
        prop="positiondate"
        label="定位时间">
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
  </div>
</template>
<script>
  import baseUrl from '../../../utils/baseUrl'
  export default {
    created: function () {
      this.query()
    },
    data () {
      return {
        value6: '',
        value7: '',
        formInline: {
          num: '',
          state: '',
          code: '',
          electricstart: '',
          electricend: '',
          voltagestart: '',
          voltageend: '',
          chargestart: '',
          chargeend: '',
          countstart: '',
          countend: '',
          moonstart: '',
          moonend: '',
          strongstart: '',
          strongend: ''
        },
        exportParam: {
          num: '',
          state: '',
          code: '',
          electricstart: '',
          electricend: '',
          voltagestart: '',
          voltageend: '',
          chargestart: '',
          chargeend: '',
          countstart: '',
          countend: '',
          moonstart: '',
          moonend: '',
          strongstart: '',
          strongend: '',
          pageSize: 10,
          index: 1
        },
        tableData: [{
          num: '0008',
          city: '12345678999',
          electric: '0',
          voltage: '上海',
          charge: '2017-09-12 10:28:35',
          strong: '2017-09-12 10:28:35',
          state: '2017-09-12 10:28:35',
          code: '2017-09-12 10:28:35',
          count: '2017-09-12 10:28:35',
          moon: '2017-09-12 10:28:35',
          sin: '2017-09-12 10:28:35',
          speed: '2017-09-12 10:28:35',
          adddate: '2017-09-12 10:28:35',
          positiondate: '2017-09-12 10:28:35'
        }, {
          num: '0008',
          city: '12345678999',
          electric: '0',
          voltage: '上海',
          charge: '2017-09-12 10:28:35',
          strong: '2017-09-12 10:28:35',
          state: '2017-09-12 10:28:35',
          code: '2017-09-12 10:28:35',
          count: '2017-09-12 10:28:35',
          moon: '2017-09-12 10:28:35',
          sin: '2017-09-12 10:28:35',
          speed: '2017-09-12 10:28:35',
          adddate: '2017-09-12 10:28:35',
          positiondate: '2017-09-12 10:28:35'
        }],
        pagination: {pageSizes: [10, 20, 50, 100], pageSize: 10, total: 0, index: 1}
      }
    },
    methods: {
      query () {
        this.exportParam.num = this.formInline.num
        this.exportParam.state = this.formInline.state
        this.exportParam.electricstart = this.formInline.electricstart
        this.exportParam.voltagestart = this.formInline.voltagestart
        this.exportParam.pageNo = this.formInline.pageNo
        this.exportParam.pageSize = this.formInline.pageSize
        this.$ajax.get('/facility/info', {params: this.formInline})
          .then(response => {
            if (response.data.code === 0) {
              this.tableData = response.data.page.list
              this.pagination.count = response.data.page.count
            } else {
              this.$message({
                type: 'error',
                message: '获取列表信息异常'
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
        this.formInline.pageSize = val
        this.pagination.pageSize = val
        this.query()
      },
      handleCurrentChange (val) {
        this.formInline.pageNo = val
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
      }
    }
  }
</script>
<style scoped>
  .demo-form-inline{
    padding-left:10px;
  }


</style>
