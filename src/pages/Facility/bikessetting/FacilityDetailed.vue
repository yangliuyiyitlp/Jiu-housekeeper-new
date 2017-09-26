<template>
  <div class="detailed">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="管理员：">
        <el-input v-model="formInline.user" ></el-input>
      </el-form-item>
      <el-form-item label="管理员手机：">
        <el-input v-model="formInline.photo" ></el-input>
      </el-form-item>
      <el-form-item label="车辆编号：">
        <el-input v-model="formInline.nub" ></el-input>
      </el-form-item>
      <el-form-item label="所属城市：">
        <!--数模型-->
      </el-form-item>
      <el-form-item label="添加时间：">
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
        prop="adminphone"
        label="管理人员手机">
      </el-table-column>
      <el-table-column
        prop="number"
        label="车辆编号">
      </el-table-column>
      <el-table-column
        prop="city"
        label="所属城市">
      </el-table-column>
      <el-table-column
        prop="date"
        label="添加时间">
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
          nub: ''
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
  .detailed {
    margin-left: 250px;
  }


</style>
