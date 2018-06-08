<template>
 <div class="allCustList table-wraps">
 	<TitCommon :title='title'></TitCommon>
 	<el-row  type="flex" >
	  <el-col  class="searchbox">
	  		<el-form :inline="true" :model="formInline" class="demo-form-inline">
	            <el-form-item label="标题">
			    	<el-input
					    placeholder=""
					    v-model.trim="formInline.title" :maxlength="50">
				    </el-input>
			    </el-form-item>
			    <el-form-item label="状态">
				    <el-select v-model="formInline.state" placeholder="全部">
				    <el-option
				      v-for="item in states"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				  </el-select>
			    </el-form-item>
			    <el-form-item label="渠道">
				    <el-select v-model="formInline.channel" placeholder="全部">
				    <el-option
				      v-for="item in channels"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				  </el-select>
			    </el-form-item>
			    <el-form-item>
	    			<el-button type="primary" @click="search()">查询</el-button>
	    			<el-button type="primary" @click="add('add')">新增</el-button>
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
		      <el-table-column align='center' type="index"  width="60" label="序号" >

		      </el-table-column>
		      <el-table-column
		      	align='center'
		        :show-overflow-tooltip="true"
		        prop="title"
		        label="标题"
		        width="180">
		      </el-table-column>
		      <el-table-column
		      	align='center'
		        :show-overflow-tooltip="true"
		        prop="link"
		        label="链接">
		        <template  slot-scope="scope">
		        	<!--<span v-if='!scope.row.link' disabled>查看</span>-->
		        	<span v-if='scope.row.link' class="highLight_cursor" @click="openLink(scope.row.link)">查看</span>
		        </template>
		      </el-table-column>
		      <el-table-column
		      	align='center'
		        :show-overflow-tooltip="true"
		        prop="status"
		        label="状态">
		         <template slot-scope="scope">
		         	{{ scope.row.status==1?'有效':'无效'}}

		         </template>
		      </el-table-column>
		      <el-table-column
		      	align='center'
		        :show-overflow-tooltip="true"
		        prop="channel"
		        label="渠道">
		         <template slot-scope="scope">
		         	<span v-if='scope.row.channel==0'>手机站</span>
		         	<span v-if='scope.row.channel==1'>APP</span>
		         	<span v-if='scope.row.channel==2'>官网</span>
		         	<!--{{ scope.row.channel==0?'手机站':'无效'}}-->
		         </template>
		      </el-table-column>
		      <el-table-column
		      	align='center'
		        :show-overflow-tooltip="true"
		        prop="reorder"
		        label="排序">
		      </el-table-column>
		      <el-table-column
		      	align='center'
		        :show-overflow-tooltip="true"
		        prop="imgAddress"
		        label="图片地址">
		        <template  slot-scope="scope">
		            <el-popover
					  placement="top-start"
					  title="标题"
					  width="500"
					  trigger="hover">
					  <img :src="scope.row.imgAddress"/>
					  <span class="highLight_cursor" slot="reference">图片预览</span>
					</el-popover>
		       </template>
		      </el-table-column>
		      <el-table-column
		      	align='center'
		        :show-overflow-tooltip="true"
		        prop="createTime"
		        label="发布时间">
		      </el-table-column>
		      <el-table-column
		      	align='center'
		        :show-overflow-tooltip="true"
		        prop="describe"
		        label="描述">
		      </el-table-column>
		      <el-table-column
		      	align='center'
		        :show-overflow-tooltip="true"
		        prop="date"
		        label="操作">
		        <template slot-scope="scope">
		           	<!--<span class="highLight_cursor" @click="modify(scope.row)">修改</span>
	           		<span class="highLight_cursor" @click="delete_s(scope.row)" v-if='scope.row.status==1'>删除</span>-->
	           		<el-button type="primary" @click="modify(scope.row)" size="mini">修改</el-button>
  					<el-button type="success"  @click="delete_s(scope.row)" v-if='scope.row.status==1' size="mini">删除</el-button>
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
 	<el-dialog :title="addModify_title" :visible.sync="banner_DialogVisible" width="700px"   @close="addDiaClose" :close-on-click-modal ='false'>
 		<el-form label-width="130px" ref="addForm" :model="addForm" class="demo-form-inline" :rules="addForm_rules">
	        <el-form-item label="标题" prop="title"  >
	           <el-input  v-model.trim="addForm.title" :maxlength="50" @input="activityNameFn"></el-input>
	        </el-form-item>
	        <el-form-item label="链接地址" prop="link"  >
	           <el-input  v-model.trim="addForm.link" ></el-input>

	           <!-- <el-select v-model="addForm.activityCompName" placeholder="活动归属" :readonly="orign_disabled">
	            	<el-option v-for="item in BranchCompany" :key="item.name" :label="item.name" :value="item.name" @click.native = 'selectFn2(item)'></el-option>
	           </el-select> -->
	        </el-form-item>
	        <el-form-item label="状态" prop="status"  >
	           <el-select v-model="addForm.status" >
               <el-option
                 v-for="item in addFormStates"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
               </el-option>

	           </el-select>
	        </el-form-item>

	        <el-form-item label="渠道" prop="channel"  >

	           <el-select v-model="addForm.channel" >
               <el-option
                 v-for="item in addFormChannels"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
               </el-option>

	           </el-select>
	        </el-form-item>
	        <el-form-item label="图片"  prop="imgAddress" class="my_upload">
				<el-upload

				  class="avatar-uploader wordDes"
				  :action="uploadUrl"
				  :show-file-list="false"
				  :on-success="handleAvatarSuccess"
				  :before-upload="before_upload">
				  <img v-if="addForm.imgAddress" :src="addForm.imgAddress" class="avatar">
				  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
				<div style="margin-left: 200px;">
					<p>尺寸比例：   长:宽  1.85  :  1</p>
					<p>推荐图尺寸：      长*宽 750px*404px   分辨率72</p>
					<p>文件大小：    3M以内</p>
				</div>
			</el-form-item>
	        <el-form-item label="描述" prop="describe"  >
	           <el-input  v-model.trim="addForm.describe" :maxlength="50" ></el-input>
	        </el-form-item>
	        <el-form-item label="排序数字" prop="reorder"  >
	            <el-input  @input="chenkNum" v-model="addForm.reorder"  :min="0" :max="999999999" label="排序数字"></el-input>
	            <!--<el-input-number ></el-input-number>-->
	           <!-- <el-select v-model="addForm.activityCompName" placeholder="活动归属" :readonly="orign_disabled">
	            	<el-option v-for="item in BranchCompany" :key="item.name" :label="item.name" :value="item.name" @click.native = 'selectFn2(item)'></el-option>
	           </el-select> -->
	        </el-form-item>
	    </el-form>
	    <div slot="footer" class="dialog-footer">
	    	<el-button type="primary" :loading="buttonLoading" @click="confirm_add('addForm')">确认</el-button>
	    	<el-button @click="cancel_addModify()">取消</el-button>
    	</div>
 	</el-dialog>
 	<el-dialog :close-on-click-modal = 'false' title="查看链接" :visible.sync="link_DialogVisible" width="35%" >
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
  	const validateImgAddress = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请上传图片'))
      }else {
        callback()
      }
    }
  	return {
  		buttonLoading:false,
  		title: 'Banner管理',
  		banner_DialogVisible:false,
  		link_DialogVisible:false,
  		uploadUrl:api.upload,
  		currentPage:1,
  		total: 1,
  		pageNo: 1,
        pageSize: 10,
        tableData: [
//      	{
//      		date:'圣诞节圣诞节',
//      		imgUrl:'https://www.51bel.com/common/images/invest_pro/dingtoubao.png'
//      	}
        ],
        formInline:{
        	title:'',
        	state:null,
        	channel:null
        },
        states:[
        	{
        		label:'全部',
        		value: null
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
        channels:[
        	{
        		label:'全部',
        		value: null
        	},
        	{
        		label:'手机站',
        		value:"0"
        	},
        	{
        		label:'APP',
        		value:'1'
        	},
        	{
        		label:'官网',
        		value:'2'
        	}
        ],
      addFormStates:[
        {
          label:'请选择',
          value: null
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
      addFormChannels:[
        {
          label:'请选择',
          value: null
        },
        {
          label:'手机站',
          value:"0"
        },
        {
          label:'APP',
          value:'1'
        },
        {
          label:'官网',
          value:'2'
        }
      ],
        addForm:{
        	title:'',
			link:'',
			status:null,
			channel:null,
			imgAddress:'',
			describe:'',
			reorder:''
        },
        addForm_rules:{
        	title:[
	        		{required:true, max:50,message: '请输入标题', trigger: 'blur' }
	        	],
			link:[
		            { pattern: /(http|ftp|https):\/\/+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/,
		              trigger: 'blur',
		              message: '网址格式错误'
		            }
	        	],
			status:[
	        		{required:true, message: '请选择状态', trigger: 'blur,change' }
	        	],
			channel:[
	        		{required:true, message: '请输入渠道', trigger: 'blur,change' }
	        	],
			imgAddress:[
			 		{required:true, message: '请上传图片文件', trigger: 'change' },
					{validator: validateImgAddress, trigger: 'blur,change'}

	        	],
			reorder:[
	        		{required:true, message: '请输入序号', trigger: 'blur' }
	        	]

        },
        dataArr:'',
        imglink:'',
        addModify_title:'',
        bannerId:''
//      pararmsObj:{}
  	}
  },
 created() {

 	if (JSON.parse(localStorage.getItem('myPageSize'))) {
 		this.pageSize = JSON.parse(localStorage.getItem('myPageSize')).W_bannerList?JSON.parse(localStorage.getItem('myPageSize')).W_bannerList:10
 		console.log(JSON.parse(localStorage.getItem('myPageSize')).W_bannerList)
 	} else {
 		let obj = {}
 		localStorage.setItem('myPageSize',JSON.stringify(obj))
 	}
 },
  mounted(){
		this.queryBannerList();
		console.log('jjkkkk',this.pageSize)
  },
  methods: {

  	search(data) {
  		console.log(778787878)
  		this.pageNo = 1
  		// this.pageSize = 10

  		this.queryBannerList()
  	},
  	queryBannerList(){
  		const pararms = {
 			pageNo:this.pageNo,
			pageSize:this.pageSize,
			title:this.formInline.title,
			status:this.formInline.state,
			channel:this.formInline.channel
 		}
  		console.log('==============')
 		api.queryBannerList(pararms).then(res=>{
 			console.log(res)
 			if(res.data.code == 1){
 				this.total = res.data.total;
 				this.tableData = res.data.data

 			} else {
 				this.$notify({
		           title: '提示',
		           message: res.data.msg,
		           duration: 1500
		        });
 			}
 		})
  	},
  	add(a){
  		this.buttonLoading = false;
//		this.buttonLoading = true;
  		this.banner_DialogVisible = true;
  		this.addModify_title = '新增Banner'
  		this.bannerId='';
  		this.addForm.channel = null
  		this.addForm.status = null
  	},
  	modify(a){

  		a.channel = a.channel.toString()
  		a.status = a.status.toString()
//		this.pararmsObj =  Object.assign(this.pararmsObj,a)
//		console.log(a,this.addForm,1213131223)
//		if (a.channel == 0) {
//			a.channel = '手机站' //手机站:0/APP:1/官网
//		} else if (a.channel == 1) {
//			a.channel = 'APP'
//		}else if (a.channel == 2) {
//			a.channel = '官网'
//		}
//		if (a.status == 0) {
//			a.status = '无效' //状态(有效:1/无效:0)
//		} else if (a.status == 1) {
//			a.status = '有效'
//		}

  		this.banner_DialogVisible = true;
  		this.addModify_title = '修改Banner'
  		this.bannerId = a.id;
//		console.log(a,this.bannerId,'bannerId')
  		this.addForm = Object.assign(this.addForm,a)

		console.log(this.addForm ,1231312313)
  	},
  	openLink(link){ //查看链接
		this.link_DialogVisible = true;
		this.imglink = link;
  	},
  	cancel_lookLink(){
  		this.link_DialogVisible = false;
  		this.imglink = '';
  	},
  	delete_s(row){
  		this.$confirm('确认删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          closeOnClickModal: false
        }).then(() => {
        	this.updateSysBannerFn(row.id,0)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

  	},
  	before_upload(files) {
    	const isLt2M = files.size / 1024 / 1024 < 3;
    	const textArr = files.name.split('.')
        const isPng = textArr[textArr.length-1]
//  	if (!isLt2M) {
//	        this.$message.error('单个文件不可超过3 MB!');
//	        return false
//	    }else if(isPng == 'png'){
//	    	alert(1111111111)
//	    }else{
//	    	this.dataArr = files.name
//	    }
console.log(isPng,isLt2M,files.size / 1024 / 1024,'-------------')
		if (isPng == 'jpg' || isPng == 'png' || isPng == 'jpeg') {
			if (!isLt2M) {
	            this.$message.error('单个文件不可超过3 MB!');
	            return false
	        }
	    }else{
//	    	this.dataArr = files.name
 			this.$message("仅支持上传png、jpg、jpeg格式的文件");
          	return false
	    }
//  	console.log(files)
    },
  	activityNameFn(value){
		this.$nextTick(()=>{
			this.addForm.title = value.replace(/[^\u4e00-\u9fa5a-zA-Z,.。，？?:：‘’!！''0-9]{0,50}/g,'')
		},20)
	},
	chenkNum(value) {
		this.$nextTick(()=>{
			this.addForm.reorder = value.replace(/[^0-9$]/g,'')
		},20)
	},
  	handleSizeChange(val) {

		let myPageSize = JSON.parse(localStorage.getItem('myPageSize'))
  		myPageSize.W_bannerList = val
	 	localStorage.setItem('myPageSize',JSON.stringify(myPageSize))
		this.pageSize = val
		this.queryBannerList();

//		console.log(val,777777777777)
	},
	handleCurrentChange(val) {
		this.pageNo = val
		this.currentPage = val
		this.queryBannerList();
//		console.log(val,88888888)
	},
	handleAvatarSuccess(a){
		console.log(a,'aaaaaaaaa')
		if (a.success) {
			this.addForm.imgAddress = a.data.url
		} else {
			 this.$message.error(a.msg);
		}
		this.$refs.addForm.validateField('imgAddress');
	},
	beforeAvatarUpload(){

	},
	confirm_add(addForm){
		this.$refs[addForm].validate((valid) => {
            if (valid) {
            	console.log(666)
            	this.buttonLoading = true;
//          	this.updateSysBannerFn()
            	api.updateSysBanner({
            		id:this.bannerId,
            		title:this.addForm.title,
					link:this.addForm.link,
					status:this.addForm.status,
					channel:this.addForm.channel,
					reorder:this.addForm.reorder,
					imgAddress:this.addForm.imgAddress,
					describe:this.addForm.describe
            	}).then(res=>{
            		this.buttonLoading = false;
		 			console.log(res)
		 			if(res.data.code == 1){
		 				this.queryBannerList()
		 				this.$message.success(res.data.msg);
		 				this.banner_DialogVisible = false;
		 			}else{
		 				this.$message.error(res.data.msg)
		 			}


		 		})
            }
		})
	},
	updateSysBannerFn(id,status){
		api.updateSysBanner({
    		id:id,
			status:status,
    	}).then(res=>{
// 			console.log(res)
 			if(res.data.code == 1){
 				this.queryBannerList()
 				this.$message.success(res.data.msg);
 			}else{
 				this.$message.error(res.data.msg)
 			}
// 			this.buttonLoading = true;
// 			this.banner_DialogVisible = false;
 		})
	},
	addDiaClose(){
		// console.log("addDiaClose=====")
		Object.assign(this.addForm,{
  			title:'',
			link:'',
			status:'',
			channel:'',
			imgAddress:'',
			describe:'',
			reorder:''
  		})
  		this.$nextTick(()=>{
  			this.$refs.addForm.clearValidate();
  		})
	},
	cancel_addModify(){
		this.banner_DialogVisible = false;
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
.wordDes {
	float: left;
}
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
</style>
