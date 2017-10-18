<template>
  <div class="right">
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">

      <!--消息推送组列表部分-->
      <el-tab-pane label="消息推送组列表" name="first"style="padding-left:10px;">
        <!--筛选条件-->
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="分组名称:">
            <el-input v-model="formInline.group" placeholder="分组名称"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="exportData">导出</el-button>
          </el-form-item>
        </el-form>

        <!--表格-->
        <el-table
          :data="tableData4"
          style="width: 100%"
          border
          stripe>
          <el-table-column
            header-align="center"
            align="center"
            prop="group_name"
            label="分组名称"
            width="300">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="id"
            label="主键ID"
            width="360">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="operator"
            label="操作者"
            width="120">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="edit_time"
            label="操作时间"
            width="200">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="remarks"
            label="备注"
            width="300">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            label="操作"
            width="120">
            <template slot-scope="scope">
              <el-button type="text" size="small">修改</el-button>
              <el-button
                @click="open2(scope.$index, tableData4)"
                type="text"
                size="small">
                移除
              </el-button>
            </template>
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            label="预览"
            width="120">
            <template slot-scope="scope">
              <el-button type="text" size="small">预览限定结果</el-button>
            </template>
          </el-table-column>

        </el-table>

        <!--分页-->
        <paginations></paginations>
      </el-tab-pane>

      <!--消息推送组添加部分-->
      <el-tab-pane label="消息推送组添加" name="second">

        <h1>暂停服务</h1>
        <!--表单-->
        <!--<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">-->
          <!--<el-form-item label="分组名称:" prop="name">-->
            <!--<el-input v-model="ruleForm.name"></el-input>-->
          <!--</el-form-item>-->

          <!--<el-form-item label="是否全选:">-->
            <!--<el-radio-group v-model="radio2">-->
              <!--<el-radio :label="1">是</el-radio>-->
              <!--<el-radio :label="2">否</el-radio>-->
            <!--</el-radio-group>-->
          <!--</el-form-item>-->

          <!--<el-form-item label="手机号:" prop="name">-->
            <!--<el-input v-model="ruleForm.phone"></el-input>-->
          <!--</el-form-item>-->

          <!--<el-form-item label="活动区域" prop="region">-->
            <!--<el-select v-model="ruleForm.region" placeholder="请选择活动区域">-->
              <!--<el-option label="区域一" value="shanghai"></el-option>-->
              <!--<el-option label="区域二" value="beijing"></el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="活动时间" required>-->
            <!--<el-col :span="11">-->
              <!--<el-form-item prop="date1">-->
                <!--<el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1"-->
                                <!--style="width: 100%;"></el-date-picker>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
            <!--<el-col class="line" :span="2">-</el-col>-->
            <!--<el-col :span="11">-->
              <!--<el-form-item prop="date2">-->
                <!--<el-time-picker type="fixed-time" placeholder="选择时间" v-model="ruleForm.date2"-->
                                <!--style="width: 100%;"></el-time-picker>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="即时配送" prop="delivery">-->
            <!--<el-switch on-text="" off-text="" v-model="ruleForm.delivery"></el-switch>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="活动性质" prop="type">-->
            <!--<el-checkbox-group v-model="ruleForm.type">-->
              <!--<el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>-->
              <!--<el-checkbox label="地推活动" name="type"></el-checkbox>-->
              <!--<el-checkbox label="线下主题活动" name="type"></el-checkbox>-->
              <!--<el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>-->
            <!--</el-checkbox-group>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="特殊资源" prop="resource">-->
            <!--<el-radio-group v-model="ruleForm.resource">-->
              <!--<el-radio label="线上品牌商赞助"></el-radio>-->
              <!--<el-radio label="线下场地免费"></el-radio>-->
            <!--</el-radio-group>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="活动形式" prop="desc">-->
            <!--<el-input type="textarea" v-model="ruleForm.desc"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item>-->
            <!--<el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>-->
            <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
          <!--</el-form-item>-->
        <!--</el-form>-->

      </el-tab-pane>
    </el-tabs>
  </div>

</template>
<script>
  export default {
    data () {
      return {
        activeName2: 'first',
        formInline: {
          group: ''
        },
        tableData4: [{
          group_name: '信用积分低于80分用户',
          id: '798d2045c4ad42ce909abbd82ad12a17',
          operator: '系统管理员',
          edit_time: '2017-09-21 15:51:12',
          remarks: '上海市普陀区'
        }, {
          group_name: '信用积分低于80分用户',
          id: '798d2045c4ad42ce909abbd82ad12a17',
          operator: '系统管理员',
          edit_time: '2017-09-21 15:51:12',
          remarks: '上海市普陀区'
        }, {
          group_name: '信用积分低于80分用户',
          id: '798d2045c4ad42ce909abbd82ad12a17',
          operator: '系统管理员',
          edit_time: '2017-09-21 15:51:12',
          remarks: '上海市普陀区'
        }, {
          group_name: '信用积分低于80分用户',
          id: '798d2045c4ad42ce909abbd82ad12a17',
          operator: '系统管理员',
          edit_time: '2017-09-21 15:51:12',
          remarks: '上海市普陀区'
        }],
        ruleForm: {
          name: '',
          phone: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        radio2: 2,
        rules: {
          name: [
            {required: true, message: '请输入活动名称', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          region: [
            {required: true, message: '请选择活动区域', trigger: 'change'}
          ],
          date1: [
            {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
          ],
          date2: [
            {type: 'date', required: true, message: '请选择时间', trigger: 'change'}
          ],
          type: [
            {type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change'}
          ],
          resource: [
            {required: true, message: '请选择活动资源', trigger: 'change'}
          ],
          desc: [
            {required: true, message: '请填写活动形式', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      handleClick (tab, event) {
        console.log(tab, event)
      },
      search () {
        console.log('search!')
      },
      exportData () {
        console.log('exportData!')
      },
      deleteRow (index, rows) {
        rows.splice(index, 1)
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
        this.$refs[formName].resetFields()
      }
    }
  }
</script>
<style scoped>
  .right {

  }
</style>
