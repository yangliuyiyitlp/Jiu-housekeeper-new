<template>
  <div class="right">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <!--消息推送计划列表-->
      <el-tab-pane label="消息推送计划列表" name="first" class="padding">

        <!--筛选条件-->
        <el-form :inline="true" :model="formInline" class="demo-form-inline">

          <el-form-item label="推送状态:">
            <el-select v-model="formInline.status" placeholder="选择推送状态" clearable style="width: 130px">
              <!--<el-option label="等待推送" value="1"></el-option>-->
              <!--<el-option label="推送中" value="2"></el-option>-->
              <!--<el-option label="推送结束" value="3"></el-option>-->
              <!--<el-option label="取消推送" value="4"></el-option>-->
              <!--<el-option label="草稿" value="5"></el-option>-->
              <!--<el-option label="结果更新中" value="6"></el-option>-->
              <el-option
                v-for="item in pushStateRelation"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="推送城市:">
            <el-input v-model="formInline.city" placeholder="选择城市" style="width: 100px">
            </el-input>
          </el-form-item>

          <el-form-item label="推送日期:">

            <el-date-picker
              style="width: 130px"
              v-model="formInline.push_time_begin"
              type="date"
              placeholder="推送开始时间">
            </el-date-picker>
            -
            <el-date-picker
              style="width: 130px"
              v-model="formInline.push_time_end"
              type="date"
              placeholder="推送结束时间">
            </el-date-picker>

          </el-form-item>

          <el-form-item label="更新日期:">

            <el-date-picker
              style="width: 130px"
              v-model="formInline.push_time_begin"
              type="date"
              placeholder="推送开始时间">
            </el-date-picker>
            -
            <el-date-picker
              style="width: 130px"
              v-model="formInline.push_time_end"
              type="date"
              placeholder="推送结束时间">
            </el-date-picker>

          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="showForm">查询</el-button>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="">导出</el-button>
          </el-form-item>
        </el-form>

        <!--表格-->
        <el-table
          :data="list"
          style="width: 100%"
          border
          stripe>

          <el-table-column
            v-if="false"
            header-align="center"
            align="center"
            prop="id"
            label="ID"
            width="168">
          </el-table-column>

          <el-table-column
            header-align="center"
            prop="activitiesInfo.description"
            label="描述"
            width="300">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="pushTime"
            label="推送时间"
            width="168">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="pushName"
            label="推送状态"
            width="100">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="activityPath"
            label="跳转活动"
            width="100">
          </el-table-column>

          <el-table-column
            header-align="center"
            prop="appPushContent"
            label="个推内容"
            width="400">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="area.name"
            label="推送城市"
            width="100">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="updateDate"
            label="更新日期"
            width="168">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="result"
            label=" GT:成功发送|到达数|展示数|点击数"
            width="260">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="apnresult"
            label="APN:成功发送|到达数|展示数|点击数"
            width="268">
          </el-table-column>

          <el-table-column
            fixed="right"
            header-align="center"
            align="center"
            label="操作"
            width="150">
            <template slot-scope="scope">
              <el-button type="text" size="small">修改</el-button>
              <el-button
                @click="open2(scope.$index, tableData4)"
                type="text"
                size="small">
                移除
              </el-button>
              <el-button type="text" size="small">发布</el-button>
            </template>
          </el-table-column>

        </el-table>

        <!--分页-->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.pageNum"
          :page-sizes="pagination.pageSizes"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total">
        </el-pagination>

      </el-tab-pane>

      <!--消息推送计划添加-->
      <el-tab-pane :label="form.id ? '消息推送计划修改' : '消息推送计划添加'" name="second" class="second">

        <el-form ref="form" :model="form" label-width="120px">

          <el-form-item label="推送时间:">
            <el-date-picker
              style="width:220px"
              v-model="form.push_data"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
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

            <el-select v-model="form.push_city" multiple placeholder="推送城市">
              <el-option
                v-for="item in form.push_citys"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>

            <!--<el-select v-model="form.push_city" placeholder="推送城市" clearable>-->
            <!--<el-option label="上海市" value="1"></el-option>-->
            <!--<el-option label="湖州市" value="2"></el-option>-->
            <!--<el-option label="成都市" value="3"></el-option>-->
            <!--<el-option label="厦门市" value="4"></el-option>-->
            <!--<el-option label="北京市" value="5"></el-option>-->
            <!--</el-select>-->
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

          <el-form-item label="备注:">
            <el-input v-model="form.des" type="textarea" class='textarea'></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="saveData">保存</el-button>
            <el-button @click="goBack">返回</el-button>
          </el-form-item>
        </el-form>

      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script>
  import Moment from 'moment'
  import Tools from '../../utils/tools.js'
  import baseUrl from '../../utils/baseUrl'

  export default {
    data () {
      return {
        value1: '',
        activeName: 'first',
        pushStateRelation: {
          0: '等待推送',
          1: '推送中',
          2: '推送结束',
          3: '取消推送',
          4: '草稿',
          5: '结果更新中'
        }, // 0 等待推送 1 推送中 2 推送结束 3 取消推送 4 草稿 5 结果更新中
        formInline: {
          status: '',
          city: '',
          push_time_begin: '',
          push_time_end: '',
          checkList: [],
          group: '',
          creator: ''
        },
        form: {
          push_data: '',
          checkList: [],
          push_group: '',
          push_city: [],
          push_citys: [
            {
              value: '1',
              label: '黄金糕'
            }, {
              value: '2',
              label: '双皮奶'
            }, {
              value: '3',
              label: '蚵仔煎'
            }, {
              value: '4',
              label: '龙须面'
            }, {
              value: '5',
              label: '北京烤鸭'
            }
          ],
          jump_activity: '',
          push_content: '',
          message_content: '',
          des: ''
        },
        list: [],
        pagination: {pageSizes: [10, 30, 50, 80, 100], pageSize: 30, total: 0, pageNum: 1}
      }
    },
    created: function () {
      this.showForm()
    },
    methods: {
      handleClick (tab, event) {
        console.log(tab, event)
      },
      showForm () {
        this.formInline.push_time ? this.formInline.push_time = Moment(this.formInline.push_time).format('YYYY-MM-DD HH:mm:ss') : delete this.formInline.push_time
        console.log(this.formInline)
        console.log('search!')
        this.$ajax.get(`${baseUrl.ActivityMsgPlan}/tpushplan/tPushPlan/list`)
          .then(res => {
            console.log(res.data.page)
            this.list = res.data.page.result
            console.log(this.list)
            // 推荐位
            for (let i = 0; i < this.list.length; i++) {
              this.list[i].pushName = Tools.k2value(this.pushStateRelation, this.list[i].pushState)
            }
          })
          .catch(err => {
            console.log(err)
          })
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
        console.log(this.form.push_city)
      },
      goBack () {
        console.log('goBack!')
        this.activeName = 'first'
        // 并清空当前列表内容
        // this.resetForm()
      },
      // 改变请求条数功能
      handleSizeChange: val => {
//        console.log(val)
        this.formInline.pageSize = val
        // this.showForm()
      },
      // 翻页功能
      handleCurrentChange: val => {
//        console.log(val)
        this.formInline.pageNum = val
        // this.showForm()
      }
    }
  }
</script>

<style scoped>
  .second .textarea, .second .el-input__inner {
    width: 450px;
  }
</style>
