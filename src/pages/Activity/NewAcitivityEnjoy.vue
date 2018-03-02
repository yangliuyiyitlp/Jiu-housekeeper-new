<template>
  <div class="pageWidth">
    <div class="introBtn">
      <span class="introduce">预览</span>
      <span class="publish">发布</span>
    </div>
    <el-form ref="menuForm" :model="menuForm" class="city">
      <h2>地址选择</h2>
      <a>{{menuForm.cityName}}</a>&nbsp;<i class="el-icon-search" @click="searchCity"></i>
    </el-form>
    <div class="showWidth">
      <div class="showHeader">
        <a class="showPage">展示效果</a>
      </div>

      <el-row :gutter="0">
        <el-col :span="8" :offset="1">
          <div class="view">
            <div class="sidebar">
              <div class="pageTop"><img src="../../assets/images/activity/phoheader.png"></div>

              <div class="menuContent" ref="menu">

                <div v-for="(item,index) in menuList" :key="item.id" :class="item.class" @click="choiceMenu(item.id)"
                     :id=item.id>
                  <div>
                    <div @click.stop='downCircle(index)' class="downCircle" v-if="index===0?false:true"><i
                      class="circle iconfont icon-jiantouarrow505"></i></div>
                    <div @click.stop='topCircle(index)' class="topCircle" v-if="index===0?false:true"><i
                      class="circle iconfont icon-jiantouarrow499"></i></div>
                    <div class="headerContent">
                      <div>{{item.value}}</div>
                    </div>
                  </div>
                  <!--列表区详情-->
                  <div  class="isFall" v-if="isFall&&item.id===3?true:false" ref="isFall">
                    <div v-for="(item,index) in fallList" :key="item.id" :class="item.class">
                      <el-input v-if="0" v-model="item.id"></el-input>
                      <el-row :gutter="0">
                        <el-col :span="7">
                          <div @click.stop='topFall(index)' class="fallCircle"><i
                            class="circle iconfont icon-jiantouarrow499"></i></div>
                          <div @click.stop='downFall(index)' class="fallCircle"><i
                            class="circle iconfont icon-jiantouarrow505"></i></div>
                          <div @click.stop='delFall(index)' class="fallCircle"><i
                            class="circle iconfont icon-icon--"></i></div>
                          <div v-model="item.name"></div>
                        </el-col>
                        <el-col :span="13">
                          <div><span class="fallFont">按钮颜色：</span><input class="fallColor" placeholder="请选择"
                                                                         v-model="item.color"></div>
                          <div><span class="fallFont">按钮名字：</span><input class="fallColor" placeholder="请输入"
                                                                         v-model="item.buttonName"></div>
                        </el-col>
                        <el-col :span="3">
                          <el-color-picker v-model="item.color"></el-color-picker>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </div>



              </div>
            </div>
          </div>
        </el-col>
        <!--页头-->
        <el-col :span="14" :offset="1" v-if="isHeader">
          <div class="rightForm">
            <div class="headerTitle">
              <a class="fontWeight">页头</a>
              <span class="savePageHeader" @click="savePageHeader">保存</span>
              <el-switch
                :width=100
                @change=isUseChange
                v-model='headerIsUse'
                on-text="启用"
                off-text="停用"
                on-color="#DB5050"
                off-color="#4F4D4D">
              </el-switch>
            </div>
            <hr class="lineWeight">
            <el-form ref="formData" :rules="rules" :model="form" label-width="100px" class="formData">
              <el-input v-if=0 v-model="form.id"></el-input>
              <el-form-item label="是否登录：" prop="headerNeedLogin">
                <el-switch
                  :width=60
                  v-model='headerNeedLogin'
                  on-text="登录"
                  off-text="关闭"
                  on-color="#DB5050"
                  off-color="#4F4D4D">
                </el-switch>
              </el-form-item>

              <el-form-item label="默认标题：" class="minWidth" prop="oldTitle">
                <el-input v-model="form.oldTitle" placeholder="请输入显示的名称（建议5个字以内）"></el-input>
              </el-form-item>

              <el-form-item label="页头标题：" class="minWidth" prop="newTitle">
                <el-input v-model="form.newTitle" placeholder="请输入也同样文字（最多16个字符）"></el-input>
              </el-form-item>
              <el-form-item label="有效日期：" prop="beginDate">
                <el-date-picker
                  v-model="form.beginDate"
                  type="datetime"
                  @change="beginDateChange"
                  placeholder="选择生效时间">
                </el-date-picker>
                -
                <el-date-picker
                  v-model="form.endDate"
                  type="datetime"
                  @change="endDateChange"
                  placeholder="选择失效时间">
                </el-date-picker>
              </el-form-item>

            </el-form>

          </div>
        </el-col>
        <!--轮播区-->
        <el-col v-if='isCarousel' :span="14" :offset="1">
          <div class="rightForm">
            <div class="headerTitle">
              <a class="fontWeight">轮播区</a>
              <span class="savePageCarouse" @click="savePageCarouse">保存</span>
              <el-switch
                :width=100
                v-model="carouselIsUse"
                @change=isUseChange
                on-text="启用"
                off-text="停用"
                on-color="#DB5050"
                off-color="#4F4D4D">
              </el-switch>
            </div>
            <hr class="lineWeight">
            <el-form ref="formCarousel" :rules="rules" :model="formCarousel" label-width="110px" class="formData">
              <el-input v-if=0 v-model="formCarousel.id"></el-input>
              <el-input v-if=0 v-model="formCarousel.updateBy"></el-input>

              <el-form-item label="是否显示：">
                <el-switch
                  :width=60
                  v-model="formCarousel.carouselIsShow"
                  on-text="登录"
                  off-text="关闭"
                  on-color="#DB5050"
                  off-color="#4F4D4D">
                </el-switch>
              </el-form-item>
              <el-form-item label="是否登录：">
                <el-switch
                  :width=60
                  v-model="formCarousel.carouselNeedLogin"
                  on-text="登录"
                  off-text="关闭"
                  on-color="#DB5050"
                  off-color="#4F4D4D">
                </el-switch>
              </el-form-item>

              <el-form-item label="模块宽高：">
                <el-input v-model="formCarousel.width" placeholder="宽" class="miWidth"></el-input>
                x
                <el-input v-model="formCarousel.height" placeholder="高" class="miWidth"></el-input>
              </el-form-item>

              <el-form-item label="切换时间(秒)：">
                <el-input class="secWidth" v-model="formCarousel.changeTime" placeholder="只能输入数字"></el-input>
              </el-form-item>
              <a class="fontWeight">内容上传</a>


              <div class="carousel" v-for="(item,index) in formCarousel.carouselDetails" :key="index">

                <hr class="lineWeight">
                <el-row :gutter="0">

                  <el-col :span="4">
                    <a class="iconFont">轮播图{{index + 1}}</a>
                    <el-upload
                      class="avatar-uploader"
                      action='http://jjdcjavaweb.oss-cn-shanghai.aliyuncs.com'
                      :data="Token"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess(item.id)"
                      :before-upload="beforeAvatarUpload">
                      <img v-if="item.iconUrl" :src="item.iconUrl" class="avatar">
                      <i v-else class="el-icon-plus
                      avatar-uploader-icon"></i>
                      <span class="iconFont">上传图片<br/>宽高比670*300</span>
                    </el-upload>
                    <el-input v-model="item.iconUrl" v-if="0"></el-input>
                  </el-col>
                  <el-col :span="15" :offset="1">

                    <el-form :ref=index :rules="rules" label-width="100px">

                      <el-input v-if=0 v-model="item.id"></el-input>

                      <el-form-item label="类型：">
                        <el-select v-model="item.type" placeholder="请选择类型" @change="enjoyTypeChange">
                          <el-option
                            v-for="(option,index) in enjoyType" :key="index" :label="option.label"
                            :value="option.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="跳转类型：" v-show="isActionType">
                        <el-select v-model="item.actionType" placeholder="请选择跳转类型" @change="actionTypeChange">
                          <el-option
                            v-for="(option,index) in jumpType" :key="index" :label="option.label" :value="option.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="模板选择：" v-show="isDownloadModle">
                        <el-select v-model="item.downloadModle" placeholder="请选择模板">
                          <el-option
                            v-for="(option,index) in enjoyDownUrl" :key="index" :label="option.label"
                            :value="option.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="链接：" v-show="isActionUrl">
                        <el-select v-model="item.actionUrl" placeholder="请选择链接">
                          <el-option
                            v-for="(option,index) in enjoyUrl" :key="index" :label="option.label" :value="option.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="展示日期：" prop="beginTime">
                        <el-date-picker
                          v-model="item.beginDate"
                          type="datetime">
                        </el-date-picker>
                        -
                        <el-date-picker
                          v-model="item.endDate"
                          type="datetime">
                        </el-date-picker>
                      </el-form-item>

                      <el-form-item label="平台：">
                        <el-select v-model="item.os" placeholder="请选择平台">
                          <el-option
                            v-for="(option,index) in showType" :key="index" :label="option.label" :value="option.value">
                          </el-option>
                        </el-select>
                      </el-form-item>

                    </el-form>
                  </el-col>
                  <el-col :span="4">
                    <div class="carouseFormAll">
                      <div @click="carouseDel(item.id)"><i class="circle iconfont icon-icon--"></i></div>
                      <div @click="carouseDown(item.id,index)"><i class="circle iconfont icon-jiantouarrow505"></i>
                      </div>
                      <div @click="carouseTop(item.id,index)"><i class="circle iconfont icon-jiantouarrow499"></i></div>
                      <div @click="carouseMaxTop(item.id,index)"><i class="circle iconfont icon-zhiding"></i></div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-form>
            <div class="addForm" @click="addForm"><i class="iconAdd iconfont icon-add"></i></div>

          </div>
        </el-col>
        <!--图标区-->
        <el-col :span="14" :offset="1" v-if="isIcon">图标区</el-col>
        <!--列表区-->
        <el-col :span="14" :offset="1" v-if="isFalls">
          <div class="rightForm">
            <div class="headerTitle">
              <a class="fontWeight">赳赳特选</a>
              <span class="savePageHeader" @click="savePageFall">保存</span>
              <el-switch
                :width=100
                @change=isUseChange
                v-model='fallIsUse'
                on-text="启用"
                off-text="停用"
                on-color="#DB5050"
                off-color="#4F4D4D">
              </el-switch>
            </div>
            <hr class="lineWeight">
            <el-form ref="formData" :rules="rules" :model="formFalls" label-width="100px" class="formData">
              <el-input v-if=0 v-model="formFalls.id"></el-input>
              <el-form-item label="是否显示：" prop="headerNeedLogin">
                <el-switch
                  :width=60
                  v-model='fallIsShow'
                  on-text="登录"
                  off-text="关闭"
                  on-color="#DB5050"
                  off-color="#4F4D4D">
                </el-switch>
              </el-form-item>
              <el-form-item label="是否登录：" prop="headerNeedLogin">
                <el-switch
                  :width=60
                  v-model='fallIsLogin'
                  on-text="登录"
                  off-text="关闭"
                  on-color="#DB5050"
                  off-color="#4F4D4D">
                </el-switch>
              </el-form-item>
              <el-form-item label="模块宽高：">
                <el-input v-model="formFalls.width" placeholder="宽" class="miWidth"></el-input>
                x
                <el-input v-model="formFalls.height" placeholder="高" class="miWidth"></el-input>
              </el-form-item>
              <el-form-item label="模块名称：" class="minWidth" prop="oldTitle">
                <el-input v-model="formFalls.waterfallName" placeholder="赳赳特选（可修改，建议5个字以内）"></el-input>
              </el-form-item>


            </el-form>

          </div>
        </el-col>

      </el-row>
    </div>

    <!--模态框-->
    <el-dialog title="城市" size="tiny" :visible.sync="cityVisible" center>
      关键字：<input ref='keySearch' type='text' class='keySearch' v-model="filterText">
      <el-tree
        :data="select"
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
      <div slot="footer" class="dialog-footer">
        <el-button @click="modifyCancel">取 消</el-button>
        <el-button type="primary" @click="doModify">确 定</el-button>
      </div>
    </el-dialog>
  </div>


