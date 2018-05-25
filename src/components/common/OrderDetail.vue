<template>
<div>
	<div class="top"><img src="../../assets/images/logo.png"></div>
	<div class="detail">
		<div class="sheet">
			<p>
			 	订单编号：<span>{{orderBaseInfo.orderNumber}}</span>
			 	姓名：<span>{{orderBaseInfo.empName}}</span> 
			 	申请时间：<span>{{orderBaseInfo.createTime}}</span>
			 	申请城市：<span>{{orderBaseInfo.provId  }}{{orderBaseInfo.cityId }}</span> 
			 	状态：<span>{{orderBaseInfo.status }}</span>   
			 	当前环节：<span>{{orderBaseInfo.nodeName }}</span>
			 	<span class="change-permission">    			
					<el-popover
						trigger="click"
					  placement="bottom"
					  width="160"
					  v-model="visiblePer">
					  <div style="text-align: center;font-size: 16px;">
					    <el-button size="mini" @click='visiblePerFn' type="text"  style="font-size: 15px">变更订单归属业务员</el-button>					    
					  </div>
					  <i class="" ></i>
					  <i class="changePerIcon" slot="reference"></i>
					</el-popover>
    		</span>
			</p>
		</div>
		<div class="params">
			<p>意向借款金额：<span>{{orderBaseInfo.expectMomey }}元</span></p>
			<p>意向借款期限：<span>{{orderBaseInfo.expectDuetime }}</span></p>
			<p>产品系列：<span>{{orderBaseInfo.cptName}}</span></p>
			<div v-if="!apply_state">
				<p>产品名称：<span>{{orderBaseInfo.cpName }}</span></p>
				<p>产品期数：<span>{{orderBaseInfo.periods }}期</span></p>
				<p>合同金额：<span>{{orderBaseInfo.contractMoney }}元</span></p>
				<p>产品利率：<span>{{orderBaseInfo.rate }}/年</span></p>
				<p>还款方式：<span>{{orderBaseInfo.payment }}</span></p>
				<p>授信范围：<span>{{orderBaseInfo.expectDuetime }}</span></p>
			</div>
		</div>
		<div class="steps">
			<el-steps :active="1" align-center  finish-status="success">
			  <el-step title="身份证上传" description="2018-03-02 18:00:00"></el-step>
			  <el-step title="肖像认证" description="2018-03-02 18:00:00"></el-step>
			  <el-step title="手持身份证" description="2018-03-02 18:00:00"></el-step>
			  <el-step title="完善信息(申请城市)" description="2018-03-02 18:00:00"></el-step>
			  <el-step title="工作信息" description="2018-03-02 18:00:00"></el-step>
			  <el-step title="联系人信息" description="2018-03-02 18:00:00"></el-step>
			  <el-step title="手机认证" description="2018-03-02 18:00:00"></el-step>
			  <el-step title="基本信息" description="2018-03-02 18:00:00"></el-step>
			  <el-step title="产品选择/材料授权" description="2018-03-02 18:00:00"></el-step>
			  <el-step title="提交成功" description="2018-03-02 18:00:00"></el-step>
			</el-steps>
		</div>
		<el-tabs type="border-card" style="margin-top:35px" @tab-click="tabClick" v-model="activeName">
		  <el-tab-pane label="审批记录"  name="1" v-if="status==3">
		  		<el-table
			      :data="examData"
			      border
			      style="width: 100%">
			      <el-table-column align='center' type="index"  width="160" label="序号" :index="indexMethod">
			      </el-table-column>
			      <el-table-column
			      	align='center'
			        :show-overflow-tooltip="true"
			        prop="date"
			        label="环节">
			      </el-table-column>
			      <el-table-column
			      	align='center'
			        :show-overflow-tooltip="true"
			        prop="name"
			        label="操作时间">
			      </el-table-column>
			      <el-table-column
			      	align='center'
			        :show-overflow-tooltip="true"
			        prop="time"
			        label="进入环节时间">
			      </el-table-column>
			      <el-table-column
			      	align='center'
			        :show-overflow-tooltip="true"
			        prop="city"
			        label="停留时长">
			      </el-table-column>
			      <el-table-column
			      	align='center'
			        :show-overflow-tooltip="true"
			        prop="city"
			        label="结果">
			      </el-table-column>
			      <el-table-column
			      	align='center'
			        :show-overflow-tooltip="true"
			        prop="city"
			        label="操作人">
			      </el-table-column>
			    </el-table>
			    <pagination 				
					:currentPage = 'currentPage'
					:total = 'total'
					@handleSizeChange = 'handleSizeChange'
					@handleCurrentChange = 'handleCurrentChange'
	 				> 				
	 			</pagination>
		  </el-tab-pane>
		  <el-tab-pane label="还款计划"  name="2" v-if="status==3">
		        <p class="des">
		        	当前应还总金额：<span>2278元</span> 
		        	当前应还本息：<span>2278元</span> 
		        	当前应还罚息：<span>0元</span> 
		        	提前结清总金额：<span>12342元</span>
	        	</p>
		  		<el-table
			      :data="RepaymentPlan"
			      border
			      style="width: 100%">
			      <el-table-column
			      	align='center'
			        :show-overflow-tooltip="true"
			        prop="date"
			        label="期数">
			      </el-table-column>
			      <el-table-column
			      	align='center'
			        :show-overflow-tooltip="true"
			        prop="name"
			        label="应还时间">
			      </el-table-column>
			      <el-table-column
			      	align='center'
			        :show-overflow-tooltip="true"
			        prop="time"
			        label="应还总金额">
			      </el-table-column>
			      <el-table-column
			      	align='center'
			        :show-overflow-tooltip="true"
			        prop="city"
			        label="还款本金">
			      </el-table-column>
			      <el-table-column
			      	align='center'
			        :show-overflow-tooltip="true"
			        prop="city"
			        label="还款利息">
			      </el-table-column>
			      <el-table-column
			      	align='center'
			        :show-overflow-tooltip="true"
			        prop="city"
			        label="分期服务费">
			      </el-table-column>
			      <el-table-column
			      	align='center'
			        :show-overflow-tooltip="true"
			        prop="city"
			        label="逾期费用">
			      </el-table-column>
			      <el-table-column
			      	align='center'
			        :show-overflow-tooltip="true"
			        prop="city"
			        label="状态">
			      </el-table-column>
			    </el-table>
			    <pagination 				
					:currentPage = 'currentPage2'
					:total = 'total2'
					@handleSizeChange = 'handleSizeChange2'
					@handleCurrentChange = 'handleCurrentChange2'
	 				> 				
	 			</pagination>
		  </el-tab-pane>
		  <el-tab-pane label="还款记录" name="3" v-if="status==3">
		  		 <p class="des">
		        	当前应还总金额：<span>2278元</span> 
		        	当前应还本息：<span>2278元</span> 
		        	当前应还罚息：<span>0元</span> 
		        	提前结清总金额：<span>12342元</span>
	        	</p>
		  		<el-table
			      :data="PaymentHistory"
			      border
			      style="width: 100%">
			      <el-table-column align='center' type="index"  width="160" label="序号" >
			      </el-table-column>
			      <el-table-column
			      	align='center'
			        :show-overflow-tooltip="true"
			        prop="date"
			        label="还款时间">
			      </el-table-column>
			      <el-table-column
			      	align='center'
			        :show-overflow-tooltip="true"
			        prop="name"
			        label="还款金额(元)">
			      </el-table-column>
			      <el-table-column
			      	align='center'
			        :show-overflow-tooltip="true"
			        prop="time"
			        label="还款方式">
			      </el-table-column>
			    </el-table>
			    <pagination 				
					:currentPage = 'currentPage3'
					:total = 'total3'
					@handleSizeChange = 'handleSizeChange3'
					@handleCurrentChange = 'handleCurrentChange3'
	 				> 				
	 			</pagination>
		  </el-tab-pane>
		  <el-tab-pane label="基本信息" name="4" class="tabs">
		  	<h3>基本信息</h3>
		  	<table>
		  		<tr>
		  			<td>性别</td>
		  			<td>{{userBaseInfo.icSexUdate}}</td>
		  			<td>发证机关</td>
		  			<td>{{userBaseInfo.icOrganizationUpdata}}</td>
		  		</tr>
		  		<tr>
		  			<td>民族</td>
		  			<td>{{userBaseInfo.icNationUpdate}}</td>
		  			<td>证件有效期</td>
		  			<td>{{userBaseInfo.icLimittimeUpdate}}</td>
		  		</tr>
		  		<tr>
		  			<td>出生日期</td>
		  			<td>{{userBaseInfo.icBirthUpdate}}</td>
		  			<td>邮箱</td>
		  			<td>{{userBaseInfo.custEmail}}</td>
		  		</tr>
		  		<tr>
		  			<td>身份证地址</td>
		  			<td>{{userBaseInfo.icAddressUpdate }}</td>
		  			<td>婚属</td>
		  			<td>{{userBaseInfo.marital }}</td>
		  		</tr>
		  		<tr>
		  			<td>身份证号码</td>
		  			<td>{{userBaseInfo.icNumberUpdate }}</td>
		  			<td>学历</td>
		  			<td>{{userBaseInfo.hignestDegree }}</td>
		  		</tr>
		  		<tr>
		  			<td>居住地址</td>
		  			<td>{{userBaseInfo.houseProvince }}{{userBaseInfo.houseCity }}{{userBaseInfo.houseArea }}{{userBaseInfo.houseAddress }}</td>
		  		</tr>
		  	</table>
		  	<h3>工作信息</h3>
		  	<table v-if="jobType==1">
		  		<tr>
		  			<th colspan="4">单位信息</th>
		  		</tr>
		  		<tr>
		  			<td>工作单位</td>
		  			<td>{{userBaseInfo.companyName}}</td>
		  			<td>单位地址</td>
		  			<td>{{userBaseInfo.companyProv}}{{userBaseInfo.companyCity }}{{userBaseInfo.companyArea }}{{userBaseInfo.companyAddress }}</td>
		  		</tr>
		  		<tr>
		  			<th colspan="4">单位联系方式</th>
		  		</tr>
		  		<tr>
		  			<td>座机</td>
		  			<td>{{userBaseInfo.companyTelArea}}-{{userBaseInfo.companyTelNo}}-{{userBaseInfo.companyTelExt}}</td>
		  			<td>手机</td>
		  			<td>{{userBaseInfo.companyMobile }}</td>
		  		</tr>
		  	</table>
		  	<table v-if="jobType==2">
		  		<tr>
		  			<th colspan="4">公司信息</th>
		  		</tr>
		  		<tr>
		  			<td>公司名称</td>
		  			<td>{{userBaseInfo.companyName}}</td>
		  			<td>公司地址</td>
		  			<td>{{userBaseInfo.companyProv}}{{userBaseInfo.companyCity }}{{userBaseInfo.companyArea }}{{userBaseInfo.companyAddress }}</td>
		  		</tr>
		  		<tr>
		  			<th colspan="4">公司联系方式</th>
		  		</tr>
		  		<tr>
		  			<td>座机</td>
		  			<td>{{userBaseInfo.fixedTelephone}}</td>
		  			<td>手机</td>
		  			<td>{{userBaseInfo.companyMobile }}</td>
		  		</tr>
		  	</table>
		  	<table v-if="jobType==3">
		  		<tr>
		  			<td width="60">收入来源</td>
		  			<td>{{userBaseInfo.revenueSources}}</td>
		  			<td width="60">月收入</td>
		  			<td >{{userBaseInfo.averageMonthlyIncome}}</td>
		  		</tr>
		  	</table>
		  </el-tab-pane>
		  <el-tab-pane label="联系人信息" name="5">
		  		<el-table
			      :data="linkInfo"
			      border
			      style="width: 100%">
			      <el-table-column align='center' type="index"  width="160" label="" :index="indexMethod">
			      </el-table-column>
			      <el-table-column
			      	align='center'
			        :show-overflow-tooltip="true"
			        prop="relation"
			        label="关系">
			      </el-table-column>
			      <el-table-column
			      	align='center'
			        :show-overflow-tooltip="true"
			        prop="phone"
			        label="联系电话">
			      </el-table-column>
			      <el-table-column
			      	align='center'
			        :show-overflow-tooltip="true"
			        prop="name"
			        label="姓名">
			      </el-table-column>
			      <el-table-column
			      	align='center'
			        :show-overflow-tooltip="true"
			        prop="linkmanIsKnow"
			        label="是否允许知晓该借款">
			      </el-table-column>
			    </el-table>
		  </el-tab-pane>
		  <el-tab-pane label="账户信息" class="tabs" name="6">
		  	<table >
		  		<tr>
		  			<th colspan="2">江西银行账号信息</th>
		  		</tr>
		  		<tr>
		  			<td width="100">电子账号</td>
		  			<td>{{accoutInfo.bankAccount}}</td>
		  		</tr>
		  		<tr>
		  			<td width="100">账户余额</td>
		  			<td>
		  				<span v-if="!eye">2500</span>
		  				<span v-if="eye">*****</span>
		  				元<i class="el-icon-view" @click="eyeToggle()" ></i>
		  			</td>
		  		</tr>
		  	</table>
		  	<table >
		  		<tr>
		  			<th colspan="2">绑定银行卡</th>
		  		</tr>
		  		<tr>
		  			<td width="100">开户银行</td>
		  			<td>{{accoutInfo.bankName  }}</td>
		  		</tr>
		  		<tr>
		  			<td width="100">银行卡号</td>
		  			<td>{{accoutInfo.cradNumber }}</td>
		  		</tr>
		  		<tr>
		  			<td width="100">银行预留手机号</td>
		  			<td>{{accoutInfo.bindCardMobile  }}</td>
		  		</tr>
		  	</table>
		  </el-tab-pane>
		</el-tabs>
		<!--客户分配组织架构弹框--START-->
		<el-dialog title="客户分配" width='800px' :visible.sync="CustDistributionDialog">
			<el-row  type="flex" style='margin-top: -25px;'>
				<el-col :span="11" >
					<h3 class="titsheet">组织架构</h3>
					<div class="mrtop20">
						<el-input 
							clearable
							placeholder="根据名称模糊查询" 
							 v-model="ser_department" 						 
							>
							 <el-button slot="append" icon="el-icon-search" @click='search_tree()'></el-button>
						</el-input>
					</div>
					<div class="v-tree-wrap" style="border: 1px solid #dcdfe6;margin-top: 10px;border-radius: 5px;    height: 220px;overflow: auto;">											
						<v-tree ref='tree' :data='zTreeData' :multiple='false'  :halfcheck='true' @node-click='handleNodeClickCustDis'/>
					</div>
				</el-col>
				<el-col :span="1" >
				</el-col>
				<el-col :span="12" >
					<h3 class="titsheet">员工信息</h3>
					<div class="mrtop20">
						<el-input placeholder="根据员工工号、姓名模糊查询"  v-model="ser_people" clearable>
							 <el-button slot="append" icon="el-icon-search" @click='search_employee()'></el-button>
						</el-input>
					</div>
					<div class="table-wraps" style="margin-top: 10px">
						<el-table
							 v-loading="loadingTableShow"
							highlight-current-row
	    					@current-change="handleCurrentSelect"
						    :data="tableData_s"
						    border
						    height='220'
						    style="width: 100%">
					    <el-table-column
					    	align='center'
					      prop="realName"
					      label="姓名"
					      width="180">
					    </el-table-column>
					    <el-table-column
					    	align='center'
					      prop="username"
					      label="工号"
					      width="180">
					    </el-table-column>	
					  </el-table>
					  <div style="width: 100%;overflow:auto">
					  	<pagination 	
					  		:layout='layout'
							:currentPage = 'currentPage_s'
							:total = 'total_s'
							@handleSizeChange = 'handleSizeChange_s'
							@handleCurrentChange = 'handleCurrentChange_s'
		 				> 				
	 					</pagination>
					  </div>
					</div>
					
				</el-col>
				
			</el-row>
			<div class="text-rt">
				<el-button  type="info" @click='CustDistributionDialog = false'>取消</el-button>
			     <el-button type="primary" @click='saveDisCust' :loading="orSaveDisCust">保存</el-button>			   
			</div>
		</el-dialog>
	 	<!--客户分配组织架构弹框--END-->
	</div>
