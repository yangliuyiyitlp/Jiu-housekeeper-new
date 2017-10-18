<template>
  <div>
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">

      <el-tab-pane label="文章列表" name="first" style="padding-left:10px;">
        <!--筛选条件-->
        <el-form :inline="true" :model="formInline" class="demo-form-inline">

          <el-form-item label="栏目：">
            <!--数模型-->
            <el-input
              icon="search"
              :disabled="true"
              v-model="formInline.city"
              :on-icon-click="search_company" @click="dialogVisible = true">
            </el-input>
          </el-form-item>

          <el-form-item label="标题：">
            <el-input v-model="formInline.name"></el-input>
          </el-form-item>

          <el-button type="primary" @click="onSubmit('condition')">查询</el-button>

          <el-form-item label="状态：">
            <el-radio-group v-model="radio2">
              <el-radio :label="3">发布</el-radio>
              <el-radio :label="6">审核</el-radio>
              <el-radio :label="9">删除</el-radio>
            </el-radio-group>
          </el-form-item>

        </el-form>

        <!--表格展示-->
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            align="center"
            prop="column"
            label="栏目">
          </el-table-column>

          <el-table-column
            align="center"
            prop="title"
            label="标题">
          </el-table-column>

          <el-table-column
            align="center"
            prop="power"
            label="权重">
          </el-table-column>

          <el-table-column
            align="center"
            prop="click_number"
            label="点击数">
          </el-table-column>

          <el-table-column
            align="center"
            prop="announcer"
            label="发布者">
          </el-table-column>

          <el-table-column
            align="center"
            prop="update_time"
            label="更新时间">
          </el-table-column>

          <el-table-column
            fixed="right"
            header-align="center"
            align="center"
            label="操作"
            width="160">
            <template slot-scope="scope">
              <el-button type="text" size="small">访问</el-button>
              <el-button type="text" size="small">修改</el-button>
              <el-button
                @click="open2(scope.$index, tableData4)"
                type="text"
                size="small">
                移除
              </el-button>
            </template>
          </el-table-column>

        </el-table>

        <!--模态框-->
        <!--城市-->
        <el-dialog title="选择公司" size="tiny" :visible.sync="cityVisible">
          <el-tree
            highlight-current
            default-expand-all
            :data="select_city"
            :props="defaultProps">
            <!--@node-click="searchOneCity">-->
          </el-tree>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cityVisible = false">取 消</el-button>
            <el-button type="primary" @click="sureCity">确 定</el-button>
          </div>
        </el-dialog>

        <!--分页-->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.index"
          :page-sizes="pagination.pageSizes"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total">
        </el-pagination>

      </el-tab-pane>

      <el-tab-pane label="文章添加" name="second">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">

          <el-form-item label="归属栏目:">
            <el-input
              icon="search"
              :disabled="true"
              v-model="ruleForm.attribution_column"
              placeholder="选择归属栏目">
              <!--:on-icon-click="handleIconClick"-->
            </el-input>
          </el-form-item>

          <el-form-item label="标题:">
            <el-input v-model="ruleForm.title" placeholder="输入标题" ref="title"></el-input>
            <span>有无外部链接:</span>
            <el-switch
              v-model="isExternallink"
              on-color="#13ce66" off-color="#ff4949"
              on-text="On" off-text="Off">
            </el-switch>

          </el-form-item>

          <el-form-item v-show='this.isExternallink' label="外部链接:">
            <el-input v-model="ruleForm.external_link" placeholder="输入外部链接"></el-input>
            <span>绝对或相对地址。</span>
          </el-form-item>

          <el-form-item label="关键字:">
            <el-input v-model="ruleForm.keyword" placeholder="输入关键字"></el-input>
            <span>多个关键字，用空格分隔。</span>
          </el-form-item>

          <el-form-item label="权重:">
            <el-input ref="power" v-model="ruleForm.power" placeholder="0"></el-input>
            <span>置顶:</span>
            <el-switch
              @change='isTopp'
              v-model="isTop"
              on-color="#13ce66" off-color="#ff4949"
              on-value="999" off-value="0"
              on-text="On" off-text="Off">
            </el-switch>
          </el-form-item>

          <el-form-item label="过期时间:">
            <el-date-picker
              v-model="ruleForm.deadline"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
            <span>数值越大排序越靠前，过期时间可为空，过期后取消置顶。</span>
          </el-form-item>

          <el-form-item label="摘要：" prop="desc">
            <el-input type="textarea" v-model="ruleForm.abstract" class="width"
                      v-bind:style="{color:fontcolor}"></el-input>
          </el-form-item>

          <!--格式应该不对-->
          <el-form-item label="缩略图:">
            <el-input v-model="ruleForm.pic" v-show='false'></el-input>
            <el-upload
              class="upload-demo"
              ref="upload"
              action=""
              :http-request="uploadThumbnails"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-change="change"
              :file-list="ruleForm.fileList"
              :auto-upload="true">
              <el-button slot="trigger" size="small" type="primary">选取图片</el-button>
            </el-upload>
          </el-form-item>

          <el-form-item label="正文:">
            <el-input v-model='ruleForm.main_text' v-show='false'></el-input>
            <VueUEditor @ready="editorReady">
            </VueUEditor>
          </el-form-item>

          <el-form-item label="来源:">
            <el-input v-model="ruleForm.source" placeholder="输入来源"></el-input>
          </el-form-item>

          <!--如何同步上传-->
          <el-form-item label="相关文章:">
            <el-button>添加相关</el-button>
          </el-form-item>

          <el-form-item label="推荐位:">
            <el-checkbox-group v-model="ruleForm.recommended_bit">
              <el-checkbox label="首页焦点图"></el-checkbox>
              <el-checkbox label="栏目页文章推荐"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="发布时间:">
            <el-date-picker
              v-model="ruleForm.release_time"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="发布状态:">
            <el-radio-group v-model="ruleForm.release_status">
              <el-radio :label="3">发布</el-radio>
              <el-radio :label="6">审核</el-radio>
              <el-radio :label="9">删除</el-radio>
            </el-radio-group>
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
  // 富文本编辑器引入
  import VueUEditor from 'vue-ueditor'

  export default {
    name: 'app',
    components: {
      VueUEditor
    },
    data () {
      return {
        cityVisible: false,
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
        E: null,
        isExternallink: '',
        isTop: '',
        editorContent: '',
        fontcolor: '',
        color1: '#20a0ff',
        radio2: 3,
        activeName2: 'first',
        value6: '',
        formInline: {
          city: '',
          name: ''
        },
        ruleForm: {
          attribution_column: '',
          abstract: '',
          recommended_bit: [],
          title: '',
          external_link: '',
          keyword: '',
          power: '',
          deadline: '',
          pic: '',
          main_text: '',
          source: '',
          release_time: '',
          release_status: ''
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
          column: '内部机构',
          title: '标题标题标题标题',
          power: '0',
          click_number: '2',
          announcer: '系统管理员',
          update_time: '2017-09-12 10:28:35'
        }, {
          column: '内部机构',
          title: '标题标题标题标题',
          power: '0',
          click_number: '2',
          announcer: '系统管理员',
          update_time: '2017-09-12 10:28:35'
        }, {
          column: '内部机构',
          title: '标题标题标题标题',
          power: '0',
          click_number: '2',
          announcer: '系统管理员',
          update_time: '2017-09-12 10:28:35'
        }],
        pagination: {pageSizes: [10, 20, 50, 100], pageSize: 10, total: 0, index: 1}
      }
    },
    created: function () {
      this.onSubmit('condition')
      // console.log($('#editor'))
    },
    methods: {
      isTopp (val) {
        this.ruleForm.power = val
      },
      handleClick (tab, event) {
        console.log(tab, event)
      },
      onSubmit: function (condition) {
        this.ruleForm.main_text = this.editorContent
        var param = {}
        if (condition === 'condition') {
          param = this.formInline
        } else {
          param = condition
        }
        console.log(param)
//        this.$http.post('/dataGrid/query', JSON.stringify(param)).then(function (response) {
//          this.tableData = response.data.list
//          this.pagination.total = response.data.total
//        }, function (err) {
//          this.$message({
//            type: 'info',
//            message: '获取列表信息失败' + err.status
//          })
//        })
      },
      handleSizeChange: function (val) {
        this.formInline.pageSize = val
        this.onSubmit('condition')
      },
      handleCurrentChange: function (val) {
        this.formInline.index = val
        this.onSubmit('condition')
      },
      open2 (index, rows) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteRow(index, rows)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm (formName) {
        this.E.setContent('')
        this.ruleForm = {
          attribution_column: '',
          abstract: '',
          recommended_bit: [],
          title: '',
          external_link: '',
          keyword: '',
          power: '',
          deadline: '',
          pic: '',
          main_text: '',
          source: '',
          release_time: '',
          release_status: ''
        }
        this.$refs[formName].resetFields()
      },
      handleRemove (file, fileList) {
        console.log(file, fileList)
      },
      handlePreview (file) {
        console.log(file)
      },
      editorReady (eidtorInstance) {
        this.E = eidtorInstance
        eidtorInstance.setContent('请在此输入正文')
        eidtorInstance.addListener('contentChange', () => {
          this.ruleForm.main_text = eidtorInstance.getContent()
          // console.log('发生的变化:', this.ruleForm.main_text)
        })
      },
      search_company () {
        this.cityVisible = true
      },
      sureCity () {
        this.cityVisible = false
      },
      uploadThumbnails () {
        console.log(this.ruleForm.fileList)
      },
      change (file, filelist) {
        console.log(file, filelist)
        console.log(file.raw)
      }
    }
  }
</script>

<style scoped>
  /*没有加scoped，是因为需要表单el-form-item__label和el-form-item__content的样式*/
  html, body {
    height: 100%;
  }

  .width {
    width: 300px;
  }

  .demo-ruleForm > .el-form-item > .el-form-item__label {
    width: 150px !important;
  }

  .demo-ruleForm > .el-form-item > .el-form-item__content {
    margin-left: 150px !important;
  }

  .demo-ruleForm .textarea, .demo-ruleForm .el-input, .demo-ruleForm .el-input__inner {
    width: 300px;
  }

  span {
    color: #888;
  }
</style>
