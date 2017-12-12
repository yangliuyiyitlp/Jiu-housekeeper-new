<template>
  <div class="count">
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <el-tab-pane label="城市黑名单列表" name="first"class="padding">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="姓名：">
            <el-input v-model="formInline.user" ></el-input>
          </el-form-item>
          <el-form-item label="身份证：">
            <el-input v-model="formInline.user" ></el-input>
          </el-form-item>
          <el-form-item label="添加渠道：">
            <el-select v-model="formInline.status">
              <el-option label="管理平台" value="open"></el-option>
              <el-option label="APP后台" value="closed"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态：">
            <el-select v-model="formInline.status">
              <el-option label="待生效" value="open"></el-option>
              <el-option label="生效中" value="closed"></el-option>
              <el-option label="已过期" value="closed"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="生效城市：" >
            <el-col :span="11" >
              <el-input v-model="formInline.electricstart" ></el-input>
            </el-col>
            <el-col class="line" :span="1" style="text-align: center">-</el-col>
            <el-col :span="11">
              <el-input v-model="formInline.electricend"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="生效时间：">
            <el-date-picker
              v-model="value6"
              type="daterange">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="失效时间：">
            <el-date-picker
              v-model="value6"
              type="daterange">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="违法时间：">
            <el-date-picker
              v-model="value6"
              type="daterange">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="违法原因：">
            <el-input v-model="formInline.user" ></el-input>
          </el-form-item>
          <el-button type="primary" @click="query">查询</el-button>
          <el-button type="primary" @click="exportFile">导出</el-button>
        </el-form>
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="adminphone"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="adminphone"
            label="身份证">
          </el-table-column>
          <el-table-column
            prop="city"
            label="生效城市">
          </el-table-column>
          <el-table-column
            prop="city"
            label="生效时间">
          </el-table-column>
          <el-table-column
            prop="city"
            label="失效时间">
          </el-table-column>
          <el-table-column
            prop="city"
            label="违法时间">
          </el-table-column>
          <el-table-column
            prop="date"
            label="违法原因">
          </el-table-column>
          <el-table-column
            prop="date"
            label="添加渠道">
          </el-table-column>
          <el-table-column
            prop="date"
            label="状态">
          </el-table-column>
          <el-table-column
            prop="date"
            label="维修中">
          </el-table-column>
          <el-table-column
            prop="date"
            label="操作者">
          </el-table-column>
          <el-table-column
            prop="date"
            label="操作时间">
          </el-table-column>
          <el-table-column
            prop="date"
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

      </el-tab-pane>
      <el-tab-pane label="城市黑名单添加" name="second">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" ruleForm>
          <el-form-item label="姓名：" prop="num">
            <el-input v-model="ruleForm.name"class="width"></el-input>
          </el-form-item>
          <el-form-item label="身份证：" prop="num">
            <el-input v-model="ruleForm.name"class="width"></el-input>
          </el-form-item>
          <el-form-item label="所属城市：">
            <el-input
              class="width"
              :disabled="true"
              :on-icon-click="searchCompany"
              icon="search"
              v-model="ruleForm.attributionCompany">
            </el-input>
          </el-form-item>
          <el-form-item label="有效时间：">
            <el-date-picker
              class="timeInput"
              v-model="ruleForm.Begin_addTime"
              type="datetime">
            </el-date-picker> -
            <el-date-picker
              class="timeInput"
              v-model="ruleForm.End_addTime"
              type="datetime">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="违法时间：" prop="num">
            <div class="block ">
              <el-date-picker
                class="width"
                v-model="value6"
                type="daterange"
                placeholder="选择日期范围">
              </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="违法原因：" prop="num">
            <el-input v-model="ruleForm.name"class="width"></el-input>
          </el-form-item>
          <el-form-item label="备注：" prop="desc">
            <el-input type="textarea" v-model="ruleForm.desc"class="width"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
          <div class="tip">
          <div>点击《保存》将添加一条记录；点击《导入》将根据execel批量添加；</div>
          <div>点击《下载模板》，根据模板将需要导入的数据填充进去；</div>
          <div>注意：1.execel列的顺序不能改变，2.只需要填充 当事人、身份证号、违法时间、违法原因 四列，其他列可以删除或者不填</div>
          </div>
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
      <el-tab-pane label="黑名单导入" name="three">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" ruleForm>
          <el-form-item label="所属城市：">
            <el-input
              class="width"
              :disabled="true"
              :on-icon-click="searchCompany"
              icon="search"
              v-model="ruleForm.attributionCompany">
            </el-input>
          </el-form-item>
          <el-form-item label="有效时间：">
            <el-date-picker
              class="timeInput"
              v-model="ruleForm.Begin_addTime"
              type="datetime">
            </el-date-picker> -
            <el-date-picker
              class="timeInput"
              v-model="ruleForm.End_addTime"
              type="datetime">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
          <div class="tip">
          <div>每晚12点更新黑名单状态,所以生效时间设置必须在添加日之后；如今天是9月14日，生效时间必须是15日或之后</div>
          <div>点击《下载模板》，根据模板将需要导入的数据填充进去；</div>
          <div>注意：1.execel列的顺序不能改变，2.只需要填充 当事人、身份证号、违法时间、违法原因等四列，其他列可以删除或者不填</div>
          </div>
          <!--todo 导入-->
        </el-form>
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
        value6: '',
        select: '',
        cityVisible: false,
        filterText: '',
        ruleForm: {
          name: '',
          area: '',
          uodate: '',
          desc: ''
        },
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
      this.query('condition')
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
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
      handleClick (tab, event) {
        console.log(tab, event)
      }
    }
  }
</script>
<style scoped>
  .padding{
    padding-left:10px;
  }
.width{
  width:300px;
}
  .timeInput {
    width: 145px !important;
  }
  .tip{
    font-size: 14px;
    margin-left:20px;
  }
</style>
