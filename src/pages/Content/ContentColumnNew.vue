<template>
  <div>
    <el-form :model="form" :rules="rules" ref="ruleForm" label-width="200px" class="demo-ruleForm">

      <el-form-item label=" 上级栏目ids:" v-if="0">
        <el-input v-model="form.parentIds"></el-input>
      </el-form-item>

      <el-form-item label=" 上级栏目id:" v-if="0">
        <el-input v-model="form.parentId"></el-input>
      </el-form-item>

      <el-form-item label="上级栏目:">
        <el-input
          :disabled="true"
          v-model="form.parentName">
        </el-input>
        <span>是否添加至顶级栏目?</span>
        <el-radio-group v-model="isTop" @change="isT">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
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

      <el-form-item label="栏目名称:" prop="name">
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

  </div>
</template>

<script>
  import qs from 'qs'
  import Tools from '../../utils/tools.js'
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
        Token: {}, // oss秘钥
        rules: {
          name: [{required: true, message: '栏目名称不能为空', trigger: 'blur'}]
        },
        isTop: '0' // 是否在顶级栏目下
      }
    },
    created () {
      this.getCategory()
    },
    methods: {
      // 有问题
      isT (val) {
        console.log(val)
        if (val === 1) {
          console.log(111)
          this.form.parentId = '1'
          this.form.parentIds = '0,1,'
          this.form.parentName = '顶级栏目'
        } else {
          console.log(222)
          this.form.parentId = this.$route.query.id
          this.form.parentIds = this.$route.query.parentIds + this.form.parentId + ','
          this.form.parentName = Tools.k2value(this.columnRelation, this.form.parentId)
        }
//        this.form.parentName = Tools.k2value(this.columnRelation, this.form.parentId)
        console.log(this.form)
      },
      // 请求栏目树组件数据
      getCategory () {
        // 请求栏目列表
        this.$ajax.get('content/column/getcategorys')
          .then(res => {
            if (res.data.code === 200) {
//              console.log(res.data.data)
              let arr = res.data.data
              this.selectSite = arr2tree.getTree(arr, '0')
              this.columnRelation = Tools.nameRelation(arr, 'id', 'name')
            }
          })
          .then(() => {
            // 进来设置好当前的parentId和parentIds
            this.form.parentId = this.$route.query.id
            this.form.parentName = Tools.k2value(this.columnRelation, this.form.parentId)
            this.form.parentIds = this.$route.query.parentIds + this.form.parentId + ','
            console.log(this.form)
          })
          .catch(err => {
            console.error(err)
          })
      },
      // 新增栏目
      submitForm (formName) {
        console.log(this.form)
        this.$ajax.post(`content/column/save`, qs.stringify(this.form))
          .then(res => {
            console.log(res)
            // 返回到栏目管理页面
            this.$router.push({
              name: 'content.column'
            })
            this.open('success', '新增栏目成功')
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

  /*没有加scoped，是因为需要表单el-form-item__label和el-form-item__content的样式*/
  html, body {
    height: 100%;
  }

  .demo-ruleForm {
    margin-top: 10px;
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
