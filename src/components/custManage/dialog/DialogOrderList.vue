<template>
  <div class="order-list">
		<el-dialog
			:close-on-click-modal ='false'
			width='60%'
			title=""
			:visible.sync="visibleObj.dialogTableVisible"
		>
			  <CommonTable :arrData = 'gridData' :total = 'total' @showRefuse='showRefuseDialog'></CommonTable>
			  <div class="pagWrap">
			  	<pagination
					:currentPage = 'currentPage'
					:total = 'total'
					@handleSizeChange = 'handleSizeChange'
					@handleCurrentChange = 'handleCurrentChange'
	 				>
	 			</pagination>
			</div>
		</el-dialog>
		<div class="refruse-wrap">
        <el-dialog title="拒单原因" width='400px' center :visible.sync="innerVisibleWrap" top='20%' :close-on-click-modal ='false' @close="closeFn">
					<div style="margin-top: -20px;">
						<el-row>
						  <el-col :span="5">订单编号：</el-col>
						  <el-col :span="19">{{orderId}}</el-col>
						</el-row>
            <br>
						<el-row>
						  <el-col :span="5">拒单原因：</el-col>
						  <el-col :span="19">{{refusalReason}}</el-col>
						</el-row>
            <br>
						<el-row>
						  <el-col :span="5">操作人：</el-col>
						  <el-col :span="19">{{creator}}</el-col>
						</el-row>
					</div>
			</el-dialog>
		</div>
  </div>
</template>

<script>
	import api from "@/api/index"
	import CommonTable from '@/components/custManage/dialog/CommonTable'
	import Pagination from '@/components/common/Pagination'
	export default {

		name:'DialogOrdreList',

		props: {
	  	visibleObj: {
	  		type: Object,
	  		default: function () {
	        return {
	        	dialogTableVisible: false,
            innerVisible: false,
	        }
	      }
	  	},
      // innerVisible: {
      //   type: Boolean,
      //   default: false
      //
      // },
	  },
	  data () {
	    return {
	    	currentPage:1,
	  		total: 0,
	  		pageNo: 1,
        pageSize: 10,
        // innerVisible: false,
	    	gridData: [],
       crmCustInfoId: '',
        refusalReason: '',
        orderId:'',
        creator:'',
        innerVisibleWrap: this.visibleObj.innerVisible
	    }
	  },
    mounted() {
		  console.log(this.visibleObj,this.innerVisibleWrap,'============')
    },
	  methods: {
      closeFn() {
        this.innerVisibleWrap = false
        this.visibleObj.innerVisible = false
        console.log( this.visibleObj,4555555555555)
      },
	  	queryRefusalReasonFn(crmApplayId) {
    		let pararms = {
          crmApplayId: crmApplayId
    		}
    		api.queryRefusalReason(pararms).then(res => {
					if(res.data.success) {
						this.creator = res.data.data.creator
						this.orderId = res.data.data.orderId
							this.refusalReason = res.data.data.refusalReason
					} else {
						this.$notify({
				           title: '提示',
				           message: res.data.msg,
				           duration: 1500
				        });
					}
				})
    	},
	  	queryOrderList(crmCustInfoId){
        console.log(888888,crmCustInfoId);
        this.crmCustInfoId = crmCustInfoId
	  			api.queryOrderList({
	  				pageSize:this.pageSize,
	  				pageNo:this.pageNo,
//	  				crmCustInfo:crmCustInfoId,
						crmCustInfo:crmCustInfoId,
	  			}).then((res) =>{
					if (res.data.code==1) {
            console.log(3333,res.data.data);
            this.gridData = res.data.data
						this.total = res.data.total
					}
				})
  		},
	  	showRefuseDialog(row,orShow) {
	  		// this.visibleObj.innerVisible = true
        this.innerVisibleWrap = true
//	  		this.refrusedApplyId = row.crmApplayId
	  		this.queryRefusalReasonFn(row.crmApplayId)
	  		console.log(row,orShow,1236666666)
	  		console.log(row.date,1236666666)
	  	},
	  	handleSizeChange(val) {
				this.currentPage = 1
				this.pageNo = 1
				this.pageSize = val
				this.queryOrderList(this.crmCustInfoId)
//				console.log(val,777777777777)
			},
			handleCurrentChange(val) {
				this.pageNo = val
				this.queryOrderList(this.crmCustInfoId)
//				console.log(val,88888888)
			},
	  },
	  components: {
	  	CommonTable,
	  	Pagination
	  },
    watch: {
		//   'visibleObj.innerVisible'(val) {
		//
      //   console.log(this.innerVisibleWrap,666666666666668888888888888)
      // },
      visibleObj:{//深度监听，可监听到对象、数组的变化
       handler(val, oldVal){
         console.log(val,88888888888888);
         if (val.innerVisible) {
           this.innerVisibleWrap = true
         }
         console.log("b.c: "+val.innerVisible, oldVal.c);//但是这两个值打印出来却都是一样的
       },
       deep:true
     }
    }
}
</script>
<style scoped lang="less">
	.order-list {
		.pagWrap {
			margin-top: 10px;
			text-align: right;
		}
		.refruse-wrap {
			p {
				sapn {
					display: inline-block;
					width: 100px;
				}
			}
		}
	}
</style>
