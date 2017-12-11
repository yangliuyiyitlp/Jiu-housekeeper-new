<template>
  <div class="info">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="姓名：">
        <el-input v-model="formInline.user" ></el-input>
      </el-form-item>
      <el-form-item label="昵称：">
        <el-input v-model="formInline.user" ></el-input>
      </el-form-item>
      <el-form-item label="手机：">
        <el-input v-model="formInline.user" ></el-input>
      </el-form-item>
      <el-form-item label="审核类型：">
        <el-select v-model="formInline.region">
          <el-option label="认证审核通过" value="nomal"></el-option>
          <el-option label="认证审核未通过" value="useing"></el-option>
        </el-select>
      </el-form-item>
      <!--数模型-->
      <el-form-item label="创建者：">
        <el-input
          :disabled="true"
          :on-icon-click="searchSection"
          icon="search"
          v-model="formInline.attributionSection">
        </el-input>
      </el-form-item>

      <el-form-item label="添加时间:">
        <el-date-picker
          v-model="formInline.beginAddTime"
          type="datetime">
        </el-date-picker>
        <el-date-picker
          v-model="formInline.endAddTime"
          type="datetime">
        </el-date-picker>
      </el-form-item>

      <el-button type="primary" @click="query">查询</el-button>
    </el-form>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="number"
        label="会员姓名">
      </el-table-column>
      <el-table-column
        prop="status"
        label="会员昵称">
      </el-table-column>
      <el-table-column
        prop="code"
        label="会员手机">
      </el-table-column>
      <el-table-column
        prop="pressure"
        label="审核类型">
      </el-table-column>
      <el-table-column
        prop="state"
        label="操作原因">
      </el-table-column>
      <el-table-column
        prop="person"
        label="操作者">
      </el-table-column>
      <el-table-column
        prop="date"
        label="操作时间">
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagination.pageNo"
      :page-sizes="pagination.pageSizes"
      :page-size="pagination.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.count">
    </el-pagination>
    <!--模态框-->
    <el-dialog title='创建者' size="tiny" :visible.sync="cityVisible" center>
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
  export default {
    data () {
      return {
        value6: '',
        select: '',
        dialogVisible: false,
        cityVisible: false,
        filterText: '',
        formInline: {
          user: '',
          region: '',
          pressure: '',
          status: '',
          edition: '',
          versions: '',
          search: '',
          key: '',
          pageSize: 10,
          index: 1
        },
        tableData: [{
          number: '0008',
          status: '正常',
          code: '01',
          pressure: '0',
          state: '锁开',
          edition: '0',
          version: '0',
          line: 'ddd',
          addtime: '2017-09-09 19:00:38',
          person: '李四',
          date: '2016-05-02',
          remark: 'aaa'
        }],
        pagination: {pageSizes: [30, 40, 60, 100], pageSize: 30, count: 0, pageNo: 1},
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
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    created () {
      this.query()
    },
    watch: {
      filterText (val) {
        this.$refs.tree2.filter(val)
      }
    },
    methods: {
      handleClose (done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {})
      },
      handleSizeChange: function (val) {
        this.formInline.pageSize = val
        this.onSubmit('condition')
      },
      handleCurrentChange: function (val) {
        this.formInline.index = val
        this.onSubmit('condition')
      },
      handleIconClick (ev) {
        console.log(ev)
      },
      query: function () {},
      filterNode (value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
      handleNode (data) {
        this.filterText = data.label // 弹框树模型点击输入值
      },
      handleNodeClick (data) {
        this.formInline.attributionSection = data.label
      },
      doModify () {
        this.formInline.attributionSection = this.filterText
        this.cityVisible = false
      },
      modifyCancel () {
        this.cityVisible = false
        this.formInline.attributionSection = ''
      },
      searchSection () {
        this.cityVisible = true
        this.select = this.select_section
        this.filterText = ''
      }
    }
  }
</script>
<style scoped>
  @import'../../assets/css/common.css';
  .demo-form-inline{
    padding-left:10px;
  }
  /*.keySearch {*/
    /*width: 140px;*/
    /*height: 20px;*/
    /*outline-style: none;*/
    /*border: 1px solid #ccc;*/
    /*border-radius: 5px;*/
  /*}*/
</style>

