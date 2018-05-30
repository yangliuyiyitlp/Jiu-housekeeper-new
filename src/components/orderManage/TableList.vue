<template>
 <div class="tableList">
 	<el-table
 		 v-loading="loadingTable"
 		stripe
	    :data="tableData"
	    border
	    style="width: 100%"
	    >
      <!--<el-table-column
      	v-if='showSelection'
      	align='center'
      type="selection"
      width="55">
    </el-table-column>-->
    <el-table-column
    	align='center'
    	 label="序号"
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
    	:show-overflow-tooltip="true"
		align='center'
      	prop="applyTime"
      	label="申请时间">
    </el-table-column>
    <el-table-column
    	v-if = 'tablePermisson.systemResidenceTime'
    	:show-overflow-tooltip="true"
		align='center'
      prop="systemResidenceTime"
      label="系统停留时间"
      width="120">
    </el-table-column>
    <!--<el-table-column
    	:show-overflow-tooltip="true"
		align='center'
      prop="riskLevel"
      label="风险等级">
    </el-table-column>-->
    <el-table-column
    	:show-overflow-tooltip="true"
		align='center'
      prop="provName"
      label="省份">
    </el-table-column>、
    <el-table-column
    	:show-overflow-tooltip="true"
		align='center'
      prop="cityName"
      label="城市">
    </el-table-column>
    <el-table-column
    	:show-overflow-tooltip="true"
		align='center'
      prop="compName"
      label="门店">
    </el-table-column>
    <!--<el-table-column
    	:show-overflow-tooltip="true"
		align='center'
      prop="pushType"
      label="注册类型">
    </el-table-column>-->
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
      label="归属人">
    </el-table-column>
    <!--<el-table-column
    	:show-overflow-tooltip="true"
		align='center'
      prop="name"
      label="状态">
       <template slot-scope="scope">
        <span>{{scope.row.custStatusCode == '1' ? '未实名':'已实名'}}</span>
      </template>
    </el-table-column>-->
    <el-table-column
    	:show-overflow-tooltip="true"
		align='center'
      prop="proTypeName"
      label="产品系列">
    </el-table-column>
    <el-table-column
    	:show-overflow-tooltip="true"
		align='center'
      prop="proName"
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
      label="身份证号"
      width="120">
    </el-table-column>
    <el-table-column
    	:show-overflow-tooltip="true"
		align='center'
      prop="custMobile"
      label="手机号码"
      width="120">
    </el-table-column>
    <el-table-column
    	v-if='tablePermisson.orderStatus'
    	:show-overflow-tooltip="true"
		align='center'
      prop="custIc"
      label="订单状态"
      width="120">
	    <template slot-scope="scope">
	    	<!--1申请中,2审批中,3还款中,4已结清,5拒绝,    (6线上筹 资中,7满标,8满标以放款,9流标,) 审批中 10退件 （拒绝）-->
	    	<span v-if='scope.row.orderStatus == 1 && (scope.row.hangStatus != 1 && scope.row.hangStatus != 2)'>申请中</span>
	    	<span
	    		@click="openDialogOrder(scope.row)"
	    		v-if='(scope.row.orderStatus == 1) && (scope.row.hangStatus == 1 || scope.row.hangStatus == 2)'>
	    		申请中<i style="color: red;">(挂)</i>
	    	</span>
	    	<span
	    		v-if='(scope.row.orderStatus == 2 || scope.row.orderStatus == 6 || scope.row.orderStatus == 7 || scope.row.orderStatus == 8 || scope.row.orderStatus == 9) && (scope.row.hangStatus != 1 && scope.row.hangStatus != 2)'
	    		>
	    		审批中
	    	</span>
	    	<span
	    		@click="openDialogOrder(scope.row)"
	    		v-if='(scope.row.orderStatus == 2 || scope.row.orderStatus == 6 || scope.row.orderStatus == 7 || scope.row.orderStatus == 8 || scope.row.orderStatus == 9) && (scope.row.hangStatus == 1 || scope.row.hangStatus == 2)'>
	    		审批中<i style="color: red;">(挂)</i>
	    	</span>

	    	<span v-if='scope.row.orderStatus == 3'>还款中</span>
	    	<span v-if='scope.row.orderStatus == 4'>已结清</span>
	    	<span
	    		v-if='scope.row.orderStatus == 5 || scope.row.orderStatus == 10'
	    		style="color: red;"
	    		@click="openDialogOrder(scope.row)">
	    		拒绝
	    	</span>
	    	<!--<span v-if='scope.row.orderStatus == 6'>线上筹资中</span>
	    	<span v-if='scope.row.orderStatus == 7'>满标</span>
	    	<span v-if='scope.row.orderStatus == 8'>满标以放款</span>
	    	<span v-if='scope.row.orderStatus == 9'>流标</span>-->
	    	<!--<span v-if='scope.row.orderStatus == 10'>退件</span>-->
	        <!--<el-button @click="openDialogOrder(scope.row)" type="text" size="small">挂起</el-button>-->
	    </template>

    </el-table-column>
    <el-table-column
    	v-if='tablePermisson.nodeName'
    	:show-overflow-tooltip="true"
		align='center'
      prop="nodeName"
      label="环节"
      width="120">
    </el-table-column>
    <el-table-column
    	v-if='tablePermisson.hangTime'
    	:show-overflow-tooltip="true"
		align='center'
      prop="hangTime"
      label="挂起时间"
      width="120">
    </el-table-column>
    <el-table-column
    	v-if='tablePermisson.endOrderTime'
    	:show-overflow-tooltip="true"
		align='center'
	      prop="finishTime"
	      label="结清时间"
	      width="120">
    </el-table-column>
    <el-table-column
    	v-if='tablePermisson.detailBtn'
    	width='120'
    	fixed="right"
    	:show-overflow-tooltip="true"
		align='center'
	    prop="address"
	    label="订单详情">
      <template slot-scope="scope">
      	<el-button  v-if='scope.row.orderStatus == 4' type="text" disabled>查看</el-button >
        <el-button
        	v-if='scope.row.orderStatus != 4'
        	@click="showOrderDetail(scope.row)" type="text" size="small">查看</el-button>
      </template>
    </el-table-column>
  </el-table>
	<el-dialog title="挂起原因" width='400px' center :visible.sync="dialogApply"  top='20%'>
	  <div class="" style='margin-top: -25px;'>
		  	<el-row>
		  		<el-row>
		  			<el-col :span="5" >订单编号：</el-col>
		  			<el-col :span="19" >{{hangUpObj.orderNum}}</el-col>
		  		</el-row>
				<el-row>
					<el-col :span="5" >挂起原因：</el-col>
					<el-col :span="19" >{{hangUpObj.hangReason}}</el-col>
				</el-row>
				<el-row>
					<el-col :span="5" >环节：</el-col>
					<el-col :span="19" >{{hangUpObj.nodeName}}</el-col>
				</el-row>
				<el-row>
					<el-col :span="5" >操作人：</el-col>
					<el-col :span="19" >{{hangUpObj.creator}} </el-col>
				</el-row>
			</el-row>
		</div>
	</el-dialog>
	<el-dialog title="拒单原因" width='400px' center :visible.sync="dialogRefused" top='20%'>
	  	<div class="" style='margin-top: -25px;'>
		  	<el-row>
		  		<el-row>
		  			<el-col :span="5" >订单编号：</el-col>
		  			<el-col :span="19" >{{objRefresed.orderId}}</el-col>
		  		</el-row>
				<el-row>
					<el-col :span="5" >拒单原因：</el-col>
					<el-col :span="19" >{{objRefresed.refusalReason}}</el-col>
				</el-row>
				<el-row>
					<el-col :span="5" >拒单时间：</el-col>
					<el-col :span="19" >{{objRefresed.createTime}}</el-col>
				</el-row>
				<el-row>
					<el-col :span="5" >操作人：</el-col>
					<el-col :span="19" >{{objRefresed.creator}} </el-col>
				</el-row>
			</el-row>
		</div>
	</el-dialog>
 </div>
