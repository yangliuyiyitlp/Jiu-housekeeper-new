<template>
 <div class="app_about">
	<div class="edit" style="width:500px;padding-top: 20px;">
	    <editor
			ref='edit'
			id="editor_id" :minHeight="300" :content="editorText"
	        pluginsPath="/static/kindEditor/plugins/"
	        :allowImageRemote=' false'
	        :items= 'item'
	        :loadStyleMode="false"
	        :uploadJson = 'uploadJson'
	        @on-content-change="onContentChange">
	    </editor>
		<div class="btn">
			<el-button  type="info" @click='viewH5'>预览H5</el-button>
		    <el-button type="primary" @click='saveHtml'>保存</el-button>
		</div>
	</div>
</div>
</template>

<script>
import api from "@/api/index"
export default {
  	name: 'app_about',
  	props: {
//		tableData:{
//			type: Array,
//			default: function () {
//				return []
//			}
//		}
  	},

	data() {
	  	return {
	  		item: ['source', '|', 'undo', 'redo', '|', 'cut', 'copy', 'paste',
          'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright',
          'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'clearhtml', 'selectall', '|', 'fullscreen', '/',
          'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
          'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|', 'image',
           'table', 'hr'],
	  		editorText: '',
      		editorText2: '',
      		uploadJson: '',
	  		htmlTop: '',
	  		htmlBot: '',
	  		src: '',
	  		id:'',
	  		RevisedialogFormVisible: false
	  	}
	},
	created(){
		this.uploadJson = api.etitorUpload()
//		debugger
		console.log(this.uploadJson,12121212121)
	},
	mounted() {
		this.initialHtml()
	},
    methods: {
		initialHtml(){
			api.queryAppAbout().then(res => {
				console.log(res,1212121)
//				this.editorText = res.data
				if(res.data.success) {
//					const inHtml = '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0" /><title></title></head><body><span style="color:#EE33EE;font-size:30px;">14</span><span style="color:#EE33EE;">4</span><span style="color:#EE33EE;">44</span>4</body></html>'
					const inHtml = res.data.data.data
					this.editorText = inHtml
					this.id = res.data.data.id
					this.src = inHtml
				} else {
					this.$notify({
			           title: '提示',
			           message: res.data.msg,
			           duration: 1500
			        });
				}
			})
		},
		onContentChange (val) {
	      this.editorText = val
//	      var etitor = window.KindEditor()
	      console.log(this.editorText)
	       console.log(this.editorText)
	       console.log(6666)
	    },
	    onContentChange2 (val) {
	      this.editorText2 = val
	    },
	    afterChange () {
	    },
	    viewH5() {
	    	// this.src=this.htmlTop + this.editorText  + this.htmlBot
	    	this.src=this.editorText
	    	//this.RevisedialogFormVisible = true
	    	var routeData = this.$router.resolve({
	        	path: '/appAbout',
	      	});
	      	window.open(routeData.href);

	    },
	    saveHtml() {
	    	// const html_con = this.htmlTop + this.editorText  + this.htmlBot
	    	const html_con = this.editorText
        // let html_nbsp = html_con.split(';')
        // let htmlLen =html_nbsp.length
        // let htmlStr =html_nbsp.join(',')


        if(html_con.length<=0){
	    	  this.$message.warning("内容不能为空")
          return false;
        }
	    	const parm = {
	    		id: this.id,
	    		data: this.editorText
	    	}
	    	console.log(parm)
	    	api.saveApp(parm).then(res => {
	    		this.$notify({
		           title: '提示',
		           message: res.data.msg,
		           duration: 1500
		        });
	    		console.log(res.data)
	    	})
	    },

    },
	  components: {

	  }

 }
</script>
<style  lang="less" scoped>
	.app_about {
		.btn {
			text-align: right;
			margin-top: 20px;
			button {
		    	width: 100px;
			}
		}
	}
	.a1 .ke-container {

    width: 100% !important;
}
</style>
