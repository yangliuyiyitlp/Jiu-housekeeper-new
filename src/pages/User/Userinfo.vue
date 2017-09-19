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
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <br/>
    <label>归属公司：</label><span></span><br/>
    <label>归属部门：</label><span></span><br/>
    <label>姓名：</label><input type="text" id="inp5"><span></span><br/>
    <label>邮箱：</label><input type="text" id="inp3"><span></span><br/>
    <label>座机：</label><input type="text" id="inp4"><span></span><br/>
    <label>手机：</label><input type="text" id="inp2"><span></span><br/>
    <!--<el-form-item label="备注">-->
    <!--<el-input type="textarea" ></el-input>-->
    <!--</el-form-item>-->
    <label>用户类型：</label><span></span><br/>
    <label>用户角色：</label><span></span><br/>
    <label>上次登录：</label><span></span><br/>
    <input type="button" value="保存">

  </div>
</template>
<script>
  export default {
    data () {
      return {
        imageUrl: ''
      }
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
      }
    }
  }
</script>
<style scoped>
  .container {
    width: 600px;
    margin-left: -300px;
    left: 50% !important;
    position: absolute;
    margin-top: 100px;
  }

  /*上传头像*/
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .el-upload{
    border: 1px dashed #d9d9d9!important;
    border-radius: 6px!important;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff!important;
  }
  .el-upload:hover {
    border-color: #20a0ff!important;
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
</style>
