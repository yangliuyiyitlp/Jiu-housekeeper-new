<template>
  <div>
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <el-tab-pane label="版本内容信息" name="first">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="平台：">
            <el-select v-model="formInline.adStatus" clearable>
              <el-option v-for="(val,key) in adStatus" v-bind:key=key :label=val :value=key></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="hasPermission('version/manage/view')">
            <el-button type="primary" @click="query">查询</el-button>
          </el-form-item>
          <el-form-item v-if="hasPermission('version/manage/create')">
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
            label="版本ID">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            label="版本号"
            prop="description">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="adStatus"
            label="平台">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            :show-overflow-tooltip = true
            prop="is_download"
            label="更新通知内容">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="type"
            label="版本修改内容">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="adDate"
            label="添加时间">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="sort"
            label="展示顺序">
          </el-table-column>
          <el-table-column
            v-if="hasPermission('version/manage/update') || hasPermission('advert/content/update')"
            header-align="center"
            align="center"
            width="100"
            label="操作">
            <template slot-scope="scope">
              <el-button v-if="hasPermission('version/manage/update')" @click="modifyRecord(scope.row.id)" type="text"
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

      <el-tab-pane :label="title" name="second" v-if="hasPermission('version/manage/create')">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
          <el-form-item label="版本号：" prop="description">
            <el-input v-model="ruleForm.description" class="width"></el-input>
          </el-form-item>
          <el-form-item label="平台：" prop="sdkLabelArr">
            <el-checkbox-group v-model="sdkLabelArr" class="sdkwidth">
              <el-checkbox v-for="(val, key) in sdkLabelObj" :key="val" :label="key">{{key}}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="更新通知内容：" prop="textarea">
            <el-input
              type="textarea"
              autosize
              class="textarea"
              v-model="ruleForm.textarea">
            </el-input>
          </el-form-item>
          <el-form-item label="APP修改内容：" prop="textarea">
            <el-input
              type="textarea"
              autosize
              class="textarea"
              v-model="ruleForm.textarea">
            </el-input>
          </el-form-item>

          <el-form-item label="强制更新版本：">
            <div class="treeIos">
              <p>ios更新版本：</p>
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
              <p>安卓更新版本：</p>
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
        activeName2: 'first',
        title: '版本内容新增',
        adStatus: {'': '全部', '1': '投放中', '0': '未开始', '2': '已结束', '3': '已暂停'},
        tip: '立即创建',
        tableData: [],
        sdkLabelObj: {},
        sdkLabelArr: [],
        checkedAdOs: [],
        checkedAndroid: [],
        selectAdOs: [],
        selectAndroid: [],
        defaultCity: {
          children: 'children',
          label: 'version'
        },
        formInline: {
          pageSize: 30,
          pageNo: 1
        },
        ruleForm: {},
        rules: {
          description: [{required: true, message: '请输入广告标题', trigger: 'blur'}]
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
    },
    methods: {
      hasPermission (data) {
        if (this.permissionList && this.permissionList.length && this.permissionList.includes(data)) {
          return true
        }
        return false
      },
      handleClick () {
        if (this.activeName2 === 'first' && this.create) {
          this.title = '版本内容新增'
        } else if (this.title === '版本内容新增') {
          this.ruleForm = {}
          this.sdkLabelArr = []
          this.tip = '立即创建'
          this.$refs.ruleForm.resetFields()
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
      query () {
        if (this.formInline.display_time > this.formInline.del_time) {
          alert('开始时间不能晚于结束时间')
          return
        }
        this.$ajax.get(`${baseUrl.advertContent}/ad/list`, {params: this.formInline, timeout: 3000})
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
        this.title = '版本内容新增'
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
      modifyRecord (id) {
        this.activeName2 = 'second'
        this.create = true
        this.title = '版本内容修改'
        this.tip = '提交修改'
        this.getMore(id)
      }, // 修改
      back () {
        this.activeName2 = 'first'
        if (this.create) {
          this.title = '版本内容新增'
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
        this.$ajax.get(`${baseUrl.advertContent}/ad/show`, {params: {id: id, timeout: 4000}})
          .then(res => {
            if (res.data.code === 200) {
              let resultData = res.data.data
              this.ruleForm = resultData
              // 下载形式显示对应的
              if (resultData.downloadWay === '0') {
                this.isDownloadWay = true
                this.isDownloadPageUrl = true
                this.isDownloadUrl = false
                this.isDownloadModule = false
              } else if (resultData.downloadWay === '1') {
                this.isDownloadWay = true
                this.isDownloadPageUrl = false
                this.isDownloadUrl = false
                this.isDownloadModule = true
              } else if (resultData.downloadWay === '2') {
                this.isDownloadWay = true
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
              console.log(2323, resultData)
              // ios_version_ids   android_version_ids
              if (resultData.ios_version_ids) {
                this.checkedAdOs = resultData.ios_version_ids.split(',')
                this.$refs.treeIos.setCheckedKeys(this.checkedAdOs)
                console.log('checkedAdOs', this.checkedAdOs)
              }
              if (resultData.android_version_ids) {
                this.checkedAndroid = resultData.android_version_ids.split(',')
                this.$refs.treeAndroid.setCheckedKeys(this.checkedAndroid)
                console.log('checkedAndroid', this.checkedAndroid)
              }
              // 标签
              let labelArr = resultData.tag.split(',')
              this.sdkLabelArr = labelArr
              console.log(resultData)
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
      }, // 获取详情
      submitForm (ruleForm) {
        // 下载地址this.ruleForm.iosUrl this.ruleForm.androidUrl
        this.ruleForm.down_url = {}
        if (this.ruleForm.androidUrl && this.ruleForm.iosUrl) {
          this.ruleForm.down_url['1'] = this.ruleForm.androidUrl
          this.ruleForm.down_url['2'] = this.ruleForm.iosUrl
          this.ruleForm.down_url = JSON.stringify(this.ruleForm.down_url)
        }
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
        // 获取版本名称
//        this.arrIos = []
//        this.arrAndroid = []
//        let treeIosArr = this.$refs.treeIos.getCheckedNodes()
//        for (let j = 0; j < treeIosArr.length; j++) {
//          this.arrIos.push(treeIosArr[j].version)
//        }
//        if (this.arrIos !== []) {
//          this.ruleForm.ios_versions = this.arrIos.join(',')
//        }
//        let treeAndroidArr = this.$refs.treeAndroid.getCheckedNodes()
//        for (let i = 0; i < treeAndroidArr.length; i++) {
//          this.arrAndroid.push(treeIosArr[i].version)
//        }
//        if (this.arrAndroid !== []) {
//          this.ruleForm.android_versions = this.arrAndroid.join(',')
//        }
        // 获取版本id
        let treeIosArrIds = this.$refs.treeIos.getCheckedKeys()
        this.ruleForm.ios_version_ids = treeIosArrIds.join(',')
        let treeAndroidArrIds = this.$refs.treeAndroid.getCheckedKeys()
        this.ruleForm.android_version_ids = treeAndroidArrIds.join(',')
        // 预览图4张图
        let recImg = []
        if (this.ruleForm.viewImg1) {
          recImg.push(this.ruleForm.viewImg1)
        } if (this.ruleForm.viewImg2) {
          recImg.push(this.ruleForm.viewImg2)
        } if (this.ruleForm.viewImg3) {
          recImg.push(this.ruleForm.viewImg3)
        } if (this.ruleForm.viewImg4) {
          recImg.push(this.ruleForm.viewImg4)
        }
        if (recImg !== [] && recImg !== undefined) {
          this.ruleForm.rev_img = recImg.join(';')
          console.log(66, this.ruleForm.rev_img)
        } else {
          this.ruleForm.rev_img = ''
        }
        // 预览图4张图
//        let recImg = [this.ruleForm.viewImg1, this.ruleForm.viewImg2, this.ruleForm.viewImg3, this.ruleForm.viewImg4]
//        let imgListArr = []
//        for (let j = 0; j < recImg.length; j++) {
//          if (recImg[j] !== undefined && recImg[j] !== '') {
//            imgListArr.push(recImg[j])
//          }
//        }
//        console.log('imgListArr', imgListArr)
//        if (imgListArr !== [] && imgListArr !== undefined) {
//          this.ruleForm.rev_img = imgListArr.join(';')
//          console.log(66, this.ruleForm.rev_img)
//        } else {
//          this.ruleForm.rev_img = ''
//        }
        this.ruleForm.update_by = Cookie.get('adminId')
        console.log(this.ruleForm)
        // 请求
        this.$refs[ruleForm].validate((valid) => {
          let url = `${baseUrl.advertContent}/adDetails/addAdDetails`
          if (valid) {
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
      }
    }
  }
</script>
<style scoped>
  .textarea{
    width:350px;
  }

  html, body {
    height: 100%;
  }

  .width {
    width: 203px;
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
  a {
    color: red;
  }
</style>
