<template>
  <div class="common-table-wrap">
  		<el-table
		  	border
		  	:data="arrData">
		  	<el-table-column
		    	label="序号"
		      	type="index"
		      	align='center'
		      	width="50">
	    	</el-table-column>
		    <el-table-column prop="cptName" label="产品系列" align='center'>
		    </el-table-column>

		    <el-table-column  label="借款渠道" align='center'>
          <!--借款渠道：1是安卓  2 是ios-->
          <template slot-scope="scope">
            <span v-if="scope.row.loanChannel==1">安卓</span>
            <span v-if="scope.row.loanChannel==2">IOS</span>
          </template>
		    </el-table-column>

		    <el-table-column prop="amount" label="借款金额(元)" align='center'>
		    </el-table-column>
		    <el-table-column prop="periods" label="借款期限" align='center'>
		    </el-table-column>
		    <el-table-column prop="status" label="订单状态" align='center'>
		    	<template slot-scope="scope">
		    		<span v-if='scope.row.status == 1'>申请中</span>
			      <span v-if='(scope.row.status == 2) || (scope.row.status == 6) || (scope.row.status == 7) || (scope.row.status == 8) || (scope.row.status == 9)'>审批中</span>
			      <span v-if='scope.row.status == 3'>还款中</span>
			      <span v-if='scope.row.status == 4'>已结清</span>
			      <span
			      	v-if='scope.row.status == 5 || scope.row.status == 10'
			      	@click="showDialog(scope.row)" class='disAgree' size="mini">已拒单</span>
		      </template>
		    </el-table-column>
		     <el-table-column prop="createTime" label="申请时间" align='center' width='160px'>
		    </el-table-column>
		     <el-table-column label="操作" align='center'>
		     	<template slot-scope="scope">
			        <el-button
			        	v-if='scope.row.status != 5 && scope.row.status != 10 && scope.row.status != 4'
			        	type="primary" size="mini"
			        	@click='intoCustDetail(scope.row)'
			        	>查看详情</el-button>
		      </template>
		    </el-table-column>
		</el-table>
  </div>
</template>

<script>

export default {

	name:'commonTable',
	props: {
  		arrData:{
	  		type: Array,
	  		default: function () {
	        return []
	      }
	  	},
	  	total:{
	  		type: Number,
	  		default: function () {
	        return 0
	      }
	  	},
  	},
  	data () {
	    return {
	    	currentPage:1,
//	  		total: 0,
	  		pageNo: 1,
        pageSize: 10,
        innerVisible: false
	    }
  	},
    methods: {
	  	showDialog(row){
        console.log(22222,row);
        if(row.status == 5 || row.status == 10) {
	  			this.innerVisible = true
	  			this.$emit('showRefuse',row,true)
	  		}
	  	},
	  	intoCustDetail(row) {
//	  		console.log(row,777777777777)
	  		var routeData = this.$router.resolve({
        	path: '/detail/orderDetail',
        	query: {
        		crmApplayId: row.crmApplayId
        	}
      	});
      	window.open(routeData.href);
	  	}
	},
	components: {

	}
}
</script>
<style scoped lang="less">
	.common-table-wrap {
		.pagWrap {
			margin-top: 10px;
			text-align: right;
		}
    .disAgree{
      color:red;
    }
	}
</style>
