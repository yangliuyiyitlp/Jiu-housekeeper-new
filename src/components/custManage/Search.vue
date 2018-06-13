<template>
 <div>
 	<div class="search borBot1px">
		<el-form :inline="true" :model="search" class="demo-form-inline" v-if = 'true'>
		  <el-form-item>
		  	<div style="width:300px">
		  		<el-input v-model.trim="search.content" placeholder='请输入姓名、手机号或身份证号码精确查询' clearable></el-input>
		  	</div>
		  </el-form-item>
		  <el-form-item  v-if='permission.showAllPararms'>
		  	<el-checkbox v-model="search.checked" @change='changeAllVal(search.checked)'>全部</el-checkbox>
		  </el-form-item>
		  <el-form-item  v-if='permission.showAllPararms'>
		  	<el-checkbox-group size="small" v-model="search.checkList" @change='changeVal(search.checkList)'>
			    <!--<el-checkbox-button label="未实名" value='1'></el-checkbox-button>
			    <el-checkbox-button label="已实名"></el-checkbox-button>
			    <el-checkbox-button label="已成交"></el-checkbox-button>-->
			     <!--<el-checkbox label="未实名" value='1'></el-checkbox>
			    <el-checkbox label="已实名"></el-checkbox>
			    <el-checkbox label="已成交"></el-checkbox>-->
			    <!--<el-select v-model="search.regType" placeholder="请选择">-->
			      <el-checkbox v-for="(value,index) in checkListName" :label="value" :key="index" :value='value' >{{value}}</el-checkbox>
			    <!--</el-select>-->
			</el-checkbox-group>
		  </el-form-item>
		   <el-form-item>
		  	<el-checkbox v-model="search.onlyCheck">仅查看我的客户</el-checkbox>
		  </el-form-item>
		  <el-form-item>
		    <el-button  icon="el-icon-search" @click='searchFn'>查询</el-button>
		  </el-form-item>
		   <el-form-item>
		   	 <el-button type="primary" @click='showSeniorSearch'>展开高级搜索</el-button>
		  </el-form-item>
		  <el-form-item v-show="hasPermission('assigningCustomers')">
		   	 <el-button type="success" @click='CustDistribution'>客户分配</el-button>
		  </el-form-item>
			<div class="seniorSearch" v-show='orShow'>
				<div class="pad20">
					<div class="custDistribution">
						<span class="hideSeniorSearch" @click="hideSeniorSearch">收起 </span>
						<!--<el-form-item label="是否实名" label-width='105px' v-if='permission.showRealName'>
						    <el-select v-model="search.realName" placeholder="请选择">
						      <el-option label="已实名" value="1"></el-option>
						      <el-option label="未实名" value="0"></el-option>
						    </el-select>
						</el-form-item>-->
						<el-form-item label="注册类型" label-width='105px' v-if='permission.showRegType' >
						    <el-select v-model="search.regType" placeholder="请选择" clearable>
						      <el-option label="自由注册" value="1"></el-option>
						      <el-option label="业务员推广" value="2"></el-option>
						      <el-option label="邀请好友" value="3"></el-option>
						    </el-select>
						</el-form-item>
					</div>
					<div class="pre">
						<el-form-item label="归属公司/部门" label-width='105px'>
						    <!--<el-select v-model="search.partName" placeholder="请选择">
						      <el-option label="区域一" value="shanghai"></el-option>
						      <el-option label="区域二" value="beijing"></el-option>
						    </el-select>-->
						    <el-input
						    	 @focus='showTreeFn'
						    	:readonly = 'true'
						    	 style="width: 200px;"
						    	 v-model="partName_s" placeholder="请选择">
						    	<el-button @click='clearFn' slot="append" icon="el-icon-delete" style='font-size: 20px;'></el-button>
						    </el-input>
						    <!--<div class="" id="tree" v-show='showTree'>
						    	<el-dialog title="请选择" width='500px' :visible.sync="showTree">
						    		<Tree :arrData='data' @handleNodeClick='handleNodeClick'></Tree>
						    	</el-dialog>
						    </div>-->
						</el-form-item>
						<el-form-item label="归属人" label-width='105px'>
							<el-input  :maxlength='20' style="width: 200px;" v-model="search.people" placeholder='请输入姓名、工号模糊查询' ></el-input>
						</el-form-item>
					</div>
					<div>
						<el-form-item label="申请省份" label-width='105px'>
						    <el-select v-model="search.applyProvince" placeholder="请选择" @change='changeProvince' clearable @clear="clearProvince">
						      <!--<el-option label="区域一" value="shanghai"></el-option>-->
						      <el-option v-for = '(val,ind) in applyProvince' :label='val.provinceName' :value="val.id" :key='ind'></el-option>
						    </el-select>
						</el-form-item>
						<el-form-item label="申请城市" label-width='105px'>
						    <el-select v-model="search.applyCity" placeholder="请选择" clearable>
						      <el-option v-for = '(val,ind) in applyCity' :label='val.cityName' :value="val.id" :key='ind'></el-option>
						      <!--<el-option label="区域二" value="beijing"></el-option>applyCity-->
						    </el-select>
						</el-form-item>
					</div>
				</div>
			</div>
		</el-form>
	</div>
	<!--搜索条件中的组织架构弹框-->
	<div class="" id="tree" v-show='showTree'>
		<el-dialog title="请选择" width='500px' :visible.sync="showTree" :close-on-click-modal="false">
			<div class="a1">
				<Tree :arrData='data' @handleNodeClick='handleNodeClick'></Tree>
			</div>
		</el-dialog>
	</div>
	<!--搜索条件中的组织架构弹框--END-->
	<!--客户分配组织架构弹框--START-->
	<el-dialog title="客户分配" width='800px' :visible.sync="CustDistributionDialog" :close-on-click-modal = 'false'>
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
					<!--<Tree :arrData='data' :idArr='idArr' ref='tree' @handleNodeClick='handleNodeClickCustDis'></Tree>-->
					<v-tree ref='tree' :data='data' :multiple='false'  :halfcheck='true' @node-click='handleNodeClickCustDis'/>
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
					    :data="tableData"
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
						:currentPage = 'currentPage'
						:total = 'total'
						@handleSizeChange = 'handleSizeChange'
						@handleCurrentChange = 'handleCurrentChange'
	 				>
 					</pagination>
				  </div>
				</div>

			</el-col>

		</el-row>
		<div class="text-rt">
			<el-button  type="info" @click='CustDistributionDialog = false'>取消</el-button>
		     <el-button type="primary" @click='saveDisCust' :loading="orSaveDisCust">保存</el-button>
		     <!--<iframe :src="src" width="" height=""></iframe>-->
		     <!--<div v-html='src'></div>-->
		</div>
	</el-dialog>
 	<!--客户分配组织架构弹框--END-->
 </div>
