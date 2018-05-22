<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

import * as types from './store/types'
export default {
 	name: 'app',
 	computed:{
//		loadingCount(){
//			return this.$store.state.loadingCount
//		}
	},
	beforeCreate(){
//		window.full_loadingInstance={
//			close(){}
//		}
	},
	created(){
//		var userinfo=null
//		if(userinfo=localStorage.getItem("userinfo")){
//			userinfo=JSON.parse(userinfo)
//			this.$store.commit(types.UPDATE_NAVIGATION,userinfo.mudules)
//			this.$store.commit(types.UPDATE_userinfo,userinfo)
//		}

//			$("head").append('<script src="/kindEditor/kindeditor-all-min.js"></scirpt>')
	},
	watch:{
//		loadingCount:function(newData){
//			if(newData==0){
//				full_loadingInstance.close()
//				console.log("loading close ...")
//			}else{
//				console.log("loading ...")
//				window.full_loadingInstance=vm.$loading({
//						text: '正在加载中...'
//				})
//			}
//		}
	}
}
</script>

<style>

</style>
