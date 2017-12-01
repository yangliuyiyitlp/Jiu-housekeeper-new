<template>
  <div class="right">
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <!--消息推送计划列表-->
      <el-tab-pane label="消息推送计划列表" name="first" class="padding">

        <!--筛选条件-->
        <el-form :inline="true" :model="formInline" class="demo-form-inline">

          <el-form-item label="推送状态:">
            <el-select v-model="formInline.status" placeholder="选择推送状态" clearable>
              <el-option label="等待推送" value="1"></el-option>
              <el-option label="推送中" value="2"></el-option>
              <el-option label="推送结束" value="3"></el-option>
              <el-option label="取消推送" value="4"></el-option>
              <el-option label="草稿" value="5"></el-option>
              <el-option label="结果更新中" value="6"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="城市代码:">
            <el-input v-model="formInline.city" placeholder="选择城市代码">
            </el-input>
          </el-form-item>

          <el-form-item label="推送方式:">
            <el-checkbox-group v-model="formInline.checkList">
              <el-checkbox label="推送"></el-checkbox>
              <el-checkbox label="短信"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="推送组:">
            <el-input v-model="formInline.group" placeholder="推送组">
            </el-input>
          </el-form-item>

          <el-form-item label="创建者:">
            <el-input v-model="formInline.creator" placeholder="创建者">
            </el-input>
          </el-form-item>

          <el-form-item label="推送日期:">
            <date-pickers></date-pickers>
          </el-form-item>

          <el-form-item label="更新日期:">
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
          :data="tableData4"
          style="width: 100%"
          border
          stripe>
          <el-table-column
            header-align="center"
            align="center"
            prop="push_time"
            label="推送时间"
            width="168">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="push_status"
            label="推送状态"
            width="100">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="push_way"
            label="推送方式"
            width="100">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="push_group"
            label="推送组"
            width="100">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="activity"
            label="跳转活动"
            width="100">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="push_content"
            label="个推内容"
            width="400">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="push_city"
            label="推送城市"
            width="100">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="creator"
            label="创建者"
            width="120">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="update_time"
            label="更新日期"
            width="168">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="updated_time"
            label="结果更新日期"
            width="168">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="push_number"
            label="推送总数"
            width="100">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="remarks"
            label=" GT:成功发送|到达数|展示数|点击数"
            width="260">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="remarks"
            label="APN:成功发送|到达数|展示数|点击数"
            width="268">
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

      <!--消息推送计划添加-->
      <el-tab-pane label="消息推送计划添加" name="second" class="second">

        <el-form ref="form" :model="form" label-width="120px">

          <el-form-item label="推送时间:">
            <el-date-picker
              v-model="form.push_data"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="推送方式:">
            <el-checkbox-group v-model="form.checkList">
              <el-checkbox label="推送"></el-checkbox>
              <el-checkbox label="短信"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="推送组:">
            <el-select v-model="form.push_group" placeholder="选择推送组" clearable>
              <el-option label="测试一下" value="1"></el-option>
              <el-option label="5月份注册用户" value="2"></el-option>
              <el-option label="借车中用户" value="3"></el-option>
              <el-option label="全部推送" value="4"></el-option>
              <el-option label="未实名认证" value="5"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="推送城市:">
            <el-select v-model="form.push_city" placeholder="推送城市" clearable>
              <el-option label="上海市" value="1"></el-option>
              <el-option label="湖州市" value="2"></el-option>
              <el-option label="成都市" value="3"></el-option>
              <el-option label="厦门市" value="4"></el-option>
              <el-option label="北京市" value="5"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="跳转活动:">
            <el-select v-model="form.jump_activity" placeholder="跳转活动" clearable>
              <el-option label="拉新活动" value="1"></el-option>
              <el-option label="还有什么活动" value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="个推内容:">
            <el-input v-model="form.push_content" type="textarea" class='textarea'></el-input>
          </el-form-item>

          <el-form-item label="短信内容:">
            <el-input v-model="form.message_content" type="textarea" class='textarea'></el-input>
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
          status: '',
          city: '',
          checkList: [],
          group: '',
          creator: ''
        },
        form: {
          push_data: '',
          checkList: [],
          push_group: '',
          push_city: '',
          jump_activity: '',
          push_content: '',
          message_content: '',
          des: ''
        },
        tableData4: [{
          push_time: '2017-09-21 15:51:12',
          push_status: '推送结束',
          push_way: '推送',
          push_group: '全部推送',
          activity: '拉新活动',
          push_content: '地表50度，骑上赳赳单车脚不沾地，快速到达.',
          push_city: '上海市',
          creator: '啦啦啦啦啦',
          update_time: '2017-09-21 15:51:12',
          updated_time: '2017-09-21 15:51:12',
          push_number: '28',
          GT: '3|3|3|0',
          APN: '3|3|3|0'
        }, {
          push_time: '2017-09-21 15:51:12',
          push_status: '推送结束',
          push_way: '推送',
          push_group: '全部推送',
          activity: '拉新活动',
          push_content: '地表50度，骑上赳赳单车脚不沾地，快速到达.',
          push_city: '上海市',
          creator: '啦啦啦啦啦',
          update_time: '2017-09-21 15:51:12',
          updated_time: '2017-09-21 15:51:12',
          push_number: '28',
          GT: '3|3|3|0',
          APN: '3|3|3|0'
        }, {
          push_time: '2017-09-21 15:51:12',
          push_status: '推送结束',
          push_way: '推送',
          push_group: '全部推送',
          activity: '拉新活动',
          push_content: '地表50度，骑上赳赳单车脚不沾地，快速到达.',
          push_city: '上海市',
          creator: '啦啦啦啦啦',
          update_time: '2017-09-21 15:51:12',
          updated_time: '2017-09-21 15:51:12',
          push_number: '28',
          GT: '3|3|3|0',
          APN: '3|3|3|0'
        }, {
          push_time: '2017-09-21 15:51:12',
          push_status: '推送结束',
          push_way: '推送',
          push_group: '全部推送',
          activity: '拉新活动',
          push_content: '地表50度，骑上赳赳单车脚不沾地，快速到达.',
          push_city: '上海市',
          creator: '啦啦啦啦啦',
          update_time: '2017-09-21 15:51:12',
          updated_time: '2017-09-21 15:51:12',
          push_number: '28',
          GT: '3|3|3|0',
          APN: '3|3|3|0'
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
 .padding{
   padding-left:10px;
 }

  .second .textarea, .second .el-input, .second .el-input__inner{
    width: 220px;
  }
</style>
