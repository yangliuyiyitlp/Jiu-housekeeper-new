<template>
  <div>
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <el-tab-pane label="公司信息管理列表" name="first">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="城市：">
            <el-input
              :disabled="true"
              :on-icon-click="searchCompany"
              icon="search"
              v-model="formInline.attributionCompany">
            </el-input>
          </el-form-item>
          <el-form-item label="公司名称：">
            <el-input v-model="formInline.name"></el-input>
          </el-form-item>
          <el-button type="primary" @click="query">查询</el-button>
          <el-button type="primary" @click="exportFile">导出</el-button>
        </el-form>
        <!--隐藏表单用于导出-->
        <form v-show="false" action="" method="post" ref="FileForm">
          <input name="attributionCompany" v-model="exportParam.attributionCompany"/>
          <input name="attributionSection" v-model="exportParam.attributionSection"/>
          <input name="loginName" v-model="exportParam.loginName"/>
          <input name="name" v-model="exportParam.name"/>
          <input name="pageSize" v-model="exportParam.pageSize"/>
          <input name="pageNo" v-model="exportParam.pageNo"/>
        </form>
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="city"
            label="公司名称">
          </el-table-column>
          <el-table-column
            prop="adminphone"
            label="城市编号">
          </el-table-column>
          <el-table-column
            prop="adminphone"
            label="收费标准">
          </el-table-column>
          <el-table-column
            prop="number"
            label="押金">
          </el-table-column>
          <el-table-column
            prop="number"
            label="客服电话">
          </el-table-column>
          <el-table-column
            prop="city"
            label="预约时间">
          </el-table-column>
          <el-table-column
            prop="city"
            label="临时停车时间">
          </el-table-column>
          <el-table-column
            prop="city"
            label="更新日期">
          </el-table-column>
          <el-table-column
            prop="city"
            label="备注">
          </el-table-column>
          <el-table-column
            header-align="center"
            width="100"
            label="操作">
            <template slot-scope="scope">
              <el-button @click="modifyRecord(scope)" type="text" size="small">修改</el-button>
              <el-button @click="deleteRecord(scope.row.id)" type="text" size="small">删除</el-button>
            </template>
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
        <!--模态框-->
        <el-dialog title="选择城市" size="tiny" :visible.sync="cityVisible" center>
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
      <el-tab-pane label="公司信息管理添加" name="second">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
          <el-form-item label="城市编号：">
            <el-input
              class="width"
              :disabled="true"
              :on-icon-click="searchCompany"
              icon="search"
              v-model="formInline.attributionCompany">
            </el-input>
          </el-form-item>
          <el-form-item label="公司名称：" prop="name">
            <el-input v-model="ruleForm.name" class="width"></el-input>
          </el-form-item>
          <el-form-item label="收费标准：" prop="name">
            <el-input v-model="ruleForm.name" class="width"></el-input>
          </el-form-item>
          <el-form-item label="押金：" prop="name">
            <el-input v-model="ruleForm.name" class="width"></el-input>
          </el-form-item>
          <el-form-item label="客服电话：" prop="name">
            <el-input v-model="ruleForm.name" class="width"></el-input>
          </el-form-item>
          <el-form-item label="预约时间：" prop="name">
            <el-input v-model="ruleForm.name" class="width"></el-input>
          </el-form-item>
          <el-form-item label="临时停车时间：" prop="name">
            <el-input v-model="ruleForm.name" class="width"></el-input>
          </el-form-item>
          <el-form-item label="备注：" prop="desc">
            <el-input type="textarea" v-model="ruleForm.desc" class="width"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
        <!--模态框-->
        <el-dialog title="选择城市" size="tiny" :visible.sync="cityVisible" center>
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
</template>

