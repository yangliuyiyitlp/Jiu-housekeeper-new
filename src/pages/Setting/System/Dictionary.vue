<template>
  <div class="right">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <!-- 字典列表-->
      <el-tab-pane label="字典列表" name="first">

        <!--筛选条件-->
        <el-form :inline="true" :model="formInline" class="demo-form-inline">

          <el-form-item label="类型：">
            <el-select v-model="formInline.type" clearable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="描述：">
            <el-input v-model="formInline.des" placeholder="输入描述">
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="query">查询</el-button>
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
            prop="dic_key"
            label="键值">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="tag"
            label="标签">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="dic_type"
            label="类型">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="dic_des"
            label="描述">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="dic_sort"
            label="排序">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            label="操作"
            width="160">
            <template slot-scope="scope">
              <el-button @click="modifyRecord(scope)" type="text" size="small">修改</el-button>
              <el-button @click="deleteRecord(scope.row.id)" type="text" size="small">删除</el-button>
              <el-button @click="allotRecord(scope.row.id)" type="text" size="small">添加键值</el-button>
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

      <!--字典添加 -->
      <el-tab-pane :label="titleSecond" name="second" class="second">

        <el-form ref="form" :model="form" label-width="150px">

          <el-form-item label="键值：">
            <el-input v-model="form.key"></el-input>
          </el-form-item>

          <el-form-item label="标签：">
            <el-input v-model="form.tag"></el-input>
          </el-form-item>

          <el-form-item label="类型：">
            <el-input v-model="form.type"></el-input>
          </el-form-item>

          <el-form-item label="描述：">
            <el-input v-model="form.des"></el-input>
          </el-form-item>

          <el-form-item label="排序：">
            <el-input v-model="form.sort"></el-input>
          </el-form-item>

          <el-form-item label="备注：">
            <el-input v-model="form.remark" type="textarea" class='textarea'></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="saveData">保存</el-button>
            <el-button @click="back">返回</el-button>
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
        activeName: 'first',
        titleSecond: '字典添加',
        formInline: {
          type: '',
          des: ''
        },
        form: {
          key: '',
          tag: '',
          type: '',
          des: '',
          sort: '10',
          remark: ''
        },
        options: [{
          value: '1',
          label: 'account_status'
        }, {
          value: '2',
          label: 'activitys_type'
        }, {
          value: '3',
          label: 'activity_display_type'
        }, {
          value: '4',
          label: 'administrator_type'
        }, {
          value: '5',
          label: 'act_category'
        }],
        tableData: [{
          dic_key: '2',
          tag: '无身份证验证审核',
          dic_type: 'activity_display_type',
          dic_des: 'APP展示类型',
          dic_sort: '10'
        }],
        pagination: {pageSizes: [30, 40, 60, 100], pageSize: 30, count: 0, pageNo: 1}
      }
    },
    methods: {
      handleClick (tab, event) {
        if (this.activeName === 'first') {
          this.titleSecond = '字典添加'
        }
        if (tab.label === '字典添加') {
          this.addNewRecord()
        }
      },
      handleSizeChange (val) {
        this.formInline.pageSize = val
        this.pagination.pageSize = val
        this.query()
      },
      handleCurrentChange (val) {
        this.formInline.pageNo = val
        this.pagination.pageNo = val
        this.query()
      },
      query () {
        this.$ajax.get('/list', {params: this.formInline})
          .then(response => {
            if (response.data.code === 200) {
              this.tableData1 = response.data.data.result
              this.pagination.count = response.data.data.total
            } else {
              this.$message({
                type: 'error',
                message: '获取列表信息失败'
              })
            }
          })
          .catch(() => {
            this.$message({
              type: 'error',
              message: '获取列表信息失败'
            })
          })
      },
      addNewRecord () {
        this.$refs['form'].resetFields()
        this.activeName = 'second'
        this.titleSecond = '角色添加'
        this.form = {}
      },   // 新增
      deleteRecord (id) {
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          if (id !== undefined) {
            // 调用后台服务
            // 删除元素
            this.$ajax.post('/delete', {params: {'id': id}})
              .then((res) => {
                if (res.data.code === 0) {
                  // 删除成功
                  this.$message({
                    type: 'success',
                    message: res.data.msg
                  })
//                this.$refs['formA'].resetFields()
                  // 刷新页面
                  this.query()
                } else {
                  this.$message({
                    type: 'error',
                    message: res.data.msg
                  })
                }
              })
              .catch(() => {
                this.$message({
                  type: 'error',
                  message: '操作失败'
                })
              })
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消删除'
          })
        })
      },
      modifyRecord (scope) {
        this.$refs['form'].resetFields()
        this.activeName = 'second'
        this.titleSecond = '字典修改'
        this.$ajax.get('/activity/enjoy/form', {params: {id: scope.row.id}})
          .then((res) => {
            if (res.data.code === 0) {
              this.form = res.data.tActivitiesInfo
            } else {
              this.$message({
                type: 'error',
                message: res.data.msg
              })
            }
          })
          .catch((error) => {
            console.log('点击修改报错:', error)
            this.$message({
              type: 'error',
              message: '获取失败'
            })
          })
      }, // 修改
      allotRecord () {
        this.activeName = 'second'
        this.titleSecond = '字典添加'
      },
      saveData () {       // 修改确定功能
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.activeName = 'first'
            this.$ajax.get('/activity/enjoy/save', {params: this.form})
              .then((response) => {
                if (response.data.code === 0) {
                  // 更新成功
                  this.$message({
                    type: 'success',
                    message: '操作成功'
                  })
                  // 刷新页面
                  this.$refs.uploadFile.clearFiles()
                  this.query()
                } else {
                  this.$message({
                    type: 'error',
                    message: '操作失败'
                  })
                }
              })
              .catch((err) => {
                this.$message({
                  type: 'error',
                  message: err
                })
              })
          } else {
            return false
          }
        })
      },
      back () {
        this.activeName = 'first'
      }
    }
  }
</script>

<style scoped>
  .second .textarea, .second .el-input, .second .el-input__inner {
    width: 300px;
  }

  span {
    color: #888;
  }
</style>
