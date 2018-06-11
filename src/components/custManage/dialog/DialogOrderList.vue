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
			<el-dialog
				center
	  		width='400px'
	  		title="拒单原因" :visible.sync="visibleObj.innerVisible" top='35vh' :close-on-click-modal="false">
					<div style="margin-top: -20px;">
						<el-row>
						  <el-col :span="5">订单编号：</el-col>
						  <el-col :span="19">{{refrusedApplyId}}</el-col>
						</el-row>
            <br>
						<el-row>
						  <el-col :span="5">拒单原因：</el-col>
						  <el-col :span="19">{{subcategories}}</el-col>
						</el-row>
            <br>
						<el-row>
						  <el-col :span="5">操作人：</el-col>
						  <el-col :span="19">系统自动</el-col>
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
            innerVisible:false
	        }
	      }
	  	},

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
        refrusedApplyId: '',
        subcategories:''
	    }
	  },
	  methods: {
	  	queryRefusalReasonFn(crmApplayId) {
    		let pararms = {
    			crmApplayId: crmApplayId
    		}
    		api.queryRefusalReason({crmApplayId}).then(res => {
					if(res.data.success) {
						this.subcategories = res.data.data.subcategories
							this.refrusedApplyId = res.data.data.orderId
		//				this.tableData = res.data.data
					} else {
						this.$notify({
				           title: '提示',
				           message: res.data.msg,
				           duration: 1500
				        });
					}
					console.log(res.data.data,6666)
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
	  		this.visibleObj.innerVisible = true
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
