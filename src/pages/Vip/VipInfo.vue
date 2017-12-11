<template>
  <div>
    <div class="right">
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="会员管理列表" name="first" class="padding">
          <!--筛选-->
          <el-form :inline="true" :model="formInline" class="form-fisrt">
            <el-form-item label="姓名:">
              <el-input v-model="formInline.user"></el-input>
            </el-form-item>
            <el-form-item label="昵称">
              <el-input v-model="formInline.nickname" ></el-input>
            </el-form-item>
            <el-form-item label="手机号:">
              <el-input v-model="formInline.phone" ></el-input>
            </el-form-item>
            <el-form-item label="身份证:">
              <el-input v-model="formInline.id_card"></el-input>
            </el-form-item>

            <el-form-item label="信用积分:">
              <el-col :span="11">
                <el-input placeholder="最小值"></el-input>
              </el-col>
              <el-col class="line" :span="1">-</el-col>
              <el-col :span="11">
                <el-input placeholder="最大值"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="红包:">
              <el-col :span="11">
                <el-input placeholder="最小值"></el-input>
              </el-col>
              <el-col class="line" :span="1">-</el-col>
              <el-col :span="11">
                <el-input placeholder="最大值"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="累计大卡:">
              <el-col :span="11">
                <el-input placeholder="最小值"></el-input>
              </el-col>
              <el-col class="line" :span="1">-</el-col>
              <el-col :span="11">
                <el-input placeholder="最大值"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="累计时间:">
              <el-col :span="11">
                <el-input placeholder="最小值"></el-input>
              </el-col>
              <el-col class="line" :span="1">-</el-col>
              <el-col :span="11">
                <el-input placeholder="最大值"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="累计距离:">
              <el-col :span="11">
                <el-input placeholder="最小值"></el-input>
              </el-col>
              <el-col class="line" :span="1">-</el-col>
              <el-col :span="11">
                <el-input placeholder="最大值"></el-input>
              </el-col>
            </el-form-item>

            <el-form-item label="注册状态:">
              <el-select v-model="formInline.region1" placeholder="选择注册状态"  class='timeInput'>
                <el-option label="押金充值" value="1"></el-option>
                <el-option label="无身份证验证审核" value="2"></el-option>
                <el-option label="手机认证" value="3"></el-option>
                <el-option label="退款冻结" value="4"></el-option>
                <el-option label="实名有押金" value="5"></el-option>
                <el-option label="待支付" value="6"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="借车状态:">
              <el-select v-model="formInline.region2" placeholder="选择借车状态"  class='timeInput'>
                <el-option label="借车处理中" value="1"></el-option>
                <el-option label="借车中" value="2"></el-option>
                <el-option label="还车" value="3"></el-option>
                <el-option label="未确认还车" value="4"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="最近借车:">
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
          </el-form>

          <!--table栏-->
          <el-table
            :data="tableData"
            stripe
            border
            style="width: 100%">
            <el-table-column
              fixed
              width='100'
              header-align="center"
              align="center"
              prop="name"
              label="姓名">
            </el-table-column>
            <el-table-column
              width='140'
              header-align="center"
              align="center"
              prop="nickname"
              label="昵称">
            </el-table-column>
            <el-table-column
              header-align="center"
              align="center"
              prop="country"
              label="国籍">
            </el-table-column>
            <el-table-column
              width='130'
              header-align="center"
              align="center"
              prop="phone"
              label="手机">
            </el-table-column>
            <el-table-column
              width='190'
              header-align="center"
              align="center"
              prop="id_card"
              label="身份证">
            </el-table-column>
            <el-table-column
              width='100'
              header-align="center"
              align="center"
              prop="deposit"
              label="账户押金">
            </el-table-column>
            <el-table-column
              width='100'
              header-align="center"
              align="center"
              prop="credit_points"
              label="信用积分">
            </el-table-column>
            <el-table-column
              width='100'
              header-align="center"
              align="center"
              prop="money"
              label="红包金额">
            </el-table-column>
            <el-table-column
              width='170'
              header-align="center"
              align="center"
              prop="register_time"
              label="注册时间">
            </el-table-column>
            <el-table-column
              width='130'
              header-align="center"
              align="center"
              prop="log_status"
              label="登录状态标识">
            </el-table-column>
            <el-table-column
              width='170'
              header-align="center"
              align="center"
              prop="log_time"
              label="登录时间">
            </el-table-column>
            <el-table-column
              width='160'
              header-align="center"
              align="center"
              prop="bicycle_status"
              label="用户借车状态">
            </el-table-column>
            <el-table-column
              width='170'
              header-align="center"
              align="center"
              prop="last_time"
              label="最近借车时间">
            </el-table-column>
            <el-table-column
              width='160'
              header-align="center"
              align="center"
              prop="account_status"
              label="账户状态">
            </el-table-column>
            <el-table-column
              width='160'
              header-align="center"
              align="center"
              prop="total_calories"
              label="累计骑行大卡">
            </el-table-column>
            <el-table-column
              width='160'
              header-align="center"
              align="center"
              prop="total_time"
              label="累计骑行时间(H)">
            </el-table-column>
            <el-table-column
              width='160'
              header-align="center"
              align="center"
              prop="total_distance"
              label="累计骑行距离(KM)">
            </el-table-column>
            <el-table-column
              width='170'
              header-align="center"
              align="center"
              prop="update_time"
              label="更新时间">
            </el-table-column>
            <el-table-column
              width='200'
              header-align="center"
              align="center"
              prop="des"
              label="备注">
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
        </el-tab-pane>

        <!--<el-tab-pane label="会员管理添加" name="second">-->
          <!--<el-form ref="formA" :model="form" label-width="100px">-->
            <!--<el-form-item label="用户积分">-->
              <!--<el-input v-model="form.name"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="信用分">-->
              <!--<el-input v-model="form.name"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="备注">-->
              <!--<el-input v-model="form.name" type="textarea" class='textarea'></el-input>-->
            <!--</el-form-item>-->

            <!--<el-form-item>-->
              <!--<el-button type="primary" @click="doModify">保存</el-button>-->
              <!--<el-button @click="back">返回</el-button>-->
            <!--</el-form-item>-->
          <!--</el-form>-->
        <!--</el-tab-pane>-->
      </el-tabs>

    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        activeName2: 'first',
        formInline: {
          type: '',
          pageNo: '',
          pageSize: ''
        }, // 查询值
        labelPosition: 'right',
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }, // 会员管理添加
        tableData: [{
          name: '99王小虎',
          nickname: '99王小虎',
          country: 'china',
          phone: '13788947105',
          id_card: '354852884585245852',
          deposit: '100',
          credit_points: '',
          money: '10',
          register_time: '2017-2-5 21:52:45',
          log_status: '登录',
          log_time: '2016-05-04 00:00:00',
          bicycle_status: '借车中',
          last_time: '2016-05-04 00:00:00',
          account_status: '手机认证用户',
          total_calories: '200',
          total_time: '25',
          total_distance: '100',
          update_time: '2016-05-04 00:00:00',
          des: '你还有什么想说的'
        }], // 列表
        pagination: {pageSizes: [30, 40, 60, 100], pageSize: 30, count: 0, pageNo: 1}
      }
    },
    created () {
      this.query()
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
      query () {
//        let arr = []
//        for (let k in this.sharePlat) {
//          for (let i = 0; i < this.requestParam.share.length; i++) {
//            if (this.requestParam.share[i] === this.sharePlat[k]) {
//              arr.push(k)
//            }
//          }
//        }
//        this.requestParam.sharePlatform = arr.join(',')
        this.getList()
      },
      saveData () {
        console.log('saveData!')
      },
      handleSizeChange (val) {
        this.requestParam.pageSize = val
        this.pagination.pageSize = val
        this.query()
      },   // 分页
      handleCurrentChange (val) {
        this.requestParam.pageNo = val
        this.pagination.pageNo = val
        this.query()
      },
      back () {
        this.activeName2 = 'first'
      },
      doModify (formA) {       // 保存确定功能
        this.$refs[formA].validate((valid) => {
          if (valid) {
            this.activeName2 = 'first'
            this.form.sharePlatformList = []
            this.$ajax.get('/activity/enjoy/save', {params: this.form})
              .then((response) => {
                if (response.data.code === 0) {
                  // 更新成功
                  this.$message({
                    type: 'success',
                    message: '操作成功'
                  })
                  // 刷新页面
                  this.query()
                } else {
                  this.$message({
                    type: 'error',
                    message: '操作失败'
                  })
                }
              })
              .catch((err) => {
                this.$message({
                  type: 'error',
                  message: err
                })
              }
              )
          } else {
            return false
          }
        })
      }
    }
  }
</script>

<style scoped>
  @import'../../assets/css/common.css';
  .form-fisrt .el-input, .form-fisrt .el-input__inner{
    width: 100px;
  }
</style>
