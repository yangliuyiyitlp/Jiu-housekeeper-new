<template>
  <div>
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <el-tab-pane label="广告数据" name="first">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="日期：">
            <el-date-picker
              v-model="formInline.beginTime"
              @change="onBeginTimeChange"
              type="datetime">
            </el-date-picker>
            -
            <el-date-picker
              v-model="formInline.endTime"
              @change="onEndTimeChange"
              type="datetime">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="平台：">
            <el-select v-model="formInline.showRule" clearable>
              <el-option v-for="(val,key) in opFlag" v-bind:key=key :label=opFlag[key] :value=key></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="广告：">
            <el-select v-model="formInline.showRule" clearable>
              <el-option v-for="(val,key) in opFlag" v-bind:key=key :label=opFlag[key] :value=key></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="位置：">
            <el-select v-model="formInline.showRule" clearable>
              <el-option v-for="(val,key) in opFlag" v-bind:key=key :label=opFlag[key] :value=key></el-option>
            </el-select>
          </el-form-item>

          <el-form-item v-if="hasPermission('advert/data/view')">
            <el-button type="primary" @click="query">查询</el-button>
          </el-form-item>
          <el-form-item v-if="hasPermission('advert/data/export')">
            <el-button type="primary" @click="exportForm">导出</el-button>
          </el-form-item>
        </el-form>
        <!--隐藏表单用于文件导出-->
        <form style="display: none" action="" method="get" ref="FileForm">
          <input name="beginTime" v-model="exportParam.beginTime"/>
          <input name="endTime" v-model="exportParam.endTime"/>
          <input name="pageSize" v-model="exportParam.pageSize"/>
          <input name="pageNum" v-model="exportParam.pageNum"/>
        </form>
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="id"
            label="ID">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            label="日期"
            prop="id">
            <template slot-scope="scope">
              <span v-bind:class="{active: true}">{{ scope.row.id}}</span>
            </template>
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="showRule"
            label="广告">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="autoDisplayTimes"
            label="展示次数">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="updateDate"
            label="点击次数">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            show-overflow-tooltip
            prop="remarks"
            label="点击率">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            show-overflow-tooltip
            prop="remarks"
            label="激活数">
          </el-table-column>
          <el-table-column
            v-if="hasPermission('advert/data/more')"
            header-align="center"
            align="center"
            width="100"
            label="操作">
            <template slot-scope="scope">
              <el-button @click="modifyRecord(scope.row.id)" type="text" size="small">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.pageNum"
          :page-sizes="pagination.pageSizes"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.count">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="数据详情" name="second" v-if="moreData">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-select v-model="formInline.showRule" clearable>
            <el-option v-for="(val,key) in opFlag" v-bind:key=key :label=opFlag[key] :value=key></el-option>
          </el-select>
        </el-form>
        <!--<div id="myChart" :style="{'width':'900px', 'height':'400px', 'margin-top':'10px'}"></div>-->
        <echart-common :text="text" :dataString="dataString" :dataContent="dataContent" :seriesContent="seriesContent"></echart-common>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import a from '../../assets/js/getsessionId.js'
  import baseUrl from '../../utils/baseUrl'
  import EchartCommon from '../../components/commons/echartsCommon.vue'
  export default {
    data () {
      return {
        //图表传值开始
        text:'广告数据',
        dataString: ['活动条', '二级弹框', '开屏', '骑行结束页'],
        dataContent:['00:00-00:59', '01:00-01:59', '02:00-02:59', '03:00-03:59', '04:00-04:59', '05:00-05:59', '06:00-06:59', '07:00-07:59', '08:00-08:59', '09:00-09:59',
          '10:00-10:59', '11:00-11:59', '12:00-12:59', '13:00-13:59', '14:00-14:59', '15:00-15:59', '16:00-16:59', '17:00-17:59', '18:00-18:59', '19:00-19:59',
          '20:00-20:59', '21:00-21:59', '22:00-22:59', '23:00-23:59'],
        seriesContent:[
          {
            name: '活动条',
            type: 'line',
            stack: '展示次数',
            data: [120, 132, 101, 134, 90, 230, 210,220, 182, 191, 234, 290, 330, 310,220, 182, 191, 234, 290, 330, 310,220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '二级弹框',
            type: 'line',
            stack: '展示次数',
            data: [120, 132, 101, 134, 90, 230, 210,220, 182, 191, 234, 290, 330, 310,220, 182, 191, 234, 290, 330, 310,220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '开屏',
            type: 'line',
            stack: '展示次数',
            data: [120, 132, 101, 134, 90, 230, 210,220, 182, 191, 234, 290, 330, 310,220, 182, 191, 234, 290, 330, 310,220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '骑行结束页',
            type: 'line',
            stack: '展示次数',
            data: [120, 132, 101, 134, 90, 230, 210,220, 182, 191, 234, 290, 330, 310,220, 182, 191, 234, 290, 330, 310,220, 182, 191, 234, 290, 330, 310]
          }
        ],
        //图表传值结束
        activeName2: 'first',
        opFlag: {0: '展示次数', 1: '点击次数', 2: '点击率', 3: '激活数'},
        showFlag: '',
        moreData: true,
        exportFormVisible: false,
        tableData: [],
        formInline: {
          pageNum: 1,
          pageSize: 30
        },
        exportParam: {},
        pagination: {pageSizes: [30, 40, 60, 100], pageSize: 30, count: 0, pageNum: 1},
        adminId: '',
        path: '',
        permissionList: ['advert/data/view', 'advert/data/export', 'advert/data/more']
      }
    },
    created () {
      // 请求按钮权限
      this.adminId = this.$route.query.adminId
      this.path = this.$route.path
      a.sessionId(this.adminId, this.path, this.$router, this.$ajax, this.permissionList)
//      this.query()
    },
    methods: {
      handleSizeChange (val) {
        this.cityForm.pageSize = val
        this.pagination.pageSize = val
        this.query()
      },
      handleCurrentChange (val) {
        this.cityForm.pageNum = val
        this.pagination.pageNum = val
        this.query()
      },
      onBeginTimeChange (val) {
        this.formInline.beginTime = new Date(val).getTime()
      },
      onEndTimeChange (val) {
        this.formInline.endTime = new Date(val).getTime()
      },
      hasPermission (data) {
        if (this.permissionList && this.permissionList.length && this.permissionList.includes(data)) {
          return true
        }
        return false
      },
      handleClick () {
        this.formInline = {}
      },
      query () {
        this.exportParam.beginTime = this.formInline.beginTime
        this.exportParam.endTime = this.formInline.endTime
        this.$ajax.get(`${baseUrl.cityFencingUrl}/remind/list`, {params: this.formInline})
          .then((res) => {
            if (res.data.code === 200) {
              let result = res.data.data
              this.tableData = result
              for (let i = 0; i < result.length; i++) {
                this.tableData[i].showRule = this.opFlag[result[i].showRule]
              }
            } else {
              this.$message({
                type: 'error',
                message: '获取列表失败'
              })
            }
          })
          .catch((error) => {
            console.log('获取列表失败:', error)
            this.$message({
              type: 'error',
              message: '获取列表异常'
            })
          })
      },
      getMore (id) {
        this.$ajax.get(`${baseUrl.cityFencingUrl}/remind/one`, {params: {ruleId: id}})
          .then(res => {
            if (res.data.code === 200) {

              console.log(this.ruleForm)
              this.seriesContent
            } else {
              this.$message({
                type: 'error',
                message: res.data.msg
              })
            }
          }).catch(() => {
          this.$message({
            type: 'error',
            message: '查询异常'
          })
        })
      },
      exportForm () {
        this.$confirm('确定导出么?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(this.exportParam)
          this.exportParam.pageNum = ''
          this.exportParam.pageSize = ''
          this.$refs['FileForm'].setAttribute('action', `${baseUrl.cityFencingUrl}/exportAll `)
          this.$refs['FileForm'].submit()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消导出'
          })
        })
      },
      more (row, column, cell, event) {
        if (column.property !== 'id') {
          return false
        } else {
          this.activeName2 = 'second'
          this.getMore(row.id)
          this.moreData = true
          this.drawLine()
        }
      },
      back () {
        this.activeName2 = 'first'
        this.moreData = false
      }
    },
    components:{
      EchartCommon:EchartCommon
    }
  }
</script>
<style scoped>
  html, body {
    height: 100%;
  }

  .width {
    width: 203px;
  }

  .active {
    color: #20a0ff;
  }

  .demo-form-inline {
    padding-left: 10px;
  }


</style>
