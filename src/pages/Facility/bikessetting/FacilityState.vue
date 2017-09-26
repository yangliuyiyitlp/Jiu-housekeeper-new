<template>
  <div class="detailed">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="车辆编号：">
        <el-input v-model="formInline.num" placeholder="模糊查询"></el-input>
      </el-form-item>
      <el-form-item label="锁状态：">
        <el-input v-model="formInline.state" ></el-input>
      </el-form-item>
      <el-form-item label="在线标志：">
        <el-select v-model="formInline.code">
          <el-option label="锁开" value="open"></el-option>
          <el-option label="锁关" value="closed"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="电量值%：">

      </el-form-item>
      <el-form-item label="电池电压：">

      </el-form-item>
      <el-form-item label="充电电压：">

      </el-form-item>
      <el-form-item label="锁开次数：">

      </el-form-item>
      <el-form-item label="卫星数：">

      </el-form-item>
      <el-form-item label="信号强度：">

      </el-form-item>

      <el-form-item label="添加时间：">
        <el-date-picker
          v-model="value6"
          type="daterange">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="定位时间：">
        <el-date-picker
          v-model="value7"
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
        label="车辆编号">
      </el-table-column>
      <el-table-column
        prop="adminphone"
        label="所属城市">
      </el-table-column>
      <el-table-column
        prop="number"
        label="电量值%">
      </el-table-column>
      <el-table-column
        prop="city"
        label="电池电压">
      </el-table-column>
      <el-table-column
        prop="date"
        label="充电电压">
      </el-table-column>
      <el-table-column
        prop="date"
        label="信号强度">
      </el-table-column>
      <el-table-column
        prop="date"
        label="锁状态">
      </el-table-column>
      <el-table-column
        prop="date"
        label="在线标志">
      </el-table-column>
      <el-table-column
        prop="date"
        label="锁开次数">
      </el-table-column>
      <el-table-column
        prop="date"
        label="卫星数">
      </el-table-column>
      <el-table-column
        prop="date"
        label="SIM编号">
      </el-table-column>
      <el-table-column
        prop="date"
        label="速度">
      </el-table-column>
      <el-table-column
        prop="date"
        label="添加时间">
      </el-table-column>
      <el-table-column
        prop="date"
        label="定位时间">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        value6: '',
        value7: '',
        formInline: {
          num: '',
          state: '',
          code: ''
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
