<template>
 <div class="limt_money_wrap">
 	<tit-common :title='title'></tit-common>
 	<div class="limt_money_con">
 		<el-row>
			<el-form :rules="rules" ref="formLabelAlign"  :label-position="labelPosition" label-width="120px" :model="formLabelAlign">
			    <el-col class='clearfix'>
			    	<div class="left_con">
						  <el-form-item label="首页金额配置">
						   <el-select v-model="formLabelAlign.amountUnit" placeholder="">
						      <el-option label="单位：元" value="1"></el-option>					      
						    </el-select>
						  </el-form-item>
						  <el-form-item label="最小值" prop="amountMin">
						    <el-input v-model="formLabelAlign.amountMin"  @input='checkNumMin'></el-input>
						  </el-form-item>
						  <el-form-item label="最大值" prop="amountMax">
						    <el-input v-model="formLabelAlign.amountMax" @input='checkNumMax'></el-input>
						  </el-form-item>
						  <el-form-item label="刻度值" prop="amountScale">
						    <el-input v-model="formLabelAlign.amountScale" @input='checkNumSpace'></el-input>
						  </el-form-item>
						  <el-form-item label="初始值" prop="amountInitial">
						    <el-input v-model="formLabelAlign.amountInitial" @input='checkNumInitial'></el-input>
						  </el-form-item>
						<!--</el-form>-->
			  		</div>
			  	   <div class="right_con">
				  	   	<!--<el-form :label-position="labelPosition" label-width="120px" :model="formLabelAlign">-->
						  <el-form-item label="首页期限配置">
						    <el-select v-model="formLabelAlign.periodUnit" placeholder="">
						      <el-option label="单位：月" value="1"></el-option>	
						      <el-option label="单位：周" value="2"></el-option>	
						      <el-option label="单位：日" value="3"></el-option>	
						    </el-select>
						  </el-form-item>
						  <el-form-item label="最小值" prop="periodMin">
						    <el-input v-model="formLabelAlign.periodMin" @input='checkDateMin'></el-input>
						  </el-form-item>
						  <el-form-item label="最大值" prop="periodMax">
						    <el-input v-model="formLabelAlign.periodMax" @input='checkDateMax'></el-input>
						  </el-form-item>
						  <el-form-item label="刻度值" prop="periodScale">
						    <el-input v-model="formLabelAlign.periodScale" @input='checkDateSpace'></el-input>
						  </el-form-item>
						  <el-form-item label="初始值" prop="periodInitial">
						    <el-input v-model="formLabelAlign.periodInitial" @input='checkDateInitial'></el-input>
						  </el-form-item>
						<!--</el-form>-->
						<div class="saveBtn">							
							<el-button type="primary" @click="submitForm"  :loading="saveLoading">保存更新</el-button>
						</div>
			  	   </div>
			    </el-col>
			</el-form>
		</el-row>
 	</div>
 </div>
</template>

