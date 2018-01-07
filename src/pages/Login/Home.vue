<template>
  <div>
    <p>欢迎登录</p>
    <!--<router-link :to="{path:'/404',query: {sessionId:sessionId,userName:userName}}">跳转</router-link>-->
  </div>
</template>
<script>
//  import Cookie from 'js-cookie'

  export default {
    data () {
      return {
//        sessionId: Cookie.get('sessionId'),
//        userName: Cookie.get('username')
      }
    }
  }
</script>
