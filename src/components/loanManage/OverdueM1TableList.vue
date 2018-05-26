<template>
 <div class="OverdueM1TableList">
 	<div class="table-wrap">
 		<el-table
 		 	v-loading="loadingTable"
	 		stripe
		    :data="tableData"
		    border
		    style="width: 100%"
		    >
		    <el-table-column
		    	align='center'
		    	label="序号"
		        type="index"
		      	width="50">
		    </el-table-column>
		    <el-table-column
		    	:show-overflow-tooltip="true"
				align='center'
		      	prop="compName"
		      	label="门店">
		    </el-table-column>
		    <el-table-column
		    	:show-overflow-tooltip="true"
				align='center'
		      prop="deptName"
		      label="业务团队">
		    </el-table-column>
		    <el-table-column
		    	:show-overflow-tooltip="true"
				align='center'
		      prop="empName"
		      label="归属人"
		      width="120">
		    </el-table-column>
		    <el-table-column
		    	width='100'
		    	:show-overflow-tooltip="true"
				align='center'
		      prop="custName"
		      label="借款人姓名">
		    </el-table-column>
		    <el-table-column
		    	:show-overflow-tooltip="true"
				align='center'
		      prop="custMobile"
		      label="手机号">
		    </el-table-column>、
		    <el-table-column
		    	:show-overflow-tooltip="true"
				align='center'
		      prop="custIc"
		      label="身份证号">
		    </el-table-column>
		    <el-table-column
		    	v-if = 'voerdueStatus'
		    	:show-overflow-tooltip="true"
				align='center'
		      	prop="voerdueStatus"
		      	label="逾期状态">
		    </el-table-column>
		    <el-table-column
		    	:show-overflow-tooltip="true"
				align='center'
		      prop=""
		      label="催收机构">
		    </el-table-column>
		    <el-table-column
		    	:show-overflow-tooltip="true"
				align='center'
		      prop="cptName"
		      label="产品系列">
		    </el-table-column>
		    <el-table-column
		    	:show-overflow-tooltip="true"
				align='center'
		      prop="cpName"
		      label="产品名称">
		    </el-table-column>
		    <el-table-column
		    	:show-overflow-tooltip="true"
				align='center'
		      prop="provName"
		      label="省份">      		      
		    </el-table-column>
		    <el-table-column
		    	:show-overflow-tooltip="true"
				align='center'
		      prop="cityName"
		      label="城市">
		    </el-table-column>
		    <el-table-column
		    	width='110'
		    	:show-overflow-tooltip="true"
				align='center'
			    prop="contractMoney"
			    label="合同金额(元)">		      
		    </el-table-column>
		    <el-table-column
		    	:show-overflow-tooltip="true"
				align='center'
		      prop="loanTime"
		      label="放款日期">
		    </el-table-column>
		    <el-table-column
		    	:show-overflow-tooltip="true"
				align='center'
		      prop="expireTime"
		      label="到期日期">
		    </el-table-column>
		    <el-table-column
		    	width='100'
		    	:show-overflow-tooltip="true"
				align='center'
		      	prop="currentRepaymentTime"
		      	label="本期还款日">
		    </el-table-column>
		    <el-table-column
		    	:show-overflow-tooltip="true"
				align='center'
		      prop="overdueDay"
		      label="逾期天数">
		    </el-table-column>
		    <el-table-column
		    	fixed="right"
		    	:show-overflow-tooltip="true"
				align='center'
			    prop="address"
			    label="操作">
		      <template slot-scope="scope">
		        <el-button  type="text" size="small" @click='goFollow(scope.row)'>跟进</el-button>		        
		      </template>
		    </el-table-column>
		    <el-table-column
		    	fixed="right"
		    	:show-overflow-tooltip="true"
				align='center'
			    prop="address"
			    label="订单详情">
		      <template slot-scope="scope">
		        <el-button  type="text" size="small" @click='goOrderDetail(scope.row)'>查看</el-button>		        
		      </template>
		    </el-table-column>
	  </el-table>
 	</div> 	
 </div>
</template>

<script>
import api from "@/api/index"
//import Pagination from '@/components/common/Pagination'
//import DialogFollow from '@/components/loanManage/dialog/DialogFollow'
export default {
  	name: 'tableList',
  	props: {
	 	voerdueStatus: {
	 		type: Boolean,
	 		default: true
	 	},
	 	tableData: {
	 		type: Array,
	 		default: []
	 	},
	 	loadingTable: {
	 		type: Boolean,
	 		default: false
	 	}
	},
  	data() {
	  	return {

	  	}
  	},
  	created() {
	 	
	},
  	mounted() {

  	},
  	methods: {
  		goFollow(row){
  			this.$emit('goFollow',row,true)
  		},
  		goOrderDetail(row){
  			this.$emit('goOrderDetail',row)
  		}
  	},
//	components: {
//		Pagination,
//		DialogFollow
//	}
  
 }
</script>
<style lang="less">
	.M1List {		
		.table-wrap {
			padding-top: 20px;
			.el-table th {
				padding: 9px 0;
			} 
			.el-table td{
				padding: 3px 0;
			}
		}
		
	}
</style>