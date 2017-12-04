<template>
  <div id="NavBar">
    <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <li data-v-01c7fadb class="img"><img class='Mainimg' src="../../assets/images/99.png" alt=""></li>
      <li data-v-01c7fadb class="img">赳管家</li>
      <el-menu-item index="3" @click="setting" v-if="menus.setting">系统设置</el-menu-item>
      <el-menu-item index="4" @click="facility" v-if="menus.facility">设备管理</el-menu-item>
      <el-menu-item index="5" @click="content" v-if="menus.content">内容管理</el-menu-item>
      <el-menu-item index="6" @click="status" v-if="menus.status">状态监控</el-menu-item>
      <el-menu-item index="7" @click="vip" v-if="menus.vip">会员管理</el-menu-item>
      <el-menu-item index="8" @click="report" v-if="menus.report">报表统计</el-menu-item>
      <el-menu-item index="9" @click="city" v-if="menus.city">城市运营</el-menu-item>
      <el-menu-item index="10" @click="service" v-if="menus.service">客服管理</el-menu-item>
      <el-menu-item index="11" @click="redpacket" v-if="menus.redpacket">红包管理</el-menu-item>
      <el-menu-item index="12" @click="activity" v-if="menus.activity">活动中心</el-menu-item>
      <li data-v-01c7fadb class="time right left">{{this.date | convertDate}}
        <a class='exit' href="#" @click="quit">退出</a>
      </li>
      <el-menu-item index="13" class="right " @click="user" v-if="menus.user">
        <i class="iconfont icon-anonymity"></i>个人信息({{username}})
      </el-menu-item>

    </el-menu>

  </div>
</template>

<script>
  import { getCookie, delCookie } from '../../assets/js/cookie.js'

  export default {
    data () {
      return {
        activeIndex: '1',
        date: new Date(),
        menus: {},
        username: ''
      }
    },
    mounted () {
      let menu = sessionStorage.getItem('menus')
      this.menus = JSON.parse(menu)
      /* 页面挂载获取保存的cookie值，渲染到页面上 */
      this.username = getCookie('username')
      /* 如果cookie不存在，则跳转到登录页 */
      if (getCookie('username') === '' || getCookie('username') === 'undefined') {
        this.$router.push('/login')
      }
    },
    methods: {
      quit () {
        /* 删除cookie */
        while (getCookie('token') !== '') {
          delCookie('username')
          delCookie('token')
        }
        sessionStorage.removeItem('menus')
        this.$router.replace('/login')
      },
      handleSelect (key, keyPath) {
//        console.log(key, keyPath)
      },
      setting () {
        this.$router.push({
          name: 'setting.user'
        })
      },
      facility () {
        this.$router.push({
          name: 'tabs'
        })
      },
      content () {
        this.$router.push({
          name: 'content.release'
        })
      },
      status () {
        this.$router.push({
          name: 'status.bike.map'
        })
      },
      vip () {
        this.$router.push({
          name: 'vip.info'
        })
      },
      report () {
        this.$router.push({
          name: 'report.vip'
        })
      },
      city () {
        this.$router.push({
          name: 'city.bike.intervene.list'
        })
      },
      service () {
        this.$router.push({
          name: 'service.change.credit'
        })
      },
      redpacket () {
        this.$router.push({
          name: 'redpacket.click'
        })
      },
      user () {
        this.$router.push({
          name: 'user.info'
        })
      },
      activity () {
        this.$router.push({
//          name: 'activity.message'  一进来到红包雨页面
          name: 'activity.red.rain'
        })
      }
    }
  }

</script>
<style scoped>
  .img {
    float: left;
    margin: 0;
    position: relative;
    box-sizing: border-box;
    color: #bfcbd9;
    font-size: 30px;
    height: 60px;
    line-height: 60px;
  }

  .Mainimg {
    height: 60px !important;
  }

  li {
    font-size: 20px;
    font-family: Arial, "Microsoft YaHei";
    padding: 14px;
  }

  .el-menu {
    padding-bottom: 20px;
  }

  .icon-anonymity {
    font-size: 14px !important;
  }

  .right {
    float: right;
    font-size: 14px !important;
  }

  .left {
    margin-left: 20px;
  }

  .time {
    float: right;
    height: 60px;
    line-height: 60px;
    margin: 0;
    position: relative;
    box-sizing: border-box;
    color: #bfcbd9;
    font-size: 14px;
  }

  .exit {
    color: #bfcbd9;
    text-decoration: none;
  }

  .user {
    /*background-color: #eef1f6 !important;*/
    padding: 0 !important;
    width: 0px !important;
    margin: 0px;
    font-size: 14px !important;
  }
</style>

