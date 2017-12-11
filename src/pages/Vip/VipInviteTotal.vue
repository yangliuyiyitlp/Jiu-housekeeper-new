<template>
  <div>
    <div class="right">
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="会员邀请统计列表" name="first" class="padding">
          <!--筛选-->
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="邀请者">
              <el-input v-model="formInline.invitee"></el-input>
            </el-form-item>
            <el-form-item label="邀请者手机">
              <el-input v-model="formInline.invitee_phone"></el-input>
            </el-form-item>
            <el-form-item label="邀请次数:">
              <el-input v-model="formInline.invitee_number" placeholder="大于等于"></el-input>
            </el-form-item>

            <el-form-item label="被邀请状态">
              <el-select v-model="formInline.region1" placeholder="选择被邀请状态" class='timeInput'>
                <el-option label="实名用户" value="1"></el-option>
                <el-option label="临时用户" value="2"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="是否有效">
              <el-select v-model="formInline.region2" placeholder="选择是否有效" class='timeInput'>
                <el-option label="待更新" value="1"></el-option>
                <el-option label="有效" value="2"></el-option>
                <el-option label="无效" value="3"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="注册时间:">
              <el-date-picker
                class='timeInput'
                v-model="formInline.beginTime"
                type="datetime">
              </el-date-picker>
              -
              <el-date-picker
                class='timeInput'
                v-model="formInline.endTime"
                type="datetime">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="query">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="exportFile">导出</el-button>
            </el-form-item>
          </el-form>
          <!--隐藏表格用于提交-->
          <form action="" style="display: none"
                method="post" ref="FileForm">
            <input name="type" v-model="exportParam.type"/>
            <input name="redPackage" v-model="exportParam.redPackage"/>
            <input name="sharePlatform" v-model="exportParam.sharePlatform"/>
            <input name="state" v-model="exportParam.state"/>
            <input name="isExecuting" v-model="exportParam.isExecuting"/>
            <input name="cityName" v-model="exportParam.cityName"/>
            <input name="beginBeginTime" v-model="exportParam.beginBeginTime"/>
            <input name="endBeginTime" v-model="exportParam.endBeginTime"/>
            <input name="beginEndTime" v-model="exportParam.beginEndTime"/>
            <input name="endEndTime" v-model="exportParam.endEndTime"/>
            <input name="beginAddTime" v-model="exportParam.beginAddTime"/>
            <input name="endAddTime" v-model="exportParam.endAddTime"/>
            <input name="pageSize" v-model="exportParam.pageSize"/>
            <input name="pageNo" v-model="exportParam.pageNo"/>
          </form>
          <!--table-->
          <el-table
            :data="tableData"
            stripe
            border
            style="width: 100%">
            <el-table-column
              header-align="center"
              align="center"
              prop="invitee"
              label="邀请者">
            </el-table-column>
            <el-table-column
              header-align="center"
              align="center"
              prop="invitee_phone"
              label="邀请者手机">
            </el-table-column>
            <el-table-column
              header-align="center"
              align="center"
              prop="invitee_number"
              label="邀请人数">
            </el-table-column>
          </el-table>

          <!--分页-->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagination.pageNo"
            :page-sizes="pagination.pageSizes"
            :page-size="pagination.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagination.count">
          </el-pagination>
          <!--导出-->
          <el-dialog size='tiny' title="导出" :visible.sync="exportFormVisible" :show-close="false"
                     :close-on-press-escape="false"
                     :close-on-click-modal="false" class="demo-ruleForm ">
            <el-button @click="exportCurrent">导出当前页</el-button>
            <el-button @click="exportAll">导出所有</el-button>
            <div slot="footer" class="dialog-footer">
              <el-button @click="cancelExport">取 消</el-button>
            </div>
          </el-dialog>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>

</template>

