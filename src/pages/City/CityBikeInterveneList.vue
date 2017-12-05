<template>
  <div class="count">
    <el-form :inline="true" :model="form" class="demo-form-inline">

      <el-form-item label="运维姓名：">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="运维电话：">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>

      <el-form-item label="司机姓名：">
        <el-input v-model="form.driverName"></el-input>
      </el-form-item>

      <el-form-item label="司机电话：">
        <el-input v-model="form.driverPhone"></el-input>
      </el-form-item>

      <el-form-item label="调度车辆数：">
        <el-col :span="11">
          <el-input v-model="form.dispatchBikeNumMin"></el-input>
        </el-col>
        <el-col class="line" :span="1" style="text-align: center">-</el-col>
        <el-col :span="11">
          <el-input v-model="form.dispatchBikeNumMax"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="报废车辆数：">
        <el-col :span="11">
          <el-input v-model="form.scrapBikeNumMin"></el-input>
        </el-col>
        <el-col class="line" :span="1" style="text-align: center">-</el-col>
        <el-col :span="11">
          <el-input v-model="form.scrapBikeNumMax"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="添加时间段：">
        <el-col :span="11">
          <el-date-picker
            v-model="form.Begin_addTime"
            type="datetime"
            placeholder="begin time">
          </el-date-picker>
        </el-col>
        <el-col class="line" :span="1" style="text-align: center">-</el-col>
        <el-col :span="11">
          <el-date-picker
            v-model="form.End_addTime"
            type="datetime"
            placeholder="end time">
          </el-date-picker>
        </el-col>
      </el-form-item>

      <el-form-item label="调度开始时间段：">
        <el-col :span="11">
          <el-date-picker
            v-model="form.Begin_operateTime"
            type="datetime"
            placeholder="begin time">
          </el-date-picker>
        </el-col>
        <el-col class="line" :span="1" style="text-align: center">-</el-col>
        <el-col :span="11">
          <el-date-picker
            v-model="form.End_operateTime"
            type="datetime"
            placeholder="end time">
          </el-date-picker>
        </el-col>
      </el-form-item>

      <el-form-item label="调度结束时间段：">
        <el-col :span="11">
          <el-date-picker
            v-model="form.Begin_delTime"
            type="datetime"
            placeholder="begin time">
          </el-date-picker>
        </el-col>
        <el-col class="line" :span="1" style="text-align: center">-</el-col>
        <el-col :span="11">
          <el-date-picker
            v-model="form.End_delTime"
            type="datetime"
            placeholder="end time">
          </el-date-picker>
        </el-col>
      </el-form-item>

      <el-form-item label="调度点类型:">
        <el-select v-model="form.pointType" clearable placeholder="选择调度点类型">
          <el-option
            v-for="(item,key) in pointTypeR"
            :key="key"
            :label="item"
            :value="key">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="调度点状态:">
        <el-select v-model="form.pointStatus" clearable placeholder="选择调度点状态">
          <el-option
            v-for="(item,key) in pointStatusR"
            :key="key"
            :label="item"
            :value="key">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="车辆编号：">
        <el-input v-model="form.bicycle_info"></el-input>
      </el-form-item>

      <el-form-item label="地区id：">
        <el-input v-model="form.areaId"></el-input>
      </el-form-item>

      <el-button type="primary" @click="search">查询</el-button>
      <el-button type="primary" @click="onExport">导出</el-button>

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

  </div>
</template>
<script>
  import Tools from '../../utils/tools.js'
  import Moment from 'moment'

  export default {
    data () {
      return {
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
          }, {
            name: '运维姓名',
            phone: '15455452558',
            driverName: '司机姓名',
            driverPhone: '55522123666',
            dispatchBikeNum: 55,
            scrapBikeNum: 2,
            addTime: 1493899822000,
            operateTime: 1493899822000,
            delTime: 1493899822000,
            pointType: 2,
            pointStatus: 1,
            bicycle_info: '5555555555555',
            areaId: '上海'
          }, {
            name: '运维姓名',
            phone: '15455452558',
            driverName: '司机姓名',
            driverPhone: '55522123666',
            dispatchBikeNum: 55,
            scrapBikeNum: 2,
            addTime: 1493899822000,
            operateTime: 1493899822000,
            delTime: 1493899822000,
            pointType: 3,
            pointStatus: 2,
            bicycle_info: '5555555555555',
            areaId: '上海'
          },
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
          }, {
            name: '运维姓名',
            phone: '15455452558',
            driverName: '司机姓名',
            driverPhone: '55522123666',
            dispatchBikeNum: 55,
            scrapBikeNum: 2,
            addTime: 1493899822000,
            operateTime: 1493899822000,
            delTime: 1493899822000,
            pointType: 2,
            pointStatus: 1,
            bicycle_info: '5555555555555',
            areaId: '上海'
          }, {
            name: '运维姓名',
            phone: '15455452558',
            driverName: '司机姓名',
            driverPhone: '55522123666',
            dispatchBikeNum: 55,
            scrapBikeNum: 2,
            addTime: 1493899822000,
            operateTime: 1493899822000,
            delTime: 1493899822000,
            pointType: 3,
            pointStatus: 2,
            bicycle_info: '5555555555555',
            areaId: '上海'
          }
        ],
        pagination: {pageSizes: [10, 20, 50, 100], pageSize: 10, total: 0, index: 1}
      }
    },
    created: function () {
      this.search()
    },
    methods: {
      // 2017-11-27 未完成待续
      search () {
//        this.$ajax.get('/city/bike/intervene/list', {params: this.form})
//          .then(res => {
//            console.log(res)
//          })
//          .catch(err => {
//            console.log(err)
//          })
        let list = this.tableData
        for (let i = 0; i < list.length; i++) {
          list[i].pointTypeName = Tools.k2value(this.pointTypeR, list[i].pointType)
          list[i].pointStatusName = Tools.k2value(this.pointStatusR, list[i].pointStatus)
          list[i].addTime = Moment(new Date(list[i].addTime)).format('YYYY-MM-DD HH:mm:ss')
          list[i].operateTime = Moment(new Date(list[i].operateTime)).format('YYYY-MM-DD HH:mm:ss')
          list[i].delTime = Moment(new Date(list[i].delTime)).format('YYYY-MM-DD HH:mm:ss')
        }
        console.log(this.tableData)
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
      }
    }
  }
</script>
<style scoped>
  .count {
    margin-top: 10px;
  }
.demo-form-inline{
  padding-left:10px;
}
</style>
