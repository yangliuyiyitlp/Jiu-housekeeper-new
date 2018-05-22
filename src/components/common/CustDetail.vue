<template>
<div>
	<div class="top"><img src="../../assets/images/logo.png"></div>
	<div class="detail">
		<div class="sheet">
			<p>
			 	注册手机号：<span>{{userInfo.cust_mobile}}</span>
			 	用户姓名：<span>{{userInfo.cust_name}}</span> 
			 	身份证号：<span>{{userInfo.cust_ic}}</span>
			 	申请城市：<span>{{userInfo.house_province}} {{userInfo.house_city}}</span> 			 	
			 	注册时间：<span>{{userInfo.create_time}}</span>			 	
			 	<el-popover
				  placement="bottom"
				 
				  trigger="click"
				  v-model="visiblePassWord"
				  >
				  <div class='custPermissonPsd' style="">
				    <p><span @click="showModifyPsd(1)">重置密码</span></p>
				    <p><span @click="showModifyPsd(2)">修改注册手机号码</span></p>
				    <p>
				    	<span @click="showModifyPsd(3,0)" v-if="lockCustType == 1">冻结客户</span>	
				    	<span @click="showModifyPsd(3,1)" v-if="lockCustType == 0">解冻客户</span>	
				    </p>
				  </div>
				  <!--<i class="" slot="reference"></i>-->
				  <i class="rt"   slot="reference">
				  	<img src="../../assets/images/custPsd.png"/>
				  </i>
				   <!--<el-button slot="reference">click 激活</el-button>-->
				</el-popover>
			</p>
		</div>

		<el-tabs type="border-card" class="mrtop20" v-model="activeName"  @tab-click="tabClick">
		  <el-tab-pane label="基本信息" class="tabs"  name="1" >
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
		  <el-tab-pane label="联系人信息" name="2"  >
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
		  <el-tab-pane label="账户信息" class="tabs" name="3" >
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
		  <el-tab-pane label="订单信息" name="4" >
		  		<el-table
			      :data="orderData"
			      border
			      style="width: 100%">
			      <el-table-column align='center' type="index"  width="160" label="序号" >
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
			        prop="loanChannel"
			        label="借款渠道">
			      </el-table-column>
			      <el-table-column
			      	align='center'
			        :show-overflow-tooltip="true"
			        prop="amount"
			        label="借款金额(元)">
			      </el-table-column>
			      <el-table-column
			      	align='center'
			        :show-overflow-tooltip="true"
			        prop="periods"
			        label="借款期限">
			      </el-table-column>
			      <el-table-column
			      	align='center'
			        :show-overflow-tooltip="true"
			        prop="status"
			        label="订单状态">
			      </el-table-column>
			      <el-table-column
			      	align='center'
			        :show-overflow-tooltip="true"
			        prop="createTime"
			        label="申请时间">
			      </el-table-column>
			      <el-table-column
			      	align='center'
			        :show-overflow-tooltip="true"
			        label="操作">
			        <template slot-scope="scope">
				        <span class="highLight_cursor" @click="lookOrderDetail(scope.row)">查看详情</span>
			      </template>
			      </el-table-column>
			    </el-table>
			    <div class="pad20 alignCen">
		 			<pagination 				
						:currentPage = 'currentPage'
						:total = 'total'
						@handleSizeChange = 'handleSizeChange'
						@handleCurrentChange = 'handleCurrentChange'
		 				> 				
		 			</pagination>
		 		</div>
		  </el-tab-pane>
		</el-tabs>
		<div>
			<el-dialog title="重置密码" width='416px' center :visible.sync="resetPsd" top='20%'>		
			  	<div class="diaPsd" style=''>			  	
				  	<div>6位随机密码将发送至用户注册手机号，确认重置密码吗？</div>
				  	<div>
				  		注：此密码为用户登录贝尔在线的密码，确认修改后用户需要重新登录网站。
				  	</div>
				</div>
				<div slot="footer" class="text-rt">
			      <el-button @click="resetPsd = false">取 消</el-button>
			      <el-button type="primary" @click="confirmResetPsd" :loading='resetPsdBtnLoading'>确定</el-button>
			    </div>
			</el-dialog>
			<el-dialog title="修改手机号" width='416px' center :visible.sync="resetMobile" top='20%'>		
			  	<div class=" ">			  	
				  	<el-form :model="ruleForm2" :rules="rules" ref="ruleForm2" label-width="110px">
					  <el-form-item label="原手机号码：" >
					    <p>{{userInfo.cust_mobile}}</p>
					  </el-form-item>
					  <el-form-item label="新手机号码：" prop="newMobile">
					    <el-input type="text" v-model="ruleForm2.newMobile" auto-complete="off"></el-input>
					  </el-form-item>  
					</el-form>
				</div>
				<div slot="footer" class="text-rt">
			      <el-button @click="resetMobile = false">取 消</el-button>
			      <el-button type="primary" @click="submitForm('ruleForm2')" :loading='resetMobileBtnLoading'>确定</el-button>
			    </div>
			</el-dialog>
			<el-dialog :title="title" width='416px' center :visible.sync="lockCust" top='20%'>		
			  	<div class="diaPsd" style=''>			  	
				  	<p v-if="lockCustType == 1">确认冻结该客户吗？冻结后用户将无法登录APP</p>	
				  	<p v-if="lockCustType == 0">确认解冻该客户吗？</p>	
				</div>
				<div slot="footer" class="text-rt">
			      <el-button @click="lockCust = false">取 消</el-button>
			      <el-button type="primary" @click="confirmLockCust" :loading='lockCustBtnLoading'>确定</el-button>
			    </div>
			</el-dialog>
		</div>
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
  			userInfo:{
  				// cust_mobile:'',
  				// create_time:'',
  				// cust_ic:'',
  				// cust_name:'',
  				// house_city:'',
  				// house_province:''
  			},
  			userBaseInfo:{},
  			accoutInfo:{},
  			linkInfo:[],
  			activeName:'1',
  			title: '冻结客户',
  			visiblePassWord:false,
	  		buttonLoading:false,
	  		apply_state:false,
	  		eye:true,
	  		money:'2500',
	  		process:3,
	  		orderData:[],
	  		tableData:[{
		          date: '2016-05-03',
		          name: '王小虎',
		          province: '上海',
		          city: '普陀区',
		          address: '上海市普陀区金沙江路 1518 弄',
		          zip: 200333,
		          tag: '家'
		        }, {
		          date: '2016-05-02',
		          name: '王小虎',
		          province: '上海',
		          city: '普陀区',
		          address: '上海市普陀区金沙江路 1518 弄',
		          zip: 200333,
		          tag: '公司'
		        }, {
		          date: '2016-05-04',
		          name: '王小虎',
		          province: '上海',
		          city: '普陀区',
		          address: '上海市普陀区金沙江路 1518 弄',
		          zip: 200333,
		          tag: '家'
		        }, {
		          date: '2016-05-01',
		          name: '王小虎',
		          province: '上海',
		          city: '普陀区',
		          address: '上海市普陀区金沙江路 1518 弄',
		          zip: 200333,
		          tag: '公司'
		        }],
		    resetPsd: false,
		    resetPsdBtnLoading: false,
		    resetMobile: false,
		    resetMobileBtnLoading: false,
		    lockCust: false,
		    lockCustBtnLoading: false,
		    lockCustType: 0,//1：冻结按钮，0： 解冻按钮
		    status: 0, //状态0 停用 1 启用
		    ruleForm2: {
		        oldMobile: '',
		        newMobile: ''
	        },
	        jobType:1,
	        rules: {
	            newMobile: [
	            	{ required: true, message: '请输入手机号', trigger: 'blur' },
		          	{ pattern:/^[1]\d{10}$/, message: '手机号为11位数字且以1开头', trigger: 'blur' },
	          	]
	        },
	        currentPage:1,
	  		total: 0,
	  		pageNo: 1,
	        pageSize: 10,
	  	}
  	},
  	created() {
  		this.queryStatusLock()
  	},
  	mounted(){
		console.log(this.$route)
  		this.getCustDetailBase()
  		this.queryEssentialInfo()
  		//this.queryLinkManInfo()
  		// console.log(this.userInfo.gjg)
  	},
  	methods:{

  		getCustDetailBase(){
  			api.getCustDetailBase({
  				crmCustInfoId:this.$route.query.crmCustInfoId
  			}).then((res) =>{
				if (res.data.code==1) {
					this.userInfo = res.data.data
					console.log(res.data.data)
				}
			})
  		},
  		queryEssentialInfo(){ 
  			api.queryEssentialInfo({
  				crmCustInfo:this.$route.query.crmCustInfoId
  			}).then((res) =>{
  				console.log('jobType',res.data.data)
				if (res.data.code==1) {
					this.userBaseInfo = res.data.data
  					this.jobType = res.data.data.jobType
				}
			})
  		},
  		queryLinkManInfo(){
  			api.queryLinkManInfo({
  				crmCustInfo:this.$route.query.crmCustInfoId
  			}).then((res) =>{
				if (res.data.code==1) {
					this.linkInfo = res.data.data
				}
			})
  		},
  		queryAccountInfo(){
  			api.queryAccountInfo({
  				crmCustInfo:this.$route.query.crmCustInfoId
  			}).then((res) =>{
				if (res.data.code==1) {
					this.accoutInfo = res.data.data
				}
			})
  		},
  		queryOrderList(){
  			api.queryOrderList({
  				pageSize:this.pageSize,
  				pageNo:this.pageNo,
  				crmCustInfo:this.$route.query.crmCustInfoId,
  			}).then((res) =>{
				if (res.data.code==1) {
					this.orderData = res.data.data
					this.total = res.data.total
				}
			})
  		},
  		handleSizeChange(val) {
			this.currentPage = 1
			this.pageNo = 1
			this.pageSize = val  
			this.queryOrderList()
	//		console.log(val,777777777777)
		},
		handleCurrentChange(val) {
			this.pageNo = val	
			this.queryOrderList()
	//		console.log(val,88888888)
		},
  		tabClick(tab, even){
  			console.log(tab, even)
  			if(tab.name=='1'){ //基本信息
  				this.queryEssentialInfo()
  			}else if(tab.name=='2'){ //联系人信息
  				this.queryLinkManInfo()
  			}else if(tab.name=='3'){ // 账户信息
  				this.queryAccountInfo()
  			}else{ //订单信息
  				this.queryOrderList()
  			}
  		},
  		showModifyPsd(type,lockCustType) { //参数type => 1：重置密码，2：修改注册手机号，3：冻结客户
  			this.visiblePassWord = false
  			if (type == 1) {
    			this.resetPsd = true
  			}
  			if (type == 2) {  				
    			this.resetMobile = true
    			this.resetForm('ruleForm2')
  			}
  			if (type == 3) {  				
    			this.lockCust = true
    			this.status = lockCustType
  			}
  			console.log(type,lockCustType,this.status)
  		},  		
  		confirmResetPsd() {//1：重置密码
  			
			this.$confirm('此操作将重置密码, 是否继续?', '提示', {
	            confirmButtonText: '确定',
	            cancelButtonText: '取消',
	            type: 'warning'
	        }).then(() => {
	        	this.resetPsdBtnLoading = true	        	
	        	api.updateDetailCustPwd({custId: this.$route.query.bgCustomerId}).then(res => {
	        		this.resetPsdBtnLoading = false
	        		this.resetPsd = false
//	        		console.log(res)
		          	this.$message({
		            	type: 'success',
		            	message: res.data.msg
		          	});
	        	})
	        }).catch(() => {
	          	this.$message({
	            	type: 'info',
	            	message: '已取消重置密码'
	          	});          
	        });
  		},
  		submitForm(formName) {//2：修改注册手机号，
	        this.$refs[formName].validate((valid) => {
	          if (valid) {
	            	this.$confirm('此操作将重置密码, 是否继续?', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'warning'
			        }).then(() => {
			        	this.updateDetailRegisterPwdFn()			          
			        }).catch(() => {
			          this.$message({
			            type: 'info',
			            message: '已取消重更换手机号码'
			          });          
			        });
	          	} else {
//		            this.$message({
//			            type: 'info',
//			            message: '手机号码格式不对'
//			         });  
		            return false;
	          	}
	        });
      	},
      	resetForm(formName) {
      		this.$nextTick(() => {
        		this.$refs[formName].resetFields()
      		})
        },
      	updateDetailRegisterPwdFn() {
      		this.resetMobileBtnLoading = true
      		let pararms = {
      			bgCustomerId: this.$route.query.bgCustomerId,
				bgCustInfoId: this.$route.query.bgCustInfoId,
				crmCustInfoId: this.$route.query.crmCustInfoId,
				mobile: this.ruleForm2.newMobile
      		}
      		console.log(pararms)
      		api.updateDetailRegisterPwd(pararms).then(res => {
      			this.resetMobileBtnLoading = false
        		this.resetMobile = false
//	        		console.log(res)
	          	this.$message({
	            	type: 'success',
	            	message: res.data.msg
	          	});
        	})	        
      	},
      	confirmLockCust() {//3：冻结客户  			
  			let textTit = null  			
  			textTit = this.status == 1 ? '解冻客户' : '冻结客户'
  			this.$confirm('此操作将 '+ textTit +', 是否继续?', '提示', {
	            confirmButtonText: '确定',
	            cancelButtonText: '取消',
	            type: 'warning'
	        }).then(() => {
	        	this.saveCustStatusLock()
	        }).catch(() => {
	          	this.$message({
	            	type: 'info',
	            	message: '已取消'+ textTit + '操作'
	          	});          
	        });  			
  		},
  		saveCustStatusLock() {
  			this.lockCustBtnLoading = true
  			let aprarms = {
  				id: this.$route.query.bgCustomerId,
  				status: this.status,
  			}
  			api.updateDetailBgCust(aprarms).then(res=>{
  				this.lockCustBtnLoading = false
  				this.lockCust = false
  				this.queryStatusLock()
	  		})
  		},
  		queryStatusLock() {
  			api.updateDetailBgCust({id: this.$route.query.bgCustomerId}).then(res=>{
				if (res.data.data) {
					this.lockCustType = res.data.data.status
					if(res.data.data.status == 1) {
						this.title = '冻结客户'
					} else if (res.data.data.status == 0) {
						this.title = '解冻客户'
					}
				}
	  		})
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
  		lookOrderDetail(row){ //查看订单详情
  			var routeData = this.$router.resolve({
	        	path: '/detail/orderDetail',
	        	query: {
	        		crmApplayId: row.crmApplayId,
	        		//status:row.status
	        	}
	      	});
	      	window.open(routeData.href);
  		}
  	},
  	components: {
	  	TitCommon,
	  	Pagination
    }
  
}
</script>
<style lang="less" scoped>
	.top{
		width: 100%;
		height: 60px;
		background: #31AFFF;
		margin-bottom: 20px;
	}
	.detail{
		width: 1200px;
		margin:20px auto;
		.sheet{
			background: #f7f7f7;
			border-radius: 10px;
			padding:20px 15px;
			font-size:12px;
			
			span{
				margin-right: 50px;
			}
			p {
				position: relative;
				
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
		.el-form-item {
			margin-bottom: 0;
		}
		
	}
	.custPermissonPsd {
		text-align: left;
		font-size: 12px;
		color:#333;
		p {
			padding: 5px 0;
		}
	}
	.diaPsd {
		margin-top: -25px;
		div:first-child {
			color: #1E1E1E;
			padding-bottom: 10px;
		}
		div:last-child{
			color: #C9C9C9;
		}
	}
</style>
