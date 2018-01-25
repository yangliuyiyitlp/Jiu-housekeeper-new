<template>
  <div>
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <el-tab-pane label="版本内容信息" name="first">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            header-align="center"
            align="center"
            prop="pdId"
            label="产品类型">
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
            :show-overflow-tooltip = true
            prop="version"
            label="更新的版本号">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="forceUpdateVersion"
            label="强制更新的最低版本">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="releaseNotes"
            label="更新通知内容">
          </el-table-column>
          <!--<el-table-column-->
            <!--header-align="center"-->
            <!--align="center"-->
            <!--prop="targetUsers"-->
            <!--label="更新用户范围">-->
          <!--</el-table-column>-->
          <el-table-column
            v-if="hasPermission('version/manage/update')"
            header-align="center"
            align="center"
            width="100"
            label="操作">
            <template slot-scope="scope">
              <el-button @click="modifyRecord(scope.row.id)" type="text"
                         size="small">修改
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="版本更新" name="second" v-if="update">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
          <el-form-item label="产品类型：">
            <el-input v-model="ruleForm.pdId" class="width" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="操作系统：">
            <el-input v-model="ruleForm.os" class="width" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="更新的版本号：" prop="version">
            <el-input v-model="ruleForm.version" class="width"></el-input>
          </el-form-item>
          <el-form-item label="更新通知内容：" prop="releaseNotes">
            <el-input
              type="textarea"
              autosize
              class="textarea"
              v-model="ruleForm.releaseNotes">
            </el-input>
          </el-form-item>
          <el-form-item label="强制更新的最低版本：" prop="forceUpdateVersion">
            <el-input v-model="ruleForm.forceUpdateVersion" class="width"></el-input>
          </el-form-item>
          <!--<el-form-item label="更新用户范围：" prop="releaseNotes">-->
            <!--<el-input-->
              <!--type="textarea"-->
              <!--autosize-->
              <!--class="textarea"-->
              <!--v-model="ruleForm.releaseNotes">-->
            <!--</el-input>-->
            <!--<el-button type="primary" class="update" @click="dialogFormVisible = true">修改</el-button>-->
          <!--</el-form-item>-->
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交修改</el-button>
            <el-button @click="resetForm('ruleForm')">重置所有</el-button>
            <el-button @click="back">返回</el-button>
          </el-form-item>
        </el-form>
        <!--<el-dialog title="收货地址" :visible.sync="dialogFormVisible" size="small">-->
          <!--<el-form :model="userForm">-->
              <!--<el-input v-model="userForm.name" placeholder="请输入用户名" class="visibelInput"></el-input>-->
              <!--<el-button type="primary" @click="submitForm('ruleForm')">查询</el-button>-->
            <!--<el-pagination-->
              <!--@size-change="handleSizeChange"-->
              <!--@current-change="handleCurrentChange"-->
              <!--:current-page="pagination.pageNum"-->
              <!--:page-sizes="pagination.pageSizes"-->
              <!--:page-size="pagination.pageSize"-->
              <!--layout="total, sizes, prev, pager, next, jumper"-->
              <!--:total="pagination.count">-->
            <!--</el-pagination>-->
          <!--</el-form>-->
          <!--<div slot="footer" class="dialog-footer">-->
            <!--<el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>-->
          <!--</div>-->
        <!--</el-dialog>-->
      </el-tab-pane>
    </el-tabs>
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
        update: false,
//        dialogFormVisible: false,
        tableData: [{'id': '1'}],
        osObj: {'0':'ios', '1':'andriod'},
        pdIdObj: {'0':'赳赳单车', '1':'赳猎人'},
        formInline: {},
        ruleForm: {},
        userForm: {},
        rules: {
          version: [{required: true, message: '请输入更新版本号', trigger: 'blur'}],
          forceUpdateVersion: [{required: true, message: '请输入强制更新的最低版本', trigger: 'blur'}],
          releaseNotes: [{required: true, message: '请输入更新通知内容', trigger: 'blur'}]
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
      this.query()
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
          this.update = false
          this.formInline = {}
          this.query()
        }
      },
      query () {
        this.$ajax.get(`${baseUrl.advertContent}/version/listApp`, {params: this.formInline, timeout: 3000})
          .then((res) => {
            if (res.data.code === 200) {
              let resultForm = res.data.data.result
              this.tableData = resultForm
              for (let i=0; i < resultForm.length; i++) {
                this.tableData[i].os = this.osObj[resultForm[i].os]
                this.tableData[i].pdId = this.pdIdObj[resultForm[i].pdId]
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
      modifyRecord (id) {
        this.update = true
        this.activeName2 = 'second'
//        this.getMore(id)
      }, // 修改
      back () {
        this.activeName2 = 'first'
        this.update = false
      },
      resetForm (ruleForm) {
        this.ruleForm = {}
      },
      getMore (id) {
        this.$ajax.get(``, {params: {id: id, timeout: 1000}})
          .then(res => {
            if (res.data.code === 200) {
              let resultData  = res.data.data
              this.ruleForm = resultData
              this.ruleForm.os = this.osObj[resultData.os]
              this.ruleForm.pdId = this.pdIdObj[resultData.pdId]
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
        // 请求
        this.$refs[ruleForm].validate((valid) => {
          this.ruleForm.updateBy = Cookie.get('adminId')
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
  @import '../../assets/css/treecss.css';
  .textarea{
    width:300px;
  }
  .visibelInput{
    float:left;
    width:200px;
  }
 .update{
   padding: 7px 7px 8px!important;
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
