<template>
  <div class="info">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="用户姓名：">
        <el-input v-model="formInline.user" placeholder="模糊查询"></el-input>
      </el-form-item>
      <el-form-item label="手机号：">
        <el-input v-model="formInline.user" placeholder="模糊查询"></el-input>
      </el-form-item>
      <el-form-item label="车辆编号：">
        <el-input v-model="formInline.user" placeholder="模糊查询"></el-input>
      </el-form-item>
      <el-form-item label="订单类型：">
        <el-select v-model="formInline.status">
          <el-option label="未确认还车" value="open"></el-option>
          <el-option label="免费" value="closed"></el-option>
          <el-option label="支付宝支付" value="closed"></el-option>
          <el-option label="微信支付" value="closed"></el-option>
          <el-option label="余额支付" value="closed"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="交易标志：">
        <el-select v-model="formInline.status">
          <el-option label="废订单" value="open"></el-option>
          <el-option label="预订单" value="closed"></el-option>
          <el-option label="订单开始" value="closed"></el-option>
          <el-option label="订单结束" value="closed"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="租车方式：">
        <el-select v-model="formInline.status">
          <el-option label="GPRS借车" value="open"></el-option>
          <el-option label="蓝牙租车" value="closed"></el-option>
        </el-select>
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
    <!--隐藏表单用于查询-->
    <form v-show="false" action="" method="post" ref="FileForm">
      <input name="attributionCompany" v-model="exportParam.attributionCompany"/>
      <input name="attributionSection" v-model="exportParam.attributionSection"/>
      <input name="loginName" v-model="exportParam.loginName"/>
      <input name="name" v-model="exportParam.name"/>
      <input name="pageSize" v-model="exportParam.pageSize"/>
      <input name="pageNo" v-model="exportParam.pageNo"/>
    </form>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="number"
        label="订单号">
      </el-table-column>
      <el-table-column
        prop="status"
        label="用户姓名">
      </el-table-column>
      <el-table-column
        prop="code"
        label="手机号">
      </el-table-column>
      <el-table-column
        prop="pressure"
        label="用户类型">
      </el-table-column>
      <el-table-column
        prop="state"
        label="交易金额">
      </el-table-column>
      <el-table-column
        prop="edition"
        label="交易标志">
      </el-table-column>
      <el-table-column
        prop="version"
        label="租车方式">
      </el-table-column>
      <el-table-column
        prop="line"
        label="订单类型">
      </el-table-column>
      <el-table-column
        prop="addtime"
        label="借车时间">
      </el-table-column>
      <el-table-column
        prop="person"
        label="车辆编号">
      </el-table-column>
      <el-table-column
        prop="date"
        label="所属城市">
      </el-table-column>
      <el-table-column
        prop="date"
        label="电池编号">
      </el-table-column>
      <el-table-column
        prop="date"
        label="车辆类型">
      </el-table-column>
      <el-table-column
        prop="date"
        label="里程数">
      </el-table-column>
      <el-table-column
        prop="date"
        label="消耗卡路里">
      </el-table-column>
      <el-table-column
        prop="date"
        label="骑行时间">
      </el-table-column>
      <el-table-column
        prop="date"
        label="还车时间">
      </el-table-column>
      <el-table-column
        prop="remark"
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
    <!--导出-->
    <el-dialog size='tiny' title="导出" :visible.sync="exportFormVisible" :show-close="false"
               :close-on-press-escape="false"
               :close-on-click-modal="false" class="demo-ruleForm ">
      <el-button @click="exportCurrent">导出当前页</el-button>
      <el-button @click="exportAll">导出所有</el-button>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelExport">取 消</el-button>
      </div>
    </el-dialog>
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
        exportFormVisible: false,
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
        exportParam: {},
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

