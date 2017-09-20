<!--<template>-->
<!--<div class="container">-->
<!--<label>头像：</label>-->
<!--<el-upload-->
<!--class="avatar-uploader  el-upload"-->
<!--action="https://jsonplaceholder.typicode.com/posts/"-->
<!--:show-file-list="false"-->
<!--:on-success="handleAvatarSuccess"-->
<!--:before-upload="beforeAvatarUpload">-->
<!--<img v-if="imageUrl" :src="imageUrl" class="avatar">-->
<!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
<!--</el-upload>-->
<!--<br/>-->
<!--<div class="el-form-item__content">-->
<!--<div class="el-input">-->
<!--<label>归属公司：</label><span></span><br/>-->
<!--<label>归属部门：</label><span></span><br/>-->
<!--<label>姓名：</label><input type="text" id="inp5"><span></span><br/>-->
<!--<label>邮箱：</label><input type="text" id="inp3"><span></span><br/>-->
<!--<label>座机：</label><input type="text" id="inp4"><span></span><br/>-->
<!--<label>手机：</label><input type="text" id="inp2"><span></span><br/>-->
<!--<el-form-item label="备注">-->
<!--<el-input type="textarea" ></el-input>-->
<!--</el-form-item>-->
<!--<label>用户类型：</label><span></span><br/>-->
<!--<label>用户角色：</label><span></span><br/>-->
<!--<label>上次登录：</label><span></span><br/>-->
<!--</div>-->
<!--</div>-->
<!--<input type="button" value="保存" class="submit">-->
<!--</div>-->
<!--</template>-->
<!--<script>-->
<!--export default {-->
<!--data () {-->
<!--return {-->
<!--imageUrl: ''-->
<!--}-->
<!--},-->
<!--methods: {-->
<!--handleAvatarSuccess (res, file) {-->
<!--this.imageUrl = URL.createObjectURL(file.raw)-->
<!--},-->
<!--beforeAvatarUpload (file) {-->
<!--const isJPG = file.type === 'image/jpeg'-->
<!--const isLt2M = file.size / 1024 / 1024 < 2-->

<!--if (!isJPG) {-->
<!--this.$message.error('上传头像图片只能是 JPG 格式!')-->
<!--}-->
<!--if (!isLt2M) {-->
<!--this.$message.error('上传头像图片大小不能超过 2MB!')-->
<!--}-->
<!--return isJPG && isLt2M-->
<!--}-->
<!--}-->
<!--}-->
<!--</script>-->
<!--<style scoped>-->
<!--.container {-->
<!--width: 600px;-->
<!--margin-left: -300px;-->
<!--left: 50% !important;-->
<!--position: relative;-->
<!--margin-top: 50px;-->
<!--}-->

<!--/*上传头像开始*/-->
<!--.avatar-uploader .el-upload {-->
<!--border: 1px dashed #d9d9d9;-->
<!--border-radius: 6px;-->
<!--cursor: pointer;-->
<!--position: relative;-->
<!--overflow: hidden;-->
<!--}-->

<!--.el-upload {-->
<!--border: 1px dashed #d9d9d9 !important;-->
<!--border-radius: 6px !important;-->
<!--margin-left:20px;-->
<!--}-->

<!--.avatar-uploader .el-upload:hover {-->
<!--border-color: #20a0ff !important;-->
<!--}-->

<!--.el-upload:hover {-->
<!--border-color: #20a0ff !important;-->
<!--}-->

<!--.avatar-uploader-icon {-->
<!--font-size: 28px;-->
<!--color: #8c939d;-->
<!--width: 178px;-->
<!--height: 178px;-->
<!--line-height: 178px;-->
<!--text-align: center;-->
<!--}-->

<!--.avatar {-->
<!--width: 178px;-->
<!--height: 178px;-->
<!--display: block;-->
<!--}-->

<!--/*上传头像结束*/-->
<!--input {-->
<!--background-color: #fff;-->
<!--background-image: none;-->
<!--border-radius: 4px;-->
<!--border: 1px solid #bfcbd9;-->
<!--box-sizing: border-box;-->
<!--color: #1f2d3d;-->
<!--font-size: inherit;-->
<!--height: 36px;-->
<!--line-height: 1;-->
<!--outline: 0;-->
<!--padding: 3px 10px;-->
<!--transition: border-color .2s cubic-bezier(.645, .045, .355, 1);-->
<!--margin-bottom: 5px;-->
<!--margin-left:20px;-->
<!--}-->
<!--.el-input{-->
<!--font-size:14px;-->
<!--}-->
<!--.submit{-->
<!--margin-top:20px;-->
<!--background-color: #20a0ff;-->
<!--color:#fff;-->
<!--position: absolute;-->
<!--margin-left:70px;-->
<!--}-->

