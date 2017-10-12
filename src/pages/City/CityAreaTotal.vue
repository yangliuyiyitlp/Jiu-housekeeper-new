<template>
  <div class="count">
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <el-tab-pane label="区域统计日报表列表" name="first"style="padding-left:10px;">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="行政区域：">
            <!--数模型-->
            <el-input
              icon="search"
              v-model="formInline.search"
              :on-icon-click="handleIconClick" @click="dialogVisible = true">
            </el-input>
          </el-form-item>
          <el-form-item label="小区域：">
            <el-input v-model="formInline.user"></el-input>
          </el-form-item>
          <el-form-item label="运维人数：">
            <el-col :span="11">
              <el-input v-model="formInline.electricstart"></el-input>
            </el-col>
            <el-col class="line" :span="1" style="text-align: center">-</el-col>
            <el-col :span="11">
              <el-input v-model="formInline.electricend"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="正常车辆：">
            <el-col :span="11">
              <el-input v-model="formInline.electricstart"></el-input>
            </el-col>
            <el-col class="line" :span="1" style="text-align: center">-</el-col>
            <el-col :span="11">
              <el-input v-model="formInline.electricend"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="离线：">
            <el-col :span="11">
              <el-input v-model="formInline.electricstart"></el-input>
            </el-col>
            <el-col class="line" :span="1" style="text-align: center">-</el-col>
            <el-col :span="11">
              <el-input v-model="formInline.electricend"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="报废：">
            <el-col :span="11">
              <el-input v-model="formInline.electricstart"></el-input>
            </el-col>
            <el-col class="line" :span="1" style="text-align: center">-</el-col>
            <el-col :span="11">
              <el-input v-model="formInline.electricend"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="故障车：">
            <el-col :span="11">
              <el-input v-model="formInline.electricstart"></el-input>
            </el-col>
            <el-col class="line" :span="1" style="text-align: center">-</el-col>
            <el-col :span="11">
              <el-input v-model="formInline.electricend"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="低电量：">
            <el-col :span="11">
              <el-input v-model="formInline.electricstart"></el-input>
            </el-col>
            <el-col class="line" :span="1" style="text-align: center">-</el-col>
            <el-col :span="11">
              <el-input v-model="formInline.electricend"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="僵尸车：">
            <el-col :span="11">
              <el-input v-model="formInline.electricstart"></el-input>
            </el-col>
            <el-col class="line" :span="1" style="text-align: center">-</el-col>
            <el-col :span="11">
              <el-input v-model="formInline.electricend"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="查询时间：">
            <el-date-picker
              v-model="value6"
              type="daterange">
            </el-date-picker>
          </el-form-item>
          <el-button type="primary" @click="onSubmit('condition')">查询</el-button>
          <el-button type="primary" @click="onExport">导出</el-button>
        </el-form>
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="admin"
            label="行政区域">
          </el-table-column>
          <el-table-column
            prop="adminphone"
            label="小区域">
          </el-table-column>
          <el-table-column
            prop="adminphone"
            label="车辆总数">
          </el-table-column>
          <el-table-column
            prop="city"
            label="正常车辆">
          </el-table-column>
          <el-table-column
            prop="city"
            label="离线">
          </el-table-column>
          <el-table-column
            prop="city"
            label="报废">
          </el-table-column>
          <el-table-column
            prop="city"
            label="故障车">
          </el-table-column>
          <el-table-column
            prop="date"
            label="低电量">
          </el-table-column>
          <el-table-column
            prop="date"
            label="僵尸车">
          </el-table-column>
          <el-table-column
            prop="date"
            label="不可充电">
          </el-table-column>
          <el-table-column
            prop="date"
            label="维修中">
          </el-table-column>
          <el-table-column
            prop="date"
            label="普通投放点">
          </el-table-column>
          <el-table-column
            prop="date"
            label="一期投放点">
          </el-table-column>
          <el-table-column
            prop="date"
            label="重点投放点">
          </el-table-column>
          <el-table-column
            prop="date"
            label="已投放点">
          </el-table-column>
          <el-table-column
            prop="date"
            label="运维人数">
          </el-table-column>
          <el-table-column
            prop="date"
            label="查询时间">
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

      </el-tab-pane>
      <el-tab-pane label="区域统计图形报表" name="second">配置管理</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        activeName2: 'first',
        value6: '',
        formInline: {
          user: '',
          photo: '',
          nub: '',
          pageSize: 10,
          index: 1
        },
        tableData: [{
          admin: '0008',
          adminphone: '12345678999',
          number: '0',
          city: '上海',
          date: '2017-09-12 10:28:35'
        }, {
          admin: '0008',
          adminphone: '12345678999',
          number: '0',
          city: '北京',
          date: '2017-09-12 10:28:35'
        }],
        pagination: {pageSizes: [10, 20, 50, 100], pageSize: 10, total: 0, index: 1}
      }
    },
    created: function () {
      this.onSubmit('condition')
    },
    methods: {
      handleClick (tab, event) {
        console.log(tab, event)
      },
      onSubmit: function (condition) {
        var param = {}
        if (condition === 'condition') {
          param = this.formInline
        } else {
          param = condition
        }
        console.log(param)
        this.$http.post('/dataGrid/query', JSON.stringify(param)).then(function (response) {
          this.tableData = response.data.list
          this.pagination.total = response.data.total
        }, function (err) {
          this.$message({
            type: 'info',
            message: '获取列表信息失败' + err.status
          })
        })
      },
      handleSizeChange: function (val) {
        this.formInline.pageSize = val
        this.onSubmit('condition')
      },
      handleCurrentChange: function (val) {
        this.formInline.index = val
        this.onSubmit('condition')
      },
      onExport () {
        console.log('onexport!')
      },
      handleIconClick () {}
    }
  }
</script>
<style scoped>
  .count {
    margin-left: 250px;
  }

</style>
