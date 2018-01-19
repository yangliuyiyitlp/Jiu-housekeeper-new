<template>
  <div>
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <el-tab-pane label="广告内容信息" name="first">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="状态：">
            <el-select v-model="formInline.adStatus" clearable>
              <el-option v-for="(val,key) in adStatus" v-bind:key=key :label=val :value=key></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="位置：">
            <el-select v-model="formInline.type" clearable>
              <el-option v-for="(val,key) in type" v-bind:key=key :label=val :value=key></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="投放时间：">
            <el-date-picker
              v-model="formInline.display_time"
              @change="onBeginTimeChange"
              type="datetime">
            </el-date-picker>
            -
            <el-date-picker
              v-model="formInline.del_time"
              @change="onEndTimeChange"
              type="datetime">
            </el-date-picker>
          </el-form-item>
          <el-form-item v-if="hasPermission('advert/content/view')">
            <el-button type="primary" @click="query">查询</el-button>
          </el-form-item>
          <el-form-item v-if="hasPermission('advert/content/create')">
            <el-button type="primary" @click="addNewRecord">新增</el-button>
          </el-form-item>
        </el-form>
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            header-align="center"
            align="center"
            prop="id"
            label="广告ID">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            label="广告标题"
            prop="description">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="adStatus"
            label="状态">

          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="is_download"
            label="形式">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="type"
            label="位置">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="adDate"
            :show-overflow-tooltip = true
            label="投放日期">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="sort"
            label="展示顺序">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="updateByName"
            label="操作人">
          </el-table-column>
          <el-table-column
            v-if="hasPermission('advert/content/pause') || hasPermission('advert/content/update')"
            header-align="center"
            align="center"
            width="100"
            label="操作">
            <template slot-scope="scope">
              <el-button v-if="hasPermission('advert/content/pause')" @click="pauseRecord(scope.row)" type="text"
                         size="small">暂停
              </el-button>
              <el-button v-if="hasPermission('advert/content/update')" @click="modifyRecord(scope.row.id)" type="text"
                         size="small">修改
              </el-button>
            </template>
          </el-table-column>
        </el-table>
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

      <el-tab-pane :label="title" name="second" v-if="hasPermission('advert/content/create')">
        <!--<el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="ruleForm">-->
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
          <h2>广告素材</h2>
          <el-form-item label="广告标题：" prop="description">
            <el-input v-model="ruleForm.description" class="width" placeholder="请输入广告标题"></el-input>
          </el-form-item>
          <el-form-item label="投放时间：" prop="display_time">
            <el-date-picker
              v-model="ruleForm.display_time"
              @change="addBeginTimeChange"
              type="datetime">
            </el-date-picker>
            -
            <el-date-picker
              v-model="ruleForm.del_time"
              @change="addEndTimeChange"
              type="datetime">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="广告位置：" prop="type">
            <el-radio-group v-model="ruleForm.type" @change="handleCheckedPositionChange">
              <el-radio v-for="(val, key) in adCheckedPosition" :key="key" :label="key">{{val}}</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="广告图片：" prop="display_pic">
            <div v-show="Pic1">
              <el-input v-model="ruleForm.display_pic" v-show='false'></el-input>
                <img width="100%" :src="ruleForm.displayPic" alt="广告图片">
              <el-upload
                ref="adPic1"
                list-type="picture-card"
                action='http://jjdcjavaweb.oss-cn-shanghai.aliyuncs.com'
                :limit =1
                :data="Token2"
                :on-remove="removePic1"
                :on-success="successPic1"
                :before-upload="beforeUploadPic2">
                <el-button type="primary" @click="clearUploadedPic1">上传图片
                  <i class="el-icon-upload el-icon--right"></i>
                </el-button>
              </el-upload>
              {{imgSize}}
              <div>
                <el-radio-group v-model="ruleForm.show_type" @change="handleCheckedPic" prop="show_type">
                  <el-radio label="1">图片</el-radio>
                  <el-radio label="2" v-if="picType">GIF</el-radio>
                </el-radio-group>
              </div>
              <el-input v-model="ruleForm.gif_countdown" class="imgTime" v-if="gifTime"
                        placeholder="时长(单位s，为数字)" prop="gif_countdown"></el-input>
            </div>
          </el-form-item>

          <el-form-item label="展示顺序：" prop="sort">
            <el-input v-model="ruleForm.sort" class="width" placeholder="请输入展示顺序（数字格式）"></el-input>
          </el-form-item>
          <hr>
          <h2>广告受众</h2>
          <el-form-item label="地区：" prop="checkedCityArr">
            <div class="area">
              <input ref='keySearch' type='text' placeholder="输入关键字进行过滤" class='keySearch' v-model="filterText">
              <el-tree
                :data="selectSection"
                show-checkbox
                default-expand-all
                node-key="id"
                :default-checked-keys="checkedCity"
                ref="tree"
                class="treeWidth"
                accordion
                :filter-node-method="filterNode"
                @node-click="handleNode"
                :props="defaultProps">
              </el-tree>
            </div>
          </el-form-item>

          <el-form-item label="投放版本：" prop="checkedAdOs">
            <div class="treeIos">
              <p>ios投放版本：</p>
              <div class="areaAdOs">
                <el-tree
                  :data="selectAdOs"
                  show-checkbox
                  default-expand-all
                  node-key="id"
                  :default-checked-keys="checkedAdOs"
                  ref="treeIos"
                  class="treeAdOs"
                  accordion
                  :props="defaultCity">
                </el-tree>
              </div>
            </div>
            <div>
              <p>安卓投放版本：</p>
              <div class="areaAdOs">
                <el-tree
                  :data="selectAndroid"
                  show-checkbox
                  default-expand-all
                  node-key="id"
                  :default-checked-keys="checkedAndroid"
                  ref="treeAndroid"
                  class="treeAdOs"
                  accordion
                  :props="defaultCity">
                </el-tree>
              </div>
            </div>
          </el-form-item>
          <hr>
          <h2>广告详情</h2>
          <el-form-item label="投放形式：" prop="is_download">
            <el-radio-group v-model="ruleForm.is_download" @change="handleCheckedStyleArr">
              <el-radio v-for="(val, key) in adStyleObj" :key="key" :label="key">{{val}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <!--落地页-->
          <el-form-item label="落地页地址：" v-show="isLandingUrl" prop="action_url">
            <el-input v-model="ruleForm.action_url" class="widthUrl" placeholder="请输入H5页面链接"></el-input>
          </el-form-item>
          <!--应用下载-->
          <el-form-item label="下载形式：" prop="downloadWay" v-show="isDownloadWay">
            <el-radio-group v-model="ruleForm.downloadWay" @change="handleCheckedLoadWay">
              <el-radio v-for="(val, key) in downloadWayObj" :key="key" :label="key">{{val}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <!--应用下载-有下载页-->
          <el-form-item label="下载页地址：" v-show="isDownloadPageUrl" prop="action_url">
            <el-input v-model="ruleForm.action_url" class="widthUrl" placeholder="请输入下载页面地址"></el-input>
          </el-form-item>
          <!--应用下载-直接下载-->
          <el-form-item label="下载地址：" v-show="isDownloadUrl" prop="action_url">
            <el-input v-model="ruleForm.action_url" class="widthUrl" placeholder="请输入应用下载地址"></el-input>
          </el-form-item>
          <!--应用下载-使用模板-->
          <!--加上上面的下载地址-->
          <div v-if="isDownloadModule">
            <el-form-item label="应用展示图：" prop="top_img">
              <el-input v-model="ruleForm.top_img" v-show='false'></el-input>
              <img width="100%" :src="ruleForm.topImg" alt="应用展示图">
              <el-upload
                ref="top_img"
                list-type="picture-card"
                action='http://jjdcjavaweb.oss-cn-shanghai.aliyuncs.com'
                :data="Token2"
                :on-remove="removeSdkUrl"
                :on-success="successSdkUrl"
                :before-upload="beforeUploadPic2">
                <el-button type="primary" @click="clearUploadedSdkUrl">上传图片
                  <i class="el-icon-upload el-icon--right"></i>
                </el-button>
              </el-upload>
              尺寸：750*420
            </el-form-item>
            <el-form-item label="应用包名：" prop="sdk_Name">
              <el-input v-model="ruleForm.sdk_Name" class="width" placeholder="输入格式xxx_xxx_xxx包名"></el-input>
            </el-form-item>
            <el-form-item label="应用logo：" prop="logo_img">
              <el-input v-model="ruleForm.logo_img" v-show='false'></el-input>
              <img width="100%" :src="ruleForm.logoImg" alt="应用展示图">
              <el-upload
                ref="logoImg"
                list-type="picture-card"
                action='http://jjdcjavaweb.oss-cn-shanghai.aliyuncs.com'
                :data="Token2"
                :on-remove="removeSdkLogo"
                :on-success="successSdkLogo"
                :before-upload="beforeUploadPic2">
                <el-button type="primary" @click="clearUploadedSdkLogo">上传图片
                  <i class="el-icon-upload el-icon--right"></i>
                </el-button>
              </el-upload>
              尺寸：160*160
            </el-form-item>
            <el-form-item label="应用名称：" prop="title">
              <el-input v-model="ruleForm.title" class="width" placeholder="不超过9个中文字符"></el-input>
            </el-form-item>
            <el-form-item label="标签：" prop="sdkLabelArr">
              <el-checkbox-group v-model="sdkLabelArr" style="height:40px;">
                <el-checkbox v-for="(val, key) in sdkLabelObj" :key="val" :label="key">{{key}} <i class="el-icon-close" @click="iconDelete(val)"></i>
                </el-checkbox>
              </el-checkbox-group>
              <label>自定义标签：</label>
              <el-input v-model="label" class="width"></el-input>
              <button @click="iconAdd">保存</button>
            </el-form-item>
            <a v-show = false>{{handerClick}}</a>
            <el-form-item label="一句话简介：" prop="sec_title">
              <el-input v-model="ruleForm.sec_title" class="widthUrl" placeholder="不超过50个中文字符"></el-input>
            </el-form-item>
            <el-form-item label="版本号：" prop="version">
              <el-input v-model="ruleForm.version" class="width" placeholder="输入格式x.x.x.x版本号"></el-input>
            </el-form-item>
            <el-form-item label="安装包大小：" prop="install_Size">
              <el-input v-model="ruleForm.install_Size" class="width" placeholder="请输入安装包大小，例：15MB"></el-input>
            </el-form-item>

            <el-form-item label="预览图：" prop="viewImg1">
              <div class="viewImg">
                <el-input v-model="ruleForm.viewImg1" v-show='false'></el-input>
                <img width="100%" :src="ruleForm.viewImgFirst" alt="预览图">
                <el-upload
                  ref="viewImg1"
                  list-type="picture-card"
                  action='http://jjdcjavaweb.oss-cn-shanghai.aliyuncs.com'
                  :data="Token2"
                  :on-remove="removeViewImg1"
                  :on-success="successViewImg1"
                  :before-upload="beforeUploadPic2">
                  <el-button type="primary" @click="clearUploadedViewImg1">上传图片
                    <i class="el-icon-upload el-icon--right"></i>
                  </el-button>
                </el-upload>
                尺寸：636*636
              </div>
              <div class="viewImg">
                <el-input v-model="ruleForm.viewImg2" v-show='false'></el-input>
                <img width="100%" :src="ruleForm.viewImgSecond" alt="预览图">
                <el-upload
                  ref="viewImg2"
                  list-type="picture-card"
                  action='http://jjdcjavaweb.oss-cn-shanghai.aliyuncs.com'
                  :data="Token2"
                  :on-remove="removeViewImg2"
                  :on-success="successViewImg2"
                  :before-upload="beforeUploadPic2">
                  <el-button type="primary" @click="clearUploadedViewImg2">上传图片
                    <i class="el-icon-upload el-icon--right"></i>
                  </el-button>
                </el-upload>
                尺寸：636*636
              </div>
              <div class="viewImg">
                <el-input v-model="ruleForm.viewImg3" v-show='false'></el-input>
                <img width="100%" :src="ruleForm.viewImgThree" alt="预览图">
                <el-upload
                  ref="viewImg3"
                  list-type="picture-card"
                  action='http://jjdcjavaweb.oss-cn-shanghai.aliyuncs.com'
                  :data="Token2"
                  :on-remove="removeViewImg3"
                  :on-success="successViewImg3"
                  :before-upload="beforeUploadPic2">
                  <el-button type="primary" @click="clearUploadedViewImg3">上传图片
                    <i class="el-icon-upload el-icon--right"></i>
                  </el-button>
                </el-upload>
                尺寸：636*636
              </div>
              <div class="viewImg">
                <el-input v-model="ruleForm.viewImg4" v-show='false'></el-input>
                <img width="100%" :src="ruleForm.viewImgFour" alt="预览图">
                <el-upload
                  ref="viewImg4"
                  list-type="picture-card"
                  action='http://jjdcjavaweb.oss-cn-shanghai.aliyuncs.com'
                  :data="Token2"
                  :on-remove="removeViewImg4"
                  :on-success="successViewImg4"
                  :before-upload="beforeUploadPic2">
                  <el-button type="primary" @click="clearUploadedViewImg4">上传图片
                    <i class="el-icon-upload el-icon--right"></i>
                  </el-button>
                </el-upload>
                尺寸：636*636
              </div>
            </el-form-item>
            <el-form-item label="应用描述：" prop="textarea">
              <el-input
                type="textarea"
                autosize
                class="textarea"
                placeholder="请输入内容"
                v-model="ruleForm.textarea">
              </el-input>
              <!--Todo 富文本-->
            </el-form-item>
          </div>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">{{tip}}</el-button>
            <el-button @click="resetForm('ruleForm')">重置所有</el-button>
            <el-button @click="back">返回</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import Cookie from 'js-cookie'
  import a from '../../assets/js/getsessionId.js'
  import baseUrl from '../../utils/baseUrl'

  export default {
    data () {
      return {
        selectSection: [],
        filterText: '',
        filterId: '',
        activeName2: 'first',
//        create: true,
        Pic1: true,
        title: '广告内容新增',
        adStatus: {'': '全部', '1': '投放中', '0': '未开始', '2': '已结束', '3': '已暂停'},
        type: {'': '全部', '6': '开屏', '4': '活动条', '5': '二级弹框', '14': '骑行结束页'},
        showFlag: '',
        tip: '立即创建',
//        updateDelete: true,
        Token2: {},
        tableData: [],
        checkedPosition: [],
        adCheckedPosition: {'6': '开屏', '4': '活动条', '5': '二级弹框', '14': '骑行结束页'},
        adCheckedPic: {'1': '图片', '2': 'GIF'},
        imgSize: '尺寸：750*1334',
        checkedCity: [],
        selectAdOs: [],
        checkedAdOs: [],
        selectAndroid: [],
        checkedAndroid: [],
        adStyleObj: {'0': '落地页', '1': '应用下载'},
        downloadWayObj: {'0': '有下载页', '1': '使用模板', '2': '直接下载'},
        isLandingUrl: true,
        isDownloadWay: false,
        isDownloadPageUrl: false,
        isDownloadUrl: false,
        isDownloadModule: false,
        gifTime: false,
        picType: false,
        positionVal: '',
        picVal: '',
        sdkUrlToken: {},
        sdkLogoToken: {},
        sdkLabelObj: {},
        label: '',
        sdkLabelArr: [],
        formInline: {
          pageSize: 30,
          pageNo: 1
        },
        ruleForm: {},
        rules: {
          description: [{required: true, message: '请输入广告标题', trigger: 'blur'}],
          display_time: [{required: true, message: '请选择投放时间'}],
          type: [{required: true, message: '请选择广告位置', trigger: 'blur'}],
          display_pic: [{required: true, message: '请上传广告图片', trigger: 'blur'}],
          sort: [{required: true, message: '请输入展示顺序', trigger: 'blur'}],
          is_download: [{required: true, message: '请选择投放形式', trigger: 'blur'}],
          action_url: [{required: true, message: '请输入地址', trigger: 'blur'}],
          downloadWay: [{required: true, message: '请选择下载形式', trigger: 'blur'}],
          sdk_Name: [{required: true, message: '请输入应用包名', trigger: 'blur'}],
          top_img: [{required: true, message: '请上传图片', trigger: 'blur'}],
          logo_img: [{required: true, message: '请上传logo', trigger: 'blur'}],
          title: [{required: true, message: '请输入应用名称', trigger: 'blur'}],
          sec_title: [{required: true, message: '请输入一句话简介', trigger: 'blur'}],
          version: [{required: true, message: '请输入版本号', trigger: 'blur'}],
          install_Size: [{required: true, message: '请输入安装包大小', trigger: 'blur'}],
          viewImg1: [{required: true, message: '请上传预览图', trigger: 'blur'}],
          sdkLabelArr: [{required: true, message: '请选择标签', trigger: 'blur'}],
          checkedAdOs: [{required: true, message: '请选择投放版本'}],
          checkedCityArr: [{required: true, message: '请选择地区'}],
          textarea: [{required: true, message: '请输入应用描述'}]
        },
        fileList2: [],
        handerClick: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        defaultCity: {
          children: 'children',
          label: 'version'
        },
        pagination: {pageSizes: [30, 40, 60, 100], pageSize: 30, count: 0, pageNo: 1},
        adminId: '',
        path: '',
        permissionList: []
      }
    },
    created () {
      // 请求按钮权限
      this.adminId = this.$route.query.adminId
      this.path = this.$route.path
      a.sessionId(this.adminId, this.path, this.$router, this.$ajax, this.permissionList)
      this.selectCity()
      this.iconList()
      this.selectVersion()
//      if (this.hasPermission('advert/content/create')) {
//        this.create = true
//      } else {
//        this.create = false
//      }
//      if (this.hasPermission('advert/content/update')) {
//        this.updateDelete = true
//      } else {
//        this.updateDelete = false
//      }
    },
    watch: {
      filterText (val) {
        this.$refs.tree.filter(val)
      }
    },
    methods: {
      onBeginTimeChange (val) {
        this.formInline.display_time = val
      },
      onEndTimeChange (val) {
        this.formInline.del_time = val
      },
      addBeginTimeChange (val) {
        this.ruleForm.display_time = val
      },
      addEndTimeChange (val) {
        this.ruleForm.del_time = val
      },
      hasPermission (data) {
        if (this.permissionList && this.permissionList.length && this.permissionList.includes(data)) {
          return true
        }
        return false
      },
      handleClick () {
        if (this.activeName2 === 'first' && this.create) {
          this.title = '广告内容新增'
        } else if (this.title === '广告内容新增') {
          this.ruleForm = {}
//          this.checkedCity = []
          this.checkedAdOs = []
          this.checkedAndroid = []
          this.sdkLabelArr = []
          this.tip = '立即创建'
          this.$refs.ruleForm.resetFields()
          this.$refs.adPic1.clearFiles()
          if (this.$refs.top_img !== undefined && this.$refs.top_img !== '') {
            this.$refs.top_img.clearFiles()
          }
          if (this.$refs.logoImg !== undefined && this.$refs.logoImg !== '') {
            this.$refs.logoImg.clearFiles()
          }
          if (this.$refs.viewImg1 !== undefined && this.$refs.viewImg1 !== '') {
            this.$refs.viewImg1.clearFiles()
          }
          if (this.$refs.viewImg2 !== undefined && this.$refs.viewImg2 !== '') {
            this.$refs.viewImg2.clearFiles()
          }
          if (this.$refs.viewImg3 !== undefined && this.$refs.viewImg3 !== '') {
            this.$refs.viewImg3.clearFiles()
          }
          if (this.$refs.viewImg4 !== undefined && this.$refs.viewImg4 !== '') {
            this.$refs.viewImg4.clearFiles()
          }
          if (this.$refs.viewImg !== undefined && this.$refs.viewImg !== '') {
            this.$refs.viewImg.clearFiles()
          }
          this.$refs.tree.setCheckedKeys([])
          this.$refs.treeIos.setCheckedKeys([])
          this.$refs.treeAndroid.setCheckedKeys([])
        }
      },
      handleSizeChange (val) {
        this.formInline.pageSize = val
        this.pagination.pageSize = val
        this.query()
      },
      handleCurrentChange (val) {
        this.formInline.pageNo = val
        this.pagination.pageNo = val
        this.query()
      },
      filterNode (value, data) {
        if (!value) return true
        return data.name.indexOf(value) !== -1
      },
      handleNode (data) {
        this.filterText = data.name // 弹框树模型点击输入值
        this.filterId = data.id // 弹框树模型点击输入值
      },
      selectCity () {
        this.$ajax.get(`${baseUrl.advertContentHei}/district/list`, {params: {timeout: 3000}})
          .then((res) => {
            if (res.data.code === 200) {
              this.selectSection = res.data.data
            } else {
              this.$message({
                type: 'info',
                message: res.data.msg
              })
            }
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '地区列表获取异常'
            })
          })
      },
      selectVersion () {
        this.$ajax.get(`${baseUrl.advertContentHei}/version/list`, {params: {'pdId': 0, timeout: 3000}})
          .then((res) => {
            let result = res.data.data
            if (res.data.code === 200 && result.ios_versions && result.android_versions) {
              this.selectAdOs = result.ios_versions
              this.selectAndroid = result.android_versions
            } else {
              this.$message({
                type: 'info',
                message: res.data.msg
              })
            }
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '版本列表获取异常'
            })
          })
      },
      query () {
        if (this.formInline.display_time > this.formInline.del_time) {
          alert('开始时间不能晚于结束时间')
          return
        }
        this.$ajax.get(`${baseUrl.advertContentHei}/ad/list`, {params: this.formInline, timeout: 3000})
          .then((res) => {
            if (res.data.code === 200) {
              let resultForm = res.data.data
              this.tableData = resultForm.result
              this.pagination.count = resultForm.total
              // 状态  形式 位置
              for (let i = 0; i < resultForm.result.length; i++) {
                this.tableData[i].adStatus = this.adStatus[resultForm.result[i].adStatus]
                this.tableData[i].type = this.type[resultForm.result[i].type]
                this.tableData[i].is_download = this.adStyleObj[resultForm.result[i].is_download]
                if (resultForm.result[i].display_time && resultForm.result[i].del_time) {
                  this.tableData[i].adDate = resultForm.result[i].display_time + '—' + resultForm.result[i].del_time
                }
              }
            } else {
              this.$message({
                type: 'error',
                message: '获取列表失败'
              })
            }
          })
          .catch(() => {
            this.$message({
              type: 'error',
              message: '获取列表异常'
            })
          })
      },
      addNewRecord () {
        this.activeName2 = 'second'
        this.title = '广告内容新增'
        this.tip = '立即创建'
        this.ruleForm = {}
        this.checkedAdOs = []
        this.checkedAndroid = []
        this.sdkLabelArr = []
        this.$refs.ruleForm.resetFields()
        this.$refs.adPic1.clearFiles()
        if (this.$refs.top_img !== undefined && this.$refs.top_img !== '') {
          this.$refs.top_img.clearFiles()
        }
        if (this.$refs.logoImg !== undefined && this.$refs.logoImg !== '') {
          this.$refs.logoImg.clearFiles()
        }
        if (this.$refs.viewImg1 !== undefined && this.$refs.viewImg1 !== '') {
          this.$refs.viewImg1.clearFiles()
        }
        if (this.$refs.viewImg2 !== undefined && this.$refs.viewImg2 !== '') {
          this.$refs.viewImg2.clearFiles()
        }
        if (this.$refs.viewImg3 !== undefined && this.$refs.viewImg3 !== '') {
          this.$refs.viewImg3.clearFiles()
        }
        if (this.$refs.viewImg4 !== undefined && this.$refs.viewImg4 !== '') {
          this.$refs.viewImg4.clearFiles()
        }
        if (this.$refs.viewImg !== undefined && this.$refs.viewImg !== '') {
          this.$refs.viewImg.clearFiles()
        }
        this.$refs.tree.setCheckedKeys([])
        this.$refs.treeIos.setCheckedKeys([])
        this.$refs.treeAndroid.setCheckedKeys([])
      }, // 新增
      pauseRecord (row) {
        console.log(row.adStatus)
        if (row.adStatus === '投放中' || row.adStatus === '未开始') {
          this.$ajax.get(`${baseUrl.advertContentHei}/ad/pause`, {params: {pauseId: row.id}})
            .then(res => {
              if (res.data.code === 200) {
                this.query()
              } else {
                this.$message({
                  type: 'error',
                  message: res.data.msg
                })
              }
            }).catch(() => {
              this.$message({
                type: 'error',
                message: '状态修改失败'
              })
            })
        } else {
          alert('只有投放中或未开始状态可以暂停')
        }
      }, // 暂停
      modifyRecord (id) {
        this.activeName2 = 'second'
        this.create = true
        this.title = '广告内容修改'
        this.tip = '提交修改'
        this.getMore(id)
      }, // 修改
      back () {
        this.activeName2 = 'first'
        if (this.create) {
          this.title = '广告内容新增'
        }
      },
      resetForm (ruleForm) {
        this.ruleForm = {}
        this.checkedAdOs = []
        this.checkedAndroid = []
        this.sdkLabelArr = []
        this.$refs.ruleForm.resetFields()
        this.$refs.adPic1.clearFiles()
        if (this.$refs.top_img !== undefined && this.$refs.top_img !== '') {
          this.$refs.top_img.clearFiles()
        }
        if (this.$refs.logoImg !== undefined && this.$refs.logoImg !== '') {
          this.$refs.logoImg.clearFiles()
        }
        if (this.$refs.viewImg1 !== undefined && this.$refs.viewImg1 !== '') {
          this.$refs.viewImg1.clearFiles()
        }
        if (this.$refs.viewImg2 !== undefined && this.$refs.viewImg2 !== '') {
          this.$refs.viewImg2.clearFiles()
        }
        if (this.$refs.viewImg3 !== undefined && this.$refs.viewImg3 !== '') {
          this.$refs.viewImg3.clearFiles()
        }
        if (this.$refs.viewImg4 !== undefined && this.$refs.viewImg4 !== '') {
          this.$refs.viewImg4.clearFiles()
        }
        if (this.$refs.viewImg !== undefined && this.$refs.viewImg !== '') {
          this.$refs.viewImg.clearFiles()
        }
        this.$refs.tree.setCheckedKeys([])
        this.$refs.treeIos.setCheckedKeys([])
        this.$refs.treeAndroid.setCheckedKeys([])
      },
      getMore (id) {
        this.$ajax.get(`${baseUrl.advertContentHei}/ad/show`, {params: {id: id, timeout: 4000}})
          .then(res => {
            if (res.data.code === 200) {
              let resultData = res.data.data
              this.ruleForm = resultData
              // 下载形式显示对应的
              if (resultData.downloadWay === '0') {
                this.isDownloadPageUrl = true
                this.isDownloadUrl = false
                this.isDownloadModule = false
              } else if (resultData.downloadWay === '1') {
                this.isDownloadPageUrl = false
                this.isDownloadUrl = true
                this.isDownloadModule = true
              } else if (resultData.downloadWay === '2') {
                this.isDownloadPageUrl = false
                this.isDownloadUrl = true
                this.isDownloadModule = false
              }
              // 图片展示
              this.ruleForm.displayPic = resultData.display_pic
              this.ruleForm.topImg = resultData.top_img
              this.ruleForm.logoImg = resultData.logo_img
              let imgArr = []
              if (resultData.rev_img) {
                imgArr = resultData.rev_img.split(';')
                console.log('imgArr', imgArr)
                if (imgArr[0]) {
                  this.ruleForm.viewImgFirst = imgArr[0]
                  this.ruleForm.viewImg1 = imgArr[0]
                } if (imgArr[1]) {
                  this.ruleForm.viewImgSecond = imgArr[1]
                } if (imgArr[2]) {
                  this.ruleForm.viewImgThree = imgArr[2]
                } if (imgArr[3]) {
                  this.ruleForm.viewImgFour = imgArr[3]
                }
              }
              // 地区
              if (resultData.district_ids) {
                this.checkedCity = resultData.district_ids.split(',')
                this.$refs.tree.setCheckedKeys(this.checkedCity)
              }
              console.log('checkedCity', this.checkedCity)
              // 版本
              if (resultData.ios_versions) {
                this.checkedAdOs = resultData.ios_versions.split(',')
                this.$refs.treeIos.setCheckedKeys(this.checkedAdOs)
                console.log('checkedAdOs', this.checkedAdOs)
              }
              if (resultData.android_versions) {
                this.checkedAndroid = resultData.android_versions.split(',')
                this.$refs.treeAndroid.setCheckedKeys(this.checkedAndroid)
                console.log('checkedAndroid', this.checkedAndroid)
              }
              // 标签
              let labelArr = resultData.tag.split(',')
//              for (let j = 0; j < labelArr.length; j++) {
//                if (this.sdkLabelObj[labelArr[j]] !== undefined && this.sdkLabelObj[labelArr[j]] !== '') {
//                  this.sdkLabelArr.push(this.sdkLabelObj[labelArr[j]])
//                }
//                console.log('sdkLabelObj', this.sdkLabelObj)
//                console.log('sdkLabelArr', this.sdkLabelArr)
//              }
              this.sdkLabelArr = labelArr
            } else {
              this.$message({
                type: 'error',
                message: res.data.msg
              })
            }
          }).catch((err) => {
            console.log(err)
            this.$message({
              type: 'error',
              message: '查询异常' + err
            })
          })
      }, // 获取详情
      submitForm (ruleForm) {
        // 标签
        this.ruleForm.tag = this.sdkLabelArr.join(',')
        this.ruleForm.sdkLabelArr = this.ruleForm.tag // 默认被选中的值用于字段校验必填
        // 获取地区
        let treeArr = this.$refs.tree.getCheckedKeys()
        this.ruleForm.checkedCityArr = treeArr // 地区默认被选中的值用于字段校验必填
        if (treeArr.indexOf('426') !== -1) {
          this.ruleForm.city_name = '426'
        } else {
          this.ruleForm.city_name = treeArr.join(',')
        }
        // 获取版本
        let treeIosArr = this.$refs.treeIos.getCheckedKeys()
        this.ruleForm.checkedAdOs = treeIosArr // 投放版本默认被选中的值用于字段校验必填
        this.ruleForm.ios_versions = treeIosArr.join(',')
        let treeAndroidArr = this.$refs.treeAndroid.getCheckedKeys()
        this.ruleForm.android_versions = treeAndroidArr.join(',')

//        let treeIosArr = this.$refs.treeIos.getCheckedNodes()
//        this.ruleForm.checkedAdOs = treeIosArr // 投放版本默认被选中的值用于字段校验必填
//        let newIosArr = []
//        for (let i = 0; i < treeIosArr.length; i++) {
//          newIosArr.push(treeIosArr[i].name)
//        }
//        this.ruleForm.ios_versions = newIosArr.join(',')
//        let treeAndroidArr = this.$refs.treeAndroid.getCheckedNodes()
//        let newAndroidArr = []
//        for (let i = 0; i < treeAndroidArr.length; i++) {
//          newAndroidArr.push(treeAndroidArr[i].name)
//        }
//        this.ruleForm.android_versions = newAndroidArr.join(',')
        // 预览图4张图
        let recImg = [this.ruleForm.viewImg1, this.ruleForm.viewImg2, this.ruleForm.viewImg3, this.ruleForm.viewImg4]
        let recImgArr = []
        for (let j = 0; j < recImg.length; j++) {
          if (recImg[j] !== undefined && recImg[j] !== '') {
            recImgArr.push(recImg[j])
          }
        }
        this.ruleForm.rev_img = recImgArr.join(';')
        this.ruleForm.update_by = Cookie.get('adminId')
        // 请求
        console.log(this.ruleForm)
        this.$refs[ruleForm].validate((valid) => {
          let url = `${baseUrl.advertContent}/adDetails/addAdDetails`
          if (valid) {
//            if (this.ruleForm.id === undefined || this.ruleForm.id === '') {
//              url = `${baseUrl.advertContent}/adDetails/addAdDetails` // 新增功能
//              console.log(77)
//            } else {
//              url = `${baseUrl.cityFencingUrl}/update`
//            }
            this.$ajax.post(url, this.ruleForm)
              .then(response => {
                if (response.data.code === 200) {
                  // 更新成功
                  this.$message({
                    type: 'success',
                    message: response.data.msg
                  })
                  this.ruleForm = {}
                  this.back()
                  // 刷新页面
                  this.query()
                } else {
                  this.$message({
                    type: 'error',
                    message: '提交失败'
                  })
                }
              })
              .catch(() => {
                this.$message({
                  type: 'error',
                  message: '提交异常'
                })
              })
          } else {
            return
          }
        })
      },
      handleCheckedPositionChange (val) {
        console.log(val)
        this.positionVal = val
        if (this.positionVal === '4') {
          this.picType = true
          this.imgSize = '尺寸：640*100'
        } else if (this.positionVal === '4' && this.picVal === '2') {
          this.picType = true
          this.gifTime = true
        } else if (this.positionVal === '5') {
          this.imgSize = '尺寸：636*636'
          this.gifTime = false
          this.picType = false
        } else if (this.positionVal === '6') {
          this.imgSize = '尺寸：750*1334'
          this.gifTime = false
          this.picType = false
        } else if (this.positionVal === '14') {
          this.imgSize = '尺寸：690*370'
          this.gifTime = false
          this.picType = false
        }
      },
      handleCheckedPic (val) {
        console.log(val)
        this.picVal = val
        if (this.picVal === '2') {
          console.log(11, val)
          this.gifTime = true
        } else {
          this.gifTime = false
        }
      },
      iconList () {
        this.sdkLabelObj = {}
        return new Promise((resolve) => {
          this.$ajax.post(`${baseUrl.advertContent}/sysDict/findDictList`, {type: 'addict', timeout: 3000})
            .then(response => {
              if (response.data.code === 200) {
                let result = response.data.data
                for (let i = 0; i < result.length; i++) {
                  this.sdkLabelObj[result[i].label] = result[i].id
                }
                this.handerClick.push(1)
                this.handerClick.pop()
              } else {
                this.$message({
                  type: 'error',
                  message: '获取标签失败'
                })
              }
              resolve()
            })
            .catch(() => {
              this.$message({
                type: 'error',
                message: '获取标签异常'
              })
            })
        })
//        this.sdkLabelObj = {}
//        this.$ajax.post(`${baseUrl.advertContent}/sysDict/findDictList`, {type: 'addict', timeout: 3000})
//          .then(response => {
//            if (response.data.code === 200) {
//              let result = response.data.data
//              for (let i = 0; i < result.length; i++) {
//                this.sdkLabelObj[result[i].label] = result[i].id
//              }
//            } else {
//              this.$message({
//                type: 'error',
//                message: '获取标签失败'
//              })
//            }
//          })
//          .catch(() => {
//            this.$message({
//              type: 'error',
//              message: '获取标签异常'
//            })
//          })
      },
      iconDelete (val) {
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(val)
//          let index = this.sdkLabelArr.indexOf(val)
//          if (index > -1) {
//          let id = this.sdkLabelObj[val]
          this.$ajax.post(`${baseUrl.advertContent}/sysDict/deletDict`, {id: val, timeout: 3000})
            .then(res => {
              if (res.data.code === 200) {
                this.$message({
                  type: 'success',
                  message: '标签删除成功'
                })
                this.iconList()
              }
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '标签删除失败'
              })
            })
