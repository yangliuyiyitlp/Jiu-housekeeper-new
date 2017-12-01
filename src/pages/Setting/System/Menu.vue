<template>
  <div class="right">
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <!--菜单列表-->
      <el-tab-pane label="菜单列表" name="first">
        <div>
          <tree-grid
            :defaultExpandAll="true"
            :columns="columns"
            :tree-structure="true"
            :data-source="dataSource">
          </tree-grid>
        </div>
        <!--&lt;!&ndash;筛选条件&ndash;&gt;-->
        <!--<el-form :inline="true" :model="formInline" class="demo-form-inline">-->

        <!--<el-form-item label="归属公司:">-->
        <!--<el-input v-model="formInline.attribution_company" placeholder="选择归属公司">-->
        <!--</el-input>-->
        <!--</el-form-item>-->

        <!--<el-form-item label="登录名:">-->
        <!--<el-input v-model="formInline.login_name" placeholder="输入登录名">-->
        <!--</el-input>-->
        <!--</el-form-item>-->

        <!--<el-form-item label="归属部门:">-->
        <!--<el-input v-model="formInline.attribution_department" placeholder="选择归属部门">-->
        <!--</el-input>-->
        <!--</el-form-item>-->

        <!--<el-form-item label="姓名:">-->
        <!--<el-input v-model="formInline.name" placeholder="输入姓名">-->
        <!--</el-input>-->
        <!--</el-form-item>-->

        <!--<el-form-item>-->
        <!--<el-button type="primary" @click="search">查询</el-button>-->
        <!--</el-form-item>-->

        <!--<el-form-item>-->
        <!--<el-button type="primary" @click="exportData">导出</el-button>-->
        <!--</el-form-item>-->

        <!--<el-form-item>-->
        <!--<el-button type="primary" @click="importData">导入</el-button>-->
        <!--</el-form-item>-->

        <!--</el-form>-->

        <!--&lt;!&ndash;表格&ndash;&gt;-->
        <!--<el-table-->
        <!--:data="tableData"-->
        <!--style="width: 100%"-->
        <!--border-->
        <!--stripe>-->
        <!--<el-table-column-->
        <!--header-align="center"-->
        <!--align="center"-->
        <!--prop="attribution_company"-->
        <!--label="归属公司"-->
        <!--width="260">-->
        <!--</el-table-column>-->

        <!--<el-table-column-->
        <!--header-align="center"-->
        <!--align="center"-->
        <!--prop="attribution_department"-->
        <!--label="归属部门"-->
        <!--width="260">-->
        <!--</el-table-column>-->

        <!--<el-table-column-->
        <!--header-align="center"-->
        <!--align="center"-->
        <!--prop="login_name"-->
        <!--label="登录名"-->
        <!--width="260">-->
        <!--</el-table-column>-->

        <!--<el-table-column-->
        <!--header-align="center"-->
        <!--align="center"-->
        <!--prop="name"-->
        <!--label="姓名"-->
        <!--width="180">-->
        <!--</el-table-column>-->

        <!--<el-table-column-->
        <!--header-align="center"-->
        <!--align="center"-->
        <!--prop="phone"-->
        <!--label="电话"-->
        <!--width="300">-->
        <!--</el-table-column>-->

        <!--<el-table-column-->
        <!--header-align="center"-->
        <!--align="center"-->
        <!--prop="mobile_phone"-->
        <!--label="手机"-->
        <!--width="300">-->
        <!--</el-table-column>-->

        <!--<el-table-column-->
        <!--fixed="right"-->
        <!--header-align="center"-->
        <!--align="center"-->
        <!--label="操作"-->
        <!--width="160">-->
        <!--<template slot-scope="scope">-->
        <!--<el-button type="text" size="small">修改</el-button>-->
        <!--<el-button-->
        <!--@click="open2(scope.$index, tableData4)"-->
        <!--type="text"-->
        <!--size="small">-->
        <!--移除-->
        <!--</el-button>-->
        <!--</template>-->
        <!--</el-table-column>-->

        <!--</el-table>-->

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

      <!--菜单添加 -->
      <el-tab-pane :label="titleSecond" name="second" class="second">

        <el-form ref="form" :model="form" label-width="150px">

          <el-form-item label="上级菜单：">
            <el-input v-model="form.superior_menu" placeholder="选择上级菜单"></el-input>
          </el-form-item>

          <el-form-item label="名称：">
            <el-input v-model="form.name" placeholder="输入名称"></el-input>
          </el-form-item>

          <el-form-item label="链接：">
            <el-input v-model="form.add_link" placeholder="输入链接"></el-input>
            <span>点击菜单跳转的页面</span>
          </el-form-item>

          <el-form-item label="目标：">
            <el-input v-model="form.target" placeholder="输入目标窗口"></el-input>
            <span>链接地址打开的目标窗口，默认：mainFrame</span>
          </el-form-item>

          <el-form-item label="图标：">
            <el-input v-model="form.imgPath" v-show='false'></el-input>
            <img width="100%" :src="form.imgPath" alt="图标">
            <el-upload
              :disabled="saveUp"
              ref="uploadFile"
              list-type="picture-card"
              action='http://jjdcjavaweb.oss-cn-shanghai.aliyuncs.com'
              :data="Token"
              :on-remove="removeImgPath"
              :on-success="successImgPath"
              :before-upload="beforeUploadImgPath">
              <el-button :disabled="saveUp" type="primary" @click="clearUploadedImgPath">上传图片
                <i class="el-icon-upload el-icon--right"></i>
              </el-button>
            </el-upload>
          </el-form-item>

          <el-form-item label="排序：">
            <el-input v-model="form.sort"></el-input>
            <span>排列顺序，升序。</span>
          </el-form-item>

          <el-form-item label="可见：">
            <el-radio class="radio" v-model="form.isShow" label="1">显示</el-radio>
            <el-radio class="radio" v-model="form.isShow" label="2">隐藏</el-radio>
            <span>该菜单或操作是否显示到系统菜单中</span>
          </el-form-item>

          <el-form-item label="权限标识：">
            <el-input v-model="form.permission_logo"></el-input>
            <span>控制器中定义的权限标识，如：@RequiresPermissions("权限标识")</span>
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
  import TreeGrid from '../../../components/commons/Ztree/TreeGrid.vue'
  // arr2tree引入
  import arr2tree from '../../../../static/utils/arr2tree.js'
  import bus from '@/assets/js/eventBus.js'
  export default {
    data () {
      return {
        value1: '',
        activeName2: 'first',
        title: '',
        filterText: '',
        cityVisible: false,
        titleSecond: '菜单添加',
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
        dataSource: [], // 树表格
        pagination: {pageSizes: [30, 40, 60, 100], pageSize: 30, count: 0, pageNo: 1}
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
        this.addRecord(parentId)
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
//        this.$refs['form'].resetFields()
        this.activeName2 = 'second'
        this.titleSecond = '菜单修改'
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
      addRecord (parentId) {
        this.$refs['form'].resetFields()
        this.activeName2 = 'second'
        this.titleSecond = '菜单添加'
        this.$ajax.get('/activity/enjoy/sort', {params: {id: parentId}})
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
      saveData () {       // 修改确定功能
        this.$refs['form'].validate((valid) => {
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
      }, // 树表格
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
      // 上传之前 清除原有图片
      clearUploadedImgPath () {
        // 如果有就清除
        if (this.form.imgPath) {
          this.$refs.uploadFile.clearFiles()
        }
        this.form.imgPath = ''
      },
      // 移除图片时清空form表单中的图片地址
      removeImgPath () {
        this.form.imgPath = ''
      },
      // 上传组件获取oss相关
      beforeUploadImgPath (file) {
        return new Promise((resolve) => {
          this.$ajax.get('beforeUpload/img', {params: {user_dir: 'tActivitiesInfo'}})
            .then((res) => {
              this.Token = res.data
              this.Token.key = this.Token.dir + '/' + (+new Date()) + '_' + file.name
              resolve()
            })
            .catch(err => {
              this.$message({
                message: err.data.msg,
                type: 'error'
              })
            })
        })
      },
      successImgPath (response, file, fileList) {
        this.form.imgPath = 'http://jjdcjavaweb.oss-cn-shanghai.aliyuncs.com/' + this.Token.key
      }
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

  span {
    color: #888;
  }

</style>
