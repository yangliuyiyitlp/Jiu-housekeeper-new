<template>
  <div class="right">
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <!-- 角色列表-->
      <el-tab-pane label="角色列表" name="first">

        <!--表格-->
        <el-table
          :data="tableData"
          style="width: 100%"
          border
          stripe>
          <el-table-column
            header-align="center"
            align="center"
            prop="role_name"
            label="角色名称">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="english_name"
            label="英文名称">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="attribution_mechanism"
            label="归属机构">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="data_range"
            label="数据范围">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            label="操作">
            <template scope="scope">
              <el-button type="text" size="small">分配</el-button>
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

      <!--角色添加 -->
      <el-tab-pane label="角色添加" name="second" class="second">

        <el-form ref="form" :model="form" label-width="150px">

          <el-form-item label="归属机构:">
            <el-input v-model="form.attribution_mechanism" placeholder="选择归属机构"></el-input>
          </el-form-item>

          <el-form-item label="角色名称:">
            <el-input v-model="form.role_name" placeholder="输入角色名称"></el-input>
          </el-form-item>

          <el-form-item label="英文名称:">
            <el-input v-model="form.english_name" placeholder="输入英文名称"></el-input>
            <span>工作流用户组标识</span>
          </el-form-item>

          <el-form-item label="角色类型:">
            <el-select v-model="form.role_type" clearable>
              <el-option label="任务分配" value="1"></el-option>
              <el-option label="管理角色" value="2"></el-option>
              <el-option label="普通角色" value="3"></el-option>
            </el-select>
            <span>工作流组用户组类型（任务分配：assignment、管理角色：security-role、普通角色：user）</span>
          </el-form-item>

          <el-form-item label="是否系统数据:">
            <el-select v-model="form.isSysdata" clearable>
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="2"></el-option>
            </el-select>
            <span>“是”代表此数据只有超级管理员能进行修改，“否”则表示拥有角色修改人员的权限都能进行修改</span>
          </el-form-item>

          <el-form-item label="是否可用:">
            <el-select v-model="form.isUse" clearable>
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="2"></el-option>
            </el-select>
            <span>“是”代表此数据可用，“否”则表示此数据不可用</span>
          </el-form-item>

          <el-form-item label="数据范围:">
            <el-select v-model="form.data_range" clearable>
              <el-option label="所有数据" value="1"></el-option>
              <el-option label="所在公司及以下数据" value="2"></el-option>
              <el-option label="所在公司数据" value="3"></el-option>
              <el-option label="所在部门及以下数据" value="4"></el-option>
              <el-option label="所在部门数据" value="5"></el-option>
              <el-option label="仅本人数据" value="6"></el-option>
              <el-option label="按明细设置" value="7"></el-option>
            </el-select>
            <span>特殊情况下，设置为“按明细设置”，可进行跨机构授权</span>
          </el-form-item>

          <el-form-item label="角色授权:">
            <!--<el-input v-model="form.target" placeholder="输入目标窗口"></el-input>-->
            ztree插件
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
        value1: '',
        activeName2: 'first',
        formInline: {
          attribution_company: '',
          login_name: '',
          attribution_department: '',
          name: ''
        },
        form: {
          attribution_mechanism: '',
          role_name: '',
          english_name: '',
          role_type: '1',
          isSysdata: '1',
          isUse: '1',
          data_range: '6',
          remark: ''
        },
        tableData: [{
          role_name: '客服部红包管理员',
          english_name: 'xingzhegnquzhengfu',
          attribution_mechanism: '上海市总公司',
          data_range: '所在公司及以下数据'
        }, {
          role_name: '客服部红包管理员',
          english_name: 'xingzhegnquzhengfu',
          attribution_mechanism: '上海市总公司',
          data_range: '所在公司及以下数据'
        }, {
          role_name: '客服部红包管理员',
          english_name: 'xingzhegnquzhengfu',
          attribution_mechanism: '上海市总公司',
          data_range: '所在公司及以下数据'
        }, {
          role_name: '客服部红包管理员',
          english_name: 'xingzhegnquzhengfu',
          attribution_mechanism: '上海市总公司',
          data_range: '所在公司及以下数据'
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
    margin-left: 260px;
  }

  .second .textarea, .second .el-input, .second .el-input__inner {
    width: 300px;
  }

  span {
    color: #888;
  }
</style>
