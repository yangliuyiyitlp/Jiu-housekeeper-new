<template>
  <div class="right">
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <!--手机变更历史列表-->
      <el-tab-pane label="手机变更历史列表" name="first"style="padding-left:10px;">

        <!--筛选条件-->
        <el-form :inline="true" :model="formInline" class="demo-form-inline">

          <el-form-item label="原手机号:">
            <el-input v-model="formInline.old_phone" placeholder="输入旧手机号查询">
            </el-input>
          </el-form-item>

          <el-form-item label="新手机号:">
            <el-input v-model="formInline.new_phone" placeholder="输入新手机号查询">
            </el-input>
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
            prop="old_phone"
            label="原手机号"
            width="260">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="new_phone"
            label="新手机号"
            width="260">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="operator"
            label="操作者"
            width="140">
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
            prop="des"
            label="备注"
            width="300">
          </el-table-column>
        </el-table>

        <!--分页-->
        <paginations></paginations>

      </el-tab-pane>

      <!--手机变更历史添加 -->
      <el-tab-pane label="手机变更历史添加" name="second" class="second">

        <el-form ref="form" :model="form" label-width="150px">

          <el-form-item label="原手机号:">
            <el-input v-model="form.old_phone" placeholder="输入原手机号"></el-input>
          </el-form-item>

          <el-form-item label="新手机号:">
            <el-input v-model="form.new_phone" placeholder="输入新手机号"></el-input>
          </el-form-item>

          <el-form-item label="验证码:">
            <el-input v-model="form.verification_code" placeholder="输入获得的验证码"></el-input>
          </el-form-item>

          <el-form-item label="显示图片:">
            <p>*证件照命名以《姓名_手机号》的方式：张三_13706533081</p>
          </el-form-item>

          <el-form-item label="备注:">
            <el-input v-model="form.des" type="textarea" class='textarea'></el-input>
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
        activeName2: 'first',
        formInline: {
          bicycle_status: '',
          bicycle_type: '',
          city_name: '',
          isDefault: '',
          add_date: ''
        },
        form: {
          old_phone: '',
          new_phone: '',
          verification_code: '',
          des: ''
        },
        tableData: [{
          old_phone: '18745852358',
          new_phone: '18745632154',
          operator: '大剿匪啊',
          update_date: '2017-09-21 15:51:12',
          des: ''
        }, {
          old_phone: '18745852358',
          new_phone: '18745632154',
          operator: '大剿匪啊',
          update_date: '2017-09-21 15:51:12',
          des: ''
        }, {
          old_phone: '18745852358',
          new_phone: '18745632154',
          operator: '大剿匪啊',
          update_date: '2017-09-21 15:51:12',
          des: ''
        }, {
          old_phone: '18745852358',
          new_phone: '18745632154',
          operator: '大剿匪啊',
          update_date: '2017-09-21 15:51:12',
          des: ''
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
  
  }

  .second .textarea, .second .el-input, .second .el-input__inner {
    width: 300px;
  }
  p{
    color:red;
  }
</style>
