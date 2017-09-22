<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="姓名">
      <el-input v-model="formInline.user" placeholder="姓名"></el-input>
    </el-form-item>
    <el-form-item label="昵称">
      <el-input v-model="formInline.user" placeholder="昵称"></el-input>
    </el-form-item>
    <el-form-item label="手机号">
      <el-input v-model="formInline.user" placeholder="手机号"></el-input>
    </el-form-item>
    <el-form-item label="身份证">
      <el-input v-model="formInline.user" placeholder="身份证"></el-input>
    </el-form-item>
    <el-form-item label="信用积分">
      <el-input v-model="formInline.user" placeholder="姓名"></el-input>
    </el-form-item>

    <el-form-item label="注册状态">
      <el-select v-model="formInline.region" placeholder="选择注册状态">
        <el-option label="押金充值" value="1"></el-option>
        <el-option label="无身份证验证审核" value="2"></el-option>
        <el-option label="手机认证" value="3"></el-option>
        <el-option label="退款冻结" value="4"></el-option>
        <el-option label="实名有押金" value="5"></el-option>
        <el-option label="待支付" value="6"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="借车状态">
      <el-select v-model="formInline.region" placeholder="选择借车状态">
        <el-option label="借车处理中" value="1"></el-option>
        <el-option label="借车中" value="2"></el-option>
        <el-option label="还车" value="3"></el-option>
        <el-option label="未确认还车" value="4"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="最近借车">
      <date-pickers></date-pickers>
    </el-form-item>
    <el-form-item label="注册时间">
      <date-pickers></date-pickers>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="search">查询</el-button>
    </el-form-item>
  </el-form>
</template>


<script>
  export default {
    data () {
      return {
        formInline: {
          user: '',
          region: ''
        }
      }
    },
    methods: {
      search () {
        console.log('search!')
      }
    }
  }
</script>