<script>
  import baseUrl from '../../utils/baseUrl.js'

  export default {
    data () {
      return {
        activeName2: 'first',
        select: '',
        cityVisible: false,
        value6: '',
        filterText: '',
        formInline: {
          city: '',
          name: ''
        },
        exportParam: {},
        ruleForm: {
          name: '',
          region: '',
          photo: '',
          num: '',
          cityid: '',
          areaid: '',
          cityname: '',
          type: '',
          desc: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入活动名称', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          region: [
            {required: true, message: '请选择活动区域', trigger: 'change'}
          ]
        },
        tableData: [ {
          admin: '0008',
          adminphone: '12345678999',
          number: '0',
          city: '北京',
          date: '2017-09-12 10:28:35'
        }],
        select_city: [{
          id: 1,
          label: '上海市总公司',
          children: [{
            id: 2,
            label: '厦门分公司'
          }, {
            id: 3,
            label: '佛山分公司'
          }, {
            id: 4,
            label: '珠海分公司'
          }, {
            id: 5,
            label: '北京分公司'
          }, {
            id: 6,
            label: '上海分公司'
          }, {
            id: 7,
            label: '成都分公司'
          }, {
            id: 8,
            label: '湖州分公司'
          }, {
            id: 9,
            label: '深圳分公司'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        pagination: {pageSizes: [30, 40, 60, 100], pageSize: 30, count: 0, pageNo: 1}
      }
    },
    created: function () {
      this.query()
    },
    watch: {
      filterText (val) {
        this.$refs.tree2.filter(val)
      }
    },
    methods: {
      filterNode (value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
      handleNodeClick (data) {
        this.formInline.attributionCompany = data.label
      },
      handleNode (data) {
        this.filterText = data.label // 弹框树模型点击输入值
      },
      searchCompany () {
        this.cityVisible = true
        this.select = this.select_city
        this.filterText = ''
      },
      doModify () {
        this.formInline.attributionCompany = this.filterText
        this.cityVisible = false
      },
      modifyCancel () {
        this.cityVisible = false
        this.formInline.attributionCompany = ''
      },
      modifyOrder (val) {
        this.modifyRank = val
        var obj = this.modifyOrders.find(item => item.id === this.focusId)
        if (val !== undefined && val.trim() !== '') {
          if (this.focusRank === val) {  // 修改的值是原始的值
            // 判断该记录的id 是否已经存在
            if (obj !== undefined) {
              this.modifyOrders.pop(obj)
            }
          } else {
            if (obj !== undefined) {
              obj.rank = val
            } else {
              this.modifyOrders.push({'id': this.focusId, 'rank': val})
            }
          }
        } else {
          if (obj !== undefined) {
            this.modifyOrders.pop(obj)
          }
        }
      },
      doModifyOrder () {
//        this.vm.$ajax(
//          {
//            method: 'post',
//            url: 'http://172.16.20.235:10001/a/electric/inmobidisplay/tDisplayType/interface/updateSort',
//            data: this.tableData,
//            headers: {
//              'Content-Type': 'multipart/form-data'
//            }
//          }
//        ).then(function (res) {
//          this.$message({
//            message: res.data,
//            type: 'success'
//          })
//          console.log(res.data)
//        }).catch(function (error) {
//          console.log(error)
//        })
        if (this.modifyOrders === [] || this.modifyOrders === undefined) {
          return
        }
        // post 到后台
        let ids = []
        let sorts = []
        let newids = []
        let newsorts = []
        this.modifyOrders.forEach(function (value, index) {
          ids.push(value.id)
          sorts.push(value.rank)
          newids = ids.join(',')
          newsorts = sorts.join(',')
        })
        this.$ajax.get('/activity/enjoy/updateSort', {
          params: {
            'ids': newids,
            'sorts': newsorts
          }
        })
          .then(function (res) {
            this.$message({
              message: res.data.msg,
              type: 'success'
            })
            this.query()
          }.bind(this))
          .catch(function (err) {
            this.$message({
              message: err.data.msg,
              type: 'error'
            })
          })
      },
      handleClick () {},
      handleSizeChange (val) {
        this.formInline.pageSize = val
        this.query()
      },
      handleCurrentChange (val) {
        this.formInline.index = val
        this.query()
      },
      handleIconClick (ev) {
        console.log(ev)
      },
      query () {},
      modifyRecord (scope) {
        this.vif = false
        this.dialogFormVisible = true
        // 获取当前行的详细信息
        this.$ajax.get('/activity/inmobi/tDisplayType/form', {params: {id: scope.row.id}})
          .then((res) => {
            if (res.status === 200) {
              this.form.id = res.data.tDisplayType.id
              this.form.cityName = res.data.tDisplayType.cityName
              this.form.rank = res.data.tDisplayType.rank
              this.form.type = res.data.tDisplayType.type
              this.form.displayType = res.data.tDisplayType.displayType
              this.form.androidInmobiId = res.data.tDisplayType.androidInmobiId
              this.form.iosInmobiId = res.data.tDisplayType.iosInmobiId
              this.form.remarks = res.data.tDisplayType.remarks
            }
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '获取详细信息异常'
            })
          })
      },
      deleteRecord  (id) {
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (id !== undefined) {
            // 调用后台服务
            // 删除当前信息
            this.$ajax.get('/activity/inmobi/tDisplayType/delete', {params: {'id': id}})
              .then((response) => {
                console.log(response)
                if (response.data.code === 0) {
                  // 删除成功
                  this.$message({
                    type: 'success',
                    message: response.data.msg
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
                  type: 'info',
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
      exportFile () {
        this.exportFormVisible = true
      },
      cancelExport () {
        this.exportFormVisible = false
      },
      exportCurrent () {
        this.exportParam.pageNo = this.pagination.pageNo
        this.exportParam.pageSize = this.pagination.pageSize
        this.$refs['FileForm'].setAttribute('action', `${baseUrl}/activity/enjoy/export`)
        this.$refs['FileForm'].submit()
        this.exportFormVisible = false
      },
      exportAll () {
        this.exportParam.pageSize = ''
        this.exportParam.pageNo = ''
        this.$refs['FileForm'].setAttribute('action', `${baseUrl}/activity/enjoy/exportAll`)
        this.$refs['FileForm'].submit()
        this.exportFormVisible = false
      },
      resetForm (ruleForm) {
        this.ruleForm = {}
      },
      submitForm () {}
    }
  }
</script>

<style>
  /*没有加scoped，是因为需要需要表单el-form-item__label和el-form-item__content的样式*/
  html, body {
    height: 100%;
  }
  .width {
    width: 300px;
  }
  .demo-form-inline {
    padding-left: 10px;
  }
  /* 树模型模态框样式*/
  .keySearch {
    width: 140px;
    height: 20px;
    outline-style: none;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  .ruleForm > .el-form-item > .el-form-item__label {
    width: 150px !important;
  }

  .ruleForm > .el-form-item > .el-form-item__content {
    margin-left: 150px !important;
  }
</style>
