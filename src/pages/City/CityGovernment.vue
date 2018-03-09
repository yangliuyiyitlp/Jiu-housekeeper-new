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
              v-model="formInline.beginTime"
              @change="onBeginTimeChange"
              type="datetime">
            </el-date-picker>
            -
            <el-date-picker
              v-model="formInline.endTime"
              @change="onEndTimeChange"
              type="datetime">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
          <el-radio class="radio" v-model="radio" label="1">已过期</el-radio>
          <el-radio class="radio" v-model="radio" label="2">生效中</el-radio>
          <el-radio class="radio" v-model="radio" label="3">待生效</el-radio>
          </el-form-item>
          <el-form-item v-if="hasPermission('city/government/view')">
            <el-button type="primary" @click="query">查询</el-button>
          </el-form-item>
          <el-form-item v-if="hasPermission('city/government/export')">
            <el-button type="primary" @click="exportForm">导出</el-button>
          </el-form-item>
          <el-form-item v-if="hasPermission('city/government/export')">
            <el-button type="primary" @click="addForm">新增</el-button>
          </el-form-item>
        </el-form>
        <!--隐藏表单用于文件导出-->
        <form style="display: none" action="" method="get" ref="FileForm">
          <input name="beginTime" v-model="exportParam.beginTime"/>
          <input name="endTime" v-model="exportParam.endTime"/>
          <input name="pageSize" v-model="exportParam.pageSize"/>
          <input name="pageNum" v-model="exportParam.pageNum"/>
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
            prop="no"
            label="注册用户数">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            width="120"
            prop=""
            label="活跃用户数">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            width="120"
            prop="autoDisplayTimes"
            label="实际运营车辆数">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            width="120"
            prop="updateDate"
            label="被清收暂扣车辆数">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            width="120"
            show-overflow-tooltip
            prop="remarks"
            label="车辆平均周转率">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            width="120"
            show-overflow-tooltip
            prop="remarks"
            label="外环外平均周转率">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            width="120"
            show-overflow-tooltip
            prop="remarks"
            label="外环内平均周转率">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            width="120"
            show-overflow-tooltip
            prop="remarks"
            label="实际运营车辆日均使用人次">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            width="120"
            show-overflow-tooltip
            prop="remarks"
            label="损坏维修车辆比例">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            width="120"
            show-overflow-tooltip
            prop="remarks"
            label="报废回收车辆比例">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            width="120"
            show-overflow-tooltip
            prop="remarks"
            label="自主清理车辆比例">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            width="120"
            show-overflow-tooltip
            prop="remarks"
            label="维修保养场点数量">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            width="120"
            show-overflow-tooltip
            prop="remarks"
            label="中转储备场点数量">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            width="120"
            show-overflow-tooltip
            prop="remarks"
            label="车辆区域核定数量">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            width="120"
            show-overflow-tooltip
            prop="remarks"
            label="生效日期">
          </el-table-column>
          <el-table-column
            v-if="hasPermission('city/government/add')"
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
          :current-page="pagination.pageNum"
          :page-sizes="pagination.pageSizes"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.count">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="数据配置" name="second" >
        <el-form :model="setForm" class="demo-form-inline">
          <el-form-item label="地区：">
            <a>{{cityName}}</a>&nbsp;<i class="el-icon-search" @click="searchCity"></i>
          </el-form-item>
        </el-form>
        <el-table
          :data="addPlanRoute"
          max-height="800"
          border
          style="width: 100%">
          <el-table-column
            prop="id"
            v-if="0"
            label="ID">
          </el-table-column>
          <el-table-column property="order2" label="项目描述" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.no" disabled ></el-input>
            </template>
          </el-table-column>
          <el-table-column property="order2" label="填报信息" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.id" ></el-input>
            </template>
          </el-table-column>
          <el-table-column property="order2" label="备注" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.order2" ></el-input>
            </template>
          </el-table-column>
        </el-table>

      </el-tab-pane>
      <el-button type="primary" @click="addForm" class="submit">提交</el-button>
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
        radio: '',
        selected:[],
        citySelect:['省','市','区'],
        //图表传值结束
        activeName2: 'first',
        exportFormVisible: false,
        cityVisible: false,
        filterText: '',
        cityName: '',
        checkedCity: [],
        select: [{'id': '-1', 'name': '全国', 'children': []}],
        cityId:'',
        tableData: [{no:'2'},{no:'2'},{no:'2'},{no:'2'},{no:'2'},{no:'2'}],
        addPlanRoute: [{no:'注册用户数'},{no:'活跃用户数'},{no:'实际运营车辆数'},{no:'被清收暂扣车辆数'},{no:'车辆平均周转率'},
          {no:'外环外平均周转率'},{no:'外环内平均周转率'},{no:'实际运营车辆日均使用人次'},{no:'损坏维修车辆比例'},{no:'报废回收车辆比例'},
          {no:'自主清理车辆比例'},{no:'维修保养场点数量'},{no:'中转储备场点数量'},{no:'车辆区域核定数量'},{no:'生效日期'}],
        exportParam: {},
        setForm: {},
        formInline: {
          pageNum: 1,
          pageSize: 30
        },
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        pagination: {pageSizes: [30, 40, 60, 100], pageSize: 30, count: 0, pageNum: 1},
        adminId: '',
        path: '',
        permissionList: ['city/government/view', 'city/government/export', 'city/government/add']
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
      }},
    methods: {
      handleSizeChange (val) {
        this.formInline.pageSize = val
        this.pagination.pageSize = val
        this.query()
      },
      handleCurrentChange (val) {
        this.formInline.pageNum = val
        this.pagination.pageNum = val
        this.query()
      },
      onBeginTimeChange (val) {
        this.formInline.beginTime = new Date(val).getTime()
      },
      onEndTimeChange (val) {
        this.formInline.endTime = new Date(val).getTime()
      },
      hasPermission (data) {
        if (this.permissionList && this.permissionList.length && this.permissionList.includes(data)) {
          return true
        }
        return false
      },
      handleClick () {
        this.formInline = {}
      },
      query () {
        this.exportParam.beginTime = this.formInline.beginTime
        this.exportParam.endTime = this.formInline.endTime
        this.$ajax.get(`${baseUrl.cityFencingUrl}/remind/list`, {params: this.formInline})
          .then((res) => {
            if (res.data.code === 200) {
              let result = res.data.data
              this.tableData = result
            } else {
              this.$message('获取列表失败')
            }
          })
          .catch(() => {
            this.$message.error('获取列表异常')
          })
      },
      modifyRecord(id){
        this.activeName2='first'
        this.getMore(id)
      },
      getMore (id) {
        this.$ajax.get(`${baseUrl.cityFencingUrl}/remind/one`, {params: {id: id}})
          .then(res => {
            if (res.data.code === 200) {
              this.setForm = res.data.data
            } else {
              this.$message('查询失败')
            }
          }).catch(() => {
          this.$message.error('查询异常')
        })
      },
      addForm(){
        this.activeName2='second'
        this.setForm = {}
        this.$ajax.get(`${baseUrl.cityFencingUrl}/remind/one`, this.setForm)
          .then(res => {
            if (res.data.code === 200) {
              this.$message.success('提交成功')
            } else {
              this.$message('查询失败')
            }
          }).catch(() => {
          this.$message.error('查询异常')
        })
      },
      exportForm () {
        this.$confirm('确定导出么?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(this.exportParam)
          this.exportParam.pageNum = ''
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
        this.cityId = Number(data.id)
      },
      doModify () {
        this.cityName = this.filterText
        this.cityVisible = false
        this.getRanks()
      },
      modifyCancel () {
        this.cityVisible = false
        this.cityName = ''
        this.cityId = ''
      },
      searchCity () {
        this.cityVisible = true
        this.filterText = ''
      },
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
 .submit{
   margin-top:20px;
   float:right;
 }

</style>