<script>
  import baseUrl from '../../utils/baseUrl.js'
  export default {
    data () {
      return {
        activeName2: 'first',
        exportFormVisible: false,
        pagination: {pageSizes: [30, 40, 60, 100], pageSize: 30, count: 0, pageNo: 1},
        formInline: {
          invitee: '',
          invitee_phone: '',
          invitee_number: '',
          region1: '',
          region2: ''
        },
        exportParam: {
          invitee: '',
          invitee_phone: '',
          invited: '',
          invited_phone: '',
          region3: '',
          region4: ''
        },
        tableData: [{
          invitee: '99王小虎',
          invitee_phone: '13788947105',
          invitee_number: 99
        }]
      }
    },
    methods: {
      handleClick (tab, event) {
        console.log(tab, event)
      },
      getList () {
        this.$ajax.get('/activity/enjoy/list', {params: this.requestParam})
          .then((res) => {
            if (res.data.code === 0) {
              this.tableData = res.data.page.list
              this.pagination.count = res.data.page.count
              for (let i = 0; i < res.data.page.list.length; i++) {
                this.tableData[i].state = this.activeState[res.data.page.list[i].state]
                this.tableData[i].isExecuting = this.executingState[res.data.page.list[i].isExecuting]
                this.tableData[i].type = this.activityType[res.data.page.list[i].type]
                this.tableData[i].isLeXiang = this.yesNo[res.data.page.list[i].isLeXiang]
                this.tableData[i].redPackage = this.yesNo[res.data.page.list[i].redPackage]
                let sharePlatform = res.data.page.list[i].sharePlatform
                if (sharePlatform !== '' && sharePlatform !== undefined) {
                  let arr = res.data.page.list[i].sharePlatform.split(',')
                  let newArr = []
                  for (let j = 0; j < arr.length; j++) {
                    newArr.push(this.sharePlat[arr[j]])
                  }
                  this.tableData[i].sharePlatform = newArr.join(',')
                }
              }
            } else {
              this.$message({
                type: 'error',
                message: res.data.msg
              })
            }
          })
          .catch((error) => {
            console.log('获取列表失败:', error)
            this.$message({
              type: 'error',
              message: error.data.msg
            })
          })
      },
      query: function () {
        this.exportParam.type = this.requestParam.type
        this.exportParam.redPackage = this.requestParam.redPackage
        this.exportParam.sharePlatform = this.requestParam.sharePlatform
        this.exportParam.state = this.requestParam.state
        this.exportParam.isExecuting = this.requestParam.isExecuting
        this.exportParam.cityName = this.requestParam.cityName
        this.exportParam.beginBeginTime = this.requestParam.beginBeginTime
        this.exportParam.endBeginTime = this.requestParam.endBeginTime
        this.exportParam.beginEndTime = this.requestParam.beginEndTime
        this.exportParam.endEndTime = this.requestParam.endEndTime
        this.exportParam.beginAddTime = this.requestParam.beginAddTime
        this.exportParam.endAddTime = this.requestParam.endAddTime
        this.exportParam.pageNo = this.requestParam.pageNo
        this.exportParam.pageSize = this.requestParam.pageSize
        let arr = []
        for (let k in this.sharePlat) {
          for (let i = 0; i < this.requestParam.share.length; i++) {
            if (this.requestParam.share[i] === this.sharePlat[k]) {
              arr.push(k)
            }
          }
        }
        this.requestParam.sharePlatform = arr.join(',')
        this.getList()
      },
      exportFile: function () {
        this.exportFormVisible = true
      },
      cancelExport: function () {
        this.exportFormVisible = false
      },
      exportCurrent: function () {
        this.exportParam.pageNo = this.pagination.pageNo
        this.exportParam.pageSize = this.pagination.pageSize
        this.$refs['FileForm'].setAttribute('action', `${baseUrl}/activity/enjoy/export`)
        this.$refs['FileForm'].submit()
        this.exportFormVisible = false
      },
      exportAll: function () {
        this.exportParam.pageSize = ''
        this.exportParam.pageNo = ''
        this.$refs['FileForm'].setAttribute('action', `${baseUrl}/activity/enjoy/exportAll`)
        this.$refs['FileForm'].submit()
        this.exportFormVisible = false
      },     // 导出所有
      handleSizeChange: function (val) {
        this.requestParam.pageSize = val
        this.pagination.pageSize = val
        this.query()
      },   // 分页
      handleCurrentChange: function (val) {
        this.requestParam.pageNo = val
        this.pagination.pageNo = val
        this.query()
      }
    }
  }
</script>
<style scoped>
  @import'../../assets/css/common.css';
</style>
