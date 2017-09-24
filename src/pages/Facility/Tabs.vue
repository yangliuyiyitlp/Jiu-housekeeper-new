<template>
  <div class="tab">
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <el-tab-pane label="锁厂人员注册列表" name="first" class="borderleft">
        <div class="demo-input-size">
          <label>账户：</label><input type="text" v-model="user">
          <label>厂家名称：</label><input type="text" v-model="name">
          <label>锁厂家编号：</label><input type="text"  v-model="number">
          登录状态：<select name="" id="">
            <option value="是">是</option>
            <option value="否">否</option>
          </select>
          <button>查询</button>
          <button>导出</button>
        </div>
       <pdus></pdus>
      </el-tab-pane>
      <el-tab-pane label="锁厂人员注册添加" name="second">配置管理</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  // 引入表单修改删除功能
  import Pdus from './bikessetting/FacilityPdus.vue'
  export default {
    data () {
      return {
        activeName2: 'first',
        user: '',
        name: '',
        number: ''
      }
    },
    methods: {
      handleClick (tab, event) {
        console.log(tab, event)
      }
    },
    components: {
      Pdus
    }
  }
</script>
<style scoped>
  .tab {
    margin-left: 201px;
  }
  .demo-input-size{
    padding-left:50px;
  }
  label{
    margin-left:10px;
  }
.demo-input-size input{
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
  transition: border-color .2s cubic-bezier(.645,.045,.355,1);
  font-size:16px;
}
select{
  width:200px;
  height:30px;
  font-size:16px;
  border-radius: 4px;
  border: 1px solid #bfcbd9;
  padding:3px 10px;
  height: 36px;
}
  button {
    width: 50px;
    height: 36px;
    line-height: 36px;
    margin: 0 auto;
    border: none;
    background-color: #20a0ff;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    border-radius: 4px;
    margin-left:10px;
  }

</style>

