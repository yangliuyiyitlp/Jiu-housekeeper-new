<template>
  <div>
    <div class="right">
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="会员管理列表" name="first">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="姓名:">
              <el-input v-model="formInline.user" placeholder="姓名"></el-input>
            </el-form-item>
            <el-form-item label="昵称">
              <el-input v-model="formInline.user" placeholder="昵称"></el-input>
            </el-form-item>
            <el-form-item label="手机号:">
              <el-input v-model="formInline.user" placeholder="手机号"></el-input>
            </el-form-item>
            <el-form-item label="身份证:">
              <el-input v-model="formInline.user" placeholder="身份证"></el-input>
            </el-form-item>

            <el-form-item label="信用积分:">
              <el-col :span="11">
                <el-input v-model="formInline.user" placeholder="最小值"></el-input>
              </el-col>
              <el-col class="line" :span="1">-</el-col>
              <el-col :span="11">
                <el-input v-model="formInline.user" placeholder="最大值"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="红包:">
              <el-col :span="11">
                <el-input v-model="formInline.user" placeholder="最小值"></el-input>
              </el-col>
              <el-col class="line" :span="1">-</el-col>
              <el-col :span="11">
                <el-input v-model="formInline.user" placeholder="最大值"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="累计大卡:">
              <el-col :span="11">
                <el-input v-model="formInline.user" placeholder="最小值"></el-input>
              </el-col>
              <el-col class="line" :span="1">-</el-col>
              <el-col :span="11">
                <el-input v-model="formInline.user" placeholder="最大值"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="累计时间:">
              <el-col :span="11">
                <el-input v-model="formInline.user" placeholder="最小值"></el-input>
              </el-col>
              <el-col class="line" :span="1">-</el-col>
              <el-col :span="11">
                <el-input v-model="formInline.user" placeholder="最大值"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="累计距离:">
              <el-col :span="11">
                <el-input v-model="formInline.user" placeholder="最小值"></el-input>
              </el-col>
              <el-col class="line" :span="1">-</el-col>
              <el-col :span="11">
                <el-input v-model="formInline.user" placeholder="最大值"></el-input>
              </el-col>
            </el-form-item>

            <el-form-item label="注册状态:">
              <el-select v-model="formInline.region" placeholder="选择注册状态">
                <el-option label="押金充值" value="1"></el-option>
                <el-option label="无身份证验证审核" value="2"></el-option>
                <el-option label="手机认证" value="3"></el-option>
                <el-option label="退款冻结" value="4"></el-option>
                <el-option label="实名有押金" value="5"></el-option>
                <el-option label="待支付" value="6"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="借车状态:">
              <el-select v-model="formInline.region" placeholder="选择借车状态">
                <el-option label="借车处理中" value="1"></el-option>
                <el-option label="借车中" value="2"></el-option>
                <el-option label="还车" value="3"></el-option>
                <el-option label="未确认还车" value="4"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="最近借车:">
              <date-pickers></date-pickers>
            </el-form-item>

            <el-form-item label="注册时间:">
              <date-pickers></date-pickers>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="search">查询</el-button>
            </el-form-item>
          </el-form>
          <!--<table-info></table-info>-->
          <paginations></paginations>
        </el-tab-pane>

        <el-tab-pane label="会员管理添加" name="second">
          <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="用户积分">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="信用分">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="form.name" type="textarea" class='textarea'></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="saveData">保存</el-button>
              <el-button>返回</el-button>
            </el-form-item>
          </el-form>
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
        },
        labelPosition: 'right',
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
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
      saveData () {
        console.log('saveData!')
      }
    }
  }
</script>

<style scoped>
  .right {
    margin-left: 270px;
  }
  .textarea, .el-input, .el-input__inner{
    width: 300px;
  }
</style>
