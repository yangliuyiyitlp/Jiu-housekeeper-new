<template>
  <div>
    <el-form :model="form" :rules="rules" ref="ruleForm" label-width="200px" class="ruleForm">

      <el-form-item label="文章id:" v-if=0>
        <el-input v-model="form.id"></el-input>
      </el-form-item>

      <el-form-item label=" 上级栏目id:" v-if="0">
        <el-input v-model="form.parentId"></el-input>
      </el-form-item>

      <el-form-item label="上级栏目:" prop="site">
        <el-input
          icon="search"
          :disabled="true"
          :on-icon-click="searchSite"
          v-model="form.parentName"
          placeholder="选择上级栏目">
        </el-input>
      </el-form-item>

      <el-form-item label=" 栏目模型:">
        <el-select v-model="form.module" clearable placeholder="请选择">
          <el-option
            v-for="item in moduleR"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="栏目名称:">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="缩略图:">
        <img width="100%" :src="form.image" v-show="form.image" alt="图无法展示">
        <el-input v-model="form.image" v-show='false'></el-input>
        <el-upload
          ref="upload"
          list-type="picture-card"
          action='http://jjdcjavaweb.oss-cn-shanghai.aliyuncs.com'
          :data="Token"
          :on-remove="onRemove"
          :before-upload="beforeUpload">
          <el-button type="primary" @click="clearUploadedImage">上传图片
            <i class="el-icon-upload el-icon--right"></i>
          </el-button>
        </el-upload>
      </el-form-item>

      <el-form-item label="链接:">
        <el-input v-model="form.href"></el-input>
        <span>栏目超链接地址，优先级“高”</span>
      </el-form-item>

      <el-form-item label="目标:">
        <el-select v-model="form.target" clearable placeholder="请选择">
          <el-option label="_blank" value="_blank"></el-option>
          <el-option label="_self" value="_self"></el-option>
          <el-option label="_parent" value="_parent"></el-option>
          <el-option label="_top" value="_top"></el-option>
        </el-select>
        <span>栏目超链接打开的目标窗口，新窗口打开，请填写：“_blank”</span>
      </el-form-item>
      <!--目标（ _blank、_self、_parent、_top）-->

      <el-form-item label="描述:">
        <el-input v-model="form.description" type="textarea" class="txtWidth"></el-input>
      </el-form-item>

      <el-form-item label="关键字:">
        <el-input v-model="form.keywords"></el-input>
        <span>填写描述及关键字，有助于搜索引擎优化</span>
      </el-form-item>

      <el-form-item label="排序:">
        <el-input v-model="form.sort"></el-input>
        <span>栏目的排列次序</span>
      </el-form-item>

      <el-form-item label="在导航中显示:">
        <el-select v-model="form.inMenu" clearable placeholder="请选择">
          <el-option label="显示" value='1'></el-option>
          <el-option label="不显示" value='0'></el-option>
        </el-select>
        <span>是否在导航中显示该栏目</span>
      </el-form-item>

      <el-form-item label="在分类页中显示列表:">
        <el-select v-model="form.inList" clearable placeholder="请选择">
          <el-option label="显示" value='1'></el-option>
          <el-option label="不显示" value='0'></el-option>
        </el-select>
        <span>是否在分类页中显示该栏目的文章列表</span>
      </el-form-item>

      <el-form-item label="展现方式:">
        <el-select v-model="form.showModes" clearable placeholder="请选择">
          <el-option label="默认展现方式" value='0'></el-option>
          <el-option label="首栏目内容列表" value='1'></el-option>
          <el-option label="栏目第一条内容" value='2'></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="是否允许评论:">
        <el-select v-model="form.allowComment" clearable placeholder="请选择">
          <el-option label="是" value='1'></el-option>
          <el-option label="否" value='0'></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="是否需要审核:">
        <el-select v-model="form.isAudit" clearable placeholder="请选择">
          <el-option label="是" value='1'></el-option>
          <el-option label="否" value='0'></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">保存</el-button>
        <el-button @click="returnBack">返回</el-button>
      </el-form-item>

    </el-form>

    <!--模态框-->
    <!--columnVisible2-->
    <!--修改时弹出的上级栏目树模型-->
    <el-dialog title="选择栏目" size="tiny" :visible.sync="columnVisible2">
      <el-tree
        highlight-current
        default-expand-all
        :data="selectSite"
        @node-click="searchSiteColumn"
        :props="defaultProps">
      </el-tree>
    </el-dialog>
  </div>
</template>

