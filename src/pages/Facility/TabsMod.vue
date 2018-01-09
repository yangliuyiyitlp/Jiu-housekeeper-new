<template>
  <div>
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <el-tab-pane label="电子围栏基础信息" name="first">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="显示规则：">
            <el-select v-model="formInline.showRule" clearable>
              <el-option v-for="(val,key) in opFlag" v-bind:key=key :label=opFlag[key] :value=key></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="更新时间：">
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
          <el-form-item v-if="hasPermission('view')">
            <el-button type="primary" @click="query">查询</el-button>
          </el-form-item>
          <el-form-item v-if="hasPermission('city:fencing:info:create')">
            <el-button type="primary" @click="addNewRecord">新增</el-button>
          </el-form-item>
          <el-form-item v-if="hasPermission('export')">
            <el-button type="primary">导出</el-button>
          </el-form-item>
        </el-form>
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          @cell-click="more">
          <el-table-column
            prop="id"
            label="ID"
            v-if="0">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            label="ID"
            prop="id">
            <template slot-scope="scope">
              <span v-bind:class="{active: true}">{{ scope.row.id}}</span>
            </template>
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="showRule"
            label="显示规则">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="autoDisplayTimes"
            label="展示次数">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="updateDate"
            label="更新时间">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            show-overflow-tooltip
            prop="remarks"
            label="备注">
          </el-table-column>
          <el-table-column
            v-if = 'updateDelete'
            header-align="center"
            align="center"
            width="100"
            label="操作">
            <template slot-scope="scope">
              <el-button v-if="hasPermission('city:fencing:info:update')" @click="modifyRecord(scope.row.id)" type="text" size="small">修改</el-button>
              <el-button v-if="hasPermission('city:fencing:info:delete')" @click="deleteRecord(scope.row.id)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane :label="title" name="second" v-if="create">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
          <el-form-item label="展示规则：" prop="showRule">
            <el-select v-model="ruleForm.showRule" clearable>
              <el-option v-for="(val,key) in opFlag" v-bind:key=key :label=opFlag[key] :value=key></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="展示次数：" >
            <el-input v-model="ruleForm.autoDisplayTimes" class="width"></el-input>
            <a>填写的必须为数字(若不是数字,默认为0)</a>
          </el-form-item>

          <el-form-item label="图标图片：">
            <el-input v-model="ruleForm.iconUrl" v-show='false'></el-input>
            <img width="100%" :src="ruleForm.iconUrl" alt="图标图片">
            <el-upload
              :disabled="!update"
              ref="loadFile"
              list-type="picture-card"
              action='http://jjdcjavaweb.oss-cn-shanghai.aliyuncs.com'
              :data="Token"
              :on-remove="removeImgPath"
              :on-success="successImgPath"
              :before-upload="beforeUploadImgPath">
              <el-button :disabled="!update" type="primary" @click="clearUploadedImgPath">上传图片
                <i class="el-icon-upload el-icon--right"></i>
              </el-button>
            </el-upload>
          </el-form-item>

          <el-form-item label="展示图片：">
            <el-input v-model="ruleForm.displayUrl" v-show='false'></el-input>
            <img width="100%" :src="ruleForm.displayUrl" alt="展示图片">
            <el-upload
              :disabled="!update"
              ref="upload"
              list-type="picture-card"
              action='http://jjdcjavaweb.oss-cn-shanghai.aliyuncs.com'
              :data="Token1"
              :on-remove="removeCoverPath"
              :on-success="successCoverPath"
              :before-upload="beforeUploadCoverPath">
              <el-button :disabled="!update" type="primary" @click="clearUploadedCoverPath">上传图片
                <i class="el-icon-upload el-icon--right"></i>
              </el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input type="textarea" v-model="ruleForm.remarks" class="width"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button v-if="update" type="primary" @click="submitForm('ruleForm')">{{tip}}</el-button>
            <el-button v-if='update' @click="resetForm('ruleForm')">重置</el-button>
            <el-button @click="back">返回</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import Cookie from 'js-cookie'
  import a from '../../assets/js/getsessionId.js'
  import baseUrl from '../../utils/baseUrl'

  export default {
    data () {
      return {
        activeName2: 'first',
        update: true,
        value6: '',
        title: '电子围栏基础信息新增',
        opFlag: {0: '都不显示', 1: '围栏外显示', 2: '围栏内显示', 3: '都显示'},
        showFlag: '',
        tip: '立即创建',
        updateDelete: '',
        Token: {},
        Token1: {},
        tableData: [],
        formInline: {},
        ruleForm: {},
        rules: {
          showRule: [
            {required: true, message: '请选择显示规则', trigger: 'blur'}
          ]
        },
        adminId: '',
        path: '',
        permissionList: ['city:fencing:info:create', 'city:fencing:info:update', 'city:fencing:info:delete']
      }
    },
    created () {
      // 请求按钮权限
      this.adminId = this.$route.query.adminId
      this.path = this.$route.path
//      this.sessionId(this.adminId, this.path)
      a.sessionId(this.adminId, this.path, this.$router, this.$ajax, this.permissionList)
      this.query()
      if (this.hasPermission('city:fencing:info:create')) {
        this.create = true
      } else {
        this.create = false
      }
      if (this.hasPermission('city:fencing:info:update') || this.hasPermission('city:fencing:info:delete')) {
        this.updateDelete = true
      } else {
        this.updateDelete = false
      }
    },
    methods: {
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
//      sessionId (adminId, path) {
//        console.log(22)
//        console.log(999)
//        if (adminId && path) {
//          Cookie.remove('adminId')
//          Cookie.set('adminId', adminId)
//          Cookie.set('path', path)
//          let data = {'path': 'http://192.168.0.107:8098/facility/register'}
//          this.$ajax.get(`${baseUrl.loginUrl}/sys/test`, {params: data})
//            .then(res => {
//              console.log(res)
//              if (res.data.code === 200) {
//                console.log(33, res.data.data)
//                for (let i = 0; i < res.data.data.length; i++) {
//                  if (res.data.data[i].permission !== '' && res.data.data[i].permission !== undefined) {
//                    this.permissionList.push(res.data.data[i].permission)
//                  }
//                }
//                this.$router.push({path: path})
//              } else {
//                alert('页面跳转失败')
//              }
//            })
//            .catch(() => {
//              alert('页面跳转异常')
//            })
//        } else {
//          this.$router.push('/404')
//        }
//      },
      handleClick () {
        if (this.activeName2 === 'first' && this.hasPermission('city:fencing:info:create')) {
          this.title = '电子围栏基础信息新增'
        } else if (this.title === '电子围栏基础信息新增') {
          this.ruleForm = {}
          this.$refs.loadFile.clearFiles()
          this.$refs.upload.clearFiles()
          this.update = true
          this.tip = '立即创建'
          this.$refs.ruleForm.resetFields()
        }
      },
      query () {
        this.$ajax.get(`${baseUrl.cityFencingUrl}/remind/list`, {params: this.formInline})
          .then((res) => {
            if (res.data.code === 200) {
              let result = res.data.data
              this.tableData = result
              for (let i = 0; i < result.length; i++) {
                this.tableData[i].showRule = this.opFlag[result[i].showRule]
              }
            } else {
              this.$message({
                type: 'error',
                message: '获取列表失败'
              })
            }
          })
          .catch((error) => {
            console.log('获取列表失败:', error)
            this.$message({
              type: 'error',
              message: '获取列表异常'
            })
          })
      },
      getMore (id) {
        this.$ajax.get('/city/fencing/info/more', {params: {ruleId: id, sessionId: Cookie.get('sessionId')}})
          .then(res => {
            if (res.data.code === 200) {
              let resultData = res.data.data
              this.ruleForm = resultData
              this.showFlag = resultData.showRule
              this.ruleForm.showRule = this.opFlag[resultData.showRule]
              console.log(this.ruleForm)
            } else if (res.data.code === 500) {
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
      more (row, column, cell, event) {
        if (column.property !== 'id') {
          return false
        } else {
          this.activeName2 = 'second'
          this.create = true
          this.update = false
          this.title = '电子围栏基础信息详情'
          this.getMore(row.id)
          console.log(row.id)
        }
      },
      addNewRecord () {
        this.ruleForm = {}
        this.activeName2 = 'second'
        this.update = true
        this.$refs.ruleForm.resetFields()
      },
      back () {
        this.activeName2 = 'first'
        if (this.hasPermission('create')) {
          this.title = '电子围栏基础信息新增'
        }
      },
      modifyRecord (id) {
        this.activeName2 = 'second'
        this.create = true
        this.update = true
        this.title = '电子围栏基础信息修改'
        this.tip = '提交修改'
        this.getMore(id)
      },
      deleteRecord (id) {
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (id !== undefined) {
            this.$ajax.get(`${baseUrl.cityFencingUrl}/delete`, {params: {ruleId: id, sessionId: Cookie.get('sessionId')}})
              .then((res) => {
                console.log(res)
                if (res.data.code === 200) {
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
      resetForm (ruleForm) {
        this.ruleForm = {}
      },
      submitForm (ruleForm) {
        this.$refs[ruleForm].validate((valid) => {
          let url
          if (valid) {
            if (this.ruleForm.id === undefined || this.ruleForm.id === '') {
              url = '/city/fencing/info/add' // 新增功能
              this.ruleForm.showRule = parseInt(this.ruleForm.showRule)
              console.log(77)
            } else {
              url = '/city/fencing/info/update'
              console.log(this.ruleForm.showRule)
              console.log(this.opFlag[this.showFlag])
              if (this.ruleForm.showRule === this.opFlag[this.showFlag]) {
                this.ruleForm.showRule = parseInt(this.showFlag)
                console.log(this.ruleForm.showRule)
              } else {
                this.ruleForm.showRule = parseInt(this.ruleForm.showRule)
              }
            }
            if (this.ruleForm.autoDisplayTimes !== undefined && this.ruleForm.autoDisplayTimes !== '') {
              this.ruleForm.autoDisplayTimes = parseInt(this.ruleForm.autoDisplayTimes)
            } else {
              this.ruleForm.autoDisplayTimes = 0
            }
            this.ruleForm.sessionId = Cookie.get('sessionId')
            this.$ajax.post(url, this.ruleForm)
              .then(response => {
                if (response.data.code === 200) {
                  // 更新成功
                  this.$message({
                    type: 'success',
                    message: response.data.msg
                  })
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
      },
      // 上传组件获取oss相关
      beforeUploadImgPath (file) {
        return new Promise((resolve) => {
          this.$ajax.get('beforeUpload/img', {params: {user_dir: 'cityFencingInfo'}})
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
        this.ruleForm.iconUrl = 'http://jjdcjavaweb.oss-cn-shanghai.aliyuncs.com/' + this.Token.key
      },
      beforeUploadCoverPath (file) {
        return new Promise((resolve) => {
          this.$ajax.get('beforeUpload/img', {params: {user_dir: 'cityFencingInfo'}})
            .then((res) => {
              this.Token1 = res.data
              this.Token1.key = this.Token1.dir + '/' + (+new Date()) + file.name
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
      successCoverPath () {
        this.ruleForm.displayUrl = 'http://jjdcjavaweb.oss-cn-shanghai.aliyuncs.com/' + this.Token1.key
      },
      // 上传之前 清除原有图片
      clearUploadedImgPath () {
        // 如果有就清除
        if (this.ruleForm.iconUrl) {
          this.$refs.loadFile.clearFiles()
        }
        this.ruleForm.iconUrl = ''
      },
      clearUploadedCoverPath () {
        // 如果有就清除
        if (this.ruleForm.displayUrl) {
          this.$refs.upload.clearFiles()
        }
        this.ruleForm.displayUrl = ''
      },
      // 移除图片时清空form表单中的图片地址
      removeImgPath () {
        this.ruleForm.iconUrl = ''
      },
      removeCoverPath () {
        this.ruleForm.displayUrl = ''
      }
    }
  }
</script>
<style scoped>
  /*图片开始*/
  img {
    width: 148px;
    height: 148px;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  /*图片结束 */
  html, body {
    height: 100%;
  }

  .width {
    width: 203px;
  }
  .active {
    color: #20a0ff;
  }

  .demo-form-inline {
    padding-left: 10px;
  }

  .el-dialog__header {
    text-align: center;
  }

  .ruleForm > .el-form-item > .el-form-item__label {
    width: 100px !important;
  }

  .ruleForm > .el-form-item > .el-form-item__content {
    margin-left: 100px !important;
  }
</style>

<!--<template>-->
  <!--<div id="dataGrid">-->
    <!--<el-form :inline="true" :model="requestParam" class="demo-form-inline">-->
      <!--<el-form-item label="账户：">-->
        <!--<el-input v-model="requestParam.account"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="厂家名称：">-->
        <!--<el-input v-model="requestParam.providerName"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="锁厂家编号：">-->
        <!--<el-input v-model="requestParam.providerNo"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="登录状态：">-->
        <!--<el-select v-model="requestParam.loginStatus">-->
          <!--<el-option label="全部" value=""></el-option>-->
          <!--<el-option label="是" value="true"></el-option>-->
          <!--<el-option label="否" value="false"></el-option>-->
        <!--</el-select>-->
      <!--</el-form-item>-->
      <!--<el-form-item v-if="hasPermission('inPort')">-->
        <!--<el-button type="primary" @click="view">查询</el-button>-->
      <!--</el-form-item>-->
      <!--<el-form-item v-if="hasPermission('outPort')">-->
        <!--<el-button type="primary" @click="exportFile">导出</el-button>-->
      <!--</el-form-item>-->
      <!--<el-form-item v-if="hasPermission('create')">-->
        <!--<el-button type="primary" @click="dialogFormVisible = true">新增</el-button>-->
      <!--</el-form-item>-->
    <!--</el-form>-->
    <!--&lt;!&ndash;隐藏表单用于文件导出&ndash;&gt;-->
    <!--<form action="" style="display: none"-->
          <!--method=" " ref="FileForm">-->
      <!--<input name="account" v-model="exportParam.account"/>-->
      <!--<input name="providerName" v-model="exportParam.providerName"/>-->
      <!--<input name="providerNo" v-model="exportParam.providerNo"/>-->
      <!--<input name="loginStatus" v-model="exportParam.loginStatus"/>-->
      <!--<input name="pageSize" v-model="exportParam.pageSize"/>-->
      <!--<input name="pageNo" v-model="exportParam.pageNo"/>-->
    <!--</form>-->
    <!--<el-table-->
      <!--:data="tableData"-->
      <!--border-->
      <!--fit>-->
      <!--<el-table-column-->
        <!--prop="id"-->
        <!--v-show=false-->
        <!--label="ID">-->
      <!--</el-table-column>-->
      <!--// 返回的客户id-->
      <!--<el-table-column-->
        <!--header-align="center"-->
        <!--align="center"-->
        <!--prop="account"-->
        <!--label="账户">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--header-align="center"-->
        <!--align="center"-->
        <!--prop="providerName"-->
        <!--label="厂家名称">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--header-align="center"-->
        <!--align="center"-->
        <!--prop="providerNo"-->
        <!--label="锁厂家编号	">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--header-align="center"-->
        <!--align="center"-->
        <!--label="登录状态">-->
        <!--<template slot-scope="scope">-->
          <!--<div v-if="scope.row.loginStatus==='true'">是</div>-->
          <!--<div v-else>否</div>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--header-align="center"-->
        <!--align="center"-->
        <!--label="添加时间">-->
        <!--<template slot-scope="scope">-->
          <!--<el-icon name="time"></el-icon>-->
          <!--<span>{{ scope.row.createTime | AddDate}}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--v-if="hasPermission('updateDelete')"-->
        <!--header-align="center"-->
        <!--align="center"-->
        <!--label="操作">-->
        <!--<template slot-scope="scope">-->
          <!--<el-button @click="modifyRecord(scope)" type="text" size="small">修改</el-button>-->
          <!--<el-button @click="deleteRecord(scope.row.id)" type="text" size="small">删除</el-button>-->
        <!--</template>-->
      <!--</el-table-column>-->
    <!--</el-table>-->
    <!--<el-pagination-->
      <!--@size-change="handleSizeChange"-->
      <!--@current-change="handleCurrentChange"-->
      <!--:current-page="pagination.index"-->
      <!--:page-sizes="pagination.pageSizes"-->
      <!--:page-size="pagination.pageSize"-->
      <!--layout="total, sizes, prev, pager, next, jumper"-->
      <!--:total="pagination.total">-->
    <!--</el-pagination>-->
    <!--&lt;!&ndash;弹出框&ndash;&gt;-->
    <!--<el-dialog title="添加/修改" :visible.sync="dialogFormVisible" size='tiny' :show-close="false"-->
               <!--:close-on-press-escape="false"-->
               <!--:close-on-click-modal="false" class="demo-ruleForm ">-->
      <!--<el-form label-width="150px" :model="form" :rules="rules" ref="formA" class="tbody">-->
        <!--<el-form-item label="账户：" prop="account" class="elform">-->
          <!--<el-input v-model="form.account"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="厂家名称：" prop="providerName" class="elform ">-->
          <!--&lt;!&ndash;<el-input v-model="form.providerName"></el-input>&ndash;&gt;-->
          <!--&lt;!&ndash;<el-select v-model="form.providerName">&ndash;&gt;-->
          <!--&lt;!&ndash;&lt;!&ndash;动态获取锁厂登记表里面所有的厂家名称&ndash;&gt;&ndash;&gt;-->
          <!--&lt;!&ndash;&lt;!&ndash;<el-option v-for='(PName,index)in form ' :value="PName.providerName" v-text="PName.providerName"></el-option>&ndash;&gt;&ndash;&gt;-->
          <!--&lt;!&ndash;</el-select>&ndash;&gt;-->
          <!--<el-select filterable placeholder="请选择" v-model="form.providerNo" clearable @change="onSelected">-->
            <!--<el-option-->
              <!--v-for="item in providerOptions"-->
              <!--:key="item.no"-->
              <!--:label="item.name"-->
              <!--:value="item.no">-->
            <!--</el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <!--&lt;!&ndash;根据客户选择的厂家名称在锁厂登记表里匹配对应的锁厂编11号  &ndash;&gt;-->
        <!--<el-form-item label="锁厂家编号：" prop="providerNo" class="elform">-->
          <!--<el-input v-model="form.providerNo" :disabled="true"></el-input>-->
        <!--</el-form-item>-->
      <!--</el-form>-->
      <!--<div slot="footer" class="dialog-footer">-->
        <!--<el-button @click="cancelOperate">取 消</el-button>-->
        <!--<el-button type="primary" @click="doModify('formA')">确 定</el-button>-->
      <!--</div>-->

    <!--</el-dialog>-->
    <!--&lt;!&ndash;导出弹框&ndash;&gt;-->
    <!--<el-dialog size='tiny' title="导出" :visible.sync="exportFormVisible" :show-close="false"-->
               <!--:close-on-press-escape="false"-->
               <!--:close-on-click-modal="false" class="demo-ruleForm ">-->
      <!--<el-button @click="exportCurrent">导出当前页</el-button>-->
      <!--<el-button @click="exportAll">导出所有</el-button>-->
      <!--<div slot="footer" class="dialog-footer">-->
        <!--<el-button @click="cancelExport">取 消</el-button>-->
      <!--</div>-->
    <!--</el-dialog>-->

  <!--</div>-->
<!--</template>-->

<!--<script>-->
  <!--import baseUrl from '../../utils/baseUrl'-->

  <!--export default {-->
    <!--created: function () {-->
      <!--this.query()-->
    <!--},-->
    <!--data: function () {-->
      <!--return {-->
        <!--tableData: [{-->
          <!--account: '发发发',-->
          <!--providerName: '方法',-->
          <!--providerNo: 'ff',-->
          <!--id: '1'-->
        <!--}],-->
        <!--dialogFormVisible: false,  // 模态框是否显示-->
        <!--exportFormVisible: false,-->
        <!--form: {-->
          <!--account: '',-->
          <!--providerName: '',-->
          <!--providerNo: '',-->
          <!--id: ''-->
        <!--},-->
        <!--exportParam: {-->
          <!--account: '',-->
          <!--providerName: '',-->
          <!--providerNo: '',-->
          <!--loginStatus: '',-->
          <!--pageSize: 30,-->
          <!--pageNo: 1-->
        <!--},-->
        <!--formLabelWidth: '80px',-->
        <!--requestParam: {account: '', providerName: '', providerNo: '', loginStatus: '', pageSize: 30, index: 1},-->
        <!--rules: {-->
          <!--account: [-->
            <!--{required: true, message: '请输入账户名称', trigger: 'blur'}-->
          <!--],-->
          <!--providerName: [-->
            <!--{required: true, message: '请输入厂家名称', trigger: 'change'}-->
          <!--],-->
          <!--providerNo: [-->
            <!--{required: true, message: '请输入锁厂家编号', trigger: 'blur'}-->
          <!--]-->
        <!--},-->
        <!--pagination: {pageSizes: [30, 40, 60, 100], pageSize: 30, total: 0, index: 1},-->
        <!--providerOptions: []-->
      <!--}-->
    <!--},-->
    <!--methods: {-->
      <!--hasPermission (data) {-->
        <!--let permissionList = this.$route.meta.permission-->
        <!--if (permissionList && permissionList.length && permissionList.includes(data)) {-->
          <!--return true-->
        <!--}-->
        <!--return false-->
      <!--},-->
      <!--query: function () {-->
        <!--this.exportParam.account = this.requestParam.account-->
        <!--this.exportParam.providerName = this.requestParam.providerName-->
        <!--this.exportParam.providerNo = this.requestParam.providerNo-->
        <!--this.exportParam.loginStatus = this.requestParam.loginStatus-->
        <!--this.exportParam.pageNo = this.requestParam.pageNo-->
        <!--this.exportParam.pageSize = this.requestParam.pageSize-->

        <!--// 获取登录状态-->
        <!--this.$ajax.get('/facility/tabs/status', {params: {type: 'inmobi_display_type'}})-->
          <!--.then((res) => {-->
            <!--for (let i = 0; i < res.data.length; i++) {-->
              <!--this.disObj[res.data[i].value] = res.data[i].label-->
            <!--}-->
            <!--// 获取列表-->
            <!--this.$ajax.get('/facility/tabs/list', {params: this.requestParam})-->
              <!--.then((response) => {-->
                <!--if (response.data.code === 0) {-->
                  <!--this.tableData = response.data.page.list-->
                  <!--for (let i = 0; i < response.data.page.list.length; i++) {-->
                    <!--this.tableData[i].displayType = this.disObj[response.data.page.list[i].displayType]-->
                  <!--}-->
                  <!--this.pagination.count = response.data.page.count-->
                <!--} else {-->
                  <!--this.$message({-->
                    <!--type: 'error',-->
                    <!--message: '获取列表异常'-->
                  <!--})-->
                <!--}-->
              <!--})-->
              <!--.catch(() => {-->
                <!--this.$message({-->
                  <!--type: 'error',-->
                  <!--message: '获取列表异常'-->
                <!--})-->
              <!--})-->
          <!--})-->
          <!--.catch(() => {-->
            <!--this.$message({-->
              <!--type: 'error',-->
              <!--message: '获取锁厂人员注册表失败'-->
            <!--})-->
          <!--})-->
      <!--},-->
      <!--modifyRecord: function (scope) {-->
        <!--console.log(scope)-->
        <!--this.dialogFormVisible = true-->
        <!--this.form.id = scope.row.id-->
        <!--this.form.account = scope.row.account-->
        <!--this.form.providerName = scope.row.providerName-->
        <!--this.form.providerNo = scope.row.providerNo-->
      <!--},-->
      <!--deleteRecord: function (id) {-->
        <!--this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {-->
          <!--confirmButtonText: '确定',-->
          <!--cancelButtonText: '取消',-->
          <!--type: 'warning'-->
        <!--}).then(() => {-->
          <!--if (id !== undefined && id !== '') {-->
            <!--// 调用后台服务-->
            <!--// 删除元素-->
            <!--this.$ajax.post('/facility/tabs/delete', {'id': id}).then(function (response) {-->
              <!--if (response.data.code === '1') {-->
                <!--// 删除成功-->
                <!--this.$message({-->
                  <!--type: 'success',-->
                  <!--message: '删除成功'-->
                <!--})-->
                <!--// 刷新页面-->
                <!--this.query()-->
              <!--} else {-->
                <!--this.$message({-->
                  <!--type: 'error',-->
                  <!--message: '删除失败:' + response.data.msg-->
                <!--})-->
              <!--}-->
            <!--})-->
              <!--.catch(() => {-->
                <!--this.$message({-->
                  <!--type: 'info',-->
                  <!--message: '删除异常'-->
                <!--})-->
              <!--})-->
          <!--}-->
          <!--this.$message({-->
            <!--type: 'success',-->
            <!--message: '删除异常,没有对应id!'-->
          <!--})-->
        <!--}).catch(() => {-->
          <!--this.$message({-->
            <!--type: 'info',-->
            <!--message: '已取消删除'-->
          <!--})-->
        <!--})-->
      <!--},-->
      <!--doModify: function (formName) {-->
        <!--if (this.form === null || this.form === '' || this.form.account === undefined) {-->
          <!--this.$message({-->
            <!--message: '请选择一条记录进行操作!',-->
            <!--type: 'warn'-->
          <!--})-->
          <!--return false-->
        <!--}-->
        <!--this.$refs[formName].validate((valid) => {-->
          <!--if (valid) {-->
            <!--var url = ''-->
            <!--if (this.form.id === undefined || this.form.id === '') {-->
              <!--url = '/facility/tabs/add'-->
            <!--} else {-->
              <!--url = '/facility/tabs/modify'-->
            <!--}-->
            <!--this.dialogFormVisible = false-->
            <!--this.$ajax.post(url, {params: this.form}).then(function (response) {-->
              <!--if (response.data.code === '1') {-->
                <!--// 更新成功-->
                <!--this.$message({-->
                  <!--type: 'success',-->
                  <!--message: '操作成功'-->
                <!--})-->
                <!--this.$refs['formA'].resetFields()-->
                <!--// 刷新页面-->
                <!--this.query(this.requestParam)-->
              <!--} else {-->
                <!--this.$message({-->
                  <!--type: 'error',-->
                  <!--message: '操作失败:' + response.data.msg-->
                <!--})-->
              <!--}-->
            <!--}, function (err) {-->
              <!--this.$message({-->
                <!--type: 'info',-->
                <!--message: '操作失败' + err.status-->
              <!--})-->
            <!--})-->
          <!--} else {-->
            <!--return-->
          <!--}-->
        <!--})-->
      <!--},-->
      <!--cancelOperate: function () {-->
        <!--this.dialogFormVisible = false-->
        <!--this.form = {-->
          <!--account: '',-->
          <!--providerName: '',-->
          <!--providerNo: '',-->
          <!--id: ''-->
        <!--}-->
        <!--this.$refs['formA'].resetFields()-->
      <!--},-->
      <!--handleSizeChange: function (val) {-->
        <!--this.requestParam.pageSize = val-->
        <!--this.query('condition')-->
      <!--},-->
      <!--handleCurrentChange: function (val) {-->
        <!--this.requestParam.index = val-->
        <!--this.query('condition')-->
      <!--},-->
      <!--onSelected: function (val) {-->
<!--//        var obj = this.providerOptions.find(item => item.no === val)-->
<!--//        this.form.providerName = obj.name-->
      <!--},-->
      <!--exportFile: function () {-->
        <!--this.exportFormVisible = true-->
      <!--},-->
      <!--cancelExport: function () {-->
        <!--this.exportFormVisible = false-->
      <!--},-->
      <!--exportCurrent: function () {-->
        <!--this.exportParam.pageNo = this.pagination.pageNo-->
        <!--this.exportParam.pageSize = this.pagination.pageSize-->
        <!--this.$refs['FileForm'].setAttribute('method', 'get')-->
        <!--this.$refs['FileForm'].setAttribute('action', `${baseUrl}/activity/inmobi/tDisplayType/export`)-->
        <!--this.$refs['FileForm'].submit()-->
        <!--this.exportFormVisible = false-->
      <!--},-->
      <!--exportAll: function () {-->
        <!--this.exportParam.pageSize = ''-->
        <!--this.exportParam.pageNo = ''-->
        <!--this.$refs['FileForm'].setAttribute('method', 'post')-->
        <!--this.$refs['FileForm'].setAttribute('action', `${baseUrl}/activity/inmobi/tDisplayType/exportAll`)-->
        <!--this.$refs['FileForm'].submit()-->
        <!--this.exportFormVisible = false-->
      <!--}-->
    <!--}-->
  <!--}-->

<!--</script>-->
<!--<style scoped>-->
  <!--.demo-form-inline {-->
    <!--padding-left: 10px;-->
  <!--}-->

  <!--.demo-ruleForm {-->
    <!--font-size: 20px !important;-->
    <!--text-align: center;-->
  <!--}-->

  <!--.tbody {-->
    <!--text-align: left !important;-->
  <!--}-->

  <!--.common {-->
    <!-- -webkit-appearance: none;-->
    <!-- -moz-appearance: none;-->
    <!--appearance: none;-->
    <!--background-color: #fff;-->
    <!--background-image: none;-->
    <!--border-radius: 4px;-->
    <!--border: 1px solid #bfcbd9;-->
    <!--box-sizing: border-box;-->
    <!--color: #1f2d3d;-->
    <!--font-size: inherit;-->
    <!--height: 36px;-->
    <!--line-height: 1;-->
    <!--outline: 0;-->
    <!--padding: 3px 10px;-->
    <!--transition: border-color .2s cubic-bezier(.645, .045, .355, 1);-->
  <!--}-->

  <!--.module {-->
    <!--height: 240px !important;-->
    <!--width: 400px !important;-->
  <!--}-->

  <!--.elform {-->
    <!--text-align: left !important;-->
  <!--}-->

  <!--.el-form-item__content {-->
    <!--margin-left: 100px !important;-->
  <!--}-->

  <!--.el-dialog {-->
    <!--width: 500px !important;-->
    <!--height: 350px;-->
  <!--}-->

  <!--.cell {-->
    <!--text-align: center;-->
  <!--}-->

  <!--.el-dialog {-->
    <!--width: 20%;-->
  <!--}-->

  <!--.el-dialog__title {-->
    <!--text-align: left;-->
    <!--margin-left: 0%;-->
  <!--}-->
<!--</style>-->
