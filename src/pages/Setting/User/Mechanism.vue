<template>
  <div class="right">
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <!--机构列表-->
      <el-tab-pane label="机构列表" name="first"style="padding-left:10px;">

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

      <!--机构添加 -->
      <el-tab-pane label="机构添加" name="second" class="second">

        <el-form ref="form" :model="form" label-width="150px">

          <el-form-item label="上级机构:">
            <el-input v-model="form.superior_mechanism" placeholder="选择上级机构"></el-input>
          </el-form-item>

          <el-form-item label="归属区域:">
            <el-input v-model="form.attribution_area" placeholder="选择归属区域"></el-input>
          </el-form-item>

          <el-form-item label="机构名称:">
            <el-input v-model="form.mechanism_name" placeholder="输入机构名称"></el-input>
          </el-form-item>

          <el-form-item label="机构编码">
            <el-input v-model="form.mechanism_number" placeholder="输入机构编码"></el-input>
          </el-form-item>

          <el-form-item label="机构类型">
            <el-select v-model="form.mechanism_type" clearable>
              <el-option label="公司" value="1"></el-option>
              <el-option label="部门" value="2"></el-option>
              <el-option label="小组" value="3"></el-option>
              <el-option label="其他" value="4"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="机构级别">
            <el-select v-model="form.mechanism_level" clearable>
              <el-option label="一级" value="1"></el-option>
              <el-option label="二级" value="2"></el-option>
              <el-option label="三级" value="3"></el-option>
              <el-option label="四级" value="4"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="是否可用:">
            <el-select v-model="form.isUse" clearable>
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="2"></el-option>
            </el-select>
            <p>*“是”代表此账号允许登陆，“否”则表示此账号不允许登陆</p>
          </el-form-item>

          <el-form-item label="主负责人:">
            <el-input v-model="form.main_responsible" placeholder="选择主负责人"></el-input>
          </el-form-item>

          <el-form-item label="副负责人:">
            <el-input v-model="form.vice_responsible" placeholder="选择副负责人"></el-input>
          </el-form-item>

          <el-form-item label="联系地址:">
            <el-input v-model="form.contact_address" placeholder="输入联系地址"></el-input>
          </el-form-item>

          <el-form-item label="邮政编码:">
            <el-input v-model="form.zip_code" placeholder="输入邮政编码"></el-input>
          </el-form-item>

          <el-form-item label="负责人:">
            <el-input v-model="form.responsible" placeholder="输入负责人"></el-input>
          </el-form-item>

          <el-form-item label="电话:">
            <el-input v-model="form.phone" placeholder="输入电话"></el-input>
          </el-form-item>

          <el-form-item label="传真:">
            <el-input v-model="form.fax" placeholder="输入传真"></el-input>
          </el-form-item>

          <el-form-item label="邮箱:">
            <el-input v-model="form.email" placeholder="输入邮箱"></el-input>
          </el-form-item>

          <el-form-item label="备注:">
            <el-input v-model="form.remark" type="textarea" class='textarea'></el-input>
          </el-form-item>

          <el-form-item label="快速添加下级部门:">
            <el-checkbox-group v-model="form.lower_department">
              <el-checkbox label="综合部"></el-checkbox>
              <el-checkbox label="开发部"></el-checkbox>
              <el-checkbox label="人力部"></el-checkbox>
            </el-checkbox-group>
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