<script>
import TitCommon from '@/components/common/TitCommon'
import api from '@/api/index'
export default {
  	name: 'AMTdeadlineSet',
  	props: {	  		
//		tableData:{
//			type: Array,
//			default: function () {
//				return []
//			}
//		}
  	},
	data() {		
		var validatorMin = (rule, value, callback) => {
//	         if (!value) {
//	          return callback(new Error('请输入最小值'));
//	        }
//	           console.log(/^[0-9]*$/gi.test(value),1666666)
//	        if(/[^0-9$]/g.test(value)) {
////			  console.log(/[^0-9$]/g.test(value))
//			  return callback(new Error('请输入数字值'));
//	        } 
//	        if (!/[^0-9$]/g.test(value)) {
//	console.log(Number(value)%100 ,Number(value) >= Number(this.formLabelAlign.amountMax),66666)
        	if(Number(value)%100 != 0) {
        		return callback(new Error('请输入100的倍数'));
        	} else if (Number(value) >= Number(this.formLabelAlign.amountMax)) {
//	        		console.log(value , this.formLabelAlign.amountMax,1231)
	          	return callback(new Error('输入的最小值必须小于最大值'));
	        } else {
	        	callback();
	        }
        };
        var validatorMax = (rule, value, callback) => {
        	if(value%100 != 0) {
    		  return callback(new Error('请输入100的倍数'));
        	} else if (Number(value) < Number(this.formLabelAlign.amountMin)) {
	          	return callback(new Error('输入的最大值必须大于最小值'));
	        } else {
	        	callback();
	        }
        };
        var validatorSpace = (rule, value, callback) => {
        	 if(value%100 != 0) {
        		return callback(new Error('请输入100的倍数'));
        	} else if (Number(value) > Number(this.formLabelAlign.amountMax)) {
	          	return callback(new Error('输入的刻度值不能大于最大值'));
	        } else {
	        	callback();
	        }
        };
        var validatorInitial = (rule, value, callback) => {	        
        	if(value%100 != 0) {
        		return callback(new Error('请输入100的倍数'));
        	} else if (Number(value) > Number(this.formLabelAlign.amountMax)) {
	          	return callback(new Error('输入的初始值不能大于最大值'));
	        } else {
	        	callback();
	        }
        };
        var validatorDateMin =  (rule, value, callback) => {
//	        if (!/[^0-9$]/g.test(value)) {
//	console.log(Number(value)%100 ,Number(value) >= Number(this.formLabelAlign.amountMax),66666)
        	if(!value) {
        		return callback(new Error('不能为空'));
        	} else if (Number(value) >= Number(this.formLabelAlign.periodMax)) {
//	        		console.log(value , this.formLabelAlign.amountMax,1231)
	          	return callback(new Error('输入的最小值必须小于最大值'));
	        } else {
	        	callback();
	        }
        };
        var validatorDateMax =  (rule, value, callback) => {
        	if(!value) {
        		return callback(new Error('不能为空'));
        	} else if (Number(value) < Number(this.formLabelAlign.periodMax)) {
//	        		console.log(value , this.formLabelAlign.amountMax,1231)
	          	return callback(new Error('输入的最大值必须大于最小值'));
	        } else {
	        	callback();
	        }
        };
        var validatorDateSpace = (rule, value, callback) => {
        	 if(!value) {
        		return callback(new Error('不能为空'));
        	} else if (Number(value) > Number(this.formLabelAlign.periodMax)) {
	          	return callback(new Error('输入的刻度值不能大于最大值'));
	        } else {
	        	callback();
	        }
        };
        var validatorDateInitial = (rule, value, callback) => {
        	 if(!value) {
        		return callback(new Error('不能为空'));
        	} else if (Number(value) > Number(this.formLabelAlign.periodMax)) {
	          	return callback(new Error('输入的初始值不能大于最大值'));
	        } else {
	        	callback();
	        }
        };
	  	return {	  		
	  		title: '金额期限配置',
	  		labelPosition: 'right',
	  		saveLoading: false,
	        formLabelAlign: {
	          amountUnit: '1',//1代表元
	          amountMin: '',
	          amountMax: '',
	          amountScale: '',
	          amountInitial: '',
	          periodUnit: '1',//1，2,3代表月，周，日
	          periodMin: '',
	          periodMax: '',
	          periodScale: '',
	          periodInitial: '',	         
	        },
	        id: '',
	        rules: {
	            amountMin: [
	            	{ required: true, message: '请输入', trigger: 'blur' },
		            { validator: validatorMin, trigger: 'blur' },	
	           	],
	           	amountMax: [
	           		{ required: true, message: '请输入', trigger: 'blur' },
		            { validator: validatorMax, trigger: 'blur' },	
	           	],
	           	amountScale: [
	           	    { required: true, message: '请输入', trigger: 'blur' },
		            { validator: validatorSpace, trigger: 'blur' },		            
	           	],
	           	amountInitial: [
		            { required: true, message: '请输入', trigger: 'blur' },
		            { validator: validatorInitial, trigger: 'blur' },
	           	],
	           	periodMin: [
	           	 	{ required: true, message: '请输入', trigger: 'blur' },
		            { validator: validatorDateMin, trigger: 'blur' },
	           	],
	           	periodMax: [
	           	 	{ required: true, message: '请输入', trigger: 'blur' },
		            { validator: validatorDateMax, trigger: 'blur' },
	           	],
	           	periodScale: [
	           	 	{ required: true, message: '请输入', trigger: 'blur' },
		            { validator: validatorDateSpace, trigger: 'blur' },
	           	],
	           	periodInitial: [
	           	 	{ required: true, message: '请输入', trigger: 'blur' },
		            { validator: validatorDateInitial, trigger: 'blur' },
	           	],
	           	
            }
	  	}
	},
	mounted() {
		this.queryPeriodNewDataFn()
	},
    methods: {
    	queryPeriodNewDataFn() {
    		api.queryPeriodNewData().then((res) => {
    			if (res.data.success) {
    				const data = res.data.data
    				this.id = data.id
    				this.formLabelAlign.amountMin = data.amountMin    				
    				this.formLabelAlign.amountMax = data.amountMax
    				this.formLabelAlign.amountScale = data.amountScale
    				this.formLabelAlign.amountInitial = data.amountInitial
    				this.formLabelAlign.periodMin = data.periodMin
    				this.formLabelAlign.periodMax = data.periodMax    				
    				this.formLabelAlign.periodScale = data.periodScale
    				this.formLabelAlign.periodInitial = data.periodInitial
//  					console.log(res.data.data,this.id,456)
				} else {
					this.$notify({
			          title: '提示',
			          message: res.data.msg,
			          duration: 1500
			        });
				}	
    		})
    	},
    	savePeriodUpdateData() {
    		const parms = {}
    		Object.assign(parms,this.formLabelAlign)
    		parms.id =  this.id
//  		delete parms.periodUnit
//  		delete parms.amountUnit
//			parms.periodUnit = '12'
//			parms.amountUnit ='23'

    		console.log(parms,666666)
    		api.queryPeriodUpdateData(parms).then((res) => {
    			this.saveLoading = false    		
    			if(res.data.success) {
    				this.queryPeriodNewDataFn()
    			}
    			this.$notify({
		          title: '提示',
		          message: res.data.msg,
		          duration: 1500
		        });
    		})
    	},
    	checkNumMin(value) {
    		this.replceNumVal('amountMin',value)
    	},
    	checkNumMax(value) {
    		this.replceNumVal('amountMax',value)
    	},
    	checkNumSpace(value) {
    		this.replceNumVal('amountScale',value)
    	},
    	checkNumInitial(value) {
    		this.replceNumVal('amountInitial',value)
    	},
    	checkDateMin(value) {
    		this.replceNumVal('periodMin',value)
    	},
    	checkDateMax(value) {
    		this.replceNumVal('periodMax',value)
    	},
    	checkDateSpace(value) {
    		this.replceNumVal('periodScale',value)
    	},
    	checkDateInitial(value) {
    		this.replceNumVal('periodInitial',value)
    	},
    	replceNumVal(keys,value) {// this.$refs.newForm.validateField('code');
//  		console.log(keys,value)
    		this.$nextTick(()=>{    	//^[0-9]*$			
				this.formLabelAlign[keys] = value.replace(/[^0-9$]/g,'')
			},20)
    	},
    	submitForm() {    	
    		console.log(this.formLabelAlign,777777)    	
	        this.$refs.formLabelAlign.validate((valid) => {
	  
	        	console.log(valid,66666)
	       
	          if (valid) {
//	            alert('submit!');
				this.saveLoading = true
				this.savePeriodUpdateData()
	          } else {
	            console.log('error submit!!');
	            return false;
	          }
	        });
        },
    },
	components: {
	  	TitCommon	
	}
 }
</script>
<style scoped lang="less">
	
	.limt_money_wrap {
		.limt_money_con {
			margin-top: 20px;
		}
		.el-select {
		    width: 160px;
		}
		.saveBtn {
			text-align: right;
		}
		.el-input {
	    	width: 160px;
	    }
	    .right_con,.left_con {
	    	float: left;
	    }
	}
</style>