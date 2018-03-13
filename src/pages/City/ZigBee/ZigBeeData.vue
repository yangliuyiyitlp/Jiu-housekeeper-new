<template>
  <div class="info">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="运营商：">
        <el-select v-model="formInline.status">
          <el-option label="全部" value="open"></el-option>
          <el-option label="免费" value="closed"></el-option>
          <el-option label="支付宝支付" value="closed"></el-option>
          <el-option label="微信支付" value="closed"></el-option>
          <el-option label="余额支付" value="closed"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="卡号码：">
        <el-input v-model="formInline.user"></el-input>
      </el-form-item>
      <el-form-item label="卡状态：">
        <el-select v-model="formInline.status">
          <el-option label="app会员" value="open"></el-option>
          <el-option label="运营人员" value="closed"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="月份：">
        <el-date-picker
          v-model="formInline.user"
          type="month"
          placeholder="选择月">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="车辆编号：">
        <el-input v-model="formInline.user"></el-input>
      </el-form-item>
      <el-form-item label="锁厂：">
        <el-select v-model="formInline.status">
          <el-option label="未确认还车" value="open"></el-option>
          <el-option label="免费" value="closed"></el-option>
          <el-option label="支付宝支付" value="closed"></el-option>
          <el-option label="微信支付" value="closed"></el-option>
          <el-option label="余额支付" value="closed"></el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" @click="query">查询</el-button>
    </el-form>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        v-if="0"
        prop="id"
        label="id">
      </el-table-column>
      <el-table-column
        prop="number"
        label="卡号码">
      </el-table-column>
      <el-table-column
        prop="status"
        label="运营商">
      </el-table-column>
      <el-table-column
        prop="code"
        label="卡状态">
      </el-table-column>
      <el-table-column
        prop="pressure"
        label="使用套餐">
      </el-table-column>
      <el-table-column
        prop="state"
        label="激活日期">
      </el-table-column>
      <el-table-column
        prop="edition"
        label="本月流量">
      </el-table-column>

      <el-table-column
        prop="line"
        label="本月短信（mbps）">
      </el-table-column>

      <el-table-column
        prop="person"
        label="车辆编号">
      </el-table-column>
      <el-table-column
        prop="date"
        label="锁厂">
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagination.index"
      :page-sizes="pagination.pageSizes"
      :page-size="pagination.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total">
    </el-pagination>
  </div>
</template>
<script>
  import baseUrl from '../../../utils/baseUrl.js'

  export default {
    created: function () {
      this.query()
    },
    data () {
      return {
        formInline: {
          pageSize: 30,
          pageNo: 1
        },
        tableData: [],
        pagination: {pageSizes: [30, 40, 60, 100], pageSize: 30, count: 0, pageNo: 1}
      }
    },
    methods: {
      handleSizeChange: function (val) {
        this.formInline.pageSize = val
        this.onSubmit('condition')
      },
      handleCurrentChange: function (val) {
        this.formInline.index = val
        this.onSubmit('condition')
      },
      handleIconClick (ev) {
        console.log(ev)
      },
      query () {}
    }
  }
</script>
<style scoped>
  @import '../../../assets/css/common.css';

  .el-form-item__content .el-input .el-input__inner{
    width:100px!important;
  }
</style>