</template>

<script>
import api from "@/api/index"
import Tree from '@/components/common/Tree'
import Pagination from '@/components/common/Pagination'
export default {
  	name: 'allList',
  	props: {
  		permission:{
  			type: Object,
  			default: function () {
  				return {
  					showAllPararms: false,//是否要展示'全部，未实名，已实名，已成交'条件
					// showDistribution: false,//是否要展示‘客户分配’按钮
  					showRealName: false,//是否要展示高级搜索的‘是否实名’的条件
  					showRegType: false //是否要展示高级搜索的‘注册类型’的条件
  				}
  			}
  		},
  		data: {
			type: Array,
			default:function() {
				return []
			}
		},
		treeData: {
			type: Array,
			default:function() {
				return []
			}
		},
//		multipleSelectionIdList: {
//			type: String,
//			default:''
//		}
  	},
	data() {
	  	return {
	  		orSaveDisCust: false,
	  		idArr: [],
	  		loadingTableShow: false,
	  		layout: 'total, prev, pager, next',
	  		currentPage:1,
	  		total: 0,
	  		pageNo: 1,
	        pageSize: 10,
	        pageNum: [10,20,30],
	  		tableData: [],
	  		title: '全部客户',
	  		orShow: false,
	  		showTree: false,
	  		partName_s: '',
	  		search: {
	  			content: '',
	  			checked: false,
	  			checkList: [],
	  			checkListParams:null,//客户状态:1未实名,2已实名,3已成交
	  			onlyCheck: false,
//	  			realName: '',
	  			regType: '',
	  			partName: '',

	  			people: '',
	  			applyProvince: '',
	  			applyCity: ''
	  		},
	  		CustDistributionDialog:false ,//客户分配弹框可见性
			ser_department:'',//搜索的部门
			ser_people: '',
			deptId: '',
//			ids1:'ids1',
//			ids2:'ids2',
//	  		data: [],
	        defaultProps: {
	          children: 'child',
	          label: 'name'
	        },
	        checkListName: ['未实名','已实名','已成交'], //客户状态:1未实名,2已实名,3已成交
	        applyProvince: [],
	        applyCity: [],
	        employeeId: '',
	        multipleSelectionIdList: '',
        permissionList:[]
	  	}
	},
	beforeCreate(){
		let pararms = {
			menuId:this.$route.query.menuId
		}
		this.$store.dispatch('SET_POWER_BTN_ARR', pararms).then(res=>{
			//assigningCustomers:分配客户权限, "frozenCustomer：冻结按钮权限
			if (res) {
        this.permissionList = res
				// const flag = res.indexOf('assigningCustomers')
				// if (flag > -1) {
				// 	this.permission.showDistribution = true
				// } else {
				// 	this.permission.showDistribution = false
				// }
			}
		})
	},
	mounted() {
		this.queryProvinceFn()
	},
	created(){
	},
    methods: {
      hasPermission (data) {
        if (this.permissionList && this.permissionList.length && this.permissionList.includes(data)) {
          return true
        }
        return false
      },
    	saveDisCust() {
    		this.$confirm('此操作将是保存, 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning',
	          closeOnClickModal: false
	        }).then(() => {
	        	this.cuntomerDistributionFn()
	        }).catch(() => {
	          this.$message({
	            type: 'info',
	            message: '已取消保存'
	          });
	        });
    	},
    	handleCurrentSelect(val) {
    		if (val) {

    			this.employeeId = val.username
    		}
    		console.log(val,65656655)
    	},
    	search_tree() {

//  		this.idArr = []
//  		if(!this.ser_department){
//  			this.$message({
//		            type: 'info',
//		            message: '请输入检索条件'
//		          });
//  			return
//  		}
//  		for (var i = 0; i < this.treeData.length; i++ ) {
//  			if (this.treeData[i].name.match(this.ser_department)) {
//  				this.idArr.push(this.treeData[i].id)
//  				console.log(this.treeData[i].name.match(this.ser_department))
//  			}
//  		}
    		this.$refs.tree.searchNodes(this.ser_department)
    		console.log(this.treeData)
    	},
//  	clear_department() {
//
//  		console.log(this.deptId)
//  	},
    	search_employee() {
    		this.queryCustDistributionByDeptIdFn()
    		console.log(this.multipleSelectionIdList,12121,'-=-=77777777777777')
    	},
    	cuntomerDistributionFn() {
    		this.orSaveDisCust = true
    		let customerIdList = this.multipleSelectionIdList
    		let parsrms = {
    			customerIdList: customerIdList,
    			employeeId: this.employeeId
    		}
    		console.log(666666666)
    		api.cuntomerDistribution(parsrms).then(res => {
    			this.orSaveDisCust = false
          this.CustDistributionDialog = true
          console.log(res)
    			if(res.data.success){
    				this.CustDistributionDialog = false
    				//注意：客户分配保存成功后，刷新父级列表。调用父组件的列表方法：页面有全部客户，未实名客户，已成交客户，已实名客户四个页面
    				//页面有全部客户，未实名客户，已成交客户，已实名客户四个页面列表方法同名===》queryCustInfoData
    				if (this.permission.showDistribution) {

    					this.$parent.queryCustInfoData()
    				}

    			} else {

    			}
				this.$notify({
		           title: '提示',
		           message: res.data.msg,
		           duration: 1500
		        });
    		})
    	},
      clearProvince(){
    	  this.applyCity = []
      },
    	changeProvince(id){
        this.search.applyCity = ''
    		console.log(id,12313213)
    		this.queryCityByProvinceIdFn(id)
    	},
    	queryCityByProvinceIdFn(provinceId){
    		api.queryCityByProvinceId({provinceId:provinceId}).then(res => {
    			if(res.data.success){
    				this.applyCity = res.data.data
    				console.log(res.data.data)
    			} else {
    				this.$notify({
			           title: '提示',
			           message: res.data.msg,
			           duration: 1500
			        });
    			}
    		})
    	},
    	queryProvinceFn(){
    		api.queryProvince().then(res => {
    			if(res.data.success){
    				this.applyProvince = res.data.data
//  				console.log(res.data.data,111111111111111111111)
    			} else {
    				this.$notify({
			           title: '提示',
			           message: res.data.msg,
			           duration: 1500
			        });
    			}
    		})
    	},
    	handleSizeChange(val) {
			this.currentPage = 1
			this.pageNo = 1
			this.pageSize = val
			this.queryCustDistributionByDeptIdFn()
			console.log(val,777777777777)
		},
		handleCurrentChange(val) {
			this.pageNo = val
			this.queryCustDistributionByDeptIdFn()
			console.log(val,88888888)
		},
    	handleNodeClick(data) {
    		console.log(data,'ssssddddd')
    		this.search.partName = data.id
    		this.partName_s = data.title
    		this.showTree = false
//	        console.log(data,6664444455555);
	    },
	    handleNodeClickCustDis(data){
	    	this.ser_department = data.name
	    	console.log(data.id,6664444455555);
	    	this.deptId = data.id
	    	this.queryCustDistributionByDeptIdFn()
	    },
	    queryCustDistributionByDeptIdFn(){
	    	this.tableData= []
	    	let pararms = {
	    		pageNo: this.pageNo,
  				pageSize: this.pageSize,
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
	    			this.total = res.data.total
	  				this.tableData = res.data.data

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
	    showTreeFn() {
	    	this.showTree = true
	    },
//	    hideTreeFn() {
//	    	this.showTree = false
//	    },
	  	changeAllVal(val) {
	  		if(val) {
	  			this.search.checkList = this.checkListName
	  		} else {
	  			this.search.checkList =[]
	  		}
//	  		this.returnCheckListParams(val,'====')
//	  		console.log(val,this.search.checkList,'====')
	  		this.search.checkListParams = this.returnCheckListParams(this.search.checkList)
	  	},
	  	changeVal(val){

			if(val.length != 0 && val.length != 3) {
				this.search.checked = false
			} else if (val.length == 3) {
				this.search.checked = true
			}
			this.search.checkListParams = this.returnCheckListParams(val)
//			console.log(this.search.checkListParams)
	   	},
	   	returnCheckListParams(val){
	   		let arr = []
	  		for (var i=0;i < val.length; i++) {
				if(val[i] == '未实名') {
//					str += Number(i + 1)
					arr.push(1)
				} else if(val[i] == '已实名') {
//					str += Number(i + 1)
					arr.push(2)
				} else if(val[i] == '已成交') {
//					str += Number(i + 1)
					arr.push(3)
				}
			}
	  		console.log(arr)
//	  		var str = arr.join(',')
//	  		console.log(str)
	   		return arr
	   	},
	   	showSeniorSearch() {
	   		this.showTree = false
	   		this.orShow = !this.orShow
//	   		if(this.orShow) {//清空数据
////	   			this.search.realName = ''
////	  			this.search.regType = ''
////	  			this.search.partName = ''
////	  			this.search.people = ''
////	  			this.search.applyProvince = ''
////	  			this.search.applyCity = ''
//	   		}
	   	},
	   	clearFn() {
	   		this.search.partName = ''
	   		this.partName_s = ''
	   	},
	   	hideSeniorSearch(){
	   		this.orShow = false
	   		this.showTree = false
        this.applyCity =[]
	   	},
	   	CustDistribution(){
	   		console.log(66666)
//			this.multipleSelection = this.$store.state.selectArr
			const arr  = []
			this.$store.state.selectArr.forEach((value, index)=>{
				arr.push(value.crmCustInfoId)
			})
			this.multipleSelectionIdList = arr.join(',')
	//		console.log(this.$store.state.selectArr,66666)
			console.log(this.multipleSelectionIdList,66666)

	   		console.log(this.multipleSelectionIdList,8888888)
	   		if (this.multipleSelectionIdList.length == 0) {
	   			this.$notify({
		           title: '提示',
		           message: '请选择要分配的客户',
		           duration: 1500
		        });
	   			return
	   		}


	   		this.CustDistributionDialog = true;
	   		this.ser_department  = ''
        this.deptId = ''
	   		this.ser_people  = ''
        this.total=0
	   		this.idArr = []
	   		this.tableData = []
        this.employeeId=''


        console.log(this.data,"=================");
        console.log(this.$refs.tree,"***********");
        if(this.$refs.tree){

          this.$refs.tree.searchNodes(this.ser_department) // 再次点开 重新搜索空 获取tree
          // this.search_tree() // 再次点开 重新搜索空 获取tree
//	   		this.showTree = true;
        }
	   		this.$emit('CustDistributionFn',this.search)

console.log(this.total)

	   	},
	   	searchFn() {
	   		this.$emit('searchFn',this.search)
	   	}
    },
    watch:{
    	ser_department(val){
    		if(!val) {
    			this.deptId = ''
    		}
    	},
    	orShow(val) {
    		if (!val) {
    			this.search.regType = ''
	  			this.search.partName = ''
	  			this.partName_s = ''
	  			this.search.people = ''
	  			this.search.applyProvince = ''
	  			this.search.applyCity = ''
//	  			console.log(!val,'---------')
    		}
//  		console.log(this.search)
    	}


    },
  components: {
  	Tree,
  	Pagination
  }

 }
</script>
<style scoped lang="less">
	.search {
		margin-top: 20px;
		position: relative;
		.seniorSearch {
			position: absolute;
			width: 100%;
			top: 68px;
			left: 0;
			z-index: 2001;
		    border: 1px solid #ccc;
		    border-top: 0;
		    background-color: #fff;
		    /*.pad20 {
		    	padding: 20px;
		    }*/
		}
		.custDistribution {
			position: relative;
			.hideSeniorSearch {
			 	position: absolute;
			    top: 9px;
			    left: 700px;
			    color: #169BD5;
			}
		}
		.pre {
			position: relative;
		}
		.hideSeniorSearch{
			cursor: pointer;
		}
		#tree {
			position: absolute;
			z-index: 12111221;
			border: 1px solid #ccc;
			top: 40px;
		    background-color: #ffff;
		    border-radius: 5px;
		    width: 200px;
		}
		.a1 {
			    margin-top: -40px;
		}
		/*.btn {
			text-align: right;
			margin-top: 20px;
			button {
		    	width: 100px;
			}
		}*/
	}
</style>