<!--</style>-->

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
    <form @submit.prevent="validateBeforeSubmit">
      <div class="column is-12">
        <label class="label">归属公司：</label>
        <span></span>
      </div>
      <div class="column is-12">
        <label class="label">归属部门：</label>
        <span></span>
      </div>
      <div class="column is-12">
        <label class="label">姓名：</label>
        <p class="control has-icon has-icon-right">
          <input name="name" v-model="name" v-validate="'required|alpha'"
               type="text" placeholder="Name">
          <i v-show="errors.has('name')" class="fa fa-warning"></i>
          <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
        </p>
      </div>
      <div class="column is-12">
        <label class="label">手机：</label>
        <p class="control has-icon has-icon-right">
          <input name="phone" v-model="phone" v-validate="'required|numeric'"
                 :class="{'input': true, 'is-danger': errors.has('phone') }" type="text" placeholder="Phone">
          <i v-show="errors.has('phone')" class="fa fa-warning"></i>
          <span v-show="errors.has('phone')" class="help is-danger">{{ errors.first('phone') }}</span>
        </p>
      </div>
      <div class="column is-12">
        <label class="label">邮箱：</label>
        <p class="control has-icon has-icon-right">
          <input name="email" v-model="email" v-validate="'required|email'"
                 :class="{'input': true, 'is-danger': errors.has('email') }" type="text" placeholder="Email">
          <i v-show="errors.has('email')" class="fa fa-warning"></i>
          <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
        </p>
      </div>
      <div class="column is-12">
        <label class="label">用户类型：</label>
        <span></span>
      </div>
      <div class="column is-12">
        <label class="label">用户角色：</label>
        <span></span>
      </div>
      <div class="column is-12">
        <label class="label">上次登录：</label>
        <span></span>
      </div>
      <div class="column is-12 sbt">
        <p class="control">
          <button class="button is-primary" type="submit">保存</button>
        </p>
      </div>
    </form>
  </div>
</template>
<script>
  export default {
    name: 'form-example',
    data: () => ({
      email: '',
      name: '',
      phone: '',
      url: '',
      imageUrl: ''
    }),
    methods: {
      validateBeforeSubmit () {
        this.$validator.validateAll().then((result) => {
          if (result) {
            // eslint-disable-next-line
            alert('From Submitted!')
            return
          }

          alert('Correct them errors!')
        })
      },
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
  /*p {*/
    /*display: inline-block !important;*/
  /*}*/

  .container {
    width: 600px;
    margin-left: -300px;
    left: 50% !important;
    position: relative;
    margin-top: 50px;
  }
.column p{
  /*margin-bottom: 5px;*/
  /*margin-left:32px;*/
}
label{
  /*text-align: right!important;*/
}
.label{
  /*margin-left:80px!important;*/
  /*padding-left: 20px;*/
}
  /*input {*/
  /*background-color: #fff;*/
  /*background-image: none;*/
  /*border-radius: 4px;*/
  /*border: 1px solid #bfcbd9;*/
  /*box-sizing: border-box;*/
  /*color: #1f2d3d;*/
  /*font-size: inherit;*/
  /*height: 36px;*/
  /*line-height: 1;*/
  /*outline: 0;*/
  /*padding: 3px 10px;*/
  /*transition: border-color .2s cubic-bezier(.645, .045, .355, 1);*/
  /*margin-bottom: 5px;*/
  /*margin-left:20px;*/
  /*}*/
  .sbt,.control{
    width:30px;
    height: 36px;
  }
  button {
    display: block;
    width:63px;
    height: 40px;
    border-radius: 4px;
    margin-top: 20px;
    background-color: #20a0ff;
    outline-style: none;
    color: #fff;
    position: absolute;
    /*margin-left: 70px;*/
    position: absolute;
    left:50%;
    /*left:-31px;*/
  }

  /*上传头像开始*/
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .el-upload {
    border: 1px dashed #d9d9d9 !important;
    border-radius: 6px !important;
    margin-left: 20px;
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

</style>
