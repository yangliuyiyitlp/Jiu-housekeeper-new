<template>
  <div class="right">
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <!--车辆图标配置列表-->
      <el-tab-pane label="车辆图标配置列表" name="first">

        <!--筛选条件-->
        <el-form :inline="true" :model="formInline" class="demo-form-inline">

          <el-form-item label="车辆状态:">
            <el-select v-model="formInline.bicycle_status" placeholder="选择车辆状态" clearable>
              <el-option label="僵尸车" value="1"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="车辆类型:">
            <el-select v-model="formInline.bicycle_type" placeholder="选择车辆类型" clearable>
              <el-option label="自行车" value="1"></el-option>
              <el-option label="电单车" value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="城市名称:">
            <el-input v-model="formInline.city_name" placeholder="城市名称">
            </el-input>
          </el-form-item>

          <el-form-item label="是否默认:">
            <el-select v-model="formInline.isDefault" placeholder="是否默认" clearable>
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="添加时间:">
            <el-date-picker
              v-model="formInline.add_date"
              type="datetimerange"
              placeholder="选择时间范围">
            </el-date-picker>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="exportData">导出</el-button>
          </el-form-item>
        </el-form>

        <!--表格-->
        <el-table
          :data="tableData"
          style="width: 100%"
          border
          stripe>
          <el-table-column
            header-align="center"
            align="center"
            prop="city_name"
            label="城市名称"
            width="110">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="bicycle_status"
            label="车辆状态"
            width="110">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="bicycle_type"
            label="车辆类型"
            width="110">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="isDefault"
            label="是否默认"
            width="110">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="effective_date"
            label="生效时间"
            width="170">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="failure_date"
            label="失效时间"
            width="170">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="add_date"
            label="添加时间"
            width="170">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="operator"
            label="操作者"
            width="140">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="update_date"
            label="更新时间"
            width="170">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="des"
            label="备注"
            width="300">
          </el-table-column>
          <el-table-column
            fixed="right"
            header-align="center"
            align="center"
            label="操作"
            width="120">
            <template slot-scope="scope">
              <el-button type="text" size="small">修改</el-button>
              <el-button
                @click="open2(scope.$index, tableData4)"
                type="text"
                size="small">
                移除
              </el-button>
            </template>
          </el-table-column>

        </el-table>

        <!--分页-->
        <paginations></paginations>

      </el-tab-pane>

      <!--车辆图标配置添加-->
      <el-tab-pane label="车辆图标配置添加" name="second" class="second">

        <el-form ref="form" :model="form" label-width="150px">

          <el-form-item label="自行车图标:">
            <el-select v-model="form.bicycle_status" placeholder="选择车辆活动状态" clearable>
              <el-option label="大剿匪" value="1"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="显示图片:">
          </el-form-item>

          <el-form-item label="车辆类型:">
            <el-select v-model="form.bicycle_type" clearable>
              <el-option label="电动车" value="1"></el-option>
              <el-option label="自行车" value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="是否默认:">
            <el-select v-model="form.isDefault" clearable>
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="备注:">
            <el-input v-model="form.des" type="textarea" class='textarea'></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="saveData">保存</el-button>
            <el-button>返回</el-button>
          </el-form-item>
        </el-form>

      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        value1: '',
        activeName2: 'first',
        formInline: {
          bicycle_status: '',
          bicycle_type: '',
          city_name: '',
          isDefault: '',
          add_date: ''
        },
        form: {
          bicycle_status: '',
          bicycle_type: '2',
          isDefault: '2',
          des: ''
        },
        tableData: [{
          city_name: '上海市',
          bicycle_status: '大剿匪',
          bicycle_type: '自行车',
          isDefault: '否',
          skip_activity: '大剿匪大剿匪大剿匪大剿匪',
          effective_date: '2017-09-21 15:51:12',
          failure_date: '2017-09-21 15:51:12',
          add_date: '2017-09-21 15:51:12',
          operator: '系统管理员',
          update_date: '2017-09-21 15:51:12',
          des: ''
        }, {
          city_name: '上海市',
          bicycle_status: '大剿匪',
          bicycle_type: '自行车',
          isDefault: '否',
          skip_activity: '大剿匪大剿匪大剿匪大剿匪',
          effective_date: '2017-09-21 15:51:12',
          failure_date: '2017-09-21 15:51:12',
          add_date: '2017-09-21 15:51:12',
          operator: '系统管理员',
          update_date: '2017-09-21 15:51:12',
          des: ''
        }, {
          city_name: '上海市',
          bicycle_status: '大剿匪',
          bicycle_type: '自行车',
          isDefault: '否',
          skip_activity: '大剿匪大剿匪大剿匪大剿匪',
          effective_date: '2017-09-21 15:51:12',
          failure_date: '2017-09-21 15:51:12',
          add_date: '2017-09-21 15:51:12',
          operator: '系统管理员',
          update_date: '2017-09-21 15:51:12',
          des: ''
        }, {
          city_name: '上海市',
          bicycle_status: '大剿匪',
          bicycle_type: '自行车',
          isDefault: '否',
          skip_activity: '大剿匪大剿匪大剿匪大剿匪',
          effective_date: '2017-09-21 15:51:12',
          failure_date: '2017-09-21 15:51:12',
          add_date: '2017-09-21 15:51:12',
          operator: '系统管理员',
          update_date: '2017-09-21 15:51:12',
          des: ''
        }]
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
      deleteRow (index, rows) {
        rows.splice(index, 1)
      },
      open2 (index, rows) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteRow(index, rows)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      saveData () {
        console.log('saveData!')
      }
    }
  }
</script>

<style scoped>
  .right {

  }

  .second .textarea, .second .el-input, .second .el-input__inner {
    width: 300px;
  }
</style>
