<template>
	<div class="control-wrap">
		<TitCommon :title='title'></TitCommon>
		<div class="borBot1px padTopBot20">			
			<div >
				<el-form :inline="true" class="demo-form-inline">
				    <el-form-item >				  					
				    	<el-input @clear = 'clearFn' style="width:320px" v-model="queryPararms" placeholder='请输入姓名、手机号或身份证号码精确查询' clearable></el-input>				    	
				    </el-form-item>
				    <el-form-item>
				    	<el-button type="primary" icon="el-icon-search" @click='searchFn'>查询</el-button>
				    </el-form-item>
			    </el-form>
		  	</div>
		</div>
		<div class="padTop20 table-wrap">
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
			      	prop="applicationTime"
			      	label="申请时间">
			    </el-table-column>
			    <el-table-column
			    	width='120px'
			    	:show-overflow-tooltip="true"
					align='center'
			      	prop=""
			      	label="系统停留时间">
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
			      	prop="custName"
			      	label="客户姓名">
			    </el-table-column>
			    <el-table-column
			    	:show-overflow-tooltip="true"
					align='center'
			      	prop="custIc"
			      	label="身份证号">
			    </el-table-column>
			    <el-table-column
			    	:show-overflow-tooltip="true"
					align='center'
			      	prop="custMobile"
			      	label="手机号">
			    </el-table-column>			    
			    <el-table-column
			    	:show-overflow-tooltip="true"
					align='center'
			      	prop="orderStatus"
			      	label="订单状态">
			    </el-table-column>			    			  
			    <el-table-column
			    	:show-overflow-tooltip="true"
					align='center'
				    prop="segment"
				    label="环节">		      
			    </el-table-column>
			    <el-table-column
			    	fixed="right"
			    	:show-overflow-tooltip="true"
					align='center'
				    prop=""
				    label="订单详情">
			      <template slot-scope="scope">
			        <el-button  type="text" size="small" @click='goOrderDetail(scope.row)'>查看</el-button>		        
			      </template>
			    </el-table-column>			    
			    <el-table-column
			    	fixed="right"
			    	:show-overflow-tooltip="true"
					align='center'
				    prop=""
				    label="操作">
			      <template slot-scope="scope">
			        <el-button  type="text" size="small" @click='reviveFn(scope.row)'>复活</el-button>		        
			      </template>
			    </el-table-column>
			    
		  </el-table>
		</div>
		<div class="pad20 alignCen">
			<pagination 				
				:currentPage = 'currentPage'
				:total = 'total'
				:myPageSizes = 'pageSize'
				@handleSizeChange = 'handleSizeChange'
				@handleCurrentChange = 'handleCurrentChange'
				> 				
			</pagination>
		</div>
	</div>
</template>
<script>	
import api from "@/api/index"
import TitCommon from '@/components/common/TitCommon'
import Pagination from '@/components/common/Pagination'
export default {
	data() {
		return {
			title: '订单管理',
			queryPararms: '',
			tableData: [],
			loadingTable: false,
			pageNo: 1,
			pageSize: 10,
			total: 0,
			currentPage: 1
		}
	},
	created() {
	 	if (JSON.parse(localStorage.getItem('myPageSize'))) { 	
	 		this.pageSize = JSON.parse(localStorage.getItem('myPageSize')).W_ControlOrder?JSON.parse(localStorage.getItem('myPageSize')).W_ControlOrder:10
	 		console.log(JSON.parse(localStorage.getItem('myPageSize')).W_ControlOrder)
	 	} else {
	 		let obj = {}
	 		localStorage.setItem('myPageSize',JSON.stringify(obj))
	 	}
	},
	methods: {
		clearFn() {
			console.log(1213)
		},
		goOrderDetail() {
			
		},
		reviveFn() {
			
		},
		searchFn() {			
			this.queryAllControlOrderFn()
		},
		queryAllControlOrderFn() {
			this.loadingTable = true
			let pararms = {
				queryParam: this.queryPararms,
				pageNo: this.pageNo,
				pageSize: this.pageSize
			}
			api.queryAllControlOrder(pararms).then(res => {
				this.loadingTable = false  				
  				if(res.data.success) {
					this.total = res.data.total
					this.tableData = res.data.data
				} else {
					this.$notify({
			           title: '提示',
			           message: res.data.msg,
			           duration: 1500
			        });
				}
				console.log(res)
			})
		},
		handleSizeChange(val) {
			this.currentPage = 1
			let myPageSize = JSON.parse(localStorage.getItem('myPageSize'))
	  		myPageSize.W_ControlOrder = val
		 	localStorage.setItem('myPageSize',JSON.stringify(myPageSize))
			this.pageNo = 1
			this.pageSize = val  
			this.queryAllControlOrderFn()
	//		console.log(val,777777777777)
		},
		handleCurrentChange(val) {
			this.pageNo = val	
			this.queryAllControlOrderFn()
	//		console.log(val,88888888)
		},
	},
	watch: {
//		queryPararms(val) {
//			if (!val) {
//				this.tableData = []
//			}
//		}
	},
	components: {
  		TitCommon,
//		Search,
		Pagination,
  	}
}
</script>
<style lang="less">
	.control-wrap {
		.padTopBot20 {
			padding: 20px 0 0;
		}
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