<script>
  import qs from 'qs'
  import Tools from '../../../static/js/tools.js'
  import arr2tree from '../../utils/arr2tree.js'

  export default {
    data () {
      return {
        form: {}, // 栏目详情
        moduleR: [
          {
            value: 'article',
            label: '文章'
          }
        ], // 文章类型关系栏目模型（article：文章；picture：图片；download：下载；link：链接；special：专题）
        selectSite: [], // 栏目树组件
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        columnRelation: {}, // 栏目中id与name之间的关系
        columnVisible2: false, // 修改中上级栏目模态框
        Token: {}, // oss秘钥
        rules: {
          title: [{required: true, message: '标题不能为空', trigger: 'blur'}],
          categoryName: [{required: true, message: '请选择归属栏目', trigger: 'change'}]
        }
      }
    },
    created () {
      new Promise(() => {
        this.getCategory()
      })
        .then(this.show())
    },
    methods: {
      // 根据id展示当前栏目详情
      show () {
//        console.log(this.$route.query)
        this.$ajax.get(`content/column/show/${this.$route.query.id}`)
          .then(res => {
//            console.log(res)
            if (res.data.code === 200) {
              this.open('success', res.data.msg)
              this.form = res.data.data
              this.form.parentName = Tools.k2value(this.columnRelation, this.form.parentId)
              console.log(this.form)
            } else {
              this.open('info', res.data.msg)
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      // 请求栏目树组件数据
      getCategory () {
        // 请求栏目列表
        this.$ajax.get('content/column/getcategorys')
          .then(res => {
            if (res.data.code === 200) {
              console.log(res.data.data)
              let arr = res.data.data
              this.columnRelation = Tools.nameRelation(arr, 'id', 'name')
              this.selectSite = arr2tree.getTree(arr, '1')
            }
          })
          .catch(err => {
            console.error(err)
          })
      },
      // 点击显示 修改的上级栏目 模态框
      searchSite () {
        this.columnVisible2 = true
      },
      // 点击模态框 选择栏目
      searchSiteColumn (data) {
        console.log(data)
        // 模态框隐藏
        this.columnVisible2 = false
        // 获取树组件被选中的参数并保存在this.form中
        this.form.parentName = data.name
        this.form.parentId = data.id
        console.log(this.form)
      },
      // 保存更新数据
      submitForm (formName) {
        console.log(this.form)
        this.$ajax.post(`content/column/update`, qs.stringify(this.form))
          .then(res => {
            console.log(res)
            // 返回到栏目管理页面
            this.$router.push({
              name: 'content.column'
            })
          })
          .catch(err => {
            console.log(err)
          })
//        this.$refs[formName].validate((valid) => {
//          if (valid) {
//            this.ruleForm.trademark = (this.Token.key === undefined ? '' : 'http://jjdcjavaweb.oss-cn-shanghai.aliyuncs.com/' + this.Token.key)
//            this.ruleForm.content = window.UE.getEditor('ue').getContent()
//            this.ruleForm.keywords = (this.ruleForm.keywords === '' ? '' : this.ruleForm.keywords.split(' ').join(','))
//            this.ruleForm.weightDate = (this.ruleForm.weightDate === undefined ? null : Moment(this.ruleForm.weightDate).format('YYYY-MM-DD HH:mm:ss'))
//            this.ruleForm.delFlag = Tools.k2value(this.statusRelation, this.ruleForm.delFlagName) || '0'
//            this.ruleForm.posid = this.ruleForm.posName.map(i => {
//              return Tools.k2value(this.posRelation, i)
//            }).join(',')
//            console.log(this.ruleForm)
//            this.$ajax.post('content/release/update/article', qs.stringify(this.ruleForm))
//              .then(res => {
//                console.log(res)
//                if (res.code === 200) {
//                  open('success', res.data.msg)
//                }
//                // 根据查询字符串展示文章列表
//                this.formInline = {
//                  categoryId: this.ruleForm.categoryId,
//                  categoryName: this.ruleForm.categoryName,
//                  delFlagName: this.ruleForm.delFlagName
//                }
//                this.showForm()
//                // 返回第一个页面并显示相对应的栏目列表
//                this.activeName2 = 'first'
//                this.ruleForm = {}
//                open('info', res.data.msg)
//              })
//              .catch(err => {
//                this.open('info', err.data.msg)
//              })
//          } else {
//            return false
//          }
//        })
//        // 清空图片列表
//        this.clearUploadedImage()
      },
      // 直接返回到栏目管理页面
      returnBack () {
        this.$router.push({
          name: 'content.column'
        })
      },
      // 封装小工具
      // 显示的提示设置
      open (type, msg) {
        // 提示信息
        this.$message({
          type: type,
          message: msg
        })
      },
      // 上传组件获取oss相关
      beforeUpload (file) {
        return new Promise((resolve) => {
          this.$ajax.get('beforeUpload/img', {params: {user_dir: 'contentColumn'}})
            .then((res) => {
              this.Token = res.data
              this.Token.key = this.Token.dir + '/' + (+new Date()) + file.name
              // oss上图片的路径 在表单体提交之前拼接
              this.form.image = 'http://jjdcjavaweb.oss-cn-shanghai.aliyuncs.com/' + this.Token.key
              resolve()
            })
            .catch(err => {
              console.error(err)
            })
        })
      },
      // 移除图片时清空form表单中的图片地址
      onRemove () {
        this.form.image = ''
      },
      // 上传之前 清除原有图片
      clearUploadedImage () {
        this.$refs.upload.clearFiles()
        this.form.image = ''
      }
    }
  }
</script>

<style scoped>
  .padding {
    padding-left: 10px;
  }

  .search_bar {
    border: 1px solid #fff;
    overflow: auto;
  }

  .txtWidth {
    width: 350px;
  }

  html, body {
    height: 100%;
  }

  .ruleForm {
    margin-top: 10px;
  }

  .ruleForm > .el-form-item > .el-form-item__label {
    width: 150px !important;
  }

  .ruleForm > .el-form-item > .el-form-item__content {
    margin-left: 150px !important;
  }

  .ruleForm .textarea, .ruleForm .el-input, .ruleForm .el-input__inner {
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
