<template>
  <div class="mypanel">
    <div class="row">
      <div class="skillselect">
        <ul>
          <li v-for="(item,index) in items" :key="index" v-on:click="clickImg(item.icon)">{{item.name}}</li>
        </ul>
      </div>
      <mycomponent :is="myicon"></mycomponent>

    </div>
  </div>
</template>
<script>
  import Userinfo from '@/pages/User/Userinfo.vue'
  import SiderBar from '@/pages/Mypanel/SiderBar.vue'
  import Userpwd from '@/pages/User/Userpwd.vue'

  export default {
    data () {
      return {
        parentMsg: 'skill',
        items: [
          {name: '个人信息', icon: 'Userinfo'},
          {name: '修改密码', icon: 'Userpwd'}
        ],
        myicon: 'userinfo'
      }
    },
    components: {
      SiderBar,
      Userinfo,
      Userpwd
    },
    methods: {
      clickImg: function (icon) {
        this.myicon = icon
      }
    }
//    ,
//    created () {
//      if (this.$route.query.module === 'userinfo') {
//        this.myicon = 'userinfo'
//      } else if (this.$route.query.module === 'userpwd') {
//        this.myicon = 'Userpwd'
//      }
//    }
  }
</script>
<style scoped>
  html, body {
    height: 100%;
  }
  .mypanel {
    height: 100%;
  }
  .skillselect {
      width: 200px;
      height: 100% !important;
      /*float: left;*/
      border:1px solid #ccc;
  }
.row{
  position: relative;
}

</style>
