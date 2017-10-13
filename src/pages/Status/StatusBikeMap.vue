<template>
  <div>{{msg}}
    <hr>
    <el-button type="primary" v-on:click="postServer">点我</el-button>
    <div id="formDiv">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="用户名:">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码:">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="头像:">
          <input type="file" @change="getFile">
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  export default {
    data: function () {
      return {
        msg: '啥玩意',
        param: {name: ''},
        form: {
          username: '',
          password: '',
          avatar: ''
        }
      }
    },
    methods: {
      onSubmit: function () {
        var formData = new FormData() // 一个form表单的对象 然后可以设置表单的值模拟 multipart/form-data这种请求头的请求
        console.log('0' + formData.toString())
        formData.append('username', this.form.username) // 文件数据
        formData.append('password', this.form.password) // 其他的一些参数
        formData.append('file', this.form.avatar) // 其他的一些参数
//        console.error(formData)
        this.$ajax(
          {
            method: 'post',
            url: '/form/submit',
            data: formData,
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        ).then(function (response) {
          this.$message({
            message: response.data,
            type: 'success'
          })
          console.log(response.data)
        }).catch(function (error) {
          console.log(error)
        })
      },
      getFile: function ($event) {
        this.form.avatar = $event.target.files[0]
      },
      postServer: function () {
        console.log(1)
        this.$ajax(
          {
            method: 'post',
            url: '/rest/netease/receiverMsg',
            data: {
              'eventType': '6',
              'fileinfo': '[{"caller":true,"channelid":"6290737000999815988","filename":"xxxxxx.type","md5":"a9b248e29669d588dd0b10259dedea1a","mix":false,"size":"2167","type":"gz","vid":"1062591","url":"http://www.baidu.com/my.mp4","user":"zhangsan"}]'
            },
            headers: {
              'Content-Type': 'application/json',
              'CurTime': '1440570500855',
              'MD5': '0bf59f96e44edd9a5430fe890718d3a2',
              'CheckSum': 'ffe75980d6e48aa44ed747d31111acccd1456473'
            }
          }
        ).then(function (response) {
          console.log(response.data)
        }).catch(function (error) {
          console.log(error)
        })
      }
    }
  }
</script>
<style>
  #formDiv {
    width: 35%;
    margin: auto;
  }
</style>

