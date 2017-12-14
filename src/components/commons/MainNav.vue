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
      <el-menu-item index="13" @click="serviceConfig" v-if="menus.serviceConfig">服务配置</el-menu-item>
      <li data-v-01c7fadb class="time right left">{{this.date | convertDate}}
        <a class='exit' href="#" @click="quit">退出</a>
      </li>
      <el-menu-item index="14" class="right " @click="user" v-if="menus.user">
        <i class="iconfont icon-anonymity"></i>个人信息({{username}})
      </el-menu-item>

    </el-menu>

  </div>
</template>

<script>
  import Cookie from 'js-cookie'

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
      this.username = Cookie.get('username')
      /* 如果cookie不存在，则跳转到登录页 */
      if (!Cookie.get('username')) {
        this.$router.push('/login')
      }
    },
    methods: {
      quit () {
        /* 删除cookie */
        while (Cookie.get('sessionId') !== '' && Cookie.get('sessionId') !== undefined) {
          Cookie.remove('username')
          Cookie.remove('sessionId')
        }
        sessionStorage.removeItem('menus')
        this.$router.push('/login')
      },
      handleSelect (key, keyPath) {
      },
      setting () {
        this.$router.push({
          name: getdefaultMenu('setting', this.menus)
        })
      },
      facility () {
        this.$router.push({
          name: getdefaultMenu('facility', this.menus)
        })
      },
      content () {
        this.$router.push({
          name: getdefaultMenu('content', this.menus)
        })
      },
      status () {
        this.$router.push({
          name: getdefaultMenu('status', this.menus)
        })
      },
      vip () {
        this.$router.push({
          name: getdefaultMenu('vip', this.menus)
        })
      },
      report () {
        this.$router.push({
          name: getdefaultMenu('report', this.menus)
        })
      },
      city () {
        this.$router.push({
          name: getdefaultMenu('city', this.menus)
        })
      },
      service () {
        this.$router.push({
          name: getdefaultMenu('service', this.menus)
        })
      },
      redpacket () {
        this.$router.push({
          name: getdefaultMenu('redpacket', this.menus)
        })
      },
      user () {
        this.$router.push({
          name: getdefaultMenu('user', this.menus)
        })
      },
      activity () {
        this.$router.push({
          name: getdefaultMenu('activity', this.menus)
        })
      },
      serviceConfig () {
        this.$router.push({
          name: getdefaultMenu('serviceConfig', this.menus)
        })
      }
    }
  }

  // 找到第一个name值作为默认页面
  function getdefaultMenu (menu, menus) {
    for (let key in menus) {
      if (key === menu) {
        if (menus[key][0].name) {
          return menus[key][0].name
        } else if (menus[key][0].children) {
          return menus[key][0].children[0].name
        }
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
  li.el-menu-item.right {
    float: right;
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

