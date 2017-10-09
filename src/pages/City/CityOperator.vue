<template>
  <div class="count">
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <el-tab-pane label="运营人员管理列表" name="first">
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
            <!--数模型-->
            <el-input
              icon="search"
              v-model="formInline.search"
              :on-icon-click="handleIconClick" @click="dialogVisible = true">
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
          <el-button type="primary" @click="onSubmit('condition')">查询</el-button>
          <el-button type="primary" @click="onExport">导出</el-button>
        </el-form>
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
      <el-tab-pane label="运营人员管理添加" name="second">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
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
          <el-form-item label="城市ID：" prop="cityid">

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
          <el-form-item label="证件照正面：" prop="type">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">证件照命名以“p姓名_手机号”的方式：p张三_13706533081(只能上传jpg/png文件，且不超过500kb）</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="证件照反面：" prop="type">
            <el-upload
              class="upload-demo "
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove">
              <el-button size="small" type="primary">点击上传</el-button>
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
  export default {
    data () {
      return {
        activeName2: 'first',
        value6: '',
        formInline: {
          user: '',
          photo: '',
          nub: '',
          pageSize: 10,
          index: 1
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
      handleRemove (file, fileList) {
        console.log(file, fileList)
      },
      handlePreview (file) {
        console.log(file)
      },
      handleIconClick () {}
//      handleClick: function () {}
    }
  }
</script>
<style scoped>
  .count {
    margin-left: 250px;
  }

  .width {
    width: 300px;
  }
</style>
