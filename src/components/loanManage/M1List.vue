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
  		title: 'M1订单'
  	}
  },
  components: {
  	TitCommon
  }
  
 }
</script>
