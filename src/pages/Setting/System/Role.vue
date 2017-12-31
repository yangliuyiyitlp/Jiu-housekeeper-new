<template>
  <div>
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <!-- 角色列表-->
      <el-tab-pane label="角色列表" name="first">
        <!--表格-->
        <el-table
          :data="tableData"
          style="width: 100%"
          border
          @cell-click="more"
          stripe>
          <el-table-column
            header-align="center"
            align="center"
            show-overflow-tooltip
            prop="id"
            label="id">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            header-align="center"
            align="center"
            prop="name"
            label="角色名称">
            <template slot-scope="scope">
              <span v-bind:class="{active: true}">{{ scope.row.name}}</span>
            </template>
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="enname"
            label="英文名称">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="office"
            label="归属机构">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            label="操作"
            width="160">
            <template slot-scope="scope">
              <!--<el-button @click="allotRecord(scope.row.id)" type="text" size="small">分配</el-button>-->
              <el-button @click="modifyRecord(scope)" type="text" size="small">修改</el-button>
              <el-button @click="deleteRecord(scope.row.id)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>

        </el-table>

        <!--分页-->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.pageNum"
          :page-sizes="pagination.pageSizes"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.count">
        </el-pagination>

      </el-tab-pane>

      <!--角色添加 -->
      <el-tab-pane :label="titleSecond" name="second" class="second">

        <el-form ref="form" :model="form" :rules="rules" label-width="150px">
          <el-form-item>
            <el-input v-model="form.id" v-if=false></el-input>
          </el-form-item>
          <el-form-item label="归属机构：">
            <el-input
              :disabled=true
              :on-icon-click="searchCompany"
              icon="search"
              v-model="form.office">
            </el-input>
          </el-form-item>

          <el-form-item label="角色名称：" prop="name">
            <el-input v-model="form.name" :disabled="saveUp"></el-input>
          </el-form-item>

          <el-form-item label="英文名称：" prop="enname">
            <el-input v-model="form.enname" :disabled="saveUp"></el-input>
            <span>工作流用户组标识</span>
          </el-form-item>

          <!--<el-form-item label="角色类型：">-->
          <!--<el-select v-model="form.roleType" clearable :disabled="saveUp">-->
          <!--<el-option label="任务分配" value="1"></el-option>-->
          <!--<el-option label="管理角色" value="2"></el-option>-->
          <!--<el-option label="普通角色" value="3"></el-option>-->
          <!--</el-select>-->
          <!--<span>工作流组用户组类型（任务分配：assignment、管理角色：security-role、普通角色：user）</span>-->
          <!--</el-form-item>-->

          <!--<el-form-item label="是否系统数据：">-->
          <!--<el-select v-model="form.isSys" clearable :disabled="saveUp">-->
          <!--<el-option label="是" value="1"></el-option>-->
          <!--<el-option label="否" value="2"></el-option>-->
          <!--</el-select>-->
          <!--<span>“是”代表此数据只有超级管理员能进行修改，“否”则表示拥有角色修改人员的权限都能进行修改</span>-->
          <!--</el-form-item>-->

          <el-form-item label="是否可用：">
            <el-select v-model="form.useable" clearable :disabled="saveUp" class="width">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
            <span>“是”代表此数据可用，“否”则表示此数据不可用</span>
          </el-form-item>

          <!--<el-form-item label="数据范围：">-->
          <!--<el-select v-model="form.dataScope" clearable :disabled="saveUp">-->
          <!--<el-option label="所有数据" value="1"></el-option>-->
          <!--<el-option label="所在公司及以下数据" value="2"></el-option>-->
          <!--<el-option label="所在公司数据" value="3"></el-option>-->
          <!--<el-option label="所在部门及以下数据" value="4"></el-option>-->
          <!--<el-option label="所在部门数据" value="5"></el-option>-->
          <!--<el-option label="仅本人数据" value="6"></el-option>-->
          <!--<el-option label="按明细设置" value="7"></el-option>-->
          <!--</el-select>-->
          <!--<span>特殊情况下，设置为“按明细设置”，可进行跨机构授权</span>-->
          <!--</el-form-item>-->

          <el-form-item label="角色授权：">
            <el-input
              :disabled=true
              :on-icon-click="searchRoles"
              icon="search"
              v-model="form.menuIds">
            </el-input>
          </el-form-item>

          <el-form-item label="备注：">
            <el-input v-model="form.remark" :disabled="saveUp" type="textarea" class='textarea'></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" :disabled="saveUp" @click="saveData('form')">保存</el-button>
            <el-button @click="back">返回</el-button>
          </el-form-item>
        </el-form>

      </el-tab-pane>


      <!--角色分配-->
      <!--<el-tab-pane  label="角色分配" name="third" class="second" >-->
      <!--<el-form :inline="true" :model="formRole" class="demo-form-inline">-->

      <!--<el-form-item label="角色名称：">-->
      <!--<el-input v-model="formRole.loginName" :disabled = true></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="归属机构：">-->
      <!--<el-input v-model="formRole.loginName" :disabled = true></el-input>-->
      <!--</el-form-item>-->

      <!--<el-form-item label="英文名称：">-->
      <!--<el-input v-model="formRole.loginName" :disabled = true></el-input>-->
      <!--</el-form-item>-->

      <!--<el-form-item>-->
      <!--<el-button type="primary" @click="recordRole">分配角色</el-button>-->
      <!--</el-form-item>-->
      <!--</el-form>-->
      <!--</el-tab-pane>-->

    </el-tabs>
    <div class="wrapperTree">
      <!--模态框-->
      <el-dialog title="归属机构" size="tiny" :visible.sync="cityVisible" center>
        关键字：<input ref='keySearch' type='text' class='keySearch' v-model="filterText">
        <el-tree
          ref="tree"
          highlight-current
          :data="selectSection"
          :props="defaultProps"
          class="searchTree"
          accordion
          :filter-node-method="filterNode"
          @node-click="handleNode">
        </el-tree>
        <div slot="footer" class="dialog-footer">
          <el-button @click="modifyCancel">取 消</el-button>
          <el-button type="primary" @click="doModify">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="角色授权" size="tiny" :visible.sync="roleVisible" center>
        <el-tree
          ref="tree2"
          show-checkbox
          default-expand-all
          highlight-current
          :data="selectRole"
          :props="defaultProps"
          :default-checked-keys="checkedRoles"
          node-key="id"
          class="searchTree">
        </el-tree>
        <div slot="footer" class="dialog-footer">
          <el-button @click="roleCancel">取 消</el-button>
          <el-button type="primary" @click="getCheckedKeys">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import Cookie from 'js-cookie'

  export default {
    data () {
      return {
        value1: '',
        activeName2: 'first',
        titleSecond: '角色添加',
        selectSection: '',
        select_section: [],
        selectRole: '',
        select_role: [],
        checkedRoles: [],
        cityVisible: false,
        roleVisible: false,
        saveUp: false,
        filterText: '',
        filterId: '',
        formInline: {}, // 条件搜索字段
        form: {},
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        pagination: {pageSizes: [30, 40, 60, 100], pageSize: 30, count: 0, pageNum: 1},
        tableData: [],
        rules: {
          name: [
            {required: true, message: '请输入角色名称', trigger: 'blur'}
          ],
          enname: [
            {required: true, message: '请输入英文名称', trigger: 'blur'}
          ]
        }
      }
    },
    created () {
      this.query()
      this.companySearch()
    },
    watch: {
      filterText (val) {
        this.$refs.tree.filter(val)
      }
    },
    methods: {
      handleClick (tab, event) {
        if (this.activeName2 === 'first') {
          this.titleSecond = '角色添加'
        }
        if (tab.label === '角色添加') {
          this.addNewRecord()
        }
      },
      query () {
        this.$ajax.get('setting/role/list')
          .then(response => {
            console.log(response)
            if (response.data.code === 200) {
              this.tableData = response.data.data.result
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
              message: '获取列表信息异常'
            })
          })
      },
      more (row, column, cell, event) {
        this.$refs['form'].resetFields()
        if (column.property !== 'name') {
          return false
        } else {
          this.activeName2 = 'second'
          this.titleSecond = '角色详情'
          this.saveUp = true  // 保存按钮不显示
          this.$ajax.get('/setting/role/form', {params: {id: row.id}})
            .then((res) => {
              if (res.data.code === 200) {
                this.moreSearch(row.id)
                this.form = res.data.data
              } else {
                this.$message({
                  type: 'error',
                  message: '获取详情失败'
                })
              }
            })
            .catch(() => {
              this.$message({
                type: 'error',
                message: '获取详情异常'
              })
            })
        }
      }, // 详情
      companySearch () { // 归属机构列表获取
        this.$ajax.get('/setting/role/section', {params: {sessionId: Cookie.get('sessionId')}})
          .then(response => {
            if (response.data.code === 200) {
              this.select_section = response.data.data
            } else {
              this.$message({
                type: 'error',
                message: '获取归属机构列表失败'
              })
            }
          })
          .catch(() => {
            this.$message({
              type: 'error',
              message: '获取归属机构列表异常'
            })
          })
      },
      moreSearch (id) {       // 详情里面对应角色的角色授权列表
        this.$ajax.get('/setting/role/menuAll', {params: {sessionId: Cookie.get('sessionId'), id: id}})
          .then(response => {
            if (response.data.code === 200) {
              let result = response.data.data
              this.select_role = result
              // 循环每个里面有没有roleId和menuId,有的话把id放到checkedRoles数组中
              searchRoles(result, this.checkedRoles)
            } else {
              this.$message({
                type: 'error',
                message: '获取角色列表失败'
              })
            }
          })
          .catch((err) => {
            this.$message({
              type: 'error',
              message: '获取角色列表异常' + err
            })
          })
      },
      addSearch () {       // 新增里面角色授权所有列表获取
        this.$ajax.get('/setting/role/menuTree', {params: {sessionId: Cookie.get('sessionId')}})
          .then(response => {
            if (response.data.code === 200) {
              this.select_role = response.data.data
            } else {
              this.$message({
                type: 'error',
                message: '获取角色列表失败'
              })
            }
          })
          .catch(() => {
            this.$message({
              type: 'error',
              message: '获取角色列表异常'
            })
          })
      },
      addNewRecord () {
        this.$refs['form'].resetFields()
        this.activeName2 = 'second'
        this.titleSecond = '角色添加'
        this.form = {}
        this.addSearch()
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
            this.$ajax.get('setting/role/delete', {params: {'id': id}})
              .then((res) => {
                if (res.data.code === 200) {
                  // 删除成功
                  this.$message({
                    type: 'success',
                    message: res.data.msg
                  })
                  // 刷新页面
                  this.query()
                } else {
                  this.$message({
                    type: 'error',
                    message: '删除失败'
                  })
                }
              })
              .catch(() => {
                this.$message({
                  type: 'error',
                  message: '删除异常'
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
        this.activeName2 = 'second'
        this.titleSecond = '角色修改'
        this.saveUp = false
        this.$ajax.get('/setting/role/form', {params: {id: scope.row.id}})
          .then((res) => {
            if (res.data.code === 200) {
              this.moreSearch(scope.row.id)
              this.form = res.data.data
            } else {
              this.$message({
                type: 'error',
                message: '获取详情失败'
              })
            }
          })
          .catch(() => {
            this.$message({
              type: 'error',
              message: '获取详情异常'
            })
          })
      }, // 修改
      saveData (form) {       // 修改确定功能
        this.$refs[form].validate((valid) => {
          if (valid) {
            let url = ''
            if (this.form.id !== undefined && this.form.id !== '') {  // 修改
              url = '/setting/role/update'
            } else {  // 新增
              url = '/setting/role/add'
            }
            this.$ajax.get(url, {params: this.form})
              .then((response) => {
                console.log(response)
                if (response.data.code === 200) {
                  // 更新成功
                  this.$message({
                    type: 'success',
                    message: '操作成功'
                  })
                  // 刷新页面
                  this.activeName2 = 'first'
                  this.query()
                } else {
                  this.$message({
                    type: 'error',
                    message: '操作失败'
                  })
                }
              })
              .catch(() => {
                this.$message({
                  type: 'error',
                  message: '操作异常'
                })
              })
          } else {
            return false
          }
        })
      },
      searchCompany () {
        this.defaultProps.label = 'name'
        this.cityVisible = true
        this.selectSection = this.select_section
        this.filterText = ''
      },
      searchRoles () {
        this.defaultProps.label = 'label'
        this.roleVisible = true
        this.selectRole = this.select_role
      },
      filterNode (value, data) {
        if (!value) return true
        return data.name.indexOf(value) !== -1
      },
      handleNode (data) {
        this.filterText = data.name // 弹框树模型点击输入值
        this.filterId = data.id // 弹框树模型点击输入值
      },
      doModify () {
        this.form.office = this.filterText
        this.form.officeId = this.filterId
        this.cityVisible = false
      },
      getCheckedKeys () {
        let arr = this.$refs.tree2.getCheckedNodes()
        let newarr = []
        for (let i = 0; i < arr.length; i++) {
          newarr.push(arr[i].parentIds + arr[i].id)
          console.log(newarr)
        }
        this.form.menuIds = newarr.join(',')
        this.roleVisible = false
      },
      modifyCancel () {
        this.cityVisible = false
        this.form.office = ''
        this.form.officeId = ''
      },
      roleCancel () {
        this.roleVisible = false
        this.form.menuIds = ''
      },
      handleSizeChange (val) {
        this.formInline.pageSize = val
        this.pagination.pageSize = val
        this.query()
      },
      handleCurrentChange (val) {
        this.formInline.pageNum = val
        this.pagination.pageNum = val
        this.query()
      },
      back () {
        this.activeName2 = 'first'
      }
    }
  }

  function searchRoles (result, checkedRoles) {
    for (let i = 0; i < result.length; i++) {
      let item = result[i]
      if (item.children !== undefined && item.children.length > 0) {
        // 递归
        searchRoles(item.children, checkedRoles)
      }
      if (item.roleId && item.roleId) {
        let arr = checkedRoles.push(item.id)
        return arr
      }
    }
  }
</script>

<style scoped>
  @import '../../../assets/css/treecss.css';

  .second .textarea, .second .el-input, .second .el-input__inner, .width {
    width: 250px;
  }

  .keySearch {
    width: 140px;
    height: 20px;
    outline-style: none;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 20px;
  }

  .active {
    color: #20a0ff;
    cursor: pointer;
  }

  span {
    color: #888;
  }
</style>
