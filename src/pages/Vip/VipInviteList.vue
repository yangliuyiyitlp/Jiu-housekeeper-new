<template>
  <div>
    <vip-bar></vip-bar>
    <div class="right">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="邀请者">
          <el-input v-model="formInline.user" placeholder="邀请者"></el-input>
        </el-form-item>
        <el-form-item label="邀请者手机">
          <el-input v-model="formInline.user" placeholder="邀请者手机"></el-input>
        </el-form-item>
        <el-form-item label="被邀请者">
          <el-input v-model="formInline.user" placeholder="被邀请者"></el-input>
        </el-form-item>
        <el-form-item label="被邀请手机">
          <el-input v-model="formInline.user" placeholder="被邀请手机"></el-input>
        </el-form-item>
        <el-form-item label="被邀请状态">
          <el-select v-model="formInline.region" placeholder="选择被邀请状态">
            <el-option label="实名用户" value="1"></el-option>
            <el-option label="临时用户" value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否有效">
          <el-select v-model="formInline.region" placeholder="选择是否有效">
            <el-option label="待更新" value="1"></el-option>
            <el-option label="有效" value="2"></el-option>
            <el-option label="无效" value="3"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="邀请时间:">
          <date-pickers></date-pickers>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="exportData">导出</el-button>
        </el-form-item>
      </el-form>
      <!--<table-info></table-info>-->
      <paginations></paginations>
    </div>
  </div>
</template>

<script>
  import VipBar from '@/components/commons/Ztree/VipBar.vue'
  export default {
    data () {
      return {
        formInline: {
          user: '',
          region: ''
        }
      }
    },
    components: {
      VipBar
    },
    methods: {
      search () {
        console.log('search!')
      },
      exportData () {
        console.log('exportData!')
      }
    }
  }
</script>

<style scoped>
  .right {
    margin-left: 270px;
  }
</style>
