<template>
  <div>
    <div class="login-wrap" v-show="showLogin">
      <h3>赳管家</h3>
      <p v-show="showTishi">{{tishi}}</p>
      <input type="text" placeholder="请输入用户名" v-model="username">
      <input type="password" placeholder="请输入密码" v-model="password">
      <button v-on:click="login">登录</button>
      <span v-on:click="ToRegister">没有账号？马上注册</span>
    </div>

    <div class="register-wrap" v-show="showRegister">
      <h3>赳管家</h3>
      <p v-show="showTishi">{{tishi}}</p>
      <input type="text" placeholder="请输入用户名" v-model="newUsername">
      <input type="password" placeholder="请输入密码" v-model="newPassword">
      <button v-on:click="register">注册</button>
      <span v-on:click="ToLogin">已有账号？马上登录</span>
    </div>
  </div>
</template>

<style scoped>
  html,body{
    background-color: #f5f5f5;
    width: 100%;
    text-align: center;
  }
  .login-wrap,.register-wrap{
    text-align: center;
    margin:100px  auto;
    position: relative;
    width: 300px;
    padding: 25px 29px 29px;
    background-color: #fff;
    border: 1px solid #e5e5e5;
  }
  h3{
    font-family: Helvetica, Georgia, Arial, sans-serif, 黑体;
    font-size: 36px;
    margin-bottom: 20px;
    color: #0663a2;
  }
  input {
    display: block;
    width: 250px;
    height: 40px;
    line-height: 40px;
    margin: 0 auto;
    margin-bottom: 10px;
    outline: none;
    border: 1px solid #888;
    padding: 10px;
    box-sizing: border-box;
  }
  p {
    color: red;
  }
  button {
    display: block;
    width: 250px;
    height: 40px;
    line-height: 40px;
    margin: 0 auto;
    border: none;
    background-color: #20a0ff;
    color: #fff;
    font-size: 16px;
    margin-bottom: 5px;
    cursor: pointer;
  }
  span {
    cursor: pointer;
  }
  span:hover {
    color: #41b883;
  }
</style>

<script>
  import { setCookie, getCookie } from '../../assets/js/cookie.js'

  export default {
    data () {
      return {
        showLogin: true,
        showRegister: false,
        showTishi: false,
        tishi: '',
        username: '',
        password: '',
        newUsername: '',
        newPassword: ''
      }
    },
    mounted () {
      /* 页面挂载获取cookie，如果存在username的cookie，则跳转到主页，不需登录 */
      if (getCookie('username')) {
        this.$router.push('/home')
      }
    },
    methods: {
      login () {
        if (this.username === '' || this.password === '') {
          alert('请输入用户名或密码')
        } else {
          let data = {'username': this.username, 'password': this.password}
          /* 假的地址接口请求 */
          this.$http.post('http://localhost/vueapi/index.php/Home/user/login', data).then((res) => {
            console.log(res)
            /* 接口的传值是(-1,该用户不存在),(0,密码错误)，同时还会检测管理员账号的值 */
            if (res.data === -1) {
              this.tishi = '该用户不存在'
              this.showTishi = true
            } else if (res.data === 0) {
              this.tishi = '密码输入错误'
              this.showTishi = true
            } else if (res.data === 'admin') {   // 创建登录页login.vue时，做的判断是当用户名和密码都为admin时，认为它是管理员账号，跳转到管理页main.vue
              /* 路由跳转this.$router.push */
              this.$router.push('/main')
            } else {
              this.tishi = '登录成功'
              this.showTishi = true
              setCookie('username', this.username, 1000 * 60)
              setTimeout(function () {
                this.$router.push('/home')
              }.bind(this), 1000)
            }
          })
        }
      },
      ToRegister () {
        this.showRegister = true
        this.showLogin = false
      },
      ToLogin () {
        this.showRegister = false
        this.showLogin = true
      },
      register () {
        if (this.newUsername === '' || this.newPassword === '') {
          alert('请输入用户名或密码')
        } else {
          let data = {'username': this.newUsername, 'password': this.newPassword}
          this.$http.post('http://localhost/vueapi/index.php/Home/user/register', data).then((res) => {
            console.log(res)
            if (res.data === 'ok') {
              this.tishi = '注册成功'
              this.showTishi = true
              this.username = ''
              this.password = ''
              /* 注册成功之后再跳回登录页 */
              setTimeout(function () {
                this.showRegister = false
                this.showLogin = true
                this.showTishi = false
              }.bind(this), 1000)
            }
          })
        }
      }
    }
  }
</script>
