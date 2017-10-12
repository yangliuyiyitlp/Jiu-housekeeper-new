<template>
  <div class="count">
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <el-tab-pane label="城市黑名单列表" name="first"style="padding-left:10px;">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="姓名：">
            <el-input v-model="formInline.user" ></el-input>
          </el-form-item>
          <el-form-item label="身份证：">
            <el-input v-model="formInline.user" ></el-input>
          </el-form-item>
          <el-form-item label="添加渠道：">
            <el-select v-model="formInline.status">
              <el-option label="管理平台" value="open"></el-option>
              <el-option label="APP后台" value="closed"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态：">
            <el-select v-model="formInline.status">
              <el-option label="待生效" value="open"></el-option>
              <el-option label="生效中" value="closed"></el-option>
              <el-option label="已过期" value="closed"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="生效城市：" >
            <el-col :span="11" >
              <el-input v-model="formInline.electricstart" ></el-input>
            </el-col>
            <el-col class="line" :span="1" style="text-align: center">-</el-col>
            <el-col :span="11">
              <el-input v-model="formInline.electricend"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="生效时间：">
            <el-date-picker
              v-model="value6"
              type="daterange">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="失效时间：">
            <el-date-picker
              v-model="value6"
              type="daterange">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="违法时间：">
            <el-date-picker
              v-model="value6"
              type="daterange">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="违法原因：">
            <el-input v-model="formInline.user" ></el-input>
          </el-form-item>
          <el-button type="primary" @click="onSubmit('condition')">查询</el-button>
          <el-button type="primary" @click="onExport">导出</el-button>
        </el-form>
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="adminphone"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="adminphone"
            label="身份证">
          </el-table-column>
          <el-table-column
            prop="city"
            label="生效城市">
          </el-table-column>
          <el-table-column
            prop="city"
            label="生效时间">
          </el-table-column>
          <el-table-column
            prop="city"
            label="失效时间">
          </el-table-column>
          <el-table-column
            prop="city"
            label="违法时间">
          </el-table-column>
          <el-table-column
            prop="date"
            label="违法原因">
          </el-table-column>
          <el-table-column
            prop="date"
            label="添加渠道">
          </el-table-column>
          <el-table-column
            prop="date"
            label="状态">
          </el-table-column>
          <el-table-column
            prop="date"
            label="维修中">
          </el-table-column>
          <el-table-column
            prop="date"
            label="操作者">
          </el-table-column>
          <el-table-column
            prop="date"
            label="操作时间">
          </el-table-column>
          <el-table-column
            prop="date"
            label="备注">
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
      <el-tab-pane label="城市黑名单添加" name="second">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="姓名：" prop="num">
            <el-input v-model="ruleForm.name"class="width"></el-input>
          </el-form-item>
          <el-form-item label="身份证：" prop="num">
            <el-input v-model="ruleForm.name"class="width"></el-input>
          </el-form-item>
          <el-form-item label="所属城市：" prop="num">

          </el-form-item>
          <el-form-item label="有效时间：" prop="num">
            <div class="block ">
              <el-date-picker
                class="width"
                v-model="value6"
                type="daterange"
                placeholder="选择日期范围">
              </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="违法时间：" prop="num">
            <div class="block ">
              <el-date-picker
                class="width"
                v-model="value6"
                type="daterange"
                placeholder="选择日期范围">
              </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="违法原因：" prop="num">
            <el-input v-model="ruleForm.name"class="width"></el-input>
          </el-form-item>
          <el-form-item label="备注：" prop="desc">
            <el-input type="textarea" v-model="ruleForm.desc"class="width"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
          <div>点击《保存》将添加一条记录；点击《导入》将根据execel批量添加；</div>
          <div>点击《下载模板》，根据模板将需要导入的数据填充进去；</div>
          <div>注意：1.execel列的顺序不能改变，2.只需要填充 当事人、身份证号、违法时间、违法原因 四列，其他列可以删除或者不填</div>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="黑名单导入" name="three">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="所属城市：" prop="num">

        </el-form-item>
        <el-form-item label="有效时间：" prop="num">
          <div class="block">
            <el-date-picker
              class="width"
              v-model="value6"
              type="daterange"
              placeholder="选择日期范围">
            </el-date-picker>
          </div>
        </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
          <div>每晚12点更新黑名单状态,所以生效时间设置必须在添加日之后；如今天是9月14日，生效时间必须是15日或之后</div>
          <div>点击《下载模板》，根据模板将需要导入的数据填充进去；</div>
          <div>注意：1.execel列的顺序不能改变，2.只需要填充 当事人、身份证号、违法时间、违法原因等四列，其他列可以删除或者不填</div>
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
        ruleForm: {
          name: '',
          area: '',
          uodate: '',
          desc: ''
        },
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
      handleClick (tab, event) {
        console.log(tab, event)
      }
    }
  }
</script>
<style scoped>
  .count {
    margin-left: 250px;
  }
.width{
  width:300px;
}
</style>
