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
  beforeCreate(){
  	
		

  },
  created() {
// 	console.log(12313);
  	this.getLoginData()
//	let pararms = {
//			menuId:this.$route.query.menuId
//		}
//	console.log('=====4544545=========')
//	if (this.$route.query.menuId) {
//		this.getBtns(pararms)
//	}
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
//	getBtns(pararms) {
//
//		console.log(pararms,666666666)
//		let permissionBtnObj = {}
//		if (JSON.parse(localStorage.getItem('permissionBtnObj'))) {
//			
//		}
//		const obj = {}
//		api.permissionBtnPower(pararms).then(res => {
//			let flag = res.data.data.options.indexOf('assigningCustomers12')
//			if (flag > -1) {
//				obj.assigningCustomers = true
//			} else {
//				obj.assigningCustomers = false
//			}
//			localStorage.setItem('obj',JSON.stringify(obj))
//			console.log(flag,888888777777)
//		})
//	},
  	getLoginData() {
//		console.log(12313);
			api.queryMenulist().then(res=>{
				if (res.data.menuList && res.data.menuList.length != 0) {
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
