<template>
  <div class="count">
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <el-tab-pane label="城市黑名单列表" name="first">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="姓名：">
            <el-input v-model="formInline.user" ></el-input>
          </el-form-item>
          <el-form-item label="身份证：">
            <el-input v-model="formInline.user" ></el-input>
          </el-form-item>
          <el-form-item label="添加渠道：">
            <el-select v-model="formInline.status">
              <el-option label="管理平台" value="open"></el-option>
              <el-option label="APP后台" value="closed"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态：">
            <el-select v-model="formInline.status">
              <el-option label="待生效" value="open"></el-option>
              <el-option label="生效中" value="closed"></el-option>
              <el-option label="已过期" value="closed"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="生效城市：" >
            <el-col :span="11" >
              <el-input v-model="formInline.electricstart" ></el-input>
            </el-col>
            <el-col class="line" :span="1" style="text-align: center">-</el-col>
            <el-col :span="11">
              <el-input v-model="formInline.electricend"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="生效时间：">
            <el-date-picker
              v-model="value6"
              type="daterange">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="失效时间：">
            <el-date-picker
              v-model="value6"
              type="daterange">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="违法时间：">
            <el-date-picker
              v-model="value6"
              type="daterange">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="违法原因：">
            <el-input v-model="formInline.user" ></el-input>
          </el-form-item>
          <el-button type="primary" @click="onSubmit('condition')">查询</el-button>
          <el-button type="primary" @click="onExport">导出</el-button>
        </el-form>
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="adminphone"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="adminphone"
            label="身份证">
          </el-table-column>
          <el-table-column
            prop="city"
            label="生效城市">
          </el-table-column>
          <el-table-column
            prop="city"
            label="生效时间">
          </el-table-column>
          <el-table-column
            prop="city"
            label="失效时间">
          </el-table-column>
          <el-table-column
            prop="city"
            label="违法时间">
          </el-table-column>
          <el-table-column
            prop="date"
            label="违法原因">
          </el-table-column>
          <el-table-column
            prop="date"
            label="添加渠道">
          </el-table-column>
          <el-table-column
            prop="date"
            label="状态">
          </el-table-column>
          <el-table-column
            prop="date"
            label="维修中">
          </el-table-column>
          <el-table-column
            prop="date"
            label="操作者">
          </el-table-column>
          <el-table-column
            prop="date"
            label="操作时间">
          </el-table-column>
          <el-table-column
            prop="date"
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

      </el-tab-pane>
      <el-tab-pane label="城市黑名单添加" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="黑名单导入" name="second">配置管理</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        activeName2: 'first',
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
    created: function () {
      this.onSubmit('condition')
    },
    methods: {
      handleClick (tab, event) {
        console.log(tab, event)
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
  }
</script>
<style scoped>
  .count {
    margin-left: 250px;
  }

</style>
