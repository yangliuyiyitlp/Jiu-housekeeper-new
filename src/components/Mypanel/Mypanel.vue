<template>
  <div class="mypanel">
    <mypanel-sidebar></mypanel-sidebar>
    <mypanel-content></mypanel-content>
  </div>
</template>
<script>
  import MypanelSidebar from '@/components/Mypanel/Mypanel_sidebar.vue'
  import MypanelContent from '@/components/Mypanel/Mypanel_content.vue'

  export default {
    data () {
      return {}
    },
    methods: {},
    components: {
      MypanelSidebar: MypanelSidebar,
      MypanelContent: MypanelContent
    }
  }
</script>
<style scoped>
  .mypanel {
    height: 100%;
  }


</style>
