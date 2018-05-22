<template>
  <div class="hello">
     <editor 
     				ref='edit'
     				id="editor_id" height="500px" width="700px" :content="editorText"
            pluginsPath="/static/kindEditor/plugins/"
            :allowImageUpload='true'
            :loadStyleMode="false"
            :uploadJson = 'uploadJson'
            @on-content-change="onContentChange"></editor>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
       editorText: '',
       uploadJson: '../api/webInfo/kindEditImgUpload'
    }
  }, 
  methods: {
    onContentChange (val) {
      this.editorText = val
      console.log(this.$refs.edit.allowImageUpload)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
