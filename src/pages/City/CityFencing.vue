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
          <el-form-item v-if="hasPermission('create')">
            <el-button type="primary" @click="addNewRecord">新增</el-button>
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
            v-if="hasPermission('updateDelete')"
            header-align="center"
            align="center"
            width="100"
            label="操作">
            <template slot-scope="scope">
              <el-button @click="modifyRecord(scope.row.id)" type="text" size="small">修改</el-button>
              <el-button @click="deleteRecord(scope.row.id)" type="text" size="small">删除</el-button>
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
            <el-input v-model="ruleForm.iconUrl" v-show='true'></el-input>
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
            <el-input v-model="ruleForm.displayUrl" v-show='true'></el-input>
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
        Token: {},
        Token1: {},
        tableData: [],
        formInline: {},
        ruleForm: {},
        rules: {
          showRule: [
            {required: true, message: '请选择显示规则', trigger: 'blur'}
          ]
        }
      }
    },
    created: function () {
      if (this.hasPermission('create')) {
        this.create = true
      } else {
        this.create = false
      }
      this.query()
    },
    methods: {
      onBeginTimeChange (val) {
        this.formInline.beginTime = new Date(val).getTime()
      },
      onEndTimeChange (val) {
        this.formInline.endTime = new Date(val).getTime()
      },
      hasPermission (data) {
        let permissionList = this.$route.meta.permission
        if (permissionList && permissionList.length && permissionList.includes(data)) {
          return true
        }
        return false
      },
      handleClick () {
        if (this.activeName2 === 'first' && this.hasPermission('create')) {
          this.title = '电子围栏基础信息新增'
        } else if (this.title === '电子围栏基础信息新增') {
          this.ruleForm = {}
          this.update = true
          this.tip = '立即创建'
          this.$refs.ruleForm.resetFields()
        }
      },
      query () {
        this.formInline.sessionId = Cookie.get('sessionId')
        this.$ajax.get('/city/fencing/info/list', {params: this.formInline})
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
          this.create = true
          this.title = '电子围栏基础信息新增'
        } else {
          this.create = false
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
            this.$ajax.get('/city/fencing/info/delete', {params: {ruleId: id, sessionId: Cookie.get('sessionId')}})
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
              // oss上图片的路径 在表单体提交之前拼接
//              this.form.imgPath = 'http://jjdcjavaweb.oss-cn-shanghai.aliyuncs.com/' + this.Token.key
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
              // oss上图片的路径 在表单体提交之前拼接
//              this.form.coverPath = 'http://jjdcjavaweb.oss-cn-shanghai.aliyuncs.com/' + this.Token1.key
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
