<template>
<div class="login">
  <!--<div class="login-ti">
      <div class="login-titile">
                         营销中心管理平台
      </div>

  </div>
  <div class="login-main">
      <div class="login-left left">

      </div>
      <div class="login-right left" >
          <p class="logname">用户登录</p>
          <p>
            <input type="text" placeholder="用户名" class="loginname" v-model.trim="loginname" @keyup.enter="loginbtn">
          </p>
          <p>
           <input type="password" placeholder="密码" @keyup.enter="loginbtn" class="loginpwd" v-model="password" />
          </p>
          <p>
            <input type="text" @keyup.enter="loginbtn" placeholder="验证码" class="loginyzm" v-model="logpwd"><img  :src="codeurl"><i @click="getuuid" class="fa fa-refresh" style="color:#3d94ff" aria-hidden="true"></i>
          </p>
          <p class="loginmsg">
              {{errmsg}}
          </p>
          <p>
           <input type="button" value="登录" class="loginbtn" @click="loginbtn"  />
          </p>
      </div>
  </div>-->

</div>
</template>
<script>
//import api from "../../api";
//import * as types from "@/store/types";
//import { baseURL, baseURLDownload } from '../../api/config.js';
//import router from '../../router'
//import { USERNAME } from '../../store/types'

export default {
  data() {
    return {
      loginname: "",
      password: "",
      logpwd: "",
      errmsg: "",
      uuid: "",
      codeurl:""
    };
  },
  methods: {
    loginbtn() {
//
//    if (this.loginname.length == 0) {
//      this.errmsg = "请输入用户名";
//      return;
//    }
//    if (this.password.length == 0) {
//      this.errmsg = "请输入密码";
//      return;
//    }
//    if (this.logpwd.length == 0) {
//      this.errmsg = "请输入验证码";
//      return;
//    }
//    api.login({
//        password: this.password,
//        username: this.loginname,
//        uuid: this.uuid,
//        verifyCode:this.logpwd,
//        type:1
//      })
//      .then(res => {
//        console.log(res.data.code,22)
//          if(res.data.code=='1'){
//              localStorage.timer = new Date().getTime();
//              localStorage.token=res.data.accessToken;
//              localStorage.userinfo=JSON.stringify(res.data.data);
//								this.$store.commit(types.UPDATE_NAVIGATION,res.data.data.mudules)
//								this.$store.commit(types.UPDATE_userinfo,res.data.data)
//              this.errmsg='';
//              //router.push({ path: 'home'})
////              router.push({ path: '/work/activity'})
//              
//              
//              let activityUrl = ''
//								if (res.data.data.mudules) {
//									activityUrl = res.data.data.mudules[0]['url']
//								}
//								router.push({ path: activityUrl})
//
//          }else{
//              this.errmsg=res.data.msg;
//          }
//      })
//      .catch(err => {
//        console.log(err);
//      });
    },
    uuidfn() {
//    var s = [];
//    var hexDigits = "0123456789abcdef";
//    for (var i = 0; i < 36; i++) {
//      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
//    }
//    s[14] = "4";
//    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
//    s[8] = s[13] = s[18] = s[23] = "-";
//    var uuid = s.join("");
//    this.uuid = uuid;
    },
    getuuid() {
       this.codeurl=baseURLDownload+'/verifycode/'+this.uuid+'?'+Math.random();
    }
  },
  created() {
//
//  this.uuidfn();
//  this.getuuid();
  }
};
</script>
