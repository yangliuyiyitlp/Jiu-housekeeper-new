<template>
  <div>
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <el-tab-pane label="公司信息管理列表" name="first" class="padding">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="城市：">
            <!--数模型-->
            <el-input
              icon="search"
              v-model="formInline.city"
              :on-icon-click="handleIconClick" @click="dialogVisible = true">
            </el-input>
          </el-form-item>
          <el-form-item label="公司名称：">
            <el-input v-model="formInline.name"></el-input>
          </el-form-item>
          <el-button type="primary" @click="onSubmit('condition')">查询</el-button>
          <el-button type="primary" @click="onExport">导出</el-button>
        </el-form>
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="city"
            label="公司名称">
          </el-table-column>
          <el-table-column
            prop="adminphone"
            label="城市编号">
          </el-table-column>
          <el-table-column
            prop="adminphone"
            label="收费标准">
          </el-table-column>
          <el-table-column
            prop="number"
            label="押金">
          </el-table-column>
          <el-table-column
            prop="number"
            label="客服电话">
          </el-table-column>
          <el-table-column
            prop="city"
            label="预约时间">
          </el-table-column>
          <el-table-column
            prop="city"
            label="临时停车时间">
          </el-table-column>
          <el-table-column
            prop="city"
            label="更新日期">
          </el-table-column>
          <el-table-column
            prop="city"
            label="备注">
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
      <el-tab-pane label="公司信息管理添加" name="second">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="城市编号：" prop="cityid">

          </el-form-item>
          <el-form-item label="公司名称：" prop="name">
            <el-input v-model="ruleForm.name" class="width"></el-input>
          </el-form-item>
          <el-form-item label="收费标准：" prop="name">
            <el-input v-model="ruleForm.name" class="width"></el-input>
          </el-form-item>
          <el-form-item label="押金：" prop="name">
            <el-input v-model="ruleForm.name" class="width"></el-input>
          </el-form-item>
          <el-form-item label="客服电话：" prop="name">
            <el-input v-model="ruleForm.name" class="width"></el-input>
          </el-form-item>
          <el-form-item label="预约时间：" prop="name">
            <el-input v-model="ruleForm.name" class="width"></el-input>
          </el-form-item>
          <el-form-item label="临时停车时间：" prop="name">
            <el-input v-model="ruleForm.name" class="width"></el-input>
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
  export default {
    data () {
      return {
        activeName2: 'first',
        value6: '',
        formInline: {
          city: '',
          name: ''
        },
        ruleForm: {
          name: '',
          region: '',
          photo: '',
          num: '',
          cityid: '',
          areaid: '',
          cityname: '',
          type: '',
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
      onExport () {
        console.log('onexport!')
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
      handleIconClick () {}
    }
  }
</script>

<style>
  /*没有加scoped，是因为需要需要表单el-form-item__label和el-form-item__content的样式*/
  html, body {
    height: 100%;
  }
  .padding{
    padding-left:10px;
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
