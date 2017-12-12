<template>
  <div class="count">
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <el-tab-pane label="小区域列表" name="first" class="padding">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="区域名称：">
            <el-input v-model="formInline.user"></el-input>
          </el-form-item>
          <el-form-item label="所属区域：">
            <el-input
              :disabled="true"
              :on-icon-click="searchCompany"
              icon="search"
              v-model="formInline.attributionCompany">
            </el-input>
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
            label="区域ID">
          </el-table-column>
          <el-table-column
            prop="adminphone"
            label="区域名称">
          </el-table-column>
          <el-table-column
            prop="adminphone"
            label="所属区域">
          </el-table-column>
          <el-table-column
            prop="city"
            label="围栏顶点数">
          </el-table-column>
          <el-table-column
            prop="city"
            label="操作员">
          </el-table-column>
          <el-table-column
            prop="city"
            label="更新时间">
          </el-table-column>
          <el-table-column
            prop="city"
            label="备注">
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
        <el-dialog title="所属区域" size="tiny" :visible.sync="cityVisible" center>
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
      <el-tab-pane label="小区域列表添加" name="second">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
          <el-form-item label="版本号：" prop="num">
            <el-input v-model="ruleForm.name" class="width"></el-input>
          </el-form-item>
          <el-form-item label="所属区域：">
            <el-input
              class="width"
              :disabled="true"
              :on-icon-click="searchCompany"
              icon="search"
              v-model="formInline.attributionCompany">
            </el-input>
          </el-form-item>

          <!--<el-form-item label="版本文件上传：" prop="update">-->
          <!--<el-upload-->
            <!--class="upload-demo"-->
            <!--action="https://jsonplaceholder.typicode.com/posts/"-->
            <!--:on-preview="handlePreview"-->
            <!--:on-remove="handleRemove">-->
            <!--<el-button size="small" type="primary">点击上传</el-button>-->
            <!--<div slot="tip" class="el-upload__tip">证件照命名以“p姓名_手机号”的方式：p张三_13706533081(只能上传jpg/png文件，且不超过500kb）</div>-->
          <!--</el-upload>-->
        <!--</el-form-item>-->

          <el-form-item label="版本文件上传:">
            <el-input v-model="ruleForm.imgPath" v-show='false'></el-input>
            <img width="100%" :src="ruleForm.imgPath" alt="版本文件上传">
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
              <div slot="tip" class="el-upload__tip">证件照命名以“p姓名_手机号”的方式：p张三_13706533081(只能上传jpg/png文件，且不超过500kb）</div>

            </el-upload>
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
        value6: '',
        select: '',
        cityVisible: false,
        filterText: '',
        saveUp: false,
        img: true,
        Token: {},
        ruleForm: {
          name: '',
          area: '',
          uodate: '',
          desc: ''
        },
        exportParam: {},
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        },
        formInline: {
          user: '',
          photo: '',
          nub: '',
          pageSize: 10,
          index: 1
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
    }
  }
</script>
<style scoped>
  .padding{
    padding-left:10px;
  }

  .width {
    width: 300px;
  }
</style>