//          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消删除'
          })
        })
      }, // 标签删除
      iconAdd () {
        if (this.label === '') {
          alert('请填写新标签')
          return false
        }
        let valueLabel = this.label + new Date().getTime()
        this.$ajax.post(`${baseUrl.advertContent}/sysDict/addDict`, {label: this.label, value: valueLabel, createBy: Cookie.get('adminId'), timeout: 3000})
          .then(response => {
            if (response.data.code === 200) {
              this.iconList()
              this.label = ''
              this.$message({
                type: 'success',
                message: '添加标签成功'
              })
            } else {
              this.$message({
                type: 'error',
                message: '添加标签失败'
              })
            }
          })
          .catch(() => {
            this.$message({
              type: 'error',
              message: '添加标签异常'
            })
          })
      },
      handleCheckedStyleArr (val) {
        if (val === '0') {
          this.isLandingUrl = true
          this.isDownloadWay = false
          this.isDownloadPageUrl = false
          this.isDownloadUrl = false
          this.isDownloadModule = false
        } else if (val === '1') {
          this.isLandingUrl = false
          this.isDownloadWay = true
          this.isDownloadPageUrl = true
          this.isDownloadUrl = false
          this.isDownloadModule = false
        }
      }, // 投放形式
      handleCheckedLoadWay (val) {
        if (val === '0') {
          this.isDownloadPageUrl = true
          this.isDownloadUrl = false
          this.isDownloadModule = false
        } else if (val === '1') {
          this.isDownloadPageUrl = false
          this.isDownloadUrl = true
          this.isDownloadModule = true
        } else if (val === '2') {
          this.isDownloadPageUrl = false
          this.isDownloadUrl = true
          this.isDownloadModule = false
        }
      },
      beforeUploadPic2 (file) {
        return new Promise((resolve) => {
          this.$ajax.get(`${baseUrl.mainUrl}/electric/ossutil/interface/policy`, {params: {user_dir: 'advertContent'}})
            .then((res) => {
              console.log(2222, res)
              this.Token2 = res.data
              this.Token2.OSSAccessKeyId = res.data.accessid
              this.Token2.key = this.Token2.dir + '/' + (+new Date()) + file.name
              console.log(this.Token2)
              resolve()
            })
            .catch(() => {
              this.$message({
                message: '图片秘钥获取失败',
                type: 'error'
              })
            })
        })
      }, // 公用
      successPic1 (response, file, fileList) {
//        successImg(this.ruleForm.display_pic, this.Token1.key)
        this.ruleForm.display_pic = 'http://jjdcjavaweb.oss-cn-shanghai.aliyuncs.com/' + this.Token2.key
      },
      successSdkUrl (response, file, fileList) {
        this.ruleForm.top_img = 'http://jjdcjavaweb.oss-cn-shanghai.aliyuncs.com/' + this.Token2.key
      },
      successSdkLogo (response, file, fileList) {
        this.ruleForm.logo_img = 'http://jjdcjavaweb.oss-cn-shanghai.aliyuncs.com/' + this.Token2.key
      },
      successViewImg1 (response, file, fileList) {
        this.ruleForm.viewImg1 = 'http://jjdcjavaweb.oss-cn-shanghai.aliyuncs.com/' + this.Token2.key
      },
      successViewImg2 (response, file, fileList) {
        this.ruleForm.viewImg2 = 'http://jjdcjavaweb.oss-cn-shanghai.aliyuncs.com/' + this.Token2.key
      },
      successViewImg3 (response, file, fileList) {
        this.ruleForm.viewImg3 = 'http://jjdcjavaweb.oss-cn-shanghai.aliyuncs.com/' + this.Token2.key
      },
      successViewImg4 (response, file, fileList) {
        this.ruleForm.viewImg4 = 'http://jjdcjavaweb.oss-cn-shanghai.aliyuncs.com/' + this.Token2.key
      },
      // 上传之前 清除原有图片
      clearUploadedPic1 (val) {
//        clearUploadedImg(this.ruleForm.display_pic, this.$refs.adPic1)
        if (this.ruleForm.display_pic) {
          this.$refs.adPic1.clearFiles()
        }
        this.ruleForm.display_pic = ''
      },
      clearUploadedSdkUrl () {
        // 如果有就清除
        if (this.ruleForm.top_img) {
          this.$refs.top_img.clearFiles()
        }
        this.ruleForm.top_img = ''
      },
      clearUploadedSdkLogo () {
        if (this.ruleForm.logo_img) {
          this.$refs.logo_img.clearFiles()
        }
        this.ruleForm.logo_img = ''
      },
      clearUploadedViewImg1 () {
        if (this.ruleForm.viewImg1) {
          this.$refs.viewImg1.clearFiles()
        }
        this.ruleForm.viewImg1 = ''
      },
      clearUploadedViewImg2 () {
        if (this.ruleForm.viewImg2) {
          this.$refs.viewImg2.clearFiles()
        }
        this.ruleForm.viewImg2 = ''
      },
      clearUploadedViewImg3 () {
        if (this.ruleForm.viewImg3) {
          this.$refs.viewImg3.clearFiles()
        }
        this.ruleForm.viewImg3 = ''
      },
      clearUploadedViewImg4 () {
        if (this.ruleForm.viewImg4) {
          this.$refs.viewImg4.clearFiles()
        }
        this.ruleForm.viewImg4 = ''
      },
      // 移除图片时清空form表单中的图片地址
      removePic1 () {
        this.ruleForm.display_pic = ''
      },
      removeSdkUrl () {
        this.ruleForm.top_img = ''
      },
      removeSdkLogo () {
        this.ruleForm.logo_img = ''
      },
      removeViewImg1 () {
        this.ruleForm.viewImg1 = ''
      },
      removeViewImg2 () {
        this.ruleForm.viewImg2 = ''
      },
      removeViewImg3 () {
        this.ruleForm.viewImg3 = ''
      },
      removeViewImg4 () {
        this.ruleForm.viewImg4 = ''
      }
    }
  }

