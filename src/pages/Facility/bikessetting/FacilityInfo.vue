<template>
  <div class="info">
    <el-form :inline="true" :model="formInline" style="padding-left:10px;" class="demo-form-inline">
      <el-form-item label="车辆编号：">
        <el-input v-model="formInline.user" placeholder="模糊查询"></el-input>
      </el-form-item>
      <el-form-item label="车辆状态：">
        <el-select v-model="formInline.region">
          <el-option label="正常" value="nomal"></el-option>
          <el-option label="使用中" value="useing"></el-option>
          <el-option label="离线" value="offline"></el-option>
          <el-option label="报废" value="scrap"></el-option>
          <el-option label="故障" value="breakdown"></el-option>
          <el-option label="电量低" value="powerlow"></el-option>
          <el-option label="僵尸车" value="zombie"></el-option>
          <el-option label="不可充电" value="notcharge"></el-option>
          <el-option label="维修中" value="repair"></el-option>
          <el-option label="未绑定" value="nobound"></el-option>
          <el-option label="电子围栏外" value="outline"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="城市代码：">
        <!--数模型-->
        <el-input
          icon="search"
          v-model="formInline.search"
          :on-icon-click="handleIconClick" @click="dialogVisible = true">
        </el-input>
      </el-form-item>
      <el-form-item label="车锁电压：">
        <el-input v-model="formInline.pressure" placeholder="电压小于XXX"></el-input>
      </el-form-item>
      <el-form-item label="车锁状态：">
        <el-select v-model="formInline.status">
          <el-option label="锁开" value="open"></el-option>
          <el-option label="锁关" value="closed"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="硬件版本：">
        <el-input v-model="formInline.edition" placeholder="精确查询"></el-input>
      </el-form-item>
      <el-form-item label="软件版本：">
        <el-input v-model="formInline.versions" placeholder="精确查询"></el-input>
      </el-form-item>
      <el-button type="primary" @click="onSubmit('condition')">查询</el-button>
      <el-button type="primary" @click="onExport">导出</el-button>
    </el-form>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="number"
        label="车辆编号">
      </el-table-column>
      <el-table-column
        prop="status"
        label="车辆状态">
      </el-table-column>
      <el-table-column
        prop="code"
        label="城市代码">
      </el-table-column>
      <el-table-column
        prop="pressure"
        label="车锁电压">
      </el-table-column>
      <el-table-column
        prop="state"
        label="车锁状态">
      </el-table-column>
      <el-table-column
        prop="edition"
        label="车锁硬件版本">
      </el-table-column>
      <el-table-column
        prop="version"
        label="车锁软件版本">
      </el-table-column>
      <el-table-column
        prop="line"
        label="最近连接">
      </el-table-column>
      <el-table-column
        prop="addtime"
        label="添加时间">
      </el-table-column>
      <el-table-column
        prop="person"
        label="操作者">
      </el-table-column>
      <el-table-column
        prop="date"
        label="操作时间">
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注">
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
        <el-button @click="onsearch">搜索</el-button>
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
      },
      onsearch () {}
    }
  }
</script>
<style scoped>
  .info {
  
  }


</style>

