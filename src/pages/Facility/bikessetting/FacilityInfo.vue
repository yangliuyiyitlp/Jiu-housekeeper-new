<template>
  <div class="info">
    <el-form :inline="true" :model="requestParam" class="demo-form-inline">
      <el-form-item label="车辆编号：">
        <el-input v-model="requestParam.user"></el-input>
      </el-form-item>
      <el-form-item label="车辆状态：">
        <el-select v-model="requestParam.region">
          <el-option label="正常" value="nomal"></el-option>
          <el-option label="使用中" value="useing"></el-option>
          <el-option label="离线" value="offline"></el-option>
          <el-option label="报废" value="scrap"></el-option>
          <el-option label="故障" value="breakdown"></el-option>
          <el-option label="电量低" value="powerlow"></el-option>
          <el-option label="僵尸车" value="zombie"></el-option>
          <el-option label="不可充电" value="notcharge"></el-option>
          <el-option label="维修中" value="repair"></el-option>
          <el-option label="未绑定" value="nobound"></el-option>
          <el-option label="电子围栏外" value="outline"></el-option>
        </el-select>
      </el-form-item>
      <!--<el-form-item label="城市代码：">-->
      <!--&lt;!&ndash;数模型&ndash;&gt;-->
      <!--<el-input-->
      <!--icon="search"-->
      <!--v-model="requestParam.search"-->
      <!--:on-icon-click="handleIconClick" @click="dialogVisible = true">-->
      <!--</el-input>-->
      <!--</el-form-item>-->
      <el-form-item label="城市代码：">
        <el-input
          :disabled="true"
          :on-icon-click="searchSection"
          icon="search"
          v-model="requestParam.attributionSection">
        </el-input>
      </el-form-item>
      <el-form-item label="车锁电压：">
        <el-input v-model="requestParam.pressure" placeholder="电压小于XXX"></el-input>
      </el-form-item>
      <el-form-item label="车锁状态：">
        <el-select v-model="requestParam.status">
          <el-option label="锁开" value="open"></el-option>
          <el-option label="锁关" value="closed"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="硬件版本：">
        <el-input v-model="requestParam.edition"></el-input>
      </el-form-item>
      <el-form-item label="软件版本：">
        <el-input v-model="requestParam.versions"></el-input>
      </el-form-item>
      <el-button type="primary" @click="query">查询</el-button>
      <el-button type="primary" @click="exportFile">导出</el-button>
    </el-form>
    <el-table
      :data="tableData"
      border
      stripe
      style="width: 100%">
      <el-table-column
        header-align="center"
        align="center"
        prop="number"
        label="车辆编号">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="status"
        label="车辆状态">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="code"
        label="城市代码">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="pressure"
        label="车锁电压">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="state"
        label="车锁状态">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="edition"
        label="车锁硬件版本">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="version"
        label="车锁软件版本">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="line"
        label="最近连接">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="addtime"
        label="添加时间">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="person"
        label="操作者">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="date"
        label="操作时间">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="remark"
        label="备注">
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

  </div>
</template>
<script>
  import baseUrl from '../../../utils/baseUrl'

  export default {
    created: function () {
      this.query()
    },
    data: function () {
      return {
        dialogVisible: false,
        exportFormVisible: false,
        select: '',
        filterText: '',
        cityVisible: false,
        tableData: [],
        formInline: {},
        requestParam: {
          beginAddTime: '',
          endAddTime: '',
          factoryName: '',
          lockFactoryNo: '',
          pageSize: 30,
          pageNo: 1
        },
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        rules: {
          factoryName: [
            {required: true, message: '请输入厂家名称', trigger: 'blur'}
          ],
          lockFactoryNo: [
            {required: true, message: '请输入锁厂家编号', trigger: 'blur'}
          ]
        },
        pagination: {pageSizes: [30, 40, 60, 100], pageSize: 30, count: 0, pageNo: 1},
        exportParam: {
          beginAddTime: '',
          endAddTime: '',
          factoryName: '',
          lockFactoryNo: '',
          pageSize: '',
          pageNo: ''
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
        }]
      }
    },
    methods: {
      query () {
        this.exportParam.factoryName = this.requestParam.factoryName
        this.exportParam.lockFactoryNo = this.requestParam.lockFactoryNo
        this.exportParam.beginAddTime = this.requestParam.beginAddTime
        this.exportParam.endAddTime = this.requestParam.endAddTime
        this.exportParam.pageNo = this.requestParam.pageNo
        this.exportParam.pageSize = this.requestParam.pageSize
        this.$ajax.get('/facility/info', {params: this.requestParam})
          .then(response => {
            if (response.data.code === 0) {
              this.tableData = response.data.page.list
              this.pagination.count = response.data.page.count
            } else {
              this.$message({
                type: 'error',
                message: '获取列表信息异常'
              })
            }
          }).catch(() => {
            this.$message({
              type: 'error',
              message: '获取列表信息失败'
            })
          })
      },
      handleSizeChange (val) {
        this.requestParam.pageSize = val
        this.pagination.pageSize = val
        this.query()
      },
      handleCurrentChange (val) {
        this.requestParam.pageNo = val
        this.pagination.pageNo = val
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

