<template>
  <div class="right">
    <el-tabs v-model="activeName2" type="card">
      <!--消息推送计划列表-->
      <el-tab-pane label="红包点击记录列表" name="first"style="padding-left:10px;">
        <!--筛选条件-->
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="姓名:">
            <el-input v-model="formInline.user" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item label="手机号:">
            <el-input v-model="formInline.phone" placeholder="手机号"></el-input>
          </el-form-item>
          <el-form-item label="红包金额:">
            <el-col :span="11">
              <el-input v-model="formInline.money" placeholder="最小值"></el-input>
            </el-col>
            <el-col class="line" :span="1">-</el-col>
            <el-col :span="11">
              <el-input v-model="formInline.money" placeholder="最大值"></el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="中奖标志:">
            <el-select v-model="formInline.logo" placeholder="选择中奖标志">
              <el-option label="未中奖" value="1"></el-option>
              <el-option label="中奖" value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="添加时间:">
            <date-pickers></date-pickers>
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
          stripe
          border
          style="width: 100%">
          <el-table-column
            width="280"
            header-align="center"
            align="center"
            prop="id"
            label="记录ID">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="name"
            label="姓名">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="phone"
            label="手机">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="money"
            label="红包金额">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="logo"
            label="中奖标志">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="add_time"
            label="添加时间">
          </el-table-column>
        </el-table>

        <!--分页组件-->
        <paginations></paginations>
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
          user: '',
          phone: '',
          money: '',
          logo: ''
        },
        tableData: [{
          id: 'ff8080815cf3e19a015d281438854bd5',
          name: '王小虎',
          phone: '13788947105',
          money: '10',
          logo: '未中奖',
          add_time: '2016-05-04 00:00:00'
        }, {
          id: 'ff8080815cf3e19a015d281438854bd5',
          name: '王小虎',
          phone: '13788947105',
          money: '10',
          logo: '未中奖',
          add_time: '2016-05-04 00:00:00'
        }, {
          id: 'ff8080815cf3e19a015d281438854bd5',
          name: '王小虎',
          phone: '13788947105',
          money: '10',
          logo: '未中奖',
          add_time: '2016-05-04 00:00:00'
        }, {
          id: 'ff8080815cf3e19a015d281438854bd5',
          name: '王小虎',
          phone: '13788947105',
          money: '10',
          logo: '未中奖',
          add_time: '2016-05-04 00:00:00'
        }, {
          id: 'ff8080815cf3e19a015d281438854bd5',
          name: '王小虎',
          phone: '13788947105',
          money: '10',
          logo: '未中奖',
          add_time: '2016-05-04 00:00:00'
        }, {
          id: 'ff8080815cf3e19a015d281438854bd5',
          name: '王小虎',
          phone: '13788947105',
          money: '10',
          logo: '未中奖',
          add_time: '2016-05-04 00:00:00'
        }, {
          id: 'ff8080815cf3e19a015d281438854bd5',
          name: '王小虎',
          phone: '13788947105',
          money: '10',
          logo: '未中奖',
          add_time: '2016-05-04 00:00:00'
        }, {
          id: 'ff8080815cf3e19a015d281438854bd5',
          name: '王小虎',
          phone: '13788947105',
          money: '10',
          logo: '未中奖',
          add_time: '2016-05-04 00:00:00'
        }, {
          id: 'ff8080815cf3e19a015d281438854bd5',
          name: '王小虎',
          phone: '13788947105',
          money: '10',
          logo: '未中奖',
          add_time: '2016-05-04 00:00:00'
        }, {
          id: 'ff8080815cf3e19a015d281438854bd5',
          name: '王小虎',
          phone: '13788947105',
          money: '10',
          logo: '未中奖',
          add_time: '2016-05-04 00:00:00'
        }, {
          id: 'ff8080815cf3e19a015d281438854bd5',
          name: '王小虎',
          phone: '13788947105',
          money: '10',
          logo: '未中奖',
          add_time: '2016-05-04 00:00:00'
        }, {
          id: 'ff8080815cf3e19a015d281438854bd5',
          name: '王小虎',
          phone: '13788947105',
          money: '10',
          logo: '未中奖',
          add_time: '2016-05-04 00:00:00'
        }, {
          id: 'ff8080815cf3e19a015d281438854bd5',
          name: '王小虎',
          phone: '13788947105',
          money: '10',
          logo: '未中奖',
          add_time: '2016-05-04 00:00:00'
        }, {
          id: 'ff8080815cf3e19a015d281438854bd5',
          name: '王小虎',
          phone: '13788947105',
          money: '10',
          logo: '未中奖',
          add_time: '2016-05-04 00:00:00'
        }, {
          id: 'ff8080815cf3e19a015d281438854bd5',
          name: '王小虎',
          phone: '13788947105',
          money: '10',
          logo: '未中奖',
          add_time: '2016-05-04 00:00:00'
        }, {
          id: 'ff8080815cf3e19a015d281438854bd5',
          name: '王小虎',
          phone: '13788947105',
          money: '10',
          logo: '未中奖',
          add_time: '2016-05-04 00:00:00'
        }, {
          id: 'ff8080815cf3e19a015d281438854bd5',
          name: '王小虎',
          phone: '13788947105',
          money: '10',
          logo: '未中奖',
          add_time: '2016-05-04 00:00:00'
        }, {
          id: 'ff8080815cf3e19a015d281438854bd5',
          name: '王小虎',
          phone: '13788947105',
          money: '10',
          logo: '未中奖',
          add_time: '2016-05-04 00:00:00'
        }, {
          id: 'ff8080815cf3e19a015d281438854bd5',
          name: '王小虎',
          phone: '13788947105',
          money: '10',
          logo: '未中奖',
          add_time: '2016-05-04 00:00:00'
        }, {
          id: 'ff8080815cf3e19a015d281438854bd5',
          name: '王小虎',
          phone: '13788947105',
          money: '10',
          logo: '未中奖',
          add_time: '2016-05-04 00:00:00'
        }, {
          id: 'ff8080815cf3e19a015d281438854bd5',
          name: '王小虎',
          phone: '13788947105',
          money: '10',
          logo: '未中奖',
          add_time: '2016-05-04 00:00:00'
        }, {
          id: 'ff8080815cf3e19a015d281438854bd5',
          name: '王小虎',
          phone: '13788947105',
          money: '10',
          logo: '未中奖',
          add_time: '2016-05-04 00:00:00'
        }, {
          id: 'ff8080815cf3e19a015d281438854bd5',
          name: '王小虎',
          phone: '13788947105',
          money: '10',
          logo: '未中奖',
          add_time: '2016-05-04 00:00:00'
        }, {
          id: 'ff8080815cf3e19a015d281438854bd5',
          name: '王小虎',
          phone: '13788947105',
          money: '10',
          logo: '未中奖',
          add_time: '2016-05-04 00:00:00'
        }]
      }
    },
    methods: {
      search () {
        console.log('search!')
      },
      exportData () {
        console.log('exportData!')
      }
    }
  }
</script>

<style scoped>
  .right {
    margin-left: 250px;
  }
</style>
