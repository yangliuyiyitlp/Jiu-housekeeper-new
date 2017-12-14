<template>
  <div class="padding">
    <p class="left">通道名</p>
    <p>权重</p>
    <form action="">
      <div><label>通道1</label>
        <button>-</button>
        <input type="text">
        <button>+</button>
        <el-progress :text-inside="true" :stroke-width="18" :percentage="70"></el-progress>
      </div>
      <div><label>通道1</label>
        <button>-</button>
        <input type="text">
        <button>+</button>
        <el-progress :text-inside="true" :stroke-width="18" :percentage="70"></el-progress>
      </div>
      <div><label>通道1</label>
        <button>-</button>
        <input type="text">
        <button>+</button>
        <el-progress :text-inside="true" :stroke-width="18" :percentage="70"></el-progress>
      </div>
      <div><label>通道1</label>
        <button>-</button>
        <input type="text">
        <button>+</button>
        <el-progress :text-inside="true" :stroke-width="18" :percentage="70"></el-progress>
      </div>
    </form>
    <el-form-item>
      <el-button type="primary" @click="save">保存</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">发送</el-button>
    </el-form-item>

  </div>
</template>
<script>
  export default {
    data () {
      return {}
    },
    methods: {
      save () {},
      submit () {}
    }
  }
</script>
<style>
  .padding {
    padding-top: 100px;
    margin-left: 20%;
    width: 600px;
  }

  .left {
    float: left;
    margin-right: 85px;
  }

  p {
    font-size: 20px;
    font-weight: 900;
  }

  label {
    margin-right: 100px;
  }

  .el-progress {
    width: 200px;
    float: right;
  }

  input {
    width: 50px;
    text-align: center;
  }

</style>
