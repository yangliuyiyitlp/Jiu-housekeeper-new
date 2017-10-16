<template>
  <div class="right">
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <!--配置列表-->
      <el-tab-pane label="inmobi配置列表" name="first" >

        <!--筛选条件-->
        <el-form :inline="true" :model="formInline" style="padding-left:10px;" class="demo-form-inline">

          <el-form-item label="展示设置:">
            <el-select v-model="formInline.type"  clearable>
              <el-option label="活动二级弹窗" value="1"></el-option>
              <el-option label="启动页" value="1"></el-option>
              <el-option label="确认换车后" value="1"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="展示类型:">
            <el-select v-model="formInline.displayType"  clearable>
              <el-option label="app" value="1"></el-option>
              <el-option label="广告" value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="城市名称:">
            <el-input v-model="formInline.cityName" placeholder="城市名称">
            </el-input>
          </el-form-item>
          <el-form-item label="安卓:">
            <el-input v-model="formInline.androidInmobiId">
            </el-input>
          </el-form-item>
          <el-form-item label="ios:">
            <el-input v-model="formInline.iosInmobiId">
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="query">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="exportFile">导出</el-button>
          </el-form-item>
        </el-form>

        <!--表格-->
        <el-table
        :data="tableData"
        border
        show-header
        style="width: 100%">
        <!-- lihaibu-->
        <el-table-column
          prop="id"
          label="id" v-if=0> // id 隐藏
        </el-table-column>
        <el-table-column
          prop="cityName"
          show-overflow-tooltip
          label="城市名称">
        </el-table-column>
        <el-table-column
          prop="rank"
          label="显示顺序	">
        </el-table-column>
        <el-table-column
          prop="createBy.id"
          show-overflow-tooltip
          label="操作者">
        </el-table-column>
        <el-table-column
          label="创建时间">
          <template scope="scope">
            <el-icon name="time"></el-icon>
            <span style="margin-left: 10px">{{ scope.row.createDate}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="remarks"
          show-overflow-tooltip
          label="备注">
        </el-table-column>
        <el-table-column
          label="操作">
          <template scope="scope">
            <el-button @click="modifyRecord(scope)" type="text" size="small">修改</el-button>
            <el-button @click="deleteRecord(scope.row.id)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

        <!--分页-->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.pageNo"
          :page-sizes="pagination.pageSizes"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.count">
        </el-pagination>

      </el-tab-pane>

      <!--配置添加-->
      <el-tab-pane label="inmobi配置添加" name="second" class="second">

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
        formInline: { // 配置列表
          type: '',
          displayType: '',
          cityName: '',
          androidInmobiId: '',
          iosInmobiId: ''
        },
        form: { // 配置添加
          bicycle_status: '',
          bicycle_type: '2',
          isDefault: '2',
          des: ''
        },
        tableData: [{
          id: '上海市',
          rank: '大剿匪',
          cityName: '自行车',
          'createBy.id': '否',
          createDate: '111111',
          remarks: '2017-09-21 15:51:12'
        }],
        pagination: {pageSizes: [10, 40, 60, 100], pageSize: 10, count: 0, pageNo: 1}
      }
    },
    methods: {
      saveData: function () {},
      handleClick: function () {},
      query: function () {
//        this.exportParam.selectTime = this.requestParam.selectTime
//        this.requestParam.addTimeBegin = this.requestParam.selectTime[0]
//        this.requestParam.addTimeEnd = this.requestParam.selectTime[1]
        this.exportParam.addTimeBegin = this.requestParam.addTimeBegin
        this.exportParam.addTimeEnd = this.requestParam.addTimeEnd
        this.exportParam.factoryName = this.requestParam.factoryName
        this.exportParam.lockFactoryNo = this.requestParam.lockFactoryNo
        this.requestParam.addTimeBegin = this.requestParam.addTimeBegin.toString()
        this.requestParam.addTimeEnd = this.requestParam.addTimeEnd.toString()
        this.$ajax.get('http://116.231.72.55:10001/a/electric/lockfactoryinfo/interface/list', {params: this.requestParam}).then(function (response) {
          if (response.data.code === 0) {
            this.tableData = response.data.page.list
            this.pagination.count = response.data.page.count
          } else {
            this.$message({
              type: 'info',
              message: '获取列表信息失败'
            })
          }
        }, function (err) {
          this.$message({
            type: 'info',
            message: '获取列表信息失败' + err.status
          })
        })
      },
      modifyRecord: function (scope) {
        this.dialogFormVisible = true
        this.form.id = scope.row.id
        this.form.factoryName = scope.row.factoryName
        this.form.lockFactoryNo = scope.row.lockFactoryNo
        this.form['createBy.id'] = scope.row['createBy.id']
        this.form.remarks = scope.row.remarks
      },
      deleteRecord: function (id) {
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (id !== undefined) {
            // 调用后台服务
            // 删除元素
            this.$ajax.get('http://116.231.72.55:10001/a/electric/lockfactoryinfo/interface/delete', {params: {'id': id}}).then(function (response) {
              if (response.data.code === 0) {
                // 删除成功
                this.$message({
                  type: 'success',
                  message: '删除成功'
                })
                this.$refs['formA'].resetFields()
                // 刷新页面
                this.query()
              } else {
                this.$message({
                  type: 'error',
                  message: '删除记录失败:' + response.data.msg
                })
              }
            }, function (err) {
              this.$message({
                type: 'info',
                message: '操作失败' + err.status
              })
            })
          }
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
      doModify: function (formName) {       // 修改确定功能
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var url = ''
            if (this.form.id === undefined || this.form.id === '') {
              url = 'http://116.231.72.55:10001/a/electric/lockfactoryinfo/interface/save' // 新增功能
            } else {
              url = 'http://116.231.72.55:10001/a/electric/lockfactoryinfo/interface/save'
            }
            this.dialogFormVisible = false
            this.$ajax.get(url, {params: this.form}).then(function (response) {
              if (response.data.code === 0) {
                // 更新成功
                this.$message({
                  type: 'success',
                  message: '操作成功'
                })
                // 刷新页面
                this.query()
              } else {
                this.$message({
                  type: 'error',
                  message: '操作失败:' + response.data.msg
                })
              }
            }, function (err) {
              this.$message({
                type: 'info',
                message: '操作失败' + err.status
              })
            })
          } else {
            console.log('error submit!!')
            return
          }
        })
      },
      cancelOperate: function () {
        this.dialogFormVisible = false
        this.form = {
          factoryName: '',
          lockFactoryNo: '',
          id: '',
          'createBy.id': '',
          remarks: ''
        }
        this.$refs['formA'].resetFields()
      },
      more: function (row, column, cell, event) {
//        console.log(row)
//        console.log(row.id)
//        console.log(column)
//        console.log(column.property)
//        console.log(event)
        if (column.property !== 'factoryName') {
          return false
        } else {
          this.moreFormVisible = true
          this.$ajax.get('http://116.231.72.55:10001/a/electric/lockfactoryinfo/interface/form', {params: {id: row.id}}).then(function (res) {
            if (res.data.code === 0) {
              this.moreinfo.remarks = res.data.tLockFactoryInfo.remarks
              this.moreinfo.updateDate = res.data.tLockFactoryInfo.updateDate
              this.moreinfo.factoryName = res.data.tLockFactoryInfo.factoryName
              this.moreinfo.lockFactoryNo = res.data.tLockFactoryInfo.lockFactoryNo
              this.moreinfo.addTime = res.data.tLockFactoryInfo.addTime
            }
          }).catch(function (err) {
            this.$message({
              type: 'info',
              message: '获取详情失败' + err.status
            })
          })
        }
      },
      cancelmore: function () {
        this.moreFormVisible = false
      },
      handleSizeChange: function (val) {
        this.requestParam.pageSize = val
        this.query()
      },
      handleCurrentChange: function (val) {
        this.requestParam.pageNo = val
        this.query()
      },
      addNewRecord: function () {
        this.form = {
          id: '',
          factoryName: '',
          lockFactoryNo: '',
          'createBy.id': '',
          remarks: ''
        }
        this.dialogFormVisible = true
      },
      exportFile: function () {
        var r = confirm('确定下载么')
        if (r === true) {
          this.$refs['downloadFileForm'].submit()
        }
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
