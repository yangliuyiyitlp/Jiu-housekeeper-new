<template>
  <div class="right">
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <!--车辆图标配置列表-->
      <el-tab-pane label="信用积分变更明细列表" name="first"style="padding-left:10px;">

        <!--筛选条件-->
        <el-form :inline="true" :model="formInline" class="demo-form-inline">

          <el-form-item label="姓名:">
            <el-input v-model="formInline.user" placeholder="输入姓名查询">
            </el-input>
          </el-form-item>

          <el-form-item label="手机号:">
            <el-input v-model="formInline.phone" placeholder="输入手机号查询">
            </el-input>
          </el-form-item>

          <el-form-item label="变更积分:">
            <el-col :span="11">
              <el-input v-model="formInline.change_credit" placeholder="最小值"></el-input>
            </el-col>
            <el-col class="line" :span="1">-</el-col>
            <el-col :span="11">
              <el-input v-model="formInline.change_credit" placeholder="最大值"></el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="变更类型:">
            <el-select v-model="formInline.change_type" placeholder="选择变更类型" clearable>
              <el-option label="注册完成" value="1"></el-option>
              <el-option label="正常骑行一次" value="2"></el-option>
              <el-option label="分享一次骑行" value="3"></el-option>
              <el-option label="邀请一个好友注册成功" value="4"></el-option>
              <el-option label="留言或意见采纳成功" value="5"></el-option>
              <el-option label="上报一次核实有效的违停或故障" value="6"></el-option>
              <el-option label="超过两小时未关锁" value="7"></el-option>
              <el-option label="违停一次" value="8"></el-option>
              <el-option label="加装私锁" value="9"></el-option>
              <el-option label="忘记关锁,车辆丢失" value="10"></el-option>
              <el-option label="非法移车" value="11"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="操作员:">
            <el-input v-model="formInline.operator" placeholder="选择操作员">
            </el-input>
          </el-form-item>

          <el-form-item label="变更时间:">
            <el-date-picker
              v-model="formInline.change_date"
              type="datetimerange"
              placeholder="选择时间范围">
            </el-date-picker>
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
            prop="id"
            label="ID"
            width="300">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="user"
            label="姓名"
            width="110">
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
            prop="change_type"
            label="变更类型"
            width="130">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="changed_credit"
            label="变更积分"
            width="130">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="change_credit"
            label="变更前积分"
            width="130">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="change_date"
            label="变更时间"
            width="170">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="update_date"
            label="更新时间"
            width="170">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="operator"
            label="操作员"
            width="140">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="update_date"
            label="更新时间"
            width="170">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="des"
            label="备注"
            width="300">
          </el-table-column>
          <el-table-column
            fixed="right"
            header-align="center"
            align="center"
            label="操作"
            width="120">
            <template slot-scope="scope">
              <el-button type="text" size="small">积分冲正</el-button>
            </template>
          </el-table-column>

        </el-table>

        <!--分页-->
        <paginations></paginations>

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
          user: '',
          phone: '',
          change_credit: '',
          change_type: '',
          operator: '',
          change_date: '',
          update_date: ''
        },
        tableData: [{
          id: 'ff8080815ec1f131015ec210f5280007',
          user: '大剿匪啊',
          phone: '13054851851',
          change_type: '正常骑行一次',
          changed_credit: 1,
          change_credit: 256,
          change_date: '2017-09-21 15:51:12',
          update_date: '2017-09-21 15:51:12',
          operator: '系统管理员',
          des: ''
        }, {
          id: 'ff8080815ec1f131015ec210f5280007',
          user: '大剿匪啊',
          phone: '13054851851',
          change_type: '正常骑行一次',
          changed_credit: 1,
          change_credit: 256,
          change_date: '2017-09-21 15:51:12',
          update_date: '2017-09-21 15:51:12',
          operator: '系统管理员',
          des: ''
        }, {
          id: 'ff8080815ec1f131015ec210f5280007',
          user: '大剿匪啊',
          phone: '13054851851',
          change_type: '正常骑行一次',
          changed_credit: 1,
          change_credit: 256,
          change_date: '2017-09-21 15:51:12',
          update_date: '2017-09-21 15:51:12',
          operator: '系统管理员',
          des: ''
        }, {
          id: 'ff8080815ec1f131015ec210f5280007',
          user: '大剿匪啊',
          phone: '13054851851',
          change_type: '正常骑行一次',
          changed_credit: 1,
          change_credit: 256,
          change_date: '2017-09-21 15:51:12',
          update_date: '2017-09-21 15:51:12',
          operator: '系统管理员',
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
</style>
