<template>
  <div class="mypanel">
    <div class="row">
      <sider-bar v-bind:message="parentMsg"></sider-bar>
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
  import MypanelContent from '@/components/Mypanel/Mypanel_content.vue'
  import SiderBar from '@/components/Mypanel/SiderBar.vue'
  import Userpwd from '@/pages/User/Userpwd.vue'
  export default {
    data () {
      return {
        parentMsg: 'skill',
        items: [
          {name: '折线图', icon: 'MypanelContent'},
          {name: '柱状图', icon: 'Userpwd'}
        ],
        myicon: 'MypanelContent'
      }
    },
    components: {
      SiderBar,
      MypanelContent,
      Userpwd
    },
    methods: {
      clickImg: function (icon) {
        this.myicon = icon
      }
    }
  }
</script>
<style scoped>
  html, body {
    height: 100%;
  }

  .mypanel {
    height: 100%;
  }

  .side {
    width: 200px;
    height: 100% !important;
    float: left;
  }


</style>
