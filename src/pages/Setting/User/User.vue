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
                    v-model="formInline.attributionCompany">
                  </el-input>
                </el-form-item>
                <el-form-item label="归属部门：">
                  <el-input
                    :disabled="true"
                    :on-icon-click="searchSection"
                    icon="search"
                    v-model="formInline.attributionSection">
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

                <el-form-item>
                  <el-button type="primary" @click="exportFile">导出</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="addNewRecord">新增</el-button>
                </el-form-item>
              </el-form>
              <el-form class='importForm'>
                <el-form-item label="点击上传：">
                  <input ref='upload' type="file" @change="getFile">
                  <button @click="importFile">导入</button>
                </el-form-item>
              </el-form>
              <div v-if="errMessage" class='errorMsg'>
                <button @click='errorClose' class="errorIcon">关闭</button>
                <div v-html="msg"></div>
              </div>
              <!--隐藏表单用于查询-->
              <form v-show="false" action="" method="post" ref="FileForm">
                <input name="attributionCompany" v-model="exportParam.attributionCompany"/>
                <input name="attributionSection" v-model="exportParam.attributionSection"/>
                <input name="loginName" v-model="exportParam.loginName"/>
                <input name="name" v-model="exportParam.name"/>
                <input name="pageSize" v-model="exportParam.pageSize"/>
                <input name="pageNo" v-model="exportParam.pageNo"/>
              </form>

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
                  prop="id"
                  label="id"
                  width="260">
                </el-table-column>
                <el-table-column
                  header-align="center"
                  align="center"
                  prop="attributionCompany"
                  label="归属公司"
                  width="260">
                </el-table-column>

                <el-table-column
                  header-align="center"
                  align="center"
                  prop="attributionSection"
                  label="归属部门"
                  width="260">
                </el-table-column>

                <el-table-column
                  header-align="center"
                  align="center"
                  prop="loginName"
                  label="登录名"
                  width="260">
                  <template slot-scope="scope">
                    <span v-bind:class="{active: true}">{{ scope.row.loginName}}</span>
                  </template>
                </el-table-column>

                <el-table-column
                  header-align="center"
                  align="center"
                  prop="name"
                  label="姓名"
                  width="180">
                </el-table-column>

                <el-table-column
                  header-align="center"
                  align="center"
                  prop="tel"
                  label="电话"
                  width="300">
                </el-table-column>

                <el-table-column
                  header-align="center"
                  align="center"
                  prop="photo"
                  label="手机"
                  width="300">
                </el-table-column>

                <el-table-column
                  fixed="right"
                  header-align="center"
                  align="center"
                  label="操作"
                  width="160">
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
                :current-page="pagination.pageNo"
                :page-sizes="pagination.pageSizes"
                :page-size="pagination.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pagination.count">
              </el-pagination>
              <!--导出-->
              <el-dialog size='tiny' title="导出" :visible.sync="exportFormVisible" :show-close="false"
                         :close-on-press-escape="false"
                         :close-on-click-modal="false" class="demo-ruleForm ">
                <el-button @click="exportCurrent">导出当前页</el-button>
                <el-button @click="exportAll">导出所有</el-button>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="cancelExport">取 消</el-button>
                </div>
              </el-dialog>

            </el-tab-pane>

            <!--用户添加 -->
            <el-tab-pane :label='titleSecond' name="second" class="second">

              <el-form ref="form" :model="form" :rules="rules" label-width="150px">
                <el-form-item label="头像：">
                  <el-input v-model="form.imgPath" v-show='false'></el-input>
                  <img width="100%" :src="form.imgPath" alt="头像">
                  <el-upload
                    :disabled="saveUp"
                    ref="uploadFile"
                    list-type="picture-card"
                    action='http://jjdcjavaweb.oss-cn-shanghai.aliyuncs.com'
                    :data="Token"
                    :on-remove="removeImgPath"
                    :on-success="successImgPath"
                    :before-upload="beforeUploadImgPath">
                    <el-button :disabled="saveUp" type="primary" @click="clearUploadedImgPath">上传图片
                      <i class="el-icon-upload el-icon--right"></i>
                    </el-button>
                  </el-upload>
                </el-form-item>
                <el-form-item label="归属公司：">
                  <el-input
                    :disabled="true"
                    :on-icon-click="searchCompany"
                    icon="search"
                    v-model="form.attributionCompany">
                  </el-input>
                </el-form-item>
                <el-form-item label="归属部门：">
                  <el-input
                    :disabled="true"
                    :on-icon-click="searchSection"
                    icon="search"
                    v-model="form.attributionSection">
                  </el-input>
                </el-form-item>

                <el-form-item label="工号：" prop="number">
                  <el-input v-model="form.number"></el-input>
                </el-form-item>

                <el-form-item label="姓名：" prop="name">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>

                <el-form-item label="登录名：" prop="loginName">
                  <el-input v-model="form.loginName"></el-input>
                </el-form-item>

                <el-form-item label="密码：" prop="psw">
                  <el-input v-model="form.psw">></el-input>
                </el-form-item>

                <el-form-item label="确认密码：" prop="password">
                  <el-input v-model="form.password"></el-input>
                </el-form-item>

                <el-form-item label="邮箱：">
                  <el-input v-model="form.email"></el-input>
                </el-form-item>

                <el-form-item label="电话：">
                  <el-input v-model="form.tel"></el-input>
                </el-form-item>

                <el-form-item label="手机：">
                  <el-input v-model="form.phone"></el-input>
                </el-form-item>

                <el-form-item label="是否允许登录：" prop="isLogin">
                  <el-select v-model="form.isLogin" clearable>
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="2"></el-option>
                  </el-select>
                  <p>* “是”代表此账号允许登录，“否”则表示此账号不允许登录</p>
                </el-form-item>

                <el-form-item label="用户类型：">
                  <el-select v-model="form.userType" placeholder="选择用户类型" clearable>
                    <el-option label="系统管理" value="1"></el-option>
                    <el-option label="部门管理" value="2"></el-option>
                    <el-option label="普通用户" value="3"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="用户角色：" prop="userRole">
                  <el-radio-group v-model="form.userRole">
                    <el-radio label="本公司管理员"></el-radio>
                    <el-radio label="本部门管理员"></el-radio>
                    <el-radio label="部门管理员"></el-radio>
                  </el-radio-group>
                </el-form-item>

                <el-form-item label="备注：">
                  <el-input v-model="form.remark" type="textarea" class='textarea'></el-input>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" :disabled="saveUp" @click="saveData(form)">保存</el-button>
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
  import baseUrl from '../../../utils/baseUrl.js'

  export default {
    data () {
      return {
        title: '',
        titleSecond: '用户添加',
        select: '',
        cityVisible: false,
        errMessage: false,
        exportFormVisible: false,
        saveUp: false,
        Token: {},
        msg: '',
        filterText: '',
        activeName2: 'first',
        formInline: {
          attributionCompany: '',
          attributionSection: '',
          loginName: '',
          name: '',
          key: ''
        }, // 条件搜索字段
        exportParam: {
          attributionCompany: '',
          attributionSection: '',
          loginName: '',
          name: '',
          pageSize: '',
          pageNo: ''
        }, // 导出
        pagination: {pageSizes: [30, 40, 60, 100], pageSize: 30, count: 0, pageNo: 1},
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
        select_section: [{
          id: 1,
          label: '上海市总公司',
          children: [{
            id: 4,
            label: '厦门分公司'
          }, {
            id: 4,
            label: '佛山分公司',
            children: [{
              id: 9,
              label: '城市运营'
            }]
          }, {
            id: 4,
            label: '珠海分公司',
            children: [{
              id: 9,
              label: '城市运营'
            }]
          }, {
            id: 4,
            label: '运营部'
          }, {
            id: 4,
            label: '北京分公司',
            children: [{
              id: 9,
              label: '城市运营'
            }]
          }, {
            id: 4,
            label: '客服部',
            children: [{
              id: 9,
              label: '红包管理员'
            }, {
              id: 9,
              label: '客服部'
            }]
          }, {
            id: 4,
            label: '上海分公司',
            children: [{
              id: 9,
              label: '黄浦区政府'
            }, {
              id: 9,
              label: '城市运营'
            }, {
              id: 9,
              label: '虹口区政府'
            }, {
              id: 9,
              label: '普陀区政府'
            }, {
              id: 9,
              label: '静安区政府'
            }, {
              id: 9,
              label: '嘉定区政府'
            }, {
              id: 9,
              label: '浦东新区政府'
            }, {
              id: 9,
              label: '闵行区政府'
            }, {
              id: 9,
              label: '宝山区政府'
            }, {
              id: 9,
              label: '松江区政府'
            }, {
              id: 9,
              label: '杨浦区政府'
            }, {
              id: 9,
              label: '徐汇区政府'
            }, {
              id: 9,
              label: '长宁区政府'
            }, {
              id: 9,
              label: '青浦区政府'
            }, {
              id: 9,
              label: '奉贤区政府'
            }, {
              id: 9,
              label: '金山区政府'
            }]
          }, {
            id: 4,
            label: '生产部'
          }, {
            id: 4,
            label: '成都分公司',
            children: [{
              id: 9,
              label: '城市运营'
            }]
          }, {
            id: 4,
            label: '湖州分公司',
            children: [{
              id: 9,
              label: '城市运营'
            }]
          }, {
            id: 4,
            label: '公司领导'
          }, {
            id: 4,
            label: '综合部'
          }, {
            id: 4,
            label: '市场部'
          }, {
            id: 4,
            label: '技术部'
          }, {
            id: 4,
            label: '研发部'
          }, {
            id: 4,
            label: '深圳分公司',
            children: [{
              id: 9,
              label: '城市运营'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        form: {}, // 详情展示数据
        tableData: [{
          id: 0,
          attributionCompany: '上海市长宁区虹桥路',
          attributionSection: '上海市长宁区虹桥路',
          loginName: '大剿匪啊啊啊',
          name: '大剿匪啊',
          photo: 45454844,
          tel: 123456
        }], // 列表展示数据
        rules: {
          number: [
            {required: true, message: '请输入工号', trigger: 'blur'}
          ],
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'}
          ],
          loginName: [
            {required: true, message: '请输入登录名', trigger: 'blur'}
          ],
          psw: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 3, message: '长度在 3 以上', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请确认密码', trigger: 'blur'},
            {min: 3, message: '长度在 3 以上', trigger: 'blur'}
          ],
          isLogin: [
            {required: true, message: '请选择', trigger: 'blur'}
          ],
          userRole: [
            {required: true, message: '请选择角色', trigger: 'blur'}
          ]
        }
      }
    },
    mounted () {
      this.$refs.search_bar.$el.style.height = (document.documentElement.clientHeight - 100) + 'px'
    },
    created () {
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
      handleClick (tab, event) {
        if (this.activeName2 === 'first') {
          this.titleSecond = '用户添加'
        }
        if (tab.label === '用户添加') {
          this.addNewRecord()
        }
      },
      handleNodeClick (data) {
        if (data.label.slice(-2) === '公司' || data.label.slice(-2) === '服部') {
          this.formInline.attributionCompany = data.label
        } else {
          this.formInline.attributionSection = data.label
        }
      },
      query () {
        this.exportParam.attributionCompany = this.formInline.attributionCompany
        this.exportParam.attributionSection = this.formInline.attributionSection
        this.exportParam.loginName = this.formInline.loginName
        this.exportParam.name = this.formInline.name
        this.exportParam.pageNo = this.formInline.pageNo
        this.exportParam.pageSize = this.formInline.pageSize
        this.$ajax.get('/list', {params: this.formInline})
          .then(response => {
            if (response.data.code === 200) {
              this.tableData1 = response.data.data.result
              this.pagination.count = response.data.data.total
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
              message: '获取列表信息失败'
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
            this.$ajax.post('/delete', {params: {'id': id}})
              .then((res) => {
                if (res.data.code === 0) {
                  // 删除成功
                  this.$message({
                    type: 'success',
                    message: res.data.msg
                  })
//                this.$refs['formA'].resetFields()
                  // 刷新页面
                  this.query()
                } else {
                  this.$message({
                    type: 'error',
                    message: res.data.msg
                  })
                }
              })
              .catch(() => {
                this.$message({
                  type: 'error',
                  message: '操作失败'
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
        this.$ajax.get('/activity/enjoy/form', {params: {id: scope.row.id}})
          .then((res) => {
            if (res.data.code === 0) {
              this.form = res.data.tActivitiesInfo
            } else {
              this.$message({
                type: 'error',
                message: res.data.msg
              })
            }
          })
          .catch((error) => {
            console.log('点击修改报错:', error)
            this.$message({
              type: 'error',
              message: '获取失败'
            })
          })
      }, // 修改
      saveData (form) {       // 修改确定功能
        this.$refs[form].validate((valid) => {
          if (valid) {
            this.activeName2 = 'first'
            this.form.userRole = {}
            this.$ajax.get('/activity/enjoy/save', {params: this.form})
              .then((response) => {
                if (response.data.code === 0) {
                  // 更新成功
                  this.$message({
                    type: 'success',
                    message: '操作成功'
                  })
                  // 刷新页面
                  this.$refs.uploadFile.clearFiles()
                  this.query()
                } else {
                  this.$message({
                    type: 'error',
                    message: '操作失败'
                  })
                }
              })
              .catch((err) => {
                this.$message({
                  type: 'error',
                  message: err
                })
              })
          } else {
            return false
          }
        })
      },
      addNewRecord () {
        this.$refs['form'].resetFields()
        this.activeName2 = 'second'
        this.titleSecond = '用户添加'
        this.saveUp = false
        this.$ajax.get('/activity/enjoy/sort')
          .then((res) => {
            if (res.data.code === 0) {
              this.form = {}
              this.form.sort = res.data.tActivitiesInfo.sort
            } else {
              this.$message({
                type: 'error',
                message: res.data.msg
              })
            }
          })
          .catch(() => {
            this.$message({
              message: '请求显示顺序失败',
              type: 'info'
            })
          })
      },   // 新增
      more (row, column, cell, event) {
        this.$refs['form'].resetFields()
        if (column.property !== 'loginName') {
          return false
        } else {
          this.activeName2 = 'second'
          this.titleSecond = '用户详情'
          this.saveUp = true
          this.$ajax.get('/activity/enjoy/view/form', {params: {id: row.id}})
            .then((res) => {
              if (res.data.code === 0) {
                this.form = res.data.tActivitiesInfo
              } else {
                this.$message({
                  type: 'error',
                  message: '获取列表失败'
                })
              }
            })
        }
      }, // 详情
      handleNode (data) {
        this.filterText = data.label // 弹框树模型点击输入值
      },
      searchCompany () {
        this.cityVisible = true
        this.title = '选择公司'
        this.select = this.select_city
        this.filterText = ''
      },
      searchSection () {
        this.cityVisible = true
        this.title = '选择部门'
        this.select = this.select_section
        this.filterText = ''
      },
      doModify () {
        if (this.title === '选择公司') {
          this.formInline.attributionCompany = this.filterText
        } else if (this.title === '选择部门') {
          this.formInline.attributionSection = this.filterText
        }
        this.cityVisible = false
      },
      modifyCancel () {
        this.cityVisible = false
        this.formInline.attributionCompany = ''
        this.formInline.attributionSection = ''
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
      getFile () {}, // todo 导入
      importFile () {}, // 导入
      errorClose () {
        this.errMessage = false
      },
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
      },
      // 上传之前 清除原有图片
      clearUploadedImgPath () {
        // 如果有就清除
        if (this.form.imgPath) {
          this.$refs.uploadFile.clearFiles()
        }
        this.form.imgPath = ''
      },
      // 移除图片时清空form表单中的图片地址
      removeImgPath () {
        this.form.imgPath = ''
      },
      // 上传组件获取oss相关
      beforeUploadImgPath (file) {
        return new Promise((resolve) => {
          this.$ajax.get('beforeUpload/img', {params: {user_dir: 'tActivitiesInfo'}})
            .then((res) => {
              this.Token = res.data
              this.Token.key = this.Token.dir + '/' + (+new Date()) + '_' + file.name
              resolve()
            })
            .catch(err => {
              this.$message({
                message: err.data.msg,
                type: 'error'
              })
            })
        })
      },
      successImgPath (response, file, fileList) {
        this.form.imgPath = 'http://jjdcjavaweb.oss-cn-shanghai.aliyuncs.com/' + this.Token.key
      },
      back () {
        this.activeName2 = 'first'
        this.titleSecond = '用户添加'
      }
    }
  }
</script>

<style scoped>
  .padding {
    padding-left: 10px;
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

  .demo-ruleForm {
    font-size: 20px !important;
    text-align: center;
  }

  .keySearch {
    width: 140px;
    height: 20px;
    outline-style: none;
    border: 1px solid #ccc;
    border-radius: 5px;
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

  p {
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
