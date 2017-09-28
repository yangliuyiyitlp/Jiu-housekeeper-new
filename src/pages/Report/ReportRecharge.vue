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
      <el-button type="primary" @click="onSubmit('condition')">查询</el-button>
      <el-button type="primary" @click="onExport">导出</el-button>
      <span style="color:#20a0ff">更多查询</span>
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
    <!--弹框-->
    <el-dialog
      title="选择区域"
      :visible.sync="dialogVisible"
      size="tiny"
      :before-close="handleClose">
      <el-form ref="formInline" :model="formInline" label-width="80px">
        <el-form-item label="关键字:">
          <el-input v-model="formInline.key" style="width:150px;"></el-input>
        </el-form-item>
        <el-button   @click="onsearch">搜索</el-button>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    created: function () {
      this.onSubmit('condition')
    },
    data () {
      return {
        dialogVisible: false,
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
        }, {
          number: '0009',
          status: '正常',
          code: '01',
          pressure: '0',
          state: '锁开',
          edition: '0',
          version: '0',
          line: 'ddd',
          addtime: '2017-09-09 19:00:38',
          person: '张三',
          date: '2016-05-02',
          remark: 'aaa'
        }],
        pagination: {pageSizes: [10, 20, 50, 100], pageSize: 10, total: 0, index: 1}
      }
    },
    methods: {
      handleClose (done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {})
      },
      onSubmit: function (condition) {
        var param = {}
        if (condition === 'condition') {
          param = this.formInline
        } else {
          param = condition
        }
        console.log(param)
        this.$http.post('/dataGrid/query', JSON.stringify(param)).then(function (response) {
          this.tableData = response.data.list
          this.pagination.total = response.data.total
        }, function (err) {
          this.$message({
            type: 'info',
            message: '获取列表信息失败' + err.status
          })
        })
      },
      handleSizeChange: function (val) {
        this.formInline.pageSize = val
        this.onSubmit('condition')
      },
      handleCurrentChange: function (val) {
        this.formInline.index = val
        this.onSubmit('condition')
      },
      onExport () {
        console.log('onexport!')
      },
      handleIconClick (ev) {
        console.log(ev)
      }
    }
  }
</script>
<style scoped>
  .info {
    margin-left: 250px;
  }


</style>

