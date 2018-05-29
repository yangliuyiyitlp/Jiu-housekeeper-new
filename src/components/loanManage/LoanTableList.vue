<template>
  <div class="tableList">
      <el-table
        v-loading="loadingTable"
        stripe
        :data="tableData"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
      <el-table-column align='center' type="index"  width="60" label="序号" ></el-table-column>
      <el-table-column
        prop="id"
        v-if="0" >
      </el-table-column>
      <el-table-column
        align='center'
        :show-overflow-tooltip="true"
        prop="compName"
        label="门店"
      >
      </el-table-column>

      <el-table-column
        align='center'
        :show-overflow-tooltip="true"
        prop="deptName"
        label="业务团队">
      </el-table-column>
      <el-table-column
        align='center'
        :show-overflow-tooltip="true"
        prop="empName"
        label="归属人">
      </el-table-column>
        <el-table-column
          align='center'
          :show-overflow-tooltip="true"
          prop="custName"
          label="借款人姓名">
          <template  slot-scope="scope"><span :class="scope.row.monitoringStatus=='0'?'monitoringStatus':'monitoringNull'">{{scope.row.custName}}</span></template>
        </el-table-column>
      <el-table-column
        align='center'
        :show-overflow-tooltip="true"
        prop="custMobile"
        label="手机号">
      </el-table-column>
      <el-table-column
        align='center'
        :show-overflow-tooltip="true"
        prop="custIc"
        label="身份证号">
      </el-table-column>
        <el-table-column
          v-if="showDemoCom"
          align='center'
          :show-overflow-tooltip="true"
          prop="democom"
          label="催收机构">
        </el-table-column>
      <el-table-column
        align='center'
        :show-overflow-tooltip="true"
        prop="cptName"
        label="产品系列">
      </el-table-column>
      <el-table-column
        align='center'
        :show-overflow-tooltip="true"
        prop="cpName"
        label="产品名称">
      </el-table-column>
      <el-table-column
        align='center'
        :show-overflow-tooltip="true"
        prop="provName"
        label="省份">
      </el-table-column>
      <el-table-column
        align='center'
        :show-overflow-tooltip="true"
        prop="cityName"
        label="城市">
      </el-table-column>
      <el-table-column
        align='center'
        :show-overflow-tooltip="true"
        prop="contractMoney"
        label="合同金额（元）">
      </el-table-column>
      <el-table-column
        align='center'
        :show-overflow-tooltip="true"
        prop="loanTime"
        label="放款日期">
      </el-table-column>
      <el-table-column
        align='center'
        :show-overflow-tooltip="true"
        prop="expireTime"
        label="到期日期">
      </el-table-column>
      <el-table-column
        align='center'
        :show-overflow-tooltip="true"
        prop="currentRepaymentTime"
        label="本期还款日">
      </el-table-column>
      <el-table-column
        v-if="showLoanDay"
        align='center'
        :show-overflow-tooltip="true"
        prop="loanDay"
        label="放款天数">
      </el-table-column>
        <el-table-column
          v-if="showRepaymentDay "
          align='center'
          :show-overflow-tooltip="true"
          prop="repaymentDay "
          label="距还款日">
        </el-table-column>
        <el-table-column
          v-if="showOverdueDay"
          align='center'
          :show-overflow-tooltip="true"
          prop="overdueDay "
          label="逾期天数">
        </el-table-column>
      <el-table-column
        align='center'
        :show-overflow-tooltip="true"
        prop="date"
        label="操作">
        <template slot-scope="scope">
          <!--v-if="scope.row.newData == 1"-->
          <el-button
            class="modify"
            @click.native.prevent="forWard(scope.row)"
            type="text"
            size="small">
            跟进
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        align='center'
        :show-overflow-tooltip="true"
        prop="date"
        label="订单详细">
        <template slot-scope="scope">
          <!--v-if="scope.row.newData == 1"-->
          <el-button
            class="modify"
            @click.native.prevent="viewData(scope.row)"
            type="text"
            size="small">
            查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: 'loanTableList',
    props: {
      tableData:{
        type: Array,
        default: function () {
          return []
        }
      },
      loadingTable: {
        type: Boolean,
        default: false
      },
      showLoanDay: {//是否要显示列表的放款天数
        type: Boolean,
        default: true
      },
      showDemoCom: {//todo 是否要显示列表的催收结构
        type: Boolean,
        default: false
      },
      showOverdueDay: {//是否要显示列表的逾期天数
        type: Boolean,
        default: false
      },
      showRepaymentDay:{//是否要显示列表的距还款日
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        multipleSelection: []

      }
    },
    methods: {
      forWard(row){ //查看
        this.$emit('forWard',row)
      },
      viewData(row) {//跟进弹框
        this.$emit('viewData',row,true)
      },

      testFn(){
        this.$store.dispatch('LOAN_SELECT_TABLE', [999,666])
      },

      handleSelectionChange(val) {
        this.multipleSelection = val;
        this.$store.dispatch('LOAN_SELECT_TABLE', val)
        console.log(this.multipleSelection)
      }
    }

  }
</script>
<style scoped lang="less">
.monitoringStatus{
  color:red
}
.monitoringNull{
    color:#000;
  }
</style>
