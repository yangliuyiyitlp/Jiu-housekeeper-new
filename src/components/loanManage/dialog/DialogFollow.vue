<template>
  <div class="order-list-wrap ">
		<el-dialog 
			:close-on-click-modal ='false'
			width='60%'
			title="" 
			:visible.sync="dialogFollow.dialogFollowVisible"
		>
			  <div class="title">跟进记录</div>
			  <p class="mrtop20"><el-button type="primary" @click='followWrap'>新增跟进</el-button></p>
			  <div class="wrap-list table-wraps">
			  	<el-table 
			  		height='300px'
					  	border
					  	:data="arrData">
					  	<el-table-column
					    	label="序号"
					      	type="index"
					      	align='center'
					      	width="50">
				    	</el-table-column>
					    <el-table-column prop="followNode" label="跟进环节" align='center'>	
					    	<template slot-scope="scope">
						        <span v-if='scope.row.followNode == 1'>贷前</span>
						        <span v-if='scope.row.followNode == 2'>检测</span>
						        <span v-if='scope.row.followNode == 3'>贷后</span>
						        <span v-if='scope.row.followNode == 4'>ERP贷后</span>
					      </template>
					    </el-table-column>
					    <el-table-column prop="followType" label="跟进形式" align='center'>	
					    	<template slot-scope="scope">
						        <span v-if='scope.row.followType == 1'>电话</span>
						        <span v-if='scope.row.followType == 2'>外访</span>
						        <span v-if='scope.row.followType == 3'>活动</span>						        
					      </template>
					    </el-table-column>
					    <el-table-column prop="createTime" label="跟进时间" align='center'>			    	
					    </el-table-column>
					    <el-table-column prop="followContent" label="跟进内容" align='center'>		
					    	<template slot-scope="scope">
						        <span class="btn-color" @click="showDifferDialog(scope.row,scope.row.followNode)">查看</span>
					      </template>
					    </el-table-column>
					    <el-table-column prop="followTime" label="操作日期" align='center'>		    	
					    </el-table-column>
					    <el-table-column prop="realName" label="操作人" align='center'>				    	
					    </el-table-column>		    
					</el-table>
					<div class="pagWrap">
					  <pagination 				
							:currentPage = 'currentPage'
							:total = 'total'
							@handleSizeChange = 'handleSizeChange'
							@handleCurrentChange = 'handleCurrentChange'
			 				> 				
	 					</pagination>
	 				</div>
			  </div>
		</el-dialog>
		<div class="follow-wrap">
			<!--新增跟进’贷前‘弹框--START-->
			<el-dialog title="新增跟进"  center :visible.sync="dialogFormVisible">
			  <el-form :model="form" ref="form" :rules="form_rules">
			    
			    <!--<el-form-item label="跟进形式" :label-width="formLabelWidth" prop="format">
			      <el-select v-model="form.format" placeholder="请选择">
			        <el-option label="电话" value="1"></el-option>
			        <el-option label="拜访" value="2"></el-option>
			        <el-option label="活动" value="3"></el-option>
			      </el-select>
			    </el-form-item>-->
			    <el-form-item class='r_s' label="跟进形式" :label-width="formLabelWidth" prop="format">
			      <el-table
			      	
					    :data="tableData"
					    border
					    style="width: 100%">
					    <el-table-column
					    	align='center'
					      prop="date"
					      label="关系"
					      >
					    </el-table-column>
					    <el-table-column
					    	align='center'
					      prop="name"
					      label="姓名">
					    </el-table-column>
					    <el-table-column
					    	align='center'
					      prop="name"
					      label="号码">
					    </el-table-column>
					    <el-table-column
					    	align='center'
					      prop="name"
					      label="是否知晓此贷款">
					    </el-table-column>
					    <el-table-column
					    	align='center'
					      prop="name"
					      label="催收反馈">
					      	<template slot-scope="scope">
					      		<div :class="scope">{{scope.row}}</div>
					      		<el-select v-model="scope.row.a" placeholder="请选择" @change='changeVal("请选择")'>
									    <el-option
									      v-for="item in options"
									      :key="item.value"
									      :label="item.label"
									      :value="item.value">
									    </el-option>
									  </el-select>
					      	</template>
					    </el-table-column>
					  </el-table>
			    </el-form-item>
			    <el-form-item label="跟进内容" :label-width="formLabelWidth" prop="content">
			       <el-input type="textarea" v-model="form.content"></el-input>
			    </el-form-item>
			    <el-form-item label="跟进日期" :label-width="formLabelWidth" prop="date">
			       <el-date-picker
					      v-model="form.date"
					      :picker-options="follow_pickerOptions"
					      type="date"					      
      					value-format="yyyy-MM-dd"
					      placeholder="选择日期">
					    </el-date-picker>
			    </el-form-item>
			  </el-form>

			  <div slot="footer" class="dialog-footer">
			    <div class='text-rt'>
			    	<el-button @click="dialogFormVisible = false">取 消</el-button>
			      <el-button type="primary" @click="confirm_follow(form)" :loading='saveFollow'>确 定</el-button>
			    </div>
			  </div>
			</el-dialog>			
			<!--新增跟进弹框--END-->
			<!--贷前弹框--START-->
			<el-dialog title="查看跟进" width='360px' center :visible.sync="dialogLoan">
			  <p>{{beforeLoan_followCont}}</p>			 
			  
			</el-dialog>
			<!--贷前弹框--END-->
			<!--//检测弹框--START-->
			<el-dialog title="查看跟进" width='700px' center :visible.sync="dialogObserve">
			  <p class="observe">
			  	监测时间：{{observeObj.followTime}}
			  	<!--monitorType (integer, optional): 监测方式 ：1.常规监测 2.上门回访--> 
			  	<span class="rt">监测方式：{{observeObj.monitorType == 1? '常规监测' : '上门回访'}}</span>
			  </p>			
			  <div class="padTop20 borBot1px" style='margin-top: -25px;'>			  	
			  	<el-row>
			  		<el-row>
			  			<el-col :span="5" >是否失联：</el-col>
			  			<!--disappearStatus (integer, optional): 是否失联0.否 1.是 ,-->
			  			<el-col :span="19" >{{observeObj.disappearStatus == 0? '否' : '是'}}{{observeObj.disappearRemark}}</el-col>
			  		</el-row>
						<el-row>
							<el-col :span="5" >是否异常：</el-col>
							<el-col :span="19" >
								{{observeObj.expectionStatus == 0? '否' : '是'}}{{observeObj.expectionRemark}}
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="5" >上门回访家庭地址：</el-col>
							<el-col :span="19" >
								{{observeObj.homeProvinceId}} {{observeObj.homeCityId}} {{observeObj.homeDistrictId}}{{observeObj.homeAddress}}
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="5" >地址是否变化：</el-col>
							<el-col :span="19" >
								{{observeObj.homeChangeStatus == 0? '否' : '是'}}{{observeObj.homeChangeRemark}}</el-col>
						</el-row>
						<el-row>
							<el-col :span="5" >地址是否异常：</el-col>
							<el-col :span="19" >{{observeObj.comExceptionStatus == 0? '否' : '是'}}{{observeObj.comExceptionRemark}}</el-col>
						</el-row>
						<el-row>
							<el-col :span="5" >上门回访公司地址：</el-col>
							<el-col :span="19" >
								{{observeObj.comProvinceId}}{{observeObj.comCityId}}{{observeObj.comDistrictId}}{{observeObj.comAddress}}
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="5" >地址是否变化：</el-col>
							<el-col :span="19" >
								{{observeObj.comChangeStatus == 0? '否' : '是'}}{{observeObj.comChangeRemark}}
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="5" >地址是否异常：</el-col>
							<el-col :span="19" >
								{{observeObj.comExceptionStatus == 0? '否' : '是'}}{{observeObj.comExceptionRemark}}
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="5" >其他异常情况：</el-col>
							<el-col :span="19" >{{observeObj.otherExceptionStatus == 0? '否' : '是'}}{{observeObj.comExceptionRemark}}</el-col>
						</el-row>
					</el-row>
				</div>
			  <div class="padTop20">
			  	<el-row  style='margin-top: -25px;'>
						<div>
							<el-row>
								<el-col :span="5" >结论：</el-col>
									<!--1.正常 2.移交电催 3.移交外访 4.移交总部--> 
								<el-col :span="19" >
									<span v-if='observeObj.monitorResult == 1'>正常</span>
									<span v-if='observeObj.monitorResult == 2'>移交电催</span>
									<span v-if='observeObj.monitorResult == 3'>移交外访</span>
									<span v-if='observeObj.monitorResult == 4'>移交总部</span>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="5" >回访意见：</el-col>
								<el-col :span="19" >{{observeObj.visitOpinion}}</el-col>
							</el-row>
						</div>
					</el-row>
				</div>
			</el-dialog>
			<!--检测弹框--END-->
			
			<!--贷后弹框--START-->
			<el-dialog title="查看跟进" width='700px' center :visible.sync="dialogLoanEnd">		
			  <div class="" style='margin-top: -25px;'>			  	
			  	<el-row>
			  		<el-row>
			  			<el-col :span="3" >催收对象：</el-col>
			  			<el-col :span="21" >本人</el-col>
			  		</el-row>
						<el-row>
							<el-col :span="3" >姓名：</el-col>
							<el-col :span="21" >是内容</el-col>
						</el-row>
						<el-row>
							<el-col :span="3" >电话/地址：</el-col>
							<el-col :span="21" >1324564879</el-col>
						</el-row>
						<el-row>
							<el-col :span="3" >催收反馈：</el-col>
							<el-col :span="21" >
								<span v-if='observeObj.feedbackType == 310000'>有效联络</span>
								<span v-if='observeObj.feedbackType == 310001'>无效联络</span>								
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="3" >跟进情况：</el-col>
							<el-col :span="21" >{{observeObj.followContent}}</el-col>
						</el-row>
						<el-row>
							<el-col :span="3" >预约跟进：</el-col>
							<el-col :span="21" >{{observeObj.reminderTime}}</el-col>
						</el-row>
						<el-row>
							<el-col :span="3" >预约提醒：</el-col>
							<el-col :span="21" >{{observeObj.reminderContent}}</el-col>
						</el-row>
					</el-row>
				</div>
			</el-dialog>
			<!--贷后弹框--END-->
			<!--erp贷后弹框--START-->
			<el-dialog title="查看跟进" width='700px' center :visible.sync="dialogErp">		
			  <div class="padTop20" style='margin-top: -25px;'>			  	
			  		<el-row>
			  			<el-col :span="3" >跟进时间：</el-col>
			  			<!--disappearStatus (integer, optional): 是否失联0.否 1.是 ,-->
			  			<el-col :span="9" >{{observeObj.followTime}}</el-col>
			  			<el-col :span="3" >跟进类型：</el-col>
			  			<!--1.电话 2.外访 3.活动-->			  			
			  			<el-col :span="9" >
			  				{{observeObj.followType==1?'电话':observeObj.followType==2?'外访':'活动'}}
			  			</el-col>
			  		</el-row>
						<el-row>
			  			<el-col :span="3" >跟进人员：</el-col>
			  			<!--disappearStatus (integer, optional): 是否失联0.否 1.是 ,-->
			  			<el-col :span="21" >{{observeObj.realName}}</el-col>
			  		</el-row>
			  		<el-row>
			  			<el-col :span="3" >来源：</el-col>
			  			<!--贷后 2信贷 3贷后-->
			  			<el-col :span="9" >{{observeObj.systemType ==1?'贷后':'信贷'}}</el-col>
			  			<el-col :span="3" >系统来源：</el-col>
			  			<!--disappearStatus (integer, optional): 是否失联0.否 1.是 ,-->
			  			<el-col :span="9" >{{observeObj.systemType ==1?'贷后':'信贷'}}</el-col>
			  		</el-row>
			  		<el-row>
			  			<el-col :span="3" >客户状态：</el-col>
			  			<!--disappearStatus (integer, optional): 是否失联0.否 1.是 ,-->
			  			<el-col :span="9" >{{observeObj.customerType ==0?'异常':'正常'}}</el-col>
			  			<el-col :span="4" >本人联系状态：</el-col>
			  			<!--disappearStatus (integer, optional): 是否失联0.否 1.是 ,-->
			  			<el-col :span="8" >{{observeObj.contactType ==0?'异常':'正常'}}</el-col>
			  		</el-row>
			  		<el-row>
			  			<el-col :span="3" >备注：</el-col>
			  			<!--disappearStatus (integer, optional): 是否失联0.否 1.是 ,-->
			  			<el-col :span="21" >
			  				{{122}}
			  				<p><a :href="observeObj.followFileUrl">下载附件</a></p>
			  			</el-col>
			  		</el-row>
				</div>
			</el-dialog>
			<!--erp贷后弹框--END-->
		</div>
  </div>
