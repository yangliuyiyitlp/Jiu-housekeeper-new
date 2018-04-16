<template>
  <div>
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <el-tab-pane label="骑行控制表" name="first">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="城市：">
            <el-input
              :disabled=true
              :on-icon-click="searchCity"
              icon="search"
              v-model="cityName">
            </el-input>
          </el-form-item>
          <el-button type="primary" @click="query" v-if="hasPermission('bike/control/view')">查询</el-button>
          <el-button type="primary" @click="addForm" v-if="hasPermission('bike/control/add')">新增</el-button>
        </el-form>
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            v-if="0"
            prop="id"
            label="id">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="os"
            label="操作系统">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="configFlag"
            label="配置类型">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="area.name"
            label="生效城市">
          </el-table-column>

          <!--<el-table-column-->
            <!--header-align="center"-->
            <!--align="center"-->
            <!--prop="executingFlag"-->
            <!--label="生效状态">-->
          <!--</el-table-column>-->

          <el-table-column
            :show-overflow-tooltip=true
            header-align="center"
            align="center"
            prop="andDate"
            label="生效日期">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="limitHour"
            label="限制时间">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="updateBy.name"
            label="操作人">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="updateDate"
            label="操作时间">
          </el-table-column>
          <el-table-column
            v-if="hasPermission('bike/control/update')"
            header-align="center"
            align="center"
            width="100"
            label="操作">
            <template slot-scope="scope">
              <el-button @click="modifyRecord(scope.row)" type="text"
                         size="small">修改
              </el-button>
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

      <el-tab-pane label="骑行控制配置" name="second" v-if="hasPermission('bike/control/update') || hasPermission('bike/control/add')">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
          <el-input v-model="ruleForm.id" v-if="0"></el-input>


          <el-form-item label="操作系统：" prop="os">
            <el-select v-model="ruleForm.os" placeholder="请选择">
              <el-option
                v-for="item in osSystemType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="配置类型：" prop="configFlag">
            <el-select v-model="ruleForm.configFlag" placeholder="请选择">
              <el-option
                v-for="item in configType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="生效城市：" prop="cityName">
            <el-input
              class="city"
              :disabled=true
              :on-icon-click="searchArea"
              icon="search"
              v-model="ruleForm.cityName">
            </el-input>
          </el-form-item>
          <el-form-item label="生效日期：" required>
            <el-col :span="3">
              <el-form-item prop="beginDate">
                <el-date-picker
                  v-model="ruleForm.beginDate"
                  @change="beginDateChange"
                  type="datetime"
                  placeholder="选择开始日期时间">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item prop="endDate">
                <el-date-picker
                  v-model="ruleForm.endDate"
                  @change="endDateChange"
                  type="datetime"
                  placeholder="选择结束日期时间">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="限制时间：" prop='limitHour'>
            <el-input v-model="ruleForm.limitHour" class="limitWidth"></el-input>
          </el-form-item>


          <el-button type="primary" @click.stop="submitForm('ruleForm')" class="submit">{{title}}</el-button>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="城市" size="tiny" :visible.sync="cityVisible" center>
      <label>城市：</label><a href="#!" class="titleCity">{{filterText}}</a>
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
      <label>城市：</label><a href="#!" class="titleCity">{{filterText}}</a>
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
  import {convertDate2String,getNowFormatDate} from '../../assets/js/convert.js'
  import baseUrl from '../../utils/baseUrl.js'
  import Cookie from 'js-cookie'

  export default {
    data () {
      return {
        activeName2: 'first',
        cityVisible: false,
        areaVisible: false,
        filterText: '',
        cityName: '',
        cityNo: '',
        formInline: {
          pageNo: 1,
          pageSize: 30,
          id: ''
        },
        select: [{id: -1, name: '全国', children: []}],
        configType: [],
        configObj: {},
        systemType: [],
        systemObj: {},
        osSystemType: [],
        osObj: {},
        tableData: [],
        title: '',
        ruleForm: {},
        rules: {
          os: [{required: true, message: '请选择操作系统', trigger: 'blur'}],
          configFlag: [{required: true, message: '请选择配置类型', trigger: 'blur'}],
          beginDate: [{required: true, message: '请选择日期'}],
          endDate: [{required: true, message: '请选择日期'}],
          cityName: [{required: true, message: '请选择生效城市', trigger: 'blur'}],
          limitHour: [{required: true, message: '请输入限制时间'}]
        },
        pagination: {pageSizes: [30, 40, 60, 100], pageSize: 30, count: 0, pageNo: 1},
        defaultProps: {
          children: 'children',
          label: 'name'
        },
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
      this.selectCity()
      this.getConfigType()
      this.getOsType()
    },
    methods: {
      beginDateChange (val) {
        this.ruleForm.beginDate = val
      },
      endDateChange (val) {
        this.ruleForm.endDate = val
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
      hasPermission (data) {
        if (this.permissionList && this.permissionList.length && this.permissionList.includes(data)) {
          return true
        }
        return false
      },
      handleClick () {
        if (this.activeName2 === 'second') {
          this.ruleForm = {}
          this.title = '新增'
          this.$refs.ruleForm.resetFields()
        }
        if (this.activeName2 === 'first') {
          this.query()
        }
        this.cityName = ''
        this.formInline.id = ''
      },
      selectCity () { //获取城市列表
        this.$ajax.get(`${baseUrl.mainUrl}/electric/userUtilsInterface/interface/getBikeAreaList`)
          .then((res) => {
            if (res.data.code === 0) {
              if(res.data.bikeAreaList){
                this.select[0].children = res.data.bikeAreaList
              }
            }
          })
          .catch((err) => {
            this.$message('城市获取失败')
          })
      },
      //配置类型
      getConfigType () {
        this.$ajax.get(`${baseUrl.mainUrl}/sys/dictutils/interface/getDictList`, {params: {type: 'configuration_type'}})
          .then((res) => {
            this.configType = []
            for (let k = 0; k < res.data.length; k++) {
              this.configObj[res.data[k].value] = res.data[k].label
              let configTypeObj = {}
              configTypeObj.value = res.data[k].value
              configTypeObj.label = res.data[k].label
              this.configType.push(configTypeObj)
            }
          })
          .catch((err) => {
            this.$message('配置类型获取失败')
          })
      },
      //操作系统
      getOsType () {
        this.$ajax.get(`${baseUrl.mainUrl}/sys/dictutils/interface/getDictList`, {params: {type: 'os_system'}})
          .then((res) => {
            this.osSystemType = []
            for (let k = 0; k < res.data.length; k++) {
              this.osObj[res.data[k].value] = res.data[k].label
              let osSystemObj = {}
              osSystemObj.value = res.data[k].value
              osSystemObj.label = res.data[k].label
              this.osSystemType.push(osSystemObj)
            }
          })
          .catch((err) => {
            this.$message('操作系统获取失败')
          })
      },
      filterNode (value, data) {
        if (!value) return true
        return data.name.indexOf(value) !== -1
      },
      handleNode (data) {
        this.filterText = data.name // 弹框树模型点击输入值
        this.cityNo = data.id
      },
      doModify () {
        if(!this.filterText){
          this.formInline.id = ''
        }else{
          this.formInline.id = this.cityNo
        }
        this.cityName = this.filterText
        this.cityVisible = false
      },
      modifyCancel () {
        this.cityVisible = false
        this.formInline.id=''
        this.cityName=''
      },
      searchCity () {
        this.cityVisible = true
        this.filterText = this.cityName
      },
      areaModify () {
        if(!this.filterText){
          this.ruleForm.cityNo = ''
        }else{
          this.ruleForm.cityNo = this.cityNo
        }
        this.ruleForm.cityName = this.filterText
        this.areaVisible = false
      },
      areaCancel () {
        this.areaVisible = false
      },
      searchArea () {
        this.areaVisible = true
        this.filterText =  this.ruleForm.cityName
      },
      query () {
        this.formInline['area.id']=this.formInline.id
        this.$ajax.get(`${baseUrl.bikeControl}/layer/limitoperateflag/tLimitOperateConfig/list`, {params:this.formInline})
          .then((res) => {
            if (res.data.code === 0) {
              let result = res.data.data.result
              if (result.length <= 0) {
                this.$message.warning('未查询到符合条件的数据')
              }
              this.tableData = result
              this.pagination.count = res.data.data.total
              for (let i = 0; i < this.tableData.length; i++) {
                this.tableData[i].andDate = this.tableData[i].beginDate + '-' + this.tableData[i].endDate
                this.tableData[i].configFlag = this.configObj[this.tableData[i].configFlag]
                this.tableData[i].executingFlag = this.systemObj[this.tableData[i].executingFlag]
                this.tableData[i].os = this.osObj[this.tableData[i].os]
              }
            } else {
              this.$message({
                type: 'error',
                message: '获取列表失败'
              })
            }
          })
          .catch(() => {
            this.$message({
              type: 'error',
              message: '获取列表异常'
            })
          })
      },
      modifyRecord (row) {
        this.activeName2 = 'second'
        this.title = '提交修改'
        this.getMore(row)
      },
      getMore (row) {
        this.$ajax.get(`${baseUrl.bikeControl}/layer/limitoperateflag/tLimitOperateConfig/get/${row.id}`)
          .then(res => {
            if (res.data.code === 0) {
              this.ruleForm = res.data.data
              this.ruleForm.cityName = this.ruleForm.area.name
              this.ruleForm.cityNo = this.ruleForm.area.id
            } else {
              this.$message('查询失败')
            }
          }).catch(() => {
          this.$message.error('查询异常')
        })
      },
      addForm () {
        this.activeName2 = 'second'
        this.ruleForm = {}
        this.title = '新增'
        this.$refs.ruleForm.resetFields()
      },
      submitForm (ruleForm) {
        if (this.ruleForm.beginDate > this.ruleForm.endDate) {
          this.$message.warning('开始时间不能晚于结束时间')
          return
        }
        if (this.ruleForm.limitHour < -1) {
          this.$message.warning('限制时间不能小于-1')
          return
        }
        if(!/^(0|[1-9][0-9]*|-[1-9][0-9]*)$/.test(this.ruleForm.limitHour)){
          this.$message.warning('限制时间只能输入整数')
          return
        }
        // 请求
        this.$refs[ruleForm].validate((valid) => {
          if (valid) {
            this.ruleForm.updateDate = getNowFormatDate()
            this.ruleForm.limitHour = String(this.ruleForm.limitHour)
            let updateBy ={id:this.adminId}
            this.ruleForm.updateBy = updateBy
            let area ={id:this.ruleForm.cityNo}
            this.ruleForm.area = area
            this.$ajax.post(`${baseUrl.bikeControl}/layer/limitoperateflag/tLimitOperateConfig/save`, this.ruleForm)
              .then(res => {
                if (res.data.code === 0) {
                  // 更新成功
                  this.$message.success(res.data.msg)
                  this.ruleForm = {}
                  this.activeName2 = 'first'
                  this.cityName = ''
                  this.formInline.id = ''
                  // 刷新页面
                  this.query()
                } else {
                  this.$message(res.data.msg)
                }
              })
              .catch(() => {
                this.$message.error('提交异常')
              })
          } else {
            return
          }
        })
      }
    }
  }
</script>
<style scoped>
  html, body {
    height: 100%;
  }
  .titleCity{
    text-decoration: none;
    color: #000;
  }

  .city {
    width: 205px;
  }

  .width {
    width: 300px;
  }

  .limitWidth {
    width: 200px;
  }

  .demo-form-inline {
    padding-left: 10px;
  }

  a {
    color: red;
  }

  .submit {
    margin-left: 200px;
  }
</style>
