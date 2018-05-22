<template>
 <div class="dictionary-wrap">
 	<tit-common :title='title'></tit-common>
 	<div class="dictionary-con"> 
 		<el-button type="primary" @click="addbigClass()">新增大类</el-button>
 		<div class="tables">
 			<el-table
			    :data="tableData3"
			    height="300"
			    border
			    style="width: 100%">
			    <el-table-column
			    	width='70px'
			    	:show-overflow-tooltip="true"
			    	align='center'
			    	label="序号"
      				type="index">
    			</el-table-column>
			    <el-table-column
			        prop="name"
			        align='center'
			      	:show-overflow-tooltip="true"
			      	label="大类名称">
			      	<template slot-scope="scope">
				        <el-button
				        	@click.native.prevent="addDetail(scope)"
				          	type="text"
				          	size="small">
				          	{{scope.row.name}}
				        </el-button>
			      	</template>
			    </el-table-column>
			    <el-table-column
			    	align='center'
			    	:show-overflow-tooltip="true"
			      	prop="price"
			      	label="大类值"
			      	>
			    </el-table-column>
			    <el-table-column
			    	:show-overflow-tooltip="true"
			    	align='center'
			      	prop="status"
			     	label="状态">
			    </el-table-column>
			    <el-table-column
			    	:show-overflow-tooltip="true"
			    	align='center'
			      	prop="code"
			     	label="编码">
			    </el-table-column>
			    <el-table-column
			    	:show-overflow-tooltip="true"
			    	align='center'
			      	label="操作">
			      <template slot-scope="scope">
			        <el-button
			         	@click.native.prevent="modifyData(scope)"
			          	type="text"
			          	size="small">
			          	修改
			        </el-button>
			      </template>
			    </el-table-column>
			</el-table>
 		</div>
 		<div class="pad20 alignCen">
 			<pagination 				
				:currentPage = 'currentPage'
				:total = 'total'
				@handleSizeChange = 'handleSizeChange'
				@handleCurrentChange = 'handleCurrentChange'
 				> 				
 			</pagination>
 		</div>
 		<div>
 			<!--新增大类修改 ---SRATR---->
 			<el-dialog :title="bigClassTitle" class="dialog-wrap" :visible.sync="dialogFormVisible" width='400px' @close="addDiaClose">
			    <el-form :model="form" ref="form" :rules="form_rules">
				    <el-form-item label="大类名称" :label-width="formLabelWidth" required prop="name">
				      <el-input v-model="form.name" auto-complete="off"></el-input>
				    </el-form-item>
				    <el-form-item label="大值类" :label-width="formLabelWidth" required prop="price">
				      <el-input v-model="form.price" auto-complete="off"></el-input>
				    </el-form-item>
				    <el-form-item label="编码" :label-width="formLabelWidth" required prop="code">
				      <el-input v-model="form.code" auto-complete="off"></el-input>
				    </el-form-item>
			    </el-form>
			    <!-- <el-dialog
			        width="300px"
			        title="提示"
			        :visible.sync="innerVisible"
			        append-to-body>
		     	    <span style="color: #e6a23c;"><i class="el-icon-warning"></i>确定是否要修改？</span>
			        <div slot="footer" class="dialog-footer">
				    	<el-button @click="innerVisible = false">取 消</el-button>
				    	<el-button type="primary" @click="closeInnerVisible"  :loading="saveLoading">确 定</el-button>
				    </div>
		    	</el-dialog> -->
			  	<div slot="footer" class="dialog-footer">
				    <el-button @click="dialogFormVisible = false">取 消</el-button>
				    <el-button type="primary" :loading="buttonLoading"  @click="updateDictionary()" >确 定</el-button>
			  	</div>
			</el-dialog>
			<!--新增大类修改 ---END---->
 		</div>
 		<div class="addDetail">
 			<!--新增明细 ---START---->
 			<!--v-for='(value,index) in tableData3' ref="'detail' + index" :id="'detail' + index"--> 
 			<div class="detail-wrap"  v-show='orShowDetail'>
 				<div class="m20"><el-button type="primary" @click='showDetail'>新增明细</el-button></div>
 				<el-table
				    :data="detailData"
				    height="300"
				    border
				    style="width: 100%">
				    <el-table-column
				    	width='70px'
				    	:show-overflow-tooltip="true"
				    	align='center'
				    	label="序号"
	      				type="index">
	    			</el-table-column>
				    <el-table-column
				        prop="name"
				        align='center'
				      	:show-overflow-tooltip="true"
				      	label="明细名称">
				      	<!--<template slot-scope="scope">
					        <el-button
					        	@click.native.prevent="addDetail(scope)"
					          	type="text"
					          	size="small">
					          	{{scope.row.name}}
					        </el-button>
				      	</template>-->
				    </el-table-column>
				    <el-table-column
				    	align='center'
				    	:show-overflow-tooltip="true"
				      	prop="price"
				      	label="明细值"
				      	>
				    </el-table-column>
				    <el-table-column
				    	:show-overflow-tooltip="true"
				    	align='center'
				      	prop="status"
				     	label="状态">
				    </el-table-column>
				    <el-table-column
				    	:show-overflow-tooltip="true"
				    	align='center'
				      	prop="detailCode"
				     	label="编码">
				    </el-table-column>
				    <el-table-column
				    	:show-overflow-tooltip="true"
				    	align='center'
				      	prop="address"
				      	label="操作">
				      <template slot-scope="scope">
				        <el-button	
				        	@click.native.prevent="modifyDetData(scope)"
				          	type="text"
				          	size="small">
				          	修改
				        </el-button>
				        <el-button				         
				          	type="text"
				          	v-if="scope.row.status==1"
				          	size="small"
				          	@click.native.prevent="detailClose(scope,'停用')">
				          	停用
				        </el-button>
				        <el-button				         
				          	type="text"
				          	size="small" 
				          	v-if="scope.row.status==0"
				          	@click.native.prevent="detailOpen(scope,'启用')"
				          	>
				          	启用
				        </el-button>
				      </template>
				    </el-table-column>
				</el-table>
				<div>
					<el-dialog :title="detailTitle" class="dialog-wrap" :visible.sync="detailDialogFormVisible" width='400px' @close="addDiaClose2">
					    <el-form :model="detailForm" ref="detailForm" :rules="detailForm_rules">
						    <el-form-item label="明细名称" :label-width="formLabelWidth" prop="name2">
						      <el-input v-model="detailForm.name2" auto-complete="off"></el-input>
						    </el-form-item>
						    <el-form-item label="明细值" :label-width="formLabelWidth" prop="price2">
						      <el-input v-model="detailForm.price2" auto-complete="off"></el-input>
						    </el-form-item>
						    <el-form-item label="编号" :label-width="formLabelWidth" prop="detailCode">
						      <el-input v-model="detailForm.detailCode" auto-complete="off"></el-input>
						    </el-form-item>
					    </el-form>
					    
					  	<div slot="footer" class="dialog-footer">
						    <el-button @click="detailDialogFormVisible = false">取 消</el-button>
						    <el-button type="primary" @click="updateModifyDetail(detailForm)">确 定</el-button>
					  	</div>
					</el-dialog>
				</div>
 			</div>
 			<!--新增明细 ---END---->
 		</div>
 	</div>
 </div>
