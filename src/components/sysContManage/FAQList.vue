<template>
 <div class="allCustList">
 	<TitCommon :title='title'></TitCommon>
 	<el-row  type="flex" >
	  <el-col  class="searchbox">
	  		<el-form :inline="true" :model="formInline" class="demo-form-inline">
	            <el-form-item label="问题">
			    	<el-input
					    placeholder="输入问题"
					    v-model.trim="formInline.question" :maxlength="50">
				    </el-input>
			    </el-form-item>
			    <el-form-item label="状态">
				    <el-select v-model="formInline.status" placeholder="请选择状态">
				    <el-option
				      v-for="item in states"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				  </el-select>
			    </el-form-item>
			    <el-form-item>
	    			<el-button type="primary" @click="search()">查询</el-button>
	    			<el-button type="primary" @click="add()">新增</el-button>
	    			<el-button type="info" @click="viewH5()">预览H5</el-button>
	  			</el-form-item>
			</el-form>
	  </el-col>
	</el-row>
 	<div class="custListWrap">
 		<div class="table-wrap mrtop20">
 			<el-table
		      :data="tableData"
		      border
		      style="width: 100%">
		      <el-table-column type="index"  width="60" label="序号" ></el-table-column>
		      <el-table-column
		        :show-overflow-tooltip="true"
		        prop="data"
		        label="问题"
		        width="300">
		      </el-table-column>
		      <el-table-column
		        :show-overflow-tooltip="true"
		        prop="result"
		        label="答案">
		        <template  slot-scope="scope">
		            <el-popover
					  placement="top-start"
					  title="答案"
					  width="300"
					  trigger="hover">
					  <div v-html="scope.row.result" style="word-break:break-all;"></div>
					  <span class="highLight_cursor" slot="reference">查看答案</span>
					</el-popover>
		       </template>
		      </el-table-column>
		      <el-table-column
		        :show-overflow-tooltip="true"
		        prop="status"
		        label="状态">
		        <template slot-scope="scope">
		         	{{ scope.row.status==1?'有效':'无效'}}
		         </template>
		      </el-table-column>
		      <el-table-column
		        :show-overflow-tooltip="true"
		        prop="creator"
		        label="发布人">
		      </el-table-column>
		      <el-table-column
		        :show-overflow-tooltip="true"
		        prop="createTime"
		        label="发布时间">
		      </el-table-column>
		      <el-table-column
		        :show-overflow-tooltip="true"
		        prop="reorder"
		        label="排序">
		      </el-table-column>
		      <el-table-column
		        :show-overflow-tooltip="true"
		        prop="date"
		        label="操作">
		        <template slot-scope="scope">
		           	<el-button type="primary" @click="modify(scope.row)" size="mini">修改</el-button>
	           		<el-button type="success" @click="delete_s(scope.row)" v-if='scope.row.status==1' size="mini">删除</el-button>
		        </template>
		      </el-table-column>
		    </el-table>		
 		</div>
 		<div class="pad20 alignCen">
 			<pagination 				
				:currentPage = 'currentPage'
				:myPageSizes = 'pageSize'
				:total = 'total'
				@handleSizeChange = 'handleSizeChange'
				@handleCurrentChange = 'handleCurrentChange'
 				> 				
 			</pagination>
 		</div>
 	</div>
 	<el-dialog :title="addModify_title" :visible.sync="question_DialogVisible" width="50%"   @close="addDiaClose" :close-on-click-modal ='false'>
 		<el-form label-width="130px" ref="addForm" :model="addForm" class="demo-form-inline" :rules="addForm_rules">
	        <el-form-item label="问题" prop="data"  >
	           <el-input  v-model="addForm.data" :maxlength="50" @input="activityNameFn"></el-input>
	        </el-form-item>
	        <el-form-item label="答案" prop="result"  >
	        	<div class="edit">
	        		<editor 
				ref='edit'
				id="editor_id"  width="300px" :minHeight="100" :content="addForm.result"
	            pluginsPath="static/kindEditor/plugins/"
	            :allowImageUpload='true'
	            :loadStyleMode="false"
	            :uploadJson = 'uploadJson'
	            @on-content-change="onContentChange"></editor>
	        	</div>
				
	        </el-form-item>
	        <el-form-item label="状态" prop="status"  >
	           <el-select v-model="addForm.status" placeholder="选择状态" >
	            	<el-option v-for="item in states2" :key="item.name" :label="item.label" :value="item.value" ></el-option>
	           </el-select>
	        </el-form-item>
	        <el-form-item label="排序数字" prop="reorder"  >
	            <el-input-number v-model="addForm.reorder"  :min="0" :max="999999999" label="描述文字"></el-input-number>
	        </el-form-item>
	    </el-form>
	    <div slot="footer" class="dialog-footer">
	    	<el-button type="primary" :loading="buttonLoading" @click="confirm_add('addForm')">确认</el-button>
	    	<el-button @click="cancel_addModify()">取消</el-button>
    	</div>
 	</el-dialog>
 	<el-dialog title="查看链接" :visible.sync="link_DialogVisible" width="35%" >
 		<p>链接地址：<a  class="highLight_cursor"  @click="goNewPage(imglink)" >{{imglink}}</a></p>
 		<input  class="hidden_input" type="text" id="imglink"  v-model="imglink" />
 		<el-button type="primary"  @click="copyLink('imglink')" class="mrtop20">复制链接</el-button>
 		<div slot="footer" class="dialog-footer">
 		  <el-button @click="cancel_lookLink()">取消</el-button>
 		</div>
 	</el-dialog>
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
  		buttonLoading:false,
  		title: '常见问题',
  		question_DialogVisible:false,
  		link_DialogVisible:false,
  		uploadUrl:'',
  		currentPage:1,
  		total: 1,
  		pageNo: 1,
        pageSize: 10,
        tableData: [],
        formInline:{
        	question:'',
        	status:''
        },
        states:[
        	{
        		label:'全部',
        		value:''
        	},
        	{
        		label:'有效',
        		value:'1'
        	},
        	{
        		label:'无效',
        		value:'0'
        	}
        ],
        states2:[
        	{
        		label:'有效',
        		value:'1'
        	},
        	{
        		label:'无效',
        		value:'0'
        	}
        ],
        addForm:{
        	data:'Q：',
			result:'',
			status:'',
			reorder:''
        },
        addForm_rules:{
        	data:[
	        		{required:true, max:50,message: '请输入标题', trigger: 'blur' }
	        	],
			
			status:[
	        		{required:true, message: '请选择状态', trigger: 'blur' }
	        	],
	        result:[
	        	{required:true, message: '请填写答案', trigger: 'blur' }
	        ],
			reorder:[
	        		{required:true, message: '请输入序号', trigger: 'blur' }
	        	]

        },
        dataArr:'',
        imglink:'',
        addModify_title:'',
        uploadJson: ''
  	}
  },
  created(){

  	if (JSON.parse(localStorage.getItem('myPageSize'))) { 	
 		this.pageSize = JSON.parse(localStorage.getItem('myPageSize')).W_FAQList?JSON.parse(localStorage.getItem('myPageSize')).W_FAQList:10
 	} else {
 		let obj = {}
 		localStorage.setItem('myPageSize',JSON.stringify(obj))
 	}
  	this.uploadJson = api.etitorUpload()
  },
 mounted() {
 	this.queryQuestionList()
 },
 computed: {
 	
 },
  methods: {
  	queryQuestionList(){
  		var params={
  			pageNo:this.pageNo,
  			pageSize:this.pageSize,
  			data:this.formInline.question,
  			status:this.formInline.status
  		}
  		api.queryQuestionList(params).then(res=>{
 			console.log(res)
 			if(res.data.code == 1){
 				this.total = res.data.total;
 				this.tableData = res.data.data
 				console.log(this.tableData,'this.tableData')
 			} else {
 				this.$notify({
		           title: '提示',
		           message: res.data.msg,
		           duration: 1500
		        });
 			}
 		})
  	},
  	updateQuestion(){
  		var params = {
  			id:this.questionId,
  			data:this.addForm.data,
  			result:this.addForm.result,
  			status:this.addForm.status,
  			reorder:this.addForm.reorder
  		}
  		this.buttonLoading = true;
  		api.updateQuestion(params).then(res=>{
  			this.buttonLoading = false;
 			console.log(res)
 			if(res.data.code == 1){
 				this.queryQuestionList()
 				this.$message.success(res.data.msg);
 				this.question_DialogVisible = false
 			} else {
 				this.$notify({
		           title: '提示',
		           message: res.data.msg,
		           duration: 1500
		        });
 			}

 		})
  	},
    onContentChange (val) {
      this.addForm.result = val
      console.log(val)
    },
  	search(data) {
  		this.pageNo = 1
  		this.pageSize = 10
  		this.queryQuestionList()
  	},
  	add(a){
  		this.question_DialogVisible = true;
		this.addModify_title = '新增问题';
		this.questionId='';
  	},
  	modify(a){
  		console.log(a)
  		a.status = a.status.toString()
  		this.question_DialogVisible = true;
  		this.addModify_title = '修改问题'
  		this.questionId = a.id;
  		console.log(a,this.questionId,'questionId')
  		this.addForm = Object.assign(this.addForm,a)
  		console.log(this.addForm,'this.addForm')
  	},
  	openLink(link){
		this.link_DialogVisible = true;
		this.imglink = link;
  	},
  	cancel_lookLink(){
  		this.link_DialogVisible = false;
  		this.imglink = '';
  	},
  	delete_s(row){
  		this.$confirm('此操作将是删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        	api.updateQuestion({
	    		id:row.id,
				status:0			
	    	}).then(res=>{
	// 			console.log(res)
	 			if(res.data.code == 1){
	 				this.queryQuestionList()
	 				this.$message.success(res.data.msg);
	 			}else{
	 				this.$message.error(res.data.msg)
	 			}
	// 			this.buttonLoading = true;
	// 			this.banner_DialogVisible = false;
	 		})	          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
  	},
  	before_upload(files) {
    	const isLt2M = files.size / 1024 / 1024 < 3;
    	if (!isLt2M) {
	        this.$message.error('单个文件不可超过3 MB!');
	        return false
	    }else{
	    	this.dataArr.push(files.name)
	    }
    	console.log(files.name)
    },
  	activityNameFn(value){
		this.$nextTick(()=>{    				
			this.addForm.bannerName = value.replace(/[^\u4e00-\u9fa5a-zA-Z0-9]{0,50}/g,'')
		},20)
	},
  	handleSizeChange(val) {

  		let myPageSize = JSON.parse(localStorage.getItem('myPageSize'))
  		myPageSize.W_FAQList = val
	 	localStorage.setItem('myPageSize',JSON.stringify(myPageSize))
		this.pageSize = val
		this.queryQuestionList();

		console.log(val,777777777777)
	},
	handleCurrentChange(val) {
		this.pageNo = val	
		this.currentPage = val
		this.queryQuestionList();
//		console.log(val,88888888)
	},	
	handleAvatarSuccess(){

	},
	beforeAvatarUpload(){

	},
	confirm_add(addForm){
		this.$refs[addForm].validate((valid) => {
            if (valid) {
            	console.log(666)
            	
            	this.updateQuestion()
            }else {
	            return false;
	        }
		})
	},
	addDiaClose(){
		// console.log("addDiaClose=====")
		Object.assign(this.addForm,{
  			data:'Q：',
			result:'',
			status:'',
			reorder:''
  		})
  		this.$nextTick(()=>{
  			this.$refs.addForm.clearValidate();	
  		})
	},
	cancel_addModify(){
		this.question_DialogVisible = false;
		this.$refs['addForm'].resetFields();
	},
	goNewPage(a){ //跳转页面
    	var newWin = window.open('loading page');
    	 //newWin.location.href = baseURL + '/#/activity_mobile' 
    	 newWin.location.href = a;
    },
    copyLink(a){ //复制地址
    	//window.clipboardData.setData("Text",a);
    	var Url2=document.getElementById(a);
		Url2.select(); // 选择对象
		console.log(Url2);
		document.execCommand("Copy");
    },
    viewH5(){
    	var routeData = this.$router.resolve({
        	path: '/questions',
      	});
      	window.open(routeData.href);
    }
  },
  components: {
  	TitCommon,
  	TableList,
  	Pagination
  }
  
 }
</script>
<style  lang="less" >
  .my_upload{
  	.avatar-uploader .el-upload {
	    border: 1px dashed #d9d9d9;
	    border-radius: 6px;
	    cursor: pointer;
	    position: relative;
	    overflow: hidden;
	  }
	  .avatar-uploader .el-upload:hover {
	    border-color: #409EFF;
	  }
	  .avatar-uploader-icon {
	    font-size: 28px;
	    color: #8c939d;
	    width: 178px;
	    height: 178px;
	    line-height: 178px;
	    text-align: center;
	  }
	  .avatar {
	    width: 178px;
	    height: 178px;
	    display: block;
	  }
  }
  .el-popover {
  	img{
  		width: 100%;
  	}
  }
  .hidden_input{
  	position: absolute;
	top:-99999px;
	left: -99999px;
	z-index: -99999;
  }
//    .ke-container {

//     width: 100% !important;
// }

</style>