</template>
<script>
  import baseUrl from '../../utils/baseUrl'
  import a from '../../assets/js/getsessionId.js'
  import Cookie from 'js-cookie'
  import { convertDate2String } from '../../assets/js/convert'

  export default {
    data () {
      return {
        cityVisible: false,
        isOpen: true,
        isHeader: false,
        isCarousel: false,
        isIcon: false,
        isFalls: false,
        isFall: false,
        headerIsUse: false,
        headerNeedLogin: false,
        carouselIsUse: false,
        carouselIsShow: false,
        carouselNeedLogin: false,
        fallIsUse: false,
        fallIsShow: false,
        fallIsLogin: false,
        filterText: '',
        cityId: -1,
        rankArr: [],
        ranks: '',
        Token: {},
        menuForm: {'cityName': '全国'},
        form: {},
        formCarousel: {},
        select: [{'id': '-1', 'name': '全国', 'children': []}],
        options: [{'label': 'rrr', 'value': 'eed'}],
        value: '',
        checkedCity: [],
        fallList: [{'class': 'fallFirst'}, {}, {}, {}],
        menuList: [],
        menuCount: [{value: '轮播区 ② 点击编辑', class: 'pageCarousel', id: 1}, {
          value: '图标区 ③ 点击编辑',
          class: 'pageFoot',
          id: 2
        }, {value: '列表区 ④ 点击编辑', class: 'pageActivity', id: 3}],
        enjoyType: [],
        jumpType: [],
        enjoyDownUrl: [],
        showType: [],
        enjoyUrl: [],
        isActionType: true,
        isDownloadModle: true,
        isActionUrl: true,
        formFalls: {},
        rules: {
          oldTitle: [{required: true, message: '请输入默认标题', trigger: 'blur'}, {
            max: 5,
            message: '长度不大于 5个字',
            trigger: 'blur'
          }],
          newTitle: [{required: true, message: '请输入页头标题', trigger: 'blur'}],
          beginDate: [{required: true, message: '请输入日期', trigger: 'blur'}],
          headerNeedLogin: [{required: true, message: '请选择', trigger: 'blur'}]
        },
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        adminId: '',
        path: '',
        permissionList: []
      }
    },
    watch: {
      filterText (val) {
        this.$refs.tree.filter(val)
      }
//      isUse (val, old) {
//        if (val === true) {
//          this.$message.warning('保存后点击发布才会生效')
//        }
//      }
//      menuList: function () {
//        this.$nextTick(() => {
//          let menuDivs = this.$refs.menu.children
//          for (let i = 0; i < this.menuDivs.length; i++) {
//            if (this.menuDivs[i].isShow === 0) {
//              menuDivs[i].style.backgroundColor = 'rgba(0, 0, 0, 0.6)'
//            } else {
//              menuDivs[i].style.backgroundColor = 'rgba(0, 0, 0, 0.1)'
//            }
//          }
//        })
//      }
    },
    mounted () {
//      this.menuList = this.menuCount // 接口关了先直接赋值
    },
    created () {
      // 请求按钮权限
      this.adminId = this.$route.query.adminId
      this.path = this.$route.path
      a.sessionId(this.adminId, this.path, this.$router, this.$ajax, this.permissionList)
      this.getCityRelation()
      this.getRanks() // 接口关了先直接赋值
    },
//    computed: {
//      isUse () {
//        return this.form.isUse
//      }
//    },
    methods: {
      isUseChange (val) {
        if (val === true) {
          this.$message.warning('保存后点击发布才会生效')
        }
      },
      // 全局获取城市对应关系
      getCityRelation () {
        this.$ajax.get(`${baseUrl.ActivityArea}/electric/userUtilsInterface/interface/getBikeAreaList`)
          .then(res => {
            if (res.data.code === 0) {
              let bikeAreaList = res.data.bikeAreaList
              for (let i = 0; i < bikeAreaList.length; i++) {
                this.select[0].children.push(bikeAreaList[i])
              }
            } else {
              this.$message('城市列表获取失败')
            }
          })
          .catch(err => {
            this.$message.error('城市列表获取异常')
          })
      },
      //全局模板排序获取
      getRanks () {
        this.menuList = [{value: '页头 ① 点击编辑', class: 'pageHeader', id: 0}]
        if (!this.cityId) { //判断条件 获取排序
          this.$message('请先选择地址')
          return false
        }
        this.$ajax.get(`${baseUrl.newEnjoyUrl}/jjEnjoy/getRank`, {params: {cityId: this.cityId}})
          .then(res => {
            if (res.data.code === 0) {
              if (res.data.data !== null && res.data.data !== '') {
                this.ranks = res.data.data.ranks
              } else {
                this.ranks = '1,2,3'
              }
              this.rankArr = this.ranks.split(',')
              for (let i = 0; i < this.rankArr.length; i++) {
                for (let j = 0; j < this.menuCount.length; j++) {
                  if (Number(this.rankArr[i]) === this.menuCount[j].id) {
                    this.menuList.push(this.menuCount[j])
                  }
                }
              }
            } else {
              this.$message('获取排序失败')
            }
          })
          .catch((err) => {
            this.$message.error('获取排序异常')
          })
      },
      //全局模板排序提交
      setRanks () {
        this.$ajax.post(`${baseUrl.newEnjoyUrl}/jjEnjoy/saveRank`, {
          cityId: this.cityId,
          ranks: this.ranks,
          updateBy: this.adminId
        })
          .then(res => {
            if (res.data.code === 0) {
              // 获取排序
              this.getRanks()
            } else {
              this.$message('提交排序失败')
            }
          })
          .catch((err) => {
            this.$message.error('提交排序异常')
          })
      },
      downCircle (index) {
        this.rankArr = []
        if (!this.cityId) { //判断条件
          this.$message('请先选择地址')
          return false
        }
        if (index === this.menuList.length - 1) {
          this.$message('已经是最后一条啦')
          return
        }
        //提交排序
        let newMenuList = this.menuList
        let thisMenu = newMenuList[index]
        newMenuList.splice(index, 1) // 选中的删除
        newMenuList.splice(index + 1, 0, thisMenu) //选中的移到index+1
        for (let i = 1; i < newMenuList.length; i++) {
          this.rankArr.push(newMenuList[i].id)
        }
        this.ranks = this.rankArr.join(',')
        this.setRanks()
      },
      topCircle (index) {
        this.rankArr = []
        if (!this.cityId) { //判断条件
          this.$message('请先选择地址')
          return false
        }
        if (index === 1) {
          this.$message('已经是第一条啦')
          return
        }
        //提交排序
        let newMenuList = this.menuList
        let thisMenu = newMenuList[index]
        newMenuList.splice(index, 1) // 选中的删除
        newMenuList.splice(index - 1, 0, thisMenu) //选中的移到index+1
        for (let i = 1; i < newMenuList.length; i++) {
          this.rankArr.push(newMenuList[i].id)
        }
        this.ranks = this.rankArr.join(',')
        this.setRanks()
      },
      // 全局左边当前行高亮,模块事件
      choiceMenu (id) {
        if (this.cityId) {
          if (isNaN(id)) {
            return false
          }
          let menuDivs = this.$refs.menu.children
          getMenu(menuDivs, id)
          this.menuCount[2].class = 'pageActivity'
          if (id === 0) { // 获取页头
            this.isHeader = true
            this.isCarousel = false
            this.isIcon = false
            this.isFalls = false
            this.isFall = false
            this.getHeader()
          } else if (id === 1) {
            this.isHeader = false
            this.isCarousel = true
            this.isIcon = false
            this.isFalls = false
            this.isFall = false
            this.getEnjoyType()
          } else if (id === 2) {
            this.isHeader = false
            this.isCarousel = false
            this.isIcon = true
            this.isFalls = false
            this.isFall = false
          } else if (id === 3) {
            this.menuCount[2].class = 'pageActivityClick'
            this.isHeader = false
            this.isCarousel = false
            this.isIcon = false
            this.isFalls = true
            this.isFall = true
            this.getPageFall()
          }
        } else {
          this.$message('请先选择地址')
          return false
        }
      },
      // 全局城市树模型开始
      filterNode (value, data) {
        if (!value) return true
        return data.name.indexOf(value) !== -1
      },
      handleNode (data) {
        this.filterText = data.name // 弹框树模型点击输入值
        this.cityId = Number(data.id)
      },
      doModify () {
        this.menuForm.cityName = this.filterText
        this.cityVisible = false
        this.getRanks()
      },
      modifyCancel () {
        this.cityVisible = false
        this.menuForm.cityName = ''
        this.cityId = ''
      },
      searchCity () {
        this.cityVisible = true
        this.filterText = ''
      },
      //页头
      getHeader () {
        this.$ajax.get(`${baseUrl.newEnjoyUrl}/jjEnjoy/title/form`, {params: {cityId: this.cityId}})
          .then((res) => {
              if (res.data.code === 0) {
                this.form = res.data.data
                if (this.form.isUse === 1) {
                  this.headerIsUse = true
                } else {
                  this.headerIsUse = false
                }
                if (this.form.needLogin === 1) {
                  this.headerNeedLogin = true
                } else {
                  this.headerNeedLogin = false
                }
              } else {
                this.$message('页头信息获取失败')
              }
            }
          )
          .catch(err => {
            this.$message.error('页头信息获取异常')
          })
      },
      beginDateChange (val) {
        this.form.beginDate = val
      },
      endDateChange (val) {
        this.form.endDate = val
      },
      savePageHeader () {
        if (this.form.beginDate > this.form.endDate) {
          this.$message('有效日期开始时间必须早于结束时间')
          return
        }
        if (this.headerIsUse === true) {
          this.form.isUse = 1
        } else {
          this.form.isUse = 0
        }
        if (this.headerNeedLogin === true) {
          this.form.needLogin = 1
        } else {
          this.form.needLogin = 0
        }
        this.form.cityId = this.cityId
        this.form.updataBy = Cookie.get('adminId')
        this.$ajax.post(`${baseUrl.newEnjoyUrl}/jjEnjoy/title/save`, this.form)
          .then((res) => {
              if (res.data.code === 0) {
                this.$message.success(res.data.msg)
                this.getHeader()
              } else {
                this.$message(res.data.msg)
              }
            }
          )
          .catch(err => {
            this.$message.error(err.data.msg)
          })
      },
      //轮播区
      handleAvatarSuccess (id) {
        let result = this.formCarousel.carouselDetails
        console.log(5555, result)
        for (let i = 0; i < result.length; i++) {
          if (result[i].id === id) {
            result[i].iconUrl = 'http://jjdcjavaweb.oss-cn-shanghai.aliyuncs.com/' + this.Token.key
          }
        }
      },
      beforeAvatarUpload (file) {
        return new Promise((resolve) => {
          this.$ajax.get(`${baseUrl.mainUrl}/electric/ossutil/interface/policy`, {params: {user_dir: 'newActivityEnjoy'}})
            .then((res) => {
              this.Token = res.data
              this.Token.OSSAccessKeyId = res.data.accessid
              this.Token.key = this.Token.dir + '/' + (+new Date()) + file.name
              resolve()
            })
            .catch(() => {
              this.$message({
                message: '图片秘钥获取失败',
                type: 'error'
              })
            })
        })
      },
      getEnjoyType () {
        this.$ajax.get(`${baseUrl.mainUrl}/sys/dictutils/interface/getDictList`, {params: {type: 'enjoy_type'}})
          .then((res) => {
            this.enjoyType = []
            for (let i = 0; i < res.data.length; i++) {
              let enjoyTypeObj = {}
              enjoyTypeObj.value = res.data[i].value
              enjoyTypeObj.label = res.data[i].label
              this.enjoyType.push(enjoyTypeObj)
            }
            this.$ajax.get(`${baseUrl.mainUrl}/sys/dictutils/interface/getDictList`, {params: {type: 'jump_type'}})
              .then((res) => {
                this.jumpType = []
                for (let j = 0; j < res.data.length; j++) {
                  let jumpTypeObj = {}
                  jumpTypeObj.value = res.data[j].value
                  jumpTypeObj.label = res.data[j].label
                  this.jumpType.push(jumpTypeObj)
                }
                this.$ajax.get(`${baseUrl.mainUrl}/sys/dictutils/interface/getDictList`, {params: {type: 'show_type'}})
                  .then((res) => {
                    this.showType = []
                    for (let k = 0; k < res.data.length; k++) {
                      let showTypeObj = {}
                      showTypeObj.value = res.data[k].value
                      showTypeObj.label = res.data[k].label
                      this.showType.push(showTypeObj)
                    }
                    this.getCarousel()
                  })
                  .catch((err) => {
                    this.$message.error('获取下拉列表失败' + err)
                  })
              })
              .catch((err) => {
                this.$message.error('获取下拉列表失败' + err)
              })
          })
          .catch((err) => {
            this.$message.error('获取下拉列表失败' + err)
          })
      },
      getCarousel () {
        this.$ajax.get(`${baseUrl.newEnjoyUrl}/jjEnjoy/carousel/form`, {params: {cityId: this.cityId}})
          .then((res) => {
              if (res.data.code === 0) {
                this.formCarousel = res.data.data
                if (this.formCarousel.isUse === 1) {
                  this.carouselIsUse = true
                } else {
                  this.carouselIsUse = false
                }
                if (this.formCarousel.needLogin === 1) {
                  this.carouselNeedLogin = true
                } else {
                  this.carouselNeedLogin = false
                }
                if (this.formCarousel.isShow === 1) {
                  this.carouselIsShow = true
                } else {
                  this.carouselIsShow = false
                }
                if (this.formCarousel.ratio.indexOf('X') !== -1) {
                  this.formCarousel.width = this.formCarousel.ratio.split('X')[0]
                  this.formCarousel.height = this.formCarousel.ratio.split('X')[1]
                }
//                this.carouselDetails = this.formCarousel.carouselDetails
              } else {
                this.$message('轮播区获取失败')
              }
            }
          )
          .catch(err => {
            this.$message.error('轮播区获取异常')
          })
      },
      enjoyTypeChange (val) {
        if (val === '0') {
          this.isActionType = true
          this.isActionUrl = false
        } else if (val === '1') {
          this.isActionType = true
          this.isActionUrl = false
        } else if (val === '2') {
          this.isActionType = false
          this.isActionUrl = true
        } else if (val === '3') {
          this.isActionType = true
          this.isActionUrl = false
        }
        this.isDownloadModle = false
      },
      actionTypeChange (val) {
        if (val === '0') {
          this.isDownloadModle = false
          this.isActionUrl = false
        } else if (val === '1') {
          this.isDownloadModle = false
          this.isActionUrl = false
        } else if (val === '2') {
          this.isDownloadModle = true
          this.isActionUrl = false
        } else if (val === '3') {
          this.isActionUrl = true
          this.isDownloadModle = false
        }
      },
      savePageCarouse () {
        console.log(111, this.formCarousel)
        //公用宽高转换
        this.formCarousel.ratio = this.formCarousel.width + 'X' + this.formCarousel.height
        //启用 显示 登录转换
        if (this.carouselIsUse === true) {
          this.formCarousel.isUse = 1
        } else {
          this.formCarousel.isUse = 0
        }
        if (this.carouselNeedLogin === true) {
          this.formCarousel.needLogin = 1
        } else {
          this.formCarousel.needLogin = 0
        }
        if (this.carouselIsShow === true) {
          this.formCarousel.isShow = 1
        } else {
          this.formCarousel.isShow = 0
        }
        //展示日期转换  排序
        let result = this.formCarousel.carouselDetails
        for (let i = 0; i < result.length; i++) {
          result[i].beginDate = convertDate2String(new Date(result[i].beginDate).getTime())
          result[i].endDate = convertDate2String(new Date(result[i].endDate).getTime())
          result[i].rank = i
        }
        this.$ajax.post(`${baseUrl.newEnjoyUrl}/jjEnjoy/carousel/save`, this.formCarousel)
          .then((res) => {
            if (res.data.code === 0) {
              this.$message.success('保存成功')
              this.getCarousel()
            } else {
              this.$message('保存失败')
            }
          })
          .catch((err) => {
            this.$message.error('保存异常')
          })
      },
      addForm () {
        let lastRank = this.carouselDetails.length
        let addCarouseData = {
          'id': 0,
          'type': 1,
          'actionType': 1,
          'actionUrl': '',
          'downloadModel': 1,
          'beginDate': '',
          'endDate': '',
          'os': 1,
          'iconUrl': '',
          'rank': lastRank
        }
//        this.carouselDetails.push(addCarouseData)
        this.carouselDetails.splice(lastRank, 0, addCarouseData)
      },
      carouseDel (id) {
        this.$ajax.post(`${baseUrl.newEnjoyUrl}/jjEnjoy/carousel/delete`, {id: id})
          .then((res) => {
            this.$message.success(res.data.msg)
            this.getCarousel()
          })
          .catch(() => {
            this.$message.error('轮播图保存失败')
          })
      },
      carouseDown (id, index) {
        let result = this.formCarousel.carouselDetails
        if (index === result.length - 1) {
          this.$message('已经是最后一条啦!')
          return
        }
        for (let i = 0; i < result.length; i++) {
          if (result[i].id === id) {
            let thisResult = result[i]
            result.splice(i, 1)
            result.splice(i + 1, 0, thisResult)
          }
        }
      },
      carouseTop (id, index) {
        if (index === 0) {
          this.$message('已经是第一条啦!')
          return
        }
        let result = this.formCarousel.carouselDetails
        for (let i = 0; i < result.length; i++) {
          if (result[i].id === id) {
            let thisResult = result[i]
            result.splice(i, 1)
            result.splice(i - 1, 0, thisResult)
          }
        }
      },
      carouseMaxTop (id, index) {
        if (index === 0) {
          this.$message('已经是第一条啦!')
          return
        }
        let result = this.formCarousel.carouselDetails
        for (let i = 0; i < result.length; i++) {
          if (result[i].id === id) {
            let thisResult = result[i]
            result.splice(i, 1)
            result.splice(0, 0, thisResult)
          }
        }
      },
      //图标区
      topFall(){},
      downFall(){},
      delFall(){},
      savePageFall () {
        if (this.fallIsUse === true) {
          this.formFalls.isStopped = 1
        } else {
          this.formFalls.isStopped = 0
        }
        if (this.fallIsLogin === true) {
          this.formFalls.isLogin = 1
        } else {
          this.formFalls.isLogin = 0
        }
        if (this.fallIsShow === true) {
          this.formFalls.isShow = 1
        } else {
          this.formFalls.isShow = 0
        }
        this.formFalls.cityId = this.cityId
        this.formFalls.updataBy = this.adminId
        this.$ajax.post(`${baseUrl.newEnjoyUrl}/jjEnjoy/title/save`, this.form)
          .then((res) => {
              if (res.data.code === 0) {
                this.$message.success(res.data.msg)
                this.getHeader()
              } else {
                this.$message('保存失败')
              }
            }
          )
          .catch(err => {
            this.$message.error('保存异常')
          })
      },
      getPageFall () {
        this.$ajax.post(`${baseUrl.newEnjoyUrl2}/jjEnjoy/waterfall/form`, this.form)
          .then((res) => {
              if (res.data.code === 200) {
                this.formFalls = res.data.data.waterfall
                if (this.formFalls.isStopped === 1) {
                  this.fallIsUse = true
                } else {
                  this.fallIsUse = false
                }
                if (this.formFalls.isShow === 1) {
                  this.fallIsShow = true
                } else {
                  this.fallIsShow = false
                }
                if (this.formFalls.isLogin === 1) {
                  this.fallIsLogin = true
                } else {
                  this.fallIsLogin = false
                }
                if (this.formFalls.ratio.indexOf('X') !== -1) {
                  this.formFalls.width = this.formFalls.ratio.split('X')[0]
                  this.formFalls.height = this.formFalls.ratio.split('X')[1]
                }
              } else {
                this.$message('获取列表区信息失败')
              }
            }
          )
          .catch(err => {
            this.$message.error('获取列表区信息异常')
          })
      }
    }
  }

  // 全局当前高亮
  function getMenu (menuDivs, id) {
    let i = 0
    while (i < menuDivs.length) {
      if (Number(menuDivs[i].id) === id) {
        menuDivs[i].classList.add('active')
      } else {
        menuDivs[i].classList.remove('active')
      }
      i++
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
  @import '../../assets/css/activeEnjoy.css';

</style>
