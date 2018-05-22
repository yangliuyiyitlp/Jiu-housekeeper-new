<template>
	<el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
    </el-table>
</template>

<script>
	export default {
		props: {
			tableData :{
				type: Array,
				default: function() {
					return [10, 20, 30]
				}
			},
		},
	    data() {
	      return {
	      }
		},
		created() {
			
		},
		methods: {
		    handleSizeChange(val) {//每页要显示的条数
		      	this.$emit("handleSizeChange",val)
		    },
	        handleCurrentChange(val) {//当前页
	        	this.$emit("handleCurrentChange",val)
		    }
    	},
   }
</script>

<style scoped lang="less">
	.title-common-wrap {
		border-bottom: 1px solid #ddd;
	    /* box-shadow: 0 1px 0 #888888; */
	    line-height: 2;
	    div {
	    	span {
	    		display: inline-block;
	    		border-bottom: 3px solid #ff9900;
    			margin-bottom: -2px;
	    	}
	    }
	}
</style>