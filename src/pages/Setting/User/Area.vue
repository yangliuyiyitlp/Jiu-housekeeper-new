<template>
  <div>
        <div class="grid-content bg-purple-light">
          <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <!--区域列表-->
      <el-tab-pane label="区域列表" name="first">
        <div>
          <tree-grid
            :defaultExpandAll="true"
            :columns="columns"
            :tree-structure="true"
            :data-source="dataSource">
          </tree-grid>
        </div>
        <!--<el-table-->
          <!--:data="tableData"-->
          <!--width="100%"-->
          <!--border-->
          <!--stripe>-->
          <!--<el-table-column-->
            <!--prop="id"-->
            <!--label="id"-->
            <!--width="180">-->
          <!--</el-table-column>-->
          <!--<el-table-column-->
            <!--header-align="center"-->
            <!--align="center"-->
            <!--prop="name"-->
            <!--label="区域名称"-->
            <!--width="180">-->
          <!--</el-table-column>-->
          <!--<el-table-column-->
            <!--header-align="center"-->
            <!--align="center"-->
            <!--prop="area"-->
            <!--label="城市代码	"-->
            <!--width="180">-->
          <!--</el-table-column>-->
          <!--<el-table-column-->
            <!--header-align="center"-->
            <!--align="center"-->
            <!--prop="number"-->
            <!--label="区域编码	">-->
          <!--</el-table-column>-->
          <!--<el-table-column-->
            <!--header-align="center"-->
            <!--align="center"-->
            <!--prop="type"-->
            <!--label="区域类型	">-->
          <!--</el-table-column>-->
          <!--<el-table-column-->
            <!--header-align="center"-->
            <!--align="center"-->
            <!--prop="remarks"-->
            <!--show-overflow-tooltip-->
            <!--label="区域推送码">-->
          <!--</el-table-column>-->
          <!--<el-table-column-->
            <!--header-align="center"-->
            <!--align="center"-->
            <!--prop="remarks"-->
            <!--show-overflow-tooltip-->
            <!--label="电子围栏顶点">-->
          <!--</el-table-column>-->
          <!--<el-table-column-->
            <!--header-align="center"-->
            <!--align="center"-->
            <!--label="操作">-->
            <!--<template slot-scope="scope">-->
              <!--<el-button @click="modifyRecord(scope)" type="text" size="small">修改</el-button>-->
              <!--<el-button @click="deleteRecord(scope.row.id)" type="text" size="small">删除</el-button>-->
              <!--<el-button @click="addRecord(scope.row.id)" type="text" size="small">添加下级机构</el-button>-->
            <!--</template>-->
          <!--</el-table-column>-->
        <!--</el-table>-->
      </el-tab-pane>

      <!--区域添加 -->
      <el-tab-pane :label="titleSecond" name="second" class="second">

        <el-form ref="form" :model="form" :rules ='rules' label-width="150px">
          <el-form-item label="上级区域：">
            <el-input
              :disabled="true"
              :on-icon-click="searchSection"
              icon="search"
              v-model="form.superior_area">
            </el-input>
          </el-form-item>

          <el-form-item label="区域名称：" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>

          <el-form-item label="区域编码：">
            <el-input v-model="form.area_number"></el-input>
          </el-form-item>

          <el-form-item label="区域推送码：">
            <el-input v-model="form.push_number"></el-input>
          </el-form-item>

          <el-form-item label="区域类型：">
            <el-select v-model="form.area_type" clearable>
              <el-option label="国家" value="1"></el-option>
              <el-option label="省份、直辖市" value="2"></el-option>
              <el-option label="地市" value="3"></el-option>
              <el-option label="区县" value="4"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="备注：">
            <el-input v-model="form.remark" type="textarea" class='textarea'></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="saveData">保存</el-button>
            <el-button @click="back">返回</el-button>
          </el-form-item>
        </el-form>

        <!--模态框-->
        <el-dialog :title=title size="tiny" :visible.sync="cityVisible" center>
          关键字：<input ref='keySearch' type='text' class='keySearch' v-model="filterText">
          <el-tree
            ref="tree2"
            highlight-current
            :data="select"
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
      </el-tab-pane>

    </el-tabs>
        </div>
  </div>
