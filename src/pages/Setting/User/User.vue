<template>
  <div class="right" ref="right">
    <el-row>
      <el-col :span="3" class="search_bar" ref="search_bar">
        <div class="grid-content bg-purple">
          <el-tree
            :data="select_city"
            :props="defaultProps"
            @node-click="handleNodeClick"
            default-expand-all>
          </el-tree>
        </div>
      </el-col>

      <el-col :span="21">
        <div class="grid-content bg-purple-light">
          <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
            <!--用户列表-->
            <el-tab-pane label="用户列表" name="first" style="padding-left:10px;">

              <!--筛选条件-->
              <el-form :inline="true" :model="formInline" class="demo-form-inline">

                <el-form-item label="归属公司:">
                  <el-input v-model="formInline.attribution_company" placeholder="选择归属公司">
                  </el-input>
                </el-form-item>

                <el-form-item label="登录名:">
                  <el-input v-model="formInline.login_name" placeholder="输入登录名">
                  </el-input>
                </el-form-item>

                <el-form-item label="归属部门:">
                  <el-input v-model="formInline.attribution_department" placeholder="选择归属部门">
                  </el-input>
                </el-form-item>

                <el-form-item label="姓名:">
                  <el-input v-model="formInline.name" placeholder="输入姓名">
                  </el-input>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" @click="search">查询</el-button>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" @click="exportData">导出</el-button>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" @click="importData">导入</el-button>
                </el-form-item>

              </el-form>

              <!--表格-->
              <el-table
                :data="tableData"
                style="width: 100%"
                border
                stripe>
                <el-table-column
                  header-align="center"
                  align="center"
                  prop="attribution_company"
                  label="归属公司"
                  width="260">
                </el-table-column>

                <el-table-column
                  header-align="center"
                  align="center"
                  prop="attribution_department"
                  label="归属部门"
                  width="260">
                </el-table-column>

                <el-table-column
                  header-align="center"
                  align="center"
                  prop="login_name"
                  label="登录名"
                  width="260">
                </el-table-column>

                <el-table-column
                  header-align="center"
                  align="center"
                  prop="name"
                  label="姓名"
                  width="180">
                </el-table-column>

                <el-table-column
                  header-align="center"
                  align="center"
                  prop="phone"
                  label="电话"
                  width="300">
                </el-table-column>

                <el-table-column
                  header-align="center"
                  align="center"
                  prop="mobile_phone"
                  label="手机"
                  width="300">
                </el-table-column>

                <el-table-column
                  fixed="right"
                  header-align="center"
                  align="center"
                  label="操作"
                  width="160">
                  <template scope="scope">
                    <el-button type="text" size="small">修改</el-button>
                    <el-button
                      @click="open2(scope.$index, tableData4)"
                      type="text"
                      size="small">
                      移除
                    </el-button>
                  </template>
                </el-table-column>

              </el-table>

              <!--分页-->
              <paginations></paginations>

            </el-tab-pane>

            <!--用户添加 -->
            <el-tab-pane label="用户添加" name="second" class="second">

              <el-form ref="form" :model="form" label-width="150px">

                <el-form-item label="头像:">
                  <el-button>选择</el-button>
                  <el-button>清除</el-button>
                </el-form-item>

                <el-form-item label="归属公司:">
                  <el-input v-model="form.attribution_company" placeholder="选择归属公司"></el-input>
                </el-form-item>

                <el-form-item label="归属部门:">
                  <el-input v-model="form.attribution_department" placeholder="选择归属部门"></el-input>
                </el-form-item>

                <el-form-item label="工号:">
                  <el-input v-model="form.job_number" placeholder="输入工号"></el-input>
                </el-form-item>

                <el-form-item label="姓名:">
                  <el-input v-model="form.name" placeholder="输入姓名"></el-input>
                </el-form-item>

                <el-form-item label="登录名:">
                  <el-input v-model="form.login_name" placeholder="输入登录名"></el-input>
                </el-form-item>

                <el-form-item label="密码:">
                  <el-input placeholder="输入密码"></el-input>
                </el-form-item>

                <el-form-item label="确认密码:">
                  <el-input v-model="form.password" placeholder="再次输入密码"></el-input>
                </el-form-item>

                <el-form-item label="邮箱:">
                  <el-input v-model="form.email" placeholder="输入邮箱"></el-input>
                </el-form-item>

                <el-form-item label="电话:">
                  <el-input v-model="form.phone" placeholder="输入电话"></el-input>
                </el-form-item>

                <el-form-item label="手机:">
                  <el-input v-model="form.mobile_phone" placeholder="输入手机"></el-input>
                </el-form-item>

                <el-form-item label="是否允许登录:">
                  <el-select v-model="form.isLogin" clearable>
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="2"></el-option>
                  </el-select>
                  <p>* “是”代表此账号允许登录，“否”则表示此账号不允许登录</p>
                </el-form-item>

                <el-form-item label="用户类型:">
                  <el-select v-model="form.user_type" placeholder="选择用户类型" clearable>
                    <el-option label="系统管理" value="1"></el-option>
                    <el-option label="部门管理" value="2"></el-option>
                    <el-option label="普通用户" value="3"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="用户角色:">
                  <el-checkbox-group v-model="form.user_role">
                    <el-checkbox label="本公司管理员"></el-checkbox>
                    <el-checkbox label="本部门管理员"></el-checkbox>
                    <el-checkbox label="部门管理员"></el-checkbox>
                    <el-checkbox label="公司管理员"></el-checkbox>
                    <el-checkbox label="区域管理"></el-checkbox>
                    <el-checkbox label="城市运营部"></el-checkbox>
                    <el-checkbox label="客服部"></el-checkbox>
                    <el-checkbox label="客服部红包管理员"></el-checkbox>
                    <el-checkbox label="普通用户"></el-checkbox>
                    <el-checkbox label="生产车间"></el-checkbox>
                    <el-checkbox label="系统管理员"></el-checkbox>
                    <el-checkbox label="行政区政府"></el-checkbox>
                    <el-checkbox label="观察员"></el-checkbox>
                  </el-checkbox-group>
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


          <!--模态框-->
        </div>
      </el-col>
    </el-row>


  </div>
</template>

<script>

  export default {
    data () {
      return {
        select_city: [{
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
        },
        value1: '',
        activeName2: 'first',
        formInline: {
          attribution_company: '',
          login_name: '',
          attribution_department: '',
          name: ''
        },
        form: {
          attribution_company: '',
          attribution_department: '',
          job_number: '',
          name: '',
          login_name: '',
          password: '',
          email: '',
          mobile_phone: '',
          phone: '',
          isLogin: '1',
          user_type: [],
          user_role: [],
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
    mounted () {
      this.$refs.search_bar.$el.style.height = (document.documentElement.clientHeight - 100) + 'px'
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
      handleNodeClick (data) {
        console.log(data)
      }
    },
    watch: {}
  }
</script>

<style scoped>
  .right {
    /*height: 100%;*/
    margin-left: 250px;
    overflow: hidden;
  }

  .search_bar {
    border: 1px solid #ccc;
    /*height: 800px;*/
    overflow: auto;
  }

  .second .textarea, .second .el-input, .second .el-input__inner {
    width: 300px;
  }

  p {
    color: red;
  }

  .el-tabs__content {
    padding-left: 10px;
  }
</style>
