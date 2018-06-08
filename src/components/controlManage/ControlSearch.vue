<template>
 <div>
 	<div class="order-search borBot1px">
		<el-form :inline="true" :model="search" class="demo-form-inline">
		  <el-form-item>
		  	<div style="width:300px">
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
		   <el-form-item  v-if='permission.showOnlyCheck'>
		  	<el-checkbox v-model="search.onlyCheck">仅查看我的订单</el-checkbox>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" icon="el-icon-search" @click='searchFn'>查询</el-button>
		  </el-form-item>
		   <el-form-item>
		   	 <el-button @click='showSeniorSearch'>展开高级搜索</el-button>
		  </el-form-item>
      <el-form-item v-if="permission.showReject">
        <el-button  type="primary" @click='rejectFn'>拒绝</el-button>
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
						<el-form-item label="订单状态" label-width='105px' v-if='permission.showOrderState'>
						    <el-select v-model="search.orderStatus" placeholder="请选择" @change='changeOrderState'>
						    	<!--<el-option v-for = '(val,ind) in productState' :label='val' :value="ind" :key='ind'></el-option>-->
                  <el-option v-for = 'item in productState'
                             :label='item.name' :value="item.id" :key='item.id'></el-option>
						    </el-select>
						</el-form-item>
            <el-form-item  v-if='permission.showUp'>
              <el-checkbox v-model="search.hangStatus">挂起</el-checkbox>
            </el-form-item>
					</div>
					<div class="pre">
						<el-form-item label="归属公司/部门" label-width='105px'>
						    <el-input
						    	 @focus='showTreeFn'
						    	:readonly = 'true'
						    	 style="width: 200px;"
						    	 v-model="partName_s" placeholder="请选择">
						    	<el-button @click='clearFn' slot="append" icon="el-icon-delete" style='font-size: 20px;'></el-button>
						    </el-input>
						</el-form-item>
						<el-form-item label="归属人" label-width='105px'>
							<el-input :maxlength='20' style="width: 200px;" v-model="search.people" placeholder='请输入姓名模糊查询' ></el-input>
						</el-form-item>
						<el-form-item label="订单环节" label-width='105px' v-if='permission.showOrderNode' >
						    <el-select v-model="search.orderNode" placeholder="请选择" @change='f1' :disabled = 'showOrderNodeChild'>
						    	<el-option v-for = '(val,ind) in orderNode' :label='val' :value="ind" :key='ind'></el-option>
						    </el-select>
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
						<el-form-item label="申请时间" label-width='105px'>
						    <el-date-picker
						      	v-model="search.applyDate"
                    :editable=false
						      	 type="daterange"
						      	range-separator="至"
						        start-placeholder="开始日期"
						        end-placeholder="结束日期"
						        value-format="yyyy-MM-dd"
						      >
						    </el-date-picker>
						</el-form-item>

					</div>
          <div v-if="permission.ShowRemainTime">
            <el-form-item label="当前环节停留时间（h）" label-width='160px' class="ShowRemainTime">
              <el-input  v-model="search.remainTimeBegin" @input='checkDateMin' @blur="checkChange"></el-input> -
              <el-input  v-model="search.remainTimeEnd" @input='checkDateMax' @blur="checkChange"></el-input>
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
  					showAllPararms: false,//'申请中','审批中','还款中','已结清'
  					showOrderState: false, //是否要展示高级搜索的‘订单状态’的条件
  					showOrderNode: false, //是否要展示高级搜索的‘订单环节’的条件
  					onlyOrderNode: false, //true是申请中页面控制的订单环节，fasle是审批中页面控制的订单环节
            showReject:false,
            showOnlyCheck:true,
            ShowRemainTime:false,
            showUp:false
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
			default:function() {
//				['申请中','审批中','还款中','已结清','拒单','挂起']
//订单状态：1申请中,2审批中,3还款中,4已结清,5拒绝,6线上筹资中,7满标,8满标以放款,9流标,10退件
				return ['申请中','审批中','还款中','已结清','挂起']
			}
		},
      productState: {
        type: Array,
        default:function() {
          return [{name:"申请中",id:"1"},{name:"审批中",id:"2"},{name:"还款中",id:"3"},{name:"已结清",id:"4"},{name:"拒绝",id:"5"},{name:"线上筹资中",id:"6"},
            {name:"满标",id:"7"},{name:"满标以放款",id:"8"},{name:"流标",id:"9"},{name:"退件",id:"10"}]
        }
      }
  	},
	data() {
	  	return {
        partName_s:'',
	  		number_s: 5,
	  		showOrderNodeChild: false,
	  		title: '全部客户',
	  		orShow: false,
	  		showTree: false,
	  		search: {
	  			content: '',
	  			checked: false,
	  			checkList: [],
	  			checkListParams:null,//订单状态：1申请中,2审批中,3还款中,4已结清,5拒绝,6线上筹资中,7满标,8满标以放款,9流标,10退件
	  			onlyCheck: false,
	  			productList: '',//产品系列
	  			productName: '',//产品名称
          orderStatus: '',//订单状态
	  			orderNode: '',//订单环节
	  			partName: '',
	  			people: '',
	  			applyProvince: '',
	  			applyCity: '',
	  			applyDate: [],
	  			hangStatus: false, //挂起
          remainTimeBegin:"", //当前环节停留时间
          remainTimeEnd:""
	  		},
	        applyProvince: [],
	        applyCity: [],
//	        productList: ['工薪贷','保单贷','助学贷','随意贷'],
			productList: [],
	        productList_s: [],
	        // productState: ['申请中','审批中','还款中','已结清','拒单'],
	        orderNode: [],
	        //订单状态的'申请中'对应的订单环节
	        orderNode_s1: ['身份证上传','肖像认证','手持身份证','完善信息','基本信息','工作信息','联系人信息','手机认证','产品选择/材料授权'],
        // orderNode_s1:[{name:"身份证上传",id:"1"},{name:"肖像认证",id:"2"},{name:"手持身份证",id:"4"},{name:"完善信息",id:"5"},{name:"基本信息",id:"6"},
    // {name:"工作信息",id:"7"},{name:"联系人信息",id:"8"},{name:"手机认证",id:"9"},{name:"产品选择/材料授权",id:"10"}],
	        //订单状态的'审批'对应的订单环节
	        orderNode_s2: ['信息审核','电话审核','视频面签','终审','合规检查','开立账户','上线筹资','放款成功'],
	        // orderNode_s2: [{name:"信息审核",id:"1"},{name:"电话审核",id:"2"},{name:"视频面签",id:"4"},{name:"终审",id:"5"},{name:"合规检查",id:"6"},
            // {name:"开立账户",id:"7"},{name:"上线筹资",id:"8"},{name:"放款成功",id:"9"}],
        multipleSelectionIdList:''
	  	}
	},
	mounted() {
		this.queryProvinceFn()
		this.queryCrmProTypeInfoFn()
	},
    methods: {
      replceNumVal(keys,value) {
        this.$nextTick(()=>{    	//^[0-9]*$
          this.search[keys] = value.replace(/[^0-9$]/g,'')
        },20)
      },
      checkDateMin(value) {
        this.replceNumVal('remainTimeBegin',value)

      },
      checkDateMax(value) {
        this.replceNumVal('remainTimeEnd',value)
      },
      checkChange(){
        if(this.search.remainTimeBegin && this.search.remainTimeEnd){
          if(this.search.remainTimeBegin>this.search.remainTimeEnd){
            this.$message.warning("结束时间必须大于等于开始时间")
            return false
          }
        }
      },
    	changeOrderState(val) {//订单状态条件改变时
        this.search.orderNode = ''
    		if (this.permission.showOrderState && this.permission.showOrderNode) {//订单状态与订单环节联动时
    			if (val==1) {
	    			this.orderNode = this.orderNode_s1
	    			this.showOrderNodeChild = false
	    		} else if (val == 2) {
	    			this.orderNode = this.orderNode_s2
	    			this.showOrderNodeChild = false
	    		} else {
	    			this.orderNode = []
	    			this.showOrderNodeChild = true
	    		}
	    		console.log(this.search.orderState,val,1200000)
    		}
    	},
    	checkOrderNodeFn() {
    		if (!this.permission.showOrderState && this.permission.showOrderNode) {//当订单状态不存，只有订单环节存在时
    			if (this.permission.onlyOrderNode) {//订单状态的'申请中'对应的订单环节
    				this.orderNode = this.orderNode_s1
    					console.log(11212112)
	    		} else {//订单状态的'审批'对应的订单环节
	    			this.orderNode = this.orderNode_s2
	    				console.log(11212112)
	    		}
    		}

    	},
    	f1() {
    		console.log(this.search.orderNode,666666666)
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
      clearProvince(){
        this.applyCity = []
      },
    	queryProvinceFn(){//省
    		api.queryProvince().then(res => {
    			if(res.data.success){
    				this.applyProvince = res.data.data
//  				console.log(res.data.data)
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
    		console.log(data,'ssssddddd')
    		this.search.partName = data.id
        this.partName_s = data.title
    		this.showTree = false
//	        console.log(data,6664444455555);
	    },
//
	    showTreeFn() {
	    	this.showTree = true
	    },

	  	changeAllVal(val) {
	  		if(val) {
	  			this.search.checkList = this.checkListName
	  		} else {
	  			this.search.checkList =[]
	  		}

  			if(this.search.checkList.indexOf('挂起') > -1) {
  				this.search.hangStatus = true
  			} else {
  				this.search.hangStatus = false
  			}

//	  		this.returnCheckListParams(val,'====')
	  		console.log(val,this.search.checkList,'====')
	  		this.search.checkListParams = this.returnCheckListParams(this.search.checkList)
	  	},
	  	changeVal(val){
	  		this.search.hangStatus = val == '挂起'? true:false
//			if(val.length != 0 && val.length != this.checkListName.length) {
//				this.search.checked = false
//			} else if (val.length == this.checkListName.length) {
//				this.search.checked = true
//			} else {
//				this.search.checked = false
//			}
			if (val.length == this.checkListName.length) {
				this.search.checked = true
			} else {
				this.search.checked = false
			}
			this.search.checkListParams = this.returnCheckListParams(val)
//			console.log(this.checkListName,this.checkListName.length,1212121121)
	   	},
	   	returnCheckListParams(val){//订单状态：1申请中,2审批中,3还款中,4已结清,5拒绝,6线上筹资中,7满标,8满标以放款,9流标,10退件
	   		let arr = []
//	   		1申请中,2审批中,3还款中,4已结清,5拒绝,    (6线上筹 资中,7满标,8满标以放款,9流标,) 审批中 10退件 （拒绝）
	  		for (var i=0;i < val.length; i++) {
				if(val[i] == '申请中') {
//					str += Number(i + 1)
					arr.push(1)
				} else if(val[i] == '审批中') {
//					str += Number(i + 1)
					arr.push(2)
				} else if(val[i] == '还款中') {
//					str += Number(i + 1)
					arr.push(3)
				}else if(val[i] == '已结清') {
//					str += Number(i + 1)
					arr.push(4)
				}else if(val[i] == '拒绝') {
//					str += Number(i + 1)
					arr.push(5)
				}else if(val[i] == '线上筹资中') {
//					str += Number(i + 1)
					arr.push(6)
				}else if(val[i] == '满标') {
//					str += Number(i + 1)
					arr.push(7)
				}else if(val[i] == '满标以放款') {
//					str += Number(i + 1)
					arr.push(8)
				}else if(val[i] == '流标') {
//					str += Number(i + 1)
					arr.push(9)
				}else if(val[i] == '退件') {
//					str += Number(i + 1)
					arr.push(10)
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
		  			orderNode: '',//订单环节
		  			partName: '',
            partName_s:'',
		  			people: '',
		  			applyProvince: '',
		  			applyCity: '',
		  			applyDate: []
	  			}
	  			Object.assign(this.search,clearObj)
	  		}
	   	},
	   	clearFn() {
	   		this.search.partName = ''
        this.partName_s=''
	   	},
	   	hideSeniorSearch(){
	   		this.orShow = false
	   		this.showTree = false
	   	},
	   	searchFn() {
        if(this.search.remainTimeBegin && this.search.remainTimeEnd){
          if(this.search.remainTimeBegin>this.search.remainTimeEnd){
            this.$message.warning("结束时间必须大于等于开始时间")
            return false
          }
        }
        this.$emit('searchFn',this.search)
      },
      rejectFn(){
        this.$emit('rejectFn',this.search)
      },
    },

	components: {
	  	Tree,
	  	Pagination
	}

 }
</script>
<style scoped lang="less">
	.order-search {
		margin-top: 20px;
		position: relative;
    .ShowRemainTime {
      .el-input{
        width:150px;
      }
    }
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
