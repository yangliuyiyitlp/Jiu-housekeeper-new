<template>
  <div>
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">

      <el-tab-pane label="文章列表" name="first" style="padding-left:10px;">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="栏目：">
            <!--数模型-->
            <el-input
              icon="search"
              v-model="formInline.city"
              :on-icon-click="handleIconClick" @click="dialogVisible = true">
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
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="city"
            label="栏目">
          </el-table-column>
          <el-table-column
            prop="adminphone"
            label="标题">
          </el-table-column>
          <el-table-column
            prop="adminphone"
            label="权重">
          </el-table-column>
          <el-table-column
            prop="number"
            label="点击数">
          </el-table-column>
          <el-table-column
            prop="number"
            label="发布者">
          </el-table-column>
          <el-table-column
            prop="city"
            label="更新时间">
          </el-table-column>
          <el-table-column
            prop="date"
            label="操作">
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
      </el-tab-pane>

      <el-tab-pane label="文章添加" name="second">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
  
          <el-form-item label="归属栏目:">
            <el-input v-model="ruleForm.attribution_column" placeholder="选择归属栏目"></el-input>
            <!--<span class="demonstration">有默认值</span>-->
            <el-color-picker v-model="color1" @change="colorchange"></el-color-picker>
          </el-form-item>
  
          <el-form-item label="标题:">
            <el-input v-model="ruleForm.title" placeholder="输入标题"></el-input>
            <span>外部链接:</span>
            <el-switch
              v-model="isExternallink"
              on-color="#13ce66" off-color="#ff4949"
              on-text="Y" off-text="N">
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
            <el-input v-model="ruleForm.power" :placeholder='this.isTop?"999":"0"'></el-input>
            <span>置顶:</span>
            <el-switch
              v-model="isTop"
              on-color="#13ce66" off-color="#ff4949"
              on-text="Y" off-text="N">
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
            <el-input type="textarea" v-model="ruleForm.abstract" class="width" v-bind:style="{color:fontcolor}"></el-input>
          </el-form-item>
  
          <!--格式应该不对-->
          <el-form-item label="缩略图:">
            <el-upload
              v-model="ruleForm.pic"
              class="upload-demo"
              ref="upload"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="ruleForm.fileList"
              :auto-upload="false">
              <el-button slot="trigger" size="small" type="primary">选取图片</el-button>
            </el-upload>
          </el-form-item>
  
          <el-form-item label="正文:">
            <input type="text" v-model='ruleForm.main_text' v-show='false'>
            <div id="editorElem" style="text-align:left"></div>
            <button @click="getContent">查看内容</button>
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
  import E from 'wangeditor'
  
  export default {
    name: 'editor',
    data () {
      return {
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
          admin: '0008',
          adminphone: '12345678999',
          number: '0',
          city: '上海',
          date: '2017-09-12 10:28:35'
        }, {
          admin: '0008',
          adminphone: '12345678999',
          number: '0',
          city: '北京',
          date: '2017-09-12 10:28:35'
        }],
        pagination: {pageSizes: [10, 20, 50, 100], pageSize: 10, total: 0, index: 1}
      }
    },
    created: function () {
      this.onSubmit('condition')
      console.log($('#editor'))
    },
    mounted () {
      var editor = new E('#editorElem')
      editor.customConfig.onchange = (html) => {
        this.editorContent = html
      }
      editor.create()
    },
    methods: {
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
        this.$refs[formName].resetFields()
      },
      handleIconClick () {},
      colorchange () {
        this.fontcolor = this.color1
        console.log(this.color1)
      },
      getContent () {
        this.main_text = this.editorContent
        console.log(this.editorContent)
        console.log(this.main_text)
      },
      handleRemove (file, fileList) {
        console.log(file, fileList)
      },
      handlePreview (file) {
        console.log(file)
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
