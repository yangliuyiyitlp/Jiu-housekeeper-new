<template>
  <div class="info">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="用户姓名：">
        <el-input v-model="formInline.user" ></el-input>
      </el-form-item>
      <el-form-item label="用户昵称：">
        <el-input v-model="formInline.user" ></el-input>
      </el-form-item>
      <el-form-item label="手机号：">
        <el-input v-model="formInline.user" ></el-input>
      </el-form-item>
      <el-form-item label="订单模式：">
        <el-select v-model="formInline.status">
          <el-option label="押金订单" value="open"></el-option>
          <el-option label="余额订单" value="closed"></el-option>
          <el-option label="消费订单" value="closed"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单状态：">
        <el-select v-model="formInline.status">
          <el-option label="充值未完成" value="open"></el-option>
          <el-option label="充值成功" value="closed"></el-option>
          <el-option label="提现中" value="closed"></el-option>
          <el-option label="提现异常" value="closed"></el-option>
          <el-option label="提现成功" value="closed"></el-option>
          <el-option label="手工提现" value="closed"></el-option>
          <el-option label="提现失败" value="closed"></el-option>
          <el-option label="信用分<=80分" value="closed"></el-option>
          <el-option label="扣除押金" value="closed"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="充值方式：">
        <el-select v-model="formInline.status">
          <el-option label="支付宝" value="open"></el-option>
          <el-option label="微信" value="closed"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="转账支付宝：">
        <el-input v-model="formInline.user" ></el-input>
      </el-form-item>
      <el-form-item label="回调码：">
        <el-input v-model="formInline.user" ></el-input>
      </el-form-item>
      <el-button type="primary" @click="query">查询</el-button>
      <el-button type="primary" @click="exportFile">导出</el-button>
      <span type="primary" @click="more" class="moreStyle">更多查询</span>
      <div ref=" more" v-if="showMore" class="moreFloat">
        <el-form-item label="订单号：">
          <el-input v-model="formInline.user" class="timeInput"></el-input>
        </el-form-item>
        <el-form-item label="里程数：">
          <el-input v-model="formInline.user" class="timeInput"></el-input>
          -
          <el-input v-model="formInline.user" class="timeInput"></el-input>
        </el-form-item>
        <el-form-item label="消费卡路里：">
          <el-input v-model="formInline.user" class="timeInput"></el-input>
          -
          <el-input v-model="formInline.user" class="timeInput"></el-input>
        </el-form-item>
        <el-form-item label="借车时间:">
          <el-date-picker
            class="timeInput"
            v-model="formInline.beginAddTime"
            type="datetime">
          </el-date-picker>
          -
          <el-date-picker
            class="timeInput"
            v-model="formInline.endAddTime"
            type="datetime">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="还车时间:">
          <el-date-picker
            class="timeInput"
            v-model="formInline.beginAddTime"
            type="datetime">
          </el-date-picker>
          -
          <el-date-picker
            class="timeInput"
            v-model="formInline.endAddTime"
            type="datetime">
          </el-date-picker>
        </el-form-item>
      </div>
    </el-form>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="number"
        label="用户名称">
      </el-table-column>
      <el-table-column
        prop="status"
        label="用户昵称">
      </el-table-column>
      <el-table-column
        prop="code"
        label="用户手机">
      </el-table-column>
      <el-table-column
        prop="pressure"
        label="金额">
      </el-table-column>
      <el-table-column
        prop="state"
        label="订单模式">
      </el-table-column>
      <el-table-column
        prop="edition"
        label="订单状态">
      </el-table-column>
      <el-table-column
        prop="version"
        label="充值方式">
      </el-table-column>
      <el-table-column
        prop="line"
        label="充值订单">
      </el-table-column>
      <el-table-column
        prop="addtime"
        label="退款单号">
      </el-table-column>
      <el-table-column
        prop="person"
        label="交易号">
      </el-table-column>
      <el-table-column
        prop="date"
        label="转账支付宝">
      </el-table-column>
      <el-table-column
        prop="date"
        label="转账单号">
      </el-table-column>
      <el-table-column
        prop="date"
        label="回调码">
      </el-table-column>
      <el-table-column
        prop="date"
        label="回调信息">
      </el-table-column>
      <el-table-column
        prop="date"
        label="添加时间">
      </el-table-column>
      <el-table-column
        prop="date"
        label="备注">
      </el-table-column>
      <el-table-column
        prop="date"
        label="操作">
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
  import baseUrl from '../../utils/baseUrl.js'

  export default {
    created: function () {
      this.query()
    },
    data () {
      return {
        dialogVisible: false,
        showMore: false,
        formInline: {
          user: '',
          region: '',
          pressure: '',
          status: '',
          edition: '',
          versions: '',
          search: '',
          key: '',
          pageSize: 10,
          index: 1
        },
        tableData: [{
          number: '0008',
          status: '正常',
          code: '01',
          pressure: '0',
          state: '锁开',
          edition: '0',
          version: '0',
          line: 'ddd',
          addtime: '2017-09-09 19:00:38',
          person: '李四',
          date: '2016-05-02',
          remark: 'aaa'
        }],
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
      query: function () {},
      exportFile () {
        this.exportFormVisible = true
      },
      cancelExport () {
        this.exportFormVisible = false
      },
      exportCurrent () {
        this.exportParam.pageNo = this.pagination.pageNo
        this.exportParam.pageSize = this.pagination.pageSize
        this.$refs['FileForm'].setAttribute('action', `${baseUrl}/activity/enjoy/export`)
        this.$refs['FileForm'].submit()
        this.exportFormVisible = false
      },
      exportAll () {
        this.exportParam.pageSize = ''
        this.exportParam.pageNo = ''
        this.$refs['FileForm'].setAttribute('action', `${baseUrl}/activity/enjoy/exportAll`)
        this.$refs['FileForm'].submit()
        this.exportFormVisible = false
      },
      more () {
        if (this.showMore === true) {
          this.showMore = false
        } else {
          this.showMore = true
        }
      }
    }
  }
</script>
<style scoped>
  @import '../../assets/css/common.css';

  .demo-form-inline {
    padding-left: 10px;
  }
  .moreStyle {
    font-size: 14px;
    color: #20a0ff;
    cursor: pointer;
    folat:left;
  }
  .el-form-item__content .el-input .el-input__inner{
    width:100px!important;
  }
</style>