</template>

<script>
  import TreeGrid from '../../../components/commons/Ztree/TreeGrid.vue'
  // arr2tree引入
  import arr2tree from '../../../utils/arr2tree.js'
  import bus from '@/assets/js/eventBus.js'
  export default {
    data () {
      return {
        value1: '',
        activeName2: 'first',
        saveUp: false,
        title: '',
        filterText: '',
        cityVisible: false,
        titleSecond: '机构添加',
        select: '',
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        select_section: [{
          id: 1,
          label: '上海市总公司',
          children: [{
            id: 4,
            label: '厦门分公司'
          }, {
            id: 4,
            label: '佛山分公司',
            children: [{
              id: 9,
              label: '城市运营'
            }]
          }, {
            id: 4,
            label: '珠海分公司',
            children: [{
              id: 9,
              label: '城市运营'
            }]
          }, {
            id: 4,
            label: '运营部'
          }, {
            id: 4,
            label: '北京分公司',
            children: [{
              id: 9,
              label: '城市运营'
            }]
          }, {
            id: 4,
            label: '客服部',
            children: [{
              id: 9,
              label: '红包管理员'
            }, {
              id: 9,
              label: '客服部'
            }]
          }, {
            id: 4,
            label: '上海分公司',
            children: [{
              id: 9,
              label: '黄浦区政府'
            }, {
              id: 9,
              label: '城市运营'
            }, {
              id: 9,
              label: '虹口区政府'
            }, {
              id: 9,
              label: '普陀区政府'
            }, {
              id: 9,
              label: '静安区政府'
            }, {
              id: 9,
              label: '嘉定区政府'
            }, {
              id: 9,
              label: '浦东新区政府'
            }, {
              id: 9,
              label: '闵行区政府'
            }, {
              id: 9,
              label: '宝山区政府'
            }, {
              id: 9,
              label: '松江区政府'
            }, {
              id: 9,
              label: '杨浦区政府'
            }, {
              id: 9,
              label: '徐汇区政府'
            }, {
              id: 9,
              label: '长宁区政府'
            }, {
              id: 9,
              label: '青浦区政府'
            }, {
              id: 9,
              label: '奉贤区政府'
            }, {
              id: 9,
              label: '金山区政府'
            }]
          }, {
            id: 4,
            label: '生产部'
          }, {
            id: 4,
            label: '成都分公司',
            children: [{
              id: 9,
              label: '城市运营'
            }]
          }, {
            id: 4,
            label: '湖州分公司',
            children: [{
              id: 9,
              label: '城市运营'
            }]
          }, {
            id: 4,
            label: '公司领导'
          }, {
            id: 4,
            label: '综合部'
          }, {
            id: 4,
            label: '市场部'
          }, {
            id: 4,
            label: '技术部'
          }, {
            id: 4,
            label: '研发部'
          }, {
            id: 4,
            label: '深圳分公司',
            children: [{
              id: 9,
              label: '城市运营'
            }]
          }]
        }],
        formInline: {
          attribution_company: '',
          login_name: '',
          attribution_department: '',
          name: ''
        },
        form: {
          superior_mechanism: '',
          attribution_area: '',
          mechanism_name: '',
          mechanism_number: '',
          mechanism_type: '2',
          mechanism_level: '1',
          isUse: '1',
          main_responsible: '',
          vice_responsible: '',
          contact_address: '',
          zip_code: '',
          responsible: '',
          email: '',
          fax: '',
          phone: '',
          lower_department: [],
          remark: ''
        },
        tableData: [{
          id: '18745852358',
          name: '上海市总公司',
          area: '中华人民共和国',
          number: '大剿匪啊啊啊',
          type: '大剿匪啊',
          remarks: '02118745852358'
        }],
        rules: {
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'}
          ]
        },
        columns: [
          {
            text: '栏目名称',
            dataIndex: 'name'
          },
          {
            text: '归属机构',
            dataIndex: 'officeId'
          },
          {
            text: '栏目模型',
            dataIndex: 'module'
          },
          {
            text: '排序',
            dataIndex: 'sort'
          },
          {
            text: '导航菜单',
            dataIndex: 'inMenuName'
          },
          {
            text: '栏目列表',
            dataIndex: 'inListName'
          },
          {
            text: '展示方式',
            dataIndex: 'showModes'
          }
        ], // 树表格
        dataSource: [] // 树表格
      }
    },
    created () {
      this.query()
    },
    mounted () {
      // 编辑
      bus.$on('updateBtn', (id) => {
        this.$refs['form'].resetFields()
        this.modifyRecord(id)
      })
      // 删除
      bus.$on('delBtn', (id) => {
        this.deleteRecord(id)
      })
      // 添加下一级
      bus.$on('addBtn', (parentId) => {
        this.$refs['form'].resetFields()
        this.addRecord()
      })
    },
    watch: {
      filterText (val) {
        this.$refs.tree2.filter(val)
      }
    },
    methods: {
      handleClick (tab, event) {
        if (this.activeName2 === 'first') {
          this.titleSecond = '机构添加'
        }
        if (tab.label === '机构添加') {
          this.addRecord()
        }
      },
      handleNodeClick () {},
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
                    message: '删除异常'
                  })
                }
              })
              .catch(() => {
                this.$message({
                  type: 'error',
                  message: '删除失败'
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
      modifyRecord (id) {
        console.log(this.$refs['form'])
//        this.$refs['form'].resetFields()
        this.activeName2 = 'second'
        this.titleSecond = '机构修改'
        this.saveUp = false
        this.$ajax.get('/activity/enjoy/form', {params: {id: id}})
          .then((res) => {
            if (res.data.code === 0) {
              this.form = res.data.tActivitiesInfo
            } else {
              this.$message({
                type: 'error',
                message: '获取异常'
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
      addRecord () {
//        this.$refs['form'].resetFields()
        this.activeName2 = 'second'
        this.titleSecond = '机构添加'
        this.saveUp = false
        this.$ajax.get('/activity/enjoy/sort')
          .then((res) => {
            if (res.data.code === 0) {
              this.form = {}
              this.form.sort = res.data.tActivitiesInfo.sort
            } else {
              this.$message({
                type: 'error',
                message: '请求显示顺序异常'
              })
            }
          })
          .catch(() => {
            this.$message({
              message: '请求显示顺序失败',
              type: 'info'
            })
          })
      }, // 添加下级目录
      saveData (form) {       // 修改确定功能
        this.$refs[form].validate((valid) => {
          if (valid) {
            this.activeName2 = 'first'
            this.$ajax.get('/activity/enjoy/save', {params: this.form})
              .then((response) => {
                if (response.data.code === 0) {
                  // 更新成功
                  this.$message({
                    type: 'success',
                    message: '操作成功'
                  })
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
        this.activeName2 = 'first'
        this.titleSecond = '用户添加'
      },
      searchSection () {
        this.cityVisible = true
        this.title = '选择部门'
        this.select = this.select_section
      },
      doModify () {
        if (this.title === '选择公司') {
          this.formInline.attributionCompany = this.filterText
        } else if (this.title === '选择部门') {
          this.formInline.attributionSection = this.filterText
        }
        this.cityVisible = false
      },
      modifyCancel () {
        this.cityVisible = false
        this.formInline.attributionCompany = ''
        this.formInline.attributionSection = ''
      },
      filterNode (value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
      handleNode (data) {
        this.filterText = data.label // 弹框树模型点击输入值
      },
      query () {
        // 请求栏目列表
        this.$ajax.get('http://localhost:3000/content/column/getcategorys')
          .then(res => {
            if (res.data.code === 200) {
              let arr = res.data.data
              this.dataSource = arr2tree.getTree(arr, '1')
            }
          })
          .catch(err => {
            console.log(err)
          })
      } // 树表格
    },
    components: {
      TreeGrid
    }  // 树表格
  }
</script>

<style scoped>
  .second .textarea, .second .el-input, .second .el-input__inner {
    width: 300px;
  }
  p {
    color: red;
  }
</style>