</template>

<script>
//	import CommonTable from '@/components/custManage/dialog/CommonTable'
import api from "@/api/index"
import Pagination from '@/components/common/Pagination'
	export default {
		props: {
	  	dialogFollow: {
	  		type: Object,
	  		default: function () {
	        return {
	        	dialogFollowVisible: false,
	        }
	      }
	  	},
	  	rowFollowId: {
	  		type: String,
	  		default: ''
	  	}
	  },
	  data () {
	    return {
		    	follow_pickerOptions:{
		          disabledDate(time) {
		            return time.getTime() >= Date.now();
		        }
	        },
		    	currentPage:1,
		  		total: 0,
		  		pageNo: 1,
	        pageSize: 10,
	        dialogFormVisible: false,
	        dialogLoan: false,
	        dialogObserve: false,
	        observeObj: {},
	        dialogLoanEnd: false,
	        dialogErp: false,
	        formLabelWidth: '80px',
	        saveFollow: false,
	        form: {
	          format: '',
	          date: '',         
	          content: ''
	        },
	        form_rules:{
	        	date:[
	        		{required:true, message: '请选择跟进日期', trigger: 'blur,change' }
	        	],
						format:[
	        		{required:true, message: '请选择跟进形式', trigger: 'change' }
	        	],
		        content:[
		        	{required:true, message: '请填写跟进内容', trigger: 'blur' }
		        ]
	        },
	        arrData: [],
	        beforeLoan_followCont:'',
	        tableData: [{
	          date: '2016-05-02',
	          name: '王小虎',
	          address: '上海市普陀区金沙江路 1518 弄'
	        }, {
	          date: '2016-05-04',
	          name: '王小虎',
	          address: '上海市普陀区金沙江路 1517 弄'
	        }, {
	          date: '2016-05-01',
	          name: '王小虎',
	          address: '上海市普陀区金沙江路 1519 弄'
	        }, {
	          date: '2016-05-03',
	          name: '王小虎',
	          address: '上海市普陀区金沙江路 1516 弄'
	        }],
	         options: [{
		          value: '选项1',
		          label: '黄金糕'
		        }, {
		          value: '选项2',
		          label: '双皮奶'
		        }],
		        value0: '',
		        value1: ''
	    }
	  },
	  
	  methods: {
	  	changeVal(val,z){
	  		console.log(val,z,123456789)
	  	},
	  	followWrap() {
	  		this.dialogFormVisible = true
	  		this.$nextTick(()=>{
	  			this.$refs['form'].resetFields()
	  		})
	  		this.form = {
          format: '',
          date: '',         
          content: ''
        }
	  	},
	  	showDifferDialog(row,followNode) {//followNode跟进环节:1.贷前 2.监测 3.贷后 4.ERP贷后
	  			console.log(row,followNode)
	  			this.observeObj = row	  			
					if(followNode == 1) {						
						this.dialogLoan = true //贷前，
						this.beforeLoan_followCont = row.followContent
					} else if (followNode == '2') {//检测				////	  				
						this.dialogObserve = true 
					} else if (followNode == '3'){//贷后						
						this.dialogLoanEnd = true //贷后
					} else if (followNode == '4'){//4.ERP贷后						
						this.dialogErp = true 	
					}
					//this.dialogErp = true 					
	  	},

	  handleSizeChange(val) {
			this.pageSize = val
			this.queryFollowList()
		},
		handleCurrentChange(val) {
			this.pageNo = val	
			this.currentPage = val
			this.queryFollowList()
		},	
		queryFollowList(){
			console.log('父组件调用子组件成功')
			api.queryFollowList({
  				pageNo:this.pageNo,
  				pageSize:this.pageSize,
  				crmCustId:this.rowFollowId
  			}).then((res) => {//followNode跟进环节:1.贷前 2.监测 3.贷后 4.ERP贷后
  				this.arrData = res.data.data
  				this.total = res.data.total
  				console.log(this.arrData ,this.total )
  			})
		},
		confirm_follow(form){
			this.$refs['form'].validate((valid) => {
				if(valid){
					this.saveFollow = true
					api.saveFollowInfo({
						crmCustInfoId:this.rowFollowId,
						followNode:'1',
						followTime:this.form.date,
						followType:this.form.format,
						followContent:this.form.content
					}).then((res) => {
						this.saveFollow = false
						this.dialogFormVisible = false
						this.queryFollowList()
		  			this.$notify({
			           title: '提示',
			           message: res.data.msg,
			           duration: 1500
			        });
		  			})
				}else{
					return false
				}
			})
			
		}
	  },
	  mounted(){
	  	console.log(this.$route,'mounted')
	  },
	  watch: {
	  	rowFollowId(newVal) {
	  		if(newVal){
	  			//this.queryFollowList()
	  		}
	  		console.log(newVal,'-----')
	  	}
	  },
	  components: {
//	  	CommonTable
			Pagination
	  }
}
</script>
<style  lang="less">
	.r_s {
		.el-table th {
				padding: 0px 0;
				line-height: 35px;
			} 
			.el-table td{
				padding: 3px 0;
			}
	}
	.order-list-wrap {
		.pagWrap {
			margin-top: 10px;
			text-align: right;
		}
		.title {
			margin-top: -40px;
			font-size: 16px;
			border-bottom: 1px solid #ccc;
    	padding-bottom: 10px;
		}
		.follow-wrap {			
			.el-date-editor.el-input, .el-date-editor.el-input__inner {
			  width: 100%;
			}
			.el-select {
				width: 100%;
			}
			.text-rt {
				    margin-top: -40px;
			}
		}
		.wrap-list {
			padding-top: 5px;
		}
		.observe {
			margin-top: -25px;
	    	padding-bottom: 8px;
	    	border-bottom: 1px solid #ccc;
		}
	}
</style>
