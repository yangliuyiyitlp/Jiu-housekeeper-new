<template>
  <div>
    <div class="right">
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="会员邀请统计列表" name="first">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="邀请者">
            <el-input v-model="formInline.user" placeholder="邀请者"></el-input>
          </el-form-item>
          <el-form-item label="邀请者手机">
            <el-input v-model="formInline.user" placeholder="邀请者手机"></el-input>
          </el-form-item>
          <el-form-item label="邀请次数:">
            <el-input v-model="formInline.user" placeholder="大于等于"></el-input>
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

          <el-form-item label="注册时间:">
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
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>

</template>

<script>
  export default {
    data () {
      return {
        activeName2: 'first',
        formInline: {
          user: '',
          region: ''
        }
      }
    },
    methods: {
      handleClick (tab, event) {
        console.log(tab, event)
      },
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
