<template>
  <div>
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <el-tab-pane label="版本内容信息" name="first">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="平台：">
            <el-select v-model="formInline.os" clearable>
              <el-option v-for="(val,key) in osPlatform" v-bind:key=key :label=val :value=key></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="hasPermission('version/manage/view')">
            <el-button type="primary" @click="query">查询</el-button>
          </el-form-item>
          <el-form-item v-if="hasPermission('version/manage/create')">
            <el-button type="primary" @click="addNewRecord">新增</el-button>
          </el-form-item>
        </el-form>
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            header-align="center"
            align="center"
            prop="id"
            label="版本ID">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            label="版本号"
            prop="version">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="os"
            label="平台">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            :show-overflow-tooltip = true
            prop="releaseNotes"
            label="更新通知内容">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="remarks"
            label="版本修改内容">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="createDate"
            label="添加时间">
          </el-table-column>

          <el-table-column
            v-if="hasPermission('version/manage/update') || hasPermission('advert/content/update')"
            header-align="center"
            align="center"
            width="100"
            label="操作">
            <template slot-scope="scope">
              <el-button v-if="hasPermission('version/manage/update')" @click="modifyRecord(scope.row.id)" type="text"
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

      <el-tab-pane :label="title" name="second" v-if="hasPermission('version/manage/create')">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
          <el-form-item label="版本号：" prop="version">
            <el-input v-model="ruleForm.version" class="width"></el-input>
          </el-form-item>

          <el-form-item label="平台：" prop="os">
            <el-radio-group v-model="ruleForm.os" @change="osChange">
              <el-radio v-for="(val, key) in osObj" :key="key" :label="key">{{val}}</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="更新通知内容：" prop="releaseNotes">
            <el-input
              type="textarea"
              autosize
              class="textarea"
              v-model="ruleForm.releaseNotes">
            </el-input>
          </el-form-item>
          <el-form-item label="APP修改内容：">
            <el-input
              type="textarea"
              autosize
              class="textarea"
              v-model="ruleForm.remarks">
            </el-input>
          </el-form-item>

          <el-form-item label="强制更新版本：">
            <div class="treeIos">
              <div class="areaAdOs">
                <el-tree
                  :data="selectDate"
                  show-checkbox
                  default-expand-all
                  node-key="id"
                  :default-checked-keys="checkedAdOs"
                  ref="treeIos"
                  class="treeAdOs"
                  accordion
                  :props="defaultCity">
                </el-tree>
              </div>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">{{tip}}</el-button>
            <el-button @click="resetForm('ruleForm')">重置所有</el-button>
            <el-button @click="back">返回</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import a from '../../assets/js/getsessionId.js'
  import baseUrl from '../../utils/baseUrl'

  export default {
    data () {
      return {
        activeName2: 'first',
        title: '版本内容新增',
        osPlatform: {'': '全部', '0': 'ios', '1': 'andriod'},
        osObj: {'0': 'ios', '1': 'andriod'},
        tip: '立即创建',
        tableData: [],
        checkedAdOs: [],
        selectDate: [],
        selectAdOs: [],
        selectAndroid: [],
        defaultCity: {
          children: 'children',
          label: 'version'
        },
        formInline: {
          pageSize: 30,
          pageNum: 1
        },
        ruleForm: {},
        rules: {
          version: [{required: true, message: '请输入版本号', trigger: 'blur'}],
          os: [{required: true, message: '请选择平台', trigger: 'blur'}],
          releaseNotes: [{required: true, message: '请输入更新通知内容', trigger: 'blur'}]
        },
        pagination: {pageSizes: [30, 40, 60, 100], pageSize: 30, count: 0, pageNum: 1},
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
      this.selectVersion()
    },
    methods: {
      hasPermission (data) {
        if (this.permissionList && this.permissionList.length && this.permissionList.includes(data)) {
          return true
        }
        return false
      },
      handleClick () {
        if (this.activeName2 === 'first') {
          this.formInline = {
            pageSize: 30,
            pageNum: 1
          }
          this.query()
        }
        if (this.activeName2 === 'first' && this.hasPermission('version/manage/create')) {
          this.title = '版本内容新增'
        } else if (this.title === '版本内容新增') {
          this.ruleForm = {}
          this.tip = '立即创建'
          this.$refs.ruleForm.resetFields()
          this.$refs.treeIos.setCheckedKeys([])
        }
      },
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
      osChange (val) {
        if (val === '0') {
          this.selectDate = this.selectAdOs
        } else if (val === '1') {
          this.selectDate = this.selectAndroid
        }
        this.$refs.treeIos.setCheckedKeys([])
      },
      selectVersion () {
        this.$ajax.get(`${baseUrl.advertContent}/version/list`, {params: {'pdId': 0, timeout: 3000}})
          .then((res) => {
            let result = res.data.data
            if (res.data.code === 200 && result.ios_versions && result.android_versions) {
              this.selectAdOs = result.ios_versions
              this.selectAndroid = result.android_versions
            } else {
              this.$message({
                type: 'info',
                message: res.data.msg
              })
            }
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '版本列表获取异常'
            })
          })
      },
      query () {
        this.$ajax.get(`${baseUrl.advertContent}/version/listApp`, {params: this.formInline, timeout: 3000})
          .then((res) => {
            if (res.data.code === 200) {
              let resultForm = res.data.data
              this.tableData = resultForm.result
              this.pagination.count = resultForm.total
              for (let i = 0; i < resultForm.result.length; i++) {
                this.tableData[i].os = this.osPlatform[resultForm.result[i].os]
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
      addNewRecord () {
        this.activeName2 = 'second'
        this.title = '版本内容新增'
        this.tip = '立即创建'
        this.ruleForm = {}
        this.checkedAdOs = []
        this.$refs.ruleForm.resetFields()
        this.$refs.treeIos.setCheckedKeys([])
      }, // 新增
      modifyRecord (id) {
        this.activeName2 = 'second'
        this.title = '版本内容修改'
        this.tip = '提交修改'
        this.getMore(id)
      }, // 修改
      back () {
        this.activeName2 = 'first'
        if (this.create) {
          this.title = '版本内容新增'
        }
      },
      resetForm (ruleForm) {
        this.ruleForm = {}
        this.checkedAdOs = []
        this.$refs.ruleForm.resetFields()
      },
      getMore (id) {
        this.$ajax.get(`${baseUrl.advertContent}/version/show`, {params: {id: id, timeout: 4000}})
          .then(res => {
            if (res.data.code === 200) {
              let resultData = res.data.data
              this.ruleForm = resultData
              // 版本
              if (resultData.os === '0') {
                this.selectDate = this.selectAdOs
              } else if (resultData.os === '1') {
                this.selectDate = this.selectAndroid
              }
              if (resultData.forceUpdateVersion) {
                this.checkedAdOs = resultData.forceUpdateVersion.split(',')
                this.$refs.treeIos.setCheckedKeys(this.checkedAdOs)
              }
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
      }, // 获取详情
      submitForm (ruleForm) {
        // 标签
        let treeIosArrIds = this.$refs.treeIos.getCheckedKeys()
        this.ruleForm.forceUpdateVersion = treeIosArrIds.join(',')
        console.log(33, this.ruleForm.forceUpdateVersion)
        // 请求
        this.$refs[ruleForm].validate((valid) => {
          let url = `${baseUrl.advertContent}/adDetails/addAdDetails`
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
  @import '../../assets/css/treecss.css';
  .textarea{
    width:300px;
  }
  .treeAdOs {
    width: 110px;
    height: 150px;
    overflow: auto;
    border-radius: 4px;
    border: 1px solid #bfcbd9;
    padding: 3px 0px 3px 5px;
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
  }

  .width {
    width: 300px;
  }

  .demo-form-inline {
    padding-left: 10px;
  }

  .el-dialog__header {
    text-align: center;
  }

  a {
    color: red;
  }
</style>
