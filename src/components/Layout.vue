<template>
  <div class="layout-wraps">
  	<Headers :muneList='listMenu'></Headers>
  	<div class="router-wrap">
	  	<router-view></router-view>
  	</div>
  	<div v-show='showHome' class="homeTit">  		
  		欢迎您登录小贷后台管理系统
  	</div>
  </div>
</template>
<script>
import Headers from '@/components/header/Header'
import api from "@/api/index"
export default {
  name: 'home',  
  components: {
  	Headers
  },
  data() {
  	return {
  		showHome: false,
  		listMenu: []
  	}
  },
  created() {
// 	console.log(12313);
  	this.getLoginData()
  },
  mounted(){
  	if(this.$route.path == '/home'){
			this.showHome = true
//				console.log(this.$route,1233213213132)		   
		} else {
			this.showHome = false
		}
  },
  methods:{
  	getLoginData() {
//		console.log(12313);
			api.queryMenulist().then(res=>{
				if (res.data.menuList.length != 0) {    				
    				this.listMenu = res.data.menuList
//  				console.log(this.listMenu,787878)
    			} else {
    					this.$notify({
				          title: '提示',
				          message: res.data.msg,
				          duration: 1500
				        });
    			}
			})
  	}
  },
  watch: {
		    $route() {
		    	if(this.$route.path == '/home'){
		    		this.showHome = true
		    			console.log(this.$route,1233213213132)		   
		    	} else {
		    		this.showHome = false
		    	}
		    
		    },
	    },
 }
</script>
<style lang="less" scoped>
	.homeTit {
    text-align: center;
    font-size: 35px;
    font-weight: bold;
    margin-top: 15%;
	}
	.router-wrap {
		padding: 0 20px 20px 20px;
	}
</style>