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
            label="操作"
            width="160">
            <template slot-scope="scope">
              <el-button @click="allotRecord(scope.row.id)" type="text" size="small">分配</el-button>
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

      <!--角色添加 -->
      <el-tab-pane :label="titleSecond" name="second" class="second">

        <el-form ref="form" :model="form" :rules="rules" label-width="150px">

          <el-form-item label="归属机构：">
            <el-input
              :disabled="true"
              :on-icon-click="searchCompany"
              icon="search"
              v-model="form.attributionCompany">
            </el-input>
          </el-form-item>

          <el-form-item label="角色名称：" prop="role_name">
            <el-input v-model="form.role_name"></el-input>
          </el-form-item>

          <el-form-item label="英文名称：" prop="english_name">
            <el-input v-model="form.english_name"></el-input>
            <span>工作流用户组标识</span>
          </el-form-item>

          <el-form-item label="角色类型：">
            <el-select v-model="form.role_type" clearable>
              <el-option label="任务分配" value="1"></el-option>
              <el-option label="管理角色" value="2"></el-option>
              <el-option label="普通角色" value="3"></el-option>
            </el-select>
            <span>工作流组用户组类型（任务分配：assignment、管理角色：security-role、普通角色：user）</span>
          </el-form-item>

          <el-form-item label="是否系统数据：">
            <el-select v-model="form.isSysdata" clearable>
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="2"></el-option>
            </el-select>
            <span>“是”代表此数据只有超级管理员能进行修改，“否”则表示拥有角色修改人员的权限都能进行修改</span>
          </el-form-item>

          <el-form-item label="是否可用：">
            <el-select v-model="form.isUse" clearable>
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="2"></el-option>
            </el-select>
            <span>“是”代表此数据可用，“否”则表示此数据不可用</span>
          </el-form-item>

          <el-form-item label="数据范围：">
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

          <el-form-item label="角色授权：">
            <el-input
              :disabled="true"
              :on-icon-click="searchTarget"
              icon="search"
              v-model="form.attributionTarget">
            </el-input>
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
    <!--模态框-->
    <el-dialog title="归属机构" size="tiny" :visible.sync="cityVisible" center>
      关键字：<input ref='keySearch' type='text' class='keySearch' v-model="filterText">
      <el-tree
        default-expand-all
        ref="tree"
        highlight-current
        :data="select"
        :props="defaultProps"
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
        default-expand-all
        ref="tree2"
        highlight-current
        :data="select"
        :props="defaultProps"
        @check-change="handleCheckChange"
        accordion
        show-checkbox
        node-key="id">
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleCancel">取 消</el-button>
        <el-button type="primary" @click="getCheckedKeys">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    data () {
      return {
        value1: '',
        activeName2: 'first',
        titleSecond: '角色添加',
        select: '',
        cityVisible: false,
        roleVisible: false,
        checkbox: false,
        filterText: '',
        arr: [],
        formInline: {
          loginName: '',
          name: '',
          key: ''
        }, // 条件搜索字段
        form: {
          role_type: 1,
          isSysdata: 1,
          isUse: 1,
          data_range: 4,
          attributionCompany: '',
          attributionTarget: ''
        },
        select_section: [{
          id: 1,
          label: '上海市总公司',
          children: [{
            id: 2,
            label: '厦门分公司'
          }, {
            id: 3,
            label: '佛山分公司',
            children: [{
              id: 4,
              label: '城市运营',
              children: [{
                id: 99,
                label: '运营'
              }]
            }]
          }, {
            id: 5,
            label: '珠海分公司',
            children: [{
              id: 6,
              label: '城市运营'
            }]
          }, {
            id: 7,
            label: '运营部'
          }, {
            id: 8,
            label: '北京分公司',
            children: [{
              id: 9,
              label: '城市运营'
            }]
          }, {
            id: 10,
            label: '客服部',
            children: [{
              id: 11,
              label: '红包管理员'
            }, {
              id: 12,
              label: '客服部'
            }]
          }, {
            id: 13,
            label: '上海分公司',
            children: [{
              id: 14,
              label: '黄浦区政府'
            }, {
              id: 15,
              label: '城市运营'
            }, {
              id: 16,
              label: '虹口区政府'
            }, {
              id: 17,
              label: '普陀区政府'
            }, {
              id: 18,
              label: '静安区政府'
            }, {
              id: 19,
              label: '嘉定区政府'
            }, {
              id: 20,
              label: '浦东新区政府'
            }, {
              id: 21,
              label: '闵行区政府'
            }, {
              id: 22,
              label: '宝山区政府'
            }, {
              id: 23,
              label: '松江区政府'
            }, {
              id: 24,
              label: '杨浦区政府'
            }, {
              id: 25,
              label: '徐汇区政府'
            }, {
              id: 26,
              label: '长宁区政府'
            }, {
              id: 27,
              label: '青浦区政府'
            }, {
              id: 28,
              label: '奉贤区政府'
            }, {
              id: 29,
              label: '金山区政府'
            }]
          }, {
            id: 30,
            label: '生产部'
          }, {
            id: 31,
            label: '成都分公司',
            children: [{
              id: 32,
              label: '城市运营'
            }]
          }, {
            id: 33,
            label: '湖州分公司',
            children: [{
              id: 34,
              label: '城市运营'
            }]
          }, {
            id: 35,
            label: '公司领导'
          }, {
            id: 36,
            label: '综合部'
          }, {
            id: 37,
            label: '市场部'
          }, {
            id: 38,
            label: '技术部'
          }, {
            id: 39,
            label: '研发部'
          }, {
            id: 40,
            label: '深圳分公司',
            children: [{
              id: 41,
              label: '城市运营'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        pagination: {pageSizes: [30, 40, 60, 100], pageSize: 30, count: 0, pageNo: 1},
        tableData: [{
          role_name: '客服部红包管理员',
          english_name: 'xingzhegnquzhengfu',
          attribution_mechanism: '上海市总公司',
          data_range: '所在公司及以下数据'
        }],
        rules: {
          role_name: [
            {required: true, message: '请输入角色名称', trigger: 'blur'}
          ],
          english_name: [
            {required: true, message: '请输入英文名称', trigger: 'blur'}
          ]
        }
      }
    },
    created () {
      this.query()
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
        this.activeName2 = 'second'
        this.titleSecond = '角色添加'
        this.form.role_name = ''
        this.form.english_name = ''
        this.form.remark = ''
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
        this.activeName2 = 'second'
        this.titleSecond = '角色修改'
        this.saveUp = false
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
      allotRecord () {},
      saveData (form) {       // 修改确定功能
        this.$refs[form].validate((valid) => {
          if (valid) {
            this.activeName2 = 'first'
            this.form.userRole = {}
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
      searchCompany () {
        this.cityVisible = true
        this.select = this.select_section
        this.filterText = ''
      },
      searchTarget () {
        this.roleVisible = true
        this.select = this.select_section
      },
      doModify () {
        this.form.attributionCompany = this.filterText
        this.cityVisible = false
      },
      handleCheckChange (data, checked, indeterminate) {
        if (!data.children && checked && this.arr.indexOf(data.id) === -1) {
          this.arr.push(data.id)
        } else if (!data.children && !checked && this.arr.indexOf(data.id) !== 1) {
        }
        console.log(this.arr)
//        console.log('1', checked)
//        console.log('2', indeterminate)
      },
      getCheckedKeys () {
        let arr = this.$refs.tree2.getCheckedKeys()
        console.log(arr)
        this.form.attributionTarget = arr.join(',')
        this.roleVisible = false
      },
      modifyCancel () {
        this.cityVisible = false
        this.form.attributionCompany = ''
      },
      roleCancel () {
        this.roleVisible = false
        this.form.attributionTarget = ''
      },
      handleNode (data) {
        this.filterText = data.label // 弹框树模型点击输入值
        console.log(data)
      },
      filterNode (value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
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
      back () {
        this.activeName2 = 'first'
      }
    }
  }
//  let arr = [
//    {
//      'id': 'e826349b33f24c2ca61571b9bb148004',
//      'parentId': '0',
//      'parentIds': '0,',
//      'label': '城市运营',
//      'sort': 5,
//      'path': '',
//      'target': '',
//      'icon': '',
//      'isShow': '1',
//      'permission': '',
//      'createBy': '1',
//      'createDate': 1493295987000,
//      'updateBy': '1',
//      'updateDate': 1503300330000,
//      'remarks': '',
//      'delFlag': '0',
//      'name': 'city',
//      'type': 0,
//      'children': [
//        {
//          'id': '2a7a73b9775544389e87bda404f53d5c',
//          'parentId': 'e826349b33f24c2ca61571b9bb148004',
//          'parentIds': '0,1,27,e826349b33f24c2ca61571b9bb148004,',
//          'label': '公司信息管理',
//          'sort': 1,
//          'path': '/city/company/info',
//          'target': '',
//          'icon': '',
//          'isShow': '1',
//          'permission': '',
//          'createBy': '1',
//          'createDate': 1489334400000,
//          'updateBy': '1',
//          'updateDate': 1494604800000,
//          'remarks': '',
//          'delFlag': '0',
//          'name': 'city.company.info',
//          'type': 1,
//          'children': [
//            {
//              'id': 'd987a01100e74daa873d0884fafe2df1',
//              'parentId': '2a7a73b9775544389e87bda404f53d5c',
//              'parentIds': '0,1,27,e826349b33f24c2ca61571b9bb148004,2a7a73b9775544389e87bda404f53d5c,',
//              'label': '编辑',
//              'sort': 60,
//              'path': '',
//              'target': '',
//              'icon': '',
//              'isShow': '0',
//              'permission': 'electric:company:tCompanyparamInfo:edit',
//              'createBy': '1',
//              'createDate': 1490457600000,
//              'updateBy': '1',
//              'updateDate': 1490457600000,
//              'remarks': '',
//              'delFlag': '0',
//              'name': null,
//              'type': 2,
//              'children': []
//            },
//            {
//              'id': 'ef388fc08aac480297be2d76e8aa1ed9',
//              'parentId': '2a7a73b9775544389e87bda404f53d5c',
//              'parentIds': '0,1,27,e826349b33f24c2ca61571b9bb148004,2a7a73b9775544389e87bda404f53d5c,',
//              'label': '查看',
//              'sort': 30,
//              'path': '',
//              'target': '',
//              'icon': '',
//              'isShow': '0',
//              'permission': 'electric:company:tCompanyparamInfo:view',
//              'createBy': '1',
//              'createDate': 1490457600000,
//              'updateBy': '1',
//              'updateDate': 1490457600000,
//              'remarks': '',
//              'delFlag': '0',
//              'name': null,
//              'type': 2,
//              'children': []
//            }
//          ]
//        },
//        {
//          'id': '8cd8de4b9ba7401d9e5490fc99a3f19d',
//          'parentId': 'e826349b33f24c2ca61571b9bb148004',
//          'parentIds': '0,1,27,e826349b33f24c2ca61571b9bb148004,',
//          'label': '运维车辆干涉明细',
//          'sort': 5030,
//          'path': '/city/bike/intervene/list',
//          'target': '',
//          'icon': '',
//          'isShow': '1',
//          'permission': '',
//          'createBy': '1',
//          'createDate': 1511780102000,
//          'updateBy': '1',
//          'updateDate': 1511780102000,
//          'remarks': '',
//          'delFlag': '0',
//          'name': 'city.bike.intervene.list',
//          'type': 1,
//          'children': []
//        },
//        {
//          'id': '66e7f5c81b904d5183cfaf38b1853c95',
//          'parentId': 'e826349b33f24c2ca61571b9bb148004',
//          'parentIds': '0,1,27,e826349b33f24c2ca61571b9bb148004,',
//          'label': '点位管理',
//          'sort': 8,
//          'path': '/city/point',
//          'target': '',
//          'icon': '',
//          'isShow': '1',
//          'permission': '',
//          'createBy': '1',
//          'createDate': 1496851200000,
//          'updateBy': '1',
//          'updateDate': 1496851200000,
//          'remarks': '',
//          'delFlag': '0',
//          'name': 'city.point',
//          'type': 1,
//          'children': [
//            {
//              'id': '11620d52356e45ac92fefdbf37a16a39',
//              'parentId': '66e7f5c81b904d5183cfaf38b1853c95',
//              'parentIds': '0,1,27,e826349b33f24c2ca61571b9bb148004,66e7f5c81b904d5183cfaf38b1853c95,',
//              'label': '查看',
//              'sort': 1,
//              'path': '',
//              'target': '',
//              'icon': '',
//              'isShow': '0',
//              'permission': 'electric:childrenareaposition:tChildrenAreaPosition:view',
//              'createBy': '1',
//              'createDate': 1496851200000,
//              'updateBy': '1',
//              'updateDate': 1496851200000,
//              'remarks': '',
//              'delFlag': '0',
//              'name': null,
//              'type': 2,
//              'children': []
//            },
//            {
//              'id': '67e9720132d9455b8394672e99f8bd17',
//              'parentId': '66e7f5c81b904d5183cfaf38b1853c95',
//              'parentIds': '0,1,27,e826349b33f24c2ca61571b9bb148004,66e7f5c81b904d5183cfaf38b1853c95,',
//              'label': '编辑',
//              'sort': 2,
//              'path': '',
//              'target': '',
//              'icon': '',
//              'isShow': '0',
//              'permission': 'electric:childrenareaposition:tChildrenAreaPosition:edit',
//              'createBy': '1',
//              'createDate': 1496851200000,
//              'updateBy': '1',
//              'updateDate': 1496851200000,
//              'remarks': '',
//              'delFlag': '0',
//              'name': null,
//              'type': 2,
//              'children': []
//            }
//          ]
//        },
//        {
//          'id': 'fsfask34454gherjfsdertyrtrt4841d',
//          'parentId': 'e826349b33f24c2ca61571b9bb148004',
//          'parentIds': '0,1,27,e826349b33f24c2ca61571b9bb148004,',
//          'label': '电子围栏基础信息',
//          'sort': 3,
//          'path': '/city/fencing/info',
//          'target': '',
//          'icon': '',
//          'isShow': '1',
//          'permission': 'view,updateDelete,create',
//          'createBy': '1',
//          'createDate': 1493222400000,
//          'updateBy': '1',
//          'updateDate': 1494604800000,
//          'remarks': '',
//          'delFlag': '0',
//          'name': 'city.fencing.info',
//          'type': 1,
//          'children': [
//            {
//              'id': 'j4g54j5g45tr5ad31d13d16rf',
//              'parentId': 'fsfask34454gherjfsdertyrtrt4841d',
//              'parentIds': '0,1,27,e826349b33f24c2ca61571b9bb148004,fsfask34454gherjfsdertyrtrt4841d,',
//              'label': '查询',
//              'sort': 3,
//              'path': '',
//              'target': '',
//              'icon': '',
//              'isShow': '0',
//              'permission': 'city:fencing:info:view',
//              'createBy': '1',
//              'createDate': 1493222400000,
//              'updateBy': '1',
//              'updateDate': 1494604800000,
//              'remarks': '',
//              'delFlag': '0',
//              'name': '',
//              'type': 2,
//              'children': []
//            },
//            {
//              'id': 'sfkh4546d6gdg1d231gdgjjgh',
//              'parentId': 'fsfask34454gherjfsdertyrtrt4841d',
//              'parentIds': '0,1,27,e826349b33f24c2ca61571b9bb148004,fsfask34454gherjfsdertyrtrt4841d,',
//              'label': '修改',
//              'sort': 3,
//              'path': '',
//              'target': '',
//              'icon': '',
//              'isShow': '0',
//              'permission': 'city:fencing:info:update',
//              'createBy': '1',
//              'createDate': 1493222400000,
//              'updateBy': '1',
//              'updateDate': 1494604800000,
//              'remarks': '',
//              'delFlag': '0',
//              'name': '',
//              'type': 2,
//              'children': []
//            },
//            {
//              'id': '641fhf8585455454555ghjgfj',
//              'parentId': 'fsfask34454gherjfsdertyrtrt4841d',
//              'parentIds': '0,1,27,e826349b33f24c2ca61571b9bb148004,fsfask34454gherjfsdertyrtrt4841d,',
//              'label': '删除',
//              'sort': 3,
//              'path': '',
//              'target': '',
//              'icon': '',
//              'isShow': '0',
//              'permission': 'city:fencing:info:delete',
//              'createBy': '1',
//              'createDate': 1493222400000,
//              'updateBy': '1',
//              'updateDate': 1494604800000,
//              'remarks': '',
//              'delFlag': '0',
//              'name': '',
//              'type': 2,
//              'children': []
//            },
//            {
//              'id': 'ytfd4ga45453gdg45d4g4hf5g',
//              'parentId': 'fsfask34454gherjfsdertyrtrt4841d',
//              'parentIds': '0,1,27,e826349b33f24c2ca61571b9bb148004,fsfask34454gherjfsdertyrtrt4841d,',
//              'label': '新增',
//              'sort': 3,
//              'path': '',
//              'target': '',
//              'icon': '',
//              'isShow': '0',
//              'permission': 'city:fencing:info:create',
//              'createBy': '1',
//              'createDate': 1493222400000,
//              'updateBy': '1',
//              'updateDate': 1494604800000,
//              'remarks': '',
//              'delFlag': '0',
//              'name': '',
//              'type': 2,
//              'children': []
//            }
//          ]
//        },
//        {
//          'id': 'f9fb12ea16b3456c97d00278d31e9d2b',
//          'parentId': 'e826349b33f24c2ca61571b9bb148004',
//          'parentIds': '0,1,27,e826349b33f24c2ca61571b9bb148004,',
//          'label': '远程升级',
//          'sort': 3,
//          'path': '/city/remote',
//          'target': '',
//          'icon': '',
//          'isShow': '1',
//          'permission': '',
//          'createBy': '1',
//          'createDate': 1493222400000,
//          'updateBy': '1',
//          'updateDate': 1494604800000,
//          'remarks': '',
//          'delFlag': '0',
//          'name': 'city.remote',
//          'type': 1,
//          'children': [
//            {
//              'id': '8f4773beccb4446abd54156842b00ea7',
//              'parentId': 'f9fb12ea16b3456c97d00278d31e9d2b',
//              'parentIds': '0,1,27,e826349b33f24c2ca61571b9bb148004,f9fb12ea16b3456c97d00278d31e9d2b,',
//              'label': '编辑',
//              'sort': 60,
//              'path': '',
//              'target': '',
//              'icon': '',
//              'isShow': '0',
//              'permission': 'electric:update:tUpdateInfo:edit',
//              'createBy': '1',
//              'createDate': 1493222400000,
//              'updateBy': '1',
//              'updateDate': 1493222400000,
//              'remarks': '',
//              'delFlag': '0',
//              'name': null,
//              'type': 2,
//              'children': []
//            },
//            {
//              'id': '0f21885745e44ceea043fb074200f837',
//              'parentId': 'f9fb12ea16b3456c97d00278d31e9d2b',
//              'parentIds': '0,1,27,e826349b33f24c2ca61571b9bb148004,f9fb12ea16b3456c97d00278d31e9d2b,',
//              'label': '查看',
//              'sort': 30,
//              'path': '',
//              'target': '',
//              'icon': '',
//              'isShow': '0',
//              'permission': 'electric:update:tUpdateInfo:view',
//              'createBy': '1',
//              'createDate': 1493222400000,
//              'updateBy': '1',
//              'updateDate': 1493222400000,
//              'remarks': '',
//              'delFlag': '0',
//              'name': null,
//              'type': 2,
//              'children': []
//            }
//          ]
//        },
//        {
//          'id': 'addeb73b760741f1817d1b820815a945',
//          'parentId': 'e826349b33f24c2ca61571b9bb148004',
//          'parentIds': '0,1,27,e826349b33f24c2ca61571b9bb148004,',
//          'label': '小区域管理',
//          'sort': 4,
//          'path': '/city/range',
//          'target': 'mainFrame',
//          'icon': '',
//          'isShow': '1',
//          'permission': '',
//          'createBy': '1',
//          'createDate': 1494604800000,
//          'updateBy': '1',
//          'updateDate': 1494604800000,
//          'remarks': '',
//          'delFlag': '0',
//          'name': 'city.range',
//          'type': 1,
//          'children': [
//            {
//              'id': '0c3b13fcea5040849e43492436f4c8d3',
//              'parentId': 'addeb73b760741f1817d1b820815a945',
//              'parentIds': '0,1,27,e826349b33f24c2ca61571b9bb148004,addeb73b760741f1817d1b820815a945,',
//              'label': '编辑',
//              'sort': 60,
//              'path': '',
//              'target': '',
//              'icon': '',
//              'isShow': '0',
//              'permission': 'electric:childrenarea:tChildrenArea:edit',
//              'createBy': '1',
//              'createDate': 1494604800000,
//              'updateBy': '1',
//              'updateDate': 1494604800000,
//              'remarks': '',
//              'delFlag': '0',
//              'name': null,
//              'type': 2,
//              'children': []
//            },
//            {
//              'id': 'ada8d7c4919443d9b37df49c39de1d9d',
//              'parentId': 'addeb73b760741f1817d1b820815a945',
//              'parentIds': '0,1,27,e826349b33f24c2ca61571b9bb148004,addeb73b760741f1817d1b820815a945,',
//              'label': '查看',
//              'sort': 30,
//              'path': '',
//              'target': '',
//              'icon': '',
//              'isShow': '0',
//              'permission': 'electric:childrenarea:tChildrenArea:view',
//              'createBy': '1',
//              'createDate': 1494604800000,
//              'updateBy': '1',
//              'updateDate': 1494604800000,
//              'remarks': '',
//              'delFlag': '0',
//              'name': null,
//              'type': 2,
//              'children': []
//            },
//            {
//              'id': '709b77eab0ad42e9811956fdb6becb5e',
//              'parentId': 'addeb73b760741f1817d1b820815a945',
//              'parentIds': '0,1,27,e826349b33f24c2ca61571b9bb148004,addeb73b760741f1817d1b820815a945,',
//              'label': '区域围栏',
//              'sort': 90,
//              'path': '',
//              'target': '',
//              'icon': '',
//              'isShow': '0',
//              'permission': 'electric:childrenarea:tChildrenArea:fance',
//              'createBy': '1',
//              'createDate': 1494604800000,
//              'updateBy': '1',
//              'updateDate': 1494604800000,
//              'remarks': '',
//              'delFlag': '0',
//              'name': null,
//              'type': 2,
//              'children': []
//            }
//          ]
//        },
//        {
//          'id': 'ddee66ec37424ec08f990643f4fbd6d0',
//          'parentId': 'e826349b33f24c2ca61571b9bb148004',
//          'parentIds': '0,1,27,e826349b33f24c2ca61571b9bb148004,',
//          'label': '城市黑名单',
//          'sort': 5030,
//          'path': '/city/blacklist',
//          'target': '',
//          'icon': '',
//          'isShow': '1',
//          'permission': '',
//          'createBy': '1',
//          'createDate': 1503502528000,
//          'updateBy': '1',
//          'updateDate': 1503502528000,
//          'remarks': '',
//          'delFlag': '0',
//          'name': 'city.blacklist',
//          'type': 1,
//          'children': []
//        },
//        {
//          'id': 'b8ccbc6255a74e699376b1712c8397cc',
//          'parentId': 'e826349b33f24c2ca61571b9bb148004',
//          'parentIds': '0,1,27,e826349b33f24c2ca61571b9bb148004,',
//          'label': '运营人员管理',
//          'sort': 2,
//          'path': '/city/operator',
//          'target': '',
//          'icon': '',
//          'isShow': '1',
//          'permission': '',
//          'createBy': '1',
//          'createDate': 1493740800000,
//          'updateBy': '1',
//          'updateDate': 1494604800000,
//          'remarks': '',
//          'delFlag': '0',
//          'name': 'city.operator',
//          'type': 1,
//          'children': [
//            {
//              'id': 'c95afc3575f84456860cae4044180bd8',
//              'parentId': 'b8ccbc6255a74e699376b1712c8397cc',
//              'parentIds': '0,1,27,e826349b33f24c2ca61571b9bb148004,afa4f268958040a3b540693c9210da66,b8ccbc6255a74e699376b1712c8397cc,',
//              'label': '查看',
//              'sort': 30,
//              'path': '',
//              'target': '',
//              'icon': '',
//              'isShow': '0',
//              'permission': 'electric:administrator:tAdministratorInfo:view',
//              'createBy': '1',
//              'createDate': 1493740800000,
//              'updateBy': '1',
//              'updateDate': 1493740800000,
//              'remarks': '',
//              'delFlag': '0',
//              'name': null,
//              'type': 2,
//              'children': []
//            },
//            {
//              'id': 'bbed6b2fd62546a6984e1fe4cbea142e',
//              'parentId': 'b8ccbc6255a74e699376b1712c8397cc',
//              'parentIds': '0,1,27,e826349b33f24c2ca61571b9bb148004,afa4f268958040a3b540693c9210da66,b8ccbc6255a74e699376b1712c8397cc,',
//              'label': '编辑',
//              'sort': 60,
//              'path': '',
//              'target': '',
//              'icon': '',
//              'isShow': '0',
//              'permission': 'electric:administrator:tAdministratorInfo:edit',
//              'createBy': '1',
//              'createDate': 1493740800000,
//              'updateBy': '1',
//              'updateDate': 1493740800000,
//              'remarks': '',
//              'delFlag': '0',
//              'name': null,
//              'type': 2,
//              'children': []
//            }
//          ]
//        },
//        {
//          'id': 'ca5decf461d442e6aeadc17cd4b8acbb',
//          'parentId': 'e826349b33f24c2ca61571b9bb148004',
//          'parentIds': '0,1,27,e826349b33f24c2ca61571b9bb148004,',
//          'label': '区域统计报表',
//          'sort': 38,
//          'path': '/city/area/total',
//          'target': '',
//          'icon': '',
//          'isShow': '1',
//          'permission': '',
//          'createBy': '1',
//          'createDate': 1502697043000,
//          'updateBy': '1',
//          'updateDate': 1502697043000,
//          'remarks': '',
//          'delFlag': '0',
//          'name': 'city.area.total',
//          'type': 1,
//          'children': []
//        }
//      ]
//    },
//    {
//      'id': 'vxcv4sdf48432bb4dedfgd356d5919',
//      'parentId': '0',
//      'parentIds': '0,',
//      'label': '服务配置',
//      'sort': 2,
//      'path': '',
//      'target': '',
//      'icon': '',
//      'isShow': '1',
//      'permission': '',
//      'createBy': '1',
//      'createDate': 1489075200000,
//      'updateBy': '1',
//      'updateDate': 1493222400000,
//      'remarks': '',
//      'delFlag': '0',
//      'name': 'serviceConfig',
//      'type': 0,
//      'children': [
//        {
//          'id': 'fkdfsd4545sdfsdfsdfsdas4548a',
//          'parentId': 'vxcv4sdf48432bb4dedfgd356d5919',
//          'parentIds': '0,vxcv4sdf48432bb4dedfgd356d5919,',
//          'label': '短信配置',
//          'sort': 2,
//          'path': '/serviceConfig/msg',
//          'target': '',
//          'icon': '',
//          'isShow': '1',
//          'permission': '',
//          'createBy': '1',
//          'createDate': 1489075200000,
//          'updateBy': '1',
//          'updateDate': 1493222400000,
//          'remarks': '',
//          'delFlag': '0',
//          'name': 'serviceConfig.msg',
//          'type': 1,
//          'children': [
//            {
//              'id': '44ghkf45ghd5eh5dh5d2d1h2d1',
//              'parentId': 'fkdfsd4545sdfsdfsdfsdas4548a',
//              'parentIds': '0,vxcv4sdf48432bb4dedfgd356d5919,fkdfsd4545sdfsdfsdfsdas4548a,',
//              'label': '短信通道请求次数提交',
//              'sort': 2,
//              'path': '',
//              'target': '',
//              'icon': '',
//              'isShow': '0',
//              'permission': 'serviceConfig:msg:submitCount',
//              'createBy': '1',
//              'createDate': 1489075200000,
//              'updateBy': '1',
//              'updateDate': 1493222400000,
//              'remarks': '',
//              'delFlag': '0',
//              'name': '',
//              'type': 2,
//              'children': []
//            },
//            {
//              'id': 'hfghjghj45454gsgdf1g24jk5g',
//              'parentId': 'fkdfsd4545sdfsdfsdfsdas4548a',
//              'parentIds': '0,vxcv4sdf48432bb4dedfgd356d5919,fkdfsd4545sdfsdfsdfsdas4548a,',
//              'label': '短信通道提交',
//              'sort': 2,
//              'path': '',
//              'target': '',
//              'icon': '',
//              'isShow': '0',
//              'permission': 'serviceConfig:msg:submit',
//              'createBy': '1',
//              'createDate': 1489075200000,
//              'updateBy': '1',
//              'updateDate': 1493222400000,
//              'remarks': '',
//              'delFlag': '0',
//              'name': '',
//              'type': 2,
//              'children': []
//            }
//          ]
//        },
//        {
//          'id': 'jkdfgjk4874sfsd48sfs4sf45ss4',
//          'parentId': 'vxcv4sdf48432bb4dedfgd356d5919',
//          'parentIds': '0,vxcv4sdf48432bb4dedfgd356d5919,',
//          'label': '实名认证',
//          'sort': 2,
//          'path': '/serviceConfig/name',
//          'target': '',
//          'icon': '',
//          'isShow': '1',
//          'permission': '',
//          'createBy': '1',
//          'createDate': 1489075200000,
//          'updateBy': '1',
//          'updateDate': 1493222400000,
//          'remarks': '',
//          'delFlag': '0',
//          'name': 'serviceConfig.name',
//          'type': 1,
//          'children': [
//            {
//              'id': '44b5d4f54g8wfzc23z1vgr5',
//              'parentId': 'jkdfgjk4874sfsd48sfs4sf45ss4',
//              'parentIds': '0,vxcv4sdf48432bb4dedfgd356d5919,jkdfgjk4874sfsd48sfs4sf45ss4,',
//              'label': '实名认证请求次数提交',
//              'sort': 2,
//              'path': '',
//              'target': '',
//              'icon': '',
//              'isShow': '0',
//              'permission': 'serviceConfig:name:submitCount',
//              'createBy': '1',
//              'createDate': 1489075200000,
//              'updateBy': '1',
//              'updateDate': 1493222400000,
//              'remarks': '',
//              'delFlag': '0',
//              'name': '',
//              'type': 2,
//              'children': []
//            },
//            {
//              'id': 'gd4g45sdg45s4f548efg45s',
//              'parentId': 'jkdfgjk4874sfsd48sfs4sf45ss4',
//              'parentIds': '0,vxcv4sdf48432bb4dedfgd356d5919,jkdfgjk4874sfsd48sfs4sf45ss4,',
//              'label': '实名认证通道提交',
//              'sort': 2,
//              'path': '',
//              'target': '',
//              'icon': '',
//              'isShow': '0',
//              'permission': 'serviceConfig:name:submit',
//              'createBy': '1',
//              'createDate': 1489075200000,
//              'updateBy': '1',
//              'updateDate': 1493222400000,
//              'remarks': '',
//              'delFlag': '0',
//              'name': '',
//              'type': 2,
//              'children': []
//            }
//          ]
//        }
//      ]
//    }
//  ]
//
//  //  function routePath (arr) {
//  //    for (let i = 0; i < arr.length; i++) {
//  //      let item = arr[i]
//  //      if (item.children !== undefined && item.children.length > 0) {  // 递归 筛选出所有的对象
//  //        routePath(item.children)
//  //      }
//  //      console.log(item)
//  //      newArr.push(item)
//  //      if (item.parentId === '0' && item.parentIds === '0,') {  // 找出一级菜单
//  //        menus[item.name] = []
//  //        console.log(0, menus)
//  //      }
//  //      newArr.find(function (s) {
//  //        if (s.id === item.parentId) {
//  //          s.children
//  //        }
//  //      })
//  //    }
//  //  }
//
//  backJson(arr)
//
//  function backJson (backData) {
//    let firstLength = backData.length // 数组的长度
//    let dataObj = {}
//    for (let i = 0; i < firstLength; i++) {
//      dataObj[backData[i].name] = []  // 生成一级菜单
//      let secondLength = backData[i].children.length // 二级菜单长度
//      for (let j = 0; j < secondLength; j++) {
//        let secondPage = backData[i].children[j]
//        if (secondPage.type === 1) {  // 二级是页面
//          let pageObj = {'label': '', 'name': '', 'path': '', 'permission': []}
//          pageObj.label = secondPage.label
//          pageObj.name = secondPage.name
//          pageObj.path = secondPage.path
//          if (secondPage.children !== [] && secondPage.children !== undefined) {
//            for (let g = 0; g < secondPage.children.length; g++) {
//              pageObj.permission.push(secondPage.children[g].permission)
//            }
//          }
//          dataObj[backData[i].name].push(pageObj)
//        } else if (secondPage.type === 0) {
//          // 说明二级菜单的children有值,则循环二级菜单找到三级菜单页面
//          let childObj = {'label': '', 'children': []}
//          let threePage = secondPage.children
//          for (let k = 0; k < threePage.length; k++) {
//            childObj.label = backData[i].children[j].label
//            let childPageObj = {'label': '', 'name': '', 'path': '', 'permission': []}
//            childPageObj.label = threePage[k].label
//            childPageObj.name = threePage[k].name
//            childPageObj.path = threePage[k].path
//            if (threePage[k].children) {
//              for (let g = 0; g < threePage[k].children.length; g++) {
//                childPageObj.permission.push(threePage[k].children[g].permission)
//              }
//            }
//            childObj.children.push(childPageObj)
//          }
//          dataObj[backData[i].name].push(childObj)
//        }
//      }
//    }
//    console.log(22, dataObj)
//    return dataObj
//  }
</script>

<style scoped>
  .second .textarea, .second .el-input, .second .el-input__inner {
    width: 300px;
  }

  .keySearch {
    width: 140px;
    height: 20px;
    outline-style: none;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 20px;
  }

  span {
    color: #888;
  }
</style>
