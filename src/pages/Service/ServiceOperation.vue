<template>
  <div class="right">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <!--运维工单管理列表-->
      <el-tab-pane label="运维工单管理列表" name="first">

        <!--筛选条件-->
        <el-form :inline="true" :model="formInline" class="demo-form-inline">

          <el-form-item label="车辆编号:">
            <el-input v-model="formInline.bicycle_number" placeholder="车辆编号">
            </el-input>
          </el-form-item>

          <el-form-item label="车辆类型:">
            <el-select v-model="formInline.bicycle_type" placeholder="车辆类型" clearable>
              <el-option label="电动车" value="1"></el-option>
              <el-option label="自行车" value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="操作类型:">
            <el-select v-model="formInline.operate_type" placeholder="操作类型" clearable>
              <el-option label="故障车报修" value="1"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="审核标志:">
            <el-select v-model="formInline.audit_status" placeholder="审核标志" clearable>
              <el-option label="未审核" value="1"></el-option>
              <el-option label="审核通过" value="2"></el-option>
              <el-option label="审核未通过" value="3"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="添加时间:">
            <el-date-picker
              v-model="formInline.add_date"
              type="datetimerange"
              placeholder="选择时间范围">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="操作时间:">
            <el-date-picker
              v-model="formInline.operate_date"
              type="datetimerange"
              placeholder="选择时间范围">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="备注:">
            <el-input v-model="formInline.remark">
            </el-input>
          </el-form-item>

          <el-form-item label="操作员:">
            <el-input v-model="formInline.operator" placeholder="选择操作员">
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
            prop="bicycle_number"
            label="车辆编号"
            width="140">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="bicycle_type"
            label="车辆类型"
            width="130">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="operate_type"
            label="操作类型"
            width="130">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="audit_status"
            label="审核标志"
            width="180">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="add_date"
            label="添加时间"
            width="200">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="operate_date"
            label="操作时间"
            width="200">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="operator"
            label="操作者"
            width="130">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="remark"
            label="备注"
            width="400">
          </el-table-column>

          <el-table-column
            fixed="right"
            header-align="center"
            align="center"
            label="操作"
            width="150">
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

      <!--运维工单管理添加 -->
      <el-tab-pane label="运维工单管理添加" name="second" class="second">

        <el-form ref="form" :model="form" label-width="180px">

          <el-form-item label="车辆编号:">
            <el-input v-model="form.bicycle_number" placeholder="输入车辆编号"></el-input>
          </el-form-item>

          <el-form-item label="车辆类型:">
            <el-radio-group v-model="form.bicycle_type">
              <el-radio :label="1">自行车</el-radio>
              <el-radio :label="2">电动车</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="操作类型:">
            <el-select v-model="form.operate_type" placeholder="操作类型" clearable>
              <el-option label="故障车报修" value="1"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="添加时间:">
            <el-date-picker
              v-model="form.add_date"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="备注:">
            <el-input v-model="form.remark" type="textarea" class='textarea'></el-input>
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
          bicycle_number: '',
          bicycle_type: '',
          operate_type: '',
          audit_status: '',
          add_date: '',
          operate_date: '',
          remark: ''
        },
        form: {
          bicycle_number: '',
          bicycle_type: '',
          operate_type: '',
          add_date: '',
          remark: ''
        },
        tableData: [{
          bicycle_number: '5055005055',
          bicycle_type: '非法移车',
          operate_type: '大剿匪啊',
          audit_status: '审核未通过',
          add_date: '2017-09-21 15:51:12',
          operate_date: '2017-09-21 15:51:12',
          remark: '你想说什么什么事',
          operator: '大剿匪啊'
        }, {
          bicycle_number: '5055005055',
          bicycle_type: '非法移车',
          operate_type: '大剿匪啊',
          audit_status: '审核未通过',
          add_date: '2017-09-21 15:51:12',
          operate_date: '2017-09-21 15:51:12',
          remark: '你想说什么什么事',
          operator: '大剿匪啊'
        }, {
          bicycle_number: '5055005055',
          bicycle_type: '非法移车',
          operate_type: '大剿匪啊',
          audit_status: '审核未通过',
          add_date: '2017-09-21 15:51:12',
          operate_date: '2017-09-21 15:51:12',
          remark: '你想说什么什么事',
          operator: '大剿匪啊'
        }, {
          bicycle_number: '5055005055',
          bicycle_type: '非法移车',
          operate_type: '大剿匪啊',
          audit_status: '审核未通过',
          add_date: '2017-09-21 15:51:12',
          operate_date: '2017-09-21 15:51:12',
          remark: '你想说什么什么事',
          operator: '大剿匪啊'
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
    margin-left: 260px;
  }

  .second .textarea, .second .el-input, .second .el-input__inner {
    width: 300px;
  }

  p {
    color: red;
  }
</style>
