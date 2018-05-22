<template>
	<div class="ModifyPassWordWrap">
		<el-dialog title="" :visible="dialogPassVisible.outerVisible" width='400px'>
			<div class="title-common-wrap">
				<div>
					<span>修改密码</span>
				</div>
			</div>
			<div class="rulePassFormWrap">
				<el-form 	
				   :model="ruleForm2" 
				   label-position='left' 	
				   :rules="rules2" 
				   ref="ruleForm2" 
				   label-width="95px" class="demo-ruleForm">
				  <el-form-item label="原密码" prop="oldPass">
				    <el-input type="password" v-model="ruleForm2.oldPass" auto-complete="off"></el-input>
				  </el-form-item>
				  <el-form-item label="新密码" prop="pass">
				    <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
				  </el-form-item>
				  <el-form-item label="确认新密码" prop="checkPass">
				    <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
				  </el-form-item>				
				  <!--<el-form-item>
				    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
				    <el-button @click="resetForm('ruleForm2')">重置</el-button>
				  </el-form-item>-->
				</el-form>
			</div>
		    <!--<el-dialog
		      width="30%"
		      title="提示"
		      :visible.sync="dialogPassVisible.innerVisible"
		      append-to-body>
		      <span>确定要修改密码？</span>
		        <div slot="footer" class="dialog-footer">
		        	<el-button @click="dialogPassVisible.outerVisible = false">取 消</el-button>
		      		<el-button type="primary" @click="dialogPassVisible.innerVisible = true">确定</el-button>
		      	</div>
		    </el-dialog>-->
		    <div slot="footer" class="dialog-footer">
		      <el-button @click="hideDialog">取 消</el-button>
		      <el-button type="primary" @click="confirmPassDia">确定</el-button>
		    </div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		props: {
		  	dialogPassVisible: {
		  		type: Object,
		  		default: function () {
		        return {
		        	outerVisible: false,
	        		innerVisible: false
		        }
		      }
		  	}
		},
		data() {
			var checkOldPass = (rule, value, callback) => {
		        if (!value) {
		          return callback(new Error('原密码不能为空'));
		        } else {
		        	callback();
		        }
		    };
	        var validatePass = (rule, value, callback) => {
		        if (value === '') {
		          callback(new Error('请输入新密码'));
		        } else {
		          if (this.ruleForm2.checkPass !== '') {
		            this.$refs.ruleForm2.validateField('checkPass');
		          }
		          callback();
		        }
	      	};
		    var validatePass2 = (rule, value, callback) => {
		        if (value === '') {
		          callback(new Error('请再次输入新密码'));
		        } else if (value !== this.ruleForm2.pass) {
		          callback(new Error('两次输入密码不一致!'));
		        } else {
		          callback();
		        }
		    };
	      	return {
	        	outerVisible: false,
	        	innerVisible: false,
	        	ruleForm2: {
	        	   oldPass: '',
		           pass: '',
		           checkPass: ''		          
		        },
		        rules2: {
		        	oldPass: [		            	
		            	{ required: true, message: '请输入原密码', trigger: 'blur' },
			          	{ min: 6, max: 20, message: '长度在 6~20位', trigger: 'blur' },
			          	{ pattern:/^[a-zA-Z0-9]{6,20}$/, message: '只能为数字,字母', trigger: 'blur' },
			          	{ validator: checkOldPass, trigger: 'blur' },
		          	],
			        pass: [
			        	{ required: true, message: '请输入新密码', trigger: 'blur' },
			          	{ min: 6, max: 20, message: '长度在 6~20位', trigger: 'blur' },
			          	{ pattern:/^[a-zA-Z0-9]{6,20}$/, message: '只能为数字,字母', trigger: 'blur' },
			            { validator: validatePass, trigger: 'blur' }
			        ],
			        checkPass: [
			        	{ required: true, message: '请输入确认新密码', trigger: 'blur' },
			          	{ min: 6, max: 20, message: '长度在 6~20位', trigger: 'blur' },
			          	{ pattern:/^[a-zA-Z0-9]{6,20}$/, message: '只能为数字,字母', trigger: 'blur' },
			            { validator: validatePass2, trigger: 'blur' }
			        ]		          
		        }
	        }
	    },
	    watch: {
	    	'dialogPassVisible.outerVisible'(value) {
	    		if (value) {
	    			this.resetForm('ruleForm2')
		    		this.ruleForm2 = {
		        	   oldPass: '',
			           pass: '',
			           checkPass: ''		          
			        }
	    		}
	    	}
	    },
	    methods: {
	    	hideDialog() {
	    		this.dialogPassVisible.outerVisible = false
	    		this.ruleForm2 = {
	        	   oldPass: '',
		           pass: '',
		           checkPass: ''		          
		        }
	    	},
	    	confirmPassDia() {		        
				this.submitForm('ruleForm2')
		    },
		    submitForm(formName) {
		        this.$refs[formName].validate((valid) => {
			        if (valid) { //验证通过
			            this.checkValidate()
			        } else {
			            this.$message({//验证不通过
				            type: 'warning',
				            message: '验证不通过',
				            duration: 800
				        });
		            	return false;
		            }
		        });
		    },
		    checkValidate() {
		    	this.$confirm('此操作将修改密码, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          showClose: false,
		          type: 'warning'
		       }).then(() => {//  确定修改密码
		          	this.$message({
			            type: 'success',
			            message: '修改成功!',
			            duration: 1500
			        });
			        this.dialogPassVisible.outerVisible = false
		        }).catch(() => {//  取消修改密码
		            this.$message({
			            type: 'info',
			            message: '已取消',
			            duration: 1500
		          	});          
		        });
		    },
		    resetForm(formName) {
		        this.$nextTick(()=>{
		        	this.$refs[formName].resetFields();
		        })
		    }
		}
	}
</script>

<style lang="less" >
.ModifyPassWordWrap {
	.title-common-wrap {
		border-bottom: 1px solid #ddd;
	    /* box-shadow: 0 1px 0 #888888; */
	    line-height: 2;
	    margin-top: -40px;
	    div {
	    	span {
	    		display: inline-block;
	    		border-bottom: 3px solid #ff9900;
    			margin-bottom: -2px;
	    	}
	    }
	}
	.rulePassFormWrap {
		padding-top: 20px;
	}
	.el-dialog__body {
		padding-bottom: 0;
	}
}
</style>