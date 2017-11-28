<template>
  <div>
    <div class="right">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="红包提现明细列表" name="first" class="padding">
          <!--筛选条件-->
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="姓名:">
              <el-input v-model="formInline.user" placeholder="姓名"></el-input>
            </el-form-item>
            <el-form-item label="手机号:">
              <el-input v-model="formInline.phone" placeholder="手机号"></el-input>
            </el-form-item>

            <el-form-item label="提现状态:">
              <el-select v-model="formInline.status" placeholder="选择提现状态">
                <el-option label="待审核" value="1"></el-option>
                <el-option label="提现成功" value="2"></el-option>
                <el-option label="提现失败" value="3"></el-option>
                <el-option label="提现报废" value="4"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="转账单号:">
              <el-input v-model="formInline.number" placeholder="转账单号"></el-input>
            </el-form-item>

            <el-form-item label="红包金额:">
              <el-col :span="11">
                <el-input placeholder="最小值"></el-input>
              </el-col>
              <el-col class="line" :span="1">-</el-col>
              <el-col :span="11">
                <el-input placeholder="最大值"></el-input>
              </el-col>
            </el-form-item>

            <el-form-item label="支付宝姓名:">
              <el-input v-model="formInline.zfb_name" placeholder="支付宝姓名"></el-input>
            </el-form-item>

            <el-form-item label="支付宝账号:">
              <el-input v-model="formInline.zfb_number" placeholder="支付宝账号"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="search">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="exportData">导出</el-button>
            </el-form-item>
          </el-form>

          <!--表单-->
          <el-table
            ref="multipleTable"
            :data="tableData3"
            border
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="50">
            </el-table-column>

            <el-table-column
              prop="name"
              label="姓名"
              width="80">
            </el-table-column>

            <el-table-column
              prop="phone"
              label="手机号"
              width="130">
            </el-table-column>

            <el-table-column
              prop="money_amount"
              label="红包金额"
              width="95">
            </el-table-column>

            <el-table-column
              prop="zfb_name"
              label="支付宝姓名"
              width="120">
            </el-table-column>

            <el-table-column
              prop="zfb_account"
              label="支付宝账号"
              width="185">
            </el-table-column>

            <el-table-column
              prop="cash_status"
              label="提现状态"
              width="120">
            </el-table-column>

            <el-table-column
              prop="cash_number"
              label="转账单号"
              width="120">
            </el-table-column>

            <el-table-column
              prop="add_time"
              label="添加时间"
              width="120">
              <!--<template slot-scope="scope">{{ scope.row.date }}</template>-->
            </el-table-column>

            <el-table-column
              prop="des"
              label="描述"
              width="80">
            </el-table-column>

            <el-table-column
              prop="cash_operator"
              label="提现操作者"
              width="110">
            </el-table-column>

            <el-table-column
              prop="cash_time"
              label="提现时间"
              width="120">
              <!--<template slot-scope="scope">{{ scope.row.date }}</template>-->
            </el-table-column>

            <el-table-column
              prop="remarks"
              label="备注">
            </el-table-column>

          </el-table>
          <div style="margin-top: 20px">
            <el-button @click="toggleSelection([tableData3[1], tableData3[2]])">切换第二、第三行的选中状态</el-button>
            <el-button @click="toggleSelection()">取消选择</el-button>
          </div>
          <!--分页组件-->
          <paginations></paginations>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>

</template>

<script>
  export default {
    data () {
      return {
        activeName: 'first',
        formInline: {
          user: '',
          phone: '',
          status: '',
          number: '',
          zfb_name: '',
          zfb_number: ''
        },
        tableData3: [{
          name: '周凤平',
          phone: '13548781122',
          money_amount: '1000',
          zfb_name: '周凤平',
          zfb_account: '6215993640000073445',
          cash_status: '提现状态',
          cash_number: '转账单号',
          add_time: '2017-5-5',
          des: '提现',
          cash_operator: '提现操作者',
          cash_time: '2017-5-7',
          remarks: '你有什么想说的'
        }, {
          name: '周凤平',
          phone: '13548781122',
          money_amount: '1000',
          zfb_name: '周凤平',
          zfb_account: '6215993640000073445',
          cash_status: '提现状态',
          cash_number: '转账单号',
          add_time: '2017-5-5',
          des: '提现',
          cash_operator: '提现操作者',
          cash_time: '2017-5-7',
          remarks: '你有什么想说的'
        }, {
          name: '周凤平',
          phone: '13548781122',
          money_amount: '1000',
          zfb_name: '周凤平',
          zfb_account: '6215993640000073445',
          cash_status: '提现状态',
          cash_number: '转账单号',
          add_time: '2017-5-5',
          des: '提现',
          cash_operator: '提现操作者',
          cash_time: '2017-5-7',
          remarks: '你有什么想说的'
        }, {
          name: '周凤平',
          phone: '13548781122',
          money_amount: '1000',
          zfb_name: '周凤平',
          zfb_account: '6215993640000073445',
          cash_status: '提现状态',
          cash_number: '转账单号',
          add_time: '2017-5-5',
          des: '提现',
          cash_operator: '提现操作者',
          cash_time: '2017-5-7',
          remarks: '你有什么想说的'
        }, {
          name: '周凤平',
          phone: '13548781122',
          money_amount: '1000',
          zfb_name: '周凤平',
          zfb_account: '6215993640000073445',
          cash_status: '提现状态',
          cash_number: '转账单号',
          add_time: '2017-5-5',
          des: '提现',
          cash_operator: '提现操作者',
          cash_time: '2017-5-7',
          remarks: '你有什么想说的'
        }, {
          name: '周凤平',
          phone: '13548781122',
          money_amount: '1000',
          zfb_name: '周凤平',
          zfb_account: '6215993640000073445',
          cash_status: '提现状态',
          cash_number: '转账单号',
          add_time: '2017-5-5',
          des: '提现',
          cash_operator: '提现操作者',
          cash_time: '2017-5-7',
          remarks: '你有什么想说的'
        }, {
          name: '周凤平',
          phone: '13548781122',
          money_amount: '1000',
          zfb_name: '周凤平',
          zfb_account: '6215993640000073445',
          cash_status: '提现状态',
          cash_number: '转账单号',
          add_time: '2017-5-5',
          des: '提现',
          cash_operator: '提现操作者',
          cash_time: '2017-5-7',
          remarks: '你有什么想说的'
        }],
        multipleSelection: []
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
      toggleSelection (rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row)
          })
        } else {
          this.$refs.multipleTable.clearSelection()
        }
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      }
    }
  }
</script>
<style scoped>
  .padding{
    padding-left:10px;
  }
</style>
