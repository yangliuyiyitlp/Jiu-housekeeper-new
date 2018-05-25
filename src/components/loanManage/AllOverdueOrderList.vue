<template>
 <div class="overdueList">
 	<TitCommon :title='title'></TitCommon>
 	<div class="custListWrap">
 		<search  
 			ref='search'
 			:data = 'zTreeData'  			
 			@searchFn='searchFn' 
 			:permission ='permission'> 			
 		</search>
 	</div>
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
	<!--跟进弹框-->
 	<dialog-follow :dialogFollow='dialogFollow' :rowFollowId = 'rowFollowId' ref="childDialogFollow"> 		
 	</dialog-follow>
 </div>
</template>

<script>
import api from "@/api/index"
import TitCommon from '@/components/common/TitCommon'
import Search from '@/components/loanManage/Search'
import Pagination from '@/components/common/Pagination'
import DialogFollow from '@/components/loanManage/dialog/DialogFollow'
export default {
  	name: 'allOverdue',
  	computed: {
	 	permission () {
	 		return {
	 			showAllPararms: false,//1'正常',0'检测异常'
				showOrderState: true, //是否要展示高级搜索的‘逾期状态’的条件
				typeNameIndex: 1,//1逾期天数,2放款天数,3距还款日
	 		}
	 	}
	},
  	data() {
	  	return {
	  		title: '全部逾期订单',
	  		zTreeData: [],
//	        checkListName: ['正常','检测异常'],
	        currentPage:1,
	  		total: 0,
	  		pageNo: 1,
	        pageSize: 10,
	        serachPararms:{},
	        loadingTable:false,
	        tableData: [],
	        currentPage:1,
	  		total: 0,
	  		pageNo: 1,
	        pageSize: 10,
	        dialogFollow: {
	  			dialogFollowVisible: false,	  			
	  		},
	  		rowFollowId: null
	  	}
  	},
  	created() {
	 	if (JSON.parse(localStorage.getItem('myPageSize'))) { 	
	 		this.pageSize = JSON.parse(localStorage.getItem('myPageSize')).W_OverdueList?JSON.parse(localStorage.getItem('myPageSize')).W_OverdueList:10
	 		console.log(JSON.parse(localStorage.getItem('myPageSize')).W_OverdueList)
	 	} else {
	 		let obj = {}
	 		localStorage.setItem('myPageSize',JSON.stringify(obj))
	 	}
	},
  	mounted() {
  		this.getDepartmentZtreeFn()
  		this.queryOverdueOrdersFn()
  	},
  	methods: {
  		queryOverdueOrdersFn() {
  			this.loadingTable = true
  			let s_time,e_time
	  		if (this.serachPararms.applyDate) {
	  			s_time = this.serachPararms.applyDate[0]
	  			e_time = this.serachPararms.applyDate[1]
	  		} else {
	  			s_time = ''
	  			e_time = ''
	  		}
  			const pararms = {
	  			pageNo: this.pageNo,
	  			pageSize: this.pageSize,
				queryParam: this.serachPararms.content,
				proTypeId: this.serachPararms.productList,//产品系列
				proId: this.serachPararms.productName,//产品名称
				department: this.serachPararms.partName,//分公司|部门查询参数
				empQueryParam: this.serachPararms.people,//业务员姓名/工号查询参数
				provId: this.serachPararms.applyProvince,//省份
				cityId: this.serachPararms.applyCity,//城市
				oneSelf: this.serachPararms.onlyCheck,
				loanTimeBegin: s_time,//放款时间开始
				loanTimeEnd: e_time,//放款时间结束
				overdueDayBegin: this.serachPararms.overDateStart,//逾期天数开始 
				overdueDayEnd: this.serachPararms.overDateEnd,//逾期天数结束
				overdueStatusBegin:'', //逾期状态开始
				overdueStatusEnd:'', //逾期状态结束
	  		}
	  		console.log(pararms)
  			api.queryOverdueOrders(pararms).then(res => {
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
  			})
		},  		
  		searchFn(data) {
			this.serachPararms = Object.assign(this.serachPararms,data)
			if(!this.serachPararms.checkListParams){
				this.serachPararms.checkListParams = ''
			}
			this.queryOverdueOrdersFn()
	
			console.log(this.serachPararms,'-=-=-=--')
			console.log(data)
	
	  	},
	  	handleSizeChange(val) {
			this.currentPage = 1
			let myPageSize = JSON.parse(localStorage.getItem('myPageSize'))
	  		myPageSize.W_OverdueList = val
		 	localStorage.setItem('myPageSize',JSON.stringify(myPageSize))
			this.pageNo = 1
			this.pageSize = val  
			this.queryOverdueOrdersFn()
	//		console.log(val,777777777777)
		},
		handleCurrentChange(val) {
			this.pageNo = val	
			this.queryOverdueOrdersFn()
	//		console.log(val,88888888)
		},
		goFollow(row) {
			this.dialogFollow.dialogFollowVisible = true
  			console.log(row,'/api/upload/upload')
	  		this.rowFollowId = row.crmCustInfoId
	  		this.$nextTick(function () {
	   			this.$refs.childDialogFollow.queryFollowList() // 方法2 父组件调用子组件方法
	  		})

		},
		goOrderDetail(row) {//查看			
			var routeData = this.$router.resolve({
	        	path: '/detail/orderDetail',
	        	query: {
	        		crmApplayId: row.crmApplyId
	        	}
	      	});
	      	window.open(routeData.href);
	//		this.dialogFollow.dialogFollowVisible = orShow			
		},
	  	getDepartmentZtreeFn() {
			api.getDepartmentZtree({groupId:''}).then(res => {
				if(res.data.status == 1) {							
					this.zTreeData = this.toTree(res.data.ztree)
				} else {
					this.$notify({
			           title: '提示',
			           message: res.data.msg,
			           duration: 1500
			        });
				}
	//			console.log(this.zTreeData,123)
			})
		},
		toTree(ary, data) {
			var _this = this
			var data = data ? data : (function(ary) {
				var tempAry = [];
				var idList = [];
				ary.forEach(function(item) {
					idList.push(item.id)
				});					
				for(var i = 0, len = ary.length; i < len; i++) {
					if(ary[i].pId == undefined || (ary[i].pId != undefined && _this.debFn(ary[i].pId, idList))) {
						var obj = {
							title: ary[i].name,
							id: ary[i].id
						};
						tempAry.push(obj);
					}
				}
				return tempAry;
			}(ary));
			var temp = 0;
			if(data.constructor == Array) {
				for(var i = 0, len = data.length; i < len; i++) {
					for(var j = 0, lenA = ary.length; j < lenA; j++) {
						if(ary[j].pId == data[i].id) {
							var obj = {
								title: ary[j].name,
								id: ary[j].id
							};
							data[i].children = data[i].children || [];
							data[i].children.push(obj);
							temp++;
						}
					}
				}
			}
			if(temp > 0) {
				if(data.constructor == Array) {
					for(var n = 0, lenB = data.length; n < lenB; n++) {
						data[n].children = this.toTree(ary, data[n].children ? data[n].children : []);
						if(data[n].children.length == 0) {
							delete data[n].children;
						}
	//							delete data[n].id;
					}
				}
			} else {
				for(var n = 0, lenB = data.length; n < lenB; n++) {
	//						delete data[n].id;
				}
			}
			return data;
	
		},
		debFn(id, idList) {
			var flag = true;
			for(var ida in idList) {
				if(id == idList[ida]) {
					flag = false;
				}
			}
			return flag;
		},
  	},
  	components: {
  		TitCommon,
  		Search,
  		Pagination,
  		DialogFollow
  	}
  
 }
</script>
<style lang="less">
	.overdueList {		
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