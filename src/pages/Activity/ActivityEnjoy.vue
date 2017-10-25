<template>
  <div class="right">
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <!--赳赳乐享活动列表-->
      <el-tab-pane label="赳赳乐享活动列表" name="first">

        <!--筛选条件-->
        <el-form :inline="true" :model="requestParam" style="padding-left:10px;" class="demo-form-inline">
          <el-form-item label="活动类型:">
            <el-select v-model="requestParam.type" clearable>
              <el-option v-for="(val,key) in activityType" v-bind:key=key :label=activityType[key]
                         :value=key></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="有无红包:">
            <el-select v-model="requestParam.redPackage" clearable>
              <el-option v-for="(val,key) in yesNo" v-bind:key=key :label=yesNo[key] :value=key></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="分享平台:">
            <el-checkbox-group v-model="requestParam.share">
              <el-checkbox v-for="(val,key) in sharePlat" v-bind:key=key :label=sharePlat[key] :value=key></el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="城市标志:">
            <el-select v-model="requestParam.state" clearable>
              <el-option v-for="(val,key) in activeState" v-bind:key=key :label=activeState[key] :value=key></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="生效状态:">
            <el-select v-model="requestParam.isExecuting" clearable>
              <el-option v-for="(val,key) in executingState" v-bind:key=key :label=executingState[key]
                         :value=key></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="城市名称:">
            <el-input v-model="requestParam.cityName">
            </el-input>
          </el-form-item>

          <el-form-item label="生效-失效时间">
            <el-date-picker
              v-model="requestParam.beginBeginTime"
              type="datetime"
              placeholder="开始时间">
            </el-date-picker>
            <el-date-picker
              v-model="requestParam.endBeginTime"
              type="datetime"
              placeholder="结束时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="展示-隐藏时间">
            <el-date-picker
              v-model="requestParam.beginEndTime"
              type="datetime"
              placeholder="开始时间">
            </el-date-picker>
            <el-date-picker
              v-model="requestParam.endEndTime"
              type="datetime"
              placeholder="结束时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="添加时间">
            <el-date-picker
              v-model="requestParam.beginAddTime"
              type="datetime"
              placeholder="开始时间">
            </el-date-picker>
            <el-date-picker
              v-model="requestParam.endAddTime"
              type="datetime"
              placeholder="结束时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="query">查询</el-button>
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
            prop="id"
            label="id"
            v-if=0
          >
          </el-table-column>
          <!--<el-table-column-->
          <!--header-align="center"-->
          <!--align="center"-->
          <!--prop="cityName"-->
          <!--label="城市名称"-->
          <!--show-overflow-tooltip-->
          <!--width="100">-->
          <!--</el-table-column>-->

          <el-table-column
            header-align="center"
            align="center"
            prop="cityName"
            label="城市名称"
            show-overflow-tooltip
            width="100">
            <template slot-scope="scope">
              <span v-bind:class="{active: true}">{{ scope.row.cityName}}</span>
            </template>
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="description"
            label="活动描述"
            show-overflow-tooltip
            width="120">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="state"
            label="是否默认"
            width="100">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="isExecuting"
            label="生效状态"
            width="100">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            label="展示顺序"
            width="120"
            sortable
            prop="sort">
            <template slot-scope="scope">
              <el-input v-model=scope.row.sort></el-input>
            </template>
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="type"
            label="活动类型"
            width="120">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="bikeLimit"
            label="车辆活动状态"
            width="130">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="creditLimit"
            label="限制信用分"
            width="120">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="isLeXiang"
            label="是否乐享活动"
            width="130">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="redPackage"
            label="有无红包"
            width="100">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="sharePlatform"
            label="分享平台"
            show-overflow-tooltip
            width="120">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="shareTitle"
            label="分享标题"
            width="100">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="shareContent"
            label="分享内容"
            show-overflow-tooltip
            width="100">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="beginTime"
            label="生效时间"
            width="175">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="endTime"
            label="失效时间"
            width="175">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="showTime"
            label="展示时间"
            width="175">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="hideTime"
            label="隐藏时间"
            width="175">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="updateTime"
            label="更新时间"
            width="175">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="remarks"
            label="备注"
            show-overflow-tooltip
            width="100">
          </el-table-column>

          <el-table-column
            header-align="center"
            width="100"
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <el-button @click="modifyRecord(scope)" type="text" size="small">修改</el-button>
              <el-button @click="deleteRecord(scope.row.id)" type="text" size="small">删除</el-button>
            </template>
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

      <!--赳赳乐享活动添加-->
      <el-tab-pane label="赳赳乐享活动添加" name="second" class="second">

        <el-form ref="form" :model="form" label-width="150px">

          <el-form-item label="活动描述:">
            <el-input v-model="form.activity_des" placeholder="活动简要描述"></el-input>
          </el-form-item>

          <el-form-item label="活动类型:">
            <el-select v-model="form.activity_type" placeholder="选择活动类型" clearable>
              <el-option label="普通活动" value="1"></el-option>
              <el-option label="视屏活动" value="2"></el-option>
              <el-option label="骑行活动" value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="是否乐享活动:">
            <el-select v-model="form.isEnjoy" placeholder="是否乐享活动" clearable>
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="限制信用分:">
            <el-input v-model="form.min_credit" placeholder="可以参与活动的最小信用分"></el-input>
          </el-form-item>

          <el-form-item label="封面图片:">
          </el-form-item>

          <el-form-item label="展示顺序:">
            <el-input v-model="form.show_order" placeholder="填写展示顺序"></el-input>
          </el-form-item>

          <el-form-item label="活动链接:">
            <el-input v-model="form.activity_url" placeholder="填写活动链接"></el-input>
          </el-form-item>

          <el-form-item label="分享平台:">
            <el-checkbox-group v-model="form.share_platform">
              <el-checkbox label="微信好友"></el-checkbox>
              <el-checkbox label="朋友圈"></el-checkbox>
              <el-checkbox label="QQ好友"></el-checkbox>
              <el-checkbox label="QQ空间"></el-checkbox>
              <el-checkbox label="微博"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="是否默认:">
            <el-radio class="radio" v-model="form.isDefault" label="1">默认活动</el-radio>
            <el-radio class="radio" v-model="form.isDefault" label="2">城市活动</el-radio>
          </el-form-item>

          <el-form-item label="有效日期:">
            <el-date-picker
              v-model="form.effective_date"
              type="datetimerange"
              placeholder="选择时间范围">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="备注:">
            <el-input v-model="form.des" type="textarea" class='textarea'></el-input>
          </el-form-item>

          <el-form-item label="快速添加到城市:">
            <el-checkbox-group v-model="form.add_cities">
              <el-checkbox label="成都市"></el-checkbox>
              <el-checkbox label="湖州市"></el-checkbox>
              <el-checkbox label="上海市"></el-checkbox>
              <el-checkbox label="北京市"></el-checkbox>
              <el-checkbox label="深圳市"></el-checkbox>
              <el-checkbox label="厦门市"></el-checkbox>
              <el-checkbox label="珠海市"></el-checkbox>
              <el-checkbox label="厦门"></el-checkbox>
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
  import Moment from 'moment'

  export default {
    created: function () {
      this.list()
    },
    data () {
      return {
        activeState: {}, // 是否默认
        executingState: {}, // 生效状态
        activityType: {}, // 活动类型
        yesNo: {}, // 乐享 红包
        sharePlat: {}, // 分享平台
        value1: '',
        activeName2: 'first',
//        share: [],
        requestParam: {
          share: [],
          sharePlatform: '',
          type: '',
          redPackage: '',
          state: '',
          isExecuting: '',
          cityName: '',
          beginBeginTime: '',
          endBeginTime: '',
          beginEndTime: '',
          endEndTime: '',
          beginAddTime: '',
          endAddTime: ''
        },
        form: {
          activity_des: '',
          activity_type: '',
          isEnjoy: '',
          min_credit: '',
          show_order: '',
          activity_url: '',
          share_platform: [],
          isDefault: '1',
          city_name: 'default',
          effective_date: '',
          des: '',
          add_cities: []
        },
        tableData: [],
        dialogFormVisible: false,  // 增加修改是否显示
        moreFormVisible: false,   // 详情
        exportFormVisible: false,
        addLoading: false,       // 是否显示loading
        moreInfo: {
          cityName: '',
          rank: '',
          type: '',
          displayType: '',
          androidInmobiId: '',
          iosInmobiId: '',
          remarks: ''
        },
        formLabelWidth: '80px',
        rules: {
          cityName: [
            {required: true, message: '请输入城市名称', trigger: 'blur'}
          ],
          rank: [
            {required: true, message: '请输入显示顺序', trigger: 'blur'}
          ],
          type: [
            {required: true, message: '请选择广告位置', trigger: 'change'}
          ],
          displayType: [
            {required: true, message: '请选择广告类型', trigger: 'change'}
          ],
          androidInmobiId: [
            {required: true, message: '请输入安卓inmobi编号', trigger: 'blur'}
          ],
          iosInmobiId: [
            {required: true, message: '请输入苹果inmobi编号', trigger: 'blur'}
          ]
        },
        pagination: {pageSizes: [30, 40, 60, 100], pageSize: 30, count: 0, pageNo: 1},
        exportParam: {
          type: '',
          isHave: '',
          logo: '',
          status: '',
          city_name: '',
          beginBeginTime: '',
          endBeginTime: '',
          beginEndTime: '',
          endEndTime: '',
          beginAddTime: '',
          endAddTime: '',
          pageSize: 30,
          pageNo: 1
        },
        modifyOrders: [],
        focusId: '',
        focusRank: '',
        modifyRank: ''
      }
    },
    methods: {
      // 功能
//      list: function () {
//        this.requestParam.city_name = this.requestParam.city_name.trim()
//        this.exportParam.type = this.requestParam.type
//        this.exportParam.isHave = this.requestParam.isHave
//        this.exportParam.logo = this.requestParam.logo
//        this.exportParam.status = this.requestParam.status
//        this.exportParam.city_name = this.requestParam.city_name
//        this.exportParam.beginBeginTime = this.requestParam.beginBeginTime
//        this.exportParam.endBeginTime = this.requestParam.endBeginTime
//        this.exportParam.beginEndTime = this.requestParam.beginEndTime
//        this.exportParam.endEndTime = this.requestParam.endEndTime
//        this.exportParam.beginAddTime = this.requestParam.beginAddTime
//        this.exportParam.endAddTime = this.requestParam.endAddTime
//        this.exportParam.pageNo = this.requestParam.pageNo
//        this.exportParam.pageSize = this.requestParam.pageSize
//        this.$ajax.get('sys/dictutils/interface/getDictList', {params: {type: 'activity_state'}})
//          .then((res) => {
//            for (var i = 0; i < res.data.length; i++) {
//              this.activeState[res.data[i].value] = res.data[i].label
//            }
//          })
//          .then(this.$ajax.get('sys/dictutils/interface/getDictList', {params: {type: 'black_list_is_executing'}})
//            .then((res) => {
//              for (var i = 0; i < res.data.length; i++) {
//                this.executingState[res.data[i].value] = res.data[i].label
//              }
//            })
//          )
//          .then(this.$ajax.get('sys/dictutils/interface/getDictList', {params: {type: 'activitys_type'}})
//            .then((res) => {
//              for (var i = 0; i < res.data.length; i++) {
//                this.activityType[res.data[i].value] = res.data[i].label
//              }
//            })
//          )
//          .then(this.$ajax.get('sys/dictutils/interface/getDictList', {params: {type: 'yes_no'}})
//            .then((res) => {
//              for (var i = 0; i < res.data.length; i++) {
//                this.yesNo[res.data[i].value] = res.data[i].label
//              }
//            })
//          )
//          .then(this.$ajax.get('sys/dictutils/interface/getDictList', {params: {type: 'share_platform'}})
//            .then((res) => {
//              for (var i = 0; i < res.data.length; i++) {
//                this.sharePlat[res.data[i].value] = res.data[i].label
//              }
//            })
//          ).then(this.$ajax.get('/electric/tActivitiesInfo/interface/list', {params: this.requestParam})
//          .then((res) => {
//            if (res.data.code === 0) {
//              this.tableData = res.data.page.list
//              this.pagination.count = res.data.page.count
//              for (var i = 0; i < res.data.page.list.length; i++) {
//                this.tableData[i].state = this.activeState[res.data.page.list[i].state]
//                this.tableData[i].isExecuting = this.executingState[res.data.page.list[i].isExecuting]
//                this.tableData[i].type = this.activityType[res.data.page.list[i].type]
//                this.tableData[i].isLeXiang = this.yesNo[res.data.page.list[i].isLeXiang]
//                this.tableData[i].redPackage = this.yesNo[res.data.page.list[i].redPackage]
//                var arr = res.data.page.list[i].sharePlatform.split(',')
//                var newArr = []
//                for (var j = 0; j < arr.length; j++) {
//                  newArr.push(this.sharePlat[arr[j]])
//                }
//                this.tableData[i].sharePlatform = newArr.join(',')
//              }
//            } else {
//              this.$message({
//                type: 'error',
//                message: res.data.msg
//              })
//            }
//          }))// 请求列表
//          .catch(() => {
//            this.$message({
//              type: 'info',
//              message: '获取列表失败'
//            })
//          })
//      },
      list: function () {
        this.$ajax.get('sys/dictutils/interface/getDictList', {params: {type: 'activity_state'}})
          .then((res) => {
            for (var i = 0; i < res.data.length; i++) {
              this.activeState[res.data[i].value] = res.data[i].label
            }
          })
          .then(this.$ajax.get('sys/dictutils/interface/getDictList', {params: {type: 'black_list_is_executing'}})
            .then((res) => {
              for (var i = 0; i < res.data.length; i++) {
                this.executingState[res.data[i].value] = res.data[i].label
              }
            })
          )
          .then(this.$ajax.get('sys/dictutils/interface/getDictList', {params: {type: 'activitys_type'}})
            .then((res) => {
              for (var i = 0; i < res.data.length; i++) {
                this.activityType[res.data[i].value] = res.data[i].label
              }
            })
          )
          .then(this.$ajax.get('sys/dictutils/interface/getDictList', {params: {type: 'yes_no'}})
            .then((res) => {
              for (var i = 0; i < res.data.length; i++) {
                this.yesNo[res.data[i].value] = res.data[i].label
              }
            })
          )
          .then(this.$ajax.get('sys/dictutils/interface/getDictList', {params: {type: 'share_platform'}})
            .then((res) => {
              for (var i = 0; i < res.data.length; i++) {
                this.sharePlat[res.data[i].value] = res.data[i].label
              }
            })
          ).then(this.$ajax.get('/electric/tActivitiesInfo/interface/list', {params: this.requestParam})
          .then((res) => {
            if (res.data.code === 0) {
              this.tableData = res.data.page.list
              this.pagination.count = res.data.page.count
              for (var i = 0; i < res.data.page.list.length; i++) {
                this.tableData[i].state = this.activeState[res.data.page.list[i].state]
                this.tableData[i].isExecuting = this.executingState[res.data.page.list[i].isExecuting]
                this.tableData[i].type = this.activityType[res.data.page.list[i].type]
                this.tableData[i].isLeXiang = this.yesNo[res.data.page.list[i].isLeXiang]
                this.tableData[i].redPackage = this.yesNo[res.data.page.list[i].redPackage]
                var arr = res.data.page.list[i].sharePlatform.split(',')
                var newArr = []
                for (var j = 0; j < arr.length; j++) {
                  newArr.push(this.sharePlat[arr[j]])
                }
                this.tableData[i].sharePlatform = newArr.join(',')
              }
            } else {
              this.$message({
                type: 'error',
                message: res.data.msg
              })
            }
          }))// 请求列表
          .catch(() => {
            this.$message({
              type: 'info',
              message: '获取列表失败'
            })
          })
      },
      query: function () {
        this.requestParam.beginBeginTime = Moment(this.requestParam.beginBeginTime).format('YYYY-MM-DD HH:mm:ss')
        this.requestParam.endBeginTime = Moment(this.requestParam.endBeginTime).format('YYYY-MM-DD HH:mm:ss')
        this.requestParam.beginEndTime = Moment(this.requestParam.beginEndTime).format('YYYY-MM-DD HH:mm:ss')
        this.requestParam.endEndTime = Moment(this.requestParam.endEndTime).format('YYYY-MM-DD HH:mm:ss')
        this.requestParam.beginAddTime = Moment(this.requestParam.beginAddTime).format('YYYY-MM-DD HH:mm:ss')
        this.requestParam.endAddTime = Moment(this.requestParam.endAddTime).format('YYYY-MM-DD HH:mm:ss')
        this.requestParam.cityName = this.requestParam.cityName.trim()
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
        this.$ajax.get('/electric/tActivitiesInfo/interface/list', {params: this.requestParam})
          .then((res) => {
            if (res.data.code === 0) {
              this.tableData = res.data.page.list
              this.pagination.count = res.data.page.count
              for (var i = 0; i < res.data.page.list.length; i++) {
                this.tableData[i].state = this.activeState[res.data.page.list[i].state]
                this.tableData[i].isExecuting = this.executingState[res.data.page.list[i].isExecuting]
                this.tableData[i].type = this.activityType[res.data.page.list[i].type]
                this.tableData[i].isLeXiang = this.yesNo[res.data.page.list[i].isLeXiang]
                this.tableData[i].redPackage = this.yesNo[res.data.page.list[i].redPackage]
                var arr = res.data.page.list[i].sharePlatform.split(',')
                var newArr = []
                for (var j = 0; j < arr.length; j++) {
                  newArr.push(this.sharePlat[arr[j]])
                }
                this.tableData[i].sharePlatform = newArr.join(',')
              }
            } else {
              this.$message({
                type: 'error',
                message: res.data.msg
              })
            }
          })// 请求列表
          .catch(() => {
            this.$message({
              type: 'info',
              message: '获取列表失败'
            })
          })
      },
      deleteRecord: function (id) {
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (id !== undefined) {
            // 调用后台服务
            // 删除元素
            this.$ajax.get('/electric/tActivitiesInfo/interface/delete', {params: {'id': id}})
              .then((res) => {
                if (res.data.code === 0) {
                  // 删除成功
                  this.$message({
                    type: 'success',
                    message: res.data.msg
                  })
//                this.$refs['formA'].resetFields()
                  // 刷新页面
                  this.query()
                } else {
                  this.$message({
                    type: 'error',
                    message: res.data.msg
                  })
                }
              }, function (err) {
                console.log(err)
                this.$message({
                  type: 'error',
                  message: '操作失败'
                })
              }.bind(this))
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消删除'
          })
        })
      },
      handleClick (tab, event) {
        console.log(tab, event)
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
      },
      handleSizeChange: function (val) {
        this.requestParam.pageSize = val
        this.query()
      },
      handleCurrentChange: function (val) {
        this.requestParam.pageNo = val
        this.query()
      },
      modifyRecord: function (scope) {
        this.vif = false
        this.dialogFormVisible = true
        this.$ajax.get('electric/inmobidisplay/tDisplayType/interface/form', {params: {id: scope.row.id}})
          .then(function (res) {
            if (res.status === 200) {
              console.log(res.data)
              this.form.id = res.data.tDisplayType.id
              this.form.cityName = res.data.tDisplayType.cityName
              this.form.rank = res.data.tDisplayType.rank
              this.form.type = res.data.tDisplayType.type
              this.form.displayType = res.data.tDisplayType.displayType
              this.form.androidInmobiId = res.data.tDisplayType.androidInmobiId
              this.form.iosInmobiId = res.data.tDisplayType.iosInmobiId
              this.form.remarks = res.data.tDisplayType.remarks
            }
          }.bind(this))
      },
      doModify (formName) {       // 修改确定功能
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dialogFormVisible = false
            this.form.areaNames = this.checkedCities.join(',')
            this.checkedCities = []
            this.$ajax.get('electric/inmobidisplay/tDisplayType/interface/save', {params: this.form}).then(function (res) {
              if (res.status === 200) {
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
                  message: res.data.msg
                })
              }
            }.bind(this), function () {
              this.$message({
                type: 'error',
                message: '操作失败'
              })
            }.bind(this))
          } else {
            return false
          }
        })
      },
      cancelOperate: function () {
        this.dialogFormVisible = false
        this.form = {
          cityName: '',
          rank: '',
          type: '',
          displayType: '',
          androidInmobiId: '',
          iosInmobiId: '',
          remarks: '',
          areaNames: ''
        }
        this.$refs['formA'].resetFields()
      },
      more: function (row, column, cell, event) {
        if (column.property !== 'cityName') {
          return false
        } else {
          this.moreFormVisible = true
          this.$ajax.get('electric/inmobidisplay/tDisplayType/interface/view_form', {params: {id: row.id}}).then(function (res) {
            if (res.data.code === 0) {
              this.moreInfo.type = this.typeObj[res.data.tDisplayType.type]
              this.moreInfo.displayType = this.disObj[res.data.tDisplayType.displayType]
              this.moreInfo.cityName = res.data.tDisplayType.cityName
              this.moreInfo.androidInmobiId = res.data.tDisplayType.androidInmobiId
              this.moreInfo.iosInmobiId = res.data.tDisplayType.iosInmobiId
              this.moreInfo.rank = res.data.tDisplayType.rank
              this.moreInfo.remarks = res.data.tDisplayType.remarks
            }
          }.bind(this)).catch(function (err) {
            this.$message({
              type: 'error',
              message: err.data.msg
            })
          })
        }
      },
      cancelMore: function () {
        this.moreFormVisible = false
      },
      addNewRecord: function () {
        this.dialogFormVisible = true
        this.vif = true
        this.checkedCities = []
        this.form = {
          id: '',
          cityName: '',
          rank: '',
          type: '',
          displayType: '',
          androidInmobiId: '',
          iosInmobiId: '',
          remarks: '',
          areaNames: ''
        }
        this.$ajax.get('electric/inmobidisplay/tDisplayType/interface/findMaxSort')
          .then(function (res) {
            console.log(res)
            if (res.status === 200) {
              this.form.rank = res.data.maxSort
            } else {
              this.$message({
                type: 'error',
                message: res.data.msg
              })
            }
          }.bind(this), function () {
            this.$message({
              type: 'error',
              message: '获取失败'
            })
          })
      },
      exportFile: function () {
        this.exportFormVisible = true
      },
      cancelExport: function () {
        this.exportFormVisible = false
      },
      exportCurrent: function () {
        this.$refs['FileForm'].setAttribute('action', 'http://172.16.20.235:10001/a/electric/inmobidisplay/tDisplayType/interface/export')
        this.$refs['FileForm'].setAttribute('method', 'get')
        this.$refs['FileForm'].submit()
      },
      exportAll: function () {
        this.exportParam.pageSize = ''
        this.exportParam.pageNo = ''
        this.$refs['FileForm'].setAttribute('action', 'http://172.16.20.235:10001/a/electric/inmobidisplay/tDisplayType/interface/exportAll')
        this.$refs['FileForm'].setAttribute('method', 'post')
        this.$refs['FileForm'].submit()
      },
      onFocus (scope) {
        this.focusId = scope.row.id
        this.focusRank = scope.row.rank
      },
      modifyOrder (val) {
        this.modifyRank = val
        console.log(this.focusId, val)
        var obj = this.modifyOrders.find(item => item.id === this.focusId)
        if (val !== undefined && val.trim() !== '') {
          if (this.focusRank === val) {  // 修改的值是原始的值
            // 判断该记录的id 是否已经存在
            if (obj !== undefined) {
              this.modifyOrders.pop(obj)
            }
          } else {
            if (obj !== undefined) {
              obj.rank = val
            } else {
              this.modifyOrders.push({'id': this.focusId, 'rank': val})
            }
          }
        } else {
          if (obj !== undefined) {
            this.modifyOrders.pop(obj)
          }
        }
      },
      doModifyOrder () {
//        this.vm.$ajax(
//          {
//            method: 'post',
//            url: 'http://172.16.20.235:10001/a/electric/inmobidisplay/tDisplayType/interface/updateSort',
//            data: this.tableData,
//            headers: {
//              'Content-Type': 'multipart/form-data'
//            }
//          }
//        ).then(function (res) {
//          this.$message({
//            message: res.data,
//            type: 'success'
//          })
//          console.log(res.data)
//        }).catch(function (error) {
//          console.log(error)
//        })
        if (this.modifyOrders === [] || this.modifyOrders === undefined) {
          return
        }
        // post 到后台
        let ids = []
        let sorts = []
        let newids = []
        let newsorts = []
        this.modifyOrders.forEach(function (value, index) {
          ids.push(value.id)
          sorts.push(value.rank)
          newids = ids.join(',')
          newsorts = sorts.join(',')
        })
        this.$ajax.get('electric/inmobidisplay/tDisplayType/interface/updateSort', {
          params: {
            'ids': newids,
            'sorts': newsorts
          }
        })
          .then(function (res) {
            this.$message({
              message: res.data.msg,
              type: 'success'
            })
            this.query()
          }.bind(this))
          .catch(function (err) {
            this.$message({
              message: err.data.msg,
              type: 'error'
            })
          })
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

  .active {
    color: #20a0ff;
  }
</style>
