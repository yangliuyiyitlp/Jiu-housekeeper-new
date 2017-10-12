<template>
  <div class="right">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <!--违规工单登记列表-->
      <el-tab-pane label="违规工单登记列表" name="first"style="padding-left:10px;">

        <!--筛选条件-->
        <el-form :inline="true" :model="formInline" class="demo-form-inline">

          <el-form-item label="姓名:">
            <el-input v-model="formInline.user" placeholder="姓名">
            </el-input>
          </el-form-item>

          <el-form-item label="手机号:">
            <el-input v-model="formInline.phone" placeholder="手机号">
            </el-input>
          </el-form-item>

          <el-form-item label="车辆编号:">
            <el-input v-model="formInline.bicycle_number" placeholder="车辆编号">
            </el-input>
          </el-form-item>

          <el-form-item label="违规类型:">
            <el-select v-model="formInline.violation_type" placeholder="违规类型" clearable>
              <el-option label="违停一次" value="1"></el-option>
              <el-option label="加装私锁" value="2"></el-option>
              <el-option label="车辆丢失" value="3"></el-option>
              <el-option label="非法移车" value="4"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="变更积分:">
            <el-input v-model="formInline.change_points" placeholder="变更积分">
            </el-input>
          </el-form-item>

          <el-form-item label="冲正标志:">
            <el-select v-model="formInline.logo" placeholder="冲正标志" clearable>
              <el-option label="未冲正" value="1"></el-option>
              <el-option label="已冲正" value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="审核状态:">
            <el-select v-model="formInline.audit_status" placeholder="审核状态" clearable>
              <el-option label="未审核" value="1"></el-option>
              <el-option label="审核通过" value="2"></el-option>
              <el-option label="审核未通过" value="3"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="积分清零:">
            <el-select v-model="formInline.integral_zero" placeholder="积分清零" clearable>
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="操作员:">
            <el-input v-model="formInline.operator" placeholder="选择操作员">
            </el-input>
          </el-form-item>

          <el-form-item label="更新时间:">
            <el-date-picker
              v-model="formInline.update_date"
              type="datetimerange"
              placeholder="选择时间范围">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="违规时间:">
            <el-date-picker
              v-model="formInline.violation_date"
              type="datetimerange"
              placeholder="选择时间范围">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="问题描述:">
            <el-input v-model="formInline.problem_des" placeholder="问题描述">
            </el-input>
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
          :data="tableData"
          style="width: 100%"
          border
          stripe>
          <el-table-column
            header-align="center"
            align="center"
            prop="user"
            label="姓名"
            width="120">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="phone"
            label="手机号"
            width="130">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="bicycle_number"
            label="车辆编号"
            width="120">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="violation_type"
            label="违规类型"
            width="120">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="violation_date"
            label="违规时间"
            width="180">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="change_points"
            label="变更积分"
            width="100">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="logo"
            label="冲正标志"
            width="100">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="audit_status"
            label="审核状态"
            width="130">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="integral_zero"
            label="积分清零"
            width="140">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="operator"
            label="操作员"
            width="120">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="update_date"
            label="更新时间"
            width="180">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="charge"
            label="冲正"
            width="80">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="problem_des"
            label="问题描述"
            width="300">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="remark"
            label="备注"
            width="300">
          </el-table-column>

          <el-table-column
            fixed="right"
            header-align="center"
            align="center"
            label="操作"
            width="120">
            <template scope="scope">
              <el-button type="text" size="small">修改</el-button>
              <el-button
                @click="open2(scope.$index, tableData)"
                type="text"
                size="small">
                移除
              </el-button>
            </template>
          </el-table-column>

        </el-table>

        <!--分页-->
        <paginations></paginations>

      </el-tab-pane>

      <!--违规工单登记添加 -->
      <el-tab-pane label="违规工单登记添加" name="second" class="second">

        <el-form ref="form" :model="form" label-width="180px">

          <el-form-item label="手机号:">
            <el-input v-model="form.phone" placeholder="输入手机号"></el-input>
          </el-form-item>

          <el-form-item label="车辆编号:">
            <el-input v-model="form.bicycle_number" placeholder="输入车辆编号"></el-input>
          </el-form-item>

          <el-form-item label="违规类型:">
            <el-radio-group v-model="form.violation_type">
              <el-radio :label="1">违停一次</el-radio>
              <el-radio :label="2">加装私锁</el-radio>
              <el-radio :label="3">车辆丢失</el-radio>
              <el-radio :label="4">非法移车</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="是否积分清零:">
            <el-radio-group v-model="form.integral_zero">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="2">否</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="信用积分:">
            <el-input v-model="form.bicycle_number" placeholder="输入信用积分"></el-input>
          </el-form-item>

          <el-form-item label="问题描述:">
            <el-input v-model="form.problem_des" type="textarea" class='textarea'></el-input>
          </el-form-item>

          <el-form-item label="违规时间:">
            <el-date-picker
              v-model="form.violation_date"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="违规图片1:">
            <p>*违规照片以前缀+手机号+后缀的方式：feed_13706533081_1</p>
          </el-form-item>

          <el-form-item label="违规图片2:">
            <p>*违规照片以前缀+手机号+后缀的方式：feed_13706533081_2</p>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="saveData">保存</el-button>
            <el-button>返回</el-button>
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
        value1: '',
        activeName: 'first',
        formInline: {
          user: '',
          phone: '',
          bicycle_number: '',
          violation_type: '',
          change_points: '',
          logo: '',
          audit_status: '',
          integral_zero: '',
          operator: '',
          update_date: '',
          violation_date: '',
          problem_des: ''
        },
        form: {
          phone: '',
          bicycle_number: '',
          violation_type: '',
          integral_zero: '',
          points: '',
          problem_des: '',
          violation_date: ''
        },
        tableData: [{
          user: '拉拉阿拉',
          phone: '18745852358',
          bicycle_number: '5055005055',
          violation_type: '非法移车',
          violation_date: '2017-09-21 15:51:12',
          logo: '未冲正',
          change_points: '11',
          audit_status: '审核未通过',
          integral_zero: '是',
          operator: '大剿匪啊',
          update_date: '2017-09-21 15:51:12',
          problem_des: '',
          remark: '',
          charge: '是'
        }, {
          user: '拉拉阿拉',
          phone: '18745852358',
          bicycle_number: '5055005055',
          violation_type: '非法移车',
          violation_date: '2017-09-21 15:51:12',
          change_points: '11',
          logo: '未冲正',
          audit_status: '审核未通过',
          integral_zero: '是',
          operator: '大剿匪啊',
          update_date: '2017-09-21 15:51:12',
          problem_des: '',
          remark: '',
          charge: '是'
        }, {
          user: '拉拉阿拉',
          phone: '18745852358',
          bicycle_number: '5055005055',
          violation_type: '非法移车',
          violation_date: '2017-09-21 15:51:12',
          change_points: '11',
          logo: '未冲正',
          audit_status: '审核未通过',
          integral_zero: '是',
          operator: '大剿匪啊',
          update_date: '2017-09-21 15:51:12',
          problem_des: '',
          remark: '',
          charge: '是'
        }, {
          user: '拉拉阿拉',
          phone: '18745852358',
          bicycle_number: '5055005055',
          violation_type: '非法移车',
          violation_date: '2017-09-21 15:51:12',
          change_points: '11',
          logo: '未冲正',
          audit_status: '审核未通过',
          integral_zero: '是',
          operator: '大剿匪啊',
          update_date: '2017-09-21 15:51:12',
          problem_des: '',
          remark: '',
          charge: '是'
        }]
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
      saveData () {
        console.log('saveData!')
      }
    }
  }
</script>

<style scoped>
  .right {
    margin-left: 250px;
  }

  .second .textarea, .second .el-input, .second .el-input__inner {
    width: 300px;
  }
  p{
    color:red;
  }
</style>
