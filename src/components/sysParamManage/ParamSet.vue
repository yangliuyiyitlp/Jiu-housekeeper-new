<template>
 <div class="paramSet-wrap">
 	<tit-common :title='title'></tit-common>
 	<div class="paramSet-con">
 		<el-form 
 			label-position="left"
 			class="demo-form-inline"
 			:inline="true"
 			ref="pararmsData"   			
 			label-width="153px" 
 			:model="pararmsData">
	 		<el-row>
	 			<div class="tit-con">挂起设置</div>
	 			<div class="width-com clearfix">	 			
	 			    <el-form-item label="实名升级自动挂起时间">
					    <el-input v-model="pararmsData.realNameUpgrade" @input='checkUpgradeAutoTime'></el-input>小时
				    </el-form-item>
				    <el-button class='rt' type="text" @click='updateParms("realNameUpgrade")'>更新</el-button>
	 			</div>
	 			<div class="width-com clearfix">	 			
	 			    <el-form-item label="申请填写自动挂起时间">
					    <el-input v-model="pararmsData.applicationFill" @input='checkApplyAutoTime'></el-input>小时
				    </el-form-item>
				    <el-button class='rt' type="text" @click='updateParms("applicationFill")'>更新</el-button>
	 			</div>
	 			<div class="width-com clearfix">	 			
	 			    <el-form-item label="开户自动挂起时间">
					    <el-input v-model="pararmsData.openAccount" @input='checkAccountAutoTime'></el-input>小时
				    </el-form-item>
				    <el-button class='rt' type="text"  @click='updateParms("openAccount")'>更新</el-button>
	 			</div>
	 			<div class="width-com clearfix">	 			
	 			    <el-form-item label="视频签约自动挂起时间">
					    <el-input v-model="pararmsData.videoSigning" @input='checkVideoAutoTime'></el-input>小时
				    </el-form-item>
				    <el-button class='rt' type="text"  @click='updateParms("videoSigning")'>更新</el-button>
	 			</div>
	 			
	 		</el-row>
	 		<el-row>
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
	 		</el-row>
	 		<el-row>
	 			<div class="tit-con">提现设置</div>
	 			<div class="width-com clearfix">	 			
	 			    <el-form-item label="提现大额值">
					    <el-input v-model="pararmsData.withdrawCashAmount" @input='checkMaxLimitMoney'></el-input>元
				    </el-form-item>
				    <el-button class='rt' type="text"  @click='updateParms("withdrawCashAmount")'>更新</el-button>
	 			</div>	 					
	 		</el-row>
	 		<el-row>
	 			<div class="tit-con">拒单设置</div>
	 			<div class="width-com clearfix">	 			
	 			    <el-form-item label="拒单天数间隔">
					    <el-input v-model="pararmsData.refuseDay" @input='checkRefuseDays'></el-input>天
				    </el-form-item>
				    <el-button class='rt' type="text"  @click='updateParms("refuseDay")'>更新</el-button>
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
    	return {
    		title: '参数配置',
    		id: '',
    		pararmsData: {
    			realNameUpgrade: '',
    			applicationFill: '',
    			openAccount: '',
    			videoSigning: '',
    			realNameOcr: '',
    			realNameLiving: '',
    			withdrawCashAmount: '',
    			refuseDay: ''
    		}
    	}
    },
    mounted() {
    	this.getData()
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
    				this.pararmsData.realNameOcr = data.realNameOcr
    				this.pararmsData.realNameLiving = data.realNameLiving    				
    				this.pararmsData.withdrawCashAmount = data.withdrawCashAmount
    				this.pararmsData.refuseDay = data.refuseDay
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
    	checkOcrNum(value) {
    		this.replceNumVal('realNameOcr',value)
    	},
    	checkVetifyNum(value) {
    		this.replceNumVal('realNameLiving',value)
    	},
    	checkMaxLimitMoney(value) {
    		this.replceNumVal('withdrawCashAmount',value)
    	},
    	checkRefuseDays(value) {
    		this.replceNumVal('refuseDay',value)
    	},
    	replceNumVal(keys,value) {// this.$refs.newForm.validateField('code');
//  		console.log(keys,value)
    		this.$nextTick(()=>{    	//^[0-9]*$			
				this.pararmsData[keys] = value.replace(/[^0-9$]/g,'')
			},20)
    	},
    	updateParms(keyName) {    		
    		const parms = {}
    		parms[keyName] = this.pararmsData[keyName]
    		parms.id =   this.id
			api.queryNewUpdateData(parms).then((res)=>{
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
			}
			.el-form-item {
				margin-bottom: 10px;
			}
			.el-form-item__label, .el-form-item__content  {
			    line-height: 30px;
			}
			.el-input input.el-input__inner {
				height: 30px;
			}
			.el-button {
				padding: 9px 0;
			}
		}
		.demo-form-inline {
			.el-input {		
			    width: 140px;
		    }
		}
	}
</style>
