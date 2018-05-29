<template>
    <div class="about" >
      <div v-html="html" class="cont"></div>      
      
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
  methods: {
    queryAbout(){
      api.queryAbout({

      }).then(res=>{
        this.html = res.data.data.data
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