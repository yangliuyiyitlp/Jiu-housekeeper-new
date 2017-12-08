<template>
<div class="container">
<label>头像：</label>
<el-upload
class="avatar-uploader  el-upload"
action="https://jsonplaceholder.typicode.com/posts/"
:show-file-list="false"
:on-success="handleAvatarSuccess"
:before-upload="beforeAvatarUpload">
<img v-if="imageUrl" :src="imageUrl" class="avatar">
<i v-else class="el-icon-plus
 avatar-uploader-icon"></i>
</el-upload>
<br/>
<div class="el-form-item__content">
<div class="input">
<label>归属公司：</label><span></span><br/>
<label>归属部门：</label><span></span><br/>
<label>姓名：</label><input class='width' id="inp5"><span></span><br/>
<label>邮箱：</label><input class='width' id="inp3"><span></span><br/>
<label>座机：</label><input class='width' id="inp4"><span></span><br/>
<label>手机：</label><input class='width' id="inp2"><span></span><br/>
<!--<el-form-item label="备注">-->
<!--<el-input type="textarea" ></el-input>-->
<!--</el-form-item>-->
  <label>备注：</label><input type='textarea' class='width height' id="in6"><span></span><br/>
<label>用户类型：</label><span></span><br/>
<label>用户角色：</label><span></span><br/>
<label>上次登录：</label><span></span><br/>
  <input type="button" value="保存" class="submit" @click="keep">
</div>
</div>
</div>
</template>
<script>
  import {checkReg} from '../../assets/js/userinfo'
  export default {
    data () {
      return {
        imageUrl: ''
      }
    },
    mounted () {
    },
    methods: {
      handleAvatarSuccess (res, file) {
        this.imageUrl = URL.createObjectURL(file.raw)
      },
      beforeAvatarUpload (file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      },
      keep () {
        checkReg(document.getElementById('inp2'), /^(13[0-9]|14[57]|15[0-25-9]|17[0137]|18[0-9])\d{8}$/)
        checkReg(document.getElementById('inp3'), /^\w+@\w+(\.\w+)+$/)
        checkReg(document.getElementById('inp4'), /^0\d{2,3}-\d{7,8}$/)
        checkReg(document.getElementById('inp5'), /^[\u4e00-\u9fa5]{2,4}$/)
      }
    }
  }
</script>
<style scoped>
.container {
width: 600px;
margin-left: -300px;
left: 50% !important;
position: relative;
margin-top: 50px;
}
.width{
  width:300px;
}
.height{
  height:100px;
}
/*上传头像开始*/
.avatar-uploader .el-upload {
border: 1px dashed #d9d9d9;
border-radius: 6px;
cursor: pointer;
position: relative;
overflow: hidden;
}
.avatar-uploader-icon{
  border: 1px dashed #d9d9d9 !important;
}
.el-upload {
/*border: 1px dashed #d9d9d9 !important;*/
border-radius: 6px !important;
margin-left:20px;
}

.avatar-uploader .el-upload:hover {
border-color: #20a0ff !important;
}

.el-upload:hover {
border-color: #20a0ff !important;
}

.avatar-uploader-icon {
font-size: 28px;
color: #8c939d;
width: 178px;
height: 178px;
line-height: 178px;
text-align: center;
}

.avatar {
width: 178px;
height: 178px;
display: block;
}

/*上传头像结束*/
input {
background-color: #fff;
background-image: none;
border-radius: 4px;
border: 1px solid #bfcbd9;
box-sizing: border-box;
color: #1f2d3d;
font-size: inherit;
height: 36px;
line-height: 1;
outline: 0;
padding: 3px 10px;
transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
margin-bottom: 5px;
margin-left:20px;
}
.input{
font-size:14px;
}
.submit{
margin-top:60px;
background-color: #20a0ff;
color:#fff;
position: absolute;
margin-left:50%;
cursor: pointer;
}

</style>
