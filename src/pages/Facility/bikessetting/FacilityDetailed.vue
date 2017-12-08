<template>
  <div class="count">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="管理员：">
        <el-input v-model="formInline.user"></el-input>
      </el-form-item>
      <el-form-item label="管理员手机：">
        <el-input v-model="formInline.photo"></el-input>
      </el-form-item>
      <el-form-item label="车辆编号：">
        <el-input v-model="formInline.sum"></el-input>
      </el-form-item>
      <el-form-item label="所属城市：">
        <el-input
          :disabled="true"
          :on-icon-click="searchSection"
          icon="search"
          v-model="formInline.attributionSection">
        </el-input>
      </el-form-item>

      <el-form-item label="添加时间">
        <el-date-picker
          v-model="formInline.beginAddTime"
          type="datetime"
          placeholder="开始时间">
        </el-date-picker>
        <el-date-picker
          v-model="formInline.endAddTime"
          type="datetime"
          placeholder="结束时间">
        </el-date-picker>
      </el-form-item>
      <el-button type="primary" @click="query">查询</el-button>
      <el-button type="primary" @click="exportFile">导出</el-button>
    </el-form>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="id">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="admin"
        label="管理人员">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="phone"
        label="管理人员手机">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="sum"
        label="车辆编号">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="city"
        label="所属城市">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="date"
        label="添加时间">
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
    <!--导出弹框-->
    <el-dialog title="导出" custom-class="dialogClass" size="tiny" :visible.sync="exportFormVisible" :show-close="false"
               :close-on-press-escape="false"
               :close-on-click-modal="false" class="demo-ruleForm ">
      <el-button @click="exportCurrent">导出当前页</el-button>
      <el-button @click="exportAll">导出所有</el-button>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelExport">取 消</el-button>
      </div>
    </el-dialog>
    <!--树模型模态框-->
    <el-dialog title='选择区域' size="tiny" :visible.sync="cityVisible" center>
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
  import baseUrl from '../../../utils/baseUrl'
  export default {
    created: function () {
      this.query()
    },
    data () {
      return {
        value6: '',
        exportFormVisible: false,
        select: '',
        filterText: '',
        cityVisible: false,
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        formInline: {
          user: '',
          photo: '',
          sum: '',
          beginAddTime: '',
          endAddTime: ''
        },
        exportParam: {
          user: '',
          photo: '',
          sum: '',
          beginAddTime: '',
          endAddTime: '',
          pageSize: 30,
          index: 1
        },
        tableData: [{
          admin: '0008',
          photo: '12345678999',
          date: '01',
          sum: '0'
        }, {
          admin: '0008',
          photo: '123456666678',
          date: '01',
          sum: '0'
        }],
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
        pagination: {pageSizes: [30, 40, 60, 100], pageSize: 30, total: 0, index: 1}
      }
    },
    methods: {
      query () {
        this.exportParam.user = this.formInline.user
        this.exportParam.photo = this.formInline.photo
        this.exportParam.sum = this.formInline.sum
        this.exportParam.beginAddTime = this.formInline.beginAddTime
        this.exportParam.endAddTime = this.formInline.endAddTime
        this.exportParam.pageNo = this.formInline.pageNo
        this.exportParam.pageSize = this.formInline.pageSize
        this.$ajax.get('/facility/register', {params: this.requestParam})
          .then(response => {
            if (response.data.code === 0) {
              this.tableData = response.data.page.list
              this.pagination.count = response.data.page.count
            } else {
              this.$message({
                type: 'error',
                message: '获取列表信息失败'
              })
            }
          }).catch(() => {
            this.$message({
              type: 'error',
              message: '获取列表信息失败'
            })
          })
      },
      handleSizeChange: function (val) {
        this.formInline.pageSize = val
        this.query()
      },
      handleCurrentChange: function (val) {
        this.formInline.index = val
        this.query()
      },
      exportFile () {
        this.exportFormVisible = true
      },
      cancelExport () {
        this.exportFormVisible = false
      },
      exportCurrent () {
        var r = confirm('确定导出么')
        if (r === true) {
          this.exportParam.pageNo = this.pagination.pageNo
          this.exportParam.pageSize = this.pagination.pageSize
          this.$refs['FileForm'].setAttribute('action', `${baseUrl}/facility/register/export`)
          this.$refs['FileForm'].submit()
          this.exportFormVisible = false
        } else {
          return
        }
      },
      exportAll () {
        var r = confirm('确定导出么')
        if (r === true) {
          this.$refs['FileForm'].setAttribute('action', `${baseUrl}/facility/register/exportAll`)
          this.exportParam.pageSize = ''
          this.exportParam.pageNo = ''
          this.$refs['FileForm'].submit()
          this.exportFormVisible = false
        } else {
          return
        }
      },
      searchSection () {
        this.cityVisible = true
        this.select = this.select_section
        this.filterText = ''
      },
      filterNode (value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
      handleNode (data) {
        this.filterText = data.label // 弹框树模型点击输入值
      },
      doModify () {
        this.formInline.attributionSection = this.filterText
        this.cityVisible = false
      },
      modifyCancel () {
        this.cityVisible = false
        this.formInline.attributionSection = ''
      }
    }
  }
</script>
<style scoped>
  .demo-form-inline {
    padding-left: 10px;
  }

  .searchTree {
    margin-top: 20px;
  }
  .keySearch {
    width: 140px;
    height: 20px;
    outline-style: none;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
</style>
