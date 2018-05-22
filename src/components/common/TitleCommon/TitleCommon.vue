<template>
	<div class="title-common-wrap">
		<div>
			<span>{{title}}</span>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			title : {
				type: String,
				default: '渠道商维护'
			}
		}
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