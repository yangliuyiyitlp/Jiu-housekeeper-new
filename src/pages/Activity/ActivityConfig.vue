<template>
  <div class="right">
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <!--APP展示页配置列表-->
      <el-tab-pane label="APP展示页配置列表" name="first"style="padding-left:10px;">

        <!--筛选条件-->
        <el-form :inline="true" :model="formInline" class="demo-form-inline">

          <el-form-item label="展示类型:">
            <el-select v-model="formInline.show_type" placeholder="选择展示类型" clearable>
              <el-option label="结束行程分享" value="1"></el-option>
              <el-option label="开锁图片" value="2"></el-option>
              <el-option label="骑行中展示" value="3"></el-option>
              <el-option label="活动导航栏" value="3"></el-option>
              <el-option label="二级弹框" value="3"></el-option>
              <el-option label="启动页" value="3"></el-option>
              <el-option label="地图中心图标" value="3"></el-option>
              <el-option label="扫码按钮北京" value="3"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="城市配置:">
            <el-select v-model="formInline.city_config" placeholder="选择城市配置" clearable>
              <el-option label="默认活动" value="1"></el-option>
              <el-option label="城市活动" value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="城市名称:">
            <el-input v-model="formInline.city_name" placeholder="城市名称">
            </el-input>
          </el-form-item>

          <el-form-item label="跳转标志:">
            <el-select v-model="formInline.skip_mark" placeholder="选择跳转标志" clearable>
              <el-option label="不跳转" value="1"></el-option>
              <el-option label="赳赳乐享" value="2"></el-option>
              <el-option label="指定URL" value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="跳转活动:">
            <el-input v-model="formInline.skip_activity" placeholder="城市名称">
            </el-input>
          </el-form-item>

          <el-form-item label="生效时间:">
            <date-pickers></date-pickers>
          </el-form-item>

          <el-form-item label="失效时间:">
            <date-pickers></date-pickers>
          </el-form-item>

          <el-form-item label="添加时间:">
            <date-pickers></date-pickers>
          </el-form-item>

          <el-form-item label="更新时间:">
            <date-pickers></date-pickers>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="exportData">导出</el-button>
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
            prop="id"
            label="id"
            width="80">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="show_type"
            label="展示类型"
            width="130">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="city_config"
            label="城市配置"
            width="100">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="city_name"
            label="城市名称"
            width="100">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="mgs_dec"
            label="消息描述"
            width="260">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="show_mgs"
            label="显示话术"
            width="400">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="skip_mark"
            label="跳转标志"
            width="100">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="skip_activity"
            label="跳转活动"
            width="300">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="effective_date"
            label="生效时间"
            width="170">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="failure_date"
            label="失效时间"
            width="170">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="add_date"
            label="添加时间"
            width="170">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="update_date"
            label="更新时间"
            width="170">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="des"
            label="备注"
            width="100">
          </el-table-column>

          <el-table-column
            fixed="right"
            header-align="center"
            align="center"
            label="操作"
            width="120">
            <template slot-scope="scope">
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

      <!--APP展示页配置添加-->
      <el-tab-pane label="APP展示页配置添加" name="second" class="second">

        <el-form ref="form" :model="form" label-width="150px">

          <el-form-item label="展示类型:">
            <el-select v-model="form.show_type" placeholder="选择展示类型" clearable>
              <el-option label="结束行程分享" value="1"></el-option>
              <el-option label="开锁图片" value="2"></el-option>
              <el-option label="骑行中展示" value="3"></el-option>
              <el-option label="活动导航栏" value="4"></el-option>
              <el-option label="二级弹框" value="5"></el-option>
              <el-option label="启动页" value="6"></el-option>
              <el-option label="地图中心图标" value="7"></el-option>
              <el-option label="扫码按钮背景" value="8"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="城市配置:">
            <el-select v-model="form.city_config" placeholder="选择城市配置" clearable>
              <el-option label="默认活动" value="1"></el-option>
              <el-option label="城市活动" value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="城市名称:">
            <el-input v-model="form.city_name" placeholder="填写城市名称"></el-input>
          </el-form-item>

          <el-form-item label="信息描述:">
            <el-input v-model="form.mgs_des" placeholder="填写信息描述"></el-input>
          </el-form-item>

          <el-form-item label="显示图片:">
          </el-form-item>

          <el-form-item label="备注:">
            <el-input v-model="form.des" type="textarea" class='textarea'></el-input>
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
          show_type: '',
          city_config: '',
          city_name: '',
          skip_mark: '',
          skip_activity: '',
          isHave: '',
          logo: '',
          status: '',
          checkList: []
        },
        form: {
          show_type: '',
          city_config: '',
          city_name: '',
          mgs_des: '',
          des: ''
        },
        tableData: [{
          id: '1300',
          show_type: '地图中心图标',
          city_config: '城市活动',
          city_name: '上海市',
          mgs_dec: '你就说你想干什么吧',
          show_mgs: '我也就是试试吧',
          skip_mark: '骑行活动',
          skip_activity: '大剿匪大剿匪大剿匪大剿匪',
          effective_date: '2017-09-21 15:51:12',
          failure_date: '2017-09-21 15:51:12',
          add_date: '2017-09-21 15:51:12',
          update_date: '2017-09-21 15:51:12',
          des: ''
        }, {
          id: '1300',
          show_type: '地图中心图标',
          city_config: '城市活动',
          city_name: '上海市',
          mgs_dec: '你就说你想干什么吧',
          show_mgs: '我也就是试试吧',
          skip_mark: '骑行活动',
          skip_activity: '大剿匪大剿匪大剿匪大剿匪',
          effective_date: '2017-09-21 15:51:12',
          failure_date: '2017-09-21 15:51:12',
          add_date: '2017-09-21 15:51:12',
          update_date: '2017-09-21 15:51:12',
          des: ''
        }, {
          id: '1300',
          show_type: '地图中心图标',
          city_config: '城市活动',
          city_name: '上海市',
          mgs_dec: '你就说你想干什么吧',
          show_mgs: '我也就是试试吧',
          skip_mark: '骑行活动',
          skip_activity: '大剿匪大剿匪大剿匪大剿匪',
          effective_date: '2017-09-21 15:51:12',
          failure_date: '2017-09-21 15:51:12',
          add_date: '2017-09-21 15:51:12',
          update_date: '2017-09-21 15:51:12',
          des: ''
        }, {
          id: '1300',
          show_type: '地图中心图标',
          city_config: '城市活动',
          city_name: '上海市',
          mgs_dec: '你就说你想干什么吧',
          show_mgs: '我也就是试试吧',
          skip_mark: '骑行活动',
          skip_activity: '大剿匪大剿匪大剿匪大剿匪',
          effective_date: '2017-09-21 15:51:12',
          failure_date: '2017-09-21 15:51:12',
          add_date: '2017-09-21 15:51:12',
          update_date: '2017-09-21 15:51:12',
          des: ''
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
</style>
