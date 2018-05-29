<template>
 <div>
 	<div class="overdueList borBot1px">
		<el-form :inline="true" :model="search" class="demo-form-inline">
		  <el-form-item>
		  	<div style="width:320px">
		  		<el-input v-model="search.content" placeholder='请输入姓名、手机号或身份证号码精确查询' clearable></el-input>
		  	</div>
		  </el-form-item>
		  <el-form-item  v-if='permission.showAllPararms'>
		  	<el-checkbox v-model="search.checked" @change='changeAllVal(search.checked)'>全部</el-checkbox>
		  </el-form-item>
		  <el-form-item  v-if='permission.showAllPararms'>
		  	<el-checkbox-group size="small" v-model="search.checkList" @change='changeVal(search.checkList)'>
			    <el-checkbox v-for="(value,index) in checkListName" :label="value" :key="index" :value='value' >{{value}}</el-checkbox>
			</el-checkbox-group>
		  </el-form-item>
		   <el-form-item>
		  	<el-checkbox v-model="search.onlyCheck">仅查看我的订单</el-checkbox>
		  </el-form-item>
		  <el-form-item>
		    <el-button  icon="el-icon-search" @click='searchFn'>查询</el-button>
		  </el-form-item>
		   <el-form-item>
		   	 <el-button type="primary" @click='showSeniorSearch'>展开高级搜索</el-button>
		  </el-form-item>
			<div class="seniorSearch" v-show='orShow'>
				<div class="pad20">
					<div class="custDistribution">
						<span class="hideSeniorSearch" @click="hideSeniorSearch">收起 </span>
						<el-form-item label="产品系列" label-width='105px' >
						    <el-select v-model="search.productList" placeholder="请选择" @change='changeProductList'>
						    	<el-option
						    		v-for = 'item in productList'
						    		:label='item.name' :value="item.id" :key='item.id'>
						    	</el-option>
						    </el-select>
						</el-form-item>
						<el-form-item label="产品名称" label-width='105px'>
						    <el-select v-model="search.productName" placeholder="请选择">
						    	<el-option v-for = 'item in productList_s'
						    		:label='item.name' :value="item.id" :key='item.id'></el-option>
						    </el-select>
						</el-form-item>
						<el-form-item
							class='overDate'
							label="逾期状态" label-width='105px' v-if='permission.showOrderState'>
						    <el-select v-model="search.orderState" placeholder="请选择" @change='changeOrderState'>
						    	<el-option v-for = '(val,ind) in productState' :label='val' :value="ind" :key='ind'></el-option>
						    </el-select>
						    --
						    <el-select v-model="search.orderState" placeholder="请选择" @change='changeOrderState'>
						    	<el-option v-for = '(val,ind) in productState' :label='val' :value="ind" :key='ind'></el-option>
						    </el-select>
						</el-form-item>
					</div>
					<div class="pre">
						<el-form-item label="归属公司/部门" label-width='105px'>
						    <el-input
						    	 @focus='showTreeFn'
						    	:readonly = 'true'
						    	 style="width: 200px;"
						    	 v-model="search.partName" placeholder="请选择">
						    	<el-button @click='clearFn' slot="append" icon="el-icon-delete" style='font-size: 20px;'></el-button>
						    </el-input>
						</el-form-item>
						<el-form-item label="归属人" label-width='105px'>
							<el-input :maxlength='20' style="width: 200px;" v-model="search.people" placeholder='请输入姓名模糊查询' ></el-input>
						</el-form-item>
						<el-form-item
							class='overDate'
							:label="arrName[(permission.typeNameIndex - 1)]" label-width='105px'>
						    <el-input @input = 'checkStartDate'  style="width: 165px;" v-model="search.overDateStart" placeholder='请输入' ></el-input>
						    --
						    <el-input @input = 'checkEndDate' style="width: 165px;" v-model="search.overDateEnd" placeholder='请输入' ></el-input>
						</el-form-item>
					</div>
					<div>
						<el-form-item label="申请省份" label-width='105px'>
						    <el-select v-model="search.applyProvince" placeholder="请选择" @change='changeProvince' clearable>
						      <!--<el-option label="区域一" value="shanghai"></el-option>-->
						      <el-option v-for = '(val,ind) in applyProvince' :label='val.provinceName' :value="val.id" :key='ind'></el-option>
						    </el-select>
						</el-form-item>
						<el-form-item label="申请城市" label-width='105px'>
						    <el-select v-model="search.applyCity" placeholder="请选择" clearable>
						      <el-option v-for = '(val,ind) in applyCity' :label='val.cityName' :value="val.id" :key='ind'></el-option>
						    </el-select>
						</el-form-item>
						<el-form-item label="放款日期" label-width='105px'>
						      	<!-- type="daterange"-->
						    <el-date-picker
						      	v-model="search.applyDate"
						      	type="daterange"
						      	range-separator="至"
						        start-placeholder="开始日期"
						        end-placeholder="结束日期"
						        value-format="yyyy-MM-dd"
						        :picker-options="pickerOptions"
						        :default-time="['00:00:00', '23:59:59']"
						      >
						    </el-date-picker>
						</el-form-item>
					</div>
				</div>
			</div>
		</el-form>
	</div>
	<!--搜索条件中的组织架构弹框-->
	<div class="" id="tree" v-show='showTree'>
		<el-dialog title="请选择" width='500px' :visible.sync="showTree">
			<div class="a1">
				<Tree :arrData='data' @handleNodeClick='handleNodeClick'></Tree>
			</div>
		</el-dialog>
	</div>
	<!--搜索条件中的组织架构弹框--END-->

 </div>
