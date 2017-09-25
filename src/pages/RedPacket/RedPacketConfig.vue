<template>
  <div>
    <div class="right">
      <!--表格-->
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <!--红包参数配置列表-->
        <el-tab-pane label="红包参数配置列表" name="first">
          <!--筛选条件-->
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="总个数:">
              <el-col :span="11">
                <el-input placeholder="最小值"></el-input>
              </el-col>
              <el-col class="line" :span="1">-</el-col>
              <el-col :span="11">
                <el-input placeholder="最大值"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="总金额:">
              <el-col :span="11">
                <el-input placeholder="最小值"></el-input>
              </el-col>
              <el-col class="line" :span="1">-</el-col>
              <el-col :span="11">
                <el-input placeholder="最大值"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="红包概率:">
              <el-col :span="11">
                <el-input placeholder="最小值"></el-input>
              </el-col>
              <el-col class="line" :span="1">-</el-col>
              <el-col :span="11">
                <el-input placeholder="最大值"></el-input>
              </el-col>
            </el-form-item>

            <el-form-item label="日期:">
              <date-pickers></date-pickers>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="search">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="exportData">导出</el-button>
            </el-form-item>
          </el-form>
          <!--表格-->
          <!--分页组件-->
          <paginations></paginations>
        </el-tab-pane>

        <!--红包参数配置添加-->
        <el-tab-pane label="红包参数配置添加" name="second">
          <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="总个数:">
              <el-input v-model="form.total_number" placeholder="红包的总个数"></el-input>
            </el-form-item>
            <el-form-item label="总金额:">
              <el-input v-model="form.total_amount" placeholder="红包的总金额"></el-input>
            </el-form-item>
            <el-form-item label="红包概率:">
              <el-input v-model="form.probability" placeholder="红包的中奖概率"></el-input>
            </el-form-item>
            <el-form-item label="个人单日个数:">
              <el-input v-model="form.person_number" placeholder="个人单日领取红包的个数"></el-input>
            </el-form-item>
            <el-form-item label="最大金额:">
              <el-input v-model="form.money_max" placeholder="单个红包的最大金额"></el-input>
            </el-form-item>
            <el-form-item label="最小金额:">
              <el-input v-model="form.money_min" placeholder="单个红包的最小金额"></el-input>
            </el-form-item>
            <el-form-item label="日期:">
              <date-pickers></date-pickers>
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
        labelPosition: 'right',
        form: {
          total_number: '',
          total_amount: '',
          probability: '',
          person_number: '',
          money_max: '',
          money_min: ''
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

  .el-input, .el-input__inner {
    width: 220px;
  }
</style>
