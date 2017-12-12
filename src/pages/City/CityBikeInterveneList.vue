<template>
  <div class="count">
    <el-form :inline="true" :model="form" class="demo-form-inline">

      <el-form-item label="运维姓名：">
        <el-input v-model="form.name" class="smallWidth"></el-input>
      </el-form-item>

      <el-form-item label="运维电话：">
        <el-input v-model="form.phone" class="smallWidth"></el-input>
      </el-form-item>

      <el-form-item label="司机姓名：">
        <el-input v-model="form.driverName" class="smallWidth"></el-input>
      </el-form-item>

      <el-form-item label="司机电话：">
        <el-input v-model="form.driverPhone" class="smallWidth"></el-input>
      </el-form-item>

      <el-form-item label="调度车辆数：">
          <el-input v-model="form.dispatchBikeNumMin" class="smallWidth"></el-input> -
        <el-input v-model="form.dispatchBikeNumMax" class="smallWidth"></el-input>
      </el-form-item>
      <el-form-item label="报废车辆数：">
        <el-input v-model="form.dispatchBikeNumMin" class="smallWidth"></el-input> -
        <el-input v-model="form.dispatchBikeNumMax" class="smallWidth"></el-input>
      </el-form-item>

      <el-form-item label="添加时间段：">
          <el-date-picker
            v-model="form.Begin_addTime"
            type="datetime">
          </el-date-picker> -
          <el-date-picker
            v-model="form.End_addTime"
            type="datetime">
          </el-date-picker>
      </el-form-item>

      <el-form-item label="调度开始时间段：" class="smallWidth">
          <el-date-picker
            v-model="form.Begin_operateTime"
            type="datetime">
          </el-date-picker> -
          <el-date-picker
            v-model="form.End_operateTime"
            type="datetime">
          </el-date-picker>
      </el-form-item>

      <el-form-item label="调度结束时间段：">
          <el-date-picker
            v-model="form.Begin_delTime"
            type="datetime">
          </el-date-picker> -
          <el-date-picker
            v-model="form.End_delTime"
            type="datetime">
          </el-date-picker>
      </el-form-item>

      <el-form-item label="调度点类型:">
        <el-select v-model="form.pointType" clearable placeholder="选择调度点类型" >
          <el-option
            v-for="(item,key) in pointTypeR"
            :key="key"
            :label="item"
            :value="key">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="调度点状态:">
        <el-select v-model="form.pointStatus" clearable placeholder="选择调度点状态" >
          <el-option
            v-for="(item,key) in pointStatusR"
            :key="key"
            :label="item"
            :value="key">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="车辆编号：">
        <el-input v-model="form.bicycle_info" class="smallWidth"></el-input>
      </el-form-item>

      <el-form-item label="地区id：">
        <el-input v-model="form.areaId" class="smallWidth"></el-input>
      </el-form-item>

      <el-button type="primary" @click="query">查询</el-button>
      <el-button type="primary" @click="exportFile">导出</el-button>

    </el-form>

    <el-table
      :data="tableData"
      stripe
      border
      style="width: 100%">
      <el-table-column
        width="100px"
        align="center"
        fixed="left"
        prop="name"
        label="运维姓名">
      </el-table-column>
      <el-table-column
        width="180px"
        align="center"
        prop="phone"
        label="运维电话">
      </el-table-column>
      <el-table-column
        width="100px"
        align="center"
        prop="driverName"
        label="司机姓名">
      </el-table-column>
      <el-table-column
        width="180px"
        align="center"
        prop="driverPhone"
        label="司机电话">
      </el-table-column>
      <el-table-column
        width="120px"
        align="center"
        prop="dispatchBikeNum"
        label="调度车辆数">
      </el-table-column>
      <el-table-column
        width="120px"
        align="center"
        prop="scrapBikeNum"
        label="报废车辆数">
      </el-table-column>
      <el-table-column
        width="180px"
        align="center"
        prop="addTime"
        label="添加时间段">
      </el-table-column>
      <el-table-column
        width="180px"
        align="center"
        prop="operateTime"
        label="调度开始时间段">
      </el-table-column>
      <el-table-column
        width="180px"
        align="center"
        prop="delTime"
        label="调度结束时间段">
      </el-table-column>
      <el-table-column
        width="120px"
        align="center"
        prop="pointTypeName"
        label="调度点类型">
      </el-table-column>
      <el-table-column
        width="120px"
        align="center"
        prop="pointStatusName"
        label="调度点状态">
      </el-table-column>
      <el-table-column
        width="180px"
        align="center"
        prop="bicycle_info"
        label="车辆编号">
      </el-table-column>
      <el-table-column
        width="100px"
        align="center"
        prop="areaId"
        label="地区id">
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
    <!--导出-->
    <el-dialog size='tiny' title="导出" :visible.sync="exportFormVisible" :show-close="false"
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
  import baseUrl from '../../utils/baseUrl.js'
  export default {
    data () {
      return {
        exportFormVisible: false,
        form: {}, // 查询字符串
        pointTypeR: {
          '1': '调度起点',
          '2': '调度终点',
          '3': '拉车起点',
          '4': '拉车终点'
        },
        pointStatusR: {
          '0': '未处理（未处理完成）',
          '1': '选定中',
          '2': '全部处理完'
        },
        exportParam: {},
        tableData: [
          {
            name: '运维姓名',
            phone: '15455452558',
            driverName: '司机姓名',
            driverPhone: '55522123666',
            dispatchBikeNum: 55,
            scrapBikeNum: 2,
            addTime: 1493899822000,
            operateTime: 1493899822000,
            delTime: 1493899822000,
            pointType: 1,
            pointStatus: 0,
            bicycle_info: '5555555555555',
            areaId: '上海'
          }
        ],
        pagination: {pageSizes: [30, 40, 60, 100], pageSize: 30, count: 0, pageNo: 1}
      }
    },
    created: function () {
      this.query()
    },
    methods: {
      handleSizeChange: function (val) {
        this.form.pageSize = val
        this.query()
      },
      handleCurrentChange: function (val) {
        this.form.index = val
        this.query()
      },
      handleIconClick (ev) {
        console.log(ev)
      },
      query: function () {},
      exportFile () {
        this.exportFormVisible = true
      },
      cancelExport () {
        this.exportFormVisible = false
      },
      exportCurrent () {
        this.exportParam.pageNo = this.pagination.pageNo
        this.exportParam.pageSize = this.pagination.pageSize
        this.$refs['FileForm'].setAttribute('action', `${baseUrl}/activity/enjoy/export`)
        this.$refs['FileForm'].submit()
        this.exportFormVisible = false
      },
      exportAll () {
        this.exportParam.pageSize = ''
        this.exportParam.pageNo = ''
        this.$refs['FileForm'].setAttribute('action', `${baseUrl}/activity/enjoy/exportAll`)
        this.$refs['FileForm'].submit()
        this.exportFormVisible = false
      }
    }
  }
</script>
<style scoped>
  @import '../../assets/css/common.css';
  .count {
    margin-top: 10px;
  }
.demo-form-inline{
  padding-left:10px;
}
</style>
