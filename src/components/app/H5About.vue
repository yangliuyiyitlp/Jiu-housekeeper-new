<template>
    <div class="about" >
      <div v-html="html" class="cont"></div>      
      <!--1231233-->
    </div>
</template>

<script>
import api from '@/api/index.js'
export default {
  name: 'hello',
  data () {
    return {
    pageSize:10,
    pageNo:1,
    html:''
    }
  }, 
//beforeRouteEnter (to, from, next) {	 
//  next(vm => {
//    document.title = to.name || to.meta.name
////	     alert(12212)
//      console.log(to, document.title)
//    // 通过 `vm` 访问组件实例
//  })
//},
  
  methods: {
    queryAbout(){
      api.queryAbout().then(res=>{
        this.html = res.data.data.data
//		this.html = res.data
//		console.log(res.data)
      })
    }
  },
  mounted() {
this.queryAbout()
  },
  watch: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .about{
    width: 100%;
    line-height: 30px;
    .cont{
      padding: 20px;
    }
  }
</style>