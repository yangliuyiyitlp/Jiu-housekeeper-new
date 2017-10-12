<template>
  <div class="right">
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <!--区域列表-->
      <el-tab-pane label="区域列表" name="first"style="padding-left:10px;">

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
        <!--<template scope="scope">-->
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

        zTree插件

        <!--分页-->
        <paginations></paginations>

      </el-tab-pane>

      <!--区域添加 -->
      <el-tab-pane label="区域添加" name="second" class="second">

        <el-form ref="form" :model="form" label-width="150px">

          <el-form-item label="上级区域:">
            <el-input v-model="form.superior_area" placeholder="选择上级区域"></el-input>
          </el-form-item>

          <el-form-item label="区域名称:">
            <el-input v-model="form.area_name" placeholder="输入区域名称"></el-input>
          </el-form-item>

          <el-form-item label="区域编码">
            <el-input v-model="form.area_number" placeholder="输入机构编码"></el-input>
          </el-form-item>

          <el-form-item label="区域推送码">
            <el-input v-model="form.push_number" placeholder="输入机构编码"></el-input>
          </el-form-item>

          <el-form-item label="区域类型">
            <el-select v-model="form.area_type" clearable>
              <el-option label="国家" value="1"></el-option>
              <el-option label="省份、直辖市" value="2"></el-option>
              <el-option label="地市" value="3"></el-option>
              <el-option label="区县" value="4"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="备注:">
            <el-input v-model="form.remark" type="textarea" class='textarea'></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="saveData">保存</el-button>
            <el-button>返回</el-button>
          </el-form-item>
        </el-form>

      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        value1: '',
        activeName2: 'first',
        formInline: {
          attribution_company: '',
          login_name: '',
          attribution_department: '',
          name: ''
        },
        form: {
          superior_area: '',
          area_name: '',
          area_number: '',
          push_number: '',
          area_type: '4',
          remark: ''
        },
        tableData: [{
          attribution_company: '上海市长宁区虹桥路',
          attribution_department: '上海市长宁区虹桥路',
          login_name: '大剿匪啊啊啊',
          name: '大剿匪啊',
          phone: '02118745852358',
          mobile_phone: '18745852358'
        }, {
          attribution_company: '上海市长宁区虹桥路',
          attribution_department: '上海市长宁区虹桥路',
          login_name: '大剿匪啊啊啊',
          name: '大剿匪啊',
          phone: '02118745852358',
          mobile_phone: '18745852358'
        }, {
          attribution_company: '上海市长宁区虹桥路',
          attribution_department: '上海市长宁区虹桥路',
          login_name: '大剿匪啊啊啊',
          name: '大剿匪啊',
          phone: '02118745852358',
          mobile_phone: '18745852358'
        }, {
          attribution_company: '上海市长宁区虹桥路',
          attribution_department: '上海市长宁区虹桥路',
          login_name: '大剿匪啊啊啊',
          name: '大剿匪啊',
          phone: '02118745852358',
          mobile_phone: '18745852358'
        }]
      }
    },
    methods: {
      handleClick (tab, event) {
        console.log(tab, event)
      },
      search () {
        console.log('search!')
      },
      exportData () {
        console.log('exportData!')
      },
      importData () {
        console.log('importData!')
      },
      deleteRow (index, rows) {
        rows.splice(index, 1)
      },
      open2 (index, rows) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteRow(index, rows)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      saveData () {
        console.log('saveData!')
      }
    }
  }
</script>

<style scoped>
  .right {
  
  }

  .second .textarea, .second .el-input, .second .el-input__inner {
    width: 300px;
  }

  p {
    color: red;
  }
</style>
