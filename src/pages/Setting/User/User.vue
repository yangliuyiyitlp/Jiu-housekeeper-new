<template>
  <div class="right" ref="right">
    <el-row>

      <el-col :span="3" class="search_bar" ref="search_bar">
        <el-tree
          highlight-current
          :data="select_section"
          :props="defaultProps"
          @node-click="handleNodeClick"
          accordion
          default-expand-all>
        </el-tree>
      </el-col>
      <el-col :span="21">
        <div class="grid-content bg-purple-light">
          <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
            <!--用户列表-->
            <el-tab-pane label="用户列表" name="first" class="padding">

              <!--筛选条件-->
              <el-form :inline="true" :model="formInline" class="demo-form-inline">

                <el-form-item label="归属公司：">
                  <el-input
                    :disabled="true"
                    :on-icon-click="searchCompany"
                    icon="search"
                    v-model="formInline.companyName">
                  </el-input>
                </el-form-item>
                <el-form-item label="归属部门：">
                  <el-input
                    :disabled="true"
                    :on-icon-click="searchSection"
                    icon="search"
                    v-model="formInline.officeName">
                  </el-input>
                </el-form-item>

                <el-form-item label="登录名：">
                  <el-input v-model="formInline.loginName">
                  </el-input>
                </el-form-item>

                <el-form-item label="姓名：">
                  <el-input v-model="formInline.name">
                  </el-input>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" @click="query">查询</el-button>
                </el-form-item>

                <!--<el-form-item>-->
                <!--<el-button type="primary" @click="exportFile">导出</el-button>-->
                <!--</el-form-item>-->
                <el-form-item>
                  <el-button type="primary" @click="addNewRecord">新增</el-button>
                </el-form-item>
              </el-form>
              <!--<el-form class='importForm'>-->
              <!--<el-form-item label="点击上传：">-->
              <!--<input ref='upload' type="file" @change="getFile">-->
              <!--<button @click="importFile">导入</button>-->
              <!--</el-form-item>-->
              <!--</el-form>-->
              <!--<div v-if="errMessage" class='errorMsg'>-->
              <!--<button @click='errorClose' class="errorIcon">关闭</button>-->
              <!--<div v-html="msg"></div>-->
              <!--</div>-->
              <!--隐藏表单用于导出-->
              <!--<form v-show="false" action="" method="post" ref="FileForm">-->
              <!--<input name="companyId" v-model="exportParam.companyId"/>-->
              <!--<input name="officeId" v-model="exportParam.officeId"/>-->
              <!--<input name="loginName" v-model="exportParam.loginName"/>-->
              <!--<input name="name" v-model="exportParam.name"/>-->
              <!--<input name="pageSize" v-model="exportParam.pageSize"/>-->
              <!--<input name="pageNum" v-model="exportParam.pageNum"/>-->
              <!--</form>-->

              <!--表格-->
              <el-table
                :data="tableData"
                width="100%"
                border
                @cell-click="more"
                stripe>
                <el-table-column
                  header-align="center"
                  align="center"
                  show-overflow-tooltip
                  prop="id"
                  label="id">
                </el-table-column>
                <el-table-column
                  header-align="center"
                  show-overflow-tooltip
                  align="center"
                  prop="company"
                  label="归属公司">
                </el-table-column>

                <el-table-column
                  show-overflow-tooltip
                  header-align="center"
                  align="center"
                  prop="office"
                  label="归属部门">
                </el-table-column>

                <el-table-column
                  show-overflow-tooltip
                  header-align="center"
                  align="center"
                  prop="loginName"
                  label="登录名">
                  <template slot-scope="scope">
                    <span v-bind:class="{active: true}">{{ scope.row.loginName}}</span>
                  </template>
                </el-table-column>

                <el-table-column
                  show-overflow-tooltip
                  header-align="center"
                  align="center"
                  prop="name"
                  label="姓名">
                </el-table-column>

                <el-table-column
                  header-align="center"
                  align="center"
                  prop="phone"
                  label="电话">
                </el-table-column>

                <el-table-column
                  header-align="center"
                  align="center"
                  prop="mobile"
                  label="手机">
                </el-table-column>

                <el-table-column
                  header-align="center"
                  align="center"
                  label="操作">
                  <template slot-scope="scope">
                    <el-button @click="modifyRecord(scope)" type="text" size="small">修改</el-button>
                    <el-button @click="deleteRecord(scope.row.id)" type="text" size="small">删除</el-button>
                  </template>
                </el-table-column>

              </el-table>

              <!--分页-->
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pagination.pageNum"
                :page-sizes="pagination.pageSizes"
                :page-size="pagination.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pagination.count">
              </el-pagination>
              <!--导出-->
              <!--<el-dialog size='tiny' title="导出" :visible.sync="exportFormVisible" :show-close="false"-->
              <!--:close-on-press-escape="false"-->
              <!--:close-on-click-modal="false" class="demo-ruleForm ">-->
              <!--<el-button @click="exportCurrent">导出当前页</el-button>-->
              <!--<el-button @click="exportAll">导出所有</el-button>-->
              <!--<div slot="footer" class="dialog-footer">-->
              <!--<el-button @click="cancelExport">取 消</el-button>-->
              <!--</div>-->
              <!--</el-dialog>-->

            </el-tab-pane>

            <!--用户添加 -->
            <el-tab-pane :label='titleSecond' name="second" class="second">

              <el-form ref="form" :model="form" :rules="rules" label-width="150px">
                <!--<el-form-item label="头像：">-->
                <!--<el-input v-model="form.photo" v-show='false'></el-input>-->
                <!--<img width="100%" :src="form.photo" alt="头像">-->
                <!--<el-upload-->
                <!--:disabled="saveUp"-->
                <!--ref="uploadFile"-->
                <!--list-type="picture-card"-->
                <!--action='http://jjdcjavaweb.oss-cn-shanghai.aliyuncs.com'-->
                <!--:data="Token"-->
                <!--:on-remove="removeImgPath"-->
                <!--:on-success="successImgPath"-->
                <!--:before-upload="beforeUploadImgPath">-->
                <!--<el-button :disabled="saveUp" type="primary" @click="clearUploadedImgPath">上传图片-->
                <!--<i class="el-icon-upload el-icon&#45;&#45;right"></i>-->
                <!--</el-button>-->
                <!--</el-upload>-->
                <!--</el-form-item>-->
                <el-form-item label="归属公司：" prop="companyId">
                  <el-input
                    :disabled="true"
                    :on-icon-click="searchCompany"
                    icon="search"
                    v-model="form.company">
                  </el-input>
                </el-form-item>
                <el-form-item label="归属部门：" prop="officeId">
                  <el-input
                    :disabled="true"
                    :on-icon-click="searchSection"
                    icon="search"
                    v-model="form.office">
                  </el-input>
                </el-form-item>

                <el-form-item label="工号：">
                  <el-input v-model="form.no" :disabled="saveUp"></el-input>
                </el-form-item>

                <el-form-item label="姓名：" prop="name">
                  <el-input v-model="form.name" :disabled="saveUp"></el-input>
                </el-form-item>

                <el-form-item label="登录名：" prop="loginName">
                  <el-input v-model="form.loginName" :disabled="saveUp"></el-input>
                </el-form-item>

                <el-form-item label="密码：" prop="password">
                  <el-input v-model="form.password" :disabled="saveUp" type="password">></el-input>
                </el-form-item>

                <el-form-item v-if="!saveUp" label="确认密码：" prop="psd">
                  <el-input v-model="form.psd" type="password"></el-input>
                </el-form-item>

                <el-form-item label="邮箱：">
                  <el-input v-model="form.email" :disabled="saveUp"></el-input>
                </el-form-item>

                <el-form-item label="电话：">
                  <el-input v-model="form.phone" :disabled="saveUp"></el-input>
                </el-form-item>

                <el-form-item label="手机：">
                  <el-input v-model="form.mobile" :disabled="saveUp"></el-input>
                </el-form-item>

                <el-form-item label="是否允许登录：" prop="loginFlag">
                  <el-select v-model="form.loginFlag" clearable :disabled="saveUp" class="width">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                  </el-select>
                  <br>
                  <a>*“是”代表此账号允许登录，“否”则表示此账号不允许登录</a>
                </el-form-item>

                <el-form-item label="用户角色：" prop="roleId">
                  <el-checkbox-group v-model="checkedRoles" @change="handleCheckedCitiesChange">
                    <el-checkbox :disabled="saveUp" v-for="role in roles" :label="role" :key="role">{{role}}
                    </el-checkbox>
                  </el-checkbox-group>
                </el-form-item>

                <el-form-item label="备注：">
                  <el-input v-model="form.remarks" type="textarea" class='textarea' :disabled="saveUp"></el-input>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" :disabled="saveUp" @click="saveData('form')">保存</el-button>
                  <el-button @click="back">返回</el-button>
                </el-form-item>
              </el-form>

            </el-tab-pane>

          </el-tabs>
          <!--模态框-->

          <el-dialog :title=title size="tiny" :visible.sync="cityVisible" center>
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
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  //  import baseUrl from '../../../utils/baseUrl.js'
  import Cookie from 'js-cookie'

  export default {
    data () {
      return {
        title: '',
        titleSecond: '用户添加',
        select: '',
        cityVisible: false,
//        errMessage: false,
//        exportFormVisible: false,
        saveUp: false,
        Token: {},
        checkedRoles: [],
        arr: [],
        roles: [],
        roleObj: {},
        roleName: [],
        login_flag: {'1': '是', '0': '否'},
        msg: '',
        filterText: '',
        filterId: '',
        activeName2: 'first',
        formInline: {}, // 条件搜索字段
//        exportParam: {
//          companyId: '',
//          officeId: '',
//          loginName: '',
//          name: '',
//          pageNum: 1,
//          pageSize: 30
//        }, // 导出
        pagination: {pageSizes: [30, 40, 60, 100], pageSize: 30, count: 0, pageNum: 1},
        select_city: [],
        select_section: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        form: {}, // 详情展示数据
        tableData: [], // 列表展示数据
        rules: {
          companyId: [
            {required: true, message: '请输入归属公司', trigger: 'blur'}
          ],
          officeId: [
            {required: true, message: '请输入归属部门', trigger: 'blur'}
          ],
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'}
          ],
          loginName: [
            {required: true, message: '请输入登录名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ],
          psd: [
            {required: true, message: '请确认密码', trigger: 'blur'}
          ],
          loginFlag: [
            {required: true, message: '请选择', trigger: 'blur'}
          ],
          arr: [
            {required: true, message: '请选择角色', trigger: 'blur'}
          ]
        }
      }
    },
    mounted () {
      this.$refs.search_bar.$el.style.height = (document.documentElement.clientHeight - 100) + 'px'
    },
    created () {
      this.office()
      this.companySearch()
      this.getRole()
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
        return data.name.indexOf(value) !== -1
      },
      handleClick (tab, event) {
        if (this.activeName2 === 'first') {
          this.titleSecond = '用户添加'
        }
        if (tab.label === '用户添加') {
          this.addNewRecord()
        }
      },
      handleNodeClick (data) {
        if (this.activeName2 === 'first') {
          this.formInline.officeName = data.name
          this.formInline.officeId = data.id
        } else if (this.activeName2 === 'second') {
          this.form.office = data.name
          this.form.officeId = data.id
        }
      },
      query () {
//        this.exportParam.companyId = this.formInline.companyId
//        this.exportParam.officeId = this.formInline.officeId
//        this.exportParam.loginName = this.formInline.loginName
//        this.exportParam.name = this.formInline.name
//        this.exportParam.pageNum = this.formInline.pageNum
//        this.exportParam.pageSize = this.formInline.pageSize
        this.$ajax.get('/setting/user/list', {params: this.formInline})
          .then(response => {
            if (response.data.code === 200) {
              let resultData = response.data.data
              this.tableData = resultData.result
              this.tableData.loginFlag = this.login_flag[resultData.result.loginFlag]
              this.pagination.count = resultData.total
              console.log(this.tableData)
            } else {
              this.$message({
                type: 'error',
                message: '获取列表信息失败'
              })
            }
          })
          .catch(() => {
            this.$message({
              type: 'error',
              message: '获取列表信息异常'
            })
          })
      },
      deleteRecord (id) {
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          if (id !== undefined) {
            // 调用后台服务
            // 删除元素
            this.$ajax.get('/setting/user/delete', {params: {'id': id, sessionId: Cookie.get('sessionId')}})
              .then((res) => {
                if (res.data.code === 200) {
                  // 删除成功
                  this.$message({
                    type: 'success',
                    message: res.data.msg
                  })
                  // 刷新页面
                  this.query()
                } else {
                  this.$message({
                    type: 'error',
                    message: '删除失败'
                  })
                }
              })
              .catch(() => {
                this.$message({
                  type: 'error',
                  message: '删除异常'
                })
              })
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消删除'
          })
        })
      },
      modifyRecord (scope) {
        this.$refs['form'].resetFields()
        this.activeName2 = 'second'
        this.titleSecond = '用户修改'
        this.saveUp = false
        this.$ajax.get('/setting/user/form', {params: {userId: scope.row.id}})
          .then((res) => {
            if (res.data.code === 200) {
              this.form = res.data.data
              this.form.psd = this.form.password
              let checkedCity = res.data.data.role
              this.checkedRoles = checkedCity.split(',')
            } else {
              this.$message({
                type: 'error',
                message: '获取失败'
              })
            }
          })
          .catch(() => {
            this.$message({
              type: 'error',
              message: '获取异常'
            })
          })
      }, // 修改
      saveData (form) {       // 修改确定功能
        this.$refs[form].validate((valid) => {
          if (form.password === form.psd) {
            if (valid) {
              let url = ''
              if (this.form.id !== undefined && this.form.id !== '') {  // 修改
                url = '/setting/user/update'
              } else {  // 新增
                url = '/setting/user/add'
              }
              let roleIds = []
              for (let i = 0; i < this.arr.length; i++) {
                roleIds.push(this.roleObj[this.arr[i]])
              }
              this.form.roleId = roleIds.join(',')
              this.$ajax.get(url, {params: this.form})
                .then((response) => {
                  if (response.data.code === 200) {
                    // 更新成功
                    this.$message({
                      type: 'success',
                      message: '操作成功'
                    })
                    this.activeName2 = 'first'
                    // 刷新页面
//                    this.$refs.uploadFile.clearFiles()
                    this.query()
                  } else {
                    this.$message({
                      type: 'error',
                      message: '操作失败'
                    })
                  }
                })
                .catch(() => {
                  this.$message({
                    type: 'error',
                    message: '操作异常'
                  })
                })
            } else {
              return false
            }
          } else {
            alert('两次输入的密码不一致')
          }
        })
      },
      addNewRecord () {
        this.$refs['form'].resetFields()
        this.activeName2 = 'second'
        this.titleSecond = '用户添加'
        this.saveUp = false
        this.form = {}
        this.checkedRoles = []
      },   // 新增
      more (row, column, cell, event) {
        this.$refs['form'].resetFields()
        if (column.property !== 'loginName') {
          return false
        } else {
          this.activeName2 = 'second'
          this.titleSecond = '用户详情'
          this.saveUp = true  // 保存按钮不显示
          this.$ajax.get('/setting/user/form', {params: {userId: row.id}})
            .then((res) => {
              if (res.data.code === 200) {
                this.form = res.data.data
                console.log(this.form)
                let checkedCity = res.data.data.role
                this.checkedRoles = checkedCity.split(',')
                console.log(this.checkedRoles)
              } else {
                this.$message({
                  type: 'error',
                  message: '获取详情失败'
                })
              }
            })
            .catch(() => {
              this.$message({
                type: 'error',
                message: '获取详情异常'
              })
            })
        }
      }, // 详情
      handleCheckedCitiesChange (value) {
        this.arr = value
      },
      office () {
        this.$ajax.get('/setting/user/section', {params: {sessionId: Cookie.get('sessionId')}})
          .then(response => {
            if (response.data.code === 200) {
              this.select_section = response.data.data
            } else {
              this.$message({
                type: 'error',
                message: '获取归属部门列表失败'
              })
            }
          })
          .catch(() => {
            this.$message({
              type: 'error',
              message: '获取归属部门列表异常'
            })
          })
      },
      companySearch () {
        this.$ajax.get('/setting/user/company', {params: {sessionId: Cookie.get('sessionId')}})
          .then(response => {
            if (response.data.code === 200) {
              this.select_city = response.data.data
            } else {
              this.$message({
                type: 'error',
                message: '获取归属公司列表失败'
              })
            }
          })
          .catch(() => {
            this.$message({
              type: 'error',
              message: '获取归属公司列表异常'
            })
          })
      },
      handleNode (data) {
        this.filterText = data.name // 弹框树模型点击输入值
        this.filterId = data.id // 弹框树模型点击输入值
      },
      searchCompany () {
        this.cityVisible = true
        this.title = '选择公司'
        this.select = this.select_city
        this.filterText = ''
        this.filterId = ''
      },
      searchSection () {
        this.cityVisible = true
        this.title = '选择部门'
        this.select = this.select_section
        this.filterText = ''
        this.filterId = ''
      },
      doModify () {
        if (this.activeName2 === 'first') {
          if (this.title === '选择公司') {
            this.formInline.companyName = this.filterText
            this.formInline.companyId = this.filterId
          } else if (this.title === '选择部门') {
            this.formInline.officeName = this.filterText
            this.formInline.officeId = this.filterId
          }
        } else if (this.activeName2 === 'second') {
          if (this.title === '选择公司') {
            this.form.company = this.filterText
            this.form.companyId = this.filterId
          } else if (this.title === '选择部门') {
            this.form.office = this.filterText
            this.form.officeId = this.filterId
          }
        }
        this.cityVisible = false
        console.log(this.formInline)
      },
      modifyCancel () {
        this.cityVisible = false
        this.formInline.companyId = ''
        this.formInline.companyName = ''
        this.formInline.officeId = ''
        this.formInline.officeName = ''
        this.form.companyId = ''
        this.form.company = ''
        this.form.officeId = ''
        this.form.office = ''
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
      getRole () {
        this.$ajax.get('/setting/user/role', {params: {pageSize: 50}})
          .then(response => {
            if (response.data.code === 200) {
              let resultData = response.data.data
              console.log(resultData)
              for (let i = 0; i < resultData.result.length; i++) {
                this.roles.push(resultData.result[i].name)
                this.roleObj[resultData.result[i].name] = resultData.result[i].id
              }
            } else {
              this.$message({
                type: 'error',
                message: '获取角色失败'
              })
            }
          })
          .catch(() => {
            this.$message({
              type: 'error',
              message: '获取角色异常'
            })
          })
      },
//      getFile () {}, // todo 导入
//      importFile () {}, // 导入
//      errorClose () {
//        this.errMessage = false
//      },
//      exportFile () {
//        this.exportFormVisible = true
//      },
//      cancelExport () {
//        this.exportFormVisible = false
//      },
//      exportCurrent () {
//        this.exportParam.pageNum = this.pagination.pageNum
//        this.exportParam.pageSize = this.pagination.pageSize
//        this.$refs['FileForm'].setAttribute('action', `${baseUrl}/setting/user/export`)
//        this.$refs['FileForm'].submit()
//        this.exportFormVisible = false
//      },
//      exportAll () {
//        this.exportParam.pageSize = ''
//        this.exportParam.pageNum = ''
//        this.$refs['FileForm'].setAttribute('action', `${baseUrl}/setting/user/exportAll`)
//        this.$refs['FileForm'].submit()
//        this.exportFormVisible = false
//      },
//      // 上传之前 清除原有图片
//      clearUploadedImgPath () {
//        // 如果有就清除
//        if (this.form.imgPath) {
//          this.$refs.uploadFile.clearFiles()
//        }
//        this.form.imgPath = ''
//      },
//      // 移除图片时清空form表单中的图片地址
//      removeImgPath () {
//        this.form.imgPath = ''
//      },
//      // 上传组件获取oss相关
//      beforeUploadImgPath (file) {
//        return new Promise((resolve) => {
//          this.$ajax.get('beforeUpload/img', {params: {user_dir: 'tActivitiesInfo'}})
//            .then((res) => {
//              this.Token = res.data
//              this.Token.key = this.Token.dir + '/' + (+new Date()) + '_' + file.name
//              resolve()
//            })
//            .catch(err => {
//              this.$message({
//                message: err.data.msg,
//                type: 'error'
//              })
//            })
//        })
//      },
//      successImgPath (response, file, fileList) {
//        this.form.imgPath = 'http://jjdcjavaweb.oss-cn-shanghai.aliyuncs.com/' + this.Token.key
//      },
      back () {
        this.activeName2 = 'first'
        this.titleSecond = '用户添加'
      }
    }
  }
</script>

<style scoped>
  @import '../../../assets/css/common.css';
  @import '../../../assets/css/treecss.css';

  .width {
    width: 300px;
  }

  .importForm {
    height: 0px;
    padding-left: 10px;
    padding-top: 0px !important;
    margin-bottom: 20px !important;
  }

  .errorMsg {
    margin-top: 40px;
    padding-left: 10px;
    background-color: #ccc;
  }

  .errorIcon {
    top: 0px;
  }

  .search {
    height: 20px;
    outline-style: none;
    border: 1px solid #ccc;
    border-radius: 5px;
    cursor: pointer;
  }

  .searchTree {
    margin-top: 20px;
  }

  .right {
    overflow: hidden;
  }

  .search_bar {
    border: 1px solid #ccc;
    overflow: auto;
  }

  .second .textarea, .second .el-input, .second .el-input__inner {
    width: 300px;
  }

  a {
    color: red;
  }

  .active {
    color: #20a0ff;
    cursor: pointer;
  }

  .el-tabs__content {
    padding-left: 10px;
  }
</style>
