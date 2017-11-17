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
            <el-input v-model.trim="requestParam.cityName">
            </el-input>
          </el-form-item>

          <el-form-item label="生效时间:">
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
          <el-form-item label="展示时间:">
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
          <el-form-item label="添加时间:">
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
            <el-button type="primary" @click="exportFile">导出</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addNewRecord">新增</el-button>
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
        <!--表格-->
        <el-table
          :data="tableData"
          style="width: 100%"
          border
          @cell-click="more"
          stripe>
          <el-table-column
            prop="id"
            label="id"
            show-overflow-tooltip
            v-if=0
          >
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="cityName"
            label="城市名称"
            fixed="left"
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
              <el-input v-model=scope.row.sort @focus="onFocus(scope)" @change="modifyOrder"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="type"
            label="活动类型"
            width="120">
          </el-table-column>
          <!--功能不展示-->
          <!--<el-table-column-->
          <!--header-align="center"-->
          <!--align="center"-->
          <!--prop="bikeLimit"-->
          <!--label="车辆活动状态"-->
          <!--width="130">-->
          <!--</el-table-column>-->
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
            show-overflow-tooltip
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
            sortable
            width="175">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="endTime"
            label="失效时间"
            sortable
            width="175">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="showTime"
            label="展示时间"
            sortable
            width="175">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="hideTime"
            label="隐藏时间"
            sortable
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
        <div v-if="modifyRank.trim() !== ''">
          <el-button type="info" size="small" @click="doModifyOrder">保存排序</el-button>
        </div>
        <div v-else>
          <el-button type="info" size="small" @click="doModifyOrder" :disabled="true">保存排序</el-button>
        </div>
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
      <!--赳赳乐享活动修改添加-->
      <el-tab-pane :label='title' name="second" class="second">

        <el-form ref="formA" :model="form" :rules="rules" label-width="150px">

          <el-form-item label="活动描述:" prop="description">
            <el-input v-model="form.description"></el-input>
          </el-form-item>

          <el-form-item label="活动类型:" prop='type'>
            <el-select v-model="form.type" clearable class="selectInput" @change="onActivityTypeChange">
              <el-option v-for="(val,key) in activityType" v-bind:key=key :label=activityType[key]
                         :value=key></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="是否乐享活动:" prop='isLeXiang'>
            <el-select v-model="form.isLeXiang" clearable class="selectInput"
            >
              <el-option v-for="(val,key) in yesNo" v-bind:key=key :label=yesNo[key]
                         :value=key></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="限制信用分:" prop='creditLimit'>
            <el-input v-model="form.creditLimit"></el-input>
            <span>可以参与活动的最小信用分</span>
          </el-form-item>


          <el-form-item label="封面图片:">
            <el-input v-model="form.imgPath" v-show='false'></el-input>
            <img width="100%" :src="form.imgPath" alt="图片">
            <el-upload
              ref="uploadFile"
              list-type="picture-card"
              action='http://jjdcjavaweb.oss-cn-shanghai.aliyuncs.com'
              :data="Token"
              :on-remove="removeImgPath"
              :before-upload="beforeUploadImgPath">
              <el-button type="primary" @click="clearUploadedImgPath">上传图片
                <i class="el-icon-upload el-icon--right"></i>
              </el-button>
            </el-upload>
          </el-form-item>

          <el-form-item label="展示顺序:" prop='sort'>
            <el-input v-model="form.sort"></el-input>
          </el-form-item>
          <el-form-item label="活动链接:" prop='activityPath'>
            <el-input v-model="form.activityPath"></el-input>
          </el-form-item>
          <div v-if="video">
            <el-form-item label="视频链接:">
              <el-input v-model="form.videoPath"></el-input>
            </el-form-item>

            <el-form-item label="视频封面:" prop='coverPath'>
              <el-input v-model="form.coverPath" v-show='false'></el-input>
              <div v-show="form.coverPath">
                <img :src="form.coverPath" alt="视频封面">
              </div>
              <!--<img :src="form.coverPath" alt="视频封面">-->
              <el-upload
                ref="upload"
                list-type="picture-card"
                action='http://jjdcjavaweb.oss-cn-shanghai.aliyuncs.com'
                :on-remove="removeCoverPath"
                :data="Token1"
                :before-upload="beforeUploadCoverPath">
                <el-button type="primary" @click="clearUploadedCoverPath">上传图片
                  <i class="el-icon-upload el-icon--right"></i>
                </el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="有无红包:">
              <el-select v-model="form.redPackage" clearable class="selectInput">
                <el-option v-for="(val,key) in yesNo" v-bind:key=key :label=yesNo[key]
                           :value=key></el-option>
              </el-select>
            </el-form-item>
          </div>
          <el-form-item label="分享平台:">
            <el-checkbox-group v-model="formList" @change="onCheckboxChange" ref='checkShare'>
              <el-checkbox v-for="(val,key) in sharePlat" v-bind:key=key :label=sharePlat[key] :value=key
              ></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <div v-if='enjoy'>
            <el-form-item label="分享标题:" prop='shareTitle'>
              <el-input v-model="form.shareTitle"></el-input>
            </el-form-item>
            <el-form-item label="分享图片链接:" prop='sharePic'>
              <el-input v-model="form.sharePic"></el-input>
            </el-form-item>
            <el-form-item label="分享链接:" prop='shareUrl'>
              <el-input v-model="form.shareUrl"></el-input>
            </el-form-item>
            <el-form-item label="分享内容:" prop='shareContent'>
              <el-input v-model="form.shareContent"></el-input>
            </el-form-item>
          </div>
          <el-form-item label="是否默认:">
            <el-select v-model="form.state" clearable class="selectInput"
                       @change="onActivityStateChange">
              <el-option v-for="(val,key) in activeState" v-bind:key=key :label=activeState[key]
                         :value=key></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="城市名称:" prop="cityName">
            <el-input v-model="form.cityName"></el-input>
            <span v-if="add">添加模式下，城市的添加以《快速添加到城市》的选项为准</span>
          </el-form-item>
          <el-form-item label="有效日期:">
            <el-date-picker
              v-model="form.beginTime"
              type="datetime">
            </el-date-picker>
            -
            <el-date-picker
              v-model="form.endTime"
              type="datetime">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="展示日期:">
            <el-date-picker
              v-model="form.showTime"
              type="datetime">
            </el-date-picker>
            -
            <el-date-picker
              v-model="form.hideTime"
              type="datetime">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="添加时间:">
            <el-date-picker
              v-model="form.addTime"
              type="datetime">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="更新时间:">
            <el-date-picker
              v-model="form.updateTime"
              type="datetime">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="备注:">
            <el-input v-model="form.remarks" type="textarea" class='textarea'></el-input>
          </el-form-item>

          <el-checkbox class='check-all' v-if='add' :indeterminate="isIndeterminate" v-model="checkAll"
                       @change="handleCheckAllChange">快速添加城市：
          </el-checkbox>
          <el-form-item v-if="add" style="text-align: left;">
            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
              <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <div class="footer">
          <el-button type="primary" @click="doModify('formA')" v-if=saveUp>保存</el-button>
          <el-button type="primary" @click="back">返回</el-button>
        </div>

      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script>
  import Moment from 'moment'
  import baseUrl from '../../utils/baseUrl.js'
  const cityOptions = ['成都市', '湖州市', '北京市', '深圳市', '厦门市', '佛山市', '珠海市']
  export default {
    created: function () {
      this.list()
    },
    data () {
      return {
        pic: false,
        checkAll: true,
        checkedCities: [],
        cities: cityOptions,
        isIndeterminate: true,
        add: false,
        saveUp: false,
        imgPathUrl: '',
        enjoy: false, //  分享
        video: true, // 参与车辆状态 视屏链接 视屏封面 有无红包显示隐藏
        activeState: {}, // 是否默认
        executingState: {}, // 生效状态
        activityType: {}, // 活动类型
        yesNo: {}, // 乐享 红包
        sharePlat: {}, // 分享平台
        value1: '',
        activeName2: 'first',
        title: '赳赳乐享活动添加',
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
        form: {},
        formList: [],
        tableData: [],
        dialogFormVisible: false,  // 增加修改是否显示
        moreFormVisible: false,   // 详情
        exportFormVisible: false,
        addLoading: false,       // 是否显示loading
        formLabelWidth: '80px',
        rules: {
          cityName: [
            {required: true, message: '请输入城市名称', trigger: 'blur'}
          ],
          description: [
            {required: true, message: '请输入活动描述', trigger: 'blur'}
          ],
          type: [
            {required: true, message: '请输入活动类型', trigger: 'blur'}
          ],
          isLeXiang: [
            {required: true, message: '请选择是否乐享活动', trigger: 'change'}
          ],
          creditLimit: [
            {required: true, message: '请输入限制信用分', trigger: 'blur'}
          ],
          imgPath: [
            {required: true, message: '请选择封面图片', trigger: 'change'}
          ],
          sort: [
            {required: true, message: '请输入展示顺序', trigger: 'blur'}
          ],
          activityPath: [
            {required: true, message: '请输入活动链接', trigger: 'blur'}
          ],
          coverPath: [
            {required: true, message: '请选择视频封面', trigger: 'change'}
          ],
          shareTitle: [
            {required: true, message: '请输入分享标题', trigger: 'blur'}
          ],
          sharePic: [
            {required: true, message: '请选择分享图片链接', trigger: 'change'}
          ],
          shareUrl: [
            {required: true, message: '请输入分享链接', trigger: 'blur'}
          ],
          shareContent: [
            {required: true, message: '请输入分享内容', trigger: 'blur'}
          ]
        },
        pagination: {pageSizes: [30, 40, 60, 100], pageSize: 30, count: 0, pageNo: 1},
        exportParam: {
          type: '',
          redPackage: '',
          share: [],
          sharePlatform: '',
          state: '',
          isExecuting: '',
          cityName: '',
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
        modifyRank: '',
        Token: {},
        Token1: {},
        tempCityName: ''
      }
    },
    methods: {
      handleClick (tab, event) {
        if (tab.label === '赳赳乐享活动添加') {
          this.addNewRecord()
        }
      },
      list: function () {
        this.$ajax.get('activity/enjoy/activeState', {params: {type: 'activity_state'}})
          .then((res) => {
            for (let i = 0; i < res.data.length; i++) {
              this.activeState[res.data[i].value] = res.data[i].label
            }
            this.$ajax.get('activity/enjoy/executingState', {params: {type: 'black_list_is_executing'}})
              .then((res) => {
                for (let i = 0; i < res.data.length; i++) {
                  this.executingState[res.data[i].value] = res.data[i].label
                }
                this.$ajax.get('activity/enjoy/activityType', {params: {type: 'activitys_type'}})
                  .then((res) => {
                    for (let i = 0; i < res.data.length; i++) {
                      this.activityType[res.data[i].value] = res.data[i].label
                    }
                    this.$ajax.get('/activity/enjoy/yesNo', {params: {type: 'yes_no'}})
                      .then((res) => {
                        for (let i = 0; i < res.data.length; i++) {
                          this.yesNo[res.data[i].value] = res.data[i].label
                        }
                        this.$ajax.get('/activity/enjoy/sharePlat', {params: {type: 'share_platform'}})
                          .then((res) => {
                            for (let i = 0; i < res.data.length; i++) {
                              this.sharePlat[res.data[i].value] = res.data[i].label
                            }
                            this.getList()
                          })
                          .catch((error) => {
                            console.error('查询share_platform失败', error)
                            this.$message({
                              type: 'info',
                              message: '获取列表失败'
                            })
                          }) // yes_no
                      })
                      .catch((error) => {
                        console.error('查询yes_no失败', error)
                        this.$message({
                          type: 'info',
                          message: '获取列表失败'
                        })
                      })
                  })
                  .catch((error) => {
                    console.error('查询activitys_type失败', error)
                    this.$message({
                      type: 'info',
                      message: '获取列表失败'
                    })
                  })
              })
              .catch((error) => {
                console.error('查询black_list_is_executing失败', error)
                this.$message({
                  type: 'info',
                  message: '获取列表失败'
                })
              })
          })
          .catch((error) => {
            console.error('查询activity_state失败', error)
            this.$message({
              type: 'info',
              message: '获取列表失败'
            })
          })
      },
      getList () {
        this.$ajax.get('/activity/enjoy/list', {params: this.requestParam})
          .then((res) => {
            console.log(9999999)
            if (res.data.code === 0) {
              this.tableData = res.data.page.list
              this.pagination.count = res.data.page.count
              for (var i = 0; i < res.data.page.list.length; i++) {
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
        this.requestParam.beginBeginTime = Moment(this.requestParam.beginBeginTime).format('YYYY-MM-DD HH:mm:ss')
        this.requestParam.endBeginTime = Moment(this.requestParam.endBeginTime).format('YYYY-MM-DD HH:mm:ss')
        this.requestParam.beginEndTime = Moment(this.requestParam.beginEndTime).format('YYYY-MM-DD HH:mm:ss')
        this.requestParam.endEndTime = Moment(this.requestParam.endEndTime).format('YYYY-MM-DD HH:mm:ss')
        this.requestParam.beginAddTime = Moment(this.requestParam.beginAddTime).format('YYYY-MM-DD HH:mm:ss')
        this.requestParam.endAddTime = Moment(this.requestParam.endAddTime).format('YYYY-MM-DD HH:mm:ss')
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
      deleteRecord: function (id) {
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (id !== undefined) {
            // 调用后台服务
            // 删除元素
            this.$ajax.post('/activity/enjoy/delete', {params: {'id': id}})
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
              }, function () {
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
      exportFile: function () {
        this.exportFormVisible = true
      },
      cancelExport: function () {
        this.exportFormVisible = false
      },
      exportCurrent: function () {
        this.exportParam.pageNo = this.pagination.pageNo
        this.exportParam.pageSize = this.pagination.pageSize
//        http://116.231.74.120:10001/a/electric/tActivitiesInfo/interface/export
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
      },
      more: function (row, column, cell, event) {
        this.$refs['formA'].resetFields()
        if (column.property !== 'cityName') {
          return false
        } else {
          this.activeName2 = 'second'
          this.title = '赳赳乐享活动详情'
          this.pic = true
          this.add = false
          this.saveUp = false
          this.bike = true
          this.$ajax.get('/activity/enjoy/view/form', {params: {id: row.id}})
            .then((res) => {
              if (res.data.code === 0) {
                this.form = res.data.tActivitiesInfo
                if (res.data.tActivitiesInfo.sharePlatformList !== undefined && res.data.tActivitiesInfo.sharePlatformList.length > 0) {
                  for (let i = 0; i < res.data.tActivitiesInfo.sharePlatformList.length; i++) {
                    this.formList.push(this.sharePlat[res.data.tActivitiesInfo.sharePlatformList[i]])
                  }
                } else {
                  return
                }
              } else {
                this.$message({
                  type: 'error',
                  message: res.data.msg
                })
              }
            })
        }
      }, // 详情
      back () {
        this.activeName2 = 'first'
        this.title = '赳赳乐享活动添加'
      }, // 详情返回按钮
      modifyRecord (scope) {
        this.$refs['formA'].resetFields()
        this.pic = false
        this.activeName2 = 'second'
        this.saveUp = true
        this.add = false
        this.title = '赳赳乐享活动修改'
        this.formList = []
        this.$ajax.get('/activity/enjoy/form', {params: {id: scope.row.id}})
          .then((res) => {
            if (res.data.code === 0) {
              this.form = res.data.tActivitiesInfo
              console.log(this.form.imgPath)
              this.tempCityName = res.data.tActivitiesInfo.cityName
              if (res.data.tActivitiesInfo.sharePlatformList !== undefined && res.data.tActivitiesInfo.sharePlatformList.length > 0) {
                for (let i = 0; i < res.data.tActivitiesInfo.sharePlatformList.length; i++) {
                  this.formList.push(this.sharePlat[res.data.tActivitiesInfo.sharePlatformList[i]])
                }
                this.enjoy = true
              } else {
                this.enjoy = false
                return
              }
            } else {
              this.$message({
                type: 'error',
                message: res.data.msg
              })
            }
          })
          .catch((error) => {
            console.log('点击修改报错:', error)
            this.$message({
              type: 'error',
              message: '获取失败'
            })
          })
      }, // 修改
      onActivityTypeChange (value) {
        if (value === '1') {
          this.video = true
        } else {
          this.video = false
        }
      },
      onActivityStateChange (value) {
        if (value === '1') {
          this.form.cityName = 'default'
        } else {
          this.form.cityName = this.tempCityName
        }
      },
      doModify (formA) {       // 修改确定功能
        this.$refs[formA].validate((valid) => {
          if (valid) {
            this.activeName2 = 'first'
            this.form.sharePlatformList = []
            this.$ajax.get('/activity/enjoy/save', {params: this.form})
              .then(function (response) {
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
      onFocus (scope) {
        this.focusId = scope.row.id
        this.focusRank = scope.row.rank
      },
      modifyOrder (val) {
        this.modifyRank = val
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
        this.$ajax.get('/electric/tActivitiesInfo/interface/updateSort', {
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
      },
      handleCheckAllChange (event) {
        this.checkedCities = event.target.checked ? cityOptions : []
        this.isIndeterminate = false
      },
      handleCheckedCitiesChange (value) {
        let checkedCount = value.length
        this.checkAll = checkedCount === this.cities.length
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
      },
      addNewRecord: function () {
        this.$refs['formA'].resetFields()
        this.pic = false
        this.activeName2 = 'second'
        this.saveUp = true
        this.add = true
        this.title = '赳赳乐享活动添加'
        this.checkedCities = []
        this.form = {
          type: '',
          isLeXiang: '',
          redPackage: '',
          beginTime: '',
          endTime: '',
          showTime: '',
          hideTime: '',
          addTime: '',
          description: '',
          creditLimit: '',
          sort: '',
          activityPath: '',
          videoPath: '',
          formList: [],
          shareTitle: '',
          shareUrl: '',
          shareContent: '',
          state: '',
          cityName: '',
          updateTime: '',
          remarks: '',
          imgPath: ''
        }
        this.formList = []
        this.$refs.uploadFile.clearFiles()
        // todo
        this.$refs.upload.clearFiles()
        this.$ajax.get('/electric/tActivitiesInfo/interface/save')
          .then((res) => {
            if (res.data.code === 1) {
              this.form.sort = res.data.tActivitiesInfo.sort
            } else {
              this.$message({
                type: 'error',
                message: res.data.msg
              })
            }
          }, function () {
            this.$message({
              type: 'error',
              message: '请求失败'
            })
          }).catch(() => {
            this.$message({
              message: '请求显示顺序失败',
              type: 'info'
            })
          })
      }, // 新增
      onCheckboxChange (value) {
        if (value.length >= 1) {
          console.log(value.length)
          this.enjoy = true
        } else if (value.length < 1) {
          this.enjoy = false
        }
      },
      // 上传组件获取oss相关
      beforeUploadImgPath (file) {
        return new Promise((resolve) => {
          this.$ajax.get('beforeUpload/img', {params: {user_dir: 'tActivitiesInfo'}})
            .then((res) => {
              this.Token = res.data
              this.Token.key = this.Token.dir + '/' + (+new Date()) + file.name
              // oss上图片的路径 在表单体提交之前拼接
              this.form.imgPath = 'http://jjdcjavaweb.oss-cn-shanghai.aliyuncs.com/' + this.Token.key
              resolve()
            })
            .catch(err => {
              this.$message({
                message: err.data.msg,
                type: 'error'
              })
            })
        })
      },
      beforeUploadCoverPath (file) {
        return new Promise((resolve) => {
          this.$ajax.get('beforeUpload/img', {params: {user_dir: 'tActivitiesInfo'}})
            .then((res) => {
              this.Token1 = res.data
              this.Token1.key = this.Token1.dir + '/' + (+new Date()) + file.name
              // oss上图片的路径 在表单体提交之前拼接
              this.form.coverPath = 'http://jjdcjavaweb.oss-cn-shanghai.aliyuncs.com/' + this.Token1.key
              resolve()
            })
            .catch(err => {
              this.$message({
                message: err.data.msg,
                type: 'error'
              })
            })
        })
      },
      // 上传之前 清除原有图片
      clearUploadedImgPath () {
        // 如果有就清除
        if (this.form.imgPath) {
          this.$refs.uploadFile.clearFiles()
        }
        this.form.imgPath = ''
      },
      clearUploadedCoverPath () {
        // 如果有就清除
        if (this.form.coverPath) {
          this.$refs.upload.clearFiles()
        }
        this.form.coverPath = ''
      },
      // 移除图片时清空form表单中的图片地址
      removeImgPath () {
        this.form.imgPath = ''
      },
      removeCoverPath () {
        this.form.coverPath = ''
      }
    }
  }
</script>
<style scoped>
  /*图片开始*/
  img {
    width: 148px;
    height: 148px;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  /*图片结束 */
  .selectInput {
    width: 300px;
  }

  /*img{*/
  /*width: 100px;*/
  /*height:100px;*/
  /*}*/
  .check-all {
    width: 150px;
    float: left;
    padding-top: 6px;
  }

  .second .textarea, .second .el-input, .second .el-input__inner {
    width: 300px;
  }

  .demo-ruleForm {
    font-size: 20px !important;
    text-align: center;
  }

  p {
    color: red;
  }

  .active {
    color: #20a0ff;
    cursor: pointer;
  }

  .footer {
    margin-left: 200px;
  }
</style>
