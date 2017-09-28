<template>
  <div class="detailed">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="点位名称：">
        <el-input v-model="formInline.user" ></el-input>
      </el-form-item>
      <el-form-item label="点位地址：">
        <el-input v-model="formInline.photo" ></el-input>
      </el-form-item>
      <el-form-item label="所属城市：">
        <!--数模型-->
        <el-input
          icon="search"
          v-model="formInline.search"
          :on-icon-click="handleIconClick" @click="dialogVisible = true">
        </el-input>
      </el-form-item>
      <el-form-item label="小区域名称：">
        <el-input v-model="formInline.nub" ></el-input>
      </el-form-item>
      <el-form-item label="点位类型：">
        <el-select v-model="formInline.status">
          <el-option label="普通投放点" value="open"></el-option>
          <el-option label="维修点位" value="closed"></el-option>
          <el-option label="一期投放点" value="closed"></el-option>
          <el-option label="重点投放点" value="closed"></el-option>
          <el-option label="已投放点" value="closed"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否白线：">
        <el-select v-model="formInline.status">
          <el-option label="是" value="open"></el-option>
          <el-option label="否" value="closed"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="添加时间：">
        <el-date-picker
          v-model="value6"
          type="daterange">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="更新时间：">
        <el-date-picker
          v-model="value6"
          type="daterange">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="管理员：">
        <el-input v-model="formInline.nub" ></el-input>
      </el-form-item>
      <el-button type="primary" @click="onSubmit('condition')">查询</el-button>
      <el-button type="primary" @click="onExport">导出</el-button>
    </el-form>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="admin"
        label="点位名称">
      </el-table-column>
      <el-table-column
        prop="adminphone"
        label="点位类型">
      </el-table-column>
      <el-table-column
        prop="number"
        label="预估投放数">
      </el-table-column>
      <el-table-column
        prop="city"
        label="点位地址">
      </el-table-column>
      <el-table-column
        prop="city"
        label="是否白线">
      </el-table-column>
      <el-table-column
        prop="city"
        label="所属城市">
      </el-table-column>
      <el-table-column
        prop="city"
        label="所属小区域">
      </el-table-column>
      <el-table-column
      prop="city"
      label="点位操作员">
    </el-table-column>
      <el-table-column
        prop="date"
        label="添加时间">
      </el-table-column>
      <el-table-column
        prop="date"
        label="更新时间">
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
  export default {
    created: function () {
      this.onSubmit('condition')
    },
    data () {
      return {
        value6: '',
        formInline: {
          user: '',
          photo: '',
          nub: '',
          pageSize: 10,
          index: 1
        },
        tableData: [{
          admin: '0008',
          adminphone: '12345678999',
          number: '0',
          city: '上海',
          date: '2017-09-12 10:28:35'
        }, {
          admin: '0008',
          adminphone: '12345678999',
          number: '0',
          city: '北京',
          date: '2017-09-12 10:28:35'
        }],
        pagination: {pageSizes: [10, 20, 50, 100], pageSize: 10, total: 0, index: 1}
      }
    },
    methods: {
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
      }
    }
  }
</script>
<style scoped>
  .detailed {
    margin-left: 250px;
  }


</style>
