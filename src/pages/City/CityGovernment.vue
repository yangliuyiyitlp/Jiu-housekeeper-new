<template>
  <div>
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <el-tab-pane label="数据配置表" name="first">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <!--<el-form-item label="地区：">-->
          <!--<template>-->
          <!--<area-select  :level="2"  :placeholders='citySelect' size='small' type="text" v-model="selected"></area-select>-->
          <!--</template>-->
          <!--</el-form-item>-->
          <el-form-item label="地区：">
            <el-input
              :disabled=true
              :on-icon-click="searchCity"
              icon="search"
              v-model="formInline.cityName">
            </el-input>
          </el-form-item>
          <el-form-item label="时间段查询：">
            <el-date-picker
              v-model="formInline.startDate"
              @change="onStartDateChange"
              type="datetime">
            </el-date-picker>
            -
            <el-date-picker
              v-model="formInline.endDate"
              @change="onEndDateChange"
              type="datetime">
            </el-date-picker>
          </el-form-item>
          <el-form-item >
            <el-radio class="radio" v-model="formInline.status" label=2>已过期</el-radio>
            <el-radio class="radio" v-model="formInline.status" label=1>生效中</el-radio>
            <el-radio class="radio" v-model="formInline.status" label=0>待生效</el-radio>
          </el-form-item>
          <el-form-item v-if="hasPermission('city/government/view')">
            <el-button type="primary" @click="query">查询</el-button>
          </el-form-item>
          <el-form-item v-if="hasPermission('city/government/export')">
            <el-button type="primary" @click="exportForm">导出</el-button>
          </el-form-item>
          <el-form-item v-if="hasPermission('city/government/add')">
            <el-button type="primary" @click="addForm">新增</el-button>
          </el-form-item>
        </el-form>
        <!--隐藏表单用于文件导出-->
        <form style="display: none" action="" method="get" ref="FileForm">
          <input name="startDate" v-model="exportParam.startDate"/>
          <input name="endDate" v-model="exportParam.endDate"/>
          <input name="cityNo" v-model="exportParam.cityNo"/>
          <input name="status" v-model="exportParam.status"/>
          <input name="pageSize" v-model="exportParam.pageSize"/>
          <input name="pageNo" v-model="exportParam.pageNo"/>
        </form>
        <el-table
          :data="tableData"
          max-height="800"
          border
          style="width: 100%">
          <el-table-column
            prop="id"
            v-if="0"
            label="ID">
          </el-table-column>
          <el-table-column
            type="index"
            align="center"
            width="100"
            label="序号">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            width="120"
            prop="registeredUserAmount"
            label="注册用户数">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            width="120"
            prop="activeUserAmount"
            label="活跃用户数">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            width="120"
            prop="actualBicycleAmount"
            label="实际运营车辆数">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            width="120"
            prop="detainedBicycleAmount"
            label="被清收暂扣车辆数">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            width="120"
            show-overflow-tooltip
            prop="averageTurnoverRate"
            label="车辆平均周转率">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            width="120"
            show-overflow-tooltip
            prop="outsideAverageTurnoverRate"
            label="外环外平均周转率">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            width="120"
            show-overflow-tooltip
            prop="insideAverageTurnoverRate"
            label="外环内平均周转率">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            width="120"
            show-overflow-tooltip
            prop="actualDailyUse"
            label="实际运营车辆日均使用人次">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            width="120"
            show-overflow-tooltip
            prop="breakBikePercentage"
            label="损坏维修车辆比例">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            width="120"
            show-overflow-tooltip
            prop="scrapBikePercentage"
            label="报废回收车辆比例">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            width="120"
            show-overflow-tooltip
            prop="autonomouslyCleanPercentage"
            label="自主清理车辆比例">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            width="120"
            show-overflow-tooltip
            prop="repairPointAmount"
            label="维修保养场点数量">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            width="120"
            show-overflow-tooltip
            prop="transitPointAmount"
            label="中转储备场点数量">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            width="120"
            show-overflow-tooltip
            prop="approvedBikeAmount"
            label="车辆区域核定数量">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            width="120"
            show-overflow-tooltip
            prop="effectiveDate"
            label="生效日期">
          </el-table-column>
          <el-table-column
            v-if="hasPermission('city/government/update')"
            header-align="center"
            align="center"
            label="操作">
            <template slot-scope="scope">
              <el-button @click="modifyRecord(scope.row.id)" type="text" size="small">修改</el-button>
            </template>
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
      </el-tab-pane>
      <el-tab-pane label="数据配置" name="second" class="secondForm">
        <!--<el-form  class="demo-form-inline" ref="form" :model="addPlanRoute">-->
        <!--<el-form-item label="地区：">-->
        <!--<a>{{cityName}}</a>&nbsp;<i class="el-icon-search" @click="searchArea"></i>-->
        <!--</el-form-item>-->

        <!--<el-table-->
        <!--:data="addPlanRoute"-->
        <!--max-height="800"-->
        <!--border-->
        <!--style="width: 100%">-->
        <!--<el-table-column-->
        <!--prop="id"-->
        <!--v-if="0"-->
        <!--label="ID">-->
        <!--</el-table-column>-->
        <!--<el-table-column property="order2" label="项目描述" align="center">-->
        <!--<template slot-scope="scope">-->
        <!--<el-input v-model="scope.row.no" disabled ></el-input>-->
        <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column property="order2" label="填报信息" align="center">-->
        <!--<template slot-scope="scope">-->
        <!--<el-input v-model="scope.row.info" ></el-input>-->
        <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column property="order2" label="备注" align="center">-->
        <!--<template slot-scope="scope">-->
        <!--<el-input v-model="scope.row.remarks" ></el-input>-->
        <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-input v-model="addPlanRoute.id" ></el-input>-->
        <!--</el-table>-->
        <!--</el-form>-->
        <label>地区：</label>{{cityName}}&nbsp;<i class="el-icon-search"@click="searchArea"></i><br><br>
        <el-form ref="addPlanRoute" class="addPlanRoute" :model="addPlanRoute">
          <!--<el-form-item label="地区：" prop="cityName">-->
            <!--<el-input v-model="cityName"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="地区：">-->
            <!--<el-input-->
              <!--:disabled=true-->
              <!--:on-icon-click="searchCity"-->
              <!--icon="search"-->
              <!--v-model="formInline.cityName">-->
            <!--</el-input>-->
          <!--</el-form-item>-->
          <input v-if="0" v-model="addPlanRoute.id">
          <label class="lab">项目描述</label><label class="labLeft">填报信息</label><label class="labLeft">备注</label><br>
          <label class="lab">注册用户数量</label><input v-model="addPlanRoute.registeredUserAmount"><input
          v-model="addPlanRoute.registeredUserAmountR"><br>
          <label class="lab">活跃用户数</label><input v-model="addPlanRoute.activeUserAmount"><input
          v-model="addPlanRoute.activeUserAmountR"><br>
          <label class="lab">实际运营车辆数</label><input v-model="addPlanRoute.actualBicycleAmount"><input
          v-model="addPlanRoute.actualBicycleAmountR"><br>
          <label class="lab">被清收暂扣车辆数</label><input v-model="addPlanRoute.detainedBicycleAmount"><input
          v-model="addPlanRoute.detainedBicycleAmountR"><br>
          <label class="lab">车辆平均周转率</label><input v-model="addPlanRoute.averageTurnoverRate"><input
          v-model="addPlanRoute.averageTurnoverRateR"><br>
          <label class="lab">外环外平均周转率</label><input v-model="addPlanRoute.outsideAverageTurnoverRate"><input
          v-model="addPlanRoute.outsideAverageTurnoverRateR"><br>
          <label class="lab">外环内平均周转率</label><input v-model="addPlanRoute.insideAverageTurnoverRate"><input
          v-model="addPlanRoute.insideAverageTurnoverRateR"><br>
          <label class="lab">实际运营车辆日均使用人次</label><input v-model="addPlanRoute.actualDailyUse"><input
          v-model="addPlanRoute.actualDailyUseR"><br>
          <label class="lab">损坏维修车辆比例</label><input v-model="addPlanRoute.breakBikePercentage"><input
          v-model="addPlanRoute.breakBikePercentageR"><br>
          <label class="lab">报废回收车辆比例</label><input v-model="addPlanRoute.scrapBikePercentage"><input
          v-model="addPlanRoute.scrapBikePercentageR"><br>
          <label class="lab">自主清理车辆比例</label><input v-model="addPlanRoute.autonomouslyCleanPercentage"><input
          v-model="addPlanRoute.autonomouslyCleanPercentageR"><br>
          <label class="lab">维修保养场点数量</label><input v-model="addPlanRoute.repairPointAmount"><input
          v-model="addPlanRoute.repairPointAmountR"><br>
          <label class="lab">中转储备场点数量</label><input v-model="addPlanRoute.transitPointAmount"><input
          v-model="addPlanRoute.transitPointAmountR"><br>
          <label class="lab">车辆区域核定数量</label><input v-model="addPlanRoute.approvedBikeAmount"><input
          v-model="addPlanRoute.approvedBikeAmountR"><br>
          <label class="lab labBottom">生效日期</label><input class='labBottom' v-model="addPlanRoute.effectiveDate"><input
          class='labBottom' v-model="addPlanRoute.effectiveDateR"><br>
          <el-button type="primary" @click="submitForm" class="submit">{{title}}</el-button>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <!--模态框-->
    <el-dialog title="城市" size="tiny" :visible.sync="cityVisible" center>
      关键字：<input ref='keySearch' type='text' class='keySearch' v-model="filterText">
      <el-tree
        :data="select"
        default-expand-all
        node-key="id"
        :default-checked-keys="checkedCity"
        ref="tree"
        class="treeWidth"
        accordion
        :filter-node-method="filterNode"
        @node-click="handleNode"
        :props="defaultProps">
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="modifyCancel">取 消</el-button>
        <el-button type="primary" @click="doModify">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import a from '../../assets/js/getsessionId.js'
  import baseUrl from '../../utils/baseUrl'

  export default {
    data () {
      return {
        title: '新增',
        activeName2: 'first',
        exportFormVisible: false,
        cityVisible: false,
        filterText: '',
        cityName: '',
        checkedCity: [],
        select: [{'id': '-1', 'name': '全国', 'children': []}],
        cityNo: '',
        tableData: [],
        addPlanRoute: {},
        exportParam: {},
        setForm: {},
        formInline: {
          pageNo: 1,
          pageSize: 30
        },
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        pagination: {pageSizes: [30, 40, 60, 100], pageSize: 30, count: 0, pageNo: 1},
        adminId: '',
        path: '',
        permissionList: ['city/government/view', 'city/government/export', 'city/government/add', 'city/government/update']
      }
    },
    created () {
      // 请求按钮权限
      this.adminId = this.$route.query.adminId
      this.path = this.$route.path
      a.sessionId(this.adminId, this.path, this.$router, this.$ajax, this.permissionList)
//      this.query()
    },
    watch: {
      filterText (val) {
        this.$refs.tree.filter(val)
      }
    },
    methods: {
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
      onStartDateChange (val) {
//        this.formInline.startDate = new Date(val).getTime()
        this.formInline.startDate = val
      },
      onEndDateChange (val) {
//        this.formInline.endDate = new Date(val).getTime()
        this.formInline.endDate = val
      },
      hasPermission (data) {
        if (this.permissionList && this.permissionList.length && this.permissionList.includes(data)) {
          return true
        }
        return false
      },
      handleClick () {
        this.formInline = {}
        if (this.activeName2 = 'second') {
          this.cityName = ''
          this.cityNo = ''
          this.addPlanRoute={}
          this.title = '新增'
        }
      },
      query () {
        this.exportParam.startDate = this.formInline.startDate
        this.exportParam.endDate = this.formInline.endDate
        this.formInline.cityNo = this.cityNo
        this.$ajax.get(`${baseUrl.cityDocking}/cityDocking/pseudo/list`, {params: this.formInline})
          .then((res) => {
            if (res.data.code === 0) {
              this.tableData = res.data.data.result
              this.pagination.count =  res.data.data.total
            } else {
              this.$message('获取列表失败')
            }
          })
          .catch(() => {
            this.$message.error('获取列表异常')
          })
      },
      modifyRecord (id) {
        this.activeName2 = 'second'
        this.title = '提交修改'
        this.getMore(id)
      },
      getMore (id) {
        this.$ajax.get(`${baseUrl.cityDocking}/remind/one`, {params: {id: id}})
          .then(res => {
            if (res.data.code === 0) {
              this.cityName = res.data.data.cityName
              this.cityNo = res.data.data.cityNo
              let result = res.data.data
              for (let i = 0; i < result.length; i++) {

              }
            } else {
              this.$message('查询详情失败')
            }
          }).catch(() => {
          this.$message.error('查询详情异常')
        })
      },
      addForm () {
        this.activeName2 = 'second'
        this.title = '新增'
        this.addPlanRoute = {}
        this.cityName = ''
      },
      submitForm () {
        console.log(9696,this.addPlanRoute)
        this.addPlanRoute.cityNo = this.cityNo
        this.$ajax.get(`${baseUrl.cityDocking}/cityDocking/pseudo/save`, this.addPlanRoute)
          .then(res => {
            if (res.data.code === 0) {
              this.$message.success('提交成功')
              this.activeName2='first'
              this.query()
            } else {
              this.$message('提交失败')
            }
          }).catch(() => {
          this.$message.error('提交异常')
        })
//        this.$refs['addPlanRoute'].setAttribute('action', `${baseUrl.cityDocking}/cityDocking/pseudo/save`)
//        this.$refs['addPlanRoute'].submit()
      },
      exportForm () {
        this.$confirm('确定导出么?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(this.exportParam)
          this.exportParam.pageNo = ''
          this.exportParam.pageSize = ''
          this.$refs['FileForm'].setAttribute('action', `${baseUrl.cityFencingUrl}/exportAll `)
          this.$refs['FileForm'].submit()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消导出'
          })
        })
      },
      // 全局城市树模型开始
      // 全局获取城市对应关系
      getCityRelation () {
        this.$ajax.get(`${baseUrl.ActivityArea}/electric/userUtilsInterface/interface/getBikeAreaList`)
          .then(res => {
            if (res.data.code === 0) {
              let bikeAreaList = res.data.bikeAreaList
              for (let i = 0; i < bikeAreaList.length; i++) {
                this.select[0].children.push(bikeAreaList[i])
              }
            } else {
              this.$message('城市列表获取失败')
            }
          })
          .catch(err => {
            this.$message.error('城市列表获取异常')
          })
      },
      filterNode (value, data) {
        if (!value) return true
        return data.name.indexOf(value) !== -1
      },
      handleNode (data) {
        this.filterText = data.name // 弹框树模型点击输入值
        this.cityNo = Number(data.id)
      },
      doModify () {
        this.cityName = this.filterText
        this.formInline.cityName = this.filterText
        this.cityVisible = false
      },
      modifyCancel () {
        this.cityVisible = false
        this.formInline.cityName = ''
        this.cityName = ''
        this.cityNo = ''
      },
      searchCity () {
        this.cityVisible = true
        this.filterText = ''
      },
      searchArea () {
        this.cityVisible = true
        this.filterText = ''
      }
    }
  }
</script>
<style scoped>
  html, body {
    height: 100%;
  }

  .demo-form-inline {
    padding-left: 10px;
  }

  .submit {
    margin-top: 20px;
    float: right;
  }
.area{
  width:150px;
}
  .secondForm {
    width: 760px;
    left: 50%;
    margin-top: 100px;
    margin-left: -380px;
    position: relative;
  }

  .lab, .labLeft {
    vertical-align: top;
    display: inline-block;
    width: 250px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #ccc;
    border-bottom: 0;
  }

  .labLeft {
    border-left: 0;
  }

  .addPlanRoute input {
    vertical-align: top;
    width: 250px;
    height: 28px;
    line-height: 28;
    text-align: center;
    border: 1px solid #ccc;
    border-bottom: 0;
    border-left: 0;
  }

  .labBottom {
    border-bottom: 1px solid #ccc !important;
  }
</style>