</template>

<script>
	import api from "@/api/index"
//import DialogOrderList from '@/components/custManage/dialog/DialogOrderList'
//import DialogFollow from '@/components/custManage/dialog/DialogFollow'
export default {
  	name: 'tableList',
  	props: {
  		tablePermisson: {
  			type: Object,
  			default: function () {
  				return {
  					systemResidenceTime: true,//系统停留时间
		  			orderStatus: true, //订单状态
		  			nodeName: true, //环节
		  			hangTime: true, //挂起时间
		  			detailBtn: true, //订单详情的‘查看’按钮
		  			endOrderTime: false,//结清时间
  				}
  			}
  		},
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
  		showOrderNumber: {//是否要显示表格的“订单”按钮
  			type: Boolean,
  			default: true
  		},
  		showSelection: { ////是否要显示表格的“选中”
  			type: Boolean,
  			default: true
  		}
  	},
	data() {
	  	return {
	  		dialogApply: false,
	  		dialogRefused: false,
	  		visibleObj: {
	  			dialogTableVisible: false,
	  		},
	  		dialogFollow: {
	  			dialogFollowVisible: false,
	  		},
	  		multipleSelection: [],
	  		objRefresed: {
	  			orderId: '',
		  		subcategories: '',
		  		creator: ''
	  		},
	  		hangUpObj:{}

	  	}
	},
    methods: {
    	openDialogOrder(row) {
    		if(row.orderStatus == 5 || row.orderStatus == 10) {
      			this.dialogRefused = true
      			this.queryRefusalReasonFn(row.applyId)
    		}
    		//申请中的挂
    		let orApll = row.orderStatus == 1  && (scope.row.hangStatus == 1 || scope.row.hangStatus == 2)
    		//审批中的挂
    		let orApll_s = row.orderStatus == 2  && (scope.row.hangStatus == 1 || scope.row.hangStatus == 2)
    		if (orApll || orApll_s) {
    			this.dialogApply = true
    			this.hangupReasonFn(row.applyId)
    		}
//this.dialogApply = true
    		console.log(row)
    	},
    	hangupReasonFn(crmApplayId) {
    		let pararms = {
    			crmApplayId: crmApplayId
    		}
    		api.hangupReasonFn({crmApplayId}).then(res => {
				if(res.data.success) {
					console.log(res.data.data)
					this.hangUpObj = res.data.data
				} else {
					this.$notify({
			           title: '提示',
			           message: res.data.msg,
			           duration: 1500
			        });
				}
				console.log(res.data.data,6666)
			})
    	},
    	queryRefusalReasonFn(crmApplayId) {
    		let pararms = {
    			crmApplayId: crmApplayId
    		}
    		this.objRefresed = {}
    		api.queryRefusalReason({crmApplayId}).then(res => {
				if(res.data.success) {
					if (res.data.data) {
						this.objRefresed = res.data.data
					}
				} else {
					this.$notify({
			           title: '提示',
			           message: res.data.msg,
			           duration: 1500
			        });
				}
				console.log(res.data.data,6666)
			})
    	},
    	testFn(){
    		this.$store.dispatch('SET_SELECT_TABLE', [13123312,456])
    	},
    	showDialogTableVisible(row) {//订单弹框
    		if(row.orderNumber == 0){
    			return
    		}
//  		console.log(row.orderNumber,1311233212231)
			this.$emit('showDialogTableVisible',row,true)
    	},
    	showOrderDetail(row) {//订单详情
    		this.$emit('showOrderDetail',row,true)
    	},
//  	handleSelectionChange(val) {
//	        this.multipleSelection = val;
//	        this.$store.dispatch('SET_SELECT_TABLE', val)
//	        console.log(this.multipleSelection)
//	    }
    },
    watch: {

    },
	components: {
//		DialogOrderList,
//		DialogFollow
	}

 }
</script>
<style scoped lang="less">

</style>
