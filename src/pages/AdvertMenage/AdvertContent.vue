<template>
  <div>
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <el-tab-pane label="广告内容信息" name="first">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="状态：">
            <el-select v-model="formInline.adStatus" clearable>
              <el-option v-for="(val,key) in adStatus" v-bind:key=key :label=adStatus[key] :value=key></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="位置：">
            <el-select v-model="formInline.type" clearable>
              <el-option v-for="(key,val) in type" v-bind:key=key :label=type[key] :value=key></el-option>
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
            prop="download_type"
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
            prop="adPeople"
            label="操作人">
          </el-table-column>
          <el-table-column
            v-if='updateDelete'
            header-align="center"
            align="center"
            width="100"
            label="操作">
            <template slot-scope="scope">
              <el-button v-if="hasPermission('advert/content/pause')" @click="pauseRecord(scope.row)" type="text"
                         size="small">{{pauseTip}}
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

      <el-tab-pane :label="title" name="second" v-if="create">
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
              v-model="formInline.del_time"
              @change="addEndTimeChange"
              type="datetime">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="广告位置：" prop="checkedPosition">
            <el-radio-group v-model="checkedPosition">
              <el-radio v-for="val in adCheckedPosition" :key="val" :label="val">{{val}}</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="广告图片：" prop="adPic">
            <div v-show="Pic1">
              <el-input v-model="ruleForm.display_pic" v-show='false'></el-input>
              <img width="100%" :src="ruleForm.display_pic" alt="广告图片">
              <el-upload
                ref="adPic1"
                list-type="picture-card"
                action='http://jjdcjavaweb.oss-cn-shanghai.aliyuncs.com'
                :data="Token2"
                :on-remove="removePic1"
                :on-success="successPic1"
                :before-upload="beforeUploadPic2">
                <el-button type="primary" @click="clearUploadedPic1">上传图片
                  <i class="el-icon-upload el-icon--right"></i>
                </el-button>
              </el-upload>
              尺寸：750*1334
              <div>
                <el-radio-group v-model="checkedPic1" @change="handleCheckedPositionChange">
                  <el-radio v-for="val in adCheckedPic1" :key="val" :label="val">{{val}}</el-radio>
                </el-radio-group>
              </div>
              <el-input v-model="ruleForm.gif_countdown" class="imgTime" placeholder="时长(单位s)"></el-input>
              <a>只有选择GIF才可以选择</a>
            </div>
          </el-form-item>

          <el-form-item label="展示顺序：" prop="sort">
            <el-input v-model="ruleForm.sort" class="width" placeholder="请输入展示顺序"></el-input>
          </el-form-item>
          <hr>
          <h2>广告受众</h2>
          <el-form-item label="地区：" prop="checkedCity">
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
              <button @click="getCheckedKeys" class="saveArea">保存地区</button>
            </div>
          </el-form-item>

          <el-form-item label="投放平台：" prop="CheckedAdOs">
            <el-checkbox-group v-model="CheckedAdOs" @change="handleCheckedPositionChange">
              <el-checkbox v-for="val in adCheckedAdOs" :key="val" :label="val">{{val}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="投放版本：" prop="appVosing">
            <el-checkbox-group v-model="appVosing" @change="handleCheckedPositionChange">
              <el-checkbox v-for="val in app_versions" :key="val" :label="val">{{val}}</el-checkbox>
            </el-checkbox-group>
            <!--<label>新增版本号：</label>-->
            <!--<el-input v-model="ruleForm.autoDisplayTimes" class="width"></el-input>-->
            <!--<button>确定</button>-->
          </el-form-item>
          <hr>
          <h2>广告详情</h2>
          <el-form-item label="投放形式：" prop="styleArr">
            <el-radio-group v-model="styleArr" @change="handleCheckedStyleArr">
              <el-radio v-for="val in adStyleArr" :key="val" :label="val">{{val}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <!--落地页-->
          <el-form-item label="落地页地址：" v-show="isLandingUrl" prop="action_url">
            <el-input v-model="ruleForm.action_url" class="width" placeholder="请输入H5页面链接"></el-input>
          </el-form-item>
          <!--应用下载-->
          <el-form-item label="下载形式：" prop="loadWayArr" v-show="isDownloadWay">
            <el-radio-group v-model="loadWayArr" @change="handleCheckedLoadWay">
              <el-radio v-for="val in downloadWayArr" :key="val" :label="val">{{val}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <!--应用下载-有下载页-->
          <el-form-item label="下载页地址：" v-show="isDownloadPageUrl" prop="action_url">
            <el-input v-model="ruleForm.action_url" class="width" placeholder="请输入下载页面地址"></el-input>
          </el-form-item>
          <!--应用下载-直接下载-->
          <el-form-item label="下载地址：" v-show="isDownloadUrl" prop="action_url">
            <el-input v-model="ruleForm.action_url" class="width" placeholder="请输入应用下载地址"></el-input>
          </el-form-item>
          <!--应用下载-使用模板-->
          <!--加上上面的下载地址-->
          <div v-show="isDownloadModule">
            <el-form-item label="应用展示图：">
              <el-input v-model="ruleForm.top_img" v-show='false'></el-input>
              <img width="100%" :src="ruleForm.top_img" alt="应用展示图">
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
            <el-form-item label="应用包名：" prop="sdkName">
              <el-input v-model="ruleForm.sdkName" class="width" placeholder="输入格式xxx_xxx_xxx包名"></el-input>
            </el-form-item>
            <el-form-item label="应用logo：">
              <el-input v-model="ruleForm.logo_img" v-show='false'></el-input>
              <img width="100%" :src="ruleForm.logo_img" alt="应用展示图">
              <el-upload
                ref="logo_img"
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
            <el-form-item label="应用名称：" prop="appName">
              <el-input v-model="ruleForm.appName" class="width" placeholder="不超过9个中文字符"></el-input>
            </el-form-item>
            <el-form-item label="标签：" prop="labelArr">
              <el-checkbox-group v-model="labelArr" @change="handleCheckedPositionChange">
                <el-checkbox v-for="val in sdkLabelArr" :key="val" :label="val">{{val}} <i class="el-icon-close"
                                                                                           @click="iconDelete(val)"></i>
                </el-checkbox>
              </el-checkbox-group>
              <label>自定义标签：</label>
              <el-input v-model="sdkLabel" class="width"></el-input>
              <button @click="iconAdd">保存</button>
            </el-form-item>
            <el-form-item label="一句话简介：" prop="sdkAbstract">
              <el-input v-model="ruleForm.sdkAbstract" class="width" placeholder="不超过50个中文字符"></el-input>
            </el-form-item>
            <el-form-item label="版本号：" prop="version">
              <el-input v-model="ruleForm.version" class="width" placeholder="输入格式x.x.x.x版本号"></el-input>
            </el-form-item>
            <el-form-item label="安装包大小：" prop="install_package">
              <el-input v-model="ruleForm.install_package" class="width" placeholder="请输入安装包大小，例：15MB"></el-input>
            </el-form-item>
            <el-form-item label="预览图：">
              <div class="viewImg">
                <el-input v-model="ruleForm.viewImg1" v-show='false'></el-input>
                <img width="100%" :src="ruleForm.viewImg1" alt="预览图">
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
                <el-input v-model="ruleForm.viewImg" v-show='false'></el-input>
                <img width="100%" :src="ruleForm.viewImg" alt="预览图">
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
                <img width="100%" :src="ruleForm.viewImg3" alt="预览图">
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
                <img width="100%" :src="ruleForm.viewImg4" alt="预览图">
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
            <el-form-item label="应用描述：">
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
        create: true,
        Pic1: true,
        title: '广告内容新增',
        adStatus: {'0': '全部', '1': '投放中', '2': '未开始', '3': '已结束', '4': '已暂停'},
        type: {'0': '全部', '6': '开屏', '4': '活动条', '5': '二级弹框', '14': '骑行结束页'},
        showFlag: '',
        tip: '立即创建',
        pauseTip: '暂停',
        updateDelete: '',
        Token2: {},
        tableData: [{'id': 22}],
        checkedPosition: [],
        adCheckedPosition: ['开屏', '活动条', '二级弹框', '骑行结束页'],
        checkedPic1: [],
        adCheckedPic1: ['图片', 'GIF'],
        checkedCity: [],
        adCheckedAdOs: ['Andriod', 'iOS'],
        CheckedAdOs: [],
        appVosing: [],
        app_versions: ['1.2', '2.5'],
        styleArr: [],
        adStyleArr: ['落地页', '应用下载'],
        adStyleObj: {'0': '落地页', '1': '应用下载'},
        downloadWayArr: ['有下载页', '使用模板', '直接下载'],
        isLandingUrl: true,
        isDownloadWay: false,
        isDownloadPageUrl: false,
        isDownloadUrl: false,
        isDownloadModule: false,
        sdkUrlToken: {},
        loadWayArr: [],
        sdkLogoToken: {},
        labelArr: [],
        sdkLabelArr: ['游戏', '仙侠'],
        sdkLabelObj: {},
        sdkLabel: '',
        formInline: {},
        ruleForm: {},
        rules: {
          description: [{required: true, message: '请输入广告标题', trigger: 'blur'}],
          display_time: [{required: true, message: '请选择投放时间', trigger: 'blur'}],
          checkedPosition: [{required: true, message: '请选择广告位置', trigger: 'blur'}],
          sort: [{required: true, message: '请输入展示顺序', trigger: 'blur'}],
          CheckedAdOs: [{required: true, message: '请选择投放平台', trigger: 'blur'}],
          appVosing: [{required: true, message: '请选择投放版本', trigger: 'blur'}],
          styleArr: [{required: true, message: '请选择投放形式', trigger: 'blur'}],
          action_url: [{required: true, message: '请输入地址', trigger: 'blur'}],
          loadWayArr: [{required: true, message: '请选择下载形式', trigger: 'blur'}],
//          action_url: [{required: true, message: '请输入下载页地址', trigger: 'blur'}],
//          action_url: [{required: true, message: '请输入下载地址', trigger: 'blur'}],
          sdkName: [{required: true, message: '请输入应用包名', trigger: 'blur'}],
          appName: [{required: true, message: '请输入应用名称', trigger: 'blur'}],
          labelArr: [{required: true, message: '请选择标签', trigger: 'blur'}],
          sdkAbstract: [{required: true, message: '请输入一句话简介', trigger: 'blur'}],
          version: [{required: true, message: '请输入版本号', trigger: 'blur'}],
          install_package: [{required: true, message: '请输入安装包大小', trigger: 'blur'}]
        },
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        pagination: {pageSizes: [30, 40, 60, 100], pageSize: 30, count: 0, pageNo: 1},
        adminId: '',
        path: '',
        permissionList: ['advert/content/view', 'advert/content/create', 'advert/content/update', 'advert/content/pause']
      }
    },
    created () {
      // 请求按钮权限
      this.adminId = this.$route.query.adminId
      this.path = this.$route.path
      a.sessionId(this.adminId, this.path, this.$router, this.$ajax, this.permissionList)
//      this.selectCity()
//      this.iconList()
      if (this.hasPermission('advert/content/create')) {
        this.create = true
      } else {
        this.create = false
      }
      if (this.hasPermission('advert/content/update') || this.hasPermission('advert/content/pause')) {
        this.updateDelete = true
      } else {
        this.updateDelete = false
      }
    },
    watch: {
      filterText (val) {
        this.$refs.tree.filter(val)
      }
    },
    methods: {
      onBeginTimeChange (val) {
        this.formInline.display_time = new Date(val).getTime()
      },
      onEndTimeChange (val) {
        this.formInline.del_time = new Date(val).getTime()
      },
      addBeginTimeChange (val) {
        this.ruleForm.display_time = new Date(val).getTime()
      },
      addEndTimeChange (val) {
        this.ruleForm.del_time = new Date(val).getTime()
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
          this.tip = '立即创建'
          this.$refs.ruleForm.resetFields()
          this.$refs.adPic1.clearFiles()
//          this.$refs.adPic2.clearFiles()
//          this.$refs.adPic3.clearFiles()
//          this.$refs.adPic4.clearFiles()
          this.$refs.top_img.clearFiles()
          this.$refs.logo_img.clearFiles()
          this.$refs.viewImg1.clearFiles()
          this.$refs.viewImg2.clearFiles()
          this.$refs.viewImg3.clearFiles()
          this.$refs.viewImg4.clearFiles()
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
        this.selectSection = [{
          'id': '1',
          'parentId': '0',
          'parentIds': '0,',
          'name': '上海市总公司',
          'sort': 10,
          'areaId': '1',
          'code': '100000',
          'type': '1',
          'grade': '1',
          'address': '',
          'zipCode': '',
          'master': '',
          'phone': '',
          'fax': '',
          'email': '',
          'useable': '1',
          'primaryPerson': '',
          'deputyPerson': '',
          'createBy': '1',
          'createDate': 1369584000000,
          'updateBy': '1',
          'updateDate': 1496764800000,
          'remarks': '',
          'delFlag': '0',
          'children': [{
            'id': '33',
            'parentId': '1',
            'parentIds': '0,1,',
            'name': '上海分公司',
            'sort': 30,
            'areaId': '13',
            'code': '100000009',
            'type': '1',
            'grade': '2',
            'address': '',
            'zipCode': '',
            'master': '',
            'phone': '',
            'fax': '',
            'email': '',
            'useable': '1',
            'primaryPerson': '',
            'deputyPerson': '',
            'createBy': '1',
            'createDate': 1497888000000,
            'updateBy': '1',
            'updateDate': 1502265256000,
            'remarks': '',
            'delFlag': '0',
            'children': [{
              'id': '55',
              'parentId': '33',
              'parentIds': '0,1,33,',
              'name': '宝山区政府',
              'sort': 30,
              'areaId': '21',
              'code': '100000009009',
              'type': '2',
              'grade': '3',
              'address': '',
              'zipCode': '',
              'master': '',
              'phone': '',
              'fax': '',
              'email': '',
              'useable': '1',
              'primaryPerson': '',
              'deputyPerson': '',
              'createBy': '1',
              'createDate': 1505444156000,
              'updateBy': '1',
              'updateDate': 1505444156000,
              'remarks': '',
              'delFlag': '0',
              'children': []
            }, {
              'id': '34',
              'parentId': '33',
              'parentIds': '0,1,33,',
              'name': '城市运营',
              'sort': 30,
              'areaId': '13',
              'code': '100000009001',
              'type': '2',
              'grade': '3',
              'address': '',
              'zipCode': '',
              'master': '',
              'phone': '',
              'fax': '',
              'email': '',
              'useable': '1',
              'primaryPerson': '',
              'deputyPerson': '',
              'createBy': '1',
              'createDate': 1497888000000,
              'updateBy': '1',
              'updateDate': 1501516800000,
              'remarks': '',
              'delFlag': '0',
              'children': []
            }, {
              'id': '45',
              'parentId': '33',
              'parentIds': '0,1,33,',
              'name': '黄浦区政府',
              'sort': 30,
              'areaId': '24',
              'code': '',
              'type': '2',
              'grade': '3',
              'address': '',
              'zipCode': '',
              'master': '',
              'phone': '',
              'fax': '',
              'email': '',
              'useable': '1',
              'primaryPerson': '',
              'deputyPerson': '',
              'createBy': '1',
              'createDate': 1504070206000,
              'updateBy': '1',
              'updateDate': 1504070206000,
              'remarks': '',
              'delFlag': '0',
              'children': []
            }, {
              'id': '56',
              'parentId': '33',
              'parentIds': '0,1,33,',
              'name': '松江区政府',
              'sort': 30,
              'areaId': '26',
              'code': '100000009010',
              'type': '2',
              'grade': '3',
              'address': '',
              'zipCode': '',
              'master': '',
              'phone': '',
              'fax': '',
              'email': '',
              'useable': '1',
              'primaryPerson': '',
              'deputyPerson': '',
              'createBy': '1',
              'createDate': 1505444183000,
              'updateBy': '1',
              'updateDate': 1505444183000,
              'remarks': '',
              'delFlag': '0',
              'children': []
            }, {
              'id': '57',
              'parentId': '33',
              'parentIds': '0,1,33,',
              'name': '杨浦区政府',
              'sort': 30,
              'areaId': '18',
              'code': '100000009011',
              'type': '2',
              'grade': '3',
              'address': '',
              'zipCode': '',
              'master': '',
              'phone': '',
              'fax': '',
              'email': '',
              'useable': '1',
              'primaryPerson': '',
              'deputyPerson': '',
              'createBy': '1',
              'createDate': 1505444214000,
              'updateBy': '1',
              'updateDate': 1505444214000,
              'remarks': '',
              'delFlag': '0',
              'children': []
            }, {
              'id': '58',
              'parentId': '33',
              'parentIds': '0,1,33,',
              'name': '徐汇区政府',
              'sort': 30,
              'areaId': '16',
              'code': '100000009012',
              'type': '2',
              'grade': '3',
              'address': '',
              'zipCode': '',
              'master': '',
              'phone': '',
              'fax': '',
              'email': '',
              'useable': '1',
              'primaryPerson': '',
              'deputyPerson': '',
              'createBy': '1',
              'createDate': 1505444231000,
              'updateBy': '1',
              'updateDate': 1505444231000,
              'remarks': '',
              'delFlag': '0',
              'children': []
            }, {
              'id': '59',
              'parentId': '33',
              'parentIds': '0,1,33,',
              'name': '长宁区政府',
              'sort': 30,
              'areaId': '17',
              'code': '100000009013',
              'type': '2',
              'grade': '3',
              'address': '',
              'zipCode': '',
              'master': '',
              'phone': '',
              'fax': '',
              'email': '',
              'useable': '1',
              'primaryPerson': '',
              'deputyPerson': '',
              'createBy': '1',
              'createDate': 1505444293000,
              'updateBy': '1',
              'updateDate': 1505444301000,
              'remarks': '',
              'delFlag': '0',
              'children': []
            }, {
              'id': '49',
              'parentId': '33',
              'parentIds': '0,1,33,',
              'name': '虹口区政府',
              'sort': 30,
              'areaId': '25',
              'code': '100000009003',
              'type': '2',
              'grade': '3',
              'address': '',
              'zipCode': '',
              'master': '',
              'phone': '',
              'fax': '',
              'email': '',
              'useable': '1',
              'primaryPerson': '',
              'deputyPerson': '',
              'createBy': '1',
              'createDate': 1505385789000,
              'updateBy': '1',
              'updateDate': 1505385789000,
              'remarks': '',
              'delFlag': '0',
              'children': []
            }, {
              'id': '60',
              'parentId': '33',
              'parentIds': '0,1,33,',
              'name': '青浦区政府',
              'sort': 30,
              'areaId': '67',
              'code': '100000009014',
              'type': '2',
              'grade': '3',
              'address': '',
              'zipCode': '',
              'master': '',
              'phone': '',
              'fax': '',
              'email': '',
              'useable': '1',
              'primaryPerson': '',
              'deputyPerson': '',
              'createBy': '1',
              'createDate': 1505444388000,
              'updateBy': '1',
              'updateDate': 1505444388000,
              'remarks': '',
              'delFlag': '0',
              'children': []
            }, {
              'id': '50',
              'parentId': '33',
              'parentIds': '0,1,33,',
              'name': '普陀区政府',
              'sort': 30,
              'areaId': '22',
              'code': '100000009004',
              'type': '2',
              'grade': '3',
              'address': '',
              'zipCode': '',
              'master': '',
              'phone': '',
              'fax': '',
              'email': '',
              'useable': '1',
              'primaryPerson': '',
              'deputyPerson': '',
              'createBy': '1',
              'createDate': 1505385822000,
              'updateBy': '1',
              'updateDate': 1505385822000,
              'remarks': '',
              'delFlag': '0',
              'children': []
            }, {
              'id': '61',
              'parentId': '33',
              'parentIds': '0,1,33,',
              'name': '奉贤区政府',
              'sort': 30,
              'areaId': '28',
              'code': '100000009015',
              'type': '2',
              'grade': '3',
              'address': '',
              'zipCode': '',
              'master': '',
              'phone': '',
              'fax': '',
              'email': '',
              'useable': '1',
              'primaryPerson': '',
              'deputyPerson': '',
              'createBy': '1',
              'createDate': 1505444411000,
              'updateBy': '1',
              'updateDate': 1505444411000,
              'remarks': '',
              'delFlag': '0',
              'children': []
            }, {
              'id': '51',
              'parentId': '33',
              'parentIds': '0,1,33,',
              'name': '静安区政府',
              'sort': 30,
              'areaId': '19',
              'code': '100000009005',
              'type': '2',
              'grade': '3',
              'address': '',
              'zipCode': '',
              'master': '',
              'phone': '',
              'fax': '',
              'email': '',
              'useable': '1',
              'primaryPerson': '',
              'deputyPerson': '',
              'createBy': '1',
              'createDate': 1505394685000,
              'updateBy': '1',
              'updateDate': 1505394814000,
              'remarks': '',
              'delFlag': '0',
              'children': []
            }, {
              'id': '62',
              'parentId': '33',
              'parentIds': '0,1,33,',
              'name': '金山区政府',
              'sort': 30,
              'areaId': '27',
              'code': '100000009016',
              'type': '2',
              'grade': '3',
              'address': '',
              'zipCode': '',
              'master': '',
              'phone': '',
              'fax': '',
              'email': '',
              'useable': '1',
              'primaryPerson': '',
              'deputyPerson': '',
              'createBy': '1',
              'createDate': 1505444436000,
              'updateBy': '1',
              'updateDate': 1505444436000,
              'remarks': '',
              'delFlag': '0',
              'children': []
            }, {
              'id': '52',
              'parentId': '33',
              'parentIds': '0,1,33,',
              'name': '嘉定区政府',
              'sort': 30,
              'areaId': '23',
              'code': '100000009006',
              'type': '2',
              'grade': '3',
              'address': '',
              'zipCode': '',
              'master': '',
              'phone': '',
              'fax': '',
              'email': '',
              'useable': '1',
              'primaryPerson': '',
              'deputyPerson': '',
              'createBy': '1',
              'createDate': 1505443295000,
              'updateBy': '1',
              'updateDate': 1505443295000,
              'remarks': '',
              'delFlag': '0',
              'children': []
            }, {
              'id': '53',
              'parentId': '33',
              'parentIds': '0,1,33,',
              'name': '浦东新区政府',
              'sort': 30,
              'areaId': '14',
              'code': '100000009007',
              'type': '2',
              'grade': '3',
              'address': '',
              'zipCode': '',
              'master': '',
              'phone': '',
              'fax': '',
              'email': '',
              'useable': '1',
              'primaryPerson': '',
              'deputyPerson': '',
              'createBy': '1',
              'createDate': 1505443937000,
              'updateBy': '1',
              'updateDate': 1505444014000,
              'remarks': '',
              'delFlag': '0',
              'children': []
            }, {
              'id': '54',
              'parentId': '33',
              'parentIds': '0,1,33,',
              'name': '闵行区政府',
              'sort': 30,
              'areaId': '15',
              'code': '100000009008',
              'type': '2',
              'grade': '3',
              'address': '',
              'zipCode': '',
              'master': '',
              'phone': '',
              'fax': '',
              'email': '',
              'useable': '1',
              'primaryPerson': '',
              'deputyPerson': '',
              'createBy': '1',
              'createDate': 1505444077000,
              'updateBy': '1',
              'updateDate': 1505444077000,
              'remarks': '',
              'delFlag': '0',
              'children': []
            }]
          }]
        }]
      },
      getCheckedKeys () {
        let arr = this.$refs.tree.getCheckedNodes()
        let newArr = []
        let arrZero = arr[0].parentIds + arr[0].id
        newArr = arrZero.split(',')
        for (let j = 1; j < arr.length; j++) {
          let arrLater = arr[j].parentIds + arr[j].id
          let parentsArr = arrLater.split(',')
          for (let i = 0; i < parentsArr.length; i++) {
            if (newArr.indexOf(parentsArr[i]) === -1) {
              newArr.push(parentsArr[i])
            }
          }
        }
        this.ruleForm.city_name = newArr.join(',')
      }, // 地区
      query () {
        this.$ajax.get(`${baseUrl.cityFencingUrl}/remind/list`, {params: this.formInline, timeout: 3000})
          .then((res) => {
            if (res.data.code === 200) {
              let result = res.data.data
              this.tableData = result
              this.pagination.count = res.data.total
              // 状态  形式 位置
              for (let i = 0; i < result.length; i++) {
                this.tableData[i].adStatus = this.adStatus[result[i].adStatus]
                this.tableData[i].download_type = this.adStyleObj[result[i].download_type]
                this.tableData[i].type = this.type[result[i].type]
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
        this.$refs.ruleForm.resetFields()
        this.$refs.adPic1.clearFiles()
//        this.$refs.adPic2.clearFiles()
//        this.$refs.adPic3.clearFiles()
//        this.$refs.adPic4.clearFiles()
        this.$refs.top_img.clearFiles()
        this.$refs.logo_img.clearFiles()
        this.$refs.viewImg1.clearFiles()
        this.$refs.viewImg2.clearFiles()
        this.$refs.viewImg3.clearFiles()
        this.$refs.viewImg4.clearFiles()
      }, // 新增
//      adPicChange (val) {
//        if (val === '1') {
//          this.Pic1 = true
//          this.Pic2 = false
//          this.Pic3 = false
//          this.Pic4 = false
//        } else if (val === '2') {
//          this.Pic1 = false
//          this.Pic2 = true
//          this.Pic3 = false
//          this.Pic4 = false
//        } else if (val === '3') {
//          this.Pic1 = false
//          this.Pic2 = false
//          this.Pic3 = true
//          this.Pic4 = false
//        } else if (val === '4') {
//          this.Pic1 = false
//          this.Pic2 = false
//          this.Pic3 = false
//          this.Pic4 = true
//        }
//      }, // 广告图片
      pauseRecord (row) {
        if (row.adStatus !== '投放中' || row.adStatus !== '未开始') {
          alert('只有投放中状态可以暂停')
        } else {
          this.$ajax.get(`${baseUrl.cityFencingUrl}/findDictList?type=coupon_mode`, {params: {pauseId: row.id}})
            .then(res => {
              if (res.data.code === 200) {
                this.pauseTip = '已暂停'
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
      },
      getMore (id) {
        this.$ajax.get(`${baseUrl.cityFencingUrl}/remind/one`, {params: {ruleId: id}})
          .then(res => {
            if (res.data.code === 200) {
              let resultData = res.data.data
              this.ruleForm = resultData
              this.showFlag = resultData.showRule
              this.ruleForm.showRule = this.adStatus[resultData.showRule]
              console.log(this.ruleForm)
            } else if (res.data.code === 500) {
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
      }, // 获取详情
      moreSearch (id) { // 地区
        this.$ajax.get('/setting/role/menuAll', {params: {sessionId: Cookie.get('sessionId'), id: id}})
          .then(response => {
            if (response.data.code === 200) {
              let result = response.data.data
              this.select_role = result
              // 循环每个里面有没有roleId和menuId,有的话把id放到checkedRoles数组中
              searchRole(result, this.checkedCity)
              this.form.menuIds = this.checkedCity.join(',')
            } else {
              this.$message({
                type: 'error',
                message: '获取角色列表失败'
              })
            }
          })
          .catch((err) => {
            this.$message({
              type: 'error',
              message: '获取角色列表异常' + err
            })
          })
      },
      submitForm (ruleForm) {
        this.$refs[ruleForm].validate((valid) => {
          let url
          if (valid) {
            if (this.ruleForm.id === undefined || this.ruleForm.id === '') {
              url = `${baseUrl.cityFencingUrl}/add` // 新增功能
              this.ruleForm.showRule = parseInt(this.ruleForm.showRule)
              console.log(77)
            } else {
              url = `${baseUrl.cityFencingUrl}/update`
              console.log(this.ruleForm.showRule)
              console.log(this.adStatus[this.showFlag])
              if (this.ruleForm.showRule === this.adStatus[this.showFlag]) {
                this.ruleForm.showRule = parseInt(this.showFlag)
                console.log(this.ruleForm.showRule)
              } else {
                this.ruleForm.showRule = parseInt(this.ruleForm.showRule)
              }
            }
            if (this.ruleForm.autoDisplayTimes !== undefined && this.ruleForm.autoDisplayTimes !== '') {
              this.ruleForm.autoDisplayTimes = parseInt(this.ruleForm.autoDisplayTimes)
            } else {
              this.ruleForm.autoDisplayTimes = 0
            }
            this.ruleForm.sessionId = Cookie.get('sessionId')
            this.$ajax.post(url, this.ruleForm)
              .then(response => {
                if (response.data.code === 200) {
                  // 更新成功
                  this.$message({
                    type: 'success',
                    message: response.data.msg
                  })
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
      handleCheckedPositionChange () {},
      iconList () { // 获取标签list
        this.$ajax.get(`${baseUrl.advertContent}/findDictList?type=coupon_mode`, {timeout: 3000})
          .then(response => {
            if (response.data.code === 200) {
              let result = response.data.data
              for (let i = 0; i < result.length; i++) {
                this.sdkLabelArr.push(result[i].sdkLabel)
                this.sdkLabelObj[result[i].sdkLabel] = result[i].id
              }
            } else {
              this.$message({
                type: 'error',
                message: '获取标签失败'
              })
            }
          })
          .catch(() => {
            this.$message({
              type: 'error',
              message: '获取标签异常'
            })
          })
      },
      iconDelete (val) {
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let index = this.sdkLabelArr.indexOf(val)
          if (index > -1) {
//            this.sdkLabelArr.splice(index, 1)
            let id = this.sdkLabelObj[val]
            this.$ajax.get('', {params: {id: id}})
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
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消删除'
          })
        })
      }, // 标签删除
      iconAdd () {
        this.$ajax.get('/setting/role/menuAll', {params: {sdkLabel: this.sdkLabe, timeout: 3000}})
          .then(response => {
            if (response.data.code === 200) {
//              this.sdkLabelArr.push(this.sdkLabel)
              this.iconList()
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
        if (val === '落地页') {
          this.isLandingUrl = true
          this.isDownloadWay = false
          this.isDownloadPageUrl = false
          this.isDownloadUrl = false
          this.isDownloadModule = false
        } else if (val === '应用下载') {
          this.isLandingUrl = false
          this.isDownloadWay = true
          this.isDownloadPageUrl = true
          this.isDownloadUrl = false
          this.isDownloadModule = false
        }
      }, // 投放形式
      handleCheckedLoadWay (val) {
        if (val === '有下载页') {
          this.isDownloadPageUrl = true
          this.isDownloadUrl = false
          this.isDownloadModule = false
        } else if (val === '使用模板') {
          this.isDownloadPageUrl = false
          this.isDownloadUrl = true
          this.isDownloadModule = true
        } else if (val === '直接下载') {
          this.isDownloadPageUrl = false
          this.isDownloadUrl = true
          this.isDownloadModule = false
        }
      },
      beforeUploadPic2 (file) {
        return new Promise((resolve) => {
          this.$ajax.get(`${baseUrl.mainUrl}/electric/ossutil/interface/policy`, {params: {user_dir: 'advertContent'}})
            .then((res) => {
              this.Token2 = res.data.data
              this.Token2.OSSAccessKeyId = res.data.data.accessid
              this.Token2.key = this.Token2.dir + '/' + (+new Date()) + file.name
              resolve()
            })
            .catch(err => {
              this.$message({
                message: err.data.msg,
                type: 'error'
              })
            })
        })
      }, // 公用
      successPic1 (response, file, fileList) {
        successImg(this.ruleForm.display_pic, this.Token1.key)
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
        clearUploadedImg(this.ruleForm.display_pic, this.$refs.adPic1)
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

  function successImg (formImg, Token) {
    let Img = 'http://jjdcjavaweb.oss-cn-shanghai.aliyuncs.com/' + Token
    formImg = Img
    return formImg
  }

  function clearUploadedImg (formImg, refImg) {
    // 如果有就清除
    if (formImg) {
      refImg.clearFiles()
    }
  }

  function searchRole (result, checkedCity) {
    for (let i = 0; i < result.length; i++) {
      let item = result[i]
      if (item.children !== undefined && item.children.length > 0) {
        // 递归
        searchRole(item.children, checkedCity)
      }
      if (item.roleId && item.roleId) {
        let arr = checkedCity.push(item.id)
        return arr
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

  .viewImg {
    float: left;
  }

  .imgTime {
    width: 100px;
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
    padding: 3px 10px;
    box-sizing: border-box;
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
  }

  a {
    color: red;
  }

  .el-icon-close {
    font-size: 3px !important;
    color: red;
  }
</style>
