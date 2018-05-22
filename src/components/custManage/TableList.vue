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
      <el-table-column
      	v-if='showSelection'
      	align='center'
      type="selection"
      width="55">
    </el-table-column>
    <!--<el-table-column
    	 label="序号"
      type="index"
      width="50">
    </el-table-column>-->
    <el-table-column
    	:show-overflow-tooltip="true"
		align='center'
      	prop="custName"
      	label="姓名">
    </el-table-column>
    <el-table-column
    	:show-overflow-tooltip="true"
		align='center'
      prop="custMobile"
      label="注册手机号"
      width="120">
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
      prop="riskLevel"
      label="风险等级">
    </el-table-column>
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
      prop="pushType"
      label="注册类型">
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
      label="归属人">
    </el-table-column>
    <el-table-column
    	:show-overflow-tooltip="true"
		align='center'
      prop="name"
      label="状态">      
       <template slot-scope="scope">
        <span>{{scope.row.custStatusCode == '1' ? '未实名':'已实名'}}</span>
        <!--<el-button type="text" size="small">编辑</el-button>-->
      </template>
    </el-table-column>
    <el-table-column
    	:show-overflow-tooltip="true"
		align='center'
      prop="registrationTime"
      label="注册时间">
    </el-table-column>
    <el-table-column
    	v-if='showOrderNumber'
    	:show-overflow-tooltip="true"
		align='center'
	    prop="orderNumber"
	    label="订单数">
      <template slot-scope="scope">
        <el-button @click="showDialogTableVisible(scope.row)" type="text" size="small" v-if='scope.row.orderNumber != 0'>
        	{{scope.row.orderNumber}}
        </el-button>
        <span v-if='scope.row.orderNumber == 0'>{{scope.row.orderNumber}}</span>
        <!--<el-button @click="showDialogTableVisible(scope.row)" type="text" size="small">
        	{{scope.row.orderNumber}}
        </el-button>
        <span v-if='scope.row.orderNumber == 0' >{{scope.row.orderNumber}}</span>-->
      </template>
    </el-table-column>
    <el-table-column
    	width='120'
    	fixed="right"
    	:show-overflow-tooltip="true"
		align='center'
	    prop="address"
	    label="操作">
      <template slot-scope="scope">
        <el-button @click="showDialogFollow(scope.row)" type="text" size="small">跟进</el-button>
        <el-button type="text" size="small" @click="intoDetail(scope.row)">客户详情</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!--<button @click="testFn">派发</button>-->
<!--  <dialog-order-list :visibleObj='visibleObj'></dialog-order-list>-->
  <!--<dialog-follow :dialogFollow='dialogFollow'></dialog-follow>-->
 </div>
</template>

<script>
//import DialogOrderList from '@/components/custManage/dialog/DialogOrderList'
//import DialogFollow from '@/components/custManage/dialog/DialogFollow'
export default {
  	name: 'tableList',
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
	  		visibleObj: {
	  			dialogTableVisible: false,
	  		},
	  		dialogFollow: {
	  			dialogFollowVisible: false,
	  		},
	  		multipleSelection: []
	  		
	  	}
	},
    methods: {
      intoDetail(row){
//      this.$router.push({path:'/detail/custDetail',query:{
//        id:4565465
//      }})
        this.$emit('intoDetail',row)
      },
    	testFn(){
    		this.$store.dispatch('SET_SELECT_TABLE', [13123312,456])
    	},
    	showDialogTableVisible(row) {//订单弹框
//  		console.log(row.orderNumber,1311233212231)
			this.$emit('showDialogTableVisible',row,true)
    	},
    	showDialogFollow(row) {//跟进弹框	
    		this.$emit('showDialogFollow',row,true)
    	},
    	handleSelectionChange(val) {
	        this.multipleSelection = val;
	        this.$store.dispatch('SET_SELECT_TABLE', val)
	        console.log(this.multipleSelection)
	    }
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