</div>
</template>
<script>
import api from '@/api/index.js'	
import TitCommon from '@/components/common/TitCommon'
import TableList from '@/components/custManage/TableList'
import Pagination from '@/components/common/Pagination'
export default {
  name: 'allList',
  data() {
  	return {
  			crmCustInfoId_s:'',
  			activeName:'4',
  			tableData_s: [],
  			total_s: 0,
  			pageSize_s:10,
		    pageNo_s:1,
  			loadingTableShow:false,
  			orSaveDisCust: false,
  			zTreeData: [],
  			layout: 'total, prev, pager, next',
	  		currentPage_s:1,
  			ser_department:'',//搜索的部门
			ser_people: '',
			deptId: '',
  			CustDistributionDialog: false,
  			visiblePer: false,
  			orderBaseInfo:{},
  			userBaseInfo:{},
  			accoutInfo:{},
  			linkInfo:[],
  			PaymentHistory:[], //还款记录列表
  			RepaymentPlan:[], //还款计划列表
  			buttonLoading:false,
	  		apply_state:false,
	  		eye:true,
	  		money:'2500',
	  		status:3,
	  		examData:[],
	  		planData:[],
	  		recordData:[],
	  		tableData:[],
		    jobType:1,
		    pageSize:10,
		    pageNo:1,
		    total:0,
		    currentPage:1,
		    pageSize2:10,
		    pageNo2:1,
		    total2:0,
		    currentPage2:1,
		    pageSize3:10,
		    pageNo3:1,
		    total3:0,
		    currentPage3:1
  		}
  	},
  	components:{
  		Pagination
  	},
  	mounted(){
  		this.queryBaseOrderInfo()
  		this.getDepartmentZtreeFn()
  	},
  	methods:{
  		
  		queryRepaymentPlan(){ //还款计划
  			api.queryRepaymentPlan({
  				pageSize:this.pageSize,
  				pageNo:this.pageNo,
  				crmApplayId:this.$route.query.crmApplayId
  			}).then((res) =>{
				if (res.data.code==1 && res.data.data != null) {
					this.RepaymentPlan = res.data.data
				}
			})
  		},
  		queryPaymentHistory(){ //还款记录
  			api.queryPaymentHistory({
  				pageSize:this.pageSize2,
  				pageNo:this.pageNo2,
  				crmApplayId:this.$route.query.crmApplayId
  			}).then((res) =>{
				if (res.data.code==1 && res.data.data != null) {
					this.PaymentHistory = res.data.data
				}
			})
  		},
  		queryBaseOrderInfo(){
  			api.queryBaseOrderInfo({
  				crmApplayId:this.$route.query.crmApplayId
  			}).then((res) =>{
				if (res.data.code==1 && res.data.data != null) {
					this.orderBaseInfo = res.data.data
					this.crmCustInfoId_s = res.data.crmCustInfoId
					console.log(res.data.data)
				}
			})
  		},
  		queryEssentialInfo(){ 
  			api.queryEssentialInfo({
  				crmCustInfoId:this.$route.query.crmApplayId
  			}).then((res) =>{
  				console.log('jobType',res.data.data)
				if (res.data.code==1 && res.data.data != null) {
					this.userBaseInfo = res.data.data
  					this.jobType = res.data.data.jobType
				}
			})
  		},
  		queryLinkManInfo(){
  			api.queryLinkManInfo({
  				crmCustInfoId:this.$route.query.crmApplayId
  			}).then((res) =>{
				if (res.data.code==1 && res.data.data != null) {
					this.linkInfo = res.data.data
				}
			})
  		},
  		queryAccountInfo(){
  			api.queryAccountInfo({
  				crmCustInfoId:this.$route.query.crmApplayId
  			}).then((res) =>{
				if (res.data.code==1) {
					this.accoutInfo = res.data.data
				}
			})
  		},
  		tabClick(tab, even){
  			console.log(tab, even)
  			if(tab.name=='4'){ //基本信息
  				this.queryEssentialInfo()
  			}else if(tab.name=='5'){ //联系人信息
  				this.queryLinkManInfo()
  			}else if(tab.name=='6'){ // 账户信息
  				this.queryAccountInfo()
  			}else if(tab.name=='1'){ // 审批记录
  				this.queryAccountInfo()
  			}else if(tab.name=='2'){ // 还款计划
  				this.queryRepaymentPlan()
  			}else if(tab.name=='3'){ //还款记录
  				this.queryPaymentHistory() 
  			}
  		},
  		indexMethod(index){
  			var a = `第${index+1}联系人`
  			return a;
  		},
  		eyeToggle(){
  			if(this.eye == false){
  				this.eye =true
  			}else{
  				this.eye=false
  			}
  		},
  		handleSizeChange(val){
  			this.pageSize = val
  		},
  		handleCurrentChange(val){
  			this.pageNo = val
  			this.currentPage = val
  		},
  		handleSizeChange2(val){
  			this.pageSize2 = val
  		},
  		handleCurrentChange2(val){
  			this.pageNo2 = val
  			this.currentPage2 = val
  		},
  		handleSizeChange3(val){
  			this.pageSize3 = val
  		},
  		handleCurrentChange3(val){
  			this.pageNo3 = val
  			this.currentPage3 = val
  		},
  		search_tree() {
    		this.$refs.tree.searchNodes(this.ser_department)
//  		console.log(this.treeData)
    	},
  		saveDisCust() {
    		this.$confirm('此操作将是保存, 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	        	this.cuntomerDistributionFn()	          
	        }).catch(() => {
	          this.$message({
	            type: 'info',
	            message: '已取消保存'
	          });          
	        });
    	},
    	cuntomerDistributionFn() {
    		this.orSaveDisCust = true
    		let arr = []
 			arr.push(this.crmCustInfoId_s)
//  		let customerIdList = this.multipleSelectionIdList
    		let parsrms = {
 			customerIdList: arr,
    			employeeId: this.employeeId
    		}
    		console.log(parsrms)
    		api.cuntomerDistribution(parsrms).then(res => {
    			this.orSaveDisCust = false
    			if(res.data.success){
    				this.CustDistributionDialog = false
    				
    				console.log(res.data.data)
    			} else {
    				this.CustDistributionDialog = true
    			}
				this.$notify({
		           title: '提示',
		           message: res.data.msg,
		           duration: 1500
		        });
    		})
    	},
  		visiblePerFn() {
  			this.CustDistributionDialog = true
  		},
  		handleSizeChange_s(val) {
			this.currentPage_s = 1
			this.pageNo_s = 1
			this.pageSize_s = val  
			this.queryCustDistributionByDeptIdFn()
			console.log(val,777777777777)
		},
		handleCurrentChange_s(val) {
			this.pageNo_s = val	
			this.queryCustDistributionByDeptIdFn()
			console.log(val,88888888)
		},
    	handleNodeClick(data) {
    		console.log(data,'ssssddddd')
    		this.search.partName = data.title
    		this.showTree = false
//	        console.log(data,6664444455555);
	    },
	    handleNodeClickCustDis(data){
	    	this.ser_department = data.name
	    	console.log(data.id,6664444455555);
	    	this.deptId = data.id
	    	this.queryCustDistributionByDeptIdFn()
	    },
	    handleCurrentSelect(val) {
    		if (val) {
    			
    			this.employeeId = val.username
    		}
    		console.log(val,65656655)
    	},
  		search_employee() {
    		this.queryCustDistributionByDeptIdFn()
    		console.log(this.multipleSelectionIdList,12121,'-=-=77777777777777')
    	},
    	queryCustDistributionByDeptIdFn(){
	    	this.tableData_s= []
	    	let pararms = {
	    		pageNo: this.pageNo_s,
  				pageSize: this.pageSize_s,
  				deptId: this.deptId,
  				username: this.ser_people
	    	}
	    	this.loadingTableShow = true
	    	if(!this.deptId){
	    		this.loadingTableShow = false 
	    		this.$notify({
		           title: '提示',
		           message: '请选择组织架构',
		           duration: 1500
		        });
	    		return
	    	}
	    	
//	    	console.log(pararms)
	    	api.queryCustDistributionByDeptId(pararms).then(res => {
	    		console.log(res,'-=-=-=-=6666')
	    		
	    		this.loadingTableShow = false
	    		if(res.data.success){
	    			this.total_s = res.data.total	  		
	  				this.tableData_s = res.data.data
    				
    				console.log(res.data.data)
    			} else {
    				this.$notify({
			           title: '提示',
			           message: res.data.msg,
			           duration: 1500
			        });
    			}
	    	})
//	    	console.log(data)
	    },
  		getDepartmentZtreeFn() {
			api.getDepartmentZtree({groupId:''}).then(res => {
				if(res.data.status == 1) {		
//					this.treeData = res.data.ztree
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
  	}
}
</script>
<style lang="less">
	.top{
		width: 100%;
		height: 60px;
		background: #31AFFF;
		margin-bottom: 20px;
	}
	.detail{
		width: 1300px;
		margin:20px auto;
		.sheet{
			background: #f7f7f7;
			border-radius: 10px;
			padding:20px 15px;
			font-size:12px;
			span{
				margin-right: 50px;
			}
			.change-permission {
				float: right;
				margin-right: -50px;
			}
			.changePerIcon {
				display: inline-block;
				background: url('../../assets/images/changePer.png') no-repeat 0 0;
				width: 20px;
				height: 22px;
		   	  	background-size: 100%;
			    margin-top: -2px;
			    vertical-align: middle;
			}
		}
		.params{
			border-radius:8px;
			border:#ddd solid 1px;
			padding: 20px;
			margin: 20px;
			overflow: hidden;
			font-size:13px;
			p{
				float: left;
				margin:15px 0;
				width: 200px;
				span{
		
				}
			}
		}
		.tabs{
			h3{
				margin: 10px 0;
				border-bottom: #ccc dotted 1px;
				padding-bottom: 10px;
			}
			table{
				font-size: 12px;
				width: 100%;
				margin-bottom: 20px;
				td{
					padding: 10px;
					&:nth-child(even){
						color: #666;
					}
				}
				th{
					padding: 10px;
					background: #f7f7f7;
					text-align: left;
				}
			}
		}
		.el-icon-view{
			padding-left: 10px;
			cursor: pointer;
		}
		.steps{
			font-size: 12px;
			.el-step__title{
				font-size: 12px;
			}
		}
		.des{
			font-size:12px;
			color:#666;
			margin:5px 0 20px;
			padding-left: 5px;
			span{
				color: #222;
				padding-right: 20px;
			}
		}
	}
</style>
