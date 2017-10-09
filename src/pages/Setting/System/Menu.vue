<template>
  <div class="right">
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <!--菜单列表-->
      <el-tab-pane label="菜单列表" name="first">

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

      <!--菜单添加 -->
      <el-tab-pane label="菜单添加" name="second" class="second">

        <el-form ref="form" :model="form" label-width="150px">

          <el-form-item label="上级菜单:">
            <el-input v-model="form.superior_menu" placeholder="选择上级菜单"></el-input>
          </el-form-item>

          <el-form-item label="名称:">
            <el-input v-model="form.name" placeholder="输入名称"></el-input>
          </el-form-item>

          <el-form-item label="链接:">
            <el-input v-model="form.add_link" placeholder="输入链接"></el-input>
            <span>点击菜单跳转的页面</span>
          </el-form-item>

          <el-form-item label="目标:">
            <el-input v-model="form.target" placeholder="输入目标窗口"></el-input>
            <span>链接地址打开的目标窗口，默认：mainFrame</span>
          </el-form-item>

          <el-form-item label="图标:">
            <el-upload
              class="upload-demo"
              ref="upload"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="form.fileList"
              :auto-upload="false">
              <el-button slot="trigger" size="small" type="primary">选取图片</el-button>
            </el-upload>
          </el-form-item>

          <el-form-item label="排序:">
            <el-input v-model="form.sort"></el-input>
            <span>排列顺序，升序。</span>
          </el-form-item>

          <el-form-item label="可见:">
            <el-radio class="radio" v-model="form.isShow" label="1">显示</el-radio>
            <el-radio class="radio" v-model="form.isShow" label="2">隐藏</el-radio>
            <span>该菜单或操作是否显示到系统菜单中</span>
          </el-form-item>

          <el-form-item label="权限标识:">
            <el-input v-model="form.permission_logo"></el-input>
            <span>控制器中定义的权限标识，如：@RequiresPermissions("权限标识")</span>
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
          superior_menu: '',
          fileList: [],
          name: '',
          add_link: '',
          target: '',
          sort: '5030',
          isShow: '1',
          permission_logo: '',
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
      },
      submitUpload () {
        this.$refs.upload.submit()
      },
      handleRemove (file, fileList) {
        console.log(file, fileList)
      },
      handlePreview (file) {
        console.log(file)
      }
    }
  }
</script>

<style scoped>
  .right {
    margin-left: 260px;
  }

  .second .textarea, .second .el-input, .second .el-input__inner {
    width: 300px;
  }

  span {
    color: #888;
  }

</style>
