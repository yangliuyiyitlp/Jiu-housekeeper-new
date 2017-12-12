<template>
  <div class="detailed">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="点位名称：">
        <el-input v-model="formInline.user" ></el-input>
      </el-form-item>
      <el-form-item label="点位地址：">
        <el-input v-model="formInline.photo" ></el-input>
      </el-form-item>
      <el-form-item label="所属城市：">
        <el-input
          :disabled="true"
          :on-icon-click="searchCompany"
          icon="search"
          v-model="formInline.attributionCompany">
        </el-input>
      </el-form-item>
      <el-form-item label="小区域名称：">
        <el-input v-model="formInline.nub" ></el-input>
      </el-form-item>
      <el-form-item label="点位类型：">
        <el-select v-model="formInline.status">
          <el-option label="普通投放点" value="open"></el-option>
          <el-option label="维修点位" value="closed"></el-option>
          <el-option label="一期投放点" value="closed"></el-option>
          <el-option label="重点投放点" value="closed"></el-option>
          <el-option label="已投放点" value="closed"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否白线：">
        <el-select v-model="formInline.status">
          <el-option label="是" value="open"></el-option>
          <el-option label="否" value="closed"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="添加时间：">
        <el-date-picker
          v-model="formInline.Begin_addTime"
          type="datetime">
        </el-date-picker> -
        <el-date-picker
          v-model="formInline.End_addTime"
          type="datetime">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="更新时间：">
        <el-date-picker
          v-model="formInline.Begin_addTime"
          type="datetime">
        </el-date-picker> -
        <el-date-picker
          v-model="formInline.End_addTime"
          type="datetime">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="管理员：">
        <el-input v-model="formInline.nub" ></el-input>
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
        prop="admin"
        label="点位名称">
      </el-table-column>
      <el-table-column
        prop="adminphone"
        label="点位类型">
      </el-table-column>
      <el-table-column
        prop="number"
        label="预估投放数">
      </el-table-column>
      <el-table-column
        prop="city"
        label="点位地址">
      </el-table-column>
      <el-table-column
        prop="city"
        label="是否白线">
      </el-table-column>
      <el-table-column
        prop="city"
        label="所属城市">
      </el-table-column>
      <el-table-column
        prop="city"
        label="所属小区域">
      </el-table-column>
      <el-table-column
      prop="city"
      label="点位操作员">
    </el-table-column>
      <el-table-column
        prop="date"
        label="添加时间">
      </el-table-column>
      <el-table-column
        prop="date"
        label="更新时间">
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
    <el-dialog title="所属区域" size="tiny" :visible.sync="cityVisible" center>
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
  </div>
</template>
<script>
  import baseUrl from '../../utils/baseUrl.js'
  export default {
    data () {
      return {
        activeName2: 'first',
        value6: '',
        select: '',
        cityVisible: false,
        filterText: '',
        saveUp: false,
        img: true,
        Token: {},
        ruleForm: {
          name: '',
          area: '',
          uodate: '',
          desc: ''
        },
        exportParam: {},
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        },
        formInline: {
          user: '',
          photo: '',
          nub: '',
          pageSize: 10,
          index: 1
        },
        tableData: [{
          admin: '0008',
          adminphone: '12345678999',
          number: '0',
          city: '上海',
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
      handleClick () {},
      handleSizeChange (val) {
        this.formInline.pageSize = val
        this.query()
      },
      handleCurrentChange (val) {
        this.formInline.index = val
        this.query()
      },
      query () {},
      modifyRecord: function (scope) {
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
      deleteRecord: function (id) {
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
      }
    }
  }
</script>
<style scoped>
  .demo-form-inline{
    padding-left:10px;
    margin-top:20px;
  }


</style>
