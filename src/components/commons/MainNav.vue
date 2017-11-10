<template>
  <div id="NavBar">
    <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <li data-v-01c7fadb class="img"><img class='Mainimg' src="../../assets/images/99.png" alt=""></li>
      <li data-v-01c7fadb class="img">赳管家</li>
      <el-menu-item index="3" @click="setting">系统设置</el-menu-item>
      <el-menu-item index="4" @click="facility">设备管理</el-menu-item>
      <el-menu-item index="5" @click="content">内容管理</el-menu-item>
      <el-menu-item index="6" @click="status">状态监控</el-menu-item>
      <el-menu-item index="7" @click="vip">会员管理</el-menu-item>
      <el-menu-item index="8" @click="report">报表统计</el-menu-item>
      <el-menu-item index="9" @click="city">城市运营</el-menu-item>
      <el-menu-item index="10" @click="service">客服管理</el-menu-item>
      <el-menu-item index="11" @click="redpacket">红包管理</el-menu-item>
      <el-menu-item index="12" @click="activity">活动中心</el-menu-item>
      <el-submenu index="13" class="right ">
        <template slot="title"><i class="iconfont icon-anonymity"></i>个人信息</template>
        <el-menu-item index="2-1" class="user" @click="userinfo">个人信息</el-menu-item>
        <el-menu-item index="2-2" class="user" @click="userpwd">修改密码</el-menu-item>
      </el-submenu>
      <li data-v-01c7fadb class="time right">{{this.date | convertDate}}</li>
    </el-menu>
  </div>
</template>

<script>

  export default {
    data () {
      return {
        activeIndex: '1',
        date: new Date()
      }
    },
    methods: {
      handleSelect (key, keyPath) {
        console.log(key, keyPath)
      },
      // 跳转侧边栏页面，根据传的值展示对应模块侧边栏
      userinfo () {
        this.$router.push({
          name: 'Userdfinfo', query: {module: 'userinfo'}
        })
      },
      mypanel () {
        this.$router.push({
          name: 'Mypanel', query: {module: 'mypanel'}
        })
      },
      userpwd () {
        this.$router.push({
          name: 'Userdfpwd', query: {module: 'userpwd'}
        })
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
          name: 'city.company.info'
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
      activity () {
        this.$router.push({
          name: 'activity.message'
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

  .icon-anonymity {
    font-size: 14px !important;
  }

  .right {
    float: right;
  }

  .time {
    float: right;
    height: 60px;
    line-height: 60px;
    margin: 0;
    position: relative;
    box-sizing: border-box;
    color: #bfcbd9;
    margin-right: -40px;
    font-size: 14px;
  }

  .user {
    /*background-color: #eef1f6 !important;*/
    padding: 0 !important;
    width: 0px !important;
    margin: 0px;
    font-size: 14px !important;
  }

  /*.el-menu--horizontal .el-submenu>.el-menu{*/
  /*padding:0px!important;*/
  /*}*/
</style>

