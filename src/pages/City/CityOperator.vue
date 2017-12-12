<template>
  <div class="count">
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <el-tab-pane label="运营人员管理列表" name="first" class="padding">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="姓名：">
            <el-input v-model="formInline.user"></el-input>
          </el-form-item>
          <el-form-item label="手机号：">
            <el-input v-model="formInline.photo"></el-input>
          </el-form-item>
          <el-form-item label="证件号：">
            <el-input v-model="formInline.photo"></el-input>
          </el-form-item>
          <el-form-item label="城市ID：">
            <el-input
              :disabled="true"
              :on-icon-click="searchCompany"
              icon="search"
              v-model="formInline.attributionCompany">
            </el-input>
          </el-form-item>
          <el-form-item label="小区域名称：">
            <el-input v-model="formInline.nub"></el-input>
          </el-form-item>
          <el-form-item label="登录状态：">
            <el-select v-model="formInline.status">
              <el-option label="登录" value="open"></el-option>
              <el-option label="未登录" value="closed"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="app版本号：">
            <el-input v-model="formInline.nub"></el-input>
          </el-form-item>
          <el-button type="primary" @click="query">查询</el-button>
          <el-button type="primary" @click="exportFile">导出</el-button>
        </el-form>
        <!--隐藏表单用于导出-->
        <form v-show="false" action="" method="post" ref="FileForm">
          <input name="attributionCompany" v-model="exportParam.attributionCompany"/>
          <input name="attributionSection" v-model="exportParam.attributionSection"/>
          <input name="loginName" v-model="exportParam.loginName"/>
          <input name="name" v-model="exportParam.name"/>
          <input name="pageSize" v-model="exportParam.pageSize"/>
          <input name="pageNo" v-model="exportParam.pageNo"/>
        </form>
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="admin"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="adminphone"
            label="性别">
          </el-table-column>
          <el-table-column
            prop="adminphone"
            label="手机号">
          </el-table-column>
          <el-table-column
            prop="number"
            label="证件号">
          </el-table-column>
          <el-table-column
            prop="number"
            label="城市ID">
          </el-table-column>
          <el-table-column
            prop="city"
            label="小区域">
          </el-table-column>
          <el-table-column
            prop="city"
            label="管理员类型">
          </el-table-column>
          <el-table-column
            prop="city"
            label="小区域">
          </el-table-column>
          <el-table-column
            prop="city"
            label="登录状态">
          </el-table-column>
          <el-table-column
            prop="city"
            label="登录时间">
          </el-table-column>
          <el-table-column
            prop="city"
            label="app版本号">
          </el-table-column>
          <el-table-column
            prop="city"
            label="最后上线">
          </el-table-column>
          <el-table-column
            prop="city"
            label="操作时间">
          </el-table-column>
          <el-table-column
            prop="city"
            label="备注">
          </el-table-column>
          <el-table-column
            prop="date"
            label="操作">
          </el-table-column>
          <el-table-column
            header-align="center"
            width="100"
            label="操作">
            <template slot-scope="scope">
              <el-button @click="modifyRecord(scope)" type="text" size="small">修改</el-button>
              <el-button @click="deleteRecord(scope.row.id)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.index"
          :page-sizes="pagination.pageSizes"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total">
        </el-pagination>
        <!--模态框-->
        <el-dialog title="城市ID" size="tiny" :visible.sync="cityVisible" center>
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
      </el-tab-pane>
      <el-tab-pane label="运营人员管理添加" name="second">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
          <el-form-item label="姓名：" prop="name">
            <el-input v-model="ruleForm.name" class="width"></el-input>
          </el-form-item>
          <el-form-item label="性别：" prop="region">
            <el-select v-model="ruleForm.region" class="width">
              <el-option label="未设置" value="noset"></el-option>
              <el-option label="男" value="nan"></el-option>
              <el-option label="女" value="nv"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="手机号：" prop="photo">
            <el-input v-model="ruleForm.photo" class="width"></el-input>
          </el-form-item>
          <el-form-item label="证件号：" prop="num">
            <el-input v-model="ruleForm.num" class="width"></el-input>
          </el-form-item>
          <el-form-item label="城市ID：">
            <el-input
              class="width"
              :disabled="true"
              :on-icon-click="searchCompany"
              icon="search"
              v-model="ruleForm.attributionCompany">
            </el-input>
          </el-form-item>
          <el-form-item label="小区域ID：" prop="areaid">
            <el-input v-model="ruleForm.areaid" class="width"></el-input>
          </el-form-item>
          <el-form-item label="小区域名称：" prop="cityname">
            <el-input v-model="ruleForm.cityname" class="width"></el-input>
          </el-form-item>
          <el-form-item label="管理员类型：" prop="type">
            <el-select v-model="ruleForm.type" class="width">
              <el-option label="兼职人员" value="pone"></el-option>
              <el-option label="运营督导" value="ptwo"></el-option>
              <el-option label="运维人员" value="pthree"></el-option>
              <el-option label="维修人员" value="pfour"></el-option>
              <el-option label="调度人员" value="pfive"></el-option>
            </el-select>
          </el-form-item>
          <!--<el-form-item label="证件照正面:">-->
            <!--<input type="file" @change="getFileOne">-->
            <!--<p class="photo">证件照正面命名以“p姓名_手机号”的方式：p张三_13706533081(只能上传jpg/png文件，且不超过500kb）</p>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="证件照反面:">-->
            <!--<input type="file" @change="getFileTwo">-->
            <!--<p class="photo">证件照反面命名以“n姓名_手机号”的方式：n张三_13706533081(只能上传jpg/png文件，且不超过500kb）</p>-->
          <!--</el-form-item>-->
          <el-form-item label="证件照正面:">
            <el-input v-model="ruleForm.imgPath" v-show='false'></el-input>
            <!--<img width="100%" :src="ruleForm.imgPath" alt="证件照正面">-->
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
            <p class="photo">证件照正面命名以“p姓名_手机号”的方式：p张三_13706533081(只能上传jpg/png文件，且不超过500kb）</p>
          </el-form-item>

          <el-form-item label="证件照反面:">
            <el-input v-model="ruleForm.imgPath" v-show='false'></el-input>
            <!--<img width="100%" :src="ruleForm.imgPath" alt="证件照正面">-->
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
            <p class="photo">证件照反面命名以“n姓名_手机号”的方式：n张三_13706533081(只能上传jpg/png文件，且不超过500kb）</p>
          </el-form-item>
          <el-form-item label="备注：" prop="desc">
            <el-input type="textarea" v-model="ruleForm.desc" class="width"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import baseUrl from '../../utils/baseUrl.js'
  export default {
    data () {
      return {
        activeName2: 'first',
        saveUp: false,
        Token: {},
        value6: '',
        select: '',
        cityVisible: false,
        filterText: '',
        formInline: {
          user: '',
          photo: '',
          nub: '',
          pageSize: 10,
          index: 1
        },
        exportParam: {},
        ruleForm: {
          name: '',
          region: '',
          photo: '',
          num: '',
          cityid: '',
          areaid: '',
          cityname: '',
          type: '',
          desc: '',
          avatarOne: '',
          avatarTwo: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入活动名称', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          region: [
            {required: true, message: '请选择活动区域', trigger: 'change'}
          ]
        },
        tableData: [{
          admin: '0008',
          adminphone: '12345678999',
          number: '0',
          city: '上海',
          date: '2017-09-12 10:28:35'
        }],
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
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        pagination: {pageSizes: [30, 40, 60, 100], pageSize: 30, count: 0, pageNo: 1}
      }
    },
    created: function () {
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
      handleNodeClick (data) {
        this.formInline.attributionCompany = data.label
      },
      handleNode (data) {
        this.filterText = data.label // 弹框树模型点击输入值
      },
      searchCompany () {
        this.cityVisible = true
        this.select = this.select_city
        this.filterText = ''
      },
      doModify () {
        this.formInline.attributionCompany = this.filterText
        this.cityVisible = false
      },
      modifyCancel () {
        this.cityVisible = false
        this.formInline.attributionCompany = ''
      },
      modifyOrder (val) {
        this.modifyRank = val
        var obj = this.modifyOrders.find(item => item.id === this.focusId)
        if (val !== undefined && val.trim() !== '') {
          if (this.focusRank === val) {  // 修改的值是原始的值
            // 判断该记录的id 是否已经存在
            if (obj !== undefined) {
              this.modifyOrders.pop(obj)
            }
          } else {
            if (obj !== undefined) {
              obj.rank = val
            } else {
              this.modifyOrders.push({'id': this.focusId, 'rank': val})
            }
          }
        } else {
          if (obj !== undefined) {
            this.modifyOrders.pop(obj)
          }
        }
      },
      handleClick () {},
      handleSizeChange (val) {
        this.formInline.pageSize = val
        this.query()
      },
      handleCurrentChange (val) {
        this.formInline.index = val
        this.query()
      },
      handleIconClick (ev) {
        console.log(ev)
      },
      query () {},
      modifyRecord: function (scope) {
        this.vif = false
        this.dialogFormVisible = true
        // 获取当前行的详细信息
        this.$ajax.get('/activity/inmobi/tDisplayType/form', {params: {id: scope.row.id}})
          .then((res) => {
            if (res.status === 200) {
              this.form.id = res.data.tDisplayType.id
              this.form.cityName = res.data.tDisplayType.cityName
              this.form.rank = res.data.tDisplayType.rank
              this.form.type = res.data.tDisplayType.type
              this.form.displayType = res.data.tDisplayType.displayType
              this.form.androidInmobiId = res.data.tDisplayType.androidInmobiId
              this.form.iosInmobiId = res.data.tDisplayType.iosInmobiId
              this.form.remarks = res.data.tDisplayType.remarks
            }
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '获取详细信息异常'
            })
          })
      },
      deleteRecord: function (id) {
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (id !== undefined) {
            // 调用后台服务
            // 删除当前信息
            this.$ajax.get('/activity/inmobi/tDisplayType/delete', {params: {'id': id}})
              .then((response) => {
                console.log(response)
                if (response.data.code === 0) {
                  // 删除成功
                  this.$message({
                    type: 'success',
                    message: response.data.msg
                  })
//                this.$refs['formA'].resetFields()
                  // 刷新页面
                  this.query()
                } else {
                  this.$message({
                    type: 'error',
                    message: '删除异常'
                  })
                }
              })
              .catch(() => {
                this.$message({
                  type: 'info',
                  message: '删除失败'
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
      submitForm (formName) {
        var formData = new FormData() // 一个form表单的对象 然后可以设置表单的值模拟 multipart/form-data这种请求头的请求
        formData.append('name', this.ruleForm.name) // 文件数据
        formData.append('region', this.ruleForm.region) // 其他的一些参数
        formData.append('num', this.ruleForm.num) // 其他的一些参数
        formData.append('cityid', this.ruleForm.cityid) // 其他的一些参数
        formData.append('cityname', this.ruleForm.cityname) // 其他的一些参数
        formData.append('region', this.ruleForm.region) // 其他的一些参数
        formData.append('fileOne', this.ruleForm.avatarOne) // 其他的一些参数
        formData.append('fileTwo', this.ruleForm.avatarTwo) // 其他的一些参数
        console.dir(formData)
        this.$ajax(
          {
            method: 'post',
            url: '/form/submit',
            data: formData,
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        ).then(function (response) {
          this.$message({
            message: response.data,
            type: 'success'
          })
          console.log(response.data)
        }).catch(function (error) {
          console.log(error)
        })
//        以上是文件上传功能
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
//      handleRemove (file, fileList) {
//        console.log(file, fileList)
//      },
//      handlePreview (file) {
//        console.log(file)
//      },
      // 上传组件获取oss相关
      beforeUploadImgPath (file) {
        return new Promise((resolve) => {
          this.$ajax.get('beforeUpload/img', {params: {user_dir: 'tActivitiesInfo'}})
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
        this.form.imgPath = 'http://jjdcjavaweb.oss-cn-shanghai.aliyuncs.com/' + this.Token.key
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
      }
//      getFileOne ($event) {
//        this.ruleForm.avatarOne = $event.target.files[0]
//      },
//      getFileTwo ($event) {
//        this.ruleForm.avatarTwo = $event.target.files[0]
//      }
    }
  }
</script>
<style scoped>
  .padding{
    padding-left:10px;
  }
 .photo{
   font-size: 12px;
   color: #8391a5;
 }
  .width {
    width: 300px;
  }
  .ruleForm{
    margin-left:50px;
  }
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
</style>
