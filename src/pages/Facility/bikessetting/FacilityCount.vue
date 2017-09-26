<template>
  <div class="count">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="管理员：">
        <el-input v-model="formInline.user" ></el-input>
      </el-form-item>
      <el-form-item label="管理员手机：">
        <el-input v-model="formInline.photo" ></el-input>
      </el-form-item>
      <el-form-item label="注册总数：">
        <el-input v-model="formInline.sum" ></el-input>
      </el-form-item>
      <el-form-item label="注册日期：">
            <el-date-picker
              v-model="value6"
              type="daterange">
            </el-date-picker>
      </el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
      <el-button type="primary" @click="onExport">导出</el-button>
    </el-form>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="admin"
        label="管理人员">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="管理员手机">
      </el-table-column>
      <el-table-column
        prop="sum"
        label="注册总数">
      </el-table-column>
      <el-table-column
        prop="date"
        label="注册日期">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        value6: '',
        formInline: {
          user: '',
          photo: '',
          sum: ''
        },
        tableData: [{
          admin: '0008',
          photo: '12345678999',
          date: '01',
          sum: '0'
        }, {
          admin: '0008',
          photo: '123456666678',
          date: '01',
          sum: '0'
        }]
      }
    },
    methods: {
      onSubmit () {
        console.log('submit!')
      },
      onExport () {
        console.log('onexport!')
      }
    }
  }
</script>
<style scoped>
  .count {
    margin-left: 250px;
  }


</style>
