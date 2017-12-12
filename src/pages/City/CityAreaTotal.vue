<template>
  <div class="count">
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <el-tab-pane label="区域统计日报表列表" name="first"class="padding">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">

          <el-form-item label="行政区域：">
            <el-input
              :disabled="true"
              :on-icon-click="searchCompany"
              icon="search"
              v-model="formInline.attributionCompany">
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
              v-model="formInline.Begin_addTime"
              type="datetime">
            </el-date-picker> -
            <el-date-picker
              v-model="formInline.End_addTime"
              type="datetime">
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
        <!--模态框-->
        <el-dialog title="行政区域" size="tiny" :visible.sync="cityVisible" center>
          关键字：<input ref='keySearch' type='text' class='keySearch' v-model="filterText">
          <el-tree
            ref="tree2"
            highlight-current
            :data="select"
            :props="defaultProps"
            class="searchTree"
            accordion
            :filter-node-method="filterNode"
            @node-click="handleNode">
          </el-tree>
          <div slot="footer" class="dialog-footer">
            <el-button @click="modifyCancel">取 消</el-button>
            <el-button type="primary" @click="doModify">确 定</el-button>
          </div>
        </el-dialog>
      </el-tab-pane>
      <el-tab-pane label="区域统计图形报表" name="second">配置管理</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import baseUrl from '../../utils/baseUrl.js'

  export default {
    data () {
      return {
        activeName2: 'first',
        value6: '',
        select: '',
        cityVisible: false,
        filterText: '',
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
        }],
        select_city: [{
          id: 1,
          label: '上海市总公司',
          children: [{
            id: 2,
            label: '厦门分公司'
          }, {
            id: 3,
            label: '佛山分公司'
          }, {
            id: 4,
            label: '珠海分公司'
          }, {
            id: 5,
            label: '北京分公司'
          }, {
            id: 6,
            label: '上海分公司'
          }, {
            id: 7,
            label: '成都分公司'
          }, {
            id: 8,
            label: '湖州分公司'
          }, {
            id: 9,
            label: '深圳分公司'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        pagination: {pageSizes: [30, 40, 60, 100], pageSize: 30, count: 0, pageNo: 1}
      }
    },
    created: function () {
      this.query()
    },
    watch: {
      filterText (val) {
        this.$refs.tree2.filter(val)
      }
    },
    methods: {
      filterNode (value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
      handleNodeClick (data) {
        this.formInline.attributionCompany = data.label
      },
      handleNode (data) {
        this.filterText = data.label // 弹框树模型点击输入值
      },
      searchCompany () {
        this.cityVisible = true
        this.select = this.select_city
        this.filterText = ''
      },
      doModify () {
        this.formInline.attributionCompany = this.filterText
        this.cityVisible = false
      },
      modifyCancel () {
        this.cityVisible = false
        this.formInline.attributionCompany = ''
      },
      modifyOrder (val) {
        this.modifyRank = val
        var obj = this.modifyOrders.find(item => item.id === this.focusId)
        if (val !== undefined && val.trim() !== '') {
          if (this.focusRank === val) {  // 修改的值是原始的值
            // 判断该记录的id 是否已经存在
            if (obj !== undefined) {
              this.modifyOrders.pop(obj)
            }
          } else {
            if (obj !== undefined) {
              obj.rank = val
            } else {
              this.modifyOrders.push({'id': this.focusId, 'rank': val})
            }
          }
        } else {
          if (obj !== undefined) {
            this.modifyOrders.pop(obj)
          }
        }
      },
      handleClick () {},
      handleSizeChange (val) {
        this.formInline.pageSize = val
        this.query()
      },
      handleCurrentChange (val) {
        this.formInline.index = val
        this.query()
      },
      handleIconClick (ev) {
        console.log(ev)
      },
      query () {},
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
  .padding{
    padding-left:10px;
  }

</style>
