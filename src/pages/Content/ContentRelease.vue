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
                <el-radio-group v-model="formInline.delFlagName" @change="showForm">
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
              @sort-change="sortChange"
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
                sortable
                align="center"
                prop="weight"
                label="权重">
              </el-table-column>

              <el-table-column
                sortable
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
                sortable
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
                  <el-button
                    type="text"
                    size="small"
                    @click="modifyRecord(scope.row.id,scope.row.categoryName)"
                  >修改
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
              :current-page="pagination.pageNum"
              :page-sizes="pagination.pageSizes"
              :page-size="pagination.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pagination.total">
            </el-pagination>

          </el-col>

        </el-row>

      </el-tab-pane>

      <el-tab-pane :label='second_name' name="second">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" class="demo-ruleForm">

          <el-form-item label="文章id:" v-if=0>
            <el-input v-model="ruleForm.id"></el-input>
          </el-form-item>

          <el-form-item label="文章栏目分类编号:" v-if=0>
            <el-input v-model="ruleForm.categoryId"></el-input>
          </el-form-item>

          <el-form-item label="归属栏目:" prop="categoryName">
            <el-input
              icon="search"
              :disabled="true"
              :on-icon-click="searchAttributionColumn"
              v-model="ruleForm.categoryName"
              placeholder="选择归属栏目">
            </el-input>
          </el-form-item>

          <el-form-item label="标题:" prop="title">
            <el-input v-model="ruleForm.title" placeholder="输入标题"></el-input>
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

          <el-form-item label="权重:" prop="weight">
            <el-input ref="power" v-model="ruleForm.weight" placeholder="0"></el-input>
            <span>置顶:</span>
            <el-switch
              @change='isTopp'
              v-model="isTop"
              on-color="#13ce66" off-color="#ff4949"
              on-value=999  off-value=0  on-text="On" off-text="Off">
            </el-switch>
          </el-form-item>

          <el-form-item label="权重过期时间:">
            <el-date-picker
              v-model="ruleForm.weightDate"
              :editable=false
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
            <span>权重数值越大排序越靠前，过期时间可为空，过期后取消置顶。</span>
          </el-form-item>

          <el-form-item label="摘要:">
            <el-input type="textarea" v-model="ruleForm.description" class="width"></el-input>
          </el-form-item>


          <el-form-item label="缩略图:">
            <!--<el-dialog v-show="ruleForm.image" size="tiny">-->
            <el-dialog size="tiny">
              <img width="100%" :src="ruleForm.image">
            </el-dialog>
            <!--<el-input v-model="ruleForm.image" v-show='false'></el-input>-->
            <el-input v-model="ruleForm.image"></el-input>
            <el-upload
              ref="upload"
              list-type="picture-card"
              action='http://jjdcjavaweb.oss-cn-shanghai.aliyuncs.com'
              :data="Token"
              :on-remove="onRemove"
              :before-upload="beforeUpload">
              <el-button type="primary" @click="clearUploadedImage">上传图片<i class="el-icon-upload el-icon--right"></i>
              </el-button>
            </el-upload>
          </el-form-item>

          <el-form-item label="正文:">
            <el-input v-model='ruleForm.content' v-show='false'></el-input>
            <VueUEditor @ready="editorReady">
            </VueUEditor>
          </el-form-item>

          <el-form-item label="推荐位:">
            <el-checkbox-group v-model="ruleForm.posName">
              <el-checkbox label="首页焦点图"></el-checkbox>
              <el-checkbox label="栏目页文章推荐"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="发布状态:">
            <el-radio-group v-model="ruleForm.delFlagName">
              <el-radio-button
                v-for="(item,key) in statusRelation"
                :label='item'
                :key='item.key'>
              </el-radio-button>
            </el-radio-group>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button type="primary" @click="resetForm" v-if="second_name=='文章添加'?1:0">重置</el-button>
            <el-button @click="returnBack">返回</el-button>
          </el-form-item>

        </el-form>
      </el-tab-pane>

    </el-tabs>

    <!--模态框-->
    <!--columnVisible1-->
    <!--查询时弹出的栏目树模型-->
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
    <!--添加时弹出的栏目树模型-->
    <el-dialog title="选择栏目" size="tiny" :visible.sync="columnVisible2">
      <el-tree
        highlight-current
        default-expand-all
        :data="select_organization"
        @node-click="searchOneAttributionColumn"
        :props="defaultProps">
      </el-tree>
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
  import qs from 'qs'

  export default {
    name: 'app',
    components: {
      VueUEditor
    },
    data () {
      // 权重的范围判断
      let weightRule = (rule, value, callback) => {
        if (!Number.isInteger(+value)) {
          callback(new Error('必须输入正整数'))
          return
        }
        if (+value < 0 || +value > 999) {
          callback(new Error('数值范围为0-998'))
        } else {
          callback()
        }
      }

      return {
        activeName2: 'first',
        second_name: '文章添加',
        relation: {}, // 树组件中id与name关系
        statusRelation: {}, // 发布状态关系
        posRelation: {
          1: '首页焦点图',
          2: '栏目页文章推荐'
        }, // 推荐位状态关系
        select_organization: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        tableData: [],
        Token: {},
        columnVisible1: false, // 筛选模态框
        columnVisible2: false, // 文章修改添加 模态框
        dialogVisibleImg: false,
        formInline: {
          categoryName: '',
          categoryId: '',
          title: '',
          delFlagName: '',
          delFlag: ''
        },
        E: null,
        isExternallink: '',
        isTop: '',
        ruleForm: {},
        editorContent: '',
        rules: {
          weight: [{validator: weightRule, trigger: 'blur'}],
          title: [{required: true, message: '标题不能为空', trigger: 'blur'}],
          categoryName: [{required: true, message: '请选择归属栏目', trigger: 'change'}]
        },
        pagination: {pageSizes: [10, 20, 50, 80, 100], pageSize: 20, total: 0, pageNum: 1}
      }
    },
    created: function () {
      this.query()
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
        this.$ajax.get(`http://localhost:3000/content/release/deleteArticle/${id}`)
          .then(res => {
            if (res.status === 200) {
              console.log(res)
              // 删除成功
              this.open('success', res.data.msg)
              // 刷新页面
              this.showForm()
            } else {
              // 删除失败
              this.open('info', res.data.msg)
            }
          })
          .catch(err => {
            console.log(err)
            // 删除失败
            this.open('info', err.data.msg)
          })
      },
      // 根据id查看当前行的详细信息
      modifyRecord (id, categoryName) {
        this.second_name = '文章修改'
        this.activeName2 = 'second'
        this.$ajax.get('http://localhost:3000/content/release/article/' + id)
          .then(res => {
            console.log(res.data)
            if (res.data.code === 200) {
              let obj = res.data.data
              console.log(obj)
              // 推荐位
              if (obj.posid) {
                obj.posName = obj.posid.split(',').map(i => {
                  return Tools.k2value(this.posRelation, i)
                })
              }
              this.ruleForm = {
                id: obj.id,
                categoryId: obj.categoryId, // 分类编号
                categoryName: categoryName, // 分类名称
                image: obj.image, // 文章图片
                keywords: (obj.keywords || '').split(',').join(' '), // 关键字
                title: obj.title, // 标题
                link: obj.link, // 外部链接
                weight: obj.weight, // 权重，越大越靠前
                description: obj.description, // 描述、摘要
                content: obj.content || '',
                posName: obj.posName || [],
                delFlagName: Tools.k2value(this.statusRelation, obj.delFlag)
              }
              this.E.setContent(this.ruleForm.content)
              console.log(this.ruleForm)
              // 为何不能直接对象=对象?
//              this.ruleForm = res.data.data
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      // 是否置顶相关
      isTopp (val) {
        this.ruleForm.weight = val
      },
      searchAttributionColumn () {
        this.columnVisible2 = true
      },
      // 点击表单中栏目归属模态框 选定栏目和categoryId
      searchOneAttributionColumn (data) {
        // 模态框隐藏
        this.columnVisible2 = false
        // 获取树组件被选中的参数并保存在this.ruleForm.categoryName中
        this.ruleForm.categoryName = data.name
        this.ruleForm.categoryId = data.id
      },
      // 点击标签页时事件
      handleClick () {
        this.second_name = '文章添加'
        // 并清空当前文章添加内列表内容
        this.resetForm()
      },
      // 改变请求条数功能
      handleSizeChange: function (val) {
        console.log(val)
        this.formInline.pageSize = val
        this.showForm()
      },
      // 翻页功能
      handleCurrentChange: function (val) {
        console.log(val)
        this.formInline.pageNum = val
        this.showForm()
      },
      // 确认添加新文章
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.ruleForm.keywords = (this.ruleForm.keywords === '' ? '' : this.ruleForm.keywords.split(' ').join(','))
            this.ruleForm.weightDate = (this.ruleForm.weightDate === undefined ? null : Moment(this.ruleForm.weightDate).format('YYYY-MM-DD HH:mm:ss'))
            this.ruleForm.delFlag = Tools.k2value(this.statusRelation, this.ruleForm.delFlagName) || '0'
            this.ruleForm.posid = this.ruleForm.posName.map(i => {
              return Tools.k2value(this.posRelation, i)
            }).join(',')
            console.log(this.ruleForm)
            this.$ajax.post('http://localhost:3000/content/release/update/article', qs.stringify(this.ruleForm))
              .then(res => {
                console.log(res)
                if (res.code === 200) {
                  open('success', res.data.msg)
                }
                // 根据查询字符串展示文章列表
                this.formInline = {
                  categoryId: this.ruleForm.categoryId,
                  categoryName: this.ruleForm.categoryName,
                  delFlagName: this.ruleForm.delFlagName
                }
                this.showForm()
                // 返回第一个页面并显示相对应的栏目列表
                this.activeName2 = 'first'
                this.ruleForm = {}
                open('info', res.data.msg)
              })
              .catch(err => {
                this.open('info', err.data.msg)
              })
          } else {
            return false
          }
        })
      },
      // 文章添加页面的重置功能
      resetForm () {
        this.E.setContent('')
        this.clearUploadedImage()
        this.ruleForm = {
          categoryId: '', // 分类编号
          categoryName: '', // 分类名称
          image: '', // 文章图片
          keywords: '', // 关键字
          delFlag: '', // 发布状态
          delFlagName: '', // 发布状态名称
          title: '', // 标题
          link: '', // 外部链接
          weight: 0, // 权重，越大越靠前
          description: '', // 描述、摘要
//          weightDate: '', // 权重期限，超过期限，将weight设置为0
          content: '',
          posName: [],
          posid: ''  // 推荐位，多选（1：首页焦点图；2：栏目页文章推荐；'1,2'）
        }
      },
      // 添加页面的返回功能,返回时清空当前列表
      returnBack () {
        this.activeName2 = 'first'
        this.second_name = '文章添加'
        // 并清空当前列表内容
        this.resetForm()
      },
      // 富文本编辑器相关
      editorReady (eidtorInstance) {
        this.E = eidtorInstance
        eidtorInstance.setContent('请在此输入正文')
        eidtorInstance.addListener('contentChange', () => {
          this.ruleForm.content = eidtorInstance.getContent()
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
              // oss上图片的路由
              this.ruleForm.image = 'http://jjdcjavaweb.oss-cn-shanghai.aliyuncs.com/' + this.Token.key
              resolve()
            })
            .catch(err => {
              console.log(err)
            })
        })
      },
      // 移除图片时清空form表单中的图片地址
      onRemove () {
        this.ruleForm.image = ''
      },
      // 上传之前 清除原有图片
      clearUploadedImage () {
        this.$refs.upload.clearFiles()
        this.ruleForm.image = ''
      },
      // 获取状态栏信息和树组件数据
      query () {
        // 查询发表状态
        this.$ajax.get('http://localhost:3000/content/release/getDictList')
          .then(res => {
            this.statusRelation = Tools.nameRelation(res.data, 'value', 'label')
          })
          .catch(err => {
            console.log(err)
          })
        // 获取栏目列表 树模型
        this.$ajax.get('http://localhost:3000/content/release/category/getcategorys')
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
      // 根据查询字符串展示文章列表
      showForm () {
        this.formInline.delFlag = Tools.k2value(this.statusRelation, this.formInline.delFlagName) || '0'
        this.$ajax.get('http://localhost:3000/content/release/article/getarticles', {params: this.formInline})
          .then(res => {
            console.log(res.data)
            if (res.data.code === 200) {
              this.pagination.total = res.data.data.total
              this.tableData = res.data.data.result
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
      },
      // 根据排序的规则 远程调取数据列表
      sortChange () {
        if (arguments[0].prop !== null) {
          if (!this.formInline.order) {
            this.formInline.order = arguments[0].prop + ' DESC'
            return
          }

          if (this.formInline.order.indexOf('DESC') === -1) {
            this.formInline.order = arguments[0].prop + ' DESC'
          } else {
            this.formInline.order = arguments[0].prop + ' ASC'
          }
          console.log(this.formInline.order)
          this.showForm()
        }
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

  /*图片上传*/
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
</style>