</template>

<script>
import api from '@/api/index.js'	
import TitCommon from '@/components/common/TitCommon'
import Pagination from '@/components/common/Pagination'
export default {
    name: 'paramSet',
    data() {
    	return {
    		buttonLoading:false,
    		title: '数据字典',    		
    		tableData3: [],
    		currentPage:1,
	  		total: 0,
	  		pageNo: 1,
	        pageSize: 10,
	        currentPage2:1,
	  		total2: 0,
	  		pageNo2: 1,
	        pageSize2: 10,
	        dialogFormVisible: false,
	        innerVisible: false,
	        form: {
	          name: '',
	          price: '',
	          code:''
	        },
	        form_rules:{
	        	name:[
	        		{required:true,message: '请输入大类名称', trigger: 'blur,change' }
	        	],
	        	price:[
	        		{required:true,message: '请输入大类值', trigger: 'blur,change' }
	        	],
	        	code:[
	        		{required:true, message: '请输入编码', trigger: 'blur,change' }
	        	]
	        },
	        saveLoading: false,
	        formLabelWidth: '80px',
	        detailData: [],
	        detailDialogFormVisible: false,
	        detailForm: {
	          name2: '',
	          price2: '',
	          detailCode:'',
	          status:1
	        },
	        detailForm_rules:{
	        	name2:[
	        		{required:true,message: '请输入小类名称', trigger: 'blur,change' }
	        	],
	        	price2:[
	        		{required:true,message: '请输入小类值', trigger: 'blur,change' }
	        	],
	        	detailCode:[
	        		{required:true, message: '请输入编码', trigger: 'blur,change' }
	        	]
	        },
	        detInnerVisible:false,
	        saveDetLoading: false,
	        bigClassTitle:'',
	        detailTit: '保存',
	        detailTitle: '',
	        orShowDetail: false,
	        maxid:'',
	        minid:'', //小类id
	        dictionaryId:'' //新增小类时传的大类id
    	}
    },
    methods:{

    	addbigClass(){
    		this.dialogFormVisible = true;
    		this.bigClassTitle ='新增大类'
    		this.maxid='';
    	},
    	modifyData(scope) {
    		this.bigClassTitle ='修改大类'
    		this.form = Object.assign(this.form, scope.row)
    		this.maxid =  scope.row.id
    		// this.form.name = row.name
    		// this.form.price = row.price
    		this.dialogFormVisible = true
//  		console.log(row)

    	},
    	addDiaClose(){
			// console.log("addDiaClose=====")
			Object.assign(this.form,{
	  			name: '',
		        price: '',
		        code:''
	  		})
	  		this.$nextTick(()=>{
	  			this.$refs.form.clearValidate();	
	  		})
		},
		addDiaClose2(){
			// console.log("addDiaClose=====")
			Object.assign(this.detailForm,{
	  			name2: '',
	            price2: '',
	            detailCode:''
	  		})
	  		this.$nextTick(()=>{
	  			this.$refs.detailForm.clearValidate();	
	  		})
		},
    	statusReplace(arry){
    		if(arry){
    			for(let i in arry){
	    			if(arry[i].status == 1){
	    				arry[i].status = '可用'
	    			}else if(arry[i].status == 0){
	    				arry[i].status = '停用'
	    			}
	    		}
    		}
    		return arry
    	},
    	queryPageDictionary(){
    		api.queryPageDictionary({
    			pageNo:this.pageNo,
    			pageSize:this.pageSize
    		}).then((res) =>{
				if (res.data.code==1) {
					this.tableData3 = res.data.data
					this.tableData3 = this.statusReplace(this.tableData3)
					console.log(this.tableData3)
					this.total = res.data.total
				}
			})
    	},
    	handleSizeChange(val) {
			this.pageSize = val  
			this.queryPageDictionary()
		},
		handleCurrentChange(val) {
			this.pageNo = val 	
			this.currentPage = val
			this.queryPageDictionary()
		},
		handleSizeChange2(val) {
			this.pageSize2 = val
			//this.queryBannerList();
		},
		handleCurrentChange2(val) {
			this.pageNo2 = val	
			this.currentPage2 = val
			//this.queryBannerList();
		},	
    	updateDictionary() { //确认新增,修改大类
    		this.$refs['form'].validate((valid)=>{
    			if(valid){
    				this.buttonLoading = true
    				api.updateDictionary({
    					id:this.maxid,
    					name:this.form.name,
    					code:this.form.code,
    					price:this.form.price
    				}).then((res) =>{
    					if (res.data.code==1) {
    						this.$message.success(res.data.msg);
    						this.dialogFormVisible = false
    						this.queryPageDictionary()
    					}else {
			 				this.$notify({
					           title: '提示',
					           message: res.data.msg,
					           duration: 1500
					        });
			 			}
    				})
    				this.buttonLoading = false
    			}
    		})
    	},
    	updateDictionaryDetail(){
    		this.buttonLoading = true
    		api.updateDictionaryDetail({
				id:this.minid,
				dictionaryId:this.dictionaryId,
				name:this.detailForm.name2,
				detailCode:this.detailForm.detailCode,
				price:this.detailForm.price2,
				status:this.detailForm.status,
			}).then((res) =>{
				if (res.data.code==1) {
					this.$message.success(res.data.msg);
					this.detailDialogFormVisible = false
					api.queryPageDictionaryDetail({
		    			pageNo:this.pageNo2,
		    			pageSize:this.pageSize2,
		    			dictionaryId:this.dictionaryId
		    		}).then((res) =>{
						if (res.data.code==1) {
							this.detailData = res.data.data
							this.detailData = this.statusReplace(this.detailData)
							console.log(this.detailData)
						}
					})
				}else {
	 				this.$notify({
			           title: '提示',
			           message: res.data.msg,
			           duration: 1500
			        });
	 			}
			})
			this.buttonLoading = false
    	},
    	updateModifyDetail(detailForm){
    		this.$refs['detailForm'].validate((valid)=>{
    			if(valid){
    				this.updateDictionaryDetail()
    			}
    		})
    	},
    	closeInnerVisible() {
    		
    		this.innerVisible = false
    		this.saveLoading = true
    	},
    	addDetail(scope) { //根据大类id查询小类列表
    		this.orShowDetail = true
    		api.queryPageDictionaryDetail({
    			pageNo:this.pageNo2,
    			pageSize:this.pageSize2,
    			dictionaryId:scope.row.id
    		}).then((res) =>{
				if (res.data.code==1) {
					this.detailData = res.data.data
					this.detailData = this.statusReplace(this.detailData)
					this.dictionaryId = scope.row.id
					console.log(this.dictionaryId,'this.dictionaryId')
				}
			})
    		//this.detailData = scopeds
//  		this.$refs['detail' +scopeds.$index ].style.display = 'block'
//document.getElementById('detail' + scopeds.$index).style.display = 'block'
//  		console.log(this.$ref['detail' +scopeds.$index ])
    	},
    	showDetail() {//新增明细
    		this.detailTit = '保存'
	        this.detailTitle = '新增的内容'
    		this.detailDialogFormVisible = true
    		this.minid ='';    		
    		console.log(12313122332)
    		console.log(this.dictionaryId,'this.dictionaryId')
    	},
    	closeDetDialogFormVisible() {
    		this.detInnerVisible = true
    	},
    	closeDetInnerVisible() {
    		this.detInnerVisible = false
    		this.saveDetLoading = false
    		this.detailDialogFormVisible = false
    	},
    	detailClose(scope,b){ //停用
    		this.minid = scope.row.id
    		this.dictionaryId = scope.row.dictionaryId
    		this.$confirm('确认停用?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning',
	        }).then(() => {
	        	this.detailForm.status = 0
	         	this.updateDictionaryDetail()
	        })
    	},
    	detailOpen(scope,b){ //启用
    		this.minid = scope.row.id
    		this.dictionaryId = scope.row.dictionaryId
    		this.$confirm('确认启用?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning',
	        }).then(() => {
	        	this.detailForm.status = 1
	         	this.updateDictionaryDetail()
	        })
    	},
    	modifyDetData(scope,b) { 
    		//this.detailForm.name = scope.row.name
    		//this.detailForm.desc = scope.row.address
    		this.detailForm = {
    			detailCode:scope.row.detailCode,
    			dictionaryId:scope.row.dictionaryId,
    			id:scope.row.id,
    			name2:scope.row.name,
    			price2:scope.row.price,
    			status:scope.row.status
    		}
    		this.minid = scope.row.id
    		this.dictionaryId = scope.row.dictionaryId
    		if(b=="停用"){
    			this.detailForm.status = 0
    		}else{
    			this.detailForm.status = 1
    		}
    		this.detailDialogFormVisible = true
    		this.detailTit = '修改'
	        this.detailTitle = '修改的内容'
    	}
    	
    },
    components: {
	  	TitCommon,
	  	Pagination	
	},
	mounted(){
		this.queryPageDictionary()
	}

 }
</script>
<style  lang='less'>
	.dictionary-wrap {
		.dictionary-con {
			padding-top: 20px;
			.tit-con {
				color: #000;
			    font-size: 16px;
				font-weight: 700;
			    font-style: italic;
			}
			.tables {
				padding-top: 15px;
				.el-table td {
					padding: 6px 0;
				}
				.el-table th {
				 	padding: 10px 0;
				}
			}
			.dialog-wrap {
				.el-input  {				
					width: 290px;
				}
			}
		}
		.detail-wrap {
			/*display: none;*/
			.m20 {
				padding: 20px 0;	
			}	
			.el-table td {
				padding: 6px 0;
			}
			.el-table th {
			 	padding: 10px 0;
			}
		}
	
	}
</style>
