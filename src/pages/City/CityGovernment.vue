<template>
  <div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="数据配置表" name="first" >
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="地区：">
            <el-input
              :disabled=true
              :on-icon-click="searchCity"
              icon="search"
              v-model="formInline.cityName">
            </el-input>
          </el-form-item>
          <el-input v-model="formInline.cityNo" v-if="0"></el-input>
          <el-form-item>
            <el-radio class="radio" v-model="formInline.status" label=2>已过期</el-radio>
            <el-radio class="radio" v-model="formInline.status" label=1>生效中</el-radio>
            <el-radio class="radio" v-model="formInline.status" label=0>待生效</el-radio>
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

          <el-form-item v-if="hasPermission('city/government/view')">
            <el-button type="primary" @click="query">查询</el-button>
          </el-form-item>
          <el-form-item v-if="hasPermission('city/government/export')">
            <el-button type="primary" @click="exportFormDate">导出</el-button>
          </el-form-item>
          <el-form-item v-if="hasPermission('city/government/add')">
            <el-button type="primary" @click="addForm">新增</el-button>
          </el-form-item>
        </el-form>
        <!--隐藏表单用于文件导出-->
        <form v-show="0" action="" method="get" ref="FileForm">
          <input name="startDate" v-model="exportParam.startDate"/>
          <input name="endDate" v-model="exportParam.endDate"/>
          <input name="cityNo" v-model="exportParam.cityNo"/>
          <input name="status" v-model="exportParam.status"/>
          <input name="pageSize" v-model="exportParam.pageSize"/>
          <input name="pageNo" v-model="exportParam.pageNo"/>
        </form>
        <el-table
          :data="tableData"
          max-height="700"
          border
          style="width: 100%">
          <el-table-column
            prop="id"
            v-if="0"
            label="ID">
          </el-table-column>
          <el-table-column
            fixed
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
            width="100"
            fixed="right"
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
        <el-form ref="addPlanRoute" class="addPlanRoute" :model="addPlanRoute">
          <label>地区：</label>{{addPlanRoute.cityName}}&nbsp;<i class="el-icon-search" @click="searchArea"></i><br><br>
          <input v-if="0" v-model="addPlanRoute.cityNo">
          <input v-if="0" v-model="addPlanRoute.id">
          <label class="lab">项目描述</label><label class="labLeft">填报信息</label><label class="labLeft">备注</label><br>
          <label class="lab">注册用户数量</label><input  v-model="addPlanRoute.registeredUserAmount" placeholder="只能输入整数"><input v-model="addPlanRoute.registeredUserAmountR"><br>
          <label class="lab">活跃用户数</label><input  v-model="addPlanRoute.activeUserAmount" placeholder="只能输入整数"><input v-model="addPlanRoute.activeUserAmountR"><br>
          <label class="lab">实际运营车辆数</label><input  v-model="addPlanRoute.actualBicycleAmount" placeholder="只能输入整数"><input v-model="addPlanRoute.actualBicycleAmountR"><br>
          <label class="lab">被清收暂扣车辆数</label><input  v-model="addPlanRoute.detainedBicycleAmount" placeholder="只能输入整数"><input v-model="addPlanRoute.detainedBicycleAmountR"><br>
          <label class="lab">车辆平均周转率</label><input   v-model="addPlanRoute.averageTurnoverRate" placeholder="只能输入整数或小数"><input v-model="addPlanRoute.averageTurnoverRateR"><br>
          <label class="lab">外环外平均周转率</label><input  v-model="addPlanRoute.outsideAverageTurnoverRate" placeholder="只能输入整数或小数"><input v-model="addPlanRoute.outsideAverageTurnoverRateR"><br>
          <label class="lab">外环内平均周转率</label><input  v-model="addPlanRoute.insideAverageTurnoverRate" placeholder="只能输入整数或小数"><input v-model="addPlanRoute.insideAverageTurnoverRateR"><br>
          <label class="lab">实际运营车辆日均使用人次</label><input  v-model="addPlanRoute.actualDailyUse" placeholder="只能输入整数或小数"><input v-model="addPlanRoute.actualDailyUseR"><br>
          <label class="lab">损坏维修车辆比例</label><input  v-model="addPlanRoute.breakBikePercentage" placeholder="只能输入整数或小数(0-100)"><input v-model="addPlanRoute.breakBikePercentageR"><br>
          <label class="lab">报废回收车辆比例</label><input v-model="addPlanRoute.scrapBikePercentage" placeholder="只能输入整数或小数(0-100)"><input v-model="addPlanRoute.scrapBikePercentageR"><br>
          <label class="lab">自主清理车辆比例</label><input v-model="addPlanRoute.autonomouslyCleanPercentage" placeholder="只能输入整数或小数(0-100)"><input v-model="addPlanRoute.autonomouslyCleanPercentageR"><br>
          <label class="lab">维修保养场点数量</label><input  v-model="addPlanRoute.repairPointAmount" placeholder="只能输入整数"><input v-model="addPlanRoute.repairPointAmountR"><br>
          <label class="lab">中转储备场点数量</label><input  v-model="addPlanRoute.transitPointAmount" placeholder="只能输入整数"><input v-model="addPlanRoute.transitPointAmountR"><br>
          <label class="lab">车辆区域核定数量</label><input  v-model="addPlanRoute.approvedBikeAmount" placeholder="只能输入整数"><input v-model="addPlanRoute.approvedBikeAmountR"><br>

          <!--<label class="lab">注册用户数量</label><input onkeyup="value=value.replace(/[^\d]/g,'')" v-model="addPlanRoute.registeredUserAmount" placeholder="只能输入整数"><input v-model="addPlanRoute.registeredUserAmountR"><br>-->
          <!--<label class="lab">活跃用户数</label><input onkeyup="value=value.replace(/[^\d]/g,'')" v-model="addPlanRoute.activeUserAmount" placeholder="只能输入整数"><input v-model="addPlanRoute.activeUserAmountR"><br>-->
          <!--<label class="lab">实际运营车辆数</label><input onkeyup="value=value.replace(/[^\d]/g,'')" v-model="addPlanRoute.actualBicycleAmount" placeholder="只能输入整数"><input v-model="addPlanRoute.actualBicycleAmountR"><br>-->
          <!--<label class="lab">被清收暂扣车辆数</label><input onkeyup="value=value.replace(/[^\d]/g,'')" v-model="addPlanRoute.detainedBicycleAmount" placeholder="只能输入整数"><input v-model="addPlanRoute.detainedBicycleAmountR"><br>-->
          <!--<label class="lab">车辆平均周转率</label><input  onkeyup="value=value.replace(/[^\-?\d.]/g,'')" v-model="addPlanRoute.averageTurnoverRate" placeholder="只能输入整数或小数"><input v-model="addPlanRoute.averageTurnoverRateR"><br>-->
          <!--<label class="lab">外环外平均周转率</label><input onkeyup="value=value.replace(/[^\-?\d.]/g,'')" v-model="addPlanRoute.outsideAverageTurnoverRate" placeholder="只能输入整数或小数"><input v-model="addPlanRoute.outsideAverageTurnoverRateR"><br>-->
          <!--<label class="lab">外环内平均周转率</label><input onkeyup="value=value.replace(/[^\-?\d.]/g,'')" v-model="addPlanRoute.insideAverageTurnoverRate" placeholder="只能输入整数或小数"><input v-model="addPlanRoute.insideAverageTurnoverRateR"><br>-->
          <!--<label class="lab">实际运营车辆日均使用人次</label><input onkeyup="value=value.replace(/[^\-?\d.]/g,'')" v-model="addPlanRoute.actualDailyUse" placeholder="只能输入整数或小数"><input v-model="addPlanRoute.actualDailyUseR"><br>-->
          <!--<label class="lab">损坏维修车辆比例</label><input  onkeyup="value=value.replace(/[^\-?\d.]/g,'')" v-model="addPlanRoute.breakBikePercentage" placeholder="只能输入整数或小数(0-100)"><input v-model="addPlanRoute.breakBikePercentageR"><br>-->
          <!--<label class="lab">报废回收车辆比例</label><input onkeyup="value=value.replace(/[^\-?\d.]/g,'')" v-model="addPlanRoute.scrapBikePercentage" placeholder="只能输入整数或小数(0-100)"><input v-model="addPlanRoute.scrapBikePercentageR"><br>-->
          <!--<label class="lab">自主清理车辆比例</label><input onkeyup="value=value.replace(/[^\-?\d.]/g,'')" v-model="addPlanRoute.autonomouslyCleanPercentage" placeholder="只能输入整数或小数(0-100)"><input v-model="addPlanRoute.autonomouslyCleanPercentageR"><br>-->
          <!--<label class="lab">维修保养场点数量</label><input onkeyup="value=value.replace(/[^\d]/g,'')" v-model="addPlanRoute.repairPointAmount" placeholder="只能输入整数"><input v-model="addPlanRoute.repairPointAmountR"><br>-->
          <!--<label class="lab">中转储备场点数量</label><input onkeyup="value=value.replace(/[^\d]/g,'')" v-model="addPlanRoute.transitPointAmount" placeholder="只能输入整数"><input v-model="addPlanRoute.transitPointAmountR"><br>-->
          <!--<label class="lab">车辆区域核定数量</label><input onkeyup="value=value.replace(/[^\d]/g,'')" v-model="addPlanRoute.approvedBikeAmount" placeholder="只能输入整数"><input v-model="addPlanRoute.approvedBikeAmountR"><br>-->
          <label class="lab labBottom">生效日期</label>
          <el-date-picker
            v-model="addPlanRoute.effectiveDate"
            @change="effectiveDateChange"
            type="datetime">
          </el-date-picker>
          <input class='labBottom' v-model="addPlanRoute.effectiveDateR"><br>
          <el-button type="primary" @click="submitForm" class="submit">{{title}}</el-button>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <!--模态框-->
    <el-dialog title="城市" size="tiny" :visible.sync="cityVisible" center>
      关键字：<input ref='keySearch' type='text' class='keySearch' v-model="filterText">
      <el-tree
        :data="select"
        node-key="id"
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
    <el-dialog title="城市" size="tiny" :visible.sync="areaVisible" center>
      关键字：<input ref='keySearch' type='text' class='keySearch' v-model="filterText">
      <el-tree
        :data="select"
        node-key="id"
        ref="tree"
        class="treeWidth"
        accordion
        :filter-node-method="filterNode"
        @node-click="handleNode"
        :props="defaultProps">
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="areaCancel">取 消</el-button>
        <el-button type="primary" @click="areaModify">确 定</el-button>
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
        activeName: 'first',
        cityVisible: false,
        areaVisible: false,
        filterText: '',
        cityName: '',
        select: [],
        cityNo: '',
        tableData: [],
        addPlanRoute: {
          registeredUserAmount:'',
          activeUserAmount:'',
          detainedBicycleAmount:'',
          actualBicycleAmount:'',
          averageTurnoverRate:'',
          outsideAverageTurnoverRate:'',
          insideAverageTurnoverRate:'',
          actualDailyUse:'',
          breakBikePercentage:'',
          scrapBikePercentage:'',
          autonomouslyCleanPercentage:'',
          repairPointAmount:'',
          transitPointAmount:'',
          approvedBikeAmount:''
        },
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
        permissionList: []
      }
    },
    created () {
      // 请求按钮权限
      this.adminId = this.$route.query.adminId
      this.path = this.$route.path
      a.sessionId(this.adminId, this.path, this.$router, this.$ajax, this.permissionList)
      this.getCityRelation()
    },
    computed: {
      registeredUserAmount () {
        return this.addPlanRoute.registeredUserAmount
      },
      activeUserAmount () {
        return this.addPlanRoute.activeUserAmount
      },
      actualBicycleAmount () {
        return this.addPlanRoute.actualBicycleAmount
      },
      detainedBicycleAmount () {
        return this.addPlanRoute.detainedBicycleAmount
      },
      averageTurnoverRate () {
        return this.addPlanRoute.averageTurnoverRate
      },
      outsideAverageTurnoverRate () {
        return this.addPlanRoute.outsideAverageTurnoverRate
      },
      insideAverageTurnoverRate () {
        return this.addPlanRoute.insideAverageTurnoverRate
      },
      actualDailyUse () {
        return this.addPlanRoute.actualDailyUse
      },
      breakBikePercentage () {
        return this.addPlanRoute.breakBikePercentage
      },
      scrapBikePercentage () {
        return this.addPlanRoute.scrapBikePercentage
      },
      autonomouslyCleanPercentage () {
        return this.addPlanRoute.autonomouslyCleanPercentage
      },
      repairPointAmount () {
        return this.addPlanRoute.repairPointAmount
      },
      transitPointAmount () {
        return this.addPlanRoute.transitPointAmount
      },
      approvedBikeAmount () {
        return this.addPlanRoute.approvedBikeAmount
      }
    },
    watch: {
      filterText (val) {
        this.$refs.tree.filter(val)
      },
//      addPlanRoute:{
//        handler (val) {
//          this.addPlanRoute.registeredUserAmount = watchOptions(val)
//        },
//        deep: true
//      }
      registeredUserAmount (val, old) {
        this.addPlanRoute.registeredUserAmount = watchOptions (val)
      },
      activeUserAmount (val, old) {
        this.addPlanRoute.activeUserAmount = watchOptions (val)
      },
      actualBicycleAmount (val, old) {
        this.addPlanRoute.actualBicycleAmount = watchOptions (val)
      },
      detainedBicycleAmount (val, old) {
        this.addPlanRoute.detainedBicycleAmount = watchOptions (val)
      },
      averageTurnoverRate (val, old) {
//        this.addPlanRoute.averageTurnoverRate = watchFloat(val)
        this.addPlanRoute.averageTurnoverRate = watchFloat (val)
      },
      outsideAverageTurnoverRate (val, old) {
        this.addPlanRoute.outsideAverageTurnoverRate = watchFloat (val)
      },
      insideAverageTurnoverRate (val, old) {
        this.addPlanRoute.insideAverageTurnoverRate = watchFloat (val)
      },
      actualDailyUse (val, old) {
        this.addPlanRoute.actualDailyUse = watchFloat (val)
      },
      breakBikePercentage (val, old) {
        this.addPlanRoute.breakBikePercentage = watchFloat (val)
      },
      scrapBikePercentage (val, old) {
        this.addPlanRoute.scrapBikePercentage = watchFloat (val)
      },
      autonomouslyCleanPercentage (val, old) {
        this.addPlanRoute.autonomouslyCleanPercentage = watchFloat (val)
      },
      repairPointAmount (val, old) {
        this.addPlanRoute.repairPointAmount = watchOptions (val)
      },
      transitPointAmount (val, old) {
        this.addPlanRoute.transitPointAmount = watchOptions (val)
      },
      approvedBikeAmount (val, old) {
        this.addPlanRoute.approvedBikeAmount = watchOptions (val)
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
      effectiveDateChange (val) {
        this.addPlanRoute.effectiveDate = val
      },
      hasPermission (data) {
        if (this.permissionList && this.permissionList.length && this.permissionList.includes(data)) {
          return true
        }
        return false
      },
      handleClick () {
        this.formInline={}
        console.log(this.activeName)
        if (this.activeName === 'second') {
          this.cityName = ''
          this.cityNo = ''
          this.addPlanRoute = { registeredUserAmount:'',
            activeUserAmount:'',
            detainedBicycleAmount:'',
            actualBicycleAmount:'',
            averageTurnoverRate:'',
            outsideAverageTurnoverRate:'',
            insideAverageTurnoverRate:'',
            actualDailyUse:'',
            breakBikePercentage:'',
            scrapBikePercentage:'',
            autonomouslyCleanPercentage:'',
            repairPointAmount:'',
            transitPointAmount:'',
            approvedBikeAmount:''}
          this.title = '新增'
        }
      },
      query () {
        this.exportParam.startDate = this.formInline.startDate
        this.exportParam.endDate = this.formInline.endDate
        this.exportParam.status = this.formInline.status
        this.exportParam.cityNo = this.formInline.cityNo
        this.$ajax.get(`${baseUrl.cityDocking}/cityDocking/list`, {params: this.formInline})
          .then((res) => {
            if (res.data.code === 0) {
              if(res.data.data.result.length<=0){
                this.$message.warning('未找到符合条件的数据')
              }
              this.tableData = res.data.data.result
              this.pagination.count = res.data.data.total
            } else {
              this.$message('获取列表失败')
            }
          })
          .catch(() => {
            this.$message.error('获取列表异常')
          })
      },
      modifyRecord (id) {
        this.activeName = 'second'
        this.title = '提交修改'
        this.getMore(id)
      },
      getMore (id) {
        this.$ajax.get(`${baseUrl.cityDocking}/cityDocking/get`, {params: {id: id}})
          .then(res => {
            if (res.data.code === 0) {
              this.cityName = res.data.data.cityName
              this.cityNo = res.data.data.cityNo
              this.addPlanRoute = res.data.data
               for(let k in this.addPlanRoute){
                 this.addPlanRoute[k]=String(this.addPlanRoute[k])
               }
            } else {
              this.$message('查询详情失败')
            }
          }).catch(() => {
          this.$message.error('查询详情异常')
        })
      },
      addForm () {
        this.activeName = 'second'
        this.title = '新增'
        this.addPlanRoute = { registeredUserAmount:'',
          activeUserAmount:'',
          detainedBicycleAmount:'',
          actualBicycleAmount:'',
          averageTurnoverRate:'',
          outsideAverageTurnoverRate:'',
          insideAverageTurnoverRate:'',
          actualDailyUse:'',
          breakBikePercentage:'',
          scrapBikePercentage:'',
          autonomouslyCleanPercentage:'',
          repairPointAmount:'',
          transitPointAmount:'',
          approvedBikeAmount:''}
        this.cityName = ''
        this.cityNo = null
      },
      submitForm () {
        console.log(9696, this.addPlanRoute)
        if(!this.addPlanRoute.cityName){
          this.$message.warning('请选择地区')
          return
        }
        if(!this.addPlanRoute.effectiveDate){
          this.$message.warning('请选择生效日期')
          return
        }
        if(this.addPlanRoute.breakBikePercentage > 100 || this.addPlanRoute.breakBikePercentage <0){
          this.$message.warning('"损坏维修车辆比例" 为 0-100')
          return
        }
        if(this.addPlanRoute.scrapBikePercentage > 100 || this.addPlanRoute.scrapBikePercentage <0){
          this.$message.warning('"报废回修车辆比例" 为 0-100')
          return
        }
        if(this.addPlanRoute.autonomouslyCleanPercentage > 100 || this.addPlanRoute.autonomouslyCleanPercentage <0){
          this.$message.warning('"自主清理车辆比例" 为 0-100')
          return
        }
        this.$ajax.get(`${baseUrl.cityDocking}/cityDocking/save`, {params: this.addPlanRoute})
          .then(res => {
            if (res.data.code === 0) {
              this.$message.success('提交成功')
              this.activeName = 'first'
              this.formInline ={}
              this.query()
            } else {
              this.$message('提交失败')
            }
          }).catch(() => {
          this.$message.error('提交异常')
        })
      },
      exportFormDate () {
        this.$confirm('确定导出么?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(this.exportParam)
          this.exportParam.pageNo = ''
          this.exportParam.pageSize = ''
          this.$refs['FileForm'].setAttribute('action', `${baseUrl.cityDocking}/cityDocking/export`)
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
        this.$ajax.get(`${baseUrl.ActivityArea}/electric/userUtilsInterface/interface/getAllAreaList`)
          .then(res => {
            if (res.data.code === 0) {
              console.log(res.data.areaList)
              this.select = res.data.areaList
            } else {
              this.$message('城市列表获取失败')
            }
          })
          .catch(err => {
            this.$message.error('城市列表获取异常')
          })
      },
      //树模型
      filterNode (value, data) {
        if (!value) return true
        return data.name.indexOf(value) !== -1
      },
      handleNode (data) {
        this.filterText = data.name // 弹框树模型点击输入值
        this.cityNo = Number(data.id)
      },
      doModify () {
        this.formInline.cityName = this.filterText
        this.formInline.cityNo = this.cityNo
        this.cityVisible = false
      },
      modifyCancel () {
        this.cityVisible = false
      },
      searchCity () {
        this.cityVisible = true
        this.filterText = ''
      },
      areaModify () {
        this.addPlanRoute.cityName = this.filterText
        this.addPlanRoute.cityNo = this.cityNo
        this.areaVisible = false
      },
      areaCancel () {
        alert(this.addPlanRoute.cityNo)
        this.areaVisible = false
      },
      searchArea () {
        this.areaVisible = true
        this.filterText = ''
      }
    }
  }

  function watchOptions (val) {
    if (val) {
//      return parseInt(val)
      return val.replace(/[^\d]/g,'')
    }
  }
//  function watchValue (val) {
//    if (val){
//      if (parseFloat(val) <= 0) {
//        val = 0
//      } else if (parseFloat(val) >= 100) {
//        val = 100
//      }
//      console.log(parseFloat(val))
//      return parseFloat(val)
//    }
//  }
  function watchFloat (val) {
    if (val) {
//      return parseFloat(val)
      return val.replace(/[^\-?\d.]/g,'')
    }
  }
</script>
<style scoped>
  @import'../../assets/css/common.css';

  html, body {
    height: 100%;
  }

  .submit {
    margin-top: 20px;
    float: right;
  }

  .area {
    width: 150px;
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
    border-left: 1px solid #ccc !important;
  }

  .addPlanRoute .el-date-editor.el-input {
    width: 252px;
    margin-left: -5px;
    margin-right: -6px;

  }


</style>