//  function searchRole (result, checkedRoles) {
//    for (let i = 0; i < result.length; i++) {
//      let item = result[i]
//      if (item.children !== undefined && item.children.length > 0) {
//        // 递归
//        searchRole(item.children, checkedRoles)
//      }
//      if (item.roleId && item.roleId) {
//        let arr = checkedRoles.push(item.id)
//        return arr
//      }
//    }
//  }
</script>
<style scoped>
  .textarea{
    width:350px;
  }
  /*图片开始*/
  img {
    width: 148px;
    height: 148px;
  }

  .widthUrl {
    width: 400px;
  }

  .viewImg {
    float: left;
    margin-right:20px;
  }

  .imgTime {
    width: 140px;
  }

  .keySearch {
    padding: 5px;
    width: 188px;
  }

  .treeWidth {
    width: 200px;
    height: 300px;
    overflow: auto;
    border-radius: 4px;
    border: 1px solid #bfcbd9;
    padding: 3px 5px;
    box-sizing: border-box;
  }

  .treeAdOs {
    width: 110px;
    height: 150px;
    overflow: auto;
    border-radius: 4px;
    border: 1px solid #bfcbd9;
    padding: 3px 0px 3px 5px;
    box-sizing: border-box;
  }

  .treeIos {
    float: left;
    margin-right: 50px;
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

  .el-dialog__header {
    text-align: center;
  }

  .ruleForm > .el-form-item > .el-form-item__label {
    width: 200px !important;
  }

  .ruleForm > .el-form-item > .el-form-item__content {
    margin-left: 200px !important;
  }

  .area {
    width: 202px;
  }

  .saveArea {
    float: right;
    cursor: pointer;
    color: #fff;
    background-color: #20a0ff;
    border-color: #20a0ff;
    border-radius: 4px;
    padding: 0px;
  }

  a {
    color: red;
  }

  .el-icon-close {
    font-size: 3px !important;
    color: red;
  }
</style>
