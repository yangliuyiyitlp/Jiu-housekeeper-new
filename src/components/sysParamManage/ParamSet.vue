<template>
 <div class="paramSet-wrap">
 	<tit-common :title='title'></tit-common>
 	<div class="paramSet-con">
 		<el-form 
 			:rules="rules"
 			label-position="left"
 			class="demo-form-inline"
 			:inline="true"
 			ref="pararmsData"   			
 			label-width="163px " 
 			:model="pararmsData">
	 		<el-row>
	 			<div class="tit-con">挂起设置</div>
	 			<div class="width-com clearfix">	 			
	 			    <el-form-item label="实名升级自动挂起时间" prop="realNameUpgrade">
					    <el-input :maxlength='4' v-model="pararmsData.realNameUpgrade" @input='checkUpgradeAutoTime'></el-input>小时
				    </el-form-item>
				    <!--<el-button class='rt' type="text" @click='updateParms("realNameUpgrade")'>更新</el-button>-->
	 			</div>
	 			<div class="width-com clearfix">	 			
	 			    <el-form-item label="申请填写自动挂起时间" prop="applicationFill">
					    <el-input :maxlength='4' v-model="pararmsData.applicationFill" @input='checkApplyAutoTime'></el-input>小时
				    </el-form-item>
				    <!--<el-button class='rt' type="text" @click='updateParms("applicationFill")'>更新</el-button>-->
	 			</div>
	 			<div class="width-com clearfix">	 			
	 			    <el-form-item label="开户自动挂起时间" prop="openAccount">
					    <el-input :maxlength='4' v-model="pararmsData.openAccount" @input='checkAccountAutoTime'></el-input>小时
				    </el-form-item>
				    <!--<el-button class='rt' type="text"  @click='updateParms("openAccount")'>更新</el-button>-->
	 			</div>
	 			<div class="width-com clearfix">	 			
	 			    <el-form-item label="面审自动挂起时间" prop="videoSigning">
					    <el-input :maxlength='4' v-model="pararmsData.videoSigning" @input='checkVideoAutoTime'></el-input>小时
				    </el-form-item>
				    <!--<el-button class='rt' type="text"  @click='updateParms("videoSigning")'>更新</el-button>-->
	 			</div>
	 			
	 		</el-row>
	 		<!--<el-row>
	 			<div class="tit-con">实名认证</div>
	 			<div class="width-com clearfix">	 			
	 			    <el-form-item label="OCR通过数值">
					    <el-input v-model="pararmsData.realNameOcr" @input='checkOcrNum'></el-input>
				    </el-form-item>
				    <el-button class='rt' type="text"  @click='updateParms("realNameOcr")'>更新</el-button>
	 			</div>
	 			<div class="width-com clearfix">	 			
	 			    <el-form-item label="活体认证通过数值">
					    <el-input v-model="pararmsData.realNameLiving" @input='checkVetifyNum'></el-input>
				    </el-form-item>
				    <el-button class='rt' type="text"  @click='updateParms("realNameLiving")'>更新</el-button>
	 			</div>	 			
	 		</el-row>-->
	 		<el-row>
	 			<div class="tit-con">提现设置</div>
	 			<div class="width-com clearfix">	 			
	 			    <el-form-item label="提现大额值" prop="withdrawCashAmount">
					    <el-input :maxlength='9' v-model="pararmsData.withdrawCashAmount" @input='checkMaxLimitMoney'></el-input>元
				    </el-form-item>
				    <!--<el-button class='rt' type="text"  @click='updateParms("withdrawCashAmount")'>更新</el-button>-->
	 			</div>	 					
	 		</el-row>
	 		<el-row>
	 			<div class="tit-con">拒单设置</div>
	 			<div class="width-com clearfix">	 			
	 			    <el-form-item label="拒单天数间隔" prop="refuseDay">
					    <el-input :maxlength='6' v-model="pararmsData.refuseDay" @input='checkRefuseDays'></el-input>天
				    </el-form-item>
				    <!--<el-button class='rt' type="text"  @click='updateParms("refuseDay")'>更新</el-button>-->
	 			</div>	 					
	 		</el-row>
	 		<el-row>	 			
	 			<div class="width-com clearfix">	 			
	 			    <el-form-item label="订单有效期" prop="orderExpiry">
					    <el-input :maxlength='6' v-model="pararmsData.orderExpiry" @input='checkOrderExpiry'></el-input>天
					    <div style="margin-top: 15px;">				    	
					    	<el-button class='rt' type="primary"  @click='updateParms' :loading = 'orSave'>保存更新</el-button>
					    </div>
				    </el-form-item>
				    
	 			</div>	 					
	 		</el-row>
 		</el-form>
 	</div>
 </div>
