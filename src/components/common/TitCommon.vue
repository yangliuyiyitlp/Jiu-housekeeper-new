<template>
 <div>
 	<div class="title-common">{{title}}</div>
 </div>
</template>

<script>
export default {
  name: 'title',
  props: {
  	title: {
  		type: String,
  		default: ''
  	}
  }
 }
</script>
<style lang="less" scoped>
	.title-common {
		font-size: 16px;
		font-style: italic;
		border-bottom: 1px solid #ccc;
		padding: 5px 0 15px;
	}
</style>