</template>

<script>
import api from "@/api/index"
import Tree from '@/components/common/Tree'
import Pagination from '@/components/common/Pagination'
export default {
  	name: 'allOrder',
  	props: {
  		permission:{
  			type: Object,
  			default: function () {
  				return {
  					showAllPararms: false,//'正常','检测异常'
  					showOrderState: false,  //是否要展示高级搜索的‘逾期状态’的条件
  					typeNameIndex: 1,//1逾期天数,2放款天数,3距还款日
  				}
  			}
  		},
  		data: {
			type: Array,
			default:function() {
				return []
			}
		},

		checkListName: {
			type: Array,
			default:function() {//1'正常',0'检测异常'
				return ['正常','检测异常']
			}
		}
  	},
	data() {
	  	return {
	  		arrName: ['逾期天数','放款天数','距还款日'], //1逾期天数,2放款天数,3距还款日
	  		pickerOptions: {
            	disabledDate(time) {
            		return time.getTime() > Date.now();
           		}
            },
	  		number_s: 5,
	  		showOrderNodeChild: false,
	  		title: '全部客户',
	  		orShow: false,
	  		showTree: false,
	  		search: {
	  			content: '',
	  			checked: true,
          checkedCurrent:'',
	  			checkList: [],
	  			checkListParams:null,//订单状态：1申请中,2审批中,3还款中,4已结清,5拒绝,6线上筹资中,7满标,8满标以放款,9流标,10退件
	  			onlyCheck: false,
	  			productList: '',//产品系列
	  			productName: '',//产品名称
	  			orderState: '',//订单状态
//	  			orderNode: '',//订单环节
	  			partName: '',
	  			people: '',
	  			applyProvince: '',
	  			applyCity: '',
	  			applyDate: [],
//	  			hangStatus: false,
	  			overDateStart: null,//逾期开始的天数
	  			overDateEnd: null, //逾期结束的天数
	  		},
	        applyProvince: [],
	        applyCity: [],
//	        productList: ['工薪贷','保单贷','助学贷','随意贷'],
			productList: [],
	        productList_s: [],
	        productState: ['申请中','审批中','还款中','已结清','拒单'],
//	        orderNode: [],
			flagEmitSearchFn: true
	  	}
	},
	mounted() {
		this.queryProvinceFn()
		this.queryCrmProTypeInfoFn()
	},
    methods: {
    	changeOrderState(val) {//订单状态条件改变时
//  		this.search.orderNode = ''

   		 },
    	f1() {
    		console.log(this.search.orderNode,666666666)
    	},
    	checkStartDate(value) {
    		console.log(121221)
    		this.$nextTick(()=>{
				this.search.overDateStart = value.replace(/[^0-9$]/g,'')
			},20)
    	},
    	checkEndDate(value) {

    		this.$nextTick(()=>{
				this.search.overDateEnd = value.replace(/[^0-9$]/g,'')
			},100)
    	},
    	queryCrmProTypeInfoFn(){//获取产品列表
    		api.queryCrmProTypeInfo({status: 1}).then(res => {
    			if(res.data.success){
    				this.productList = res.data.data
//  				console.log(res.data.data)
    			} else {
//  			console.log(res.data,'-=-==-=-=-=-=-=-=-=-')
    			}
    		})

    	},
    	changeProductList() {
    		this.search.productName = ''
    		api.queryCrmProInfo({status: 1,cptId: this.search.productList}).then(res => {
    			if(res.data.success){
    				this.productList_s = res.data.data
    				console.log(this.productList_s,123133)
    			} else {
    				this.productList_s = []
    				this.$notify({
			           title: '提示',
			           message: res.data.msg,
			           duration: 1500
			        });
    			}
    		})
//  		console.log(this.search.productList)
    	},
    	changeProvince(id){//省，改变时
    		this.search.applyCity = ''
//  		console.log(id,12313213)
    		this.queryCityByProvinceIdFn(id)
    	},
    	queryCityByProvinceIdFn(provinceId){//市
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
    	queryProvinceFn(){//省
    		api.queryProvince().then(res => {
    			if(res.data.success){
    				this.applyProvince = res.data.data
    			} else {
    				this.$notify({
			           title: '提示',
			           message: res.data.msg,
			           duration: 1500
			        });
    			}
    		})
    	},
    	handleNodeClick(data) {
    		this.search.partName = data.title
    		this.showTree = false
	    },
//
	    showTreeFn() {
	    	this.showTree = true
	    },

	  	changeAllVal(val) {

        console.log(8888,val);
        if(val) {
	  			this.search.checkList = this.checkListName
          this.search.checkedCurrent=""
	  		} else {
	  			this.search.checkList =[]
          this.search.checkedCurrent="1"
	  		}
	  	// 	console.log(val,this.search.checkList,'====')
	  		this.search.checkListParams = this.returnCheckListParams(this.search.checkList)
	  	},
	  	changeVal(val){
        console.log(55,val);
        this.search.checkedCurrent=''
        if(val=='正常'){
          this.search.checked = false
          this.search.checkedCurrent = "1"}else if(val=='检测异常') {
          this.search.checked = false
          this.search.checkedCurrent = "0"}else if(val.length == this.checkListName.length) {
          this.search.checked = true
          this.search.checkedCurrent = ""}
        // if (val.length == this.checkListName.length) {
			// 	this.search.checked = true
			// } else {
			// 	this.search.checked = false
			// }
			this.search.checkListParams = this.returnCheckListParams(val)
	   	},
	   	returnCheckListParams(val){//订单状态：1正常,0检测异常
	   		let arr = []
	  		for (var i=0;i < val.length; i++) {
				if(val[i] == '正常') {
					arr.push(1)
				} else if(val[i] == '检测异常') {
					arr.push(0)
				}
			}
	   		return arr
	   	},
	   	showSeniorSearch() {
	   		this.showTree = false
	   		this.orShow = !this.orShow
	   		if(this.orShow) {//清空数据
	  			let clearObj = {
		  			productList: '',//产品系列
		  			productName: '',//产品名称
		  			orderState: '',//订单状态
//		  			orderNode: '',//订单环节
		  			partName: '',
		  			people: '',
		  			applyProvince: '',
		  			applyCity: '',
		  			applyDate: [],
		  			overDateStart: null,//逾期开始的天数
	  				overDateEnd: null, //逾期结束的天数
	  			}
	  			Object.assign(this.search,clearObj)
	  		}
	   	},
	   	clearFn() {
	   		this.search.partName = ''
	   	},
	   	hideSeniorSearch(){
	   		this.orShow = false
	   		this.showTree = false
	   	},
	   	searchFn() {
	   		console.log(this.search.applyDate)
//	   		this.flagEmitSearchFn = false
			if(Number(this.search.overDateEnd) < Number(this.search.overDateStart)) {
    			this.$message({
		          	message: '输入的' + this.arrName[(this.permission.typeNameIndex - 1)] + '起点的天数不能大于终点的天数',
		          	type: 'warning'
		       })
    		} else {
    			this.$emit('searchFn',this.search)
    		}
	   	}
    },

	components: {
	  	Tree,
	  	Pagination
	}

 }
</script>
<style scoped lang="less">
	.overdueList {
		.overDate {
			.el-input {
				width: 150px;
			}
		}
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
			   	right: 10px;
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
		    /*width: 200px;*/
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