</template>

<script>
import TitCommon from '@/components/common/TitCommon'
import api from "@/api/index"
export default {
    name: 'paramSet',
    data() {
    	var realNameUpgradeCheck = (rule, value, callback) => {    		
        	 if(Number(value) <= 0) {
        		return callback(new Error('必须是大于0的正整数'));
        	} else {
	        	callback();
	        }
        };
        var applicationFillCheck = (rule, value, callback) => {    		
        	 if(Number(value) <= 0) {
        		return callback(new Error('必须是大于0的正整数'));
        	} else {
	        	callback();
	        }
        };
        var openAccountCheck = (rule, value, callback) => {    		
        	 if(Number(value) <= 0) {
        		return callback(new Error('必须是大于0的正整数'));
        	} else {
	        	callback();
	        }
        };
        var videoSigningCheck = (rule, value, callback) => {    		
        	 if(Number(value) <= 0) {
        		return callback(new Error('必须是大于0的正整数'));
        	} else {
	        	callback();
	        }
        };
        var withdrawCashAmountCheck = (rule, value, callback) => {    		
        	 if(Number(value) <= 0) {
        		return callback(new Error('必须是大于0的正整数'));
        	} else {
	        	callback();
	        }
        };
        var refuseDayCheck = (rule, value, callback) => {    		
        	 if(Number(value) <= 0) {
        		return callback(new Error('必须是大于0的正整数'));
        	} else {
	        	callback();
	        }
        };
        var videoSigningCheck = (rule, value, callback) => {    		
        	 if(Number(value) <= 0) {
        		return callback(new Error('必须是大于0的正整数'));
        	} else {
	        	callback();
	        }
        };
    	return {
    		title: '参数配置',
    		id: '',
    		orSave: false,
    		pararmsData: {
    			realNameUpgrade: '',
    			applicationFill: '',
    			openAccount: '',
    			videoSigning: '',
//  			realNameOcr: '',
//  			realNameLiving: '',
    			withdrawCashAmount: '',
    			refuseDay: '',
    			orderExpiry: ''
    		},
    		rules: {
	            realNameUpgrade: [
	            	{ required: true, message: '请输入', trigger: 'blur' },
		            { validator: realNameUpgradeCheck, trigger: 'blur,change' },	
	           	],
	           	applicationFill: [
	            	{ required: true, message: '请输入', trigger: 'blur' },
		            { validator: applicationFillCheck, trigger: 'blur,change' },	
	           	],
	           	openAccount: [
	            	{ required: true, message: '请输入', trigger: 'blur' },
		            { validator: openAccountCheck, trigger: 'blur,change' },	
	           	],
	           	videoSigning: [
	            	{ required: true, message: '请输入', trigger: 'blur' },
		            { validator: videoSigningCheck, trigger: 'blur,change' },	
	           	],
	           	withdrawCashAmount: [
	            	{ required: true, message: '请输入', trigger: 'blur' },
		            { validator: withdrawCashAmountCheck, trigger: 'blur,change' },	
	           	],
	           	refuseDay: [
	            	{ required: true, message: '请输入', trigger: 'blur' },
		            { validator: refuseDayCheck, trigger: 'blur,change' },	
	           	],
	           	orderExpiry: [
	            	{ required: true, message: '请输入', trigger: 'blur' },
		            { validator: videoSigningCheck, trigger: 'blur,change' },	
	           	]
            }
    	}
    },
    mounted() {
    	this.getData()
//  	console.log(this.$route.query,1111111)
    },
    methods:{
    	getData() {
    		api.queryNewData().then((res)=> {
    			if (res.data.success) {
    				const data = res.data.data
    				this.id = data.id
    				this.pararmsData.realNameUpgrade = data.realNameUpgrade    				
    				this.pararmsData.applicationFill = data.applicationFill
    				this.pararmsData.openAccount = data.openAccount
    				this.pararmsData.videoSigning = data.videoSigning
//  				this.pararmsData.realNameOcr = data.realNameOcr
//  				this.pararmsData.realNameLiving = data.realNameLiving    				
    				this.pararmsData.withdrawCashAmount = data.withdrawCashAmount
    				this.pararmsData.refuseDay = data.refuseDay
    				this.pararmsData.orderExpiry = data.orderExpiry
    					console.log(res.data.data,this.id,456)
				} else {
					this.$notify({
			          title: '提示',
			          message: res.data.msg,
			          duration: 1500
			        });
				}	
    		})
    	},
    	checkUpgradeAutoTime(value){
    		this.replceNumVal('realNameUpgrade',value)
    	},
    	checkApplyAutoTime(value) {
    		this.replceNumVal('applicationFill',value)
    	},
    	checkAccountAutoTime(value) {
    		this.replceNumVal('openAccount',value)
    	},
    	checkVideoAutoTime(value) {
    		this.replceNumVal('videoSigning',value)
    	},
//  	checkOcrNum(value) {
//  		this.replceNumVal('realNameOcr',value)
//  	},
//  	checkVetifyNum(value) {
//  		this.replceNumVal('realNameLiving',value)
//  	},
    	checkMaxLimitMoney(value) {
    		this.replceNumVal('withdrawCashAmount',value)
    	},
    	checkRefuseDays(value) {
    		this.replceNumVal('refuseDay',value)
    	},
    	checkOrderExpiry(value) {
    		this.replceNumVal('orderExpiry',value)
    	},
    	replceNumVal(keys,value) {// this.$refs.newForm.validateField('code');
//  		console.log(keys,value)
    		this.$nextTick(()=>{    	//^[0-9]*$			
				this.pararmsData[keys] = value.replace(/[^0-9$]/g,'')
			},20)
    	},
    	updateParms() {    	
    		console.log(this.formLabelAlign,777777)    	
	        this.$refs.pararmsData.validate((valid) => {
	  
	        	console.log(valid,66666)
	       
	          if (valid) {
//	            alert('submit!');
				
				this.saveQueryNewUpdateData()
	          } else {
	            console.log('error submit!!');
	            return false;
	          }
	        });
        },
    	saveQueryNewUpdateData() {  
    		this.orSave = true
    		let parms = {}
//  		parms[keyName] = this.pararmsData[keyName]
    		parms = Object.assign({},this.pararmsData)
    		parms.id =   this.id
    		console.log(parms)
			api.queryNewUpdateData(parms).then((res)=>{
				this.orSave = false
				if (res.data.success) {    				
			        this.getData()
				}
				this.$notify({
		          	title: '提示',
		          	message: res.data.msg,
		          	duration: 1500
		        })
//				console.log(res,12313132)
//				console.log(parms,12313132)
			})
    	},
    	queryNewUpdateData() {//更新
    		
    	}
    },
    components: {
	  	TitCommon	
	}

 }
</script>
<style lang='less'>
	.paramSet-wrap {
		.paramSet-con {
			padding-top: 20px;
			.tit-con {
				color: #000;
			    font-size: 16px;
				font-weight: 700;
			    font-style: italic;
			    padding: 10px 0 20px;
			}
			.width-com {
				width: 400px;
				    /*padding-bottom: 10px;*/
			}
			.el-form-item {
				margin-bottom: 20px;
			}
			.el-form-item__label, .el-form-item__content  {
			    line-height: 30px;
			}
			.el-input input.el-input__inner {
				height: 30px;
			}
			.el-button {
				/*padding: 9px 0;*/
			}
		}
		.demo-form-inline {
			.el-input {		
			    width: 140px;
		    }
		}
	}
</style>
