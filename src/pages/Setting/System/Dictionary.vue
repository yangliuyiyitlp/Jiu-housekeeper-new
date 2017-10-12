<template>
  <div class="right">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <!-- 字典列表-->
      <el-tab-pane label="字典列表" name="first"style="padding-left:10px;">

        <!--筛选条件-->
        <el-form :inline="true" :model="formInline" class="demo-form-inline">

          <el-form-item label="类型:">
            <el-select v-model="formInline.type" clearable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="描述:">
            <el-input v-model="formInline.des" placeholder="输入描述">
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
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
            label="操作">
            <template scope="scope">
              <el-button type="text" size="small">修改</el-button>
              <el-button
                @click="open2(scope.$index, tableData4)"
                type="text"
                size="small">
                移除
              </el-button>
              <el-button type="text" size="small">添加键值</el-button>
            </template>
          </el-table-column>

        </el-table>

        <!--分页-->
        <paginations></paginations>

      </el-tab-pane>

      <!--字典添加 -->
      <el-tab-pane label="字典添加" name="second" class="second">

        <el-form ref="form" :model="form" label-width="150px">

          <el-form-item label="键值:">
            <el-input v-model="form.key" placeholder="输入键值"></el-input>
          </el-form-item>

          <el-form-item label="标签:">
            <el-input v-model="form.tag" placeholder="输入标签"></el-input>
          </el-form-item>

          <el-form-item label="类型:">
            <el-input v-model="form.type" placeholder="输入类型"></el-input>
          </el-form-item>

          <el-form-item label="描述:">
            <el-input v-model="form.des" placeholder="输入描述"></el-input>
          </el-form-item>

          <el-form-item label="排序:">
            <el-input v-model="form.sort" placeholder="输入描述"></el-input>
          </el-form-item>

          <el-form-item label="备注:">
            <el-input v-model="form.remark" type="textarea" class='textarea'></el-input>
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
        activeName: 'first',
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
        }, {
          dic_key: '9',
          tag: '无身份证验证审核',
          dic_type: 'activity_display_type',
          dic_des: 'APP展示类型',
          dic_sort: '10'
        }, {
          dic_key: '4',
          tag: '无身份证验证审核',
          dic_type: 'activity_display_type',
          dic_des: 'APP展示类型',
          dic_sort: '10'
        }, {
          dic_key: '7',
          tag: '无身份证验证审核',
          dic_type: 'activity_display_type',
          dic_des: 'APP展示类型',
          dic_sort: '10'
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
      importData () {
        console.log('importData!')
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
      },
      submitUpload () {
        this.$refs.upload.submit()
      },
      handleRemove (file, fileList) {
        console.log(file, fileList)
      },
      handlePreview (file) {
        console.log(file)
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

  span {
    color: #888;
  }
</style>
