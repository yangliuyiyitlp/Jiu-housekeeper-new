<template>
  <div>
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">

      <el-tab-pane label="文章列表" name="first" style="padding-left:10px;">

        <el-row>
          <!--树的渲染-->
          <el-col :span="3" class="search_bar" ref="search_bar">
            <el-tree
              :data="select_organization"
              :props="defaultProps"
              @node-click="selectOrganization"
              default-expand-all>
            </el-tree>
          </el-col>

          <el-col :span="21">
            <!--筛选条件-->
            <el-form :inline="true" :model="formInline" class="demo-form-inline">

              <el-form-item label="栏目：">
                <!--树模型-->
                <el-input
                  icon="search"
                  :disabled="true"
                  v-model="formInline.categoryName"
                  :on-icon-click="searchColumn">
                </el-input>
              </el-form-item>

              <el-form-item label="栏目Id:" v-if=0>
                <el-input v-model="formInline.categoryId"></el-input>
              </el-form-item>

              <el-form-item label="标题：">
                <el-input v-model="formInline.title"></el-input>
              </el-form-item>

              <el-form-item label="状态：">
                <el-radio-group v-model="formInline.delFlagName">
                  <el-radio-button
                    v-for="(item,key) in statusRelation"
                    :label=item
                    :key=item.key>
                  </el-radio-button>
                </el-radio-group>

              </el-form-item>

              <el-button type="primary" @click="showForm">查询</el-button>

            </el-form>

            <!--表格展示-->
            <el-table
              :data="tableData"
              border
              style="width: 100%">

              <el-table-column
                v-if=0
                align="center"
                prop="categoryId"
                label="栏目分类id">
              </el-table-column>

              <el-table-column
                v-if=0
                align="center"
                prop="id"
                label="本行文章id">
              </el-table-column>

              <el-table-column
                align="center"
                prop="categoryName"
                label="栏目">
              </el-table-column>

              <el-table-column
                align="center"
                prop="title"
                label="标题">
              </el-table-column>

              <el-table-column
                align="center"
                prop="weight"
                label="权重">
              </el-table-column>

              <el-table-column
                align="center"
                prop="hits"
                label="点击数">
              </el-table-column>

              <el-table-column
                align="center"
                prop="createBy"
                label="发布者">
              </el-table-column>

              <el-table-column
                align="center"
                prop="update_date"
                label="更新时间">
              </el-table-column>

              <el-table-column
                header-align="center"
                align="center"
                label="操作">
                <template slot-scope="scope">
                  <el-button type="text" size="small">访问</el-button>
                  <el-button type="text" size="small" @click="modifyRecord(scope.row.id,scope.row.categoryId)">修改
                  </el-button>
                  <el-button @click="deleteRecord(scope.row.id,scope.row.categoryId)" type="text" size="small">删除
                  </el-button>
                </template>
              </el-table-column>

            </el-table>

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

          </el-col>

        </el-row>

      </el-tab-pane>

      <el-tab-pane :label="second_name" name="second">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" class="demo-ruleForm">

          <el-form-item label="归属栏目:">
            <el-input
              icon="search"
              :disabled="true"
              :on-icon-click="searchAttributionColumn"
              @click="dialogVisible = true"
              v-model="ruleForm.categoryId"
              placeholder="选择归属栏目">
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
            <el-input v-model="ruleForm.link" placeholder="输入外部链接"></el-input>
            <span>绝对或相对地址。</span>
          </el-form-item>

          <el-form-item label="关键字:">
            <el-input v-model="ruleForm.keywords" placeholder="输入关键字"></el-input>
            <span>多个关键字，用空格分隔。</span>
          </el-form-item>

          <el-form-item label="权重:">
            <el-input ref="power" v-model="ruleForm.weight" placeholder="0"></el-input>
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
              v-model="ruleForm.weightDate"
              :editable=false
              type="date"
              placeholder="选择日期">
            </el-date-picker>
            <span>数值越大排序越靠前，过期时间可为空，过期后取消置顶。</span>
          </el-form-item>

          <el-form-item label="摘要：" prop="desc">
            <el-input type="textarea" v-model="ruleForm.description" class="width"
                      v-bind:style="{color:fontcolor}"></el-input>
          </el-form-item>

          <el-form-item label="缩略图:">
            <el-input v-model="ruleForm.image" v-show='false'></el-input>
            <el-upload
              class="upload-demo"
              ref="upload"
              action='http://jjdcjavaweb.oss-cn-shanghai.aliyuncs.com'
              :data="Token"
              :before-upload="beforeUpload">
              <el-button slot="trigger" size="small" type="primary">选取图片</el-button>
            </el-upload>
          </el-form-item>

          <el-form-item label="正文:">
            <el-input v-model='ruleForm.main_text' v-show='false'></el-input>
            <VueUEditor @ready="editorReady">
            </VueUEditor>
          </el-form-item>

          <el-form-item label="推荐位:">
            <el-checkbox-group v-model="ruleForm.posid">
              <el-checkbox label="首页焦点图"></el-checkbox>
              <el-checkbox label="栏目页文章推荐"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="发布时间:">
            <el-date-picker
              v-model="ruleForm.updateDate"
              :editable=false
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
            <el-button @click="returnBack">返回</el-button>
          </el-form-item>

        </el-form>
      </el-tab-pane>

    </el-tabs>


    <!--模态框-->
    <!--栏目-->
    <!--columnVisible1-->
    <el-dialog title="选择栏目" size="tiny" :visible.sync="columnVisible1">
      <el-tree
        highlight-current
        default-expand-all
        :data="select_organization"
        @node-click="searchOneColumn"
        :props="defaultProps">
      </el-tree>
    </el-dialog>
    <!--columnVisible2-->
    <el-dialog title="选择栏目" size="tiny" :visible.sync="columnVisible2">
      <el-tree
        highlight-current
        default-expand-all
        :data="select_organization"
        @node-click="searchOneAttributionColumn"
        :props="defaultProps">

      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="columnVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="sureAttributionColumn">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  // 富文本编辑器引入
  import VueUEditor from 'vue-ueditor'
  // arr2tree引入
  import arr2tree from '../../utils/arr2tree.js'
  import Tools from '../../utils/tools.js'
  import Moment from 'moment'

  export default {
    name: 'app',
    components: {
      VueUEditor
    },
    data () {
      return {
        activeName2: 'first',
        second_name: '文章添加',
        relation: {},
        statusRelation: {},
        select_organization: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        tableData: [],
        Token: {},
        columnVisible1: false,
        columnVisible2: false,
        E: null,
        isExternallink: '',
        isTop: '',
        editorContent: '',
        fontcolor: '',
        color1: '#20a0ff',
        radio2: 3,
        value6: '',
        formInline: {
          categoryName: '',
          categoryId: '',
          title: '',
          delFlagName: '',
          delFlag: ''
        },
        ruleForm: {
          categoryId: '', // 分类编号
          title: '', // 标题
          link: '', // 外部链接
          keywords: '', // 关键字
          weight: 0, // 权重，越大越靠前
          image: '', // 文章图片
          description: '', // 描述、摘要
          weightDate: '', // 权重期限，超过期限，将weight设置为0
          hits: 0, // 点击数
          posid: [],  // 推荐位，多选（1：首页焦点图；2：栏目页文章推荐；）
          delFlag: '', // 发布状态
          updateDate: '' // 发布,更新时间
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
        pagination: {pageSizes: [10, 20, 50, 100], pageSize: 10, total: 0, index: 1}
      }
    },
    created: function () {
      this.query()
    },
    mounted () {
      this.$refs.search_bar.$el.style.height = (document.documentElement.clientHeight - 160) + 'px'
    },
    methods: {
      // 侧边栏tree的点击查询
      selectOrganization (data) {
        // 获取树组件被选中的参数并保存在formInline.categoryName
        this.formInline.categoryName = data.name
        this.formInline.categoryId = data.id
        // 同时根据查询字符串 发送请求
        this.showForm()
      },
      // 点击筛选项的栏目出现tree的模态框
      searchColumn () {
        this.columnVisible1 = true
      },
      // 选择tree的栏目选项展现文章列表
      searchOneColumn (data) {
        // 模态框隐藏
        this.columnVisible1 = false
        // 获取树组件被选中的参数并保存在formInline.categoryName
        this.formInline.categoryName = data.name
        this.formInline.categoryId = data.id
        // 根据查询字符串查询相对应的文章列表信息
        this.showForm()
      },
      // 根据id删除当前行的信息
      delRecord (id) {
        this.$ajax.get('cms/comment/interface/delete?id=' + id)
          .then(res => {
            console.log(res)
//            if (res.status === 200) {
//              // 删除成功
//              this.open('success', res.data.msg)
//              // 刷新页面
//              this.query()
//            } else {
//              // 删除失败
//              this.open('info', res.data.msg)
//            }
            this.showForm()
          })
          .catch(err => {
            console.log(err)
            // 删除失败
            this.open('info', err.data.msg)
          })
      },
      // 根据id查看当前行的详细信息
      modifyRecord (id, categoryId) {
        this.activeName2 = 'second'
        this.second_name = '文章修改'
//        this.modifyFormVisible = true
//        this.$ajax.get('electric/tCouponInfo/interface/form?id=' + id)
//          .then(res => {
//            this.updateForm = res.data.tCouponInfo
//            this.updateForm.type = this.coupon_type_obj[this.updateForm.type]
//          })
//          .catch(err => {
//            console.log(err)
//          })
      },
      // 是否置顶相关
      isTopp (val) {
        this.ruleForm.power = val
      },
      searchAttributionColumn () {
        this.columnVisible2 = true
      },
      searchOneAttributionColumn (data) {
        // 获取树组件被选中的参数并保存在this.ruleForm.attribution_column中
        this.ruleForm.attribution_column = data.name
//        console.log(this.ruleForm.attribution_column)
      },
      sureAttributionColumn () {
        this.columnVisible2 = false
      },
      // 点击面包屑时的事件
      handleClick (tab, event) {
//        console.log(tab)
      },
      handleSizeChange: function (val) {
        this.formInline.pageSize = val
        this.onSubmit('condition')
      },
      handleCurrentChange: function (val) {
        this.formInline.index = val
        this.onSubmit('condition')
      },
      submitForm (formName) {
        this.ruleForm.main_text = this.editorContent
        console.log(JSON.stringify(this.ruleForm))
//        this.$ajax.get('cms/comment/interface/save', {
//          params: {
//            ID: 12345
//          }
//        })
//          .then(res => {
//            console.log(res)
//          })
//          .catch(err => {
//            console.log(err)
//          })
//        this.$refs[formName].validate((valid) => {
//          if (valid) {
//            alert('submit!')
//          } else {
//            console.log('error submit!!')
//            return false
//          }
//        })
      },
      // 文章添加页面的重置功能
      resetForm () {
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
      },
      // 添加页面的返回功能
      returnBack () {
        this.activeName2 = 'first'
      },
      handleRemove (file, fileList) {
        console.log(file, fileList)
      },
      handlePreview (file) {
        console.log(file)
      },
      // 富文本编辑器相关
      editorReady (eidtorInstance) {
        this.E = eidtorInstance
        eidtorInstance.setContent('请在此输入正文')
        eidtorInstance.addListener('contentChange', () => {
          this.ruleForm.main_text = eidtorInstance.getContent()
          // console.log('发生的变化:', this.ruleForm.main_text)
        })
      },
      // 封装小工具
      // 上传组件获取oss相关
      beforeUpload (file) {
        return new Promise((resolve) => {
          this.$ajax.get('electric/ossutil/interface/policy?user_dir=cmsContent')
            .then((res) => {
              this.Token = res.data
              this.Token.key = this.Token.dir + '/' + (+new Date()) + file.name
              this.Token.OSSAccessKeyId = res.data.accessid
//              console.log(this.Token)
              // oss上图片的路由
              this.pic_url = 'http://jjdcjavaweb.oss-cn-shanghai.aliyuncs.com/' + this.Token.key
              console.log(this.pic_url)
              resolve()
            })
            .catch(err => {
              console.log(err)
            })
        })
      },
      // 获取状态栏信息和树组件数据
      query () {
        // 查询发表状态
        this.$ajax.get('sys/dictutils/interface/getDictList?type=cms_del_flag')
          .then(res => {
            this.statusRelation = Tools.nameRelation(res.data, 'value', 'label')
          })
          .catch(err => {
            console.log(err)
          })
        // 获取栏目列表 树模型
        this.$ajax.get('cms/category/interface/list')
          .then(res => {
            if (res.data.code === 200) {
              this.relation = Tools.nameRelation(res.data.data, 'id', 'name')
              this.select_organization = arr2tree.getTree(res.data.data, '1')
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      // 根据查询字符串展示列表
      showForm () {
        this.formInline.delFlag = Tools.k2value(this.statusRelation, this.formInline.delFlagName) || '0'
        console.log(this.formInline)
        console.log('进去showform中')
        this.$ajax.get('cms/comment/interface/list', {parmas: this.formInline})
          .then(res => {
            console.log(res)
            if (res.data.code === 200) {
              this.tableData = res.data.data
              console.log(res.data.data)
              for (let i = 0; i < this.tableData.length; i++) {
                this.tableData[i].categoryName = this.formInline.categoryName
                this.tableData[i].update_date = Moment(this.tableData[i].updateDate).format('YYYY-MM-DD HH:mm:ss')
              }
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      // 显示的提示设置
      open (type, msg) {
        // 提示信息
        this.$message({
          type: type,
          message: msg
        })
      },
      // 删除时的提醒信息
      deleteRecord (id, categoryId) {
        console.log(id, categoryId)
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.delRecord(id, categoryId)
          })
          .catch(() => {
            this.open('info', '已取消删除')
          })
      }
    }
  }
</script>

<style scoped>
  .search_bar {
    border: 1px solid #fff;
    overflow: auto;
  }

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
