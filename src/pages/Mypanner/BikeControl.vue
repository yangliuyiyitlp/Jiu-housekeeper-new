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
          <el-button type="primary" @click="query">查询</el-button>
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

          <el-table-column
            header-align="center"
            align="center"
            prop="executingFlag"
            label="生效状态">
          </el-table-column>

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
          :current-page="pagination.pageNum"
          :page-sizes="pagination.pageSizes"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.count">
        </el-pagination>
      </el-tab-pane>

      <el-tab-pane label="骑行控制配置" name="second">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
          <el-input v-model="ruleForm.id" v-if="0"></el-input>
          <el-input v-model="ruleForm.updateBy.id" v-if="0"></el-input>
          <el-input v-model="ruleForm.updateDate" v-if="0"></el-input>


          <el-form-item label="操作系统：">
            <el-select v-model="ruleForm.os" placeholder="请选择">
              <el-option
                v-for="item in osSystemType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="配置类型：">
            <el-select v-model="ruleForm.configFlag" placeholder="请选择">
              <el-option
                v-for="item in configType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="生效城市：">
            <el-input
              class="city"
              :disabled=true
              :on-icon-click="searchArea"
              icon="search"
              v-model="ruleForm.cityName">
            </el-input>
          </el-form-item>
          <el-form-item label="生效状态：">
            <el-select v-model="ruleForm.executingFlag" placeholder="请选择">
              <el-option
                v-for="item in systemType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="生效日期：" prop="version">
            <el-date-picker
              v-model="ruleForm.beginDate"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
            -
            <el-date-picker
              v-model="ruleForm.endDate"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="限制时间：" prop="version">
            <el-input v-model="ruleForm.limitHour" class="limitWidth"></el-input>
          </el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" class="submit">{{title}}</el-button>
        </el-form>
      </el-tab-pane>
    </el-tabs>
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
          pageNum: 1,
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
        title: '提交修改',
        pdIdObj: {'0': '赳赳单车', '1': '赳猎人', '2': '小程序'},
        ruleForm: {},
        rules: {
          version: [{required: true, message: '请输入更新版本号', trigger: 'blur'}],
          releaseNotes: [{required: true, message: '请输入更新通知内容', trigger: 'blur'}]
        },
        pagination: {pageSizes: [30, 40, 60, 100], pageSize: 30, count: 0, pageNum: 1},
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
      this.getSystem()
      this.getOsType()
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
        this.formInline.pageNum = val
        this.pagination.pageNum = val
        this.query()
      },
      hasPermission (data) {
        if (this.permissionList && this.permissionList.length && this.permissionList.includes(data)) {
          return true
        }
        return false
      },
      handleClick () {
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
              this.select[0].children = res.data.bikeAreaList
            }
          })
          .catch((err) => {
            this.$message('城市获取失败')
          })
      },
      //生效状态
      getSystem () {
        this.$ajax.get(`${baseUrl.mainUrl}/sys/dictutils/interface/getDictList`, {params: {type: 'black_list_is_executing'}})
          .then((res) => {
            this.systemType = []
            for (let k = 0; k < res.data.length; k++) {
              this.systemObj[res.data[k].value] = res.data[k].label
              let systemTypeObj = {}
              systemTypeObj.value = res.data[k].value
              systemTypeObj.label = res.data[k].label
              this.systemType.push(systemTypeObj)
            }
          })
          .catch((err) => {
            this.$message('生效状态获取失败')
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
              this.configType.push(osSystemObj)
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
        this.cityNo = Number(data.id)
      },
      doModify () {
        this.cityName = this.filterText
        this.formInline.id = this.cityNo
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
        this.ruleForm.area.name = this.filterText
        this.ruleForm.area.id = this.cityNo
        this.areaVisible = false
      },
      areaCancel () {
        this.areaVisible = false
      },
      searchArea () {
        this.areaVisible = true
        this.filterText = ''
      },
      query () {
        this.$ajax.get(`${baseUrl.newEnjoyUrl}/layer/limitoperateflag/tLimitOperateConfig/list`, {params: {'area.id': this.formInline.id}})
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
        this.update = true
        this.activeName2 = 'second'
        this.getMore(row)
      },
      getVersion (val) {
        this.versionObj = {}
        for (let i = 0; i < val.length; i++) {
          this.versionObj[val[i].version] = val[i].version
        }
        return this.versionObj
      },
      getMore (row) {
        for (let osKey in this.osObj) {
          if (this.osObj[osKey] === row.os) {
            this.os = osKey
          }
        }
        for (let pdIdKey in this.pdIdObj) {
          if (this.pdIdObj[pdIdKey] === row.pdId) {
            this.pdId = pdIdKey
          }
        }
        this.$ajax.get(`${baseUrl.advertContent}/version/show`, {params: {pdId: this.pdId, os: this.os, timeout: 3000}})
          .then(res => {
            if (res.data.code === 200) {
              let resultData = res.data.data
              this.ruleForm = resultData
              this.ruleForm.os = this.osObj[resultData.os]
              this.ruleForm.pdId = this.pdIdObj[resultData.pdId]
              // 获取版本
              this.$ajax.get(`${baseUrl.advertContent}/version/list`, {
                params: {
                  'pdId': this.pdId,
                  'os': this.os,
                  timeout: 3000
                }
              })
                .then((res) => {
                  let result = res.data.data
                  if (res.data.code === 200) {
                    if (this.os === '0') {
                      this.versionSelect = this.getVersion(result.ios_versions)
                    } else if (this.os === '1') {
                      this.versionSelect = this.getVersion(result.android_versions)
                    }
                    console.log(this.versionSelect)
                  } else {
                    this.$message({
                      type: 'info',
                      message: res.data.msg
                    })
                  }
                })
                .catch((err) => {
                  console.log(err)
                  this.$message({
                    type: 'info',
                    message: '版本列表获取异常'
                  })
                })
            } else {
              this.$message({
                type: 'error',
                message: res.data.msg
              })
            }
          }).catch(() => {
          this.$message({
            type: 'error',
            message: '查询异常'
          })
        })
      },
      submitForm (ruleForm) {
        if (this.ruleForm.version === this.ruleForm.minVersion) {
          this.$message({
            type: 'info',
            message: '\'更新的版本号\' 和 \'强制更新的最低版本号\' 不能一样'
          })
          return false
        }

        // 请求
        this.$refs[ruleForm].validate((valid) => {
          this.ruleForm.updateBy = Cookie.get('adminId')
          for (let osKey in this.osObj) {
            if (this.osObj[osKey] === this.ruleForm.os) {
              this.ruleForm.os = osKey
            }
          }
          for (let pdIdKey in this.pdIdObj) {
            if (this.pdIdObj[pdIdKey] === this.ruleForm.pdId) {
              this.ruleForm.pdId = pdIdKey
            }
          }
          let url = `${baseUrl.advertContent}/version/operate`
          if (valid) {
            this.$ajax.post(url, this.ruleForm)
              .then(response => {
                if (response.data.code === 200) {
                  // 更新成功
                  this.$message({
                    type: 'success',
                    message: response.data.msg
                  })
                  this.ruleForm = {}
                  this.back()
                  // 刷新页面
                  this.query()
                  this.update = false
                } else {
                  this.$message({
                    type: 'error',
                    message: '提交失败'
                  })
                }
              })
              .catch(() => {
                this.$message({
                  type: 'error',
                  message: '提交异常'
                })
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
