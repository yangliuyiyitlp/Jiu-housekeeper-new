<template>
  <div>
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <el-tab-pane label="文章列表" name="first"style="padding-left:10px;">
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
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="摘要：" prop="desc">
            <el-input type="textarea" v-model="ruleForm.desc" class="width" v-bind:style="{color:fontcolor}"></el-input>
            <div class="block">
              <!--<span class="demonstration">有默认值</span>-->
              <el-color-picker v-model="color1" @change="colorchange"></el-color-picker>
            </div>
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
  export default {
    data () {
      return {
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
          desc: ''
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
    },
    methods: {
      handleClick (tab, event) {
        console.log(tab, event)
      },
      onSubmit: function (condition) {
        var param = {}
        if (condition === 'condition') {
          param = this.formInline
        } else {
          param = condition
        }
        console.log(param)
        this.$http.post('/dataGrid/query', JSON.stringify(param)).then(function (response) {
          this.tableData = response.data.list
          this.pagination.total = response.data.total
        }, function (err) {
          this.$message({
            type: 'info',
            message: '获取列表信息失败' + err.status
          })
        })
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
      }
    }
  }
</script>

<style>
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
</style>
