<template>
 <div class="allCustList">
 	<TitCommon :title='title'></TitCommon>
 	<div class="custListWrap">
 		<search  
 			:treeData = 'treeData'
 			:data = 'zTreeData' 		
 			@CustDistributionFn='CustDistributionFn' 
 			@searchFn='searchFn' 
 			:permission ='permission'> 			
 		</search>
 		<div class="table-wrap">
 			<table-list 
 				:loadingTable = 'loadingTable'
 				:tableData='tableData' 
 				@intoDetail = 'intoDetail'
 				@showDialogTableVisible = 'showDialogTableVisible'
 				@showDialogFollow = 'showDialogFollow'
 				> 				
 			</table-list> 			
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
 		<div>
 			<!--订单弹框-->
 			<dialog-order-list ref='dialogOrderList' :visibleObj='visibleObj'></dialog-order-list>
 			<!--跟进弹框-->
 			<dialog-follow :dialogFollow='dialogFollow' :rowFollowId = 'rowFollowId' ref="childDialogFollow"></dialog-follow>
 		</div>
 	</div>
 </div>
</template>

<script>
import api from "@/api/index"	
import TitCommon from '@/components/common/TitCommon'
import Pagination from '@/components/common/Pagination'
import Search from '@/components/custManage/Search'
import TableList from '@/components/custManage/TableList'
import DialogOrderList from '@/components/custManage/dialog/DialogOrderList'
import DialogFollow from '@/components/custManage/dialog/DialogFollow'
export default {
  name: 'allList',
  data() {
  	return {
  		title: '全部客户',
  		currentPage:1,
  		total: 0,
  		pageNo: 1,
        pageSize: 10,
        serachPararms:{checkListParams:[]},
        rowFollowId: null,
        visibleObj: {
  			dialogTableVisible: false,
  		},
  		dialogFollow: {
  			dialogFollowVisible: false,
  			
  		},
        tableData: [],
        zTreeData: [],
        treeData: [],
        loadingTable: false,
        multipleSelectionIdList: '',
        
  	}
  },
beforeCreate(){
//	let pararms = {
//		menuId:this.$route.query.menuId
//	}
//	this.$store.dispatch('SET_POWER_BTN_ARR', pararms).then(res=>{	
//		//assigningCustomers:分配客户权限, "frozenCustomer：冻结按钮权限
//		let flag = res.indexOf('assigningCustomers')
//		if (flag > -1) {
//			this.permission.showDistribution = true
//		} else {
//			this.permission.showDistribution = false
//		}
//		console.log(this.permission,'=====4544545=========')
//		console.log(flag,'=====4544545=========')
//	})

},
 created() {
 	if (JSON.parse(localStorage.getItem('myPageSize'))) { 	
 		this.pageSize = JSON.parse(localStorage.getItem('myPageSize')).W_AllUserList?JSON.parse(localStorage.getItem('myPageSize')).W_AllUserList:10
// 		console.log(JSON.parse(localStorage.getItem('myPageSize')).W_AllUserList)
 	} else {
 		let obj = {}
 		localStorage.setItem('myPageSize',JSON.stringify(obj))
 	}
// 	this.permissionBtnPowerFn(this.$route.query.menuId)
	
 },
 computed: {
 	permission () {
 		return {
 			showAllPararms: true,//是否要展示'全部，未实名，已实名，已成交'条件
//			showDistribution: false,//是否要展示‘客户分配’按钮
			showRealName: true,
			showRegType: true, //是否要展示高级搜索的‘注册类型’的条件			
 		}
 	}
 },
 mounted() {
 	this.getDepartmentZtreeFn()
 	this.queryCustInfoData()
 	
 },
  methods: {  
  	
  	queryCustInfoData() {
  		this.loadingTable = true
  		
  		const pararms = {
  			pageNo: this.pageNo,
  			pageSize: this.pageSize,
			queryParam: this.serachPararms.content,
			custStatus: this.serachPararms.checkListParams,//客户状态:1未实名,2已实名,3已成交[1,2]
//			custStatus: [1,2],//客户状态:1未实名,2已实名,3已成交[1,2]
			pushType:  this.serachPararms.regType, //注册类型:1 自由注册 2 业务员推广 3 邀请好友 
			oneSelf: this.serachPararms.onlyCheck,
			department: this.serachPararms.partName,
			empQueryParam: this.serachPararms.people,
			provId: this.serachPararms.applyProvince,
			cityId: this.serachPararms.applyCity
  		}
//		console.log(pararms)
  		api.queryCustInfoData(pararms).then(res => {
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
  	showDialogTableVisible(row,orShow) {
  		this.visibleObj.dialogTableVisible = orShow	  	
		this.$nextTick(function () {
   			this.$refs.dialogOrderList.queryOrderList(row.crmCustInfoId)
  		})
		
  	},
  	showDialogFollow(row,orShow) {  		
  		this.dialogFollow.dialogFollowVisible = orShow
  		console.log(row,orShow,'/api/upload/upload')
  		this.rowFollowId = row.crmCustInfoId
  		this.$nextTick(function () {
   			this.$refs.childDialogFollow.queryFollowList() // 方法2 父组件调用子组件方法

  		})
  	},

  	CustDistributionFn(data) {//分配客户
  	},
  	searchFn(data) {
  		this.serachPararms = Object.assign(this.serachPararms,data)
//		let arrCheckList = this.serachPararms.checkList
		if(!this.serachPararms.checkListParams){
			this.serachPararms.checkListParams = ''
		}
		this.queryCustInfoData()

//		console.log(this.serachPararms.checkListParams,'-=-=-=--')
//		console.log(this.serachPararms)

  	},
  	intoDetail(row) {
		var routeData = this.$router.resolve({
        	path: '/detail/custDetail',
        	query: {
        		bgCustomerId: row.bgCustomerId,
        		bgCustInfoId: row.bgCustInfoId,
        		crmCustInfoId: row.crmCustInfoId
        	}
      	});
//    	console.log(routeData.route)
      	window.open(routeData.href);
//		console.log(row)
  	},
  	handleSizeChange(val) {
		this.currentPage = 1
		let myPageSize = JSON.parse(localStorage.getItem('myPageSize'))
  		myPageSize.W_AllUserList = val
	 	localStorage.setItem('myPageSize',JSON.stringify(myPageSize))
		this.pageNo = 1
		this.pageSize = val  
		this.queryCustInfoData()
//		console.log(val,777777777777)
	},
	handleCurrentChange(val) {
		this.pageNo = val	
		this.queryCustInfoData()
//		console.log(val,88888888)
	},
	getDepartmentZtreeFn() {
		api.getDepartmentZtree({groupId:''}).then(res => {
			if(res.data.status == 1) {		
				this.treeData = res.data.ztree
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
//toTree(ary, data) {
//		var _this = this
//		var data = data ? data : (function(ary) {
//			var tempAry = [];
//			var idList = [];
//			ary.forEach(function(item) {
//				idList.push(item.id)
//			});					
//			for(var i = 0, len = ary.length; i < len; i++) {
//				if(ary[i].pId == undefined || (ary[i].pId != undefined && _this.debFn(ary[i].pId, idList))) {
//					var obj = {
//						name: ary[i].name,
//						id: ary[i].id
//					};
//					tempAry.push(obj);
//				}
//			}
//			return tempAry;
//		}(ary));
//		var temp = 0;
//		if(data.constructor == Array) {
//			for(var i = 0, len = data.length; i < len; i++) {
//				for(var j = 0, lenA = ary.length; j < lenA; j++) {
//					if(ary[j].pId == data[i].id) {
//						var obj = {
//							name: ary[j].name,
//							id: ary[j].id
//						};
//						data[i].child = data[i].child || [];
//						data[i].child.push(obj);
//						temp++;
//					}
//				}
//			}
//		}
//		if(temp > 0) {
//			if(data.constructor == Array) {
//				for(var n = 0, lenB = data.length; n < lenB; n++) {
//					data[n].child = this.toTree(ary, data[n].child ? data[n].child : []);
//					if(data[n].child.length == 0) {
//						delete data[n].child;
//					}
////							delete data[n].id;
//				}
//			}
//		} else {
//			for(var n = 0, lenB = data.length; n < lenB; n++) {
////						delete data[n].id;
//			}
//		}
//		return data;
//
//	},
//	debFn(id, idList) {
//		var flag = true;
//		for(var ida in idList) {
//			if(id == idList[ida]) {
//				flag = false;
//			}
//		}
//		return flag;
//	},
	
  },
  components: {
  	TitCommon,
  	Search,
  	TableList,
  	Pagination,
  	DialogOrderList,
  	DialogFollow,
  	DialogFollow
  }
  
 }
</script>
<style lang="less">
	.allCustList {		
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
