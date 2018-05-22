<template>
 <div class="allCustList">
 	<TitCommon :title='title'></TitCommon>
 </div>
</template>

<script>
import TitCommon from '@/components/common/TitCommon'
export default {
  name: 'allOverdue',
  data() {
  	return {
  		title: '预催收订单'
  	}
  },
  components: {
  	TitCommon
  }
  
 }
</script>
