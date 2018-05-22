<template>
 <div>
 1231654
 </div>
</template>

<script>

import router from '../router'


export default {
  name: 'home',
  
  beforeRouteEnter (to, from, next) {
    var userinfo = JSON.parse(localStorage.getItem('userinfo'))
    let activityUrl = ''
		if (userinfo.mudules) {
			activityUrl = userinfo.mudules[0]['url']
		}
		console.log(userinfo.mudules,"==========")
		router.push({ path: activityUrl})
     next();
	},

 }
</